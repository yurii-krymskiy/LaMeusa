import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { pages } from "./router";
import { AuthProvider } from "./lib/auth.context";
import { ThemeProvider } from "./lib/theme.context";

const router = createBrowserRouter(pages);

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    );
}
