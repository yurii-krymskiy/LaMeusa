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
            className="flex flex-row gap-4 md:flex-row md:items-start"
        >
                <MenuItemImage src={item.imageUrl} alt={item.title} isTwoPerson={item.isTwoPerson} />
                <div className="flex self-stretch flex-1 flex-col justify-between gap-4">
                    <div className="flex flex-col gap-3 md:flex-col md:items-start md:justify-between">
                        <MenuItemTitle title={item.title} isSpicy={item.isSpicy} />
                        {item.subtitle && (
                            <MenuItemSubtitle subtitle={item.subtitle} />
                        )}
                        <MenuItemBadge badges={item.badges} />
                        {item.isServedUntil6pm && (
                            <span className="text-xs text-gray-500 italic">Served until 6 PM</span>
                        )}
                    </div>

                    {item.price && (
                        <MenuItemPrice
                            price={item.price}
                            isTwoPerson={item.isTwoPerson}
                        />
                    )}
                </div>
        </article>
    );
};
