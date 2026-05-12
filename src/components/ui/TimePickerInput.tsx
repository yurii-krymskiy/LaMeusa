import { forwardRef, useState, useRef, useEffect, type Ref } from "react";

const TIME_SLOTS: string[] = [];
for (let h = 13; h <= 21; h++) {
    for (const m of [0, 30]) {
        if (h === 21 && m > 30) break;
        TIME_SLOTS.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
}

type Props = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
};

export const TimePickerInput = forwardRef<HTMLDivElement, Props>(
    (
        {
            value,
            onChange,
            placeholder = "Time",
            required,
            error,
            className,
        }: Props,
        ref: Ref<HTMLDivElement>
    ) => {
        const [open, setOpen] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                    setOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const handleSelect = (slot: string) => {
            onChange?.(slot);
            setOpen(false);
        };

        return (
            <div
                ref={containerRef}
                className={`relative block w-full ${className || ""}`}
            >
                <div
                    ref={ref as Ref<HTMLDivElement>}
                    onClick={() => setOpen((o) => !o)}
                    className="input-datetime-wrapper cursor-pointer"
                >
                    <div className={`input input-datetime input-time ${error ? "border-red-400" : ""}`}>
                        <span className="text-gray-700">{value || placeholder}</span>
                    </div>
                    <span className="input-datetime-icon">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                    </span>
                </div>

                {open && (
                    <div className="absolute left-1/2 z-50 mt-1 w-28 -translate-x-1/2 rounded border border-gray-200 bg-white shadow-lg">
                        <div className="border-b border-gray-200 bg-royal-blue px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
                            Time
                        </div>
                        <ul className="max-h-48 overflow-y-auto">
                            {TIME_SLOTS.map((slot) => (
                                <li
                                    key={slot}
                                    onClick={() => handleSelect(slot)}
                                    className={`cursor-pointer px-3 py-2 text-center text-sm hover:bg-gray-100 ${value === slot ? "bg-gray-100 font-semibold text-royal-blue" : ""}`}
                                >
                                    {slot}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {required && (
                    <input
                        type="text"
                        value={value || ""}
                        required
                        readOnly
                        aria-hidden="true"
                        className="absolute inset-0 h-0 w-0 opacity-0"
                        tabIndex={-1}
                    />
                )}

                {error && (
                    <span className="absolute -bottom-5 left-0 block text-xs text-red-500">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

TimePickerInput.displayName = "TimePickerInput";
