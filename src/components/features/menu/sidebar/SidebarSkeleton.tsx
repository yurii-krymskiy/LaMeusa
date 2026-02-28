export const SidebarSkeleton = () => {
  return (
    <aside className="hidden w-52 shrink-0 animate-pulse lg:block">
      <div className="sticky top-6 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between"
          >
            <div
              className="h-5 rounded bg-gray-200/60"
              style={{ width: `${60 + (i % 3) * 15}%` }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};
