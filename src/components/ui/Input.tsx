import type { Ref } from "react";

type Props = {
    type: React.ComponentProps<"input">["type"];
    error?: string;
    required?: boolean;
    className?: string;
    placeholder?: React.ComponentProps<"input">["placeholder"];
    ref?: Ref<HTMLInputElement>;
};

export const Input = ({ type, ref, className, required, error, ...props }: Props) => {
    return (
        <label className="relative block w-full">
            <input
                type={type}
                required={required}
                placeholder={props.placeholder}
                ref={ref}
                className={className + " input"}
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
