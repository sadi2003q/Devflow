


// Solution Section Component
import React from "react";
import {getColors, useInView} from "@/app/components/landingPage/visual";
import {Check} from "lucide-react";

interface BenefitProps {
    title: string;
    description: string;
    benefits: string[];
    index: number;
}


export const SolutionSection: React.FC<{ benefits: BenefitProps[], isDarkMode: boolean }> = (
    {
        benefits,
        isDarkMode,
    }) => {
    const colors = getColors(isDarkMode);
    const title = useInView<HTMLHeadingElement>();
    const subtitle = useInView<HTMLParagraphElement>();
    return (
        <section className={`py-32 px-6 ${colors.background.secondary}`}>
            <div className="max-w-7xl mx-auto">
                <h2
                    ref={title.ref}
                    className={`text-4xl md:text-6xl font-bold text-center mb-4 transition-all duration-1000 ${
                        title.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${colors.text.primary}`}
                >
                    The New Way
                </h2>

                <p
                    ref={subtitle.ref}
                    className={`text-xl text-center mb-20 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
                        subtitle.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${colors.text.tertiary}`}
                >
                    Stop patching broken workflows. DevFlow rebuilds your productivity from
                    the ground up.
                </p>

                <div className="space-y-24">
                    {benefits.map((benefit, index) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const row = useInView<HTMLDivElement>();

                        return (
                            <div
                                key={index}
                                ref={row.ref}
                                className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
                                    row.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                }`}
                            >
                                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                                    <h3 className={`text-3xl md:text-4xl font-bold ${colors.text.primary} mb-4`}>
                                        {benefit.title}
                                    </h3>
                                    <p className={`text-lg ${colors.text.secondary} mb-6 leading-relaxed`}>
                                        {benefit.description}
                                    </p>

                                    <ul className="space-y-3">
                                        {benefit.benefits.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                                                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                                {item}
                              </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                                    <div className="relative group/card">


                                        <div className={`relative ${colors.background.tertiary} border ${colors.border.primary} rounded-2xl p-8 backdrop-blur-md overflow-hidden group-hover/card:border-opacity-50 transition-all duration-300`}>
                                            {/* Background pattern */}
                                            <div className="absolute inset-0 opacity-5">
                                                <div className="absolute inset-0" style={{
                                                    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)`,
                                                    backgroundSize: '32px 32px'
                                                }}></div>
                                            </div>




                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
