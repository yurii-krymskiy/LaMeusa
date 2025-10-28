import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import { Footer } from "../Footer";
import { Booking } from "../../pages/booking/Booking";
import { useLayoutEffect } from "react";

export const BaseLayout = () => {
    const { pathname } = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Booking />
        </>
    );
};
