import { TwoPersonBadge } from "./TwoPersonBanner";

type MenuItemImageProps = {
    src?: string;
    alt: string;
    isTwoPerson?: boolean;
};

export const MenuItemImage = ({ src, alt, isTwoPerson }: MenuItemImageProps) => {
    if (!src) return null;

    return (
        <div className="relative h-[100px] w-[130px] shrink-0 rounded-[10px] lg:h-[150px] lg:w-[250px] xl:h-[200px] xl:w-[300px]">
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className="h-full w-full rounded-[10px] object-cover"
                onError={(e) => {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                }}
            />
            {isTwoPerson && <TwoPersonBadge />}
        </div>
    );
};
