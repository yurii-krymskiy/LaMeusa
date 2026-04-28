/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase, type DbMenuItem, type DbCategory, type DbBarCategory, type DbBarItem, type DbCocktailCategory, type DbCocktailItem, type DbWineCategory, type DbWine } from "./supabase";
import type { DbReservation, DbBlockedSlot, DbTable, DbVisitor } from "./database.types";

// Statistics types
export type ReservationStats = {
    todayCancellations: number;
    todayReservations: number;
    weekReservations: number;
    monthReservations: number;
    todayGuests: number;
    averagePartySize: number;
    upcomingReservations: number;
};

export type TableStats = {
    totalTables: number;
    totalCapacity: number;
    tables: DbTable[];
};

// Fetch all reservations
export const fetchReservations = async (): Promise<DbReservation[]> => {
    const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("reservation_date", { ascending: false })
        .order("reservation_time", { ascending: false });

    if (error) {
        console.error("Error fetching reservations:", error);
        return [];
    }

    return data || [];
};

// Tenerife timezone helpers
const TENERIFE_TZ = "Atlantic/Canary";

const getTenerifeNow = (): { dateStr: string; timeStr: string } => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-CA", { timeZone: TENERIFE_TZ });
    const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: TENERIFE_TZ,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return { dateStr, timeStr };
};

const isReservationInFuture = (reservationDate: string, reservationTime: string): boolean => {
    const { dateStr, timeStr } = getTenerifeNow();
    if (reservationDate > dateStr) return true;
    if (reservationDate === dateStr) return reservationTime.slice(0, 5) > timeStr;
    return false;
};

// Fetch upcoming reservations (future datetime in Tenerife time, non-cancelled)
export const fetchUpcomingReservations = async (): Promise<DbReservation[]> => {
    const { dateStr } = getTenerifeNow();

    const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .gte("reservation_date", dateStr)
        .is("cancelled_at", null)
        .order("reservation_date", { ascending: true })
        .order("reservation_time", { ascending: true });

    if (error) {
        console.error("Error fetching upcoming reservations:", error);
        return [];
    }

    return (data || []).filter((r) => isReservationInFuture(r.reservation_date, r.reservation_time));
};

// Fetch reservation statistics
export const fetchReservationStats = async (): Promise<ReservationStats> => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    // Week start (Monday)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1);
    const weekStartStr = weekStart.toISOString().split("T")[0];
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const weekEndStr = weekEnd.toISOString().split("T")[0];

    // Month start
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthStartStr = monthStart.toISOString().split("T")[0];
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const monthEndStr = monthEnd.toISOString().split("T")[0];

    // Fetch all reservations
    const { data: allReservations, error } = await supabase
        .from("reservations")
        .select("*");

    if (error || !allReservations) {
        console.error("Error fetching stats:", error);
        return {
            todayCancellations: 0,
            todayReservations: 0,
            weekReservations: 0,
            monthReservations: 0,
            todayGuests: 0,
            averagePartySize: 0,
            upcomingReservations: 0,
        };
    }

    const nonCancelled = allReservations.filter((r) => !r.cancelled_at);

    const todayNonCancelled = nonCancelled.filter(
        (r) => r.reservation_date === todayStr
    );
    const todayCancellations = allReservations.filter(
        (r) => r.reservation_date === todayStr && r.cancelled_at
    ).length;
    const todayGuests = todayNonCancelled.reduce(
        (sum, r) => sum + r.number_of_guests,
        0
    );

    const weekReservations = nonCancelled.filter(
        (r) => r.reservation_date >= weekStartStr && r.reservation_date <= weekEndStr
    );

    const monthReservations = nonCancelled.filter(
        (r) => r.reservation_date >= monthStartStr && r.reservation_date <= monthEndStr
    );

    const upcomingReservations = nonCancelled.filter(
        (r) => isReservationInFuture(r.reservation_date, r.reservation_time)
    );

    const totalNonCancelledGuests = nonCancelled.reduce(
        (sum, r) => sum + r.number_of_guests,
        0
    );

    return {
        todayCancellations,
        todayReservations: todayNonCancelled.length,
        weekReservations: weekReservations.length,
        monthReservations: monthReservations.length,
        todayGuests,
        averagePartySize:
            nonCancelled.length > 0
                ? Math.round((totalNonCancelledGuests / nonCancelled.length) * 10) / 10
                : 0,
        upcomingReservations: upcomingReservations.length,
    };
};

// Fetch table stats
export const fetchTableStats = async (): Promise<TableStats> => {
    const { data, error } = await supabase
        .from("tables")
        .select("*")
        .order("label", { ascending: true });

    if (error || !data) {
        console.error("Error fetching tables:", error);
        return {
            totalTables: 0,
            totalCapacity: 0,
            tables: [],
        };
    }

    return {
        totalTables: data.length,
        totalCapacity: data.reduce((sum, t) => sum + t.capacity, 0),
        tables: data,
    };
};

// Fetch blocked slots
export const fetchBlockedSlots = async (): Promise<DbBlockedSlot[]> => {
    const { data, error } = await supabase
        .from("blocked_slots")
        .select("*")
        .order("blocked_date", { ascending: true })
        .order("blocked_time_start", { ascending: true });

    if (error) {
        console.error("Error fetching blocked slots:", error);
        return [];
    }

    return data || [];
};

// Chart data types
export type DailyReservationPoint = {
    date: string; // "Mon 7", "Tue 8", etc.
    reservations: number;
    guests: number;
    cancelledReservations: number;
};

export type HourDistributionPoint = {
    hour: string; // "12:00", "13:00", etc.
    count: number;
};

export type WeekdayDistributionPoint = {
    day: string; // "Mon", "Tue", etc.
    count: number;
};

export type LeadTimePoint = {
    range: string; // "Same day", "1-2 days", etc.
    count: number;
};

export type ChartPeriod = "today" | "week" | "month" | "last_month" | "6months" | "year";

// Fetch all reservations for chart analytics
export const fetchChartData = async (period: ChartPeriod = "month") => {
    const today = new Date();

    let startDate: Date;
    let endDate: Date = new Date(today);

    switch (period) {
        case "today":
            startDate = new Date(today);
            break;
        case "week": {
            startDate = new Date(today);
            startDate.setDate(today.getDate() - today.getDay() + 1); // Monday
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // Sunday
            break;
        }
        case "month": {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            break;
        }
        case "last_month":
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0); // last day of prev month
            break;
        case "6months":
            startDate = new Date(today);
            startDate.setMonth(today.getMonth() - 6);
            break;
        case "year":
            startDate = new Date(today);
            startDate.setFullYear(today.getFullYear() - 1);
            break;
    }

    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("reservations")
        .select("reservation_date, reservation_time, number_of_guests, created_at")
        .gte("reservation_date", startStr)
        .lte("reservation_date", endStr)
        .is("cancelled_at", null)
        .order("reservation_date", { ascending: true });

    const { data: cancelledData, error: cancelledError } = await supabase
        .from("reservations")
        .select("reservation_date")
        .gte("reservation_date", startStr)
        .lte("reservation_date", endStr)
        .not("cancelled_at", "is", null);

    if (error || !data || cancelledError || !cancelledData) {
        console.error("Error fetching chart data:", error);
        return { daily: [], hourly: [], weekday: [], leadTime: [] };
    }

    // --- Daily trend ---
    const dailyMap = new Map<string, { reservations: number; guests: number; cancelledReservations: number }>();
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split("T")[0];
        dailyMap.set(key, { reservations: 0, guests: 0, cancelledReservations: 0 });
    }
    for (const r of data) {
        const entry = dailyMap.get(r.reservation_date);
        if (entry) {
            entry.reservations++;
            entry.guests += r.number_of_guests;
        }
    }
    for (const r of cancelledData) {
        const entry = dailyMap.get(r.reservation_date);
        if (entry) {
            entry.cancelledReservations++;
        }
    }

    const useLongDate = period === "6months" || period === "year";
    const daily: DailyReservationPoint[] = Array.from(dailyMap.entries()).map(
        ([dateStr, val]) => {
            const d = new Date(dateStr + "T00:00:00");
            const label = useLongDate
                ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
            return {
                date: label,
                reservations: val.reservations,
                guests: val.guests,
                cancelledReservations: val.cancelledReservations,
            };
        }
    );

    // --- Hourly distribution (all time) ---
    const hourlyMap = new Map<number, number>();
    for (const r of data) {
        const hour = parseInt(r.reservation_time.split(":")[0]);
        hourlyMap.set(hour, (hourlyMap.get(hour) ?? 0) + 1);
    }
    const hourly: HourDistributionPoint[] = Array.from(hourlyMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([hour, count]) => ({
            hour: `${hour.toString().padStart(2, "0")}:00`,
            count,
        }));

    // --- Weekday distribution (all time) ---
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekdayMap = new Array(7).fill(0);
    for (const r of data) {
        const day = new Date(r.reservation_date + "T00:00:00").getDay();
        weekdayMap[day]++;
    }
    // Start from Monday
    const weekday: WeekdayDistributionPoint[] = [1, 2, 3, 4, 5, 6, 0].map(
        (i) => ({ day: dayNames[i], count: weekdayMap[i] })
    );

    // --- Lead time distribution ---
    const leadBuckets = [
        { range: "Same day", max: 0 },
        { range: "1-2 days", max: 2 },
        { range: "3-7 days", max: 7 },
        { range: "1-2 weeks", max: 14 },
        { range: "2+ weeks", max: Infinity },
    ];
    const leadCounts = new Array(leadBuckets.length).fill(0);
    for (const r of data) {
        // Compare booking dates at day precision to avoid dropping same-day bookings.
        const createdDateOnly = r.created_at.split("T")[0];
        const created = new Date(createdDateOnly + "T00:00:00");
        const resDate = new Date(r.reservation_date + "T00:00:00");
        const diffDays = Math.max(0, Math.floor(
            (resDate.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
        ));
        let prev = -1;
        for (let i = 0; i < leadBuckets.length; i++) {
            if (diffDays > prev && diffDays <= leadBuckets[i].max) {
                leadCounts[i]++;
                break;
            }
            prev = leadBuckets[i].max;
        }
    }
    const leadTime: LeadTimePoint[] = leadBuckets.map((b, i) => ({
        range: b.range,
        count: leadCounts[i],
    }));

    return { daily, hourly, weekday, leadTime };
};

// Create blocked slot
export const createBlockedSlot = async (
    blockedDate: string,
    blockedTimeStart: string | null,
    blockedTimeEnd: string | null,
    reason: string | null
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from("blocked_slots").insert({
        blocked_date: blockedDate,
        blocked_time_start: blockedTimeStart,
        blocked_time_end: blockedTimeEnd,
        reason,
    });

    if (error) {
        console.error("Error creating blocked slot:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Delete blocked slot
export const deleteBlockedSlot = async (
    id: number
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase
        .from("blocked_slots")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting blocked slot:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Delete reservation
export const deleteReservation = async (
    id: number
): Promise<{ success: boolean; error?: string }> => {
    // First delete from reservation_tables junction table
    await supabase.from("reservation_tables").delete().eq("reservation_id", id);

    // Then delete the reservation
    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) {
        console.error("Error deleting reservation:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// ===================== VISITORS =====================

export type VisitorStats = {
    dayGuests: number;
    monthGuests: number;
    dayLabel: string;
    monthLabel: string;
};

// Create a new visitor record
export const createVisitor = async (
    numberOfGuests: number
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from("visitors").insert({
        number_of_guests: numberOfGuests,
    });

    if (error) {
        console.error("Error creating visitor:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Fetch all visitors with optional date filter
export const fetchVisitors = async (
    filterDate?: string
): Promise<DbVisitor[]> => {
    let query = supabase
        .from("visitors")
        .select("*")
        .order("created_at", { ascending: false });

    if (filterDate) {
        // Filter by specific date
        const startOfDay = `${filterDate}T00:00:00`;
        const endOfDay = `${filterDate}T23:59:59`;
        query = query.gte("created_at", startOfDay).lte("created_at", endOfDay);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching visitors:", error);
        return [];
    }

    return data || [];
};

// Fetch visitor statistics (day, month) - optionally for a specific date
export const fetchVisitorStats = async (filterDate?: string): Promise<VisitorStats> => {
    const targetDate = filterDate ? new Date(filterDate) : new Date();
    const targetDateStr = filterDate || targetDate.toISOString().split("T")[0];

    // Month start of the target date
    const monthStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const monthStartStr = monthStart.toISOString().split("T")[0];

    // Month end of the target date
    const monthEnd = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    const monthEndStr = monthEnd.toISOString().split("T")[0];

    // Fetch all visitors for the target month
    const { data, error } = await supabase
        .from("visitors")
        .select("*")
        .gte("created_at", `${monthStartStr}T00:00:00`)
        .lte("created_at", `${monthEndStr}T23:59:59`);

    if (error || !data) {
        console.error("Error fetching visitor stats:", error);
        return {
            dayGuests: 0,
            monthGuests: 0,
            dayLabel: "Today's Guests",
            monthLabel: "This Month",
        };
    }

    const dayGuests = data
        .filter((v) => v.created_at.startsWith(targetDateStr))
        .reduce((sum, v) => sum + v.number_of_guests, 0);

    const monthGuests = data.reduce((sum, v) => sum + v.number_of_guests, 0);

    // Generate labels based on whether a filter is applied
    const today = new Date();
    const isToday = targetDateStr === today.toISOString().split("T")[0];
    const isCurrentMonth = targetDate.getFullYear() === today.getFullYear() &&
        targetDate.getMonth() === today.getMonth();

    const dayLabel = isToday
        ? "Today's Guests"
        : targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    const monthLabel = isCurrentMonth
        ? "This Month"
        : targetDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    return {
        dayGuests,
        monthGuests,
        dayLabel,
        monthLabel,
    };
};

// ===================== MENU ITEMS =====================

export type MenuItemWithCategory = DbMenuItem & {
    categories: DbCategory;
};

// Fetch all categories
export const fetchCategories = async (): Promise<DbCategory[]> => {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

    return data || [];
};

// Fetch all menu items (including inactive)
export const fetchMenuItemsAdmin = async (
    categoryId?: string
): Promise<MenuItemWithCategory[]> => {
    let query = supabase
        .from("menu_items")
        .select(`
            *,
            categories (
                id,
                name,
                slug
            )
        `)
        .order("created_at", { ascending: true });

    if (categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching menu items:", error);
        return [];
    }

    return (data as MenuItemWithCategory[]) || [];
};

// Create menu item
export const createMenuItem = async (
    item: Omit<DbMenuItem, "id" | "created_at" | "categories">
): Promise<{ success: boolean; error?: string; data?: DbMenuItem }> => {
    const { data, error } = await supabase
        .from("menu_items")
        .insert(item)
        .select()
        .single();

    if (error) {
        console.error("Error creating menu item:", error);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};

// Update menu item (using upsert/POST to avoid CORS issues with PATCH)
export const updateMenuItem = async (
    id: string,
    updates: Partial<Omit<DbMenuItem, "id" | "created_at" | "categories">>
): Promise<{ success: boolean; error?: string }> => {
    // Fetch existing row first so upsert has all required fields
    const { data: existing, error: fetchError } = await supabase
        .from("menu_items")
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError || !existing) {
        console.error("Error fetching menu item for update:", fetchError);
        return { success: false, error: fetchError?.message || "Item not found" };
    }

    // Remove relational/extra fields that aren't columns
    const { categories, ...row } = existing as MenuItemWithCategory;

    const { error } = await supabase
        .from("menu_items")
        .upsert({ ...row, ...updates })
        .eq("id", id);
        
    if (error) {
        console.error("Error updating menu item:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Delete menu item
export const deleteMenuItem = async (
    id: string
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting menu item:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// Upload menu item image
export const uploadMenuImage = async (
    file: File,
    itemId: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${itemId}-${Date.now()}.${fileExt}`;
    const filePath = `menu-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("menu")
        .upload(filePath, file, { upsert: true });

    if (uploadError) {
        console.error("Error uploading image:", uploadError);
        return { success: false, error: uploadError.message };
    }

    const { data: urlData } = supabase.storage
        .from("menu")
        .getPublicUrl(filePath);

    return { success: true, url: urlData.publicUrl };
};

// Delete menu item image from storage
export const deleteMenuImage = async (
    imageUrl: string
): Promise<{ success: boolean; error?: string }> => {
    // Extract file path from URL
    const urlParts = imageUrl.split("/menu/");
    if (urlParts.length < 2) {
        return { success: false, error: "Invalid image URL" };
    }

    const filePath = urlParts[1];

    const { error } = await supabase.storage
        .from("menu")
        .remove([filePath]);

    if (error) {
        console.error("Error deleting image:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// ===================== BAR DRINKS =====================

export type BarItemWithCategory = DbBarItem & {
    bar_categories: DbBarCategory;
};

export const fetchBarCategories = async (): Promise<DbBarCategory[]> => {
    const { data, error } = await supabase
        .from("bar_categories")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Error fetching bar categories:", error);
        return [];
    }

    return data || [];
};

export const fetchBarItemsAdmin = async (
    categoryId?: string
): Promise<BarItemWithCategory[]> => {
    let query = supabase
        .from("bar_items")
        .select("*, bar_categories (id, name, slug, sort_order)")
        .order("created_at", { ascending: true });

    if (categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching bar items:", error);
        return [];
    }

    return (data as BarItemWithCategory[]) || [];
};

export const createBarItem = async (
    item: Omit<DbBarItem, "id" | "created_at" | "bar_categories">
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from("bar_items").insert(item);

    if (error) {
        console.error("Error creating bar item:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

export const updateBarItem = async (
    id: string,
    updates: Partial<Omit<DbBarItem, "id" | "created_at" | "bar_categories">>
): Promise<{ success: boolean; error?: string }> => {
    const { data: existing, error: fetchError } = await supabase
        .from("bar_items")
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError || !existing) {
        return { success: false, error: fetchError?.message || "Item not found" };
    }

    const { bar_categories, ...row } = existing as BarItemWithCategory;

    const { error } = await supabase
        .from("bar_items")
        .upsert({ ...row, ...updates })
        .eq("id", id);

    if (error) {
        console.error("Error updating bar item:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

export const deleteBarItem = async (
    id: string
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from("bar_items").delete().eq("id", id);

    if (error) {
        console.error("Error deleting bar item:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// ===================== COCKTAILS =====================

export type CocktailItemWithCategory = DbCocktailItem & {
    cocktail_categories: DbCocktailCategory;
};

export const fetchCocktailCategories = async (): Promise<DbCocktailCategory[]> => {
    const { data, error } = await supabase
        .from("cocktail_categories")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Error fetching cocktail categories:", error);
        return [];
    }

    return data || [];
};

export const fetchCocktailItemsAdmin = async (
    categoryId?: string
): Promise<CocktailItemWithCategory[]> => {
    let query = supabase
        .from("cocktail_items")
        .select("*, cocktail_categories (id, name, slug, sort_order)")
        .order("created_at", { ascending: true });

    if (categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching cocktail items:", error);
        return [];
    }

    return (data as CocktailItemWithCategory[]) || [];
};

export const createCocktailItem = async (
    item: Omit<DbCocktailItem, "id" | "created_at" | "cocktail_categories">
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from("cocktail_items").insert(item);

    if (error) {
        console.error("Error creating cocktail item:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

export const updateCocktailItem = async (
    id: string,
    updates: Partial<Omit<DbCocktailItem, "id" | "created_at" | "cocktail_categories">>
): Promise<{ success: boolean; error?: string }> => {
    const { data: existing, error: fetchError } = await supabase
        .from("cocktail_items")
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError || !existing) {
        return { success: false, error: fetchError?.message || "Item not found" };
    }

    const { cocktail_categories, ...row } = existing as CocktailItemWithCategory;

    const { error } = await supabase
        .from("cocktail_items")
        .upsert({ ...row, ...updates })
        .eq("id", id);

    if (error) {
        console.error("Error updating cocktail item:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

export const deleteCocktailItem = async (
    id: string
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from("cocktail_items").delete().eq("id", id);

    if (error) {
        console.error("Error deleting cocktail item:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// ===================== WINES =====================

export type WineWithCategory = DbWine & {
    wine_categories: DbWineCategory;
};

export const fetchWineCategories = async (): Promise<DbWineCategory[]> => {
    const { data, error } = await supabase
        .from("wine_categories")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Error fetching wine categories:", error);
        return [];
    }

    return data || [];
};

export const fetchWineItemsAdmin = async (
    categoryId?: string
): Promise<WineWithCategory[]> => {
    let query = supabase
        .from("wines")
        .select("*, wine_categories (id, name, slug, sort_order)")
        .order("sort_order", { ascending: true });

    if (categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching wines:", error);
        return [];
    }

    return (data as WineWithCategory[]) || [];
};

export const createWineItem = async (
    item: Omit<DbWine, "id" | "created_at" | "wine_categories">
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from("wines").insert(item);

    if (error) {
        console.error("Error creating wine:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

export const updateWineItem = async (
    id: string,
    updates: Partial<Omit<DbWine, "id" | "created_at" | "wine_categories">>
): Promise<{ success: boolean; error?: string }> => {
    const { data: existing, error: fetchError } = await supabase
        .from("wines")
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError || !existing) {
        return { success: false, error: fetchError?.message || "Wine not found" };
    }

    const { wine_categories, ...row } = existing as WineWithCategory;

    const { error } = await supabase
        .from("wines")
        .upsert({ ...row, ...updates })
        .eq("id", id);

    if (error) {
        console.error("Error updating wine:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

export const deleteWineItem = async (
    id: string
): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from("wines").delete().eq("id", id);

    if (error) {
        console.error("Error deleting wine:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
};
