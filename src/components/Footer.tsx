export const Footer = () => {
    return (
        <>
            <footer className="bg-white-100 py-16">
                <div className="container flex flex-wrap justify-between gap-5">
                    <div className="w-full md:max-w-[320px]">
                        <div>
                            <img
                                src="/icons/logo.svg"
                                alt="La Medusa"
                                className="mb-2.5"
                            />
                            <p className="description text-sm">
                                Lorem Ipsum is not simply random text. It has
                                roots in a piece of classical Latin
                                literature{" "}
                            </p>

                            <div className="mt-5 flex flex-wrap md:flex-nowrap gap-8">
                                <div>
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src="/images/google.png"
                                            alt="Google"
                                            className="max-w-[90px]"
                                        />
                                        <img
                                            src="/icons/arrow-more.svg"
                                            className="w-[30px]"
                                        />
                                    </div>
                                    <span className="description text-xs">
                                        <b>1131</b> Reviews
                                    </span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src="/images/tripadvisor.png"
                                            alt="Google"
                                            className="max-w-[120px]"
                                        />
                                        <img
                                            src="/icons/arrow-more.svg"
                                            className="w-[30px]"
                                        />
                                    </div>
                                    <span className="description text-xs">
                                        <b>1523</b> Reviews
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[420px]">
                        <div className="title border-navy mb-3.5 border-b pb-3.5 text-xl font-normal text-gray-700 capitalize">
                            Explore
                        </div>
                        <div className="flex justify-between">
                            <ul className="text-royal-blue flex flex-col gap-2.5 font-semibold md:text-lg">
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">Home</li>
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">Menu</li>
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">About</li>
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">Seafood</li>
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">Paella</li>
                            </ul>
                            <ul className="text-royal-blue flex flex-col gap-2.5 font-semibold md:text-lg">
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">Burger</li>
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">Birthday Celebrations</li>
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">Happy hours</li>
                                <li className="hover:text-[#3650b9] cursor-pointer transition-colors duration-200">Pizza</li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full md:w-[320px]">
                        <div className="title border-navy mb-3.5 border-b pb-3.5 text-xl font-normal text-gray-700 capitalize">
                            Contact
                        </div>
                        <ul className="text-royal-blue mb-7 text-sm font-semibold md:text-lg">
                            <li className="mb-5 last:mb-0">
                                <a
                                    href="tel:+34603839509"
                                    className="inline-flex items-center gap-3.5 hover:text-[#3650b9] transition-colors duration-200"
                                >
                                    <img
                                        src="/icons/phone-blue.svg"
                                        className="w-[30px]"
                                    />
                                    +34 603 83 95 09
                                </a>
                            </li>
                            <li className="mb-5 last:mb-0">
                                <a
                                    href="mail:email.example@gmail.com"
                                    className="inline-flex items-center gap-3.5 hover:text-[#3650b9] transition-colors duration-200"
                                >
                                    <img
                                        src="/icons/email-blue.svg"
                                        className="w-[30px]"
                                    />
                                    email.example@gmail.com
                                </a>
                            </li>
                            <li className="mb-5 last:mb-0">
                                <a
                                    href="mail:email.example@gmail.com"
                                    className="inline-flex items-center gap-3.5 hover:text-[#3650b9] transition-colors duration-200"
                                >
                                    <img
                                        src="/icons/location-pin 1.svg"
                                        className="w-[30px]"
                                    />
                                    Avenida La Habana 9
                                </a>
                            </li>
                        </ul>
                        <ul className="flex flex-wrap gap-6">
                            <li>
                                <a href="" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/facebook-blue.svg"
                                        alt="Facebok"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/instagram-blue.svg"
                                        alt="Instagram"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/whatsapp-blue.svg"
                                        alt="Whatsapp"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/tik-tok-blue.svg"
                                        alt="Tik Tok"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:opacity-70 transition-opacity duration-200">
                                    <img
                                        src="/icons/youtube-blue.svg"
                                        alt="Youtube"
                                        className="w-[30px]"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
            <div className="bg-royal-blue">
                <div className="container flex flex-col justify-between py-5 text-xs text-white md:flex-row md:text-lg">
                    <p className="flex-1 text-center md:text-left">
                        © 2025 La Medusa. All rights reserved.
                    </p>

                    <div className="mt-4 flex flex-1 items-center justify-center gap-10 md:mt-0 md:justify-end">
                        <span>Terms of Service</span>
                        <span>Privacy Policy</span>
                        <span>Cookies Settings</span>
                    </div>
                </div>
            </div>
        </>
    );
};
