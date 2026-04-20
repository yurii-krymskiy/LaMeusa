import { describe, it, expect, vi, beforeEach } from "vitest";
import type { DbTable, DbReservation, DbBlockedSlot } from "../database.types";

// ── Mock Supabase ───────────────────────────────────────────────────
// We mock the supabase module so every DB call is intercepted.
const mockFrom = vi.fn();
vi.mock("../supabase", () => ({
    supabase: { from: (...args: unknown[]) => mockFrom(...args) },
}));

// Import AFTER mocks are in place
import {
    timeToMinutes,
    timeRangesOverlap,
    calculateRequiredTables,
    RESERVATION_DURATION_HOURS,
    checkAvailability,
    getCapacityStats,
    isSlotBlocked,
} from "../reservation.service";

// ── Helpers ─────────────────────────────────────────────────────────

/** Creates a fake DbTable */
function makeTable(
    id: number,
    capacity: number,
    is_combinable = false,
    label = `Table ${id}`
): DbTable {
    return { id, label, capacity, is_combinable, created_at: "" };
}

/** Creates a fake DbReservation */
function makeReservation(
    id: number,
    time: string,
    date = "2026-05-01",
    guests = 2
): DbReservation {
    return {
        id,
        customer_name: `Guest ${id}`,
        number_of_guests: guests,
        reservation_time: time,
        reservation_date: date,
        promo_code: null,
        email: `guest${id}@example.com`,
        phone: "123456",
        additional_wishes: null,
        created_at: "",
    };
}

/** Creates a fake DbBlockedSlot */
function makeBlockedSlot(
    id: number,
    date: string,
    startTime: string | null = null,
    endTime: string | null = null,
    reason: string | null = null
): DbBlockedSlot {
    return {
        id,
        blocked_date: date,
        blocked_time_start: startTime,
        blocked_time_end: endTime,
        reason,
        created_at: "",
    };
}

// Builds a chained Supabase query builder that resolves to {data, error}
type MockResult = { data: unknown; error: null } | { data: null; error: unknown };
function supabaseChain(result: MockResult) {
    const chain: Record<string, unknown> = {};
    // Every possible method returns the chain, except the terminal ones resolve
    for (const method of [
        "select",
        "insert",
        "delete",
        "eq",
        "order",
        "single",
    ]) {
        chain[method] = vi.fn().mockReturnValue(chain);
    }
    // Terminal: awaiting the chain resolves to the result
    chain.then = (resolve: (v: unknown) => void) => resolve(result);
    return chain;
}

/** Set up mockFrom so that `supabase.from(tableName)` returns given chains */
function setupSupabase(
    mapping: Record<string, ReturnType<typeof supabaseChain>>
) {
    mockFrom.mockImplementation((table: string) => {
        if (mapping[table]) return mapping[table];
        return supabaseChain({ data: [], error: null });
    });
}

// ─────────────────────────────────────────────────────────────────────
// SECTION 1 — Pure utility functions (no DB)
// ─────────────────────────────────────────────────────────────────────

describe("timeToMinutes", () => {
    it("converts midnight", () => {
        expect(timeToMinutes("00:00")).toBe(0);
    });

    it("converts noon", () => {
        expect(timeToMinutes("12:00")).toBe(720);
    });

    it("converts with seconds suffix (HH:mm:ss)", () => {
        expect(timeToMinutes("14:30:00")).toBe(870);
    });

    it("converts end-of-day", () => {
        expect(timeToMinutes("23:59")).toBe(1439);
    });
});

describe("timeRangesOverlap", () => {
    it("detects exact same time as overlap", () => {
        expect(timeRangesOverlap("12:00", "12:00")).toBe(true);
    });

    it("detects overlap when second starts 1h into first", () => {
        expect(timeRangesOverlap("12:00", "13:00")).toBe(true);
    });

    it("detects overlap when second starts 30min before first ends", () => {
        expect(timeRangesOverlap("12:00", "13:30")).toBe(true);
    });

    it("no overlap when second starts exactly at first end (2h later)", () => {
        expect(timeRangesOverlap("12:00", "14:00")).toBe(false);
    });

    it("no overlap when second starts after first ends", () => {
        expect(timeRangesOverlap("12:00", "15:00")).toBe(false);
    });

    it("symmetric: first starts during second", () => {
        expect(timeRangesOverlap("13:00", "12:00")).toBe(true);
    });

    it("no overlap in reverse direction at boundary", () => {
        expect(timeRangesOverlap("14:00", "12:00")).toBe(false);
    });

    it("detects overlap at 30-min boundary", () => {
        expect(timeRangesOverlap("11:30", "13:00")).toBe(true);
    });

    it("no overlap for 30-min boundary exactly at end", () => {
        expect(timeRangesOverlap("11:00", "13:00")).toBe(false);
    });
});

describe("calculateRequiredTables", () => {
    const tables: DbTable[] = [
        makeTable(1, 2, false),
        makeTable(2, 4, false),
        makeTable(3, 6, true),
        makeTable(4, 6, true),
        makeTable(5, 8, false),
    ];

    it("picks single table that fits exactly", () => {
        const result = calculateRequiredTables(4, tables);
        expect(result).toHaveLength(1);
        expect(result[0].capacity).toBe(4);
    });

    it("picks smallest single table with excess capacity", () => {
        const result = calculateRequiredTables(3, tables);
        expect(result).toHaveLength(1);
        expect(result[0].capacity).toBe(4);
    });

    it("picks single table for 1 guest", () => {
        const result = calculateRequiredTables(1, tables);
        expect(result).toHaveLength(1);
        expect(result[0].capacity).toBe(2);
    });

    it("combines tables when no single table is large enough", () => {
        // 10 guests — no single table fits (max 8), need combinable tables (6+6=12)
        const result = calculateRequiredTables(10, tables);
        expect(result.length).toBeGreaterThanOrEqual(2);
        const totalCapacity = result.reduce((s, t) => s + t.capacity, 0);
        expect(totalCapacity).toBeGreaterThanOrEqual(10);
    });

    it("only uses combinable tables for combinations", () => {
        const result = calculateRequiredTables(10, tables);
        for (const t of result) {
            expect(t.is_combinable).toBe(true);
        }
    });

    it("returns empty array when capacity is insufficient", () => {
        const smallTables = [makeTable(1, 2, true), makeTable(2, 2, true)];
        const result = calculateRequiredTables(10, smallTables);
        expect(result).toEqual([]);
    });

    it("returns empty array when no tables available", () => {
        const result = calculateRequiredTables(1, []);
        expect(result).toEqual([]);
    });

    it("prefers single non-combinable table over combining", () => {
        const result = calculateRequiredTables(8, tables);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(5);
    });
});

// ─────────────────────────────────────────────────────────────────────
// SECTION 2 — Blocked-slot logic
// ─────────────────────────────────────────────────────────────────────

describe("isSlotBlocked", () => {
    beforeEach(() => vi.clearAllMocks());

    it("returns not blocked when no blocked slots exist", async () => {
        setupSupabase({
            blocked_slots: supabaseChain({ data: [], error: null }),
        });
        const result = await isSlotBlocked("2026-05-01", "14:00");
        expect(result.blocked).toBe(false);
    });

    it("blocks whole day when time range is null", async () => {
        const slot = makeBlockedSlot(1, "2026-05-01", null, null, "Holiday");
        setupSupabase({
            blocked_slots: supabaseChain({ data: [slot], error: null }),
        });
        const result = await isSlotBlocked("2026-05-01", "14:00");
        expect(result.blocked).toBe(true);
        expect(result.reason).toBe("Holiday");
    });

    it("blocks time within range", async () => {
        const slot = makeBlockedSlot(1, "2026-05-01", "12:00", "16:00", "Private event");
        setupSupabase({
            blocked_slots: supabaseChain({ data: [slot], error: null }),
        });
        const result = await isSlotBlocked("2026-05-01", "14:00");
        expect(result.blocked).toBe(true);
    });

    it("does not block time outside range", async () => {
        const slot = makeBlockedSlot(1, "2026-05-01", "12:00", "14:00");
        setupSupabase({
            blocked_slots: supabaseChain({ data: [slot], error: null }),
        });
        const result = await isSlotBlocked("2026-05-01", "14:00");
        expect(result.blocked).toBe(false);
    });

    it("blocks at exact start of range", async () => {
        const slot = makeBlockedSlot(1, "2026-05-01", "14:00", "16:00");
        setupSupabase({
            blocked_slots: supabaseChain({ data: [slot], error: null }),
        });
        const result = await isSlotBlocked("2026-05-01", "14:00");
        expect(result.blocked).toBe(true);
    });

    it("fails safe on DB error (treats as blocked)", async () => {
        setupSupabase({
            blocked_slots: supabaseChain({
                data: null,
                error: { message: "DB error" },
            }),
        });
        const result = await isSlotBlocked("2026-05-01", "14:00");
        expect(result.blocked).toBe(true);
    });
});

// ─────────────────────────────────────────────────────────────────────
// SECTION 3 — Full availability check with mocked DB
// ─────────────────────────────────────────────────────────────────────

describe("checkAvailability", () => {
    // 72 tables matching the real restaurant
    const ALL_TABLES: DbTable[] = [];
    for (let i = 1; i <= 72; i++) {
        // Mix of capacities: 2, 4, 6 — some combinable
        const capacity = i <= 24 ? 2 : i <= 48 ? 4 : i <= 66 ? 6 : 8;
        const is_combinable = capacity >= 4;
        ALL_TABLES.push(makeTable(i, capacity, is_combinable));
    }

    function setupForAvailability(
        reservations: DbReservation[],
        reservationTableMap: Record<number, number[]>,
        blockedSlots: DbBlockedSlot[] = []
    ) {
        mockFrom.mockImplementation((table: string) => {
            if (table === "blocked_slots") {
                return supabaseChain({ data: blockedSlots, error: null });
            }
            if (table === "tables") {
                return supabaseChain({ data: ALL_TABLES, error: null });
            }
            if (table === "reservations") {
                return supabaseChain({ data: reservations, error: null });
            }
            if (table === "reservation_tables") {
                // This chain needs .eq("reservation_id", X) to route
                const chain: Record<string, unknown> = {};
                chain.select = vi.fn().mockReturnValue(chain);
                chain.eq = vi.fn().mockImplementation((_col: string, resId: number) => {
                    const tableIds = reservationTableMap[resId] || [];
                    const data = tableIds.map((tid) => ({ table_id: tid }));
                    const result = { data, error: null };
                    return {
                        then: (resolve: (v: unknown) => void) => resolve(result),
                        select: vi.fn().mockReturnValue({ then: (r: (v: unknown) => void) => r(result) }),
                    };
                });
                chain.then = (resolve: (v: unknown) => void) =>
                    resolve({ data: [], error: null });
                return chain;
            }
            return supabaseChain({ data: [], error: null });
        });
    }

    beforeEach(() => vi.clearAllMocks());

    it("all 72 tables available when no reservations", async () => {
        setupForAvailability([], {});
        const result = await checkAvailability("2026-05-01", "14:00", 2);
        expect(result.available).toBe(true);
        expect(result.availableTables).toHaveLength(72);
    });

    it("still available when some tables booked", async () => {
        // 10 reservations at 14:00, each taking 1 table
        const reservations = Array.from({ length: 10 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [i + 1]; // tables 1-10
        });

        setupForAvailability(reservations, rtMap);
        const result = await checkAvailability("2026-05-01", "14:00", 2);
        expect(result.available).toBe(true);
        expect(result.availableTables).toHaveLength(62);
    });

    it("unavailable when ALL 72 tables booked at same time", async () => {
        // 72 reservations each using 1 table
        const reservations = Array.from({ length: 72 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [i + 1];
        });

        setupForAvailability(reservations, rtMap);
        const result = await checkAvailability("2026-05-01", "14:00", 2);
        expect(result.available).toBe(false);
        expect(result.availableTables).toHaveLength(0);
        expect(result.message).toContain("don't have enough tables");
    });

    it("available at different hour even when 72 tables booked at 14:00", async () => {
        const reservations = Array.from({ length: 72 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [i + 1];
        });

        setupForAvailability(reservations, rtMap);
        // 16:00 is exactly 2h after 14:00, so no overlap
        const result = await checkAvailability("2026-05-01", "16:00", 2);
        expect(result.available).toBe(true);
        expect(result.availableTables).toHaveLength(72);
    });

    it("unavailable at 15:00 when all booked at 14:00 (2h overlap)", async () => {
        const reservations = Array.from({ length: 72 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [i + 1];
        });

        setupForAvailability(reservations, rtMap);
        const result = await checkAvailability("2026-05-01", "15:00", 2);
        expect(result.available).toBe(false);
    });

    it("unavailable at 13:00 when all booked at 14:00 (backward overlap)", async () => {
        const reservations = Array.from({ length: 72 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [i + 1];
        });

        setupForAvailability(reservations, rtMap);
        // 13:00 reservation lasts until 15:00, overlapping with 14:00-16:00
        const result = await checkAvailability("2026-05-01", "13:00", 2);
        expect(result.available).toBe(false);
    });

    it("available at 12:00 when all booked at 14:00 (no overlap)", async () => {
        const reservations = Array.from({ length: 72 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [i + 1];
        });

        setupForAvailability(reservations, rtMap);
        // 12:00 reservation lasts until 14:00, and 14:00 starts at 14:00 → no overlap
        const result = await checkAvailability("2026-05-01", "12:00", 2);
        expect(result.available).toBe(true);
    });

    it("blocked slot prevents availability even with free tables", async () => {
        const blockedSlot = makeBlockedSlot(
            1,
            "2026-05-01",
            null,
            null,
            "Closed for renovation"
        );
        setupForAvailability([], {}, [blockedSlot]);
        const result = await checkAvailability("2026-05-01", "14:00", 2);
        expect(result.available).toBe(false);
        expect(result.message).toBe("Closed for renovation");
    });

    it("time-range blocked slot only blocks within range", async () => {
        const blockedSlot = makeBlockedSlot(
            1,
            "2026-05-01",
            "14:00",
            "16:00",
            "Private party"
        );
        setupForAvailability([], {}, [blockedSlot]);

        const blocked = await checkAvailability("2026-05-01", "14:30", 2);
        expect(blocked.available).toBe(false);

        const available = await checkAvailability("2026-05-01", "16:00", 2);
        expect(available.available).toBe(true);
    });

    it("large party (8 guests) finds a table", async () => {
        setupForAvailability([], {});
        const result = await checkAvailability("2026-05-01", "14:00", 8);
        expect(result.available).toBe(true);
        expect(result.requiredTables.length).toBeGreaterThanOrEqual(1);
        const totalCap = result.requiredTables.reduce(
            (s, t) => s + t.capacity,
            0
        );
        expect(totalCap).toBeGreaterThanOrEqual(8);
    });

    it("large party needs combined tables when single tables occupied", async () => {
        // Occupy all 8-seat tables (IDs 67-72)
        const reservations = [67, 68, 69, 70, 71, 72].map((id, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [67 + i];
        });

        setupForAvailability(reservations, rtMap);
        const result = await checkAvailability("2026-05-01", "14:00", 8);
        expect(result.available).toBe(true);
        // Should use combined tables (6+6 or 4+4+...)
        expect(result.requiredTables.length).toBeGreaterThanOrEqual(2);
    });

    it("gradual fill: tracks exact count of remaining tables", async () => {
        // Book 70 of 72 tables
        const reservations = Array.from({ length: 70 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [i + 1];
        });

        setupForAvailability(reservations, rtMap);
        const result = await checkAvailability("2026-05-01", "14:00", 2);
        expect(result.available).toBe(true);
        expect(result.availableTables).toHaveLength(2);
    });

    it("71 of 72 tables booked: still available for small party", async () => {
        const reservations = Array.from({ length: 71 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );
        const rtMap: Record<number, number[]> = {};
        reservations.forEach((r, i) => {
            rtMap[r.id] = [i + 1];
        });

        setupForAvailability(reservations, rtMap);
        const result = await checkAvailability("2026-05-01", "14:00", 2);
        expect(result.available).toBe(true);
        expect(result.availableTables).toHaveLength(1);
    });
});

// ─────────────────────────────────────────────────────────────────────
// SECTION 4 — Overlapping time windows (staggered bookings)
// ─────────────────────────────────────────────────────────────────────

describe("staggered booking scenarios", () => {
    const ALL_TABLES: DbTable[] = Array.from({ length: 72 }, (_, i) =>
        makeTable(i + 1, 4, i >= 24)
    );

    function setupStaggered(
        reservations: DbReservation[],
        rtMap: Record<number, number[]>
    ) {
        mockFrom.mockImplementation((table: string) => {
            if (table === "blocked_slots")
                return supabaseChain({ data: [], error: null });
            if (table === "tables")
                return supabaseChain({ data: ALL_TABLES, error: null });
            if (table === "reservations")
                return supabaseChain({ data: reservations, error: null });
            if (table === "reservation_tables") {
                const chain: Record<string, unknown> = {};
                chain.select = vi.fn().mockReturnValue(chain);
                chain.eq = vi.fn().mockImplementation((_col: string, resId: number) => {
                    const tableIds = rtMap[resId] || [];
                    const data = tableIds.map((tid) => ({ table_id: tid }));
                    const result = { data, error: null };
                    return {
                        then: (resolve: (v: unknown) => void) => resolve(result),
                        select: vi.fn().mockReturnValue({ then: (r: (v: unknown) => void) => r(result) }),
                    };
                });
                chain.then = (resolve: (v: unknown) => void) =>
                    resolve({ data: [], error: null });
                return chain;
            }
            return supabaseChain({ data: [], error: null });
        });
    }

    beforeEach(() => vi.clearAllMocks());

    it("36 tables at 12:00 + 36 tables at 14:00 = full at 13:00", async () => {
        // First wave: 36 reservations at 12:00 (tables 1-36)
        // Second wave: 36 reservations at 14:00 (tables 37-72)
        const reservations = [
            ...Array.from({ length: 36 }, (_, i) =>
                makeReservation(i + 1, "12:00")
            ),
            ...Array.from({ length: 36 }, (_, i) =>
                makeReservation(37 + i, "14:00")
            ),
        ];
        const rtMap: Record<number, number[]> = {};
        // 12:00 wave uses tables 1-36
        for (let i = 0; i < 36; i++) rtMap[i + 1] = [i + 1];
        // 14:00 wave uses tables 37-72
        for (let i = 0; i < 36; i++) rtMap[37 + i] = [37 + i];

        setupStaggered(reservations, rtMap);

        // At 13:00: 12:00 reservations (end 14:00) overlap AND 14:00 reservations (start 14:00) don't overlap with 13:00
        // Wait — 13:00 reservation lasts 13:00-15:00, and 14:00 reservation lasts 14:00-16:00 → they DO overlap
        // And 12:00 lasts 12:00-14:00, 13:00 lasts 13:00-15:00 → they overlap too
        // So ALL 72 tables are occupied at 13:00
        const result = await checkAvailability("2026-05-01", "13:00", 2);
        expect(result.available).toBe(false);
        expect(result.availableTables).toHaveLength(0);
    });

    it("36 tables at 12:00 + 36 at 14:00 → available at 16:00", async () => {
        const reservations = [
            ...Array.from({ length: 36 }, (_, i) =>
                makeReservation(i + 1, "12:00")
            ),
            ...Array.from({ length: 36 }, (_, i) =>
                makeReservation(37 + i, "14:00")
            ),
        ];
        const rtMap: Record<number, number[]> = {};
        for (let i = 0; i < 36; i++) rtMap[i + 1] = [i + 1];
        for (let i = 0; i < 36; i++) rtMap[37 + i] = [37 + i];

        setupStaggered(reservations, rtMap);

        // 16:00: 12:00 reservations ended at 14:00, 14:00 reservations end at 16:00 → no overlap
        const result = await checkAvailability("2026-05-01", "16:00", 2);
        expect(result.available).toBe(true);
        expect(result.availableTables).toHaveLength(72);
    });

    it("staggered every 30 min: peak hour fully booked", async () => {
        // 24 reservations per slot at 12:00, 12:30, 13:00
        // Total 72 reservations, each using one unique table
        const times = ["12:00", "12:30", "13:00"];
        const reservations: DbReservation[] = [];
        const rtMap: Record<number, number[]> = {};
        let id = 1;
        for (const time of times) {
            for (let i = 0; i < 24; i++) {
                reservations.push(makeReservation(id, time));
                rtMap[id] = [id]; // 1:1 mapping
                id++;
            }
        }

        setupStaggered(reservations, rtMap);

        // At 13:30: overlaps with 12:00 (12:00-14:00)? 13:30 < 14:00 && 12:00 < 15:30 → YES
        // overlaps with 12:30 (12:30-14:30)? 13:30 < 14:30 && 12:30 < 15:30 → YES
        // overlaps with 13:00 (13:00-15:00)? 13:30 < 15:00 && 13:00 < 15:30 → YES
        // All 72 tables occupied
        const result = await checkAvailability("2026-05-01", "13:30", 2);
        expect(result.available).toBe(false);
    });

    it("staggered: first wave frees up after 2h", async () => {
        const times = ["12:00", "12:30", "13:00"];
        const reservations: DbReservation[] = [];
        const rtMap: Record<number, number[]> = {};
        let id = 1;
        for (const time of times) {
            for (let i = 0; i < 24; i++) {
                reservations.push(makeReservation(id, time));
                rtMap[id] = [id];
                id++;
            }
        }

        setupStaggered(reservations, rtMap);

        // At 14:00: 12:00 (ends 14:00) no overlap (12:00 < 16:00 && 14:00 >= 14:00 → start2 >= end1 → no overlap)
        // 12:30 (ends 14:30) → 14:00 < 14:30 → overlap
        // 13:00 (ends 15:00) → 14:00 < 15:00 → overlap
        // So 24 tables free (12:00 wave), 48 occupied
        const result = await checkAvailability("2026-05-01", "14:00", 2);
        expect(result.available).toBe(true);
        expect(result.availableTables).toHaveLength(24);
    });
});

// ─────────────────────────────────────────────────────────────────────
// SECTION 5 — Capacity stats
// ─────────────────────────────────────────────────────────────────────

describe("getCapacityStats", () => {
    const ALL_TABLES: DbTable[] = Array.from({ length: 72 }, (_, i) =>
        makeTable(i + 1, 4, false)
    );

    beforeEach(() => vi.clearAllMocks());

    it("reports all tables available when no reservations", async () => {
        mockFrom.mockImplementation((table: string) => {
            if (table === "tables")
                return supabaseChain({ data: ALL_TABLES, error: null });
            if (table === "reservations")
                return supabaseChain({ data: [], error: null });
            if (table === "reservation_tables")
                return supabaseChain({ data: [], error: null });
            return supabaseChain({ data: [], error: null });
        });

        const stats = await getCapacityStats("2026-05-01", "14:00");
        expect(stats.totalTables).toBe(72);
        expect(stats.occupiedTables).toBe(0);
        expect(stats.availableTables).toBe(72);
        expect(stats.totalCapacity).toBe(288); // 72 * 4
        expect(stats.availableCapacity).toBe(288);
    });

    it("reports correct split when half tables occupied", async () => {
        const reservations = Array.from({ length: 36 }, (_, i) =>
            makeReservation(i + 1, "14:00")
        );

        mockFrom.mockImplementation((table: string) => {
            if (table === "tables")
                return supabaseChain({ data: ALL_TABLES, error: null });
            if (table === "reservations")
                return supabaseChain({ data: reservations, error: null });
            if (table === "reservation_tables") {
                const chain: Record<string, unknown> = {};
                chain.select = vi.fn().mockReturnValue(chain);
                chain.eq = vi.fn().mockImplementation((_col: string, resId: number) => {
                    const data = [{ table_id: resId }]; // 1:1 mapping
                    return {
                        then: (resolve: (v: unknown) => void) =>
                            resolve({ data, error: null }),
                        select: vi.fn().mockReturnValue({
                            then: (r: (v: unknown) => void) =>
                                r({ data, error: null }),
                        }),
                    };
                });
                chain.then = (resolve: (v: unknown) => void) =>
                    resolve({ data: [], error: null });
                return chain;
            }
            return supabaseChain({ data: [], error: null });
        });

        const stats = await getCapacityStats("2026-05-01", "14:00");
        expect(stats.totalTables).toBe(72);
        expect(stats.occupiedTables).toBe(36);
        expect(stats.availableTables).toBe(36);
        expect(stats.availableCapacity).toBe(144); // 36 * 4
    });
});

// ─────────────────────────────────────────────────────────────────────
// SECTION 6 — Edge cases & constants
// ─────────────────────────────────────────────────────────────────────

describe("reservation constants", () => {
    it("reservation duration is 2 hours", () => {
        expect(RESERVATION_DURATION_HOURS).toBe(2);
    });
});

describe("edge cases", () => {
    it("multiple blocked ranges on same day", async () => {
        const slots = [
            makeBlockedSlot(1, "2026-05-01", "11:00", "13:00", "Lunch block"),
            makeBlockedSlot(2, "2026-05-01", "18:00", "20:00", "Dinner block"),
        ];
        setupSupabase({
            blocked_slots: supabaseChain({ data: slots, error: null }),
        });

        expect((await isSlotBlocked("2026-05-01", "12:00")).blocked).toBe(true);
        expect((await isSlotBlocked("2026-05-01", "14:00")).blocked).toBe(false);
        expect((await isSlotBlocked("2026-05-01", "19:00")).blocked).toBe(true);
    });

    it("table combination respects is_combinable flag", () => {
        const tables = [
            makeTable(1, 4, false), // not combinable
            makeTable(2, 4, false), // not combinable
            makeTable(3, 3, true), // combinable
            makeTable(4, 3, true), // combinable
        ];
        // Need 6 guests — no single table fits
        // Non-combinable 4+4 can't be combined
        // Combinable 3+3=6 should work
        const result = calculateRequiredTables(6, tables);
        expect(result).toHaveLength(2);
        expect(result.every((t) => t.is_combinable)).toBe(true);
        expect(result.reduce((s, t) => s + t.capacity, 0)).toBeGreaterThanOrEqual(6);
    });

    it("different dates don't interfere", async () => {
        const ALL_TABLES: DbTable[] = Array.from({ length: 72 }, (_, i) =>
            makeTable(i + 1, 4, false)
        );

        // All reservations are on 2026-05-01

        mockFrom.mockImplementation((table: string) => {
            if (table === "blocked_slots")
                return supabaseChain({ data: [], error: null });
            if (table === "tables")
                return supabaseChain({ data: ALL_TABLES, error: null });
            if (table === "reservations")
                // The service filters by date via .eq("reservation_date", date)
                // We return empty for different dates
                return supabaseChain({ data: [], error: null });
            return supabaseChain({ data: [], error: null });
        });

        // Different date should be fully available
        const result = await checkAvailability("2026-05-02", "14:00", 2);
        expect(result.available).toBe(true);
        expect(result.availableTables).toHaveLength(72);
    });
});
