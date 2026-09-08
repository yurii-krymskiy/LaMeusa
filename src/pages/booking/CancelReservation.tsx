import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CancelState = "confirm" | "loading" | "success" | "error";

type CancelResponse = {
    ok: boolean;
    message: string;
    reservationId?: number;
};

export const CancelReservation = () => {
    // The token is read once and kept in memory only; the URL is cleaned so the
    // token doesn't linger in browser history, referrers, or analytics tools.
    const [token] = useState<string>(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get("token")?.trim() || "";
    });
    const [state, setState] = useState<CancelState>(() => (token ? "confirm" : "error"));
    const [message, setMessage] = useState<string>(() =>
        token ? "" : "Cancellation link is invalid or incomplete."
    );

    useEffect(() => {
        if (window.location.search.includes("token")) {
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, []);

    // Cancellation runs ONLY after an explicit button click — never on page
    // load, so email link scanners and prefetchers cannot cancel reservations.
    const cancelReservation = async () => {
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
            const response = await fetch(`${supabaseUrl}/functions/v1/smooth-endpoint`, {
                method: "POST",
                headers: {
                    apikey: supabaseAnonKey,
                    Authorization: `Bearer ${supabaseAnonKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

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

                        {/* Confirm — cancellation requires an explicit click */}
                        {state === "confirm" && (
                            <>
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-royal-blue/10">
                                    <svg className="h-8 w-8 text-royal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h1 className="title text-2xl text-gray-900">Cancel your reservation?</h1>
                                <p className="description mt-3 text-gray-600">
                                    This will free your table for other guests and cannot be undone.
                                </p>
                                <div className="mt-8 flex flex-col items-center gap-3">
                                    <button onClick={() => void cancelReservation()} className="btn-primary w-full">
                                        Yes, cancel my reservation
                                    </button>
                                    <Link to="/" className="btn-secondary w-full">
                                        Keep my reservation
                                    </Link>
                                </div>
                            </>
                        )}

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
