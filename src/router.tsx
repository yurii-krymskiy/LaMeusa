import { BaseLayout } from "./components/layout/BaseLayout";
import About from "./pages/about/About";
import { Birthday } from "./pages/birthday/Birthday";
import Contact from "./pages/contact/Contact";
import { HappyHours } from "./pages/happy/HappyHours";
import Home from "./pages/home/Home";
import { Menu } from "./pages/menu/Menu";
import { Pasta } from "./pages/pasta/Pasta";
import Seafood from "./pages/seafood/Seafood";

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
} as const;

export type PathsType = typeof Paths;

export type PathValue = (typeof Paths)[keyof typeof Paths];

export const pagesLabels = [
    { path: Paths.home, label: "Home" },
    { path: Paths.about, label: "About" },
    { path: Paths.contact, label: "Contact" },
    { path: Paths.seafood, label: "Seafood" },

    { path: Paths.pasta, label: "Pasta" },
    { path: Paths.menu, label: "Menu" },
    { path: Paths.happyHours, label: "Happy Hours" },
    { path: Paths.birthdays, label: "Birthday Celebrations" },
];

//     { to: "/", label: "Home" },
//     { to: "/menu", label: "Menu" },
//     { to: "/about", label: "About" },
//     { to: "/seafood", label: "Seafood" },
//     { to: "/paella", label: "Paella" },
//     { to: "/burgers", label: "Burgers" },
//     { to: "/pizza", label: "Pizza" },
//     {
//         to: "/birthdays",
//         label: "Birthday celebrations",
//     },
//     {
//         to: "/happy-hours",
//         label: "Happy hours",
//     },
