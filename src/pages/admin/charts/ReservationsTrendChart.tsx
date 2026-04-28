import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import type { DailyReservationPoint } from "../../../lib/admin.service";
import { useChartTheme } from "./useChartTheme";

type Props = { data: DailyReservationPoint[]; subtitle?: string };

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                {label}
            </p>
            {payload.map((entry: any) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
                    <span className="ml-auto font-semibold text-gray-900 dark:text-white">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export const ReservationsTrendChart = ({ data, subtitle = "Last 30 days" }: Props) => {
    const ct = useChartTheme();

    return (
    <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm outline-none dark:bg-gray-800">
        <div className="mb-4 sm:mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    Reservations & Guests
                </h3>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                    {subtitle}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Reservations</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Guests</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Cancelled</span>
                </div>
            </div>
        </div>
        <ResponsiveContainer width="100%" height={220} className="sm:!h-[280px]">
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
                <defs>
                    <linearGradient id="fillRes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillGuests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={ct.grid} />
                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: ct.tick }}
                    interval="preserveStartEnd"
                    dy={8}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: ct.tick }}
                    allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: ct.cursorStroke }} />
                <Area
                    type="monotone"
                    dataKey="reservations"
                    stroke="#3b82f6"
                    fill="url(#fillRes)"
                    strokeWidth={2}
                    name="Reservations"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, fill: ct.isDark ? "#1f2937" : "#fff" }}
                />
                <Area
                    type="monotone"
                    dataKey="guests"
                    stroke="#10b981"
                    fill="url(#fillGuests)"
                    strokeWidth={2}
                    name="Guests"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, fill: ct.isDark ? "#1f2937" : "#fff" }}
                />
                <Line
                    type="monotone"
                    dataKey="cancelledReservations"
                    stroke="#ef4444"
                    strokeWidth={2.5}
                    name="Cancelled"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, fill: ct.isDark ? "#1f2937" : "#fff" }}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
    );
};
