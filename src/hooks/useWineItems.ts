import { useEffect, useState } from "react";
import { supabase, type DbWine } from "../lib/supabase";

export type WineItem = {
    id: string;
    name: string;
    category: string;
    categoryName: string;
    grapeVarieties: string | null;
    descriptionEn: string | null;
    aging: string | null;
    isBio: boolean;
    priceGlass: number | null;
    priceBottle: number | null;
    priceHalfLiter: number | null;
    priceLiter: number | null;
    sortOrder: number;
    categorySortOrder: number;
};

export type UseWineItemsResult = {
    items: WineItem[];
    isLoading: boolean;
    error: string | null;
};

function mapDbToWineItem(item: DbWine): WineItem {
    return {
        id: item.id,
        name: item.name,
        category: item.wine_categories?.slug ?? "",
        categoryName: item.wine_categories?.name ?? "",
        grapeVarieties: item.grape_varieties,
        descriptionEn: item.description_en,
        aging: item.aging,
        isBio: item.is_bio,
        priceGlass: item.price_glass,
        priceBottle: item.price_bottle,
        priceHalfLiter: item.price_half_liter,
        priceLiter: item.price_liter,
        sortOrder: item.sort_order,
        categorySortOrder: item.wine_categories?.sort_order ?? 0,
    };
}

export function useWineItems(): UseWineItemsResult {
    const [items, setItems] = useState<WineItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchWines() {
            setIsLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from("wines")
                .select(
                    `
                    *,
                    wine_categories (
                        id,
                        name,
                        slug,
                        sort_order
                    )
                `
                )
                .eq("is_active", true)
                .order("sort_order", { ascending: true });

            if (fetchError) {
                setError(fetchError.message);
                setIsLoading(false);
                return;
            }

            const mappedItems = (data as DbWine[]).map(mapDbToWineItem);
            mappedItems.sort(
                (a, b) =>
                    a.categorySortOrder - b.categorySortOrder ||
                    a.sortOrder - b.sortOrder
            );
            setItems(mappedItems);
            setIsLoading(false);
        }

        fetchWines();
    }, []);

    return { items, isLoading, error };
}
