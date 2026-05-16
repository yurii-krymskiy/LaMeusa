import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    const is404 =
        isRouteErrorResponse(error) && error.status === 404;

    const title = is404 ? "404" : "Oops!";
    const heading = is404 ? "Page not found" : "Something went wrong";
    const message = is404
        ? "The page you're looking for doesn't exist or has been moved."
        : "An unexpected error occurred. Please try again later.";

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
            {/* Logo */}
            <img
                src="/icons/logo.svg"
                alt="La Medusa"
                className="h-14 w-auto mb-10 opacity-90"
            />

            {/* Big number / icon */}
            <p className="font-Arizonia text-[120px] md:text-[180px] leading-none text-sky select-none mb-2">
                {title}
            </p>

            {/* Heading */}
            <h1 className="title text-3xl md:text-5xl mb-4">{heading}</h1>

            {/* Message */}
            <p className="description text-base md:text-lg max-w-md mb-10">
                {message}
            </p>

            {/* Divider */}
            <div className="w-16 h-px bg-sky mb-10" />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 bg-navy text-white text-sm font-semibold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-royal-blue transition-colors duration-200"
                >
                    Go home
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center justify-center gap-2 border border-navy text-navy text-sm font-semibold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-navy hover:text-white transition-colors duration-200"
                >
                    Go back
                </button>
            </div>
        </div>
    );
}
