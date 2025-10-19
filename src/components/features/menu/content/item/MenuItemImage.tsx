type MenuItemImageProps = {
    src?: string;
    alt: string;
};

export const MenuItemImage = ({ src, alt }: MenuItemImageProps) => {
    if (!src) return null;

    return (
        <div className="h-[100px] w-[130px] overflow-hidden rounded-[10px] md:h-[200px] md:w-[300px] ">
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className="h-full w-full object-cover "
                onError={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                }}
            />
        </div>
    );
};
