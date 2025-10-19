type SectionHeaderProps = {
    title: string;
    count: number;
};

export const SectionHeader = ({ title }: SectionHeaderProps) => {
    return (
        <header className="flex flex-col gap-1">
            <h2 className="title text-navy text-3xl uppercase">{title}</h2>
        </header>
    );
};
