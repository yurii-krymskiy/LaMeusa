import type { Ref, InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "ref"> & {
    error?: string;
    ref?: Ref<HTMLInputElement>;
};

export const Input = ({
    type,
    ref,
    className = "",
    required,
    error,
    disabled,
    ...props
}: Props) => {
    const errorClasses = error
        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
        : "";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <label className="relative block w-full">
            <input
                type={type}
                required={required}
                placeholder={props.placeholder}
                ref={ref}
                disabled={disabled}
                className={`${className} input ${errorClasses} ${disabledClasses}`}
                {...props}
            />
            {error && (
                <span className="absolute -bottom-5 left-0 block text-xs text-red-500">
                    {error}
                </span>
            )}
        </label>
    );
};
