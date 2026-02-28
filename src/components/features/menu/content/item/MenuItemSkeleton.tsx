export const MenuItemSkeleton = () => {
    return (
        <article className="flex animate-pulse flex-row gap-4 md:flex-row md:items-start">
            {/* Image skeleton */}
            <div className="h-[100px] w-[130px] shrink-0 rounded-[10px] bg-gray-200/60 lg:h-[150px] lg:w-[250px] xl:h-[200px] xl:w-[300px]" />

            <div className="flex h-full flex-1 flex-col justify-between gap-3">
                <div className="flex flex-col gap-2">
                    {/* Title skeleton */}
                    <div className="h-5 w-3/4 rounded bg-gray-200/60 lg:h-6" />
                    {/* Badges skeleton */}
                    <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-gray-200/60" />
                    </div>
                </div>
                {/* Price skeleton */}
                <div className="h-5 w-14 rounded bg-gray-200/60" />
            </div>
        </article>
    );
};

export const MenuItemSkeletonGrid = ({ count = 6 }: { count?: number }) => {
    return (
        <div className="grid-col-1 mb-10 grid gap-x-10 gap-y-10 lg:grid-cols-2">
            {Array.from({ length: count }).map((_, i) => (
                <MenuItemSkeleton key={i} />
            ))}
        </div>
    );
};
