const ScrollCircle = () => {
    return (
        <div className="flex animate-bounce cursor-pointer size-[50px] items-center justify-center rounded-[50%] border border-white bg-[#00000080] md:size-[100px]">
            <img
                src="/icons/arrow-bottom-header.svg"
                alt="arrow-bottom-header"
                className="h-4 md:h-8"
            />
        </div>
    );
};

export default ScrollCircle;
