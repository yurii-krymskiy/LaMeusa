import type { LoyaltyStats } from "../../../lib/admin.service";

type Props = { data: LoyaltyStats; subtitle?: string };

export const ReturningGuestsCard = ({ data, subtitle }: Props) => {
    const total = data.newGuests + data.returningGuests;
    const returningPct = total ? (data.returningGuests / total) * 100 : 0;

    return (
        <div className="flex sm:h-[340px] flex-col rounded-xl bg-white p-4 sm:p-6 shadow-sm outline-none dark:bg-gray-800">
            <div className="mb-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    Returning Guests
                </h3>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                    {subtitle ?? "Loyalty"} · matched by phone / email across all
                    bookings
                </p>
            </div>

            {total > 0 ? (
                <div className="flex flex-1 flex-col justify-center gap-6">
                    <div>
                        <p className="text-4xl font-semibold tabular-nums text-gray-900 dark:text-white">
                            {data.returningShare}%
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            of reservations in this period were made by guests who
                            booked before
                        </p>
                    </div>

                    {/* two-segment share bar */}
                    <div>
                        <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
                            <div
                                className="bg-violet-500"
                                style={{ width: `${Math.max(returningPct, 1.5)}%` }}
                            />
                            <div
                                className="bg-blue-500"
                                style={{ width: `${Math.max(100 - returningPct, 1.5)}%` }}
                            />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="inline-block h-2.5 w-2.5 rounded-full bg-violet-500" />
                                <span className="text-gray-600 dark:text-gray-300">Returning</span>
                                <span className="font-semibold tabular-nums text-gray-900 dark:text-white">
                                    {data.returningGuests}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                                <span className="text-gray-600 dark:text-gray-300">New</span>
                                <span className="font-semibold tabular-nums text-gray-900 dark:text-white">
                                    {data.newGuests}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="flex flex-1 items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                    No data for this period
                </p>
            )}
        </div>
    );
};
