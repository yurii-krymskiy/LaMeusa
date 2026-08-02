import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

import { pages } from "./router";
import { AuthProvider } from "./lib/auth.context";
import { ThemeProvider } from "./lib/theme.context";
import { getBasenameFromPath } from "./lib/i18nRouting";

const router = createBrowserRouter(pages, {
    basename: getBasenameFromPath(window.location.pathname),
});

export default function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <ThemeProvider>
                    <Toaster position="top-right" richColors closeButton />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}
