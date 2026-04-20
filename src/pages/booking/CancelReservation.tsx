import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type CancelState = "idle" | "loading" | "success" | "error";

type CancelResponse = {
    ok: boolean;
    message: string;
    reservationId?: number;
};

export const CancelReservation = () => {
    const [searchParams] = useSearchParams();
    const [state, setState] = useState<CancelState>("idle");
    const [message, setMessage] = useState<string>("");

    const token = useMemo(() => searchParams.get("token")?.trim() || "", [searchParams]);

    useEffect(() => {
        const cancelReservation = async () => {
            if (!token) {
                setState("error");
                setMessage("Cancellation link is invalid or incomplete.");
                return;
            }

            const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined;
            const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

            if (!supabaseUrl || !supabaseAnonKey) {
                setState("error");
                setMessage("Missing Supabase environment variables in frontend.");
                return;
            }

            setState("loading");
            setMessage("Cancelling your reservation...");

            try {
                const response = await fetch(
                    `${supabaseUrl}/functions/v1/smooth-endpoint?token=${encodeURIComponent(token)}`,
                    {
                        method: "GET",
                        headers: {
                            apikey: supabaseAnonKey,
                            Authorization: `Bearer ${supabaseAnonKey}`,
                        },
                    }
                );

                const data = (await response.json()) as CancelResponse;

                if (!response.ok || !data.ok) {
                    setState("error");
                    setMessage(data.message || "Could not cancel reservation.");
                    return;
                }

                setState("success");
                setMessage(data.message || "Your reservation has been cancelled.");
            } catch (error) {
                setState("error");
                setMessage(error instanceof Error ? error.message : "Unexpected error");
            }
        };

        void cancelReservation();
    }, [token]);

    return (
        <section className="pt-30 pb-20">
            <div className="container-custom mx-auto max-w-2xl">
                <div className="rounded-2xl border border-zinc-700/30 bg-zinc-900/60 p-8 text-center shadow-xl">
                    <h1 className="title mb-3 text-3xl text-white">Reservation cancellation</h1>

                    {state === "loading" && (
                        <p className="description text-zinc-300">{message}</p>
                    )}

                    {state === "success" && (
                        <>
                            <p className="description mb-5 text-green-300">{message}</p>
                            <p className="description mb-8 text-zinc-300">
                                We are sorry to miss you. You can book another table anytime.
                            </p>
                        </>
                    )}

                    {state === "error" && (
                        <>
                            <p className="description mb-5 text-red-300">{message}</p>
                            <p className="description mb-8 text-zinc-300">
                                If this does not look right, please contact the restaurant directly.
                            </p>
                        </>
                    )}

                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            to="/"
                            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                        >
                            Back to home
                        </Link>
                        <Link
                            to="/booking"
                            className="rounded-full border border-zinc-400 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
                        >
                            Make new reservation
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
