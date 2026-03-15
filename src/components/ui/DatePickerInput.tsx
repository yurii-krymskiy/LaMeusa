import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState, type Ref } from "react";

type Props = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
};


export const DatePickerInput = forwardRef<HTMLDivElement, Props>(
    (
        {
            value,
            onChange,
            placeholder = "Date",
            required,
            error,
            className,
        }: Props,
        ref: Ref<HTMLDivElement>
    ) => {
        const [selectedDate, setSelectedDate] = useState<Date | null>(
            value ? new Date(value) : null
        );

        const handleChange = (date: Date | null) => {
            setSelectedDate(date);
            if (date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const formattedDate = `${year}-${month}-${day}`;
                onChange?.(formattedDate);
            } else {
                onChange?.("");
            }
        };

        return (
            <label className={`relative block w-full ${className || ""}`}>
                <div
                    ref={ref}
                    className="input-datetime-wrapper cursor-pointer"
                >
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText={placeholder}
                        required={required}
                        calendarClassName="custom-datepicker"
                        wrapperClassName="w-full"
                        popperClassName="custom-datepicker-popper"
                        showPopperArrow={false}
                        className={`input input-datetime input-date ${error ? "border-red-400" : ""}`}
                    />
                    <span className="input-datetime-icon">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                        </svg>
                    </span>
                </div>
                {error && (
                    <span className="absolute -bottom-5 left-0 block text-xs text-red-500">
                        {error}
                    </span>
                )}
            </label>
        );
    }
);

DatePickerInput.displayName = "DatePickerInput";
