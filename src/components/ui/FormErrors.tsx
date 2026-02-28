type FormErrorsProps = {
    errors: Record<string, { message?: string } | undefined>;
    fieldLabels?: Record<string, string>;
};

const defaultLabels: Record<string, string> = {
    name: "Name",
    guests: "Guests",
    time: "Time",
    date: "Date",
    email: "Email",
    phone: "Phone",
    details: "Special Requests",
    promoCode: "Promo Code",
};

export const FormErrors = ({ errors, fieldLabels = {} }: FormErrorsProps) => {
    const labels = { ...defaultLabels, ...fieldLabels };
    const errorEntries = Object.entries(errors).filter(
        ([, value]) => value?.message
    );

    if (errorEntries.length === 0) return null;

    return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-red-800">
                        Almost there! Just a few details needed:
                    </h4>
                    <ul className="mt-2 list-disc list-inside space-y-1">
                        {errorEntries.map(([field, error]) => (
                            <li key={field} className="text-sm text-red-700">
                                <span className="font-medium">
                                    {labels[field] || field}:
                                </span>{" "}
                                {error?.message}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

type SingleErrorProps = {
    message?: string | null;
};

export const SingleError = ({ message }: SingleErrorProps) => {
    if (!message) return null;

    return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <p className="text-sm text-red-700">{message}</p>
            </div>
        </div>
    );
};

type SuccessMessageProps = {
    message: string;
};

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
    return (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    <svg
                        className="h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <p className="text-sm text-green-700">{message}</p>
            </div>
        </div>
    );
};

type LoadingStatusProps = {
    message: string;
};

export const LoadingStatus = ({ message }: LoadingStatusProps) => {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
            {message}
        </div>
    );
};
