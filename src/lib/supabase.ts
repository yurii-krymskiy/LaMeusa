import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Translation row types (sidecar *_translations tables)
export type DbMenuItemTranslation = {
    language: string;
    title: string;
    description: string;
};
export type DbCategoryTranslation = {
    language: string;
    name: string;
};
export type DbDescriptionTranslation = {
    language: string;
    description: string;
};

// Database types based on the schema
export type DbCategory = {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    category_translations?: DbCategoryTranslation[];
};

export type DbMenuItem = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    price_large: number | null;
    price_unit_label: string | null;
    image_url: string | null;
    is_active: boolean;
    is_top_seller: boolean;
    is_spicy: boolean;
    is_two_person: boolean;
    is_served_until_6pm: boolean;
    is_delivery: boolean;
    category_id: string;
    created_at: string;
    categories?: DbCategory;
    menu_item_translations?: DbMenuItemTranslation[];
};

// Bar drinks types
export type DbBarCategory = {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
    bar_category_translations?: DbCategoryTranslation[];
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
    bar_item_translations?: DbDescriptionTranslation[];
};

// Cocktail types
export type DbCocktailCategory = {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
    cocktail_category_translations?: DbCategoryTranslation[];
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
    cocktail_item_translations?: DbDescriptionTranslation[];
};

// Wine types
export type DbWineCategory = {
    id: string;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
    wine_category_translations?: DbCategoryTranslation[];
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
    wine_translations?: DbDescriptionTranslation[];
};
