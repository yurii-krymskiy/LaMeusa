import type { MenuCategoryVM } from "../types";
import { SectionHeader } from "./SectionHeader";
import { MenuItem } from "./item/MenuItem";

type MenuListProps = {
    categories: MenuCategoryVM[];
};

export const MenuList = ({ categories }: MenuListProps) => {
    if (!categories.length) return null;

    return (
        <div className="border-sky flex-1 space-y-16 border-none md:border md:p-[30px]">
            {categories.map((category) => (
                <section
                    key={category.slug}
                    id={`menu-section-${category.slug}`}
                    data-menu-section={category.slug}
                    className="scroll-mt-28 space-y-6"
                >
                    <SectionHeader
                        title={category.title}
                        count={category.items.length}
                    />
                    <div className="grid">
                        {category.items.map((item) => (
                            <MenuItem key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};
