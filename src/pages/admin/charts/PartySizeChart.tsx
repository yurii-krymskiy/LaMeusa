import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import type { PartySizePoint } from "../../../lib/admin.service";
import { useChartTheme } from "./useChartTheme";

type Props = { data: PartySizePoint[]; subtitle?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Party of {label}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {payload[0].value} reservations
            </p>
        </div>
    );
};

export const PartySizeChart = ({ data, subtitle }: Props) => {
    const ct = useChartTheme();
    const hasData = data.some((d) => d.count > 0);

    return (
        <div className="flex sm:h-[340px] flex-col rounded-xl bg-white p-4 sm:p-6 shadow-sm outline-none dark:bg-gray-800">
            <div className="mb-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    Party Size
                </h3>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                    {subtitle ?? "Guests per reservation"}
                </p>
            </div>
            {hasData ? (
                <ResponsiveContainer width="100%" height={240} className="flex-1">
                    <BarChart data={data} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} vertical={false} />
                        <XAxis
                            dataKey="size"
                            tick={{ fontSize: 12, fill: ct.tick }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: ct.tick }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: ct.cursorFill }}
                        />
                        <Bar
                            dataKey="count"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={38}
                        />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="flex flex-1 items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                    No data for this period
                </p>
            )}
        </div>
    );
};
