import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase, type DbCocktailItem } from "../lib/supabase";
import { pickField } from "../lib/translations";
import type { MenuItemType } from "../components/features/menu/types";

export type UseCocktailItemsResult = {
    items: MenuItemType[];
    categoryTitles: Record<string, string>;
    categoryOrder: string[];
    isLoading: boolean;
    error: string | null;
};

function toSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
}

function mapDbToMenuItemType(item: DbCocktailItem, lang: string): MenuItemType {
    const categorySlug =
        item.cocktail_categories?.slug ??
        toSlug(item.cocktail_categories?.name ?? "");

    return {
        id: item.id,
        title: item.title,
        description: pickField(
            item.cocktail_item_translations,
            lang,
            "description",
            item.description
        ),
        category: categorySlug,
        price: item.price,
        order: item.cocktail_categories?.sort_order,
    };
}

export function useCocktailItems(): UseCocktailItemsResult {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const [rows, setRows] = useState<DbCocktailItem[]>([]);
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
                        sort_order,
                        cocktail_category_translations (
                            language,
                            name
                        )
                    ),
                    cocktail_item_translations (
                        language,
                        description
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

            setRows((data as DbCocktailItem[]) || []);
            setIsLoading(false);
        }

        fetchCocktailItems();
    }, []);

    const items = useMemo(
        () => rows.map((item) => mapDbToMenuItemType(item, lang)),
        [rows, lang]
    );

    const { categoryTitles, categoryOrder } = useMemo(() => {
        const titles: Record<string, string> = {};
        const order: { slug: string; sort: number }[] = [];
        for (const item of rows) {
            const cat = item.cocktail_categories;
            if (!cat) continue;
            const slug = cat.slug ?? toSlug(cat.name ?? "");
            if (titles[slug]) continue;
            titles[slug] =
                pickField(
                    cat.cocktail_category_translations,
                    lang,
                    "name",
                    cat.name
                ) ?? cat.name;
            order.push({ slug, sort: cat.sort_order ?? 0 });
        }
        order.sort((a, b) => a.sort - b.sort);
        return { categoryTitles: titles, categoryOrder: order.map((o) => o.slug) };
    }, [rows, lang]);

    return { items, categoryTitles, categoryOrder, isLoading, error };
}
