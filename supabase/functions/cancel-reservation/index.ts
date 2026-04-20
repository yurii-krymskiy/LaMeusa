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

denoRuntime.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseUrl = requiredEnv("SUPABASE_URL");
        const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
        const timezone = denoRuntime.env.get("RESTAURANT_TIMEZONE") || "Atlantic/Canary";

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

        return new Response(
            JSON.stringify({
                ok: result.success,
                reservationId: result.reservation_id,
                message: result.message,
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
