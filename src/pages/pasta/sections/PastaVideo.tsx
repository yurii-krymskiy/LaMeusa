import { useTranslation } from "react-i18next";
import ScrollCircle from "../../../components/features/ScrollCircle";

export const PastVideo = () => {
    const { t } = useTranslation();
    return (
        <>
            <section className="bg-[url('/images/pasta/image-8.webp')] grid items-center bg-cover bg-no-repeat py-9 md:py-[151px] px-4">
                <div className="mx-auto max-w-[850px] text-center flex-col flex items-center">
                    <h2 className="section-title title mb-7 text-white">
                        {t("pasta.video.title")}
                    </h2>
                    <p className="description section-description mb-14 inline-block text-white">
                        {t("pasta.video.description")}
                    </p>

                    <ScrollCircle />

                </div>
            </section>
        </>
    );
};
