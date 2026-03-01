import { supabase } from "./supabase";
import type { DbReservation, DbBlockedSlot, DbTable } from "./database.types";

// Statistics types
export type ReservationStats = {
    totalReservations: number;
    todayReservations: number;
    weekReservations: number;
    monthReservations: number;
    totalGuests: number;
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

// Fetch upcoming reservations
export const fetchUpcomingReservations = async (): Promise<DbReservation[]> => {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .gte("reservation_date", today)
        .order("reservation_date", { ascending: true })
        .order("reservation_time", { ascending: true });

    if (error) {
        console.error("Error fetching upcoming reservations:", error);
        return [];
    }

    return data || [];
};

// Fetch reservation statistics
export const fetchReservationStats = async (): Promise<ReservationStats> => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    
    // Week start (Monday)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1);
    const weekStartStr = weekStart.toISOString().split("T")[0];
    
    // Month start
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthStartStr = monthStart.toISOString().split("T")[0];

    // Fetch all reservations
    const { data: allReservations, error } = await supabase
        .from("reservations")
        .select("*");

    if (error || !allReservations) {
        console.error("Error fetching stats:", error);
        return {
            totalReservations: 0,
            todayReservations: 0,
            weekReservations: 0,
            monthReservations: 0,
            totalGuests: 0,
            averagePartySize: 0,
            upcomingReservations: 0,
        };
    }

    const todayReservations = allReservations.filter(
        (r) => r.reservation_date === todayStr
    );
    
    const weekReservations = allReservations.filter(
        (r) => r.reservation_date >= weekStartStr
    );
    
    const monthReservations = allReservations.filter(
        (r) => r.reservation_date >= monthStartStr
    );
    
    const upcomingReservations = allReservations.filter(
        (r) => r.reservation_date >= todayStr
    );

    const totalGuests = allReservations.reduce(
        (sum, r) => sum + r.number_of_guests,
        0
    );

    return {
        totalReservations: allReservations.length,
        todayReservations: todayReservations.length,
        weekReservations: weekReservations.length,
        monthReservations: monthReservations.length,
        totalGuests,
        averagePartySize:
            allReservations.length > 0
                ? Math.round((totalGuests / allReservations.length) * 10) / 10
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
