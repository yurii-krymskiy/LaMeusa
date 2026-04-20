# Supabase reservation reminders setup

This project includes:

- SQL migration for reminder/cancellation columns and indexes
- Edge Function: `send-reservation-reminders`
- Edge Function: `cancel-reservation`
- Frontend cancellation page at `/reservation/cancel?token=...`

## 1) Apply migration

Run your migration process so this file is applied:

- `supabase/migrations/20260420120000_reservation_reminders_and_cancellation.sql`

It adds:

- `reservations.cancellation_token` (unique)
- `reservations.cancelled_at`
- `reservations.reminder_sent_at`
- due-reminder index for frequent scheduler queries
- helper SQL functions:
  - `get_reservations_due_for_reminder(...)`
  - `cancel_reservation_by_token(...)`

## 2) Configure Edge Function secrets

Set these secrets in Supabase:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_REMINDER_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY` (recommended)
- `PUBLIC_SITE_URL` (example: `https://your-domain.com`)
- `RESTAURANT_TIMEZONE` (example: `Atlantic/Canary`)

The following are provided by Supabase runtime and should already exist:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3) Deploy functions

Deploy both functions:

- `send-reservation-reminders`
- `cancel-reservation`

## 4) Schedule reminder function

Create a scheduled job in Supabase to run every 5 minutes and call:

- `send-reservation-reminders`

The SQL function filters reservations around 2 hours before start time using a ±5 minute window and skips rows where:

- `cancelled_at` is not null
- `reminder_sent_at` is not null

## 5) EmailJS template variables

The reminder function sends these template params:

- `user_name`
- `user_email`
- `user_phone`
- `number_of_guests`
- `date`
- `time`
- `additional_wishes`
- `cancel_url`

Add a button in your EmailJS reminder template that links to `{{cancel_url}}`.
