import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from "recharts";
import type { ForecastDay } from "../../../lib/admin.service";
import { useChartTheme } from "./useChartTheme";

type Props = { data: ForecastDay[]; totalCapacity: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const day: ForecastDay = payload[0].payload;
    return (
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                {label}
            </p>
            <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-gray-600 dark:text-gray-300">Booked</span>
                    <span className="ml-auto pl-4 font-semibold text-gray-900 dark:text-white">
                        {day.onBooksGuests} guests · {day.onBooksReservations} res.
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500/30" />
                    <span className="text-gray-600 dark:text-gray-300">Expected extra</span>
                    <span className="ml-auto pl-4 font-semibold text-gray-900 dark:text-white">
                        +{day.expectedExtra}
                    </span>
                </div>
                <p className="border-t border-gray-100 pt-1 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    Forecast: <b>{day.forecastGuests} guests</b> · {day.occupancy}% of seats
                </p>
            </div>
        </div>
    );
};

export const WeekForecastChart = ({ data, totalCapacity }: Props) => {
    const ct = useChartTheme();
    const hasData = data.length > 0;
    const maxValue = Math.max(totalCapacity, ...data.map((d) => d.forecastGuests));

    return (
        <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm outline-none dark:bg-gray-800">
            <div className="mb-4 sm:mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Next 7 Days Forecast
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                        Booked guests + expected pickup (8-week booking pace blended
                        with weekday averages)
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Booked</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500/30" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Expected extra</span>
                    </div>
                </div>
            </div>
            {hasData ? (
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data} margin={{ top: 16, right: 8, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: ct.tick }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            domain={[0, Math.ceil(maxValue / 10) * 10]}
                            tick={{ fontSize: 12, fill: ct.tick }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: ct.cursorFill }} />
                        {totalCapacity > 0 && (
                            <ReferenceLine
                                y={totalCapacity}
                                stroke={ct.tick}
                                strokeDasharray="6 4"
                                label={{
                                    value: `Full house (${totalCapacity})`,
                                    position: "insideTopRight",
                                    fontSize: 11,
                                    fill: ct.tick,
                                }}
                            />
                        )}
                        <Bar
                            dataKey="onBooksGuests"
                            name="Booked"
                            stackId="forecast"
                            fill="#10b981"
                            maxBarSize={44}
                        />
                        <Bar
                            dataKey="expectedExtra"
                            name="Expected extra"
                            stackId="forecast"
                            fill="#10b981"
                            fillOpacity={0.3}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={44}
                        />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="flex h-[260px] items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                    Not enough data to build a forecast
                </p>
            )}
        </div>
    );
};
