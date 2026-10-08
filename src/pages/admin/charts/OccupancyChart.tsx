import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from "recharts";
import type { OccupancyPoint } from "../../../lib/admin.service";
import { useChartTheme } from "./useChartTheme";

type Props = { data: OccupancyPoint[]; totalCapacity: number; subtitle?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                {label}
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {payload[0].value}% of seats booked
            </p>
        </div>
    );
};

export const OccupancyChart = ({ data, totalCapacity, subtitle }: Props) => {
    const ct = useChartTheme();
    const hasData = data.some((d) => d.occupancy > 0);
    const maxValue = Math.max(100, ...data.map((d) => d.occupancy));

    return (
        <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm outline-none dark:bg-gray-800">
            <div className="mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    Seat Occupancy
                </h3>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                    {subtitle ?? "Booked guests"} · share of {totalCapacity} seats per day
                </p>
            </div>
            {hasData ? (
                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                        <defs>
                            <linearGradient id="occupancyFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11, fill: ct.tick }}
                            axisLine={false}
                            tickLine={false}
                            interval="preserveStartEnd"
                            minTickGap={24}
                        />
                        <YAxis
                            domain={[0, Math.ceil(maxValue / 20) * 20]}
                            tickFormatter={(v) => `${v}%`}
                            tick={{ fontSize: 12, fill: ct.tick }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: ct.cursorStroke, strokeDasharray: "4 4" }}
                        />
                        <ReferenceLine
                            y={100}
                            stroke={ct.tick}
                            strokeDasharray="6 4"
                            label={{
                                value: "Full house",
                                position: "insideTopRight",
                                fontSize: 11,
                                fill: ct.tick,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="occupancy"
                            stroke="#10b981"
                            strokeWidth={2}
                            fill="url(#occupancyFill)"
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <p className="flex h-[260px] items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                    No data for this period
                </p>
            )}
        </div>
    );
};
