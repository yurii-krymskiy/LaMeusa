import { useTheme } from "../../../lib/theme.context";

export const useChartTheme = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return {
        grid: isDark ? "#374151" : "#f3f4f6",
        tick: isDark ? "#9ca3af" : "#9ca3af",
        cursorFill: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
        cursorStroke: isDark ? "#4b5563" : "#e5e7eb",
        tooltipBg: isDark ? "#1f2937" : "#ffffff",
        tooltipBorder: isDark ? "#374151" : "#f3f4f6",
        isDark,
    };
};
