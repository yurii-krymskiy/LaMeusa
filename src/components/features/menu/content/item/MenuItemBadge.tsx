import { useTranslation } from "react-i18next";
import type { MenuBadge } from "../../types";

type MenuItemBadgeProps = {
    badges: MenuBadge[];
};

export const MenuItemBadge = ({ badges }: MenuItemBadgeProps) => {
    const { t } = useTranslation();

    if (!badges.length) return null;

    return (
        <ul className="flex flex-wrap gap-2">
            {badges.map((badge) => {
                const label = badge.labelKey
                    ? t(badge.labelKey, badge.label ?? badge.code)
                    : badge.label;
                return (
                    <li
                        key={badge.code}
                        className="inline-flex items-center gap-1  py-1 text-xs font-semibold uppercase"
                    >
                        {badge.icon && (
                            <div className="size-5">
                                <img src={badge.icon} />
                            </div>
                        )}
                        {label && (
                            <span style={badge.color ? { color: badge.color } : undefined}>
                                {label}
                            </span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
