import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import type { LeadTimePoint } from "../../../lib/admin.service";

type Props = { data: LeadTimePoint[]; subtitle?: string };

const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const { name, value, payload: entry } = payload[0];
    return (
        <div className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-2">
                <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">{name}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {value} reservations
            </p>
        </div>
    );
};

const RADIAN = Math.PI / 180;
const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: any) => {
    if (percent < 0.05) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={600}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const LeadTimeChart = ({ data, subtitle = "How far ahead guests book" }: Props) => {
    const hasData = data.some((d) => d.count > 0);
    const total = data.reduce((s, d) => s + d.count, 0);

    return (
        <div className="flex sm:h-[340px] flex-col rounded-xl bg-white p-4 sm:p-6 shadow-sm outline-none dark:bg-gray-800">
            <div className="mb-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    Booking Lead Time
                </h3>
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                    {subtitle}
                </p>
            </div>
            {hasData ? (
                <div className="flex flex-1 flex-col items-center gap-4 sm:flex-row sm:items-center">
                    <ResponsiveContainer width="100%" height={220} className="sm:!h-[240px] max-w-[220px] sm:max-w-[260px] shrink-0">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="count"
                                nameKey="range"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={55}
                                paddingAngle={2}
                                strokeWidth={0}
                                label={renderLabel}
                                labelLine={false}
                            >
                                {data.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col gap-2.5">
                        {data.map((d, i) => (
                            <div key={d.range} className="flex items-center gap-2.5">
                                <span
                                    className="h-3 w-3 shrink-0 rounded-sm"
                                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {d.range}
                                </span>
                                <span className="ml-auto pl-3 text-sm font-semibold tabular-nums text-gray-900 dark:text-white">
                                    {d.count}
                                </span>
                                <span className="w-10 text-right text-xs tabular-nums text-gray-400">
                                    {total > 0 ? `${Math.round((d.count / total) * 100)}%` : "0%"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
                    No data yet
                </p>
            )}
        </div>
    );
};
