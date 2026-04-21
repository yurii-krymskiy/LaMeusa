import { Money } from "../../menuResolver";
import type { MenuPrice } from "../../types";

type MenuItemPriceProps = {
    price: MenuPrice;
    isTwoPerson?: boolean;
};

const unitLabels: Record<string, string> = {
    item: "per item",
    per_person: "per person",
    per_100g: "per 100 g",
    per_kg: "per kg",
    for_2: "for 2 people",
    "for_3+": "for 3+ people",
};

const formatUnit = (unit?: string) => {
    if (!unit) return undefined;
    return unitLabels[unit] ?? unit.replaceAll("_", " ");
};

export const MenuItemPrice = ({ price, isTwoPerson }: MenuItemPriceProps) => {
    const formatted = Money.format(price.price);
    const formattedLarge = price.priceLarge
        ? Money.format(price.priceLarge)
        : undefined;
    const unit = formatUnit(price.unit);

    if (formattedLarge) {
        return (
            <div className="flex flex-col items-start text-right md:items-end">
                <div className="flex items-center gap-2">
                    <span className="title text-[16px] md:text-4xl text-sky font-semibold uppercase">
                        {formatted}
                    </span>
                    {isTwoPerson && (
                        <span className="text-xs font-semibold text-gray-500">P.p</span>
                    )}
                    <span className="text-xs font-semibold text-gray-500 uppercase">S</span>
                    <span className="text-xs text-gray-300">/</span>
                    <span className="title text-[16px] md:text-4xl text-sky font-semibold uppercase">
                        {formattedLarge}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 uppercase">L</span>
                </div>
                {unit && (
                    <span className="text-xs font-medium text-gray-700 uppercase">
                        {unit}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start text-right md:items-end">
            <div className="flex items-center gap-2">
                <span className="title text-[16px] md:text-4xl text-sky  font-semibold uppercase">
                    {formatted}
                </span>
                {isTwoPerson && (
                    <span className="text-xs font-semibold text-gray-500">P.p</span>
                )}
            </div>
            {unit && (
                <span className="text-xs font-medium text-gray-700 uppercase">
                    {unit}
                </span>
            )}
        </div>
    );
};
