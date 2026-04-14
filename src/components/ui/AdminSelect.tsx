import { useState, useRef, useEffect } from "react";

type Option = {
    value: string;
    label: string;
};

type AdminSelectProps = {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
    compact?: boolean;
};

export const AdminSelect = ({
    value,
    onChange,
    options,
    placeholder = "Select...",
    className = "",
    compact = false,
}: AdminSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.value === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className={`relative ${className}`}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`${compact ? "px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-colors" : "admin-input"} flex items-center justify-between gap-2 text-left cursor-pointer`}
            >
                <span
                    className={
                        selectedOption
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-400 dark:text-gray-500"
                    }
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"} text-left rounded-lg transition-colors cursor-pointer ${
                                    option.value === value
                                        ? "bg-royal-blue text-white font-medium"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500"
                                }`}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
