import type { MenuCardVM } from "../../types";
import { MenuItemBadge } from "./MenuItemBadge";
import { MenuItemImage } from "./MenuItemImage";
import { MenuItemPrice } from "./MenuItemPrice";
import { MenuItemSubtitle } from "./MenuItemSubtitle";
import { MenuItemTitle } from "./MenuItemTitle";

type MenuItemProps = {
    item: MenuCardVM;
};

export const MenuItem = ({ item }: MenuItemProps) => {
    return (
        <article
            id={item.anchorId}
            className="flex flex-row gap-4  md:flex-row md:items-start"
        >
            <MenuItemImage src={item.imageUrl} alt={item.title} />
            <div className="flex h-full flex-1 flex-col justify-between gap-4">
                <div className="flex flex-col gap-3 md:flex-col md:items-start md:justify-between">
                    <MenuItemTitle title={item.title} />
                    {item.subtitle && (
                        <MenuItemSubtitle subtitle={item.subtitle} />
                    )}
                    <MenuItemBadge badges={item.badges} />
                </div>

                {item.price && <MenuItemPrice price={item.price} />}
            </div>
        </article>
    );
};
