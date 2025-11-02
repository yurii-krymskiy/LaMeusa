import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { pagesLabels } from "../../router";

export const Menu = () => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    const openMenu = () => {
        setMounted(true);
        requestAnimationFrame(() => setOpen(true));
    };

    const closeMenu = () => setOpen(false);

    const onTransitionEnd = () => {
        if (!open) setMounted(false);
    };

    useEffect(() => {
        if (mounted) {
            document.documentElement.classList.add("overflow-hidden");
            document.body.classList.add("overflow-hidden");
        } else {
            document.documentElement.classList.remove("overflow-hidden");
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.documentElement.classList.remove("overflow-hidden");
            document.body.classList.remove("overflow-hidden");
        };
    }, [mounted]);

    const closeThen = (fn?: () => void) => () => {
        closeMenu();
        fn?.();
    };

    return (
        <>
            <button
                className="flex flex-row items-center gap-2"
                onClick={openMenu}
                aria-haspopup="dialog"
                aria-expanded={mounted && open}
                aria-controls="site-menu"
            >
                <img
                    src="/icons/burger-menu.svg"
                    alt="Open menu"
                    className="w-[50px] cursor-pointer"
                />
                <p className="title hidden cursor-pointer font-bold text-[#1B1B1B] uppercase md:block">
                    Menu
                </p>
            </button>

            {mounted && (
                <div
                    id="site-menu"
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50"
                    onTransitionEnd={onTransitionEnd}
                >
                    <div
                        className={[
                            "bg-royal-blue overflow-x-hidden fixed inset-0 md:h-auto h-dvh w-full",
                            "flex flex-col md:justify-center overflow-y-auto overscroll-contain py-20 [-webkit-overflow-scrolling:touch] md:items-center",
                            "transition-transform duration-300 ease-out will-change-transform",
                            open ? "translate-y-0" : "-translate-y-full",
                        ].join(" ")}
                    >
                        <button
                            ref={closeBtnRef}
                            className="absolute top-5 left-5 w-6 cursor-pointer md:w-[40px]"
                            onClick={closeMenu}
                            aria-label="Close menu"
                        >
                            <img
                                src="/icons/close-icon.svg"
                                className="w-[40px]"
                                alt="Close"
                            />
                        </button>

                        <img
                            src="/icons/Mint.svg"
                            className="absolute -top-30 -right-10 w-[200px] rotate-12 cursor-pointer md:w-[300px]"
                        />
                        <img
                            src="/icons/Orange.svg"
                            className="absolute bottom-0 left-0 hidden cursor-pointer md:block md:w-[180px]"
                        />

                        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 pt-20 md:pt-0">
                            <ul className="flex flex-col gap-9 text-2xl font-semibold text-white uppercase md:text-3xl">
                                {pagesLabels.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={closeThen()}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="w-[300px] max-md:hidden">
                                <div className="title mb-3.5 border-b border-white pb-3.5 text-xl font-normal text-white capitalize">
                                    Contact
                                </div>
                                <ul className="mb-7 font-semibold text-white md:text-lg">
                                    <li className="mb-5 last:mb-0">
                                        <a
                                            href="tel:+34603839509"
                                            className="inline-flex items-center gap-3.5"
                                        >
                                            <img
                                                src="/icons/phone 1.svg"
                                                className="w-[30px]"
                                                alt="Phone"
                                            />
                                            +34 603 83 95 09
                                        </a>
                                    </li>
                                    <li className="mb-5 last:mb-0">
                                        <a
                                            href="mailto:email.example@gmail.com"
                                            className="inline-flex items-center gap-3.5"
                                        >
                                            <img
                                                src="/icons/email-white.svg"
                                                className="w-[30px]"
                                                alt="Email"
                                            />
                                            email.example@gmail.com
                                        </a>
                                    </li>
                                    <li className="mb-5 last:mb-0">
                                        <a
                                            href="https://maps.google.com?q=Avenida%20La%20Habana%209"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-3.5"
                                        >
                                            <img
                                                src="/icons/location-white.svg"
                                                className="w-[30px]"
                                                alt="Location"
                                            />
                                            Avenida La Habana 9
                                        </a>
                                    </li>
                                </ul>
                                <ul className="flex flex-wrap gap-6">
                                    {[
                                        {
                                            alt: "Facebook",
                                            src: "/icons/facebook-white.svg",
                                            href: "#",
                                        },
                                        {
                                            alt: "Instagram",
                                            src: "/icons/instagram-white.svg",
                                            href: "#",
                                        },
                                        {
                                            alt: "Whatsapp",
                                            src: "/icons/whatsapp-white.svg",
                                            href: "#",
                                        },
                                        {
                                            alt: "TikTok",
                                            src: "/icons/tik-tok-white.svg",
                                            href: "#",
                                        },
                                        {
                                            alt: "YouTube",
                                            src: "/icons/youtube-white.svg",
                                            href: "#",
                                        },
                                    ].map((it) => (
                                        <li key={it.alt}>
                                            <a
                                                href={it.href}
                                                aria-label={it.alt}
                                            >
                                                <img
                                                    src={it.src}
                                                    alt={it.alt}
                                                    className="w-[30px]"
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="px-4 pb-8 md:hidden">
                            <div className="mt-10 border-t border-white/30 pt-6">
                                <div className="title mb-3.5 text-xl font-normal text-white capitalize">
                                    Contact
                                </div>
                                <ul className="mb-7 font-semibold text-white">
                                    <li className="mb-5 last:mb-0">
                                        <a
                                            href="tel:+34603839509"
                                            className="inline-flex items-center gap-3.5"
                                        >
                                            <img
                                                src="/icons/phone 1.svg"
                                                className="w-[30px]"
                                                alt="Phone"
                                            />
                                            +34 603 83 95 09
                                        </a>
                                    </li>
                                    <li className="mb-5 last:mb-0">
                                        <a
                                            href="mailto:email.example@gmail.com"
                                            className="inline-flex items-center gap-3.5"
                                        >
                                            <img
                                                src="/icons/email-white.svg"
                                                className="w-[30px]"
                                                alt="Email"
                                            />
                                            email.example@gmail.com
                                        </a>
                                    </li>
                                    <li className="mb-5 last:mb-0">
                                        <a
                                            href="https://maps.google.com?q=Avenida%20La%20Habana%209"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-3.5"
                                        >
                                            <img
                                                src="/icons/location-white.svg"
                                                className="w-[30px]"
                                                alt="Location"
                                            />
                                            Avenida La Habana 9
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
