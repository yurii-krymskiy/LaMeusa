import type {
    BadgeCode,
    MenuBadge,
    MenuCardVM,
    MenuCategoryVM,
    MenuItemType,
    MenuPrice,
    MenuResolved,
    PortionUnit,
    Price,
    SidebarType,
} from "./types";

export class Money {
    private readonly _amount: number;
    private readonly _currency: "EUR";

    private constructor(amount: number, currency: "EUR") {
        this._amount = amount;
        this._currency = currency;
    }

    static from(raw: string | number, currency: "EUR" = "EUR"): Money {
        const n =
            typeof raw === "number"
                ? raw
                : parseFloat(String(raw).replace(",", "."));
        return new Money(Number.isFinite(n) ? n : 0, currency);
    }

    static format(price: Price): string {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: price.currency,
            currencyDisplay: "narrowSymbol",
            maximumFractionDigits: 2,
        }).format(Number(price.amount));
    }

    get amount(): number {
        return this._amount;
    }
    get currency(): "EUR" {
        return this._currency;
    }
}

export class UnitNormalizer {
    normalize(unit?: string): PortionUnit | string | undefined {
        if (!unit) return undefined;
        const u = unit.toLowerCase();
        if (u === "pp" || u === "per_person") return "per_person";
        if (u === "x100g" || u === "per_100g") return "per_100g";
        return unit as PortionUnit | string;
    }
}

export class BadgeCatalog {
    private readonly map: Record<BadgeCode, MenuBadge> = {
        vegan: {
            code: "vegan",
            icon: "/icons/badgets/vegetarian.svg",
        },
        star: {
            code: "star",
            label: "Top seller",
            icon: "/icons/badgets/star.svg",
            color: "#FFC107"
        },
        time: {
            code: "time",
            icon: "/icons/badgets/clock.svg",
        },
        ukraine: {
            code: "ukraine",
            icon: "/icons/badgets/ukraine.svg",
        },
        hot: {
            code: "hot",
            icon: "/icons/badgets/inflammable.svg",
        },
    };

    resolve(codes?: (BadgeCode | string)[]): MenuBadge[] {
        if (!codes?.length) return [];
        const seen = new Set<string>();
        const out: MenuBadge[] = [];
        for (const raw of codes) {
            const key = String(raw).toLowerCase() as BadgeCode;
            const badge =
                this.map[key] ?? ({ code: key, label: key } as MenuBadge);
            if (!seen.has(badge.code)) {
                seen.add(badge.code);
                out.push(badge);
            }
        }
        return out;
    }
}

export class CategoryDictionary {
    private order: string[];
    private titles: Record<string, string>;
    constructor(order: string[] = [], titles: Record<string, string> = {}) {
        this.order = order;
        this.titles = titles;
    }
    getTitle(slug: string) {
        return this.titles[slug] ?? slug;
    }
    getOrder(slug: string) {
        const idx = this.order.indexOf(slug);
        return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
    }
}

export class SidebarBuilder {
    build(categories: MenuCategoryVM[]): SidebarType[] {
        return categories.map((c) => ({
            slug: c.slug,
            title: c.title,
            count: c.items.length,
        }));
    }
}

export class MenuCard implements MenuCardVM {
    id: string | number;
    title: string;
    subtitle?: string | undefined;
    imageUrl?: string | undefined;
    price?: MenuPrice | undefined;
    badges: MenuBadge[];
    anchorId: string;
    order: number;

    constructor(init: MenuCardVM) {
        this.id = init.id;
        this.title = init.title;
        this.subtitle = init.subtitle;
        this.imageUrl = init.imageUrl;
        this.price = init.price;
        this.badges = init.badges;
        this.anchorId = init.anchorId;
        this.order = init.order;
    }
}

export class MenuCardFactory {
    private unitNormalizer: UnitNormalizer;
    private badgeCatalog: BadgeCatalog;

    constructor(unitNormalizer: UnitNormalizer, badgeCatalog: BadgeCatalog) {
        this.unitNormalizer = unitNormalizer;
        this.badgeCatalog = badgeCatalog;
    }

    create(raw: MenuItemType, slug: string): MenuCard {
        const money = Money.from(raw.price, "EUR");
        const unit = this.unitNormalizer.normalize(raw.unit);
        const price: MenuPrice = {
            price: { amount: money.amount, currency: money.currency },
            unit,
            raw: String(raw.price),
        };
        return new MenuCard({
            id: raw.id,
            title: raw.title,
            subtitle: raw.description,
            imageUrl: raw.imageUrl,
            price,
            badges: this.badgeCatalog.resolve(raw.badges),
            anchorId: `${slug}-${raw.id}`,
            order: raw.order ?? Number.MAX_SAFE_INTEGER,
        });
    }
}

export class MenuCategory implements MenuCategoryVM {
    slug: string;
    title: string;
    order: number;
    items: MenuCardVM[] = [];

    constructor(slug: string, title: string, order: number) {
        this.slug = slug;
        this.title = title;
        this.order = order;
    }

    add(item: MenuCardVM) {
        this.items.push(item);
    }

    sortInPlace() {
        this.items.sort(
            (a, b) => a.order - b.order || a.title.localeCompare(b.title)
        );
    }

    toVM(): MenuCategoryVM {
        return {
            slug: this.slug,
            title: this.title,
            order: this.order,
            items: this.items,
        };
    }
}

export class MenuResolver {
    private raws: MenuItemType[];
    private dict: CategoryDictionary;
    private cardFactory: MenuCardFactory;
    private sidebarBuilder: SidebarBuilder;
    private map: Map<string, MenuCategory>;

    constructor(
        raws: MenuItemType[],
        dict: CategoryDictionary = new CategoryDictionary(),
        cardFactory: MenuCardFactory = new MenuCardFactory(
            new UnitNormalizer(),
            new BadgeCatalog()
        ),
        sidebarBuilder: SidebarBuilder = new SidebarBuilder()
    ) {
        this.raws = raws;
        this.dict = dict;
        this.cardFactory = cardFactory;
        this.sidebarBuilder = sidebarBuilder;
        this.map = new Map<string, MenuCategory>();
    }

    resolve(): MenuResolved {
        for (const raw of this.raws) {
            const slug = raw.category || "uncategorized";
            if (!this.map.has(slug)) {
                const cat = new MenuCategory(
                    slug,
                    this.dict.getTitle(slug),
                    this.dict.getOrder(slug)
                );
                this.map.set(slug, cat);
            }
            const cat = this.map.get(slug)!;
            cat.add(this.cardFactory.create(raw, slug));
        }

        const categories = Array.from(this.map.values())
            .map((c) => {
                c.sortInPlace();
                return c.toVM();
            })
            .sort(
                (a, b) => a.order - b.order || a.title.localeCompare(b.title)
            );

        const sidebar = this.sidebarBuilder.build(categories);
        return { categories, sidebar };
    }
}

export const rawItems: MenuItemType[] = [
    {
        id: 1,
        title: "Mix of canarian cheeses with truffle honey",
        description:
            "A fine selection of local cheeses served with truffle honey.",
        imageUrl: "/images/home/image-3.jpg",
        category: "tapas_and_appetizers",
        price: 17,
    },
    {
        id: 2,
        title: "Big plate of tapas",
        description: "A perfect assortment for sharing.",
        imageUrl: "/images/home/image-3.jpg",
        category: "tapas_and_appetizers",
        price: "29.50",
        unit: "pp",
        badges: ["time"],
    },
    {
        id: 3,
        title: "Beef tartare",
        description: "Hand-cut beef with dressing and spices.",
        imageUrl: "/images/home/image-3.jpg",
        category: "tapas_and_appetizers",
        price: 19,
    },
    {
        id: 4,
        title: "Padron peppers",
        description: "Mild green peppers grilled with sea salt.",
        imageUrl: "/images/home/image-3.jpg",
        category: "tapas_and_appetizers",
        price: 9,
        badges: ["vegan", "hot"],
    },
    {
        id: 5,
        title: "Squid rings with spicy mayo",
        description: "Crispy calamari served with house spicy mayo.",
        imageUrl: "/images/home/image-3.jpg",
        category: "tapas_and_appetizers",
        price: 15,
        badges: ["hot"],
    },
    {
        id: 6,
        title: "Cheese baked lobster",
        description: "Fresh lobster baked with herbs and cheese.",
        imageUrl: "/images/home/image-3.jpg",
        category: "fish_and_seafood",
        price: "12,5",
        unit: "x100g",
    },
    {
        id: 7,
        title: "Big seafood plate",
        description: "An assortment of premium seafood for two persons.",
        imageUrl: "/images/home/image-3.jpg",
        category: "fish_and_seafood",
        price: 32,
        unit: "pp",
        badges: ["ukraine"],
    },
    {
        id: 8,
        title: "Spaghetti carbonara",
        description: "Classic Italian recipe with pancetta and pecorino.",
        imageUrl: "/images/home/image-3.jpg",
        category: "pasta",
        price: 14,
        badges: ["star"],
    },
    {
        id: 9,
        title: "Seafood linguine",
        description:
            "Homemade linguine with prawns, squid and white wine sauce.",
        imageUrl: "/images/home/image-3.jpg",
        category: "pasta",
        price: 17,
    },
    {
        id: 10,
        title: "Grilled ribeye steak",
        description: "Tender ribeye with herb butter and fries.",
        imageUrl: "/images/home/image-3.jpg",
        category: "meat",
        price: 28,
    },
    {
        id: 11,
        title: "BBQ ribs",
        description: "Slow-cooked pork ribs glazed with BBQ sauce.",
        imageUrl: "/images/home/image-3.jpg",
        category: "meat",
        price: 24,
    },
    {
        id: 12,
        title: "Mini burger & fries",
        category: "children_menu",
        price: 9,
    },
    {
        id: 13,
        title: "Spaghetti bolognese",
        category: "children_menu",
        badges: ["star"],
        price: 8,
    },
];
