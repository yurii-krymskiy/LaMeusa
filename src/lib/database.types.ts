// Database types for reservation system

export type DbTable = {
    id: number;
    label: string;
    capacity: number;
    is_combinable: boolean;
    created_at: string;
};

export type DbReservation = {
    id: number;
    customer_name: string;
    number_of_guests: number;
    reservation_time: string; // HH:mm:ss format
    reservation_date: string; // YYYY-MM-DD format
    promo_code: string | null;
    email: string;
    phone: string;
    additional_wishes: string | null;
    created_at: string;
};

// Junction table linking reservations to tables
export type DbReservationTable = {
    id: number;
    reservation_id: number;
    table_id: number;
    created_at: string;
};

// Admin blocked slots
export type DbBlockedSlot = {
    id: number;
    blocked_date: string; // YYYY-MM-DD format
    blocked_time_start: string | null; // HH:mm:ss format, null means whole day
    blocked_time_end: string | null; // HH:mm:ss format
    reason: string | null;
    created_at: string;
};

// Input types for creating reservations
export type CreateReservationInput = {
    customer_name: string;
    number_of_guests: number;
    reservation_time: string;
    reservation_date: string;
    promo_code?: string;
    email: string;
    phone: string;
    additional_wishes?: string;
};

// Availability response
export type AvailabilityResponse = {
    available: boolean;
    availableTables: DbTable[];
    requiredTables: DbTable[];
    message?: string;
};
