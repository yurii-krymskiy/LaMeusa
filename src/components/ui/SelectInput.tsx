import { useEffect, useRef, useState } from "react";

type SelectOption = {
    value: number;
    label: string;
};

type Props = {
    value?: number | null;
    onChange?: (value: number | null) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
};

export const SelectInput = ({
    value,
    onChange,
    options,
    placeholder = "Select",
    disabled,
    error,
    className,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const normalizedValue =
        typeof value === "number" && Number.isFinite(value) ? value : null;
    const selectedOption = options.find((option) => option.value === normalizedValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <label className={`relative block w-full ${className || ""}`}>
            <div ref={containerRef} className="input-datetime-wrapper">
                <button
                    type="button"
                    onClick={() => {
                        if (!disabled) setIsOpen((prev) => !prev);
                    }}
                    disabled={disabled}
                    className={`input input-datetime input-time text-left ${error ? "border-red-400" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <span className="text-gray-700">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </button>
                <span className="input-datetime-icon pointer-events-none">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </span>

                {isOpen && !disabled && (
                    <ul className="absolute left-1/2 z-50 mt-1 w-[120px] -translate-x-1/2 overflow-hidden border border-gray-200 bg-white shadow-lg">
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange?.(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-4 py-2.5 text-center text-sm transition-colors cursor-pointer ${option.value === normalizedValue ? "bg-royal-blue text-white" : "text-gray-700 hover:bg-gray-100"}`}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {error && (
                <span className="absolute -bottom-5 left-0 block text-xs text-red-500">
                    {error}
                </span>
            )}
        </label>
    );
};