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
    category_id: string;
    created_at: string;
    categories?: DbCategory;
};
