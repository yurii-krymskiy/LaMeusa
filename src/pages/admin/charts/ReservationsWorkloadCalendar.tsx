import { useMemo, useState } from "react";
import type { WorkloadCalendarDay } from "../../../lib/admin.service";

type Props = {
    data: WorkloadCalendarDay[];
    monthDate: Date;
    isLoading?: boolean;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
};

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const buildCalendarGrid = (monthDate: Date) => {
    const firstOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const lastOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

    // Convert JS Sunday(0)...Saturday(6) into Monday-first offset
    const startOffset = (firstOfMonth.getDay() + 6) % 7;
    const totalCells = Math.ceil((startOffset + lastOfMonth.getDate()) / 7) * 7;

    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(firstOfMonth.getDate() - startOffset);

    const dates: Date[] = [];
    for (let i = 0; i < totalCells; i++) {
        const current = new Date(gridStart);
        current.setDate(gridStart.getDate() + i);
        dates.push(current);
    }

    return dates;
};

const getWorkloadCellClasses = (reservations: number, maxReservations: number) => {
    if (reservations === 0) {
        return "bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700";
    }

    if (maxReservations <= 0) {
        return "bg-blue-50 dark:bg-blue-900/25 border-blue-200 dark:border-blue-700";
    }

    const ratio = reservations / maxReservations;

    if (ratio <= 0.33) {
        return "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700";
    }

    if (ratio <= 0.66) {
        return "bg-amber-50 dark:bg-amber-900/25 border-amber-200 dark:border-amber-700";
    }

    if (ratio <= 0.85) {
        return "bg-orange-50 dark:bg-orange-900/25 border-orange-200 dark:border-orange-700";
    }

    return "bg-rose-50 dark:bg-rose-900/25 border-rose-200 dark:border-rose-700";
};

export const ReservationsWorkloadCalendar = ({
    data,
    monthDate,
    isLoading = false,
    onPreviousMonth,
    onNextMonth,
}: Props) => {
    const dates = useMemo(() => buildCalendarGrid(monthDate), [monthDate]);
    const statsByDate = new Map(data.map((entry) => [entry.date, entry]));
    const maxReservations = data.reduce(
        (maxValue, current) => Math.max(maxValue, current.reservations),
        0
    );
    const [selectedDateKey, setSelectedDateKey] = useState(() => formatDateKey(new Date()));

    const selectedDate = useMemo(() => {
        if (statsByDate.has(selectedDateKey)) {
            return new Date(`${selectedDateKey}T00:00:00`);
        }
        return new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    }, [monthDate, selectedDateKey, statsByDate]);

    const selectedDateKeySafe = formatDateKey(selectedDate);
    const selectedStats = statsByDate.get(selectedDateKeySafe) ?? {
        date: selectedDateKeySafe,
        reservations: 0,
        persons: 0,
        cancelledReservations: 0,
    };

    const monthLabel = monthDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const todayKey = formatDateKey(new Date());

    return (
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
            <div className="mb-4 flex flex-col items-center gap-3 text-center sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <div className="w-full sm:w-auto">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                        Reservations Workload Calendar
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        Per day: reservations, persons, and cancelled reservations
                    </p>
                </div>

                <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-start">
                    <button
                        type="button"
                        onClick={onPreviousMonth}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        aria-label="Previous month"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="min-w-20 text-center text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {monthLabel}
                    </div>
                    <button
                        type="button"
                        onClick={onNextMonth}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        aria-label="Next month"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Low
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Medium
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> High
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Peak
                </span>
            </div>

            <div className="hidden sm:block overflow-x-auto">
                <div className="min-w-[950px]">
                    <div className="grid grid-cols-7 gap-2">
                        {WEEKDAY_LABELS.map((label) => (
                            <div
                                key={label}
                                className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                            >
                                {label}
                            </div>
                        ))}

                        {dates.map((date) => {
                            const dateKey = formatDateKey(date);
                            const dayStats = statsByDate.get(dateKey);
                            const isCurrentMonth = date.getMonth() === monthDate.getMonth();
                            const isToday = dateKey === todayKey;
                            const isSelected = dateKey === selectedDateKeySafe;

                            const reservations = dayStats?.reservations ?? 0;
                            const persons = dayStats?.persons ?? 0;
                            const cancelledReservations = dayStats?.cancelledReservations ?? 0;

                            return (
                                <button
                                    key={dateKey}
                                    type="button"
                                    onClick={() => setSelectedDateKey(dateKey)}
                                    className={`min-h-32 rounded-lg border p-2.5 transition-colors ${getWorkloadCellClasses(reservations, maxReservations)} ${
                                        isCurrentMonth
                                            ? ""
                                            : "opacity-50"
                                    } ${isToday ? "ring-2 ring-sky/70" : ""} ${isSelected ? "ring-2 ring-royal-blue/70" : ""}`}
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                                            {date.getDate()}
                                        </span>
                                        {isToday && (
                                            <span className="rounded-full bg-sky/15 px-2 py-0.5 text-[10px] font-semibold text-sky dark:bg-sky/25">
                                                Today
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-1 text-[11px] leading-4 text-gray-700 dark:text-gray-200">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-gray-600 dark:text-gray-300">Reservations</span>
                                            <span className="font-semibold">{reservations}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-gray-600 dark:text-gray-300">Persons</span>
                                            <span className="font-semibold">{persons}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-gray-600 dark:text-gray-300">Cancelled</span>
                                            <span className="font-semibold text-rose-600 dark:text-rose-300">
                                                {cancelledReservations}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile compact grid */}
            <div className="sm:hidden mt-4">
                <div className="grid grid-cols-7 gap-1.5">
                    {WEEKDAY_LABELS.map((label) => (
                        <div
                            key={`mobile-${label}`}
                            className="text-center text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                        >
                            {label}
                        </div>
                    ))}

                    {dates.map((date) => {
                        const dateKey = formatDateKey(date);
                        const dayStats = statsByDate.get(dateKey);
                        const isCurrentMonth = date.getMonth() === monthDate.getMonth();
                        const isToday = dateKey === todayKey;
                        const isSelected = dateKey === selectedDateKeySafe;

                        const reservations = dayStats?.reservations ?? 0;
                        const persons = dayStats?.persons ?? 0;
                        const cancelledReservations = dayStats?.cancelledReservations ?? 0;

                        const showReservationsDot = reservations > 0;
                        const showPersonsDot = persons > 0;
                        const showCancelledDot = cancelledReservations > 0;

                        return (
                            <button
                                key={`mobile-${dateKey}`}
                                type="button"
                                onClick={() => setSelectedDateKey(dateKey)}
                                className={`min-h-14 rounded-md border p-1.5 ${getWorkloadCellClasses(reservations, maxReservations)} ${
                                    isCurrentMonth ? "" : "opacity-50"
                                } ${isSelected ? "ring-2 ring-royal-blue/70" : ""} ${isToday ? "ring-2 ring-sky/70" : ""}`}
                                aria-label={`Select ${dateKey}`}
                            >
                                <div className="text-[11px] font-semibold text-gray-700 dark:text-gray-100">
                                    {date.getDate()}
                                </div>
                                <div className="mt-1 flex items-center gap-1">
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${showReservationsDot ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
                                        title="Reservations"
                                    />
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${showPersonsDot ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`}
                                        title="Persons"
                                    />
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${showCancelledDot ? "bg-rose-500" : "bg-gray-300 dark:bg-gray-600"}`}
                                        title="Cancelled"
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900/60">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            {selectedDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                        {selectedDateKeySafe === todayKey && (
                            <span className="rounded-full bg-sky/15 px-2 py-0.5 text-[10px] font-semibold text-sky dark:bg-sky/25">
                                Today
                            </span>
                        )}
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-md bg-white p-2 dark:bg-gray-800">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Reservations</p>
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">{selectedStats.reservations}</p>
                        </div>
                        <div className="rounded-md bg-white p-2 dark:bg-gray-800">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Persons</p>
                            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{selectedStats.persons}</p>
                        </div>
                        <div className="rounded-md bg-white p-2 dark:bg-gray-800">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Cancelled</p>
                            <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">{selectedStats.cancelledReservations}</p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3 text-[11px] text-gray-600 dark:text-gray-300">
                        <span className="inline-flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-blue-500" /> Reservations
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Persons
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-rose-500" /> Cancelled
                        </span>
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-royal-blue border-t-transparent" />
                    Updating workload...
                </div>
            )}
        </div>
    );
};
