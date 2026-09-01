import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase, type DbBarItem } from "../lib/supabase";
import { pickField } from "../lib/translations";
import type { MenuItemType } from "../components/features/menu/types";

export type UseBarItemsResult = {
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

function mapDbToMenuItemType(item: DbBarItem, lang: string): MenuItemType {
    const categorySlug =
        item.bar_categories?.slug ?? toSlug(item.bar_categories?.name ?? "");

    return {
        id: item.id,
        title: item.title,
        description: pickField(
            item.bar_item_translations,
            lang,
            "description",
            item.description
        ),
        category: categorySlug,
        price: item.price,
        order: item.bar_categories?.sort_order,
    };
}

export function useBarItems(): UseBarItemsResult {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const [rows, setRows] = useState<DbBarItem[]>([]);
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
                        sort_order,
                        bar_category_translations (
                            language,
                            name
                        )
                    ),
                    bar_item_translations (
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

            setRows((data as DbBarItem[]) || []);
            setIsLoading(false);
        }

        fetchBarItems();
    }, []);

    const items = useMemo(
        () => rows.map((item) => mapDbToMenuItemType(item, lang)),
        [rows, lang]
    );

    const { categoryTitles, categoryOrder } = useMemo(() => {
        const titles: Record<string, string> = {};
        const order: { slug: string; sort: number }[] = [];
        for (const item of rows) {
            const cat = item.bar_categories;
            if (!cat) continue;
            const slug = cat.slug ?? toSlug(cat.name ?? "");
            if (titles[slug]) continue;
            titles[slug] =
                pickField(
                    cat.bar_category_translations,
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
