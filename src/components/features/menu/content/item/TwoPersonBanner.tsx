export const TwoPersonBadge = () => {
    return (
        <div
            className="absolute top-2 left-0 z-10 flex items-center bg-sky/90 py-1 pr-3 pl-2 text-white lg:top-3 lg:py-1.5 lg:pr-4 lg:pl-3"
            style={{
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)",
            }}
        >
            <PersonIcon />
            <PersonIcon />
            <span className="text-[8px] font-bold tracking-wider uppercase lg:text-[11px]">
                For Two Persons
            </span>
        </div>
    );
};

const PersonIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3 w-3 lg:h-4 lg:w-4"
    >
        <circle cx="12" cy="7" r="4" />
        <path d="M12 13c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
    </svg>
);
