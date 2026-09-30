import { useTranslation } from "react-i18next";

type MenuItemTitleProps = {
    title: string;
    isSpicy?: boolean;
};

export const MenuItemTitle = ({ title, isSpicy }: MenuItemTitleProps) => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center gap-2">
            <h3 className="text-navy text-base md:text-3xl font-semibold">{title}</h3>
            {isSpicy && (
                <img
                    src="/icons/badgets/spicy-icon.svg"
                    alt={t("menu.labels.spicy")}
                    className="size-5 md:size-7 shrink-0"
                />
            )}
        </div>
    );
};
