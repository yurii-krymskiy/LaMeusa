export const ContactHero = () => {
    return (
        <main className="hero contact-hero !items-start">
            <div className="container">
                <div className="">
                    <h2 className="title hero-title !text-left">
                        Get in Touch
                    </h2>
                    <p className="description hero-description !max-w-none !text-left">
                        The freshest ingredients for you every day
                    </p>
                </div>

                <div className="flex justify-end">
                    <div className="mt-[100px] flex w-full max-w-[540px] flex-col gap-10 text-white">
                        <div className="flex justify-between">
                            <span className="title text-lg md:text-[28px] font-semibold text-white">
                                Open Time
                            </span>
                            <span className="text-base md:text-2xl">Monday - Saturday</span>
                        </div>

                        <div className="w-full h-[2px] bg-[repeating-linear-gradient(to_right,white_0_8px,transparent_8px_20px)]" />
                        <div className="flex justify-between gap-3">
                            <span className="inline-block max-w-[245px] text-base md:text-2xl">
                                Monday - Saturday , 12.00 - 23.00
                            </span>
                            <span className="inline-block max-w-[200px] text-base md:text-2xl">
                                Music 18.30 - 20.30
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
