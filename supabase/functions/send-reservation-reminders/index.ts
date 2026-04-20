export {};

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

async function markReminderSent(
    supabaseUrl: string,
    serviceRoleKey: string,
    reservationId: number
): Promise<void> {
    const response = await fetch(
        `${supabaseUrl}/rest/v1/reservations?id=eq.${reservationId}&reminder_sent_at=is.null`,
        {
            method: "PATCH",
            headers: {
                ...supabaseHeaders(serviceRoleKey),
                Prefer: "return=minimal",
            },
            body: JSON.stringify({ reminder_sent_at: new Date().toISOString() }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to mark reminder as sent: ${response.status} ${errorText}`);
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
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseUrl = requiredEnv("SUPABASE_URL");
        const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
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
        const failures: Array<{ reservationId: number; error: string }> = [];

        for (const reservation of reservations) {
            const emailResult = await sendReminderEmail(reservation, {
                serviceId: emailjsServiceId,
                templateId: emailjsReminderTemplateId,
                publicKey: emailjsPublicKey,
                privateKey: emailjsPrivateKey || undefined,
                publicSiteUrl,
                timezone,
            });

            if (!emailResult.ok) {
                failed += 1;
                failures.push({
                    reservationId: reservation.id,
                    error: `EmailJS ${emailResult.status}: ${emailResult.text}`,
                });
                continue;
            }

            try {
                await markReminderSent(supabaseUrl, serviceRoleKey, reservation.id);
                sent += 1;
            } catch (error) {
                failed += 1;
                failures.push({
                    reservationId: reservation.id,
                    error: error instanceof Error ? error.message : "Unknown update error",
                });
            }
        }

        return new Response(
            JSON.stringify({
                ok: true,
                timezone,
                totalDue: reservations.length,
                sent,
                failed,
                failures,
            }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : "Unknown error",
            }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
                status: 500,
            }
        );
    }
});
