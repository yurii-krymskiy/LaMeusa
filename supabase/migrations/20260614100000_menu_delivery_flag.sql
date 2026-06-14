-- Add delivery flag to menu items so the delivery page can filter items.

ALTER TABLE public.menu_items
    ADD COLUMN IF NOT EXISTS is_delivery boolean NOT NULL DEFAULT false;

-- Mark all items that appear on the Medusa Delivery menu.
-- Uses ILIKE for case-insensitive matching against the known delivery item list.
UPDATE public.menu_items
SET is_delivery = true
WHERE
    -- Appetizers
    title ILIKE '%chicken finger%'
    OR title ILIKE '%padron pepper%'
    OR title ILIKE '%bbq chicken wing%'
    OR title ILIKE '%squid ring%'
    OR title ILIKE '%garlic butter shrimp%'
    OR title ILIKE '%patatas bravas%'
    -- Salads
    OR title ILIKE '%caesar%'
    OR title ILIKE '%greek salad%'
    OR title ILIKE '%burrata salad%'
    -- Pizza
    OR title ILIKE 'margherita'
    OR title ILIKE 'marinara'
    OR title ILIKE 'carbonara'
    OR title ILIKE 'bbq'
    OR title ILIKE 'pepperoni'
    OR title ILIKE '%truffle honey pizza%'
    OR title ILIKE '%burrata pizza%'
    OR title ILIKE '%mortadella%'
    OR title ILIKE '%rucola%'
    OR title ILIKE '%ruccula%'
    OR title ILIKE '%tuna pizza%'
    -- Pasta
    OR title ILIKE '%lobster pasta%'
    OR title ILIKE '%alfredo%'
    OR title ILIKE '%seafood pasta%'
    OR title ILIKE '%wok noodle%'
    OR title ILIKE '%truffle pasta%'
    OR title ILIKE '%carbonara 2.0%'
    -- Main course
    OR title ILIKE '%cheese baked lobster%'
    OR title ILIKE '%grilled octopus%'
    OR title ILIKE '%roasted salmon%'
    OR title ILIKE '%fish and chips%'
    OR title ILIKE '%lamb chop%'
    OR title ILIKE '%pork rib%'
    OR title ILIKE '%tacos plate%'
    -- Burgers & sandwiches
    OR title ILIKE '%crispy fish burger%'
    OR title ILIKE '%beyond meat%'
    OR title ILIKE '%angry bird%'
    OR title ILIKE '%triple cheese%'
    OR title ILIKE '%truffle burger%'
    OR title ILIKE '%medusa beef burger%'
    OR title ILIKE '%tuna salad sandwich%'
    OR title ILIKE '%chicken sando%'
    -- Desserts
    OR title ILIKE '%tiramisu%'
    OR title ILIKE '%syrniki%'
    OR title ILIKE '%basque cheesecake%'
    OR title ILIKE '%vareniky%';
