import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
    fetchVisitors,
    fetchVisitorStats,
    type VisitorStats,
} from "../../lib/admin.service";
import type { DbVisitor } from "../../lib/database.types";
import { AdminDatePicker } from "../../components/ui/AdminDatePicker";

const ITEMS_PER_PAGE = 15;

// ── date helpers ──────────────────────────────────────────────────────────────

const toDateStr = (d: Date) => d.toISOString().split("T")[0];
const todayStr = () => toDateStr(new Date());

const thisWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return toDateStr(new Date(now.getFullYear(), now.getMonth(), diff));
};

const thisMonthStart = () => {
    const now = new Date();
    return toDateStr(new Date(now.getFullYear(), now.getMonth(), 1));
};

const lastMonthStart = () => {
    const now = new Date();
    return toDateStr(new Date(now.getFullYear(), now.getMonth() - 1, 1));
};

const lastMonthEnd = () => {
    const now = new Date();
    return toDateStr(new Date(now.getFullYear(), now.getMonth(), 0));
};

// ── types ─────────────────────────────────────────────────────────────────────

type Preset = "today" | "week" | "month" | "last_month" | null;

// ── subcomponents ─────────────────────────────────────────────────────────────

type StatCardProps = {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: "blue" | "green" | "purple";
    highlight?: boolean;
};

const StatCard = ({ title, value, icon, color, highlight }: StatCardProps) => {
    const colorMap = {
        blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    };

    return (
        <div
            className={`rounded-xl shadow-sm p-6 ${
                highlight
                    ? "bg-sky/5 dark:bg-sky/10 ring-1 ring-sky/30"
                    : "bg-white dark:bg-gray-800"
            }`}
        >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${colorMap[color]}`}>{icon}</div>
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

type PresetChipProps = {
    label: string;
    active: boolean;
    onClick: () => void;
};

const PresetChip = ({ label, active, onClick }: PresetChipProps) => (
    <button
        type="button"
        onClick={onClick}
        className={`admin-tab w-full text-center ${active ? "admin-tab-active" : "admin-tab-inactive"}`}
    >
        {label}
    </button>
);

// ── main component ────────────────────────────────────────────────────────────

export const AdminVisitors = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [visitors, setVisitors] = useState<DbVisitor[]>([]);
    const [stats, setStats] = useState<VisitorStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dateFrom, setDateFrom] = useState<string>(searchParams.get("from") ?? "");
    const [dateTo, setDateTo] = useState<string>(searchParams.get("to") ?? "");
    const [activePreset, setActivePreset] = useState<Preset>((searchParams.get("preset") as Preset) ?? null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        const [visitorsData, statsData] = await Promise.all([
            fetchVisitors(dateFrom || undefined, dateTo || undefined),
            fetchVisitorStats(),
        ]);
        setVisitors(visitorsData);
        setStats(statsData);
        setIsLoading(false);
    }, [dateFrom, dateTo]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [dateFrom, dateTo]);

    // Sync filters to URL
    useEffect(() => {
        const params: Record<string, string> = {};
        if (dateFrom) params.from = dateFrom;
        if (dateTo) params.to = dateTo;
        if (activePreset) params.preset = activePreset;
        setSearchParams(params, { replace: true });
    }, [dateFrom, dateTo, activePreset, setSearchParams]);

    // ── preset handlers ───────────────────────────────────────────────────────

    const applyPreset = (preset: Preset) => {
        setActivePreset(preset);
        switch (preset) {
            case "today":
                setDateFrom(todayStr());
                setDateTo(todayStr());
                break;
            case "week":
                setDateFrom(thisWeekStart());
                setDateTo(todayStr());
                break;
            case "month":
                setDateFrom(thisMonthStart());
                setDateTo(todayStr());
                break;
            case "last_month":
                setDateFrom(lastMonthStart());
                setDateTo(lastMonthEnd());
                break;
            default:
                break;
        }
    };

    const clearFilter = () => {
        setActivePreset(null);
        setDateFrom("");
        setDateTo("");
    };

    const handleFromChange = (val: string) => {
        setDateFrom(val);
        setActivePreset(null);
    };

    const handleToChange = (val: string) => {
        setDateTo(val);
        setActivePreset(null);
    };

    // ── derived values ────────────────────────────────────────────────────────

    const hasFilter = !!dateFrom || !!dateTo;

    const rangeGuestTotal = visitors.reduce(
        (sum, v) => sum + v.number_of_guests,
        0
    );

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

    // ── pagination ────────────────────────────────────────────────────────────

    const totalPages = Math.ceil(visitors.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedVisitors = visitors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const pageNumbers = () => {
        const pages: number[] = [];
        const total = Math.min(totalPages, 5);
        for (let i = 0; i < total; i++) {
            if (totalPages <= 5) {
                pages.push(i + 1);
            } else if (currentPage <= 3) {
                pages.push(i + 1);
            } else if (currentPage >= totalPages - 2) {
                pages.push(totalPages - 4 + i);
            } else {
                pages.push(currentPage - 2 + i);
            }
        }
        return pages;
    };

    // ── render ────────────────────────────────────────────────────────────────

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
                <StatCard
                    title={hasFilter ? "In Range" : "All Time"}
                    value={rangeGuestTotal}
                    color="green"
                    highlight={hasFilter}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 space-y-4">
                {/* Quick presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <PresetChip label="Today" active={activePreset === "today"} onClick={() => applyPreset("today")} />
                    <PresetChip label="This Week" active={activePreset === "week"} onClick={() => applyPreset("week")} />
                    <PresetChip label="This Month" active={activePreset === "month"} onClick={() => applyPreset("month")} />
                    <PresetChip label="Last Month" active={activePreset === "last_month"} onClick={() => applyPreset("last_month")} />
                </div>

                {/* Date range pickers + clear */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                        <div className="flex-1 min-w-0">
                            <AdminDatePicker
                                value={dateFrom}
                                onChange={handleFromChange}
                                placeholder="From date"
                            />
                        </div>
                        <svg className="hidden sm:block w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="flex-1 min-w-0">
                            <AdminDatePicker
                                value={dateTo}
                                onChange={handleToChange}
                                placeholder="To date"
                            />
                        </div>
                    </div>
                    {hasFilter && (
                        <button
                            onClick={clearFilter}
                            className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors py-2 sm:py-0"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear filter
                        </button>
                    )}
                </div>
            </div>

            {/* Visitors Table */}
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
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            No visitor records found{hasFilter ? " for this range" : ""}
                        </p>
                        {hasFilter && (
                            <button onClick={clearFilter} className="mt-3 text-sm text-sky hover:underline">
                                Clear filter
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Guests</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {paginatedVisitors.map((visitor, index) => (
                                        <tr key={visitor.id} className="hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors">
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

                        {/* Mobile cards */}
                        <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
                            {paginatedVisitors.map((visitor, index) => (
                                <div key={visitor.id} className="flex items-center justify-between px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-gray-400 dark:text-gray-500 w-5 text-right shrink-0">
                                            {startIndex + index + 1}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {formatDate(visitor.created_at)}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatTime(visitor.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky/10 text-sky dark:bg-sky/20 shrink-0">
                                        {visitor.number_of_guests} guest{visitor.number_of_guests !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
                                    <span className="hidden sm:inline">Showing </span>{startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, visitors.length)} <span className="hidden sm:inline">of</span><span className="sm:hidden">/</span> {visitors.length}
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
                                        {pageNumbers().map((page) => (
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
                                        ))}
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
