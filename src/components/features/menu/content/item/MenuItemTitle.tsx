type MenuItemTitleProps = {
    title: string;
};

export const MenuItemTitle = ({ title }: MenuItemTitleProps) => {
    return (
        <h3 className="text-navy text-lg md:text-3xl font-semibold">{title}</h3>
    );
};
