type Props = {
    children: React.ReactNode;
    variant?: "blue" | "white" | "blue-outline" | "white-outline" | "default";
} & React.ComponentProps<"button">;

export const Button = ({
    children,
    variant = "default",
    className = "",
    ...props
}: Props) => {
    const style = {
        blue: "button-blue",
        white: "button-white",
        "blue-outline": "button-blue-outline",
        "white-outline": "button-white-outline",
        default: "button-default",
    }[variant || "default"];

    return (
        <button className={className + ` title button ${style}`} {...props}>
            {children}
        </button>
    );
};
