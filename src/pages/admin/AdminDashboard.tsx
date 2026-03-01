import { useEffect, useState } from "react";
import {
    fetchReservationStats,
    fetchTableStats,
    fetchUpcomingReservations,
    type ReservationStats,
    type TableStats,
} from "../../lib/admin.service";
import type { DbReservation } from "../../lib/database.types";

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const [reservationStats, tables, upcoming] = await Promise.all([
                fetchReservationStats(),
                fetchTableStats(),
                fetchUpcomingReservations(),
            ]);
            setStats(reservationStats);
            setTableStats(tables);
            setUpcomingReservations(upcoming.slice(0, 5)); // Show only 5 upcoming
            setIsLoading(false);
        };

        loadData();
    }, []);

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

            {/* Upcoming Reservations & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming reservations */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Upcoming Reservations
                        </h2>
                    </div>
                    <div className="p-6">
                        {upcomingReservations.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                No upcoming reservations
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {upcomingReservations.map((reservation) => (
                                    <div
                                        key={reservation.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
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

                {/* Tables overview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Tables Overview
                        </h2>
                    </div>
                    <div className="p-6">
                        {tableStats?.tables.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                No tables configured
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {tableStats?.tables.map((table) => (
                                    <div
                                        key={table.id}
                                        className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center"
                                    >
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {table.label}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {table.capacity} seats
                                        </p>
                                        {table.is_combinable && (
                                            <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                                                Combinable
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
