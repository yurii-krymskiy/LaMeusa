import { Breadcrumb } from "../../../components/ui/Breadcrumb";

export const ContactUs = () => {
    return (
        <section className="section-breadcrumb">
            <div className="container">
                <Breadcrumb />
                <div className="flex flex-col items-center gap-5 lg:gap-14 lg:flex-row">
                    <div>
                        <div>
                            <span className="decorative">Contact Us</span>
                            <div className="title leading-[100%] section-title">
                                How to find us
                            </div>
                        </div>

                        <p className="description font-[300] section-description mb-[20px] lg:mb-[30px]">
                            We are waiting for you every day at the appointed
                            time, with service ready to provide atmosphere and
                            taste.
                        </p>

                        <div className="mb-4 w-full space-y-3 lg:space-y-6">
                            <div className="grid grid-cols-1 items-start gap-y-2 lg:grid-cols-[210px_1fr]">
                                <span className="title font-bold">
                                    Restaurant HOURS
                                </span>
                                <div className="font-[300]">
                                    <div>Monday - Saturday , 12.00 - 23.00</div>
                                    <div>Music , 18.30 - 20.30</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 lg:grid-cols-[210px_1fr]">
                                <span className="title font-bold">Address</span>
                                <div className="text-royal-blue hover:text-[#3650b9] transition-colors duration-200 font-semibold">
                                    Avenida La Habana 9
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 lg:grid-cols-[210px_1fr]">
                                <span className="title font-bold">Phone</span>
                                <div className="text-royal-blue hover:text-[#3650b9] transition-colors duration-200 font-semibold">
                                    <a href="tel:+34603839509">
                                        +34 603 83 95 09
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 items-start gap-y-2 lg:grid-cols-[210px_1fr]">
                                <span className="title font-bold">Email</span>
                                <div className="text-royal-blue hover:text-[#3650b9] transition-colors duration-200 font-semibold">
                                    <a href="mailto:lamedusarestaurants@gmail.com">
                                        lamedusarestaurants@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-[700px] min-w-[100px]">
                        <img src="/images/contact/Rectangle 132.jpg" />
                    </div>
                </div>
            </div>
        </section>
    );
};
