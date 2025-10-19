import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Footer } from "../Footer";
import { Booking } from "../../pages/booking/Booking";

export const BaseLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Booking />
        </>
    );
};
