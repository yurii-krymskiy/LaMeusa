import React from "react";
import { Button } from "../../ui/Button";
import { useBookingStore } from "./store";

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
    const open = useBookingStore((state) => state.setIsOpen);

    return (
        <Button
            variant={variant}
            className={className}
            onClick={() => {
                open(true);
            }}
        >
            {children}
        </Button>
    );
};
