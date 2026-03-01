import { useState } from "react";
import { useAuth } from "../../lib/auth.context";
import { useTheme } from "../../lib/theme.context";
import { Navigate, Outlet, useLocation, Link } from "react-router-dom";

type SidebarItem = {
    path: string;
    label: string;
    icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
    {
        path: "/admin/dashboard",
        label: "Statistics",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        path: "/admin/blocked-slots",
        label: "Block Slots",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
    },
    {
        path: "/admin/reservations",
        label: "Reservations",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        path: "/admin/visitors",
        label: "Visitors",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
];

export const AdminLayout = () => {
    const { user, isLoading, signOut } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="animate-spin h-8 w-8 border-4 border-royal-blue border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin" replace />;
    }

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                    <Link to="/admin/dashboard" className="flex items-center gap-3">
                        <img
                            src="/icons/logo.svg"
                            alt="La Medusa"
                            className="h-10 dark:hidden"
                        />
                        <img
                            src="/icons/logo-white.svg"
                            alt="La Medusa"
                            className="h-10 hidden dark:block"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-royal-blue text-white"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500"
                                }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Back to Site</span>
                    </a>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Page title */}
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white hidden lg:block">
                        {sidebarItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
                    </h1>

                    <div className="flex items-center gap-4">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                        >
                            {theme === "light" ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>

                        {/* User info & logout */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                                {user.email}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                title="Sign out"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
