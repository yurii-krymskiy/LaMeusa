import { useTranslation } from "react-i18next";
import { Money } from "../../menuResolver";
import type { MenuPrice } from "../../types";

type MenuItemPriceProps = {
    price: MenuPrice;
    isTwoPerson?: boolean;
};

export const MenuItemPrice = ({ price, isTwoPerson }: MenuItemPriceProps) => {
    const { t } = useTranslation();
    const formatted = Money.format(price.price);
    const formattedLarge = price.priceLarge
        ? Money.format(price.priceLarge)
        : undefined;
    const unit = price.unit
        ? t(`menu.units.${price.unit}`, price.unit.replaceAll("_", " "))
        : undefined;
    const perPerson = t("menu.labels.perPersonShort", "P.p");

    if (formattedLarge) {
        return (
            <div className="flex flex-col items-start text-right md:items-end">
                <div className="flex items-center gap-2">
                    <span className="title text-[16px] md:text-4xl text-sky font-semibold uppercase">
                        {formatted}
                    </span>
                    {isTwoPerson && (
                        <span className="text-xs font-semibold text-gray-500">{perPerson}</span>
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
                    <span className="text-xs font-semibold text-gray-500">{perPerson}</span>
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
