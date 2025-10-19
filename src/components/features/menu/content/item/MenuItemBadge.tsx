import type { MenuBadge } from "../../types";


type MenuItemBadgeProps = {
    badges: MenuBadge[];
};

export const MenuItemBadge = ({ badges }: MenuItemBadgeProps) => {
    if (!badges.length) return null;

    return (
        <ul className="flex flex-wrap gap-2">
            {badges.map((badge) => (
                <li
                    key={badge.code}
                    className="inline-flex items-center gap-1 rounded-full bg-sky/10 px-3 py-1 text-xs font-semibold uppercase text-sky"
                >
                    {badge.icon && <span aria-hidden="true">{badge.icon}</span>}
                    <span>{badge.label}</span>
                </li>
            ))}
        </ul>
    );
};
