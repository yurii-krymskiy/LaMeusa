import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "uk", label: "UA", flag: "/flags/UA.svg" },
    { code: "en", label: "EN", flag: "/flags/GB.svg" },
    { code: "es", label: "ES", flag: "/flags/ES.svg" },
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = languages.find((l) => l.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (code: string) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5"
            >
                <img src={current.flag} alt={current.label} className="h-5 w-5 rounded-full object-cover" />
                <span className="title text-sm font-bold text-[#1B1B1B]">
                    {current.label}
                </span>
                <svg
                    className={`h-3 w-3 text-[#1B1B1B] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                                lang.code === current.code
                                    ? "bg-sky/10 font-semibold text-sky"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <img src={lang.flag} alt={lang.label} className="h-5 w-5 rounded-full object-cover" />
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
