import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    fetchReservationStats,
    fetchTableStats,
    fetchUpcomingReservations,
    fetchAnalytics,
    fetchWeekForecast,
    fetchWorkloadCalendarData,
    fetchCountryStats,
    type ReservationStats,
    type TableStats,
    type ChartPeriod,
    type AnalyticsBundle,
    type ForecastDay,
    type WorkloadCalendarDay,
    type CountryStatPoint,
} from "../../lib/admin.service";
import type { DbReservation } from "../../lib/database.types";
import { ReservationsTrendChart } from "./charts/ReservationsTrendChart";
import { PeakHoursChart } from "./charts/PeakHoursChart";
import { BusiestDaysChart } from "./charts/BusiestDaysChart";
import { LeadTimeChart } from "./charts/LeadTimeChart";
import { PartySizeChart } from "./charts/PartySizeChart";
import { OccupancyChart } from "./charts/OccupancyChart";
import { WeekForecastChart } from "./charts/WeekForecastChart";
import { ReturningGuestsCard } from "./charts/ReturningGuestsCard";
import { TopCountriesChart } from "./charts/TopCountriesChart";
import { ReservationsWorkloadCalendar } from "./charts/ReservationsWorkloadCalendar";
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

const PERIOD_COMPARISONS: Record<ChartPeriod, string> = {
    today: "vs yesterday",
    week: "vs previous week",
    month: "vs previous month",
    last_month: "vs month before",
    "6months": "vs previous 6 months",
    year: "vs previous 12 months",
};

type StatCardProps = {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    color: "blue" | "green" | "purple" | "orange" | "red";
};

const StatCard = ({ title, value, subtitle, icon, color }: StatCardProps) => {
    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        orange: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
        red: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400",
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
                    {subtitle && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Period summary tile with Δ vs previous period ────────────────────────────
const formatDelta = (
    current: number,
    previous: number,
    opts: { invert?: boolean; pp?: boolean } = {}
) => {
    const neutral = "text-gray-400 dark:text-gray-500";
    if (!previous && !current) return { text: "—", cls: neutral };
    if (!previous) return { text: "new", cls: neutral };

    const diff = opts.pp
        ? current - previous
        : ((current - previous) / previous) * 100;
    const rounded = Math.round(diff * 10) / 10;
    if (rounded === 0) return { text: opts.pp ? "±0 pp" : "±0%", cls: neutral };

    const up = rounded > 0;
    const good = opts.invert ? !up : up;
    return {
        text: `${up ? "▲" : "▼"} ${Math.abs(rounded)}${opts.pp ? " pp" : "%"}`,
        cls: good
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-500 dark:text-red-400",
    };
};

type SummaryTileProps = {
    label: string;
    value: string | number;
    current: number;
    previous: number;
    comparison: string;
    invert?: boolean;
    pp?: boolean;
};

const SummaryTile = ({ label, value, current, previous, comparison, invert, pp }: SummaryTileProps) => {
    const delta = formatDelta(current, previous, { invert, pp });
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
                {label}
            </p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {value}
            </p>
            <p className={`mt-1 text-xs font-medium ${delta.cls}`}>
                {delta.text}
                <span className="ml-1 font-normal text-gray-400 dark:text-gray-500">
                    {comparison}
                </span>
            </p>
        </div>
    );
};

const SectionHeading = ({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}) => (
    <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
        </div>
        {children}
    </div>
);

export const AdminDashboard = () => {
    const [stats, setStats] = useState<ReservationStats | null>(null);
    const [tableStats, setTableStats] = useState<TableStats | null>(null);
    const [upcomingReservations, setUpcomingReservations] = useState<DbReservation[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsBundle | null>(null);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [workloadData, setWorkloadData] = useState<WorkloadCalendarDay[]>([]);
    const [countryStats, setCountryStats] = useState<CountryStatPoint[]>([]);
    const [workloadMonth, setWorkloadMonth] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("month");
    const [chartsLoading, setChartsLoading] = useState(false);
    const [workloadLoading, setWorkloadLoading] = useState(false);

    // Load snapshot + initial analytics
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const tables = await fetchTableStats();
            const [reservationStats, upcoming, analyticsBundle, weekForecast, workload, countries] =
                await Promise.all([
                    fetchReservationStats(),
                    fetchUpcomingReservations(),
                    fetchAnalytics(chartPeriod, tables.totalCapacity),
                    fetchWeekForecast(tables.totalCapacity),
                    fetchWorkloadCalendarData(new Date()),
                    fetchCountryStats(),
                ]);
            setTableStats(tables);
            setStats(reservationStats);
            setUpcomingReservations(upcoming);
            setAnalytics(analyticsBundle);
            setForecast(weekForecast);
            setWorkloadData(workload);
            setCountryStats(countries);
            setIsLoading(false);
        };

        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadAnalytics = useCallback(
        async (period: ChartPeriod, capacity: number) => {
            setChartsLoading(true);
            const bundle = await fetchAnalytics(period, capacity);
            setAnalytics(bundle);
            setChartsLoading(false);
        },
        []
    );

    const handlePeriodChange = (period: ChartPeriod) => {
        setChartPeriod(period);
        loadAnalytics(period, tableStats?.totalCapacity ?? 0);
    };

    const loadWorkloadForMonth = useCallback(async (month: Date) => {
        setWorkloadLoading(true);
        const monthData = await fetchWorkloadCalendarData(month);
        setWorkloadData(monthData);
        setWorkloadLoading(false);
    }, []);

    const handlePreviousWorkloadMonth = () => {
        const previousMonth = new Date(workloadMonth.getFullYear(), workloadMonth.getMonth() - 1, 1);
        setWorkloadMonth(previousMonth);
        loadWorkloadForMonth(previousMonth);
    };

    const handleNextWorkloadMonth = () => {
        const nextMonth = new Date(workloadMonth.getFullYear(), workloadMonth.getMonth() + 1, 1);
        setWorkloadMonth(nextMonth);
        loadWorkloadForMonth(nextMonth);
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

    const subtitle = PERIOD_SUBTITLES[chartPeriod];
    const comparison = PERIOD_COMPARISONS[chartPeriod];
    const summary = analytics?.summary;
    const previousSummary = analytics?.previousSummary;

    return (
        <div className="space-y-6">
            {/* ════ Overview — live snapshot, independent of the analytics filter ════ */}
            <SectionHeading
                title="Overview"
                subtitle="Live snapshot — always current, not affected by the analytics period"
            />

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
                    title="This Week Reservations"
                    value={stats?.weekReservations ?? 0}
                    color="green"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                />
                <StatCard
                    title="This Month Reservations"
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
                    title="Today's Cancellations"
                    value={stats?.todayCancellations ?? 0}
                    color="red"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatCard
                    title="Today's Guests"
                    value={stats?.todayGuests ?? 0}
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

            {/* Upcoming reservations + all-time countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex sm:h-[340px] flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm outline-none">
                    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                            Upcoming Reservations
                        </h2>
                        <Link
                            to="/admin/reservations"
                            className="text-sm font-medium text-sky hover:text-sky/80 transition-colors flex items-center gap-1"
                        >
                            View all
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {upcomingReservations.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 flex h-full items-center justify-center">
                                No upcoming reservations
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {upcomingReservations.slice(0, 5).map((reservation) => (
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
                                            {reservation.additional_wishes && (
                                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                                                    Wishes: {reservation.additional_wishes}
                                                </p>
                                            )}
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

                <TopCountriesChart data={countryStats} />
            </div>

            {/* Forward-looking: next week forecast (live, independent of filter) */}
            <WeekForecastChart
                data={forecast}
                totalCapacity={tableStats?.totalCapacity ?? 0}
            />

            {/* ════ Analytics — everything below follows one period filter ════ */}
            <div className="pt-2">
                <SectionHeading
                    title="Analytics"
                    subtitle="Every chart and number below follows the selected period"
                >
                    <AdminSelect
                        value={chartPeriod}
                        onChange={(v) => handlePeriodChange(v as ChartPeriod)}
                        options={PERIOD_OPTIONS}
                        compact
                    />
                </SectionHeading>
            </div>

            <div className={`space-y-4 sm:space-y-6 transition-opacity ${chartsLoading ? "pointer-events-none opacity-50" : ""}`}>
                {/* Period summary with comparison to the previous period */}
                {summary && previousSummary && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <SummaryTile
                            label="Reservations"
                            value={summary.reservations}
                            current={summary.reservations}
                            previous={previousSummary.reservations}
                            comparison={comparison}
                        />
                        <SummaryTile
                            label="Guests"
                            value={summary.guests}
                            current={summary.guests}
                            previous={previousSummary.guests}
                            comparison={comparison}
                        />
                        <SummaryTile
                            label="Avg. Party Size"
                            value={summary.avgPartySize}
                            current={summary.avgPartySize}
                            previous={previousSummary.avgPartySize}
                            comparison={comparison}
                        />
                        <SummaryTile
                            label="Cancellation Rate"
                            value={`${summary.cancellationRate}%`}
                            current={summary.cancellationRate}
                            previous={previousSummary.cancellationRate}
                            comparison={comparison}
                            invert
                            pp
                        />
                    </div>
                )}

                {/* Full-width trend chart */}
                <ReservationsTrendChart data={analytics?.daily ?? []} subtitle={subtitle} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <PeakHoursChart data={analytics?.hourly ?? []} subtitle={subtitle} />
                    <BusiestDaysChart data={analytics?.weekday ?? []} subtitle={subtitle} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <LeadTimeChart data={analytics?.leadTime ?? []} subtitle={subtitle} />
                    <PartySizeChart data={analytics?.partySize ?? []} subtitle={subtitle} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <ReturningGuestsCard
                        data={
                            analytics?.loyalty ?? {
                                newGuests: 0,
                                returningGuests: 0,
                                returningShare: 0,
                            }
                        }
                        subtitle={subtitle}
                    />
                    <OccupancyChart
                        data={analytics?.occupancy ?? []}
                        totalCapacity={tableStats?.totalCapacity ?? 0}
                        subtitle={subtitle}
                    />
                </div>
            </div>

            {/* ════ Monthly workload — its own month navigation ════ */}
            <ReservationsWorkloadCalendar
                data={workloadData}
                monthDate={workloadMonth}
                isLoading={workloadLoading}
                onPreviousMonth={handlePreviousWorkloadMonth}
                onNextMonth={handleNextWorkloadMonth}
            />
        </div>
    );
};
