import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
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
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 6v6l4 2" />
                </svg>
            </div>
        </div>
    )
);

CustomInput.displayName = "CustomInput";

export const AdminTimePicker = ({
    value,
    onChange,
    placeholder = "Select time",
}: Props) => {
    const parseTimeToDate = (timeStr: string): Date | null => {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const selectedTime = value ? parseTimeToDate(value) : null;

    const handleChange = (date: Date | null) => {
        if (date) {
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            onChange(`${hours}:${minutes}`);
        } else {
            onChange("");
        }
    };

    return (
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
            customInput={<CustomInput placeholder={placeholder} />}
            calendarClassName="admin-timepicker-calendar"
            wrapperClassName="w-full"
            popperClassName="admin-datepicker-popper"
            showPopperArrow={false}
        />
    );
};
