import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LegalLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export const LegalLayout = ({ children, title, subtitle }: LegalLayoutProps) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white-100 min-h-screen">
            {/* Hero */}
            <div className="bg-[#2e3e7b] py-16 md:py-24">
                <div className="container text-center">
                    <h1 className="title text-3xl md:text-5xl text-white mb-4">
                        {title}
                    </h1>
                    <p className="text-gray-200 text-lg">{subtitle}</p>
                </div>
            </div>

            {/* Content */}
            <div className="container py-10 md:py-16">
                <div className="mx-auto max-w-[860px]">
                    {children}

                    {/* Back link */}
                    <div className="mt-12 border-t border-gray-200 pt-8 text-center">
                        <Link
                            to="/"
                            className="text-royal-blue hover:text-[#3650b9] font-semibold transition-colors duration-200"
                        >
                            ← {t("nav.home")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-10">
        <h2 className="title text-xl md:text-2xl mb-4">{title}</h2>
        {children}
    </section>
);

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="description text-base md:text-lg mb-3 leading-relaxed">{children}</p>
);

export const BulletList = ({ items }: { items: string[] }) => {
    if (!Array.isArray(items)) return null;
    return (
        <ul className="description mb-4 ml-6 list-disc space-y-1.5 text-base md:text-lg">
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    );
};
