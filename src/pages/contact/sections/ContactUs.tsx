import { Breadcrumb } from "../../../components/ui/Breadcrumb";

export const ContactUs = () => {
    return (
        <section className="section">
            <div className="container">
                <Breadcrumb />
                <div className="flex flex-col items-center gap-14 md:flex-row">
                    <div className="">
                        <div className="mb-7">
                            <span className="decorative">Contact Us</span>
                            <div className="title section-title">
                                How to find us
                            </div>
                        </div>

                        <div className="mb-4 w-full space-y-6">
                            <div className="grid grid-cols-1 items-start gap-y-2 md:grid-cols-[210px_1fr]">
                                <span className="title font-bold">
                                    Restaurant HOURS
                                </span>
                                <div>
                                    <div>Monday - Saturday , 12.00 - 23.00</div>
                                    <div>Music , 18.30 - 20.30</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 md:grid-cols-[210px_1fr]">
                                <span className="title font-bold">Address</span>
                                <div className="text-royal-blue font-semibold">
                                    Avenida La Habana 9
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 md:grid-cols-[210px_1fr]">
                                <span className="title font-bold">Phone</span>
                                <div className="text-royal-blue font-semibold">
                                    <a href="tel:+34603839509">
                                        +34 603 83 95 09
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 md:grid-cols-[210px_1fr]">
                                <span className="title font-bold">Email</span>
                                <div className="text-royal-blue font-semibold">
                                    <a href="mailto:lamedusarestaurants@gmail.com">
                                        lamedusarestaurants@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <p className="description section-description">
                            We are waiting for you every day at the appointed
                            time, with service ready to provide atmosphere and
                            taste.
                        </p>
                    </div>
                    <div className="w-full max-w-[700px] min-w-[100px]">
                        <img src="/images/contact/Rectangle 132.jpg" />
                    </div>
                </div>
            </div>
        </section>
    );
};
