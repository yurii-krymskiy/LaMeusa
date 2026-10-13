const sectionWidths = [80, 60, 90];
const tabWidths = [120, 70, 60, 70, 100];

// Rendered inside the same sticky wrapper as the real tabs (see Menu.tsx).
// Row height (h-9 = 36px) matches the real tab buttons (text-sm + py-2).
export const MobileCategoryTabsSkeleton = () => {
    return (
        <>
            <div className="no-scrollbar flex w-full animate-pulse gap-2 overflow-x-auto overscroll-x-contain px-4 py-2">
                {sectionWidths.map((width, i) => (
                    <div
                        key={i}
                        className="h-9 shrink-0 rounded-full bg-gray-200/60"
                        style={{ width: `${width}px` }}
                    />
                ))}
            </div>
            <div className="border-t border-gray-200/50">
                <div className="no-scrollbar flex w-full animate-pulse gap-2 overflow-x-auto overscroll-x-contain px-4 py-2">
                    {tabWidths.map((width, i) => (
                        <div
                            key={i}
                            className="h-9 shrink-0 rounded-full bg-gray-200/60"
                            style={{ width: `${width}px` }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
