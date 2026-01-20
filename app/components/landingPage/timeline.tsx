



// Timeline Component
import {getColors, useInView} from "@/app/components/landingPage/visual";
import React from "react";

interface TimelineProps {
    headline: string;
    steps: Array<{ time: string; title: string; description: string }>;
    isDarkMode: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ headline, steps, isDarkMode }) => {
    const colors = getColors(isDarkMode);
    const header = useInView<HTMLHeadingElement>();

    return (
        <section className={`py-32 px-6 ${colors.background.primary}`}>
            <div className="max-w-4xl mx-auto">
                <h2
                    ref={header.ref}
                    className={`text-4xl md:text-6xl font-bold text-center mb-16 transition-all duration-1000 ${
                        header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${colors.text.primary}`}
                >
                    {headline}
                </h2>

                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-emerald-500 via-emerald-500/50 to-transparent" />

                    <div className="space-y-12">
                        {steps.map((step, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const item = useInView<HTMLDivElement>();

                            return (
                                <div
                                    key={index}
                                    ref={item.ref}
                                    className={`relative pl-20 transition-all duration-700 ease-out ${
                                        item.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                                    }`}
                                >
                                    <div className={`absolute left-5 top-2 w-6 h-6 bg-emerald-500 rounded-full border-4 ${isDarkMode ? 'border-black' : 'border-white'} shadow-[0_0_20px_rgba(16,185,129,0.5)]`} />

                                    <div className="font-mono text-sm text-emerald-400 mb-2">
                                        {step.time}
                                    </div>
                                    <h3 className={`text-2xl font-bold ${colors.text.primary} mb-2`}>
                                        {step.title}
                                    </h3>
                                    <p className={`${colors.text.secondary} text-lg`}>
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
