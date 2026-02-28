import type { Ref, TextareaHTMLAttributes } from "react";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "ref"> & {
    error?: string;
    ref?: Ref<HTMLTextAreaElement>;
};

export const Textarea = ({
    ref,
    className = "",
    required,
    error,
    disabled,
    ...props
}: Props) => {
    return (
        <label className="relative block w-full">
            <textarea
                required={required}
                placeholder={props.placeholder}
                ref={ref}
                disabled={disabled}
                rows={3}
                className={`${className} input ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                {...props}
            />
            {error && (
                <span className="absolute -bottom-4 left-5 block text-xs text-red-400">
                    {error}
                </span>
            )}
        </label>
    );
};
