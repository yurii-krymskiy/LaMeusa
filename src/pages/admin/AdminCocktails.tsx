import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
    fetchCocktailCategories,
    fetchCocktailItemsAdmin,
    updateCocktailItem,
    createCocktailItem,
    deleteCocktailItem,
    type CocktailItemWithCategory,
} from "../../lib/admin.service";
import type { DbCocktailCategory } from "../../lib/supabase";
import { AdminSelect } from "../../components/ui/AdminSelect";

const ITEMS_PER_PAGE = 10;

type EditingItem = {
    id: string;
    title: string;
    description: string;
    price: string;
    category_id: string;
    is_active: boolean;
};

const emptyItem: Omit<EditingItem, "id"> = {
    title: "",
    description: "",
    price: "",
    category_id: "",
    is_active: true,
};

export const AdminCocktails = () => {
    const [items, setItems] = useState<CocktailItemWithCategory[]>([]);
    const [categories, setCategories] = useState<DbCocktailCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const filterCategory = searchParams.get("category") || "";
    const setFilterCategory = useCallback((val: string) => {
        setSearchParams((prev) => {
            if (val) prev.set("category", val);
            else prev.delete("category");
            return prev;
        }, { replace: true });
    }, [setSearchParams]);
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
            fetchCocktailItemsAdmin(filterCategory || undefined),
            fetchCocktailCategories(),
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

    const handleEdit = (item: CocktailItemWithCategory) => {
        setEditingItem({
            id: item.id,
            title: item.title,
            description: item.description || "",
            price: String(item.price),
            category_id: item.category_id,
            is_active: item.is_active,
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

        if (!editingItem.title.trim()) {
            toast.error("Title is required");
            return;
        }

        if (!editingItem.category_id) {
            toast.error("Category is required");
            return;
        }

        setIsSaving(true);

        const itemData = {
            title: editingItem.title,
            description: editingItem.description || null,
            price: parseFloat(editingItem.price) || 0,
            category_id: editingItem.category_id,
            is_active: editingItem.is_active,
        };

        let result;
        if (isCreating) {
            result = await createCocktailItem(itemData);
        } else {
            result = await updateCocktailItem(editingItem.id, itemData);
        }

        if (result.success) {
            toast.success(isCreating ? "Cocktail created!" : "Cocktail updated!");
            handleCloseModal();
            await loadData();
        } else {
            toast.error(result.error || "Failed to save cocktail");
        }

        setIsSaving(false);
    };

    const handleDelete = async (item: CocktailItemWithCategory) => {
        if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

        const result = await deleteCocktailItem(item.id);
        if (result.success) {
            toast.success(`"${item.title}" deleted!`);
            await loadData();
        } else {
            toast.error(result.error || "Failed to delete cocktail");
        }
    };

    const handleToggleActive = async (item: CocktailItemWithCategory) => {
        const newValue = !item.is_active;
        setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, is_active: newValue } : i))
        );
        const result = await updateCocktailItem(item.id, { is_active: newValue });
        if (result.success) {
            toast.success(`"${item.title}" is now ${newValue ? "active" : "inactive"}`);
        } else {
            setItems((prev) =>
                prev.map((i) => (i.id === item.id ? { ...i, is_active: !newValue } : i))
            );
            toast.error(result.error || "Failed to update cocktail");
        }
    };

    // Search + Sort
    const filteredItems = useMemo(() => {
        let result = items;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter((item) => item.title.toLowerCase().includes(q));
        }
        if (priceSort === "desc") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (priceSort === "asc") {
            result = [...result].sort((a, b) => a.price - b.price);
        }
        return result;
    }, [items, searchQuery, priceSort]);

    const togglePriceSort = () => {
        setPriceSort((prev) => prev === "none" ? "desc" : prev === "desc" ? "asc" : "none");
    };

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Cocktails Editor
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage cocktails, categories, and prices
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-sky text-white font-medium rounded-lg hover:bg-sky/90 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Cocktail
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
                    <div className="flex flex-col gap-1 w-full sm:max-w-xs">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search:</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name..."
                            className="admin-input"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full sm:max-w-xs">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
                        <AdminSelect
                            value={filterCategory}
                            onChange={setFilterCategory}
                            options={[
                                { value: "", label: "All Categories" },
                                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                            ]}
                            placeholder="All Categories"
                        />
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Cocktails
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin h-8 w-8 border-4 border-royal-blue border-t-transparent rounded-full" />
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">No cocktails found</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            <div className="flex items-center justify-end px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={togglePriceSort}
                                    className={`flex items-center gap-1 text-xs font-medium uppercase transition-colors ${
                                        priceSort !== "none" ? "text-sky" : "text-gray-500 dark:text-gray-400"
                                    }`}
                                >
                                    Price
                                    {priceSort === "desc" && (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                                    )}
                                    {priceSort === "asc" && (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    )}
                                </button>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {paginatedItems.map((item) => (
                                <div key={item.id} className="p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-900 dark:text-white truncate">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {item.cocktail_categories?.name || "—"}
                                            </p>
                                            {item.description && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                            €{item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Active</span>
                                            <button
                                                onClick={() => handleToggleActive(item)}
                                                className={`w-10 h-6 rounded-full transition-colors relative ${
                                                    item.is_active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                                                }`}
                                            >
                                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${item.is_active ? "left-5" : "left-1"}`} />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-sky dark:hover:text-sky hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}                            </div>                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cocktail</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            <button onClick={togglePriceSort} className="flex items-center gap-1 uppercase hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                                                Price
                                                {priceSort === "desc" && (
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                                                )}
                                                {priceSort === "asc" && (
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {paginatedItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                                                    {item.description && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{item.description}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">{item.cocktail_categories?.name || "—"}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">€{item.price.toFixed(2)}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleToggleActive(item)}
                                                    className={`w-10 h-6 rounded-full transition-colors relative ${item.is_active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
                                                >
                                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${item.is_active ? "left-5" : "left-1"}`} />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-sky dark:hover:text-sky hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="hidden sm:flex items-center gap-1">
                                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                            let page;
                                            if (totalPages <= 5) page = i + 1;
                                            else if (currentPage <= 3) page = i + 1;
                                            else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
                                            else page = currentPage - 2 + i;
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                                        currentPage === page
                                                            ? "bg-sky text-white"
                                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <span className="sm:hidden text-sm text-gray-600 dark:text-gray-300 min-w-[60px] text-center">
                                        {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-hidden">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {isCreating ? "Add Cocktail" : "Edit Cocktail"}
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4 overflow-y-auto overscroll-contain">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={editingItem.title}
                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                    className="admin-input"
                                    placeholder="Cocktail name"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ingredients</label>
                                <textarea
                                    value={editingItem.description}
                                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                    className="admin-input"
                                    rows={3}
                                    placeholder="List of ingredients"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                                <AdminSelect
                                    value={editingItem.category_id}
                                    onChange={(val) => setEditingItem({ ...editingItem, category_id: val })}
                                    options={[
                                        { value: "", label: "Select category" },
                                        ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                                    ]}
                                    placeholder="Select category"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (€)</label>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={editingItem.price}
                                    onChange={(e) => { const v = e.target.value; if (v === "" || /^[0-9.,]*$/.test(v)) setEditingItem({ ...editingItem, price: v }); }}
                                    className="admin-input"
                                    placeholder="0.00"
                                />
                            </div>

                            {/* Active */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={editingItem.is_active}
                                    onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                                    className="w-4 h-4 text-sky bg-gray-100 border-gray-300 rounded focus:ring-sky dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                            </label>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 flex-shrink-0">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-4 py-2 text-sm font-medium text-white bg-sky rounded-lg hover:bg-sky/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isSaving && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                                {isCreating ? "Create" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
