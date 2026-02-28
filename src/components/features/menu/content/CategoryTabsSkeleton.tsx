const categoryWidths = [100, 70, 60, 80];

export const CategoryTabsSkeleton = () => {
    return (
        <div className="mb-11 flex animate-pulse flex-wrap justify-center gap-5">
            {categoryWidths.map((width, i) => (
                <div
                    key={i}
                    className="h-7 rounded bg-gray-200/60 lg:h-8"
                    style={{ width: `${width}px` }}
                />
            ))}
        </div>
    );
};
