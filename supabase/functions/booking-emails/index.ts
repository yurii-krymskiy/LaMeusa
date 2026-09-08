export {};

// Sends booking confirmation emails (customer + restaurant) server-side.
//
// Security design (2026-09-08 audit — replaces client-side @emailjs/browser,
// which was an open relay via the public key in the JS bundle):
// - Callable ONLY with the internal x-cron-secret header; create_reservation
//   enqueues the call via pg_net. verify_jwt is disabled because this custom
//   auth is the gate (a JWT check on top would only re-admit the public anon key).
// - The recipient and all content are loaded from the reservations row — the
//   request body carries nothing but a reservation id, so the function can
//   never be abused to send attacker-controlled email.
// - confirmation_sent_at is claimed atomically BEFORE sending: exactly one
//   confirmation per reservation, even under concurrent delivery retries.

type BookingReservation = {
    id: number;
    customer_name: string;
    email: string;
    phone: string;
    number_of_guests: number;
    reservation_date: string;
    reservation_time: string;
    additional_wishes: string | null;
};

type EmailJsResponse = {
    ok: boolean;
    status: number;
    text: string;
};

type DenoRuntime = {
    env: {
        get: (name: string) => string | undefined;
    };
    serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};

const maybeDenoRuntime = (globalThis as { Deno?: DenoRuntime }).Deno;

if (!maybeDenoRuntime) {
    throw new Error("This function must run in the Deno runtime.");
}

const denoRuntime = maybeDenoRuntime;

function requiredEnv(name: string): string {
    const value = denoRuntime.env.get(name);
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

/** Constant-time string comparison to avoid timing side channels. */
function safeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
}

function supabaseHeaders(serviceRoleKey: string): Record<string, string> {
    return {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
    };
}

async function fetchAppSecret(
    supabaseUrl: string,
    serviceRoleKey: string,
    name: string
): Promise<string> {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/get_app_secret`, {
        method: "POST",
        headers: supabaseHeaders(serviceRoleKey),
        body: JSON.stringify({ p_name: name }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch app secret ${name}: ${response.status}`);
    }

    const value = (await response.json()) as string | null;
    if (!value) {
        throw new Error(`App secret ${name} is not configured.`);
    }
    return value;
}

/**
 * Atomically claims the confirmation send (confirmation_sent_at NULL -> now())
 * and returns the reservation row, or null if it was already claimed / missing.
 */
async function claimConfirmation(
    supabaseUrl: string,
    serviceRoleKey: string,
    reservationId: number
): Promise<BookingReservation | null> {
    const response = await fetch(
        `${supabaseUrl}/rest/v1/reservations?id=eq.${reservationId}&confirmation_sent_at=is.null` +
            `&select=id,customer_name,email,phone,number_of_guests,reservation_date,reservation_time,additional_wishes`,
        {
            method: "PATCH",
            headers: {
                ...supabaseHeaders(serviceRoleKey),
                Prefer: "return=representation",
            },
            body: JSON.stringify({ confirmation_sent_at: new Date().toISOString() }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to claim confirmation: ${response.status} ${errorText}`);
    }

    const rows = (await response.json()) as BookingReservation[];
    return rows[0] ?? null;
}

/** Releases the claim after a total send failure so a manual retry is possible. */
async function releaseConfirmationClaim(
    supabaseUrl: string,
    serviceRoleKey: string,
    reservationId: number
): Promise<void> {
    const response = await fetch(
        `${supabaseUrl}/rest/v1/reservations?id=eq.${reservationId}`,
        {
            method: "PATCH",
            headers: {
                ...supabaseHeaders(serviceRoleKey),
                Prefer: "return=minimal",
            },
            body: JSON.stringify({ confirmation_sent_at: null }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to release confirmation claim: ${response.status} ${errorText}`);
    }
}

// Mirrors the old client-side formatting (en-US long date, 12-hour time).
function formatDateForEmail(dateString: string): string {
    const date = new Date(`${dateString}T00:00:00Z`);
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    }).format(date);
}

function formatTimeForEmail(timeString: string): string {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

async function sendEmail(
    templateId: string,
    reservation: BookingReservation,
    config: { serviceId: string; publicKey: string; privateKey?: string }
): Promise<EmailJsResponse> {
    const payload = {
        service_id: config.serviceId,
        template_id: templateId,
        user_id: config.publicKey,
        accessToken: config.privateKey,
        template_params: {
            user_name: reservation.customer_name,
            user_email: reservation.email,
            user_phone: reservation.phone,
            number_of_guests: String(reservation.number_of_guests),
            date: formatDateForEmail(reservation.reservation_date),
            time: formatTimeForEmail(reservation.reservation_time),
            additional_wishes: reservation.additional_wishes || "",
        },
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const text = await response.text();
    return {
        ok: response.ok,
        status: response.status,
        text,
    };
}

denoRuntime.serve(async (req) => {
    try {
        const supabaseUrl = requiredEnv("SUPABASE_URL");
        const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

        // ---- authenticate the caller (internal pg_net calls only) ----------
        const providedSecret = req.headers.get("x-cron-secret") || "";
        const expectedSecret = await fetchAppSecret(supabaseUrl, serviceRoleKey, "cron_secret");

        if (!providedSecret || !safeEqual(providedSecret, expectedSecret)) {
            return new Response(JSON.stringify({ ok: false }), {
                headers: { "Content-Type": "application/json" },
                status: 401,
            });
        }

        let reservationId = 0;
        try {
            const body = await req.json();
            reservationId = Number(body?.reservation_id) || 0;
        } catch {
            // handled below
        }

        if (!reservationId || !Number.isInteger(reservationId) || reservationId < 1) {
            return new Response(JSON.stringify({ ok: false }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        }

        const emailjsServiceId = requiredEnv("EMAILJS_SERVICE_ID");
        const emailjsPublicKey = requiredEnv("EMAILJS_PUBLIC_KEY");
        const emailjsPrivateKey = denoRuntime.env.get("EMAILJS_PRIVATE_KEY");

        const [customerTemplateId, restaurantTemplateId] = await Promise.all([
            fetchAppSecret(supabaseUrl, serviceRoleKey, "emailjs_confirmation_template_id"),
            fetchAppSecret(supabaseUrl, serviceRoleKey, "emailjs_restaurant_template_id"),
        ]);

        // Claim first — exactly one confirmation per reservation, ever.
        const reservation = await claimConfirmation(supabaseUrl, serviceRoleKey, reservationId);
        if (!reservation) {
            return new Response(JSON.stringify({ ok: true, skipped: true }), {
                headers: { "Content-Type": "application/json" },
                status: 200,
            });
        }

        const emailConfig = {
            serviceId: emailjsServiceId,
            publicKey: emailjsPublicKey,
            privateKey: emailjsPrivateKey || undefined,
        };

        const restaurantResult = await sendEmail(restaurantTemplateId, reservation, emailConfig);
        if (!restaurantResult.ok) {
            console.error(
                `Restaurant notification failed for reservation ${reservation.id}: EmailJS ${restaurantResult.status}: ${restaurantResult.text}`
            );
        }

        const customerResult = await sendEmail(customerTemplateId, reservation, emailConfig);
        if (!customerResult.ok) {
            console.error(
                `Customer confirmation failed for reservation ${reservation.id}: EmailJS ${customerResult.status}: ${customerResult.text}`
            );
        }

        if (!restaurantResult.ok && !customerResult.ok) {
            try {
                await releaseConfirmationClaim(supabaseUrl, serviceRoleKey, reservation.id);
            } catch (releaseError) {
                console.error(
                    `Could not release confirmation claim for reservation ${reservation.id}:`,
                    releaseError
                );
            }
        }

        return new Response(
            JSON.stringify({
                ok: restaurantResult.ok || customerResult.ok,
                customerSent: customerResult.ok,
                restaurantSent: restaurantResult.ok,
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        // Full detail goes to function logs only — never to the caller.
        console.error("booking-emails failed:", error);
        return new Response(JSON.stringify({ ok: false }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
});
