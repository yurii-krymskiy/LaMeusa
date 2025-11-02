import { Button } from "../../../components/ui/Button";
import { Paths } from "../../../router";

export const BirthdayGift = () => {
    return (
        <>
            <section className="section bg-white-100">
                <div className="decorative-line container flex flex-col-reverse gap-5 md:gap-16 lg:flex-row">
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-[336px_309px]">
                        <img
                            src="/images/birthday/image-6.webp"
                            alt="image"
                            className="h-auto w-full object-contain lg:object-cover"
                            loading="lazy"
                        />
                        <div className="flex flex-col gap-6 self-end">
                            <img
                                src="/images/birthday/image-5.webp"
                                alt="image"
                                className="mt-10 h-auto w-full object-contain"
                                loading="lazy"
                            />
                            <img
                                src="/images/birthday/image-7.webp"
                                alt="image"
                                className="h-auto w-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="max-w-[590px] self-center">
                        <p className="decorative mb-2.5 text-[34px]">
                            Suggestions
                        </p>
                        <p className="title section-title mb-6 text-[48px]">
                            Birthday Gifts from La Medusa
                        </p>
                        <p className="description section-description mb-2.5">
                            On your special day, we will make sure that the
                            atmosphere is even warmer. For each birthday person,
                            our chef prepares a birthday cake, which we serve
                            with congratulations from the entire staff.
                        </p>
                        <p className="description section-description mb-10">
                            This is the moment when the restaurant is filled
                            with sincere emotions, and your evening becomes even
                            more festive. We believe that such details create
                            memories that last forever.
                        </p>

                        <Button variant="blue" to={Paths.contact}>
                            Celebrate with Us
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
