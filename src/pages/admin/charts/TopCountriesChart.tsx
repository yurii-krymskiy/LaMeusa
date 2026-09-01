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
import type { CountryStatPoint } from "../../../lib/admin.service";
import { useChartTheme } from "./useChartTheme";

type Props = { data: CountryStatPoint[]; limit?: number };

// A soft, distinct palette reused positionally (top country = first colour).
const BAR_COLORS = [
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#14b8a6",
    "#ef4444",
    "#6b7280",
];

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const p = payload[0].payload as CountryStatPoint;
    return (
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                {p.flag} {p.country}
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {p.count} {p.count === 1 ? "guest" : "guests"}
            </p>
        </div>
    );
};

export const TopCountriesChart = ({ data, limit = 8 }: Props) => {
    const ct = useChartTheme();

    const top = data.slice(0, limit).map((d) => ({
        ...d,
        label: `${d.flag} ${d.country}`,
    }));

    const totalGuests = data.reduce((sum, d) => sum + d.count, 0);
    const countriesCount = data.filter((d) => d.iso2 !== "??").length;

    return (
        <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm outline-none dark:bg-gray-800">
            <div className="mb-4 flex items-start justify-between sm:mb-6">
                <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Guests by Country
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                        Unique guests by phone dialing code
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {countriesCount}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">countries</p>
                </div>
            </div>

            {top.length === 0 ? (
                <div className="flex h-[240px] items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                    No guest data yet
                </div>
            ) : (
                <ResponsiveContainer
                    width="100%"
                    height={Math.max(200, top.length * 40)}
                >
                    <BarChart
                        data={top}
                        layout="vertical"
                        margin={{ top: 4, right: 16, bottom: 0, left: 8 }}
                    >
                        <CartesianGrid horizontal={false} stroke={ct.grid} />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: ct.tick }}
                            allowDecimals={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            width={140}
                            tick={{ fontSize: 12, fill: ct.tick }}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: ct.cursorFill }}
                        />
                        <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={26}>
                            {top.map((entry, i) => (
                                <Cell
                                    key={entry.iso2}
                                    fill={BAR_COLORS[i % BAR_COLORS.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}

            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                {totalGuests} unique guests total
                {data.length > limit ? ` · showing top ${limit}` : ""}
            </p>
        </div>
    );
};
