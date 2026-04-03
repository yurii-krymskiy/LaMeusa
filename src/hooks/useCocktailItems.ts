import { useEffect, useState } from "react";
import { supabase, type DbCocktailItem } from "../lib/supabase";
import type { MenuItemType } from "../components/features/menu/types";

export type UseCocktailItemsResult = {
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

function mapDbToMenuItemType(item: DbCocktailItem): MenuItemType {
    const categorySlug =
        item.cocktail_categories?.slug ??
        toSlug(item.cocktail_categories?.name ?? "");

    return {
        id: item.id,
        title: item.title,
        description: item.description ?? undefined,
        category: categorySlug,
        price: item.price,
        order: item.cocktail_categories?.sort_order,
    };
}

export function useCocktailItems(): UseCocktailItemsResult {
    const [items, setItems] = useState<MenuItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCocktailItems() {
            setIsLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from("cocktail_items")
                .select(
                    `
                    *,
                    cocktail_categories (
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

            const mappedItems = (data as DbCocktailItem[]).map(
                mapDbToMenuItemType
            );
            setItems(mappedItems);
            setIsLoading(false);
        }

        fetchCocktailItems();
    }, []);

    return { items, isLoading, error };
}
