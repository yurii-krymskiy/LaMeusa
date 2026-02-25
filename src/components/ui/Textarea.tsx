import type { Ref } from "react";

type Props = {
    type: React.ComponentProps<"input">["type"];
    error?: string;
    required?: boolean;
    className?: string;
    placeholder?: React.ComponentProps<"textarea">["placeholder"];
    ref?: Ref<HTMLTextAreaElement>;
};

export const Textarea = ({ ref, className, required, error, ...props }: Props) => {
    return (
        <label className="relative block w-full">
            <textarea
                required={required}
                placeholder={props.placeholder}
                ref={ref}
                rows={3}
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
