import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Seafood from "./pages/seafood/Seafood";
import Pasta from "./pages/pasta/Pasta";
import { BaseLayout } from "./components/layout/BaseLayout";
import { Menu } from "./pages/menu/Menu";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "seafood", element: <Seafood /> },
            { path: "pasta", element: <Pasta /> },
            { path: "menu", element: <Menu /> },
            // {
            //     path: "/booking",
            //     element: <Booking />,
            //     children: [
            //         { index: true, element: <BookingTable /> },
            //         { path: "confirm", element: <BookingConfirm /> },
            //     ],
            // },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
