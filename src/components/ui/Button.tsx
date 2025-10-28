import { useNavigate } from "react-router-dom";
import type { PathValue } from "../../router";

type Props = {
    children: React.ReactNode;
    to?: PathValue;
    variant?: "blue" | "white" | "blue-outline" | "white-outline" | "default";
} & React.ComponentProps<"button">;

export const Button = ({
    children,
    to,
    variant = "default",
    className = "",
    ...props
}: Props) => {
    const navigate = useNavigate();

    const style = {
        blue: "button-blue",
        white: "button-white",
        "blue-outline": "button-blue-outline",
        "white-outline": "button-white-outline",
        default: "button-default",
    }[variant || "default"];

    const handleNavigate = () => {
        if (!to) return;
        navigate(to);
    };

    return (
        <button
            className={className + ` title button ${style}`}
            onClick={handleNavigate}
            {...props}
        >
            {children}
        </button>
    );
};
