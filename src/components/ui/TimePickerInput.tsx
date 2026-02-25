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

type CustomInputProps = {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
    hasValue: boolean;
};

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
    ({ value, onClick, placeholder, hasValue }, ref) => (
        <div
            ref={ref}
            onClick={onClick}
            className="input-datetime-wrapper cursor-pointer"
        >
            <div className="input input-datetime input-time">
                {hasValue ? (
                    <span className="text-gray-700">{value}</span>
                ) : (
                    <span className="text-gray-700">{placeholder}</span>
                )}
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
    )
);

CustomInput.displayName = "CustomInput";

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
        const parseTimeToDate = (timeStr: string): Date | null => {
            if (!timeStr) return null;
            const [hours, minutes] = timeStr.split(":").map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        };

        const [selectedTime, setSelectedTime] = useState<Date | null>(
            value ? parseTimeToDate(value) : null
        );

        const handleChange = (date: Date | null) => {
            setSelectedTime(date);
            if (date) {
                const hours = date.getHours().toString().padStart(2, "0");
                const minutes = date.getMinutes().toString().padStart(2, "0");
                onChange?.(`${hours}:${minutes}`);
            } else {
                onChange?.("");
            }
        };

        return (
            <label className={`relative block w-full ${className || ""}`}>
                <DatePicker
                    selected={selectedTime}
                    onChange={handleChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    placeholderText={placeholder}
                    required={required}
                    customInput={
                        <CustomInput
                            ref={ref}
                            hasValue={!!selectedTime}
                            placeholder={placeholder}
                        />
                    }
                    calendarClassName="custom-timepicker"
                    wrapperClassName="w-full"
                    popperClassName="custom-datepicker-popper"
                    showPopperArrow={false}
                />
                {error && (
                    <span className="absolute -bottom-4 left-5 block text-xs text-red-400">
                        {error}
                    </span>
                )}
            </label>
        );
    }
);

TimePickerInput.displayName = "TimePickerInput";
