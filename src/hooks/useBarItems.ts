import { useEffect, useState } from "react";
import { supabase, type DbBarItem } from "../lib/supabase";
import type { MenuItemType } from "../components/features/menu/types";

export type UseBarItemsResult = {
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

function mapDbToMenuItemType(item: DbBarItem): MenuItemType {
    const categorySlug =
        item.bar_categories?.slug ?? toSlug(item.bar_categories?.name ?? "");

    return {
        id: item.id,
        title: item.title,
        description: item.description ?? undefined,
        category: categorySlug,
        price: item.price,
        order: item.bar_categories?.sort_order,
    };
}

export function useBarItems(): UseBarItemsResult {
    const [items, setItems] = useState<MenuItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBarItems() {
            setIsLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from("bar_items")
                .select(
                    `
                    *,
                    bar_categories (
                        id,
                        name,
                        slug,
                        sort_order
                    )
                `
                )
                .eq("is_active", true)
                .order("created_at", { ascending: true });

            if (fetchError) {
                setError(fetchError.message);
                setIsLoading(false);
                return;
            }

            const mappedItems = (data as DbBarItem[]).map(mapDbToMenuItemType);
            setItems(mappedItems);
            setIsLoading(false);
        }

        fetchBarItems();
    }, []);

    return { items, isLoading, error };
}
