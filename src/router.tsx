/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy, type ComponentType } from "react";
import { BaseLayout } from "./components/layout/BaseLayout";
import About from "./pages/about/About";
import { Booking } from "./pages/booking/Booking";
import { CancelReservation } from "./pages/booking/CancelReservation";
import Contact from "./pages/contact/Contact";
import { HappyHours } from "./pages/happy/HappyHours";
import Home from "./pages/home/Home";
import { Menu } from "./pages/menu/Menu";
import { Pasta } from "./pages/pasta/Pasta";
import Seafood from "./pages/seafood/Seafood";
import { Blog } from "./pages/blog/Blog";
import { BlogArticle } from "./pages/blog/BlogArticle";
import { Visitors } from "./pages/visitors/Visitors";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiesSettings from "./pages/legal/CookiesSettings";
import SeoSalads from "./pages/seo/SeoSalads";
import SeoPizza from "./pages/seo/SeoPizza";
import SeoMeat from "./pages/seo/SeoMeat";
import SeoBurgers from "./pages/seo/SeoBurgers";
import SeoPaella from "./pages/seo/SeoPaella";
import SeoSeafood from "./pages/seo/SeoSeafood";
import SeoTapas from "./pages/seo/SeoTapas";
import SeoPasta from "./pages/seo/SeoPasta";
import SeoDessert from "./pages/seo/SeoDessert";
import SeoChildrenMenu from "./pages/seo/SeoChildrenMenu";
import SeoSauces from "./pages/seo/SeoSauces";
import SeoGarnish from "./pages/seo/SeoGarnish";
import { Delivery } from "./pages/delivery/Delivery";
import { Takeaway } from "./pages/takeaway/Takeaway";
import ErrorPage from "./pages/ErrorPage";

// Admin pages are loaded on demand so the public bundle stays small
// (they pull in the editor and chart libraries).
const lazyAdmin = <T extends object>(
    loader: () => Promise<T>,
    name: keyof T
) => {
    const Component = lazy(() =>
        loader().then((m) => ({ default: m[name] as unknown as ComponentType }))
    );
    return (
        <Suspense fallback={null}>
            <Component />
        </Suspense>
    );
};
const AdminLoginPage = lazyAdmin(() => import("./pages/admin/AdminLogin"), "AdminLogin");
const AdminLayoutPage = lazyAdmin(() => import("./pages/admin/AdminLayout"), "AdminLayout");
const AdminDashboardPage = lazyAdmin(() => import("./pages/admin/AdminDashboard"), "AdminDashboard");
const AdminBlockedSlotsPage = lazyAdmin(() => import("./pages/admin/AdminBlockedSlots"), "AdminBlockedSlots");
const AdminReservationsPage = lazyAdmin(() => import("./pages/admin/AdminReservations"), "AdminReservations");
const AdminVisitorsPage = lazyAdmin(() => import("./pages/admin/AdminVisitors"), "AdminVisitors");
const AdminMenuPage = lazyAdmin(() => import("./pages/admin/AdminMenu"), "AdminMenu");
const AdminBarPage = lazyAdmin(() => import("./pages/admin/AdminBar"), "AdminBar");
const AdminCocktailsPage = lazyAdmin(() => import("./pages/admin/AdminCocktails"), "AdminCocktails");
const AdminWinesPage = lazyAdmin(() => import("./pages/admin/AdminWines"), "AdminWines");
const AdminBlogPage = lazyAdmin(() => import("./pages/admin/AdminBlog"), "AdminBlog");
const AdminBlogEditorPage = lazyAdmin(() => import("./pages/admin/AdminBlogEditor"), "AdminBlogEditor");

export const pages = [
    {
        path: "/",
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "seafood", element: <Seafood /> },
            { path: "happy-hours", element: <HappyHours /> },
            { path: "pasta", element: <Pasta /> },
            { path: "menu", element: <Menu /> },
            { path: "delivery", element: <Delivery /> },
            { path: "takeaway", element: <Takeaway /> },
            { path: "blog", element: <Blog /> },
            { path: "blog/:id", element: <BlogArticle /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "terms-of-service", element: <TermsOfService /> },
            { path: "cookies-settings", element: <CookiesSettings /> },
            { path: "reservation/cancel", element: <CancelReservation /> },
            // SEO pages
            { path: "best-salads-tenerife", element: <SeoSalads /> },
            { path: "pizza-los-cristianos", element: <SeoPizza /> },
            { path: "meat-los-cristianos", element: <SeoMeat /> },
            { path: "burgers-los-cristianos", element: <SeoBurgers /> },
            { path: "paella-los-cristianos", element: <SeoPaella /> },
            { path: "fish-seafood-los-cristianos", element: <SeoSeafood /> },
            { path: "tapas-appetizers-los-cristianos", element: <SeoTapas /> },
            { path: "pasta-los-cristianos", element: <SeoPasta /> },
            { path: "dessert-los-cristianos", element: <SeoDessert /> },
            {
                path: "children-menu-los-cristianos",
                element: <SeoChildrenMenu />,
            },
            { path: "sauces-adds-los-cristianos", element: <SeoSauces /> },
            { path: "garnish-los-cristianos", element: <SeoGarnish /> },
        ],
    },
    { path: "booking", element: <Booking />, errorElement: <ErrorPage /> },
    { path: "visitors", element: <Visitors />, errorElement: <ErrorPage /> },
    // Admin routes
    { path: "admin", element: AdminLoginPage, errorElement: <ErrorPage /> },
    {
        path: "admin",
        element: AdminLayoutPage,
        errorElement: <ErrorPage />,
        children: [
            { path: "dashboard", element: AdminDashboardPage },
            { path: "blocked-slots", element: AdminBlockedSlotsPage },
            { path: "reservations", element: AdminReservationsPage },
            { path: "visitors", element: AdminVisitorsPage },
            { path: "menu", element: AdminMenuPage },
            { path: "bar", element: AdminBarPage },
            { path: "cocktails", element: AdminCocktailsPage },
            { path: "wines", element: AdminWinesPage },
            { path: "blog", element: AdminBlogPage },
            { path: "blog/create", element: AdminBlogEditorPage },
            { path: "blog/edit/:id", element: AdminBlogEditorPage },
        ],
    },
    { path: "*", element: <ErrorPage /> },
];

export const Paths = {
    home: "/",
    about: "/about",
    contact: "/contact",
    seafood: "/seafood",
    pasta: "/pasta",
    menu: "/menu",
    happyHours: "/happy-hours",
    delivery: "/delivery",
    takeaway: "/takeaway",
    blog: "/blog",
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
    { path: Paths.delivery, label: "nav.delivery" },
    { path: Paths.takeaway, label: "nav.takeaway" },
    // { path: Paths.blog, label: "nav.blog" },
];
