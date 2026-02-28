import { MenuItemSkeleton } from "./item/MenuItemSkeleton";

export const MenuListSkeleton = () => {
    return (
        <div className="flex-1">
            {/* Category sections skeleton */}
            {Array.from({ length: 3 }).map((_, sectionIndex) => (
                <section key={sectionIndex} className="mb-12">
                    {/* Category title skeleton */}
                    <div className="mb-6 animate-pulse">
                        <div className="h-8 w-48 rounded bg-gray-200/60" />
                    </div>
                    {/* Menu items grid skeleton */}
                    <div className="grid gap-6 grid-cols-1 lg:gap-8">
                        {Array.from({ length: 4 }).map((_, itemIndex) => (
                            <MenuItemSkeleton key={itemIndex} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};
