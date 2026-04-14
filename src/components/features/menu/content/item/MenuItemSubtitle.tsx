type MenuItemSubtitleProps = {
    subtitle: string;
};

export const MenuItemSubtitle = ({ subtitle }: MenuItemSubtitleProps) => {
    return (
        <p className="description text-[11px] text-gray-700 md:text-base">
            {subtitle}
        </p>
    );
};
