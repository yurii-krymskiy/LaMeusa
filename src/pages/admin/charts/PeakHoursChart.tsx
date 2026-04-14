import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";
import type { HourDistributionPoint } from "../../../lib/admin.service";
import { useChartTheme } from "./useChartTheme";

type Props = { data: HourDistributionPoint[]; subtitle?: string };

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                {label}
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {payload[0].value} reservations
            </p>
        </div>
    );
};

export const PeakHoursChart = ({ data, subtitle = "Reservations by time of day" }: Props) => {
    const maxCount = Math.max(...data.map((d) => d.count), 1);
    const ct = useChartTheme();

    return (
        <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm outline-none dark:bg-gray-800">
            <div className="mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    Peak Hours
                </h3>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                    {subtitle}
                </p>
            </div>
            <ResponsiveContainer width="100%" height={220} className="sm:!h-[280px]">
                <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
                    <CartesianGrid vertical={false} stroke={ct.grid} />
                    <XAxis
                        dataKey="hour"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: ct.tick }}
                        dy={8}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: ct.tick }}
                        allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: ct.cursorFill }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={40}>
                        {data.map((entry) => (
                            <Cell
                                key={entry.hour}
                                fill={`rgba(139, 92, 246, ${0.3 + (entry.count / maxCount) * 0.7})`}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
