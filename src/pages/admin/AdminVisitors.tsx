import { useEffect, useState, useCallback } from "react";
import {
    fetchVisitors,
    fetchVisitorStats,
    type VisitorStats,
} from "../../lib/admin.service";
import type { DbVisitor } from "../../lib/database.types";
import { AdminDatePicker } from "../../components/ui/AdminDatePicker";

const ITEMS_PER_PAGE = 10;

type StatCardProps = {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: "blue" | "green" | "purple";
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const AdminVisitors = () => {
    const [visitors, setVisitors] = useState<DbVisitor[]>([]);
    const [stats, setStats] = useState<VisitorStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filterDate, setFilterDate] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        const [visitorsData, statsData] = await Promise.all([
            fetchVisitors(filterDate || undefined),
            fetchVisitorStats(filterDate || undefined),
        ]);
        setVisitors(visitorsData);
        setStats(statsData);
        setIsLoading(false);
    }, [filterDate]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterDate]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const clearFilter = () => {
        setFilterDate("");
    };

    // Pagination
    const totalPages = Math.ceil(visitors.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedVisitors = visitors.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title={stats?.dayLabel ?? "Today's Guests"}
                    value={stats?.dayGuests ?? 0}
                    color="blue"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatCard
                    title={stats?.monthLabel ?? "This Month"}
                    value={stats?.monthGuests ?? 0}
                    color="purple"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                />
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-4">
                    <div className="w-64">
                        <AdminDatePicker
                            value={filterDate}
                            onChange={(value) => setFilterDate(value)}
                            placeholder="Filter by date"
                        />
                    </div>
                    {filterDate && (
                        <button
                            onClick={clearFilter}
                            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear filter
                        </button>
                    )}
                </div>
            </div>

            {/* Visitors List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Visitor Records
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {visitors.length} record{visitors.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin h-8 w-8 border-4 border-royal-blue border-t-transparent rounded-full" />
                    </div>
                ) : visitors.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            No visitor records found
                            {filterDate && " for this date"}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Time
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Guests
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {paginatedVisitors.map((visitor, index) => (
                                        <tr
                                            key={visitor.id}
                                            className="hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {formatDate(visitor.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {formatTime(visitor.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky/10 text-sky dark:bg-sky/20">
                                                    {visitor.number_of_guests} guest{visitor.number_of_guests !== 1 ? "s" : ""}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, visitors.length)} of {visitors.length}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                            let page;
                                            if (totalPages <= 5) {
                                                page = i + 1;
                                            } else if (currentPage <= 3) {
                                                page = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                page = totalPages - 4 + i;
                                            } else {
                                                page = currentPage - 2 + i;
                                            }
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                                        currentPage === page
                                                            ? "bg-sky text-white"
                                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
