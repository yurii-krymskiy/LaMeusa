export {};

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CancelResult = {
    success: boolean;
    reservation_id: number | null;
    message: string;
};

type CancellationReservation = {
    id: number;
    customer_name: string;
    email: string;
    phone: string;
    number_of_guests: number;
    reservation_date: string;
    reservation_time: string;
    additional_wishes: string | null;
    cancelled_at: string | null;
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

function supabaseHeaders(serviceRoleKey: string): Record<string, string> {
    return {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
    };
}

function formatReservationDate(dateString: string): string {
    const date = new Date(`${dateString}T00:00:00Z`);
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}

function formatReservationTime(timeString: string): string {
    return timeString.slice(0, 5);
}

function formatTimestamp(timestamp: string, timezone: string): string {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timezone,
    }).format(date);
}

async function fetchReservationByToken(
    supabaseUrl: string,
    serviceRoleKey: string,
    token: string
): Promise<CancellationReservation | null> {
    const response = await fetch(
        `${supabaseUrl}/rest/v1/reservations?cancellation_token=eq.${encodeURIComponent(
            token
        )}&select=id,customer_name,email,phone,number_of_guests,reservation_date,reservation_time,additional_wishes,cancelled_at&limit=1`,
        {
            method: "GET",
            headers: supabaseHeaders(serviceRoleKey),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch reservation: ${response.status} ${errorText}`);
    }

    const data = (await response.json()) as CancellationReservation[];
    return data[0] ?? null;
}

async function cancelByToken(
    supabaseUrl: string,
    serviceRoleKey: string,
    token: string,
    timezone: string
): Promise<CancelResult | null> {
    const response = await fetch(
        `${supabaseUrl}/rest/v1/rpc/cancel_reservation_by_token`,
        {
            method: "POST",
            headers: supabaseHeaders(serviceRoleKey),
            body: JSON.stringify({
                p_token: token,
                p_timezone: timezone,
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Cancellation failed: ${response.status} ${errorText}`);
    }

    const data = (await response.json()) as CancelResult[];
    return data[0] ?? null;
}

async function sendCancellationNotificationEmail(
    reservation: CancellationReservation,
    config: {
        serviceId: string;
        templateId: string;
        publicKey: string;
        privateKey?: string;
        timezone: string;
        cancelledAt: string;
    }
): Promise<EmailJsResponse> {
    const payload = {
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        accessToken: config.privateKey,
        template_params: {
            reservation_id: String(reservation.id),
            user_name: reservation.customer_name,
            user_email: reservation.email,
            user_phone: reservation.phone,
            number_of_guests: String(reservation.number_of_guests),
            date: formatReservationDate(reservation.reservation_date),
            time: formatReservationTime(reservation.reservation_time),
            additional_wishes: reservation.additional_wishes || "None",
            cancelled_at: formatTimestamp(config.cancelledAt, config.timezone),
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
        const timezone = denoRuntime.env.get("RESTAURANT_TIMEZONE") || "Atlantic/Canary";
        const emailjsServiceId = denoRuntime.env.get("EMAILJS_SERVICE_ID");
        const emailjsCancellationTemplateId = denoRuntime.env.get(
            "EMAILJS_CANCELLATION_TEMPLATE_ID"
        );
        const emailjsPublicKey = denoRuntime.env.get("EMAILJS_PUBLIC_KEY");
        const emailjsPrivateKey = denoRuntime.env.get("EMAILJS_PRIVATE_KEY");

        const url = new URL(req.url);
        let token = url.searchParams.get("token") || "";

        if (!token && req.method !== "GET") {
            try {
                const body = await req.json();
                token = body?.token || "";
            } catch {
                // Ignore invalid body for GET-like requests.
            }
        }

        token = token.trim();

        if (!token) {
            return new Response(
                JSON.stringify({ ok: false, message: "Missing cancellation token." }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 400,
                }
            );
        }

        const reservationBeforeCancel = await fetchReservationByToken(
            supabaseUrl,
            serviceRoleKey,
            token
        );

        const result = await cancelByToken(
            supabaseUrl,
            serviceRoleKey,
            token,
            timezone
        );

        if (!result) {
            return new Response(
                JSON.stringify({ ok: false, message: "Reservation not found." }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 404,
                }
            );
        }

        let notificationSent = false;
        let notificationError: string | null = null;

        const shouldNotifyAboutFreshCancellation =
            result.success && Boolean(reservationBeforeCancel) && !reservationBeforeCancel?.cancelled_at;

        if (
            shouldNotifyAboutFreshCancellation &&
            reservationBeforeCancel &&
            emailjsServiceId &&
            emailjsCancellationTemplateId &&
            emailjsPublicKey
        ) {
            const cancelledAt = new Date().toISOString();

            try {
                const emailResult = await sendCancellationNotificationEmail(
                    reservationBeforeCancel,
                    {
                        serviceId: emailjsServiceId,
                        templateId: emailjsCancellationTemplateId,
                        publicKey: emailjsPublicKey,
                        privateKey: emailjsPrivateKey || undefined,
                        timezone,
                        cancelledAt,
                    }
                );

                if (!emailResult.ok) {
                    notificationError = `EmailJS ${emailResult.status}: ${emailResult.text}`;
                    console.error(notificationError);
                } else {
                    notificationSent = true;
                }
            } catch (error) {
                notificationError =
                    error instanceof Error ? error.message : "Unknown notification error";
                console.error(notificationError);
            }
        } else if (shouldNotifyAboutFreshCancellation) {
            notificationError =
                "Cancellation notification email is not configured. Set EMAILJS_CANCELLATION_TEMPLATE_ID and EmailJS keys.";
            console.error(notificationError);
        }

        return new Response(
            JSON.stringify({
                ok: result.success,
                reservationId: result.reservation_id,
                message: result.message,
                notificationSent,
                notificationError,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: result.success ? 200 : 400,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                ok: false,
                message: error instanceof Error ? error.message : "Unknown error",
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});
