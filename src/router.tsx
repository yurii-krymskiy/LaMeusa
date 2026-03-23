/* eslint-disable react-refresh/only-export-components */
import { BaseLayout } from "./components/layout/BaseLayout";
import About from "./pages/about/About";
import { Birthday } from "./pages/birthday/Birthday";
import { Booking } from "./pages/booking/Booking";
import Contact from "./pages/contact/Contact";
import { HappyHours } from "./pages/happy/HappyHours";
import Home from "./pages/home/Home";
import { Menu } from "./pages/menu/Menu";
import { Pasta } from "./pages/pasta/Pasta";
import Seafood from "./pages/seafood/Seafood";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminBlockedSlots } from "./pages/admin/AdminBlockedSlots";
import { AdminReservations } from "./pages/admin/AdminReservations";
import { AdminVisitors } from "./pages/admin/AdminVisitors";
import { AdminMenu } from "./pages/admin/AdminMenu";
import { Visitors } from "./pages/visitors/Visitors";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiesSettings from "./pages/legal/CookiesSettings";

export const pages = [
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "seafood", element: <Seafood /> },
            { path: "happy-hours", element: <HappyHours /> },
            { path: "pasta", element: <Pasta /> },
            { path: "menu", element: <Menu /> },
            { path: "birthdays", element: <Birthday /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "terms-of-service", element: <TermsOfService /> },
            { path: "cookies-settings", element: <CookiesSettings /> },
        ],
    },
    { path: "booking", element: <Booking /> },
    { path: "visitors", element: <Visitors /> },
    // Admin routes
    { path: "admin", element: <AdminLogin /> },
    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "blocked-slots", element: <AdminBlockedSlots /> },
            { path: "reservations", element: <AdminReservations /> },
            { path: "visitors", element: <AdminVisitors /> },
            { path: "menu", element: <AdminMenu /> },
        ],
    },
];

export const Paths = {
    home: "/",
    about: "/about",
    contact: "/contact",
    seafood: "/seafood",
    pasta: "/pasta",
    menu: "/menu",
    happyHours: "/happy-hours",
    birthdays: "/birthdays",
    booking: "/booking",
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
    cookiesSettings: "/cookies-settings",
} as const;

export type PathsType = typeof Paths;

export type PathValue = (typeof Paths)[keyof typeof Paths];

export const pagesLabels = [
    { path: Paths.home, label: "nav.home" },
    { path: Paths.about, label: "nav.about" },
    { path: Paths.contact, label: "nav.contact" },
    { path: Paths.seafood, label: "nav.seafood" },

    { path: Paths.pasta, label: "nav.pasta" },
    { path: Paths.menu, label: "nav.menu" },
    { path: Paths.happyHours, label: "nav.happyHours" },
    { path: Paths.birthdays, label: "nav.birthday" },
];
