import { Money } from "../../menuResolver";
import type { MenuPrice } from "../../types";

type MenuItemPriceProps = {
    price: MenuPrice;
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

export const MenuItemPrice = ({ price }: MenuItemPriceProps) => {
    const formatted = Money.format(price.price);
    const unit = formatUnit(price.unit);

    return (
        <div className="flex flex-col items-start text-right md:items-end">
            <span className="title md:text-4xl text-sky  font-semibold uppercase">
                {formatted}
            </span>
            {unit && (
                <span className="text-xs font-medium text-gray-700 uppercase">
                    {unit}
                </span>
            )}
        </div>
    );
};
