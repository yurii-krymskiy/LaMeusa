/* eslint-disable react-refresh/only-export-components */
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
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminBlockedSlots } from "./pages/admin/AdminBlockedSlots";
import { AdminReservations } from "./pages/admin/AdminReservations";
import { AdminVisitors } from "./pages/admin/AdminVisitors";
import { AdminMenu } from "./pages/admin/AdminMenu";
import { AdminBar } from "./pages/admin/AdminBar";
import { AdminCocktails } from "./pages/admin/AdminCocktails";
import { AdminWines } from "./pages/admin/AdminWines";
import { AdminBlog } from "./pages/admin/AdminBlog";
import { AdminBlogEditor } from "./pages/admin/AdminBlogEditor";
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
import ErrorPage from "./pages/ErrorPage";

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
            { path: "children-menu-los-cristianos", element: <SeoChildrenMenu /> },
            { path: "sauces-adds-los-cristianos", element: <SeoSauces /> },
            { path: "garnish-los-cristianos", element: <SeoGarnish /> },
        ],
    },
    { path: "booking", element: <Booking />, errorElement: <ErrorPage /> },
    { path: "visitors", element: <Visitors />, errorElement: <ErrorPage /> },
    // Admin routes
    { path: "admin", element: <AdminLogin />, errorElement: <ErrorPage /> },
    {
        path: "admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "blocked-slots", element: <AdminBlockedSlots /> },
            { path: "reservations", element: <AdminReservations /> },
            { path: "visitors", element: <AdminVisitors /> },
            { path: "menu", element: <AdminMenu /> },
            { path: "bar", element: <AdminBar /> },
            { path: "cocktails", element: <AdminCocktails /> },
            { path: "wines", element: <AdminWines /> },
            { path: "blog", element: <AdminBlog /> },
            { path: "blog/create", element: <AdminBlogEditor /> },
            { path: "blog/edit/:id", element: <AdminBlogEditor /> },
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
    { path: Paths.blog, label: "nav.blog" },
];
