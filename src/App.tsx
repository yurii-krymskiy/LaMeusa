import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { pages } from "./router";

const router = createBrowserRouter(pages);

export default function App() {
    return <RouterProvider router={router} />;
}
