

// Problem Section Component
import React from "react";
import {getColors, useInView} from "@/app/components/landingPage/visual";
import {Clock, GitBranch, MessageSquare, Zap} from "lucide-react";
import {ProblemCard} from "@/app/components/landingPage/problemCard";

interface ProblemSectionProps {
    headline: string;
    subheadline: string;
    problems: Array<{ title: string; description: string; icon: string }>;
    isDarkMode: boolean;
}

export const ProblemSection: React.FC<ProblemSectionProps> = (
    {
        headline,
        subheadline,
        problems,
        isDarkMode,
    }) => {
    const colors = getColors(isDarkMode);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "slack":
                return <MessageSquare className="w-6 h-6" />;
            case "jira":
                return <GitBranch className="w-6 h-6" />;
            case "context":
                return <Clock className="w-6 h-6" />;
            default:
                return <Zap className="w-6 h-6" />;
        }
    };

    const header = useInView<HTMLHeadingElement>();
    const subHeader = useInView<HTMLParagraphElement>();

    return (
        <section className={`py-32 px-6 ${colors.background.secondary}`}>
            <div className="max-w-7xl mx-auto">
                <h2
                    ref={header.ref}
                    className={`text-4xl md:text-6xl font-bold text-center mb-4 transition-all duration-1000 ${
                        header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${colors.text.primary}`}
                >
                    {headline}
                </h2>

                <p
                    ref={subHeader.ref}
                    className={`text-xl text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
                        subHeader.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${colors.text.tertiary}`}
                >
                    {subheadline}
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, index) => {

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const card = useInView<HTMLDivElement>();

                        return (
                            <div
                                key={index}
                                ref={card.ref}
                                className={`transition-all duration-1000 ease-out ${
                                    card.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <ProblemCard
                                    title={problem.title}
                                    description={problem.description}
                                    icon={getIcon(problem.icon)}
                                    isDarkMode={isDarkMode}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
