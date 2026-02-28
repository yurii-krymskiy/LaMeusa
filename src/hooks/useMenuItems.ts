import { useEffect, useState } from "react";
import { supabase, type DbMenuItem } from "../lib/supabase";
import type { MenuItemType, BadgeCode } from "../components/features/menu/types";

export type UseMenuItemsResult = {
    items: MenuItemType[];
    isLoading: boolean;
    error: string | null;
};

function toSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
}

function mapDbToMenuItemType(item: DbMenuItem): MenuItemType {
    const badges: BadgeCode[] = [];
    if (item.is_top_seller) {
        badges.push("star");
    }

    const categorySlug = item.categories?.slug ?? toSlug(item.categories?.name ?? "");

    return {
        id: item.id,
        title: item.title,
        description: item.description ?? undefined,
        imageUrl: item.image_url ? `${item.image_url}` : undefined,
        category: categorySlug,
        price: item.price,
        badges: badges.length > 0 ? badges : undefined,
    };
}

export function useMenuItems(): UseMenuItemsResult {
    const [items, setItems] = useState<MenuItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMenuItems() {
            setIsLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from("menu_items")
                .select(`
                    *,
                    categories (
                        id,
                        name,
                        slug
                    )
                `)
                .eq("is_active", true)
                .order("created_at", { ascending: true });

            if (fetchError) {
                setError(fetchError.message);
                setIsLoading(false);
                return;
            }

            const mappedItems = (data as DbMenuItem[]).map(mapDbToMenuItemType);
            setItems(mappedItems);
            setIsLoading(false);
        }

        fetchMenuItems();
    }, []);

    return { items, isLoading, error };
}
