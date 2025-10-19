import { useState } from "react";

type AccordionItem = { title: string; content: string };
type Props = { list: AccordionItem[] };

export const Accordion = ({ list }: Props) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const toggleIndex = (i: number) =>
        setActiveIndex((p) => (p === i ? null : i));

    return (
        <div className="space-y-4">
            {list.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                    <div
                        key={i}
                        className="border-sky overflow-hidden border-b"
                    >
                        <button
                            onClick={() => toggleIndex(i)}
                            className="flex w-full cursor-pointer items-center gap-3 px-2 py-4 text-lg font-medium transition hover:bg-gray-50"
                            aria-expanded={isActive}
                        >
                            <span
                                className={`relative flex h-8 w-8 items-center justify-center transition-transform duration-300 ${
                                    isActive ? "rotate-90" : "rotate-0"
                                }`}
                            >
                                <span
                                    className={`bg-sky absolute h-[1.5px] w-4 transition-opacity duration-300 ${
                                        isActive ? "opacity-0" : "opacity-100"
                                    }`}
                                />
                                <span className="bg-sky absolute h-4 w-[1.5px]" />
                            </span>
                            <div className="title normal-case md:text-xl">
                                {item.title}
                            </div>
                        </button>
                        <div
                            className={[
                                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                                isActive
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0",
                            ].join(" ")}
                        >
                            <div className="overflow-hidden px-6">
                                <div className="description section-description py-4">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
