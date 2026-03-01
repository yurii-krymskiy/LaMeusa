import { useEffect, useState } from "react";
import {
    fetchBlockedSlots,
    createBlockedSlot,
    deleteBlockedSlot,
} from "../../lib/admin.service";
import type { DbBlockedSlot } from "../../lib/database.types";
import { AdminDatePicker } from "../../components/ui/AdminDatePicker";
import { AdminTimePicker } from "../../components/ui/AdminTimePicker";

export const AdminBlockedSlots = () => {
    const [blockedSlots, setBlockedSlots] = useState<DbBlockedSlot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form state
    const [blockDate, setBlockDate] = useState("");
    const [blockWholeDay, setBlockWholeDay] = useState(true);
    const [blockTimeStart, setBlockTimeStart] = useState("");
    const [blockTimeEnd, setBlockTimeEnd] = useState("");
    const [blockReason, setBlockReason] = useState("");

    const loadBlockedSlots = async () => {
        setIsLoading(true);
        const slots = await fetchBlockedSlots();
        setBlockedSlots(slots);
        setIsLoading(false);
    };

    useEffect(() => {
        loadBlockedSlots();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!blockDate) {
            setError("Please select a date to block");
            return;
        }

        if (!blockWholeDay && (!blockTimeStart || !blockTimeEnd)) {
            setError("Please select both start and end time");
            return;
        }

        setIsSubmitting(true);

        const result = await createBlockedSlot(
            blockDate,
            blockWholeDay ? null : blockTimeStart,
            blockWholeDay ? null : blockTimeEnd,
            blockReason || null
        );

        if (result.success) {
            setSuccess("Slot blocked successfully!");
            setBlockDate("");
            setBlockTimeStart("");
            setBlockTimeEnd("");
            setBlockReason("");
            setBlockWholeDay(true);
            await loadBlockedSlots();
        } else {
            setError(result.error || "Failed to block slot");
        }

        setIsSubmitting(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to remove this block?")) {
            return;
        }

        const result = await deleteBlockedSlot(id);
        if (result.success) {
            setSuccess("Block removed successfully!");
            await loadBlockedSlots();
        } else {
            setError(result.error || "Failed to remove block");
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatTime = (timeStr: string | null) => {
        if (!timeStr) return "All day";
        const [hours, minutes] = timeStr.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const isPastDate = (dateStr: string) => {
        return new Date(dateStr) < new Date(new Date().toDateString());
    };

    // Filter to only show future/today blocked slots
    const activeBlockedSlots = blockedSlots.filter((slot) => !isPastDate(slot.blocked_date));
    const pastBlockedSlots = blockedSlots.filter((slot) => isPastDate(slot.blocked_date));

    return (
        <div className="space-y-6">
            {/* Add New Block Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Block Date/Time Slot
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Prevent reservations for specific dates or time ranges
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Date *
                            </label>
                            <AdminDatePicker
                                value={blockDate}
                                onChange={(value) => setBlockDate(value)}
                                placeholder="Select date"
                                minDate={new Date()}
                            />
                        </div>

                        <div className="flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={blockWholeDay}
                                    onChange={(e) => setBlockWholeDay(e.target.checked)}
                                    className="admin-checkbox"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Block whole day
                                </span>
                            </label>
                        </div>

                        {!blockWholeDay && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Start Time *
                                    </label>
                                    <AdminTimePicker
                                        value={blockTimeStart}
                                        onChange={(value) => setBlockTimeStart(value)}
                                        placeholder="Start time"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        End Time *
                                    </label>
                                    <AdminTimePicker
                                        value={blockTimeEnd}
                                        onChange={(value) => setBlockTimeEnd(value)}
                                        placeholder="End time"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Reason (optional)
                        </label>
                        <input
                            type="text"
                            value={blockReason}
                            onChange={(e) => setBlockReason(e.target.value)}
                            placeholder="e.g., Private event, Maintenance, Holiday"
                            className="admin-input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-royal-blue hover:bg-navy text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Blocking...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Block Slot
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Active Blocked Slots */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Active Blocked Slots
                    </h2>
                </div>
                <div className="p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin h-8 w-8 border-4 border-royal-blue border-t-transparent rounded-full" />
                        </div>
                    ) : activeBlockedSlots.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            No active blocked slots
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {activeBlockedSlots.map((slot) => (
                                <div
                                    key={slot.id}
                                    className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {formatDate(slot.blocked_date)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {slot.blocked_time_start
                                                    ? `${formatTime(slot.blocked_time_start)} - ${formatTime(slot.blocked_time_end)}`
                                                    : "All day"}
                                                {slot.reason && ` • ${slot.reason}`}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(slot.id)}
                                        className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                                        title="Remove block"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Past Blocked Slots (collapsed) */}
            {pastBlockedSlots.length > 0 && (
                <details className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <summary className="p-6 cursor-pointer border-b border-gray-200 dark:border-gray-700">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            Past Blocked Slots ({pastBlockedSlots.length})
                        </span>
                    </summary>
                    <div className="p-6 space-y-3">
                        {pastBlockedSlots.map((slot) => (
                            <div
                                key={slot.id}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg opacity-60"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 dark:text-gray-300">
                                            {formatDate(slot.blocked_date)}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {slot.blocked_time_start
                                                ? `${formatTime(slot.blocked_time_start)} - ${formatTime(slot.blocked_time_end)}`
                                                : "All day"}
                                            {slot.reason && ` • ${slot.reason}`}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(slot.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Remove block"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </details>
            )}
        </div>
    );
};
