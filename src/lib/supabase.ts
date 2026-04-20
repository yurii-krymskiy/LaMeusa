import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on the schema
export type DbCategory = {
    id: string;
    name: string;
    slug: string;
    created_at: string;
};

export type DbMenuItem = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    image_url: string | null;
    is_active: boolean;
    is_top_seller: boolean;
    is_spicy: boolean;
    is_two_person: boolean;
    is_served_until_6pm: boolean;
    category_id: string;
    created_at: string;
    categories?: DbCategory;
};

// Bar drinks types
export type DbBarCategory = {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
};

export type DbBarItem = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    is_active: boolean;
    category_id: string;
    created_at: string;
    bar_categories?: DbBarCategory;
};

// Cocktail types
export type DbCocktailCategory = {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
};

export type DbCocktailItem = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    is_active: boolean;
    category_id: string;
    created_at: string;
    cocktail_categories?: DbCocktailCategory;
};

// Wine types
export type DbWineCategory = {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
};

export type DbWine = {
    id: string;
    name: string;
    category_id: string;
    grape_varieties: string | null;
    description_en: string | null;
    aging: string | null;
    is_bio: boolean;
    is_active: boolean;
    price_glass: number | null;
    price_bottle: number | null;
    price_half_liter: number | null;
    price_liter: number | null;
    sort_order: number;
    created_at: string;
    wine_categories?: DbWineCategory;
};
