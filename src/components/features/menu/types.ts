export type Price = { amount: string | number; currency: "EUR" };
export type PortionUnit =
    | "item"
    | "per_person"
    | "per_100g"
    | "per_kg"
    | "for_2"
    | "for_3+";

export type BadgeCode =
    | "top_seller"
    | "spicy"
    | "vegan"
    | "gluten_free"
    | "chef"
    | "recommended"
    | "ok";

export type MenuItemType = {
    id: string | number;
    title: string;
    description?: string;
    imageUrl?: string;
    category: string;
    price: number | string;
    unit?: PortionUnit | string;
    badges?: BadgeCode[] | string[];
    order?: number;
};

export type MenuBadge = { code: BadgeCode; label: string; icon?: string };

export type MenuPrice = {
    price: Price;
    unit?: PortionUnit | string;
    raw?: string;
};

export type MenuCardVM = {
    id: string | number;
    title: string;
    subtitle?: string;
    imageUrl?: string;
    price?: MenuPrice;
    badges: MenuBadge[];
    anchorId: string; // `${category.slug}-${id}`
    order: number;
};

export type MenuCategoryVM = {
    slug: string;
    title: string;
    order: number;
    items: MenuCardVM[];
};

export type SidebarType = { slug: string; title: string; count: number };

export type MenuResolved = {
    categories: MenuCategoryVM[];
    sidebar: SidebarType[];
};
