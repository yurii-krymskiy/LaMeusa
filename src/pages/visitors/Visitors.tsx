import { useState } from "react";
import { createVisitor } from "../../lib/admin.service";

export const Visitors = () => {
    const [numberOfGuests, setNumberOfGuests] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const guests = parseInt(numberOfGuests);
        if (!guests || guests < 1) {
            setError("Please enter a valid number of guests");
            return;
        }

        setIsSubmitting(true);

        const result = await createVisitor(guests);

        if (result.success) {
            setSuccess(true);
            setNumberOfGuests("");
            // Auto-clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } else {
            setError(result.error || "Failed to record visitors");
        }

        setIsSubmitting(false);
    };

    const quickButtons = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <img
                        src="/icons/logo.svg"
                        alt="La Medusa"
                        className="h-16 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-gray-900">
                        Record Visitors
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Enter the number of guests arriving
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
                                <svg
                                    className="w-6 h-6 mx-auto mb-2 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Visitors recorded successfully!
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Quick Select Buttons */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Quick Select
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {quickButtons.map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setNumberOfGuests(num.toString())}
                                        className={`py-4 text-xl font-semibold rounded-xl transition-all ${
                                            numberOfGuests === num.toString()
                                                ? "bg-sky text-white shadow-lg scale-105"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Manual Input */}
                        <div>
                            <label
                                htmlFor="guests"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Or enter manually
                            </label>
                            <input
                                type="number"
                                id="guests"
                                min="1"
                                max="100"
                                value={numberOfGuests}
                                onChange={(e) => setNumberOfGuests(e.target.value)}
                                placeholder="Number of guests"
                                className="w-full px-4 py-4 text-xl text-center font-semibold border-2 border-gray-200 rounded-xl focus:border-sky focus:ring-0 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || !numberOfGuests}
                            className="w-full py-4 bg-sky text-white text-lg font-semibold rounded-xl hover:bg-sky/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                    Recording...
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    Record Visitors
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    La Medusa Restaurant
                </p>
            </div>
        </div>
    );
};
