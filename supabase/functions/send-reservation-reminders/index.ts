export {};

// Security notes (2026-09-08 audit):
// - This function is invoked ONLY by the pg_cron job. verify_jwt lets anyone
//   holding the public anon key through, so we additionally require the
//   x-cron-secret header, checked against private.app_secrets via the
//   service-role-only get_cron_secret() RPC.
// - Reminders are CLAIMED (reminder_sent_at set atomically) BEFORE the email is
//   sent, so concurrent invocations can never double-send. If the send fails,
//   the claim is released so the next run retries.
// - Responses never include upstream error bodies or env-var names; details go
//   to the function logs only.

type DueReminderReservation = {
    id: number;
    customer_name: string;
    email: string;
    phone: string;
    number_of_guests: number;
    reservation_date: string;
    reservation_time: string;
    additional_wishes: string | null;
    cancellation_token: string;
    reservation_ts: string;
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

function formatDateTime(reservationTs: string, timezone: string): { date: string; time: string } {
    const dateObj = new Date(reservationTs);
    const date = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: timezone,
    }).format(dateObj);

    const time = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timezone,
    }).format(dateObj);

    return { date, time };
}

function supabaseHeaders(serviceRoleKey: string): Record<string, string> {
    return {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
    };
}

async function fetchCronSecret(supabaseUrl: string, serviceRoleKey: string): Promise<string> {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/get_cron_secret`, {
        method: "POST",
        headers: supabaseHeaders(serviceRoleKey),
        body: "{}",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch cron secret: ${response.status}`);
    }

    const secret = (await response.json()) as string | null;
    if (!secret) {
        throw new Error("Cron secret is not configured (private.app_secrets).");
    }
    return secret;
}

async function fetchDueReservations(
    supabaseUrl: string,
    serviceRoleKey: string,
    timezone: string
): Promise<DueReminderReservation[]> {
    const response = await fetch(
        `${supabaseUrl}/rest/v1/rpc/get_reservations_due_for_reminder`,
        {
            method: "POST",
            headers: supabaseHeaders(serviceRoleKey),
            body: JSON.stringify({ p_timezone: timezone }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch due reminders: ${response.status} ${errorText}`);
    }

    return (await response.json()) as DueReminderReservation[];
}

/**
 * Atomically claims a reservation for reminding by setting reminder_sent_at
 * only if it is still NULL. Returns true if THIS invocation won the claim.
 */
async function claimReminder(
    supabaseUrl: string,
    serviceRoleKey: string,
    reservationId: number
): Promise<boolean> {
    const response = await fetch(
        `${supabaseUrl}/rest/v1/reservations?id=eq.${reservationId}&reminder_sent_at=is.null`,
        {
            method: "PATCH",
            headers: {
                ...supabaseHeaders(serviceRoleKey),
                Prefer: "return=representation",
            },
            body: JSON.stringify({ reminder_sent_at: new Date().toISOString() }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to claim reminder: ${response.status} ${errorText}`);
    }

    const rows = (await response.json()) as unknown[];
    return Array.isArray(rows) && rows.length > 0;
}

/** Releases a claim after a failed send so the next cron run retries. */
async function releaseReminderClaim(
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
            body: JSON.stringify({ reminder_sent_at: null }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to release reminder claim: ${response.status} ${errorText}`);
    }
}

async function sendReminderEmail(
    reservation: DueReminderReservation,
    config: {
        serviceId: string;
        templateId: string;
        publicKey: string;
        privateKey?: string;
        publicSiteUrl: string;
        timezone: string;
    }
): Promise<EmailJsResponse> {
    const cancelUrl = `${config.publicSiteUrl.replace(/\/$/, "")}/reservation/cancel?token=${encodeURIComponent(
        reservation.cancellation_token
    )}`;

    const { date, time } = formatDateTime(reservation.reservation_ts, config.timezone);

    const payload = {
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        accessToken: config.privateKey,
        template_params: {
            user_name: reservation.customer_name,
            user_email: reservation.email,
            user_phone: reservation.phone,
            number_of_guests: String(reservation.number_of_guests),
            date,
            time,
            additional_wishes: reservation.additional_wishes || "None",
            cancel_url: cancelUrl,
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

        // ---- authenticate the caller (cron only) ---------------------------
        const providedSecret = req.headers.get("x-cron-secret") || "";
        const expectedSecret = await fetchCronSecret(supabaseUrl, serviceRoleKey);

        if (!providedSecret || !safeEqual(providedSecret, expectedSecret)) {
            return new Response(JSON.stringify({ ok: false }), {
                headers: { "Content-Type": "application/json" },
                status: 401,
            });
        }

        const emailjsServiceId = requiredEnv("EMAILJS_SERVICE_ID");
        const emailjsReminderTemplateId = requiredEnv("EMAILJS_REMINDER_TEMPLATE_ID");
        const emailjsPublicKey = requiredEnv("EMAILJS_PUBLIC_KEY");
        const emailjsPrivateKey = denoRuntime.env.get("EMAILJS_PRIVATE_KEY");
        const publicSiteUrl = requiredEnv("PUBLIC_SITE_URL");
        const timezone = denoRuntime.env.get("RESTAURANT_TIMEZONE") || "Atlantic/Canary";

        const reservations = await fetchDueReservations(
            supabaseUrl,
            serviceRoleKey,
            timezone
        );

        let sent = 0;
        let failed = 0;
        let skipped = 0;

        for (const reservation of reservations) {
            // Claim first — concurrent runs can never double-send.
            const claimed = await claimReminder(supabaseUrl, serviceRoleKey, reservation.id);
            if (!claimed) {
                skipped += 1;
                continue;
            }

            const emailResult = await sendReminderEmail(reservation, {
                serviceId: emailjsServiceId,
                templateId: emailjsReminderTemplateId,
                publicKey: emailjsPublicKey,
                privateKey: emailjsPrivateKey || undefined,
                publicSiteUrl,
                timezone,
            });

            if (emailResult.ok) {
                sent += 1;
                continue;
            }

            failed += 1;
            console.error(
                `Reminder email failed for reservation ${reservation.id}: EmailJS ${emailResult.status}: ${emailResult.text}`
            );
            try {
                await releaseReminderClaim(supabaseUrl, serviceRoleKey, reservation.id);
            } catch (releaseError) {
                console.error(
                    `Could not release claim for reservation ${reservation.id}:`,
                    releaseError
                );
            }
        }

        return new Response(JSON.stringify({ ok: true, sent, failed, skipped }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        // Full detail goes to function logs only — never to the caller.
        console.error("send-reservation-reminders failed:", error);
        return new Response(JSON.stringify({ ok: false }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
});
