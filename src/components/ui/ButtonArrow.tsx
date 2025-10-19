type Props = {
    children: React.ReactNode;
} & React.ComponentProps<"button">;

export const ButtonArrow = ({ children }: Props) => {
    return (
        <button className="button-arrow">
            {children}
            <img src="/icons/arrow-more.svg" className="ml-3.5 w-[30px]" />
        </button>
    );
};
