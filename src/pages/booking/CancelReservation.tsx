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
        <div className="m-0 min-h-screen bg-white">
            <div className="flex min-h-screen flex-col md:flex-row">
                {/* Left — image panel */}
                <div className="relative flex w-full flex-col items-center justify-center bg-[url('/images/restoran.jpg')] bg-cover bg-center px-12 py-16 md:w-1/2 md:min-h-screen">
                    <div className="absolute inset-0 bg-[#13265a]/70" />
                    <div className="relative z-10 text-center">
                        <img src="/icons/logo-white.svg" className="mx-auto mb-6 w-36" alt="La Medusa" />
                        <span className="decorative text-3xl text-white md:text-5xl">La Medusa</span>
                    </div>
                </div>

                {/* Right — content panel */}
                <div className="flex w-full flex-col items-center justify-center px-8 py-16 md:w-1/2">
                    <div className="w-full max-w-sm text-center">

                        {/* Loading */}
                        {state === "loading" && (
                            <>
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-royal-blue/10">
                                    <svg className="h-7 w-7 animate-spin text-royal-blue" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                </div>
                                <h1 className="title text-2xl text-gray-900">One moment…</h1>
                                <p className="description mt-3 text-gray-500">We're cancelling your reservation.</p>
                            </>
                        )}

                        {/* Success */}
                        {state === "success" && (
                            <>
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-royal-blue/10">
                                    <svg className="h-8 w-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="title text-2xl text-gray-900">Reservation cancelled</h1>
                                <p className="description mt-3 text-gray-600">{message}</p>
                                <p className="description mt-2 text-gray-400">We're sorry to miss you. You're always welcome back.</p>
                            </>
                        )}

                        {/* Error */}
                        {state === "error" && (
                            <>
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                                    <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h1 className="title text-2xl text-gray-900">Something went wrong</h1>
                                <p className="description mt-3 text-gray-600">{message}</p>
                                <p className="description mt-2 text-gray-400">Please contact the restaurant directly if you need help.</p>
                            </>
                        )}

                        {/* Actions */}
                        {(state === "success" || state === "error") && (
                            <div className="mt-8 flex flex-col items-center gap-3">
                                <Link to="/" className="btn-primary w-full">
                                    Back to home
                                </Link>
                                <Link to="/booking" className="btn-secondary w-full">
                                    New reservation
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
