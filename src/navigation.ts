type NavItem = {
    to: string;
    label: string;
};

export const nav: NavItem[] = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/seafood", label: "Seafood" },
    { to: "/paella", label: "Paella" },
    { to: "/burgers", label: "Burgers" },
    { to: "/pizza", label: "Pizza" },
    {
        to: "/birthdays",
        label: "Birthday celebrations",
    },
    {
        to: "/happy-hours",
        label: "Happy hours",
    },
];
