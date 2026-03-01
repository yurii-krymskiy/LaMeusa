import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minDate?: Date;
};

type CustomInputProps = {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
};

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
    ({ value, onClick, placeholder }, ref) => (
        <div
            ref={ref}
            onClick={onClick}
            className="admin-datepicker-input cursor-pointer"
        >
            <div className="flex items-center justify-between w-full">
                <span className={value ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
                    {value || placeholder}
                </span>
                <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
            </div>
        </div>
    )
);

CustomInput.displayName = "CustomInput";

export const AdminDatePicker = ({
    value,
    onChange,
    placeholder = "Select date",
    minDate,
}: Props) => {
    const selectedDate = value ? new Date(value) : null;

    const handleChange = (date: Date | null) => {
        if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            onChange(formattedDate);
        } else {
            onChange("");
        }
    };

    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholder}
            minDate={minDate}
            customInput={<CustomInput placeholder={placeholder} />}
            calendarClassName="admin-datepicker-calendar"
            wrapperClassName="w-full"
            popperClassName="admin-datepicker-popper"
            showPopperArrow={false}
        />
    );
};
