import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import { Paths } from "../../../router";

type Props = {
    variant?: "blue" | "white" | "blue-outline" | "white-outline" | "default";
    children: React.ReactNode;
    className?: string;
};
export const ButtonOpenReservation = ({
    variant,
    children,
    className,
}: Props) => {
    const navigate = useNavigate();

    return (
        <Button
            variant={variant}
            className={className}
            onClick={() => {
                navigate(Paths.booking);
            }}
        >
            {children}
        </Button>
    );
};
