import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
    fetchWineCategories,
    fetchWineItemsAdmin,
    updateWineItem,
    createWineItem,
    deleteWineItem,
    type WineWithCategory,
} from "../../lib/admin.service";
import type { DbWineCategory } from "../../lib/supabase";
import { AdminSelect } from "../../components/ui/AdminSelect";

const ITEMS_PER_PAGE = 10;

type EditingItem = {
    id: string;
    name: string;
    grape_varieties: string;
    description_en: string;
    aging: string;
    is_bio: boolean;
    price_glass: string;
    price_bottle: string;
    price_half_liter: string;
    price_liter: string;
    category_id: string;
    is_active: boolean;
    sort_order: string;
};

const emptyItem: Omit<EditingItem, "id"> = {
    name: "",
    grape_varieties: "",
    description_en: "",
    aging: "",
    is_bio: false,
    price_glass: "",
    price_bottle: "",
    price_half_liter: "",
    price_liter: "",
    category_id: "",
    is_active: true,
    sort_order: "0",
};

function formatPrice(val: number | null): string {
    if (val == null) return "—";
    return `€${val.toFixed(2)}`;
}

export const AdminWines = () => {
    const [items, setItems] = useState<WineWithCategory[]>([]);
    const [categories, setCategories] = useState<DbWineCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const filterCategory = searchParams.get("category") || "";
    const setFilterCategory = useCallback(
        (val: string) => {
            setSearchParams(
                (prev) => {
                    if (val) prev.set("category", val);
                    else prev.delete("category");
                    return prev;
                },
                { replace: true }
            );
        },
        [setSearchParams]
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [priceSort, setPriceSort] = useState<"none" | "desc" | "asc">("none");
    const [currentPage, setCurrentPage] = useState(1);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        const [itemsData, categoriesData] = await Promise.all([
            fetchWineItemsAdmin(filterCategory || undefined),
            fetchWineCategories(),
        ]);
        setItems(itemsData);
        setCategories(categoriesData);
        setIsLoading(false);
    }, [filterCategory]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterCategory, searchQuery, priceSort]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isModalOpen]);

    const handleEdit = (item: WineWithCategory) => {
        setEditingItem({
            id: item.id,
            name: item.name,
            grape_varieties: item.grape_varieties || "",
            description_en: item.description_en || "",
            aging: item.aging || "",
            is_bio: item.is_bio,
            price_glass: item.price_glass != null ? String(item.price_glass) : "",
            price_bottle: item.price_bottle != null ? String(item.price_bottle) : "",
            price_half_liter: item.price_half_liter != null ? String(item.price_half_liter) : "",
            price_liter: item.price_liter != null ? String(item.price_liter) : "",
            category_id: item.category_id,
            is_active: item.is_active,
            sort_order: String(item.sort_order),
        });
        setIsCreating(false);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingItem({
            id: "",
            ...emptyItem,
            category_id: categories[0]?.id || "",
        });
        setIsCreating(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSave = async () => {
        if (!editingItem) return;

        if (!editingItem.name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!editingItem.category_id) {
            toast.error("Category is required");
            return;
        }

        setIsSaving(true);

        const parseNum = (v: string): number | null => {
            if (!v.trim()) return null;
            const n = parseFloat(v.replace(",", "."));
            return Number.isFinite(n) ? n : null;
        };

        const itemData = {
            name: editingItem.name,
            grape_varieties: editingItem.grape_varieties || null,
            description_en: editingItem.description_en || null,
            aging: editingItem.aging || null,
            is_bio: editingItem.is_bio,
            price_glass: parseNum(editingItem.price_glass),
            price_bottle: parseNum(editingItem.price_bottle),
            price_half_liter: parseNum(editingItem.price_half_liter),
            price_liter: parseNum(editingItem.price_liter),
            category_id: editingItem.category_id,
            is_active: editingItem.is_active,
            sort_order: parseInt(editingItem.sort_order) || 0,
        };

        let result;
        if (isCreating) {
            result = await createWineItem(itemData);
        } else {
            result = await updateWineItem(editingItem.id, itemData);
        }

        if (result.success) {
            toast.success(isCreating ? "Wine created!" : "Wine updated!");
            handleCloseModal();
            await loadData();
        } else {
            toast.error(result.error || "Failed to save wine");
        }

        setIsSaving(false);
    };

    const handleDelete = async (item: WineWithCategory) => {
        if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

        const result = await deleteWineItem(item.id);
        if (result.success) {
            toast.success(`"${item.name}" deleted!`);
            await loadData();
        } else {
            toast.error(result.error || "Failed to delete wine");
        }
    };

    const handleToggleActive = async (item: WineWithCategory) => {
        const newValue = !item.is_active;
        setItems((prev) =>
            prev.map((i) =>
                i.id === item.id ? { ...i, is_active: newValue } : i
            )
        );
        const result = await updateWineItem(item.id, { is_active: newValue });
        if (result.success) {
            toast.success(
                `"${item.name}" is now ${newValue ? "active" : "inactive"}`
            );
        } else {
            setItems((prev) =>
                prev.map((i) =>
                    i.id === item.id ? { ...i, is_active: !newValue } : i
                )
            );
            toast.error(result.error || "Failed to update wine");
        }
    };

    // Primary display price for sorting
    const getMainPrice = (item: WineWithCategory): number =>
        item.price_bottle ?? item.price_glass ?? item.price_half_liter ?? 0;

    // Search + Sort
    const filteredItems = useMemo(() => {
        let result = items;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (item) =>
                    item.name.toLowerCase().includes(q) ||
                    (item.grape_varieties &&
                        item.grape_varieties.toLowerCase().includes(q))
            );
        }
        if (priceSort === "desc") {
            result = [...result].sort(
                (a, b) => getMainPrice(b) - getMainPrice(a)
            );
        } else if (priceSort === "asc") {
            result = [...result].sort(
                (a, b) => getMainPrice(a) - getMainPrice(b)
            );
        }
        return result;
    }, [items, searchQuery, priceSort]);

    const togglePriceSort = () => {
        setPriceSort((prev) =>
            prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"
        );
    };

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filteredItems.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const priceInput = (
        label: string,
        field: keyof EditingItem,
        placeholder = "0.00"
    ) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <input
                type="text"
                inputMode="decimal"
                value={editingItem?.[field] as string}
                onChange={(e) => {
                    const v = e.target.value;
                    if (v === "" || /^[0-9.,]*$/.test(v))
                        setEditingItem({ ...editingItem!, [field]: v });
                }}
                className="admin-input"
                placeholder={placeholder}
            />
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Wine Card Editor
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage wines, categories, and prices
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 rounded-lg bg-sky px-4 py-2 font-medium text-white transition-colors hover:bg-sky/90"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    Add Wine
                </button>
            </div>

            {/* Filters */}
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
                    <div className="flex w-full flex-col gap-1 sm:max-w-xs">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Search:
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or grape..."
                            className="admin-input"
                        />
                    </div>
                    <div className="flex w-full flex-col gap-1 sm:max-w-xs">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category:
                        </label>
                        <AdminSelect
                            value={filterCategory}
                            onChange={setFilterCategory}
                            options={[
                                { value: "", label: "All Categories" },
                                ...categories.map((cat) => ({
                                    value: cat.id,
                                    label: cat.name,
                                })),
                            ]}
                            placeholder="All Categories"
                        />
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
                <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700 sm:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Wines
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {filteredItems.length} item
                        {filteredItems.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-royal-blue border-t-transparent" />
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            No wines found
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            <div className="flex items-center justify-end border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                                <button
                                    onClick={togglePriceSort}
                                    className={`flex items-center gap-1 text-xs font-medium uppercase transition-colors ${
                                        priceSort !== "none"
                                            ? "text-sky"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                >
                                    Price
                                    {priceSort === "desc" && (
                                        <svg
                                            className="h-3.5 w-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 15l7-7 7 7"
                                            />
                                        </svg>
                                    )}
                                    {priceSort === "asc" && (
                                        <svg
                                            className="h-3.5 w-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {paginatedItems.map((item) => (
                                    <div key={item.id} className="space-y-3 p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="truncate font-medium text-gray-900 dark:text-white">
                                                    {item.name}
                                                    {item.is_bio && (
                                                        <span className="ml-1.5 inline-block rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                            BIO
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {item.wine_categories?.name || "—"}
                                                </p>
                                                {item.grape_varieties && (
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                        {item.grape_varieties}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right text-sm whitespace-nowrap">
                                                {item.price_glass != null && (
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        🥂 {formatPrice(item.price_glass)}
                                                    </p>
                                                )}
                                                {item.price_bottle != null && (
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        🍾 {formatPrice(item.price_bottle)}
                                                    </p>
                                                )}
                                                {item.price_half_liter != null && (
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        ½L {formatPrice(item.price_half_liter)}
                                                    </p>
                                                )}
                                                {item.price_liter != null && (
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        1L {formatPrice(item.price_liter)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    Active
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleToggleActive(item)
                                                    }
                                                    className={`relative h-6 w-10 rounded-full transition-colors ${
                                                        item.is_active
                                                            ? "bg-green-500"
                                                            : "bg-gray-300 dark:bg-gray-600"
                                                    }`}
                                                >
                                                    <span
                                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${item.is_active ? "left-5" : "left-1"}`}
                                                    />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                    className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-sky dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-sky"
                                                    title="Edit"
                                                >
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                    className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-red-400"
                                                    title="Delete"
                                                >
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Wine
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Grapes
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            <button
                                                onClick={togglePriceSort}
                                                className="flex items-center gap-1 uppercase transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                                            >
                                                Prices
                                                {priceSort === "desc" && (
                                                    <svg
                                                        className="h-3.5 w-3.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 15l7-7 7 7"
                                                        />
                                                    </svg>
                                                )}
                                                {priceSort === "asc" && (
                                                    <svg
                                                        className="h-3.5 w-3.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Active
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {paginatedItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition-colors hover:bg-gray-100/50 dark:hover:bg-white/5"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {item.name}
                                                        {item.is_bio && (
                                                            <span className="ml-1.5 inline-block rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                                BIO
                                                            </span>
                                                        )}
                                                    </p>
                                                    {item.description_en && (
                                                        <p className="max-w-xs truncate text-sm text-gray-500 dark:text-gray-400">
                                                            {item.description_en}
                                                        </p>
                                                    )}
                                                    {item.aging && (
                                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                                            {item.aging}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                                    {item.wine_categories
                                                        ?.name || "—"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="max-w-[200px] truncate text-sm text-gray-600 dark:text-gray-300 block">
                                                    {item.grape_varieties ||
                                                        "—"}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="space-y-0.5 text-sm">
                                                    {item.price_glass !=
                                                        null && (
                                                        <p className="text-gray-600 dark:text-gray-300">
                                                            Glass:{" "}
                                                            {formatPrice(
                                                                item.price_glass
                                                            )}
                                                        </p>
                                                    )}
                                                    {item.price_bottle !=
                                                        null && (
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            Bottle:{" "}
                                                            {formatPrice(
                                                                item.price_bottle
                                                            )}
                                                        </p>
                                                    )}
                                                    {item.price_half_liter !=
                                                        null && (
                                                        <p className="text-gray-600 dark:text-gray-300">
                                                            ½L:{" "}
                                                            {formatPrice(
                                                                item.price_half_liter
                                                            )}
                                                        </p>
                                                    )}
                                                    {item.price_liter !=
                                                        null && (
                                                        <p className="text-gray-600 dark:text-gray-300">
                                                            1L:{" "}
                                                            {formatPrice(
                                                                item.price_liter
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() =>
                                                        handleToggleActive(item)
                                                    }
                                                    className={`relative h-6 w-10 rounded-full transition-colors ${item.is_active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
                                                >
                                                    <span
                                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${item.is_active ? "left-5" : "left-1"}`}
                                                    />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-sky dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-sky"
                                                        title="Edit"
                                                    >
                                                        <svg
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(item)
                                                        }
                                                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-red-400"
                                                        title="Delete"
                                                    >
                                                        <svg
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center border-t border-gray-200 p-4 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            setCurrentPage((p) =>
                                                Math.max(1, p - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        <svg
                                            className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </button>
                                    <div className="hidden items-center gap-1 sm:flex">
                                        {Array.from(
                                            {
                                                length: Math.min(
                                                    totalPages,
                                                    5
                                                ),
                                            },
                                            (_, i) => {
                                                let page;
                                                if (totalPages <= 5)
                                                    page = i + 1;
                                                else if (currentPage <= 3)
                                                    page = i + 1;
                                                else if (
                                                    currentPage >=
                                                    totalPages - 2
                                                )
                                                    page =
                                                        totalPages - 4 + i;
                                                else
                                                    page =
                                                        currentPage - 2 + i;
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() =>
                                                            setCurrentPage(
                                                                page
                                                            )
                                                        }
                                                        className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                                                            currentPage ===
                                                            page
                                                                ? "bg-sky text-white"
                                                                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                    <span className="min-w-[60px] text-center text-sm text-gray-600 dark:text-gray-300 sm:hidden">
                                        {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setCurrentPage((p) =>
                                                Math.min(totalPages, p + 1)
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                        className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        <svg
                                            className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Edit/Create Modal */}
            {isModalOpen && editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-hidden">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-hidden flex flex-col rounded-2xl bg-white dark:bg-gray-800">
                        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700 flex-shrink-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {isCreating ? "Add Wine" : "Edit Wine"}
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4 p-6 overflow-y-auto overscroll-contain">
                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={editingItem.name}
                                    onChange={(e) =>
                                        setEditingItem({
                                            ...editingItem,
                                            name: e.target.value,
                                        })
                                    }
                                    className="admin-input"
                                    placeholder="Wine name"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Category *
                                </label>
                                <AdminSelect
                                    value={editingItem.category_id}
                                    onChange={(val) =>
                                        setEditingItem({
                                            ...editingItem,
                                            category_id: val,
                                        })
                                    }
                                    options={[
                                        {
                                            value: "",
                                            label: "Select category",
                                        },
                                        ...categories.map((cat) => ({
                                            value: cat.id,
                                            label: cat.name,
                                        })),
                                    ]}
                                    placeholder="Select category"
                                />
                            </div>

                            {/* Grape Varieties */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Grape Varieties
                                </label>
                                <input
                                    type="text"
                                    value={editingItem.grape_varieties}
                                    onChange={(e) =>
                                        setEditingItem({
                                            ...editingItem,
                                            grape_varieties: e.target.value,
                                        })
                                    }
                                    className="admin-input"
                                    placeholder="e.g. 100% Chardonnay"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description (EN)
                                </label>
                                <textarea
                                    value={editingItem.description_en}
                                    onChange={(e) =>
                                        setEditingItem({
                                            ...editingItem,
                                            description_en: e.target.value,
                                        })
                                    }
                                    className="admin-input"
                                    rows={2}
                                    placeholder="Tasting notes..."
                                />
                            </div>

                            {/* Aging */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Aging
                                </label>
                                <input
                                    type="text"
                                    value={editingItem.aging}
                                    onChange={(e) =>
                                        setEditingItem({
                                            ...editingItem,
                                            aging: e.target.value,
                                        })
                                    }
                                    className="admin-input"
                                    placeholder="e.g. 6 months oak"
                                />
                            </div>

                            {/* Prices */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Prices (€)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {priceInput(
                                        "Glass",
                                        "price_glass"
                                    )}
                                    {priceInput(
                                        "Bottle",
                                        "price_bottle"
                                    )}
                                    {priceInput(
                                        "½ Liter",
                                        "price_half_liter"
                                    )}
                                    {priceInput("1 Liter", "price_liter")}
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Sort Order
                                </label>
                                <input
                                    type="number"
                                    value={editingItem.sort_order}
                                    onChange={(e) =>
                                        setEditingItem({
                                            ...editingItem,
                                            sort_order: e.target.value,
                                        })
                                    }
                                    className="admin-input"
                                    placeholder="0"
                                />
                            </div>

                            {/* Toggles */}
                            <div className="flex items-center gap-6">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={editingItem.is_active}
                                        onChange={(e) =>
                                            setEditingItem({
                                                ...editingItem,
                                                is_active: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-sky focus:ring-sky dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Active
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={editingItem.is_bio}
                                        onChange={(e) =>
                                            setEditingItem({
                                                ...editingItem,
                                                is_bio: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        BIO / Organic
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-gray-200 p-6 dark:border-gray-700 flex-shrink-0">
                            <button
                                onClick={handleCloseModal}
                                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex items-center gap-2 rounded-lg bg-sky px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky/90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSaving && (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                )}
                                {isCreating ? "Create" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
