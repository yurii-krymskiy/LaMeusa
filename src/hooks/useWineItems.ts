import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase, type DbWine } from "../lib/supabase";
import { pickField } from "../lib/translations";

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
    categoryTitles: Record<string, string>;
    categoryOrder: string[];
    isLoading: boolean;
    error: string | null;
};

function mapDbToWineItem(item: DbWine, lang: string): WineItem {
    const cat = item.wine_categories;
    return {
        id: item.id,
        name: item.name,
        category: cat?.slug ?? "",
        categoryName:
            pickField(cat?.wine_category_translations, lang, "name", cat?.name) ??
            cat?.name ??
            "",
        grapeVarieties: item.grape_varieties,
        // Tasting note is translatable; grape/region/aging stay as-is.
        descriptionEn:
            pickField(
                item.wine_translations,
                lang,
                "description",
                item.description_en
            ) ?? null,
        aging: item.aging,
        isBio: item.is_bio,
        priceGlass: item.price_glass,
        priceBottle: item.price_bottle,
        priceHalfLiter: item.price_half_liter,
        priceLiter: item.price_liter,
        sortOrder: item.sort_order,
        categorySortOrder: cat?.sort_order ?? 0,
    };
}

export function useWineItems(): UseWineItemsResult {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const [rows, setRows] = useState<DbWine[]>([]);
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
                        sort_order,
                        wine_category_translations (
                            language,
                            name
                        )
                    ),
                    wine_translations (
                        language,
                        description
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

            setRows((data as DbWine[]) || []);
            setIsLoading(false);
        }

        fetchWines();
    }, []);

    const items = useMemo(() => {
        const mapped = rows.map((item) => mapDbToWineItem(item, lang));
        mapped.sort(
            (a, b) =>
                a.categorySortOrder - b.categorySortOrder ||
                a.sortOrder - b.sortOrder
        );
        return mapped;
    }, [rows, lang]);

    const { categoryTitles, categoryOrder } = useMemo(() => {
        const titles: Record<string, string> = {};
        const order: { slug: string; sort: number }[] = [];
        for (const item of rows) {
            const cat = item.wine_categories;
            if (!cat) continue;
            const slug = cat.slug ?? "";
            if (!slug || titles[slug]) continue;
            titles[slug] =
                pickField(cat.wine_category_translations, lang, "name", cat.name) ??
                cat.name;
            order.push({ slug, sort: cat.sort_order ?? 0 });
        }
        order.sort((a, b) => a.sort - b.sort);
        return { categoryTitles: titles, categoryOrder: order.map((o) => o.slug) };
    }, [rows, lang]);

    return { items, categoryTitles, categoryOrder, isLoading, error };
}
