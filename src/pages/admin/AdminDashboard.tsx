import { useEffect, useState, useCallback } from "react";
import {
    fetchReservationStats,
    fetchTableStats,
    fetchUpcomingReservations,
    fetchChartData,
    type ReservationStats,
    type TableStats,
    type DailyReservationPoint,
    type HourDistributionPoint,
    type WeekdayDistributionPoint,
    type LeadTimePoint,
    type ChartPeriod,
} from "../../lib/admin.service";
import type { DbReservation } from "../../lib/database.types";
import { ReservationsTrendChart } from "./charts/ReservationsTrendChart";
import { PeakHoursChart } from "./charts/PeakHoursChart";
import { BusiestDaysChart } from "./charts/BusiestDaysChart";
import { LeadTimeChart } from "./charts/LeadTimeChart";
import { AdminSelect } from "../../components/ui/AdminSelect";

const PERIOD_OPTIONS: { value: ChartPeriod; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
    { value: "6months", label: "Last 6 Months" },
    { value: "year", label: "Last Year" },
];

const PERIOD_SUBTITLES: Record<ChartPeriod, string> = {
    today: "Today",
    week: "This week (Mon – Sun)",
    month: "This month",
    last_month: "Last month",
    "6months": "Last 6 months",
    year: "Last 12 months",
};

type StatCardProps = {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: "blue" | "green" | "purple" | "orange";
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        orange: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
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

export const AdminDashboard = () => {
    const [stats, setStats] = useState<ReservationStats | null>(null);
    const [tableStats, setTableStats] = useState<TableStats | null>(null);
    const [upcomingReservations, setUpcomingReservations] = useState<DbReservation[]>([]);
    const [dailyData, setDailyData] = useState<DailyReservationPoint[]>([]);
    const [hourlyData, setHourlyData] = useState<HourDistributionPoint[]>([]);
    const [weekdayData, setWeekdayData] = useState<WeekdayDistributionPoint[]>([]);
    const [leadTimeData, setLeadTimeData] = useState<LeadTimePoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("month");
    const [chartsLoading, setChartsLoading] = useState(false);

    // Load stats + initial charts
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const [reservationStats, tables, upcoming, charts] = await Promise.all([
                fetchReservationStats(),
                fetchTableStats(),
                fetchUpcomingReservations(),
                fetchChartData(chartPeriod),
            ]);
            setStats(reservationStats);
            setTableStats(tables);
            setUpcomingReservations(upcoming.slice(0, 5));
            setDailyData(charts.daily);
            setHourlyData(charts.hourly);
            setWeekdayData(charts.weekday);
            setLeadTimeData(charts.leadTime);
            setIsLoading(false);
        };

        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Reload charts when period changes (skip initial load)
    const loadCharts = useCallback(async (period: ChartPeriod) => {
        setChartsLoading(true);
        const charts = await fetchChartData(period);
        setDailyData(charts.daily);
        setHourlyData(charts.hourly);
        setWeekdayData(charts.weekday);
        setLeadTimeData(charts.leadTime);
        setChartsLoading(false);
    }, []);

    const handlePeriodChange = (period: ChartPeriod) => {
        setChartPeriod(period);
        loadCharts(period);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-royal-blue border-t-transparent rounded-full" />
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Today's Reservations"
                    value={stats?.todayReservations ?? 0}
                    color="blue"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                />
                <StatCard
                    title="This Week"
                    value={stats?.weekReservations ?? 0}
                    color="green"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                />
                <StatCard
                    title="This Month"
                    value={stats?.monthReservations ?? 0}
                    color="purple"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    }
                />
                <StatCard
                    title="Upcoming"
                    value={stats?.upcomingReservations ?? 0}
                    color="orange"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Second row stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Reservations"
                    value={stats?.totalReservations ?? 0}
                    color="blue"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                />
                <StatCard
                    title="Total Guests"
                    value={stats?.totalGuests ?? 0}
                    color="green"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                />
                <StatCard
                    title="Avg. Party Size"
                    value={stats?.averagePartySize ?? 0}
                    color="purple"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                    }
                />
                <StatCard
                    title="Total Tables"
                    value={`${tableStats?.totalTables ?? 0} (${tableStats?.totalCapacity ?? 0} seats)`}
                    color="orange"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                />
            </div>

            {/* Upcoming Reservations & Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Upcoming reservations */}
                <div className="flex sm:h-[340px] flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm outline-none">
                    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                            Upcoming Reservations
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {upcomingReservations.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 flex h-full items-center justify-center">
                                No upcoming reservations
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {upcomingReservations.map((reservation) => (
                                    <div
                                        key={reservation.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/25 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {reservation.customer_name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {reservation.number_of_guests} guests
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {formatDate(reservation.reservation_date)}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatTime(reservation.reservation_time)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Lead Time Chart */}
                <LeadTimeChart data={leadTimeData} subtitle={PERIOD_SUBTITLES[chartPeriod]} />
            </div>

            {/* Period selector */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Analytics
                </h2>
                <AdminSelect
                    value={chartPeriod}
                    onChange={(v) => handlePeriodChange(v as ChartPeriod)}
                    options={PERIOD_OPTIONS}
                    compact
                />
            </div>

            {/* Charts — show loading overlay when switching periods */}
            <div className={`space-y-4 sm:space-y-6 transition-opacity ${chartsLoading ? "pointer-events-none opacity-50" : ""}`}>
                {/* Full-width trend chart */}
                <ReservationsTrendChart data={dailyData} subtitle={PERIOD_SUBTITLES[chartPeriod]} />

                {/* Two charts side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <PeakHoursChart data={hourlyData} subtitle={PERIOD_SUBTITLES[chartPeriod]} />
                    <BusiestDaysChart data={weekdayData} subtitle={PERIOD_SUBTITLES[chartPeriod]} />
                </div>
            </div>
        </div>
    );
};
