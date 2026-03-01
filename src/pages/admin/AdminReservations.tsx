import { useEffect, useState } from "react";
import { fetchReservations, deleteReservation } from "../../lib/admin.service";
import type { DbReservation } from "../../lib/database.types";

type FilterType = "all" | "upcoming" | "past" | "today";

const ITEMS_PER_PAGE = 10;

export const AdminReservations = () => {
    const [reservations, setReservations] = useState<DbReservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<FilterType>("upcoming");
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadReservations = async () => {
        setIsLoading(true);
        const data = await fetchReservations();
        setReservations(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadReservations();
    }, []);

    // Reset to page 1 when filter or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, searchQuery]);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to cancel this reservation?")) {
            return;
        }

        const result = await deleteReservation(id);
        if (result.success) {
            setSuccess("Reservation cancelled successfully!");
            await loadReservations();
        } else {
            setError(result.error || "Failed to cancel reservation");
        }

        // Clear messages after 3 seconds
        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 3000);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
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

    const isToday = (dateStr: string) => {
        return dateStr === new Date().toISOString().split("T")[0];
    };

    const isUpcoming = (dateStr: string) => {
        return dateStr >= new Date().toISOString().split("T")[0];
    };

    // Filter reservations
    const filteredReservations = reservations
        .filter((r) => {
            switch (filter) {
                case "today":
                    return isToday(r.reservation_date);
                case "upcoming":
                    return isUpcoming(r.reservation_date);
                case "past":
                    return !isUpcoming(r.reservation_date);
                default:
                    return true;
            }
        })
        .filter((r) => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                r.customer_name.toLowerCase().includes(query) ||
                r.email.toLowerCase().includes(query) ||
                r.phone.toLowerCase().includes(query)
            );
        });

    // Pagination
    const totalPages = Math.ceil(filteredReservations.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedReservations = filteredReservations.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const getStatusBadge = (dateStr: string) => {
        if (isToday(dateStr)) {
            return (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                    Today
                </span>
            );
        }
        if (isUpcoming(dateStr)) {
            return (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                    Upcoming
                </span>
            );
        }
        return (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                Past
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    {/* Filter tabs */}
                    <div className="flex gap-2 flex-wrap">
                        {(["all", "today", "upcoming", "past"] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`admin-tab ${
                                    filter === f
                                        ? "admin-tab-active"
                                        : "admin-tab-inactive"
                                }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative max-w-xs w-full">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, phone..."
                            className="admin-input !pl-10"
                        />
                    </div>
                </div>
            </div>

            {/* Messages */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
                    {success}
                </div>
            )}

            {/* Reservations List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Reservations
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {filteredReservations.length} reservation{filteredReservations.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin h-8 w-8 border-4 border-royal-blue border-t-transparent rounded-full" />
                    </div>
                ) : filteredReservations.length === 0 ? (
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
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            No reservations found
                        </p>
                    </div>
                ) : (
                    <>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {paginatedReservations.map((reservation) => (
                            <div key={reservation.id}>
                                {/* Main row */}
                                <div
                                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                                    onClick={() =>
                                        setExpandedId(
                                            expandedId === reservation.id ? null : reservation.id
                                        )
                                    }
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-sky/10 dark:bg-sky/20 rounded-full flex items-center justify-center">
                                                <span className="text-sky font-semibold text-sm">
                                                    {reservation.customer_name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {reservation.customer_name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {reservation.number_of_guests} guests
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {formatDate(reservation.reservation_date)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatTime(reservation.reservation_time)}
                                                </p>
                                            </div>
                                            {getStatusBadge(reservation.reservation_date)}
                                            <svg
                                                className={`w-5 h-5 text-gray-400 transition-transform ${
                                                    expandedId === reservation.id ? "rotate-180" : ""
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded details */}
                                {expandedId === reservation.id && (
                                    <div className="px-4 pb-4 space-y-4 bg-gray-50 dark:bg-gray-700/30">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                    Date & Time
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                                                    {formatDate(reservation.reservation_date)} at{" "}
                                                    {formatTime(reservation.reservation_time)}, {reservation.number_of_guests} guests
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                    Email
                                                </p>
                                                <a
                                                    href={`mailto:${reservation.email}`}
                                                    className="text-sm font-medium text-sky hover:text-sky/80 dark:text-sky dark:hover:text-sky/80 hover:underline mt-1 block"
                                                >
                                                    {reservation.email}
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                    Phone
                                                </p>
                                                <a
                                                    href={`tel:${reservation.phone}`}
                                                    className="text-sm font-medium text-sky hover:text-sky/80 dark:text-sky dark:hover:text-sky/80 hover:underline mt-1 block"
                                                >
                                                    {reservation.phone}
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                    Promo Code
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                                                    {reservation.promo_code || "—"}
                                                </p>
                                            </div>
                                        </div>

                                        {reservation.additional_wishes && (
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                    Special Requests
                                                </p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 bg-white dark:bg-gray-800 p-3 rounded-lg">
                                                    {reservation.additional_wishes}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-2">
                                            <p className="text-xs text-gray-400">
                                                Created:{" "}
                                                {new Date(reservation.created_at).toLocaleString()}
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(reservation.id);
                                                }}
                                                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Cancel Reservation
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredReservations.length)} of {filteredReservations.length}
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
