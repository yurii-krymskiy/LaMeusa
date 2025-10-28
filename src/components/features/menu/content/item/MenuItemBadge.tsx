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
                    className="inline-flex items-center gap-1  py-1 text-xs font-semibold uppercase"
                >
                    {badge.icon && (
                        <div className="size-5">
                            <img src={badge.icon} />
                        </div>
                    )}
                    <span className={`text-[${badge.color}]`}>
                        {badge.label}
                    </span>
                </li>
            ))}
        </ul>
    );
};
