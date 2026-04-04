type MenuItemTitleProps = {
    title: string;
    isSpicy?: boolean;
};

export const MenuItemTitle = ({ title, isSpicy }: MenuItemTitleProps) => {
    return (
        <div className="flex items-center gap-2">
            <h3 className="text-navy text-lg md:text-3xl font-semibold">{title}</h3>
            {isSpicy && (
                <img
                    src="/icons/badgets/spicy-icon.svg"
                    alt="Spicy"
                    className="size-5 md:size-7 shrink-0"
                />
            )}
        </div>
    );
};
