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
        <section className="flex min-h-[80vh] items-center justify-center px-4 py-20">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-zinc-700/30 bg-zinc-900/60 p-10 text-center shadow-2xl">

                    {/* Icon */}
                    {state === "loading" && (
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
                            <svg className="h-7 w-7 animate-spin text-zinc-300" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        </div>
                    )}
                    {state === "success" && (
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/40">
                            <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                    {state === "error" && (
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/40">
                            <svg className="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="title mb-2 text-2xl text-white">
                        {state === "success" ? "Reservation cancelled" : state === "error" ? "Something went wrong" : "Cancelling reservation..."}
                    </h1>

                    {/* Message */}
                    {state === "loading" && (
                        <p className="description mt-3 text-zinc-400">Please wait a moment.</p>
                    )}
                    {state === "success" && (
                        <>
                            <p className="description mt-3 text-green-300">{message}</p>
                            <p className="description mt-2 text-zinc-400">We're sorry to miss you. You're always welcome back.</p>
                        </>
                    )}
                    {state === "error" && (
                        <>
                            <p className="description mt-3 text-red-300">{message}</p>
                            <p className="description mt-2 text-zinc-400">
                                Please contact the restaurant directly if you need help.
                            </p>
                        </>
                    )}

                    {/* Actions */}
                    {(state === "success" || state === "error") && (
                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                            <Link
                                to="/"
                                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                            >
                                Back to home
                            </Link>
                            <Link
                                to="/booking"
                                className="rounded-full border border-zinc-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
                            >
                                New reservation
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
