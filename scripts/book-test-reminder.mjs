/**
 * Test script: inserts a reservation exactly 2 hours from now (Atlantic/Canary TZ)
 * so the cron reminder job picks it up on the next run.
 *
 * Usage: npm run book:test-reminder
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_PUBLIC_SUPABASE_ANON_KEY;
const TEST_REMINDER_EMAIL = process.env.TEST_REMINDER_EMAIL;
const TIMEZONE = process.env.RESTAURANT_TIMEZONE || "Atlantic/Canary";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !TEST_REMINDER_EMAIL) {
    console.error(
        "Missing required env vars. Set VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY, and TEST_REMINDER_EMAIL in .env"
    );
    process.exit(1);
}

// Compute "now + 2 hours" in the restaurant timezone
const nowUtc = new Date();
const twoHoursLater = new Date(nowUtc.getTime() + 2 * 60 * 60 * 1000);

// Format date as YYYY-MM-DD in Atlantic/Canary timezone
const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}).formatToParts(twoHoursLater);
const reservationDate = `${dateParts.find((p) => p.type === "year").value}-${dateParts.find((p) => p.type === "month").value}-${dateParts.find((p) => p.type === "day").value}`;

// Format time as HH:MM in Atlantic/Canary timezone — exact, no rounding
const reservationTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
}).format(twoHoursLater);

console.log(`Booking test reservation:`);
console.log(`  Date: ${reservationDate}`);
console.log(`  Time: ${reservationTime} (${TIMEZONE})`);

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Direct table inserts are blocked by RLS since the 2026-09 hardening;
// bookings go through the validated create_reservation RPC.
const { data, error } = await supabase.rpc("create_reservation", {
    p_customer_name: "Test Reminder",
    p_number_of_guests: 2,
    p_reservation_date: reservationDate,
    p_reservation_time: reservationTime,
    p_email: TEST_REMINDER_EMAIL,
    p_phone: "+34600000000",
    p_additional_wishes: "Test booking for reminder system",
});

const row = Array.isArray(data) ? data[0] : data;

if (error || !row?.success) {
    console.error("Failed to create reservation:", error?.message || row?.error);
    process.exit(1);
}

console.log(`\nReservation created successfully!`);
console.log(`  ID: ${row.reservation_id}`);
console.log(
    `\nThe cron job runs every 5 min. Wait up to 5 minutes for the reminder email.`
);
