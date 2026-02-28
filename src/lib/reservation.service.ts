import { supabase } from "./supabase";
import type {
    DbTable,
    DbReservation,
    DbBlockedSlot,
    CreateReservationInput,
    AvailabilityResponse,
} from "./database.types";

// Reservation duration in hours
const RESERVATION_DURATION_HOURS = 2;

/**
 * Converts time string to minutes since midnight for easier comparison
 */
function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

/**
 * Checks if two time ranges overlap
 * Each reservation blocks the table for RESERVATION_DURATION_HOURS hours
 */
function timeRangesOverlap(
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
 * Get all reservations for a specific date
 */
export async function getReservationsForDate(
    date: string
): Promise<DbReservation[]> {
    const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("reservation_date", date);

    if (error) {
        console.error("Error fetching reservations:", error);
        throw new Error("Failed to fetch reservations");
    }

    return data || [];
}

/**
 * Get table IDs that are reserved for a specific reservation
 */
export async function getReservedTableIds(
    reservationId: number
): Promise<number[]> {
    const { data, error } = await supabase
        .from("reservation_tables")
        .select("table_id")
        .eq("reservation_id", reservationId);

    if (error) {
        console.error("Error fetching reserved tables:", error);
        throw new Error("Failed to fetch reserved tables");
    }

    return data?.map((rt) => rt.table_id) || [];
}

/**
 * Get all table IDs that are occupied at a specific date and time
 * Considers the 2-hour reservation window
 */
export async function getOccupiedTableIds(
    date: string,
    time: string
): Promise<number[]> {
    // Get all reservations for the date
    const reservations = await getReservationsForDate(date);

    // Find overlapping reservations
    const overlappingReservations = reservations.filter((res) =>
        timeRangesOverlap(res.reservation_time, time)
    );

    // Get table IDs for each overlapping reservation
    const occupiedTableIds: number[] = [];
    for (const reservation of overlappingReservations) {
        const tableIds = await getReservedTableIds(reservation.id);
        occupiedTableIds.push(...tableIds);
    }

    return [...new Set(occupiedTableIds)]; // Remove duplicates
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
        return { blocked: false };
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
function calculateRequiredTables(
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

    // Get all tables
    const allTables = await getAllTables();

    // Get occupied table IDs
    const occupiedTableIds = await getOccupiedTableIds(date, time);

    // Filter to available tables
    const availableTables = allTables.filter(
        (t) => !occupiedTableIds.includes(t.id)
    );

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
    // Check availability first
    const availability = await checkAvailability(
        input.reservation_date,
        input.reservation_time,
        input.number_of_guests
    );

    if (!availability.available) {
        return {
            success: false,
            error: availability.message || "No tables available",
        };
    }

    // Create the reservation
    const { data: reservation, error: reservationError } = await supabase
        .from("reservations")
        .insert({
            customer_name: input.customer_name,
            number_of_guests: input.number_of_guests,
            reservation_time: input.reservation_time,
            reservation_date: input.reservation_date,
            promo_code: input.promo_code || null,
            email: input.email,
            phone: input.phone,
            additional_wishes: input.additional_wishes || null,
        })
        .select()
        .single();

    if (reservationError || !reservation) {
        console.error("Error creating reservation:", reservationError);
        return {
            success: false,
            error: "Failed to create reservation. Please try again.",
        };
    }

    // Assign tables to the reservation
    const tableAssignments = availability.requiredTables.map((table) => ({
        reservation_id: reservation.id,
        table_id: table.id,
    }));

    const { error: assignmentError } = await supabase
        .from("reservation_tables")
        .insert(tableAssignments);

    if (assignmentError) {
        console.error("Error assigning tables:", assignmentError);
        // Rollback the reservation
        await supabase.from("reservations").delete().eq("id", reservation.id);
        return {
            success: false,
            error: "Failed to assign tables. Please try again.",
        };
    }

    return {
        success: true,
        reservationId: reservation.id,
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
    const allTables = await getAllTables();
    const occupiedTableIds = await getOccupiedTableIds(date, time);

    const availableTables = allTables.filter(
        (t) => !occupiedTableIds.includes(t.id)
    );

    return {
        totalTables: allTables.length,
        occupiedTables: occupiedTableIds.length,
        availableTables: availableTables.length,
        totalCapacity: allTables.reduce((sum, t) => sum + t.capacity, 0),
        availableCapacity: availableTables.reduce((sum, t) => sum + t.capacity, 0),
    };
}
