import { supabase } from "./supabase";
import type {
    DbTable,
    DbBlockedSlot,
    CreateReservationInput,
    AvailabilityResponse,
} from "./database.types";

// Reservation duration in hours
export const RESERVATION_DURATION_HOURS = 2;

/**
 * Converts time string to minutes since midnight for easier comparison
 */
export function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

/**
 * Checks if two time ranges overlap
 * Each reservation blocks the table for RESERVATION_DURATION_HOURS hours
 */
export function timeRangesOverlap(
    start1: string,
    start2: string,
    durationHours: number = RESERVATION_DURATION_HOURS
): boolean {
    const start1Minutes = timeToMinutes(start1);
    const end1Minutes = start1Minutes + durationHours * 60;
    const start2Minutes = timeToMinutes(start2);
    const end2Minutes = start2Minutes + durationHours * 60;

    // They overlap if one starts before the other ends
    return start1Minutes < end2Minutes && start2Minutes < end1Minutes;
}

/**
 * Get all tables from the database
 */
export async function getAllTables(): Promise<DbTable[]> {
    const { data, error } = await supabase
        .from("tables")
        .select("*")
        .order("capacity", { ascending: true });

    if (error) {
        console.error("Error fetching tables:", error);
        throw new Error("Failed to fetch tables");
    }

    return data || [];
}

/**
 * Get tables that are free at a given date/time via the server-side RPC.
 *
 * Anon can no longer read raw reservation rows (they contain customer PII), so
 * availability is computed inside the database (see the `get_available_tables`
 * function) and only the list of free tables is returned to the client.
 */
export async function getAvailableTablesFromDb(
    date: string,
    time: string
): Promise<DbTable[]> {
    const { data, error } = await supabase.rpc("get_available_tables", {
        check_date: date,
        check_time: time,
        reservation_duration_hours: RESERVATION_DURATION_HOURS,
    });

    if (error) {
        console.error("Error fetching available tables:", error);
        throw new Error("Failed to fetch availability");
    }

    return ((data as
        | {
              table_id: number;
              label: string;
              capacity: number;
              is_combinable: boolean;
          }[]
        | null) || []).map((row) => ({
        id: row.table_id,
        label: row.label,
        capacity: row.capacity,
        is_combinable: row.is_combinable,
        created_at: "",
    }));
}

/**
 * Check if a date/time slot is blocked by admin
 */
export async function isSlotBlocked(
    date: string,
    time: string
): Promise<{ blocked: boolean; reason?: string }> {
    const { data, error } = await supabase
        .from("blocked_slots")
        .select("*")
        .eq("blocked_date", date);

    if (error) {
        console.error("Error checking blocked slots:", error);
        // Fail safe: treat as blocked if we can't verify
        return { blocked: true, reason: "Unable to verify availability. Please try again." };
    }

    if (!data || data.length === 0) {
        return { blocked: false };
    }

    const timeMinutes = timeToMinutes(time);

    for (const slot of data as DbBlockedSlot[]) {
        // If no specific time range, whole day is blocked
        if (!slot.blocked_time_start || !slot.blocked_time_end) {
            return { blocked: true, reason: slot.reason || "Day is fully booked" };
        }

        // Check if the requested time falls within blocked range
        const blockStart = timeToMinutes(slot.blocked_time_start);
        const blockEnd = timeToMinutes(slot.blocked_time_end);

        if (timeMinutes >= blockStart && timeMinutes < blockEnd) {
            return { blocked: true, reason: slot.reason || "Time slot is blocked" };
        }
    }

    return { blocked: false };
}

/**
 * Calculate optimal table combination for a given number of guests
 * Priority: 
 * 1. Single table that fits exactly
 * 2. Single table with smallest excess capacity
 * 3. Combination of combinable tables
 */
export function calculateRequiredTables(
    guests: number,
    availableTables: DbTable[]
): DbTable[] {
    // Sort by capacity ascending
    const sortedTables = [...availableTables].sort(
        (a, b) => a.capacity - b.capacity
    );

    // Try to find a single table that fits
    const singleTable = sortedTables.find((t) => t.capacity >= guests);
    if (singleTable) {
        return [singleTable];
    }

    // Need to combine tables - only use combinable ones
    const combinableTables = sortedTables.filter((t) => t.is_combinable);

    // Greedy approach: use largest combinable tables first
    combinableTables.sort((a, b) => b.capacity - a.capacity);

    const selectedTables: DbTable[] = [];
    let totalCapacity = 0;

    for (const table of combinableTables) {
        if (totalCapacity >= guests) break;
        selectedTables.push(table);
        totalCapacity += table.capacity;
    }

    if (totalCapacity >= guests) {
        return selectedTables;
    }

    // Cannot accommodate the guests
    return [];
}

/**
 * Check availability for a reservation
 */
export async function checkAvailability(
    date: string,
    time: string,
    guests: number
): Promise<AvailabilityResponse> {
    // First check if slot is blocked by admin
    const blockCheck = await isSlotBlocked(date, time);
    if (blockCheck.blocked) {
        return {
            available: false,
            availableTables: [],
            requiredTables: [],
            message: blockCheck.reason,
        };
    }

    // Available tables come straight from the server-side RPC.
    const availableTables = await getAvailableTablesFromDb(date, time);

    // Calculate required tables for the number of guests
    const requiredTables = calculateRequiredTables(guests, availableTables);

    if (requiredTables.length === 0) {
        return {
            available: false,
            availableTables,
            requiredTables: [],
            message:
                "Sorry, we don't have enough tables available for this time. Please try a different time or date.",
        };
    }

    return {
        available: true,
        availableTables,
        requiredTables,
    };
}

/**
 * Create a reservation and assign tables
 */
export async function createReservation(
    input: CreateReservationInput
): Promise<{ success: boolean; reservationId?: number; error?: string }> {
    // All validation, availability checking and table assignment happens
    // server-side in the `create_reservation` RPC. The client never inserts
    // reservation rows directly and never reads other customers' data.
    const { data, error } = await supabase.rpc("create_reservation", {
        p_customer_name: input.customer_name,
        p_number_of_guests: input.number_of_guests,
        p_reservation_date: input.reservation_date,
        p_reservation_time: input.reservation_time,
        p_email: input.email,
        p_phone: input.phone,
        p_promo_code: input.promo_code || null,
        p_additional_wishes: input.additional_wishes || null,
    });

    if (error) {
        console.error("Error creating reservation:", error);
        return {
            success: false,
            error: "Failed to create reservation. Please try again.",
        };
    }

    const row = (Array.isArray(data) ? data[0] : data) as
        | { success: boolean; reservation_id: number | null; error: string | null }
        | undefined;

    if (!row || !row.success) {
        return {
            success: false,
            error: row?.error || "No tables available",
        };
    }

    return {
        success: true,
        reservationId: row.reservation_id ?? undefined,
    };
}

/**
 * Get available time slots for a specific date
 * Returns times that have availability for the given number of guests
 */
export async function getAvailableTimeSlots(
    date: string,
    guests: number,
    startHour: number = 11,
    endHour: number = 22,
    intervalMinutes: number = 30
): Promise<string[]> {
    const availableSlots: string[] = [];

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
            // Don't go past end hour
            if (hour === endHour && minute > 0) break;

            const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
            const availability = await checkAvailability(date, time, guests);

            if (availability.available) {
                availableSlots.push(time);
            }
        }
    }

    return availableSlots;
}

/**
 * Get restaurant capacity stats for a date/time
 */
export async function getCapacityStats(
    date: string,
    time: string
): Promise<{
    totalTables: number;
    occupiedTables: number;
    availableTables: number;
    totalCapacity: number;
    availableCapacity: number;
}> {
    const { data, error } = await supabase.rpc("get_capacity_stats", {
        check_date: date,
        check_time: time,
    });

    const row = (Array.isArray(data) ? data[0] : data) as
        | {
              total_tables: number;
              occupied_tables: number;
              available_tables: number;
              total_capacity: number;
              available_capacity: number;
          }
        | undefined;

    if (error || !row) {
        console.error("Error fetching capacity stats:", error);
        return {
            totalTables: 0,
            occupiedTables: 0,
            availableTables: 0,
            totalCapacity: 0,
            availableCapacity: 0,
        };
    }

    return {
        totalTables: Number(row.total_tables),
        occupiedTables: Number(row.occupied_tables),
        availableTables: Number(row.available_tables),
        totalCapacity: Number(row.total_capacity),
        availableCapacity: Number(row.available_capacity),
    };
}
