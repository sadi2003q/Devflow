

// Social Proof Component
import {Code, Shield, Star, Zap, Lock} from "lucide-react";
import {getColors} from "@/app/components/landingPage/visual";
import React from "react";

interface SocialProofProps {
    testimonial: {
        quote: string;
        author: string;
        role: string;
        company: string;
    };
    techSpecs: Array<{ label: string; value: string; icon: string }>;
    isDarkMode: boolean;
}

export const SocialProof: React.FC<SocialProofProps> = ({ testimonial, techSpecs, isDarkMode }) => {
    const colors = getColors(isDarkMode);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'lock':
                return <Lock className="w-6 h-6" />;
            case 'zap':
                return <Zap className="w-6 h-6" />;
            case 'code':
                return <Code className="w-6 h-6" />;
            default:
                return <Shield className="w-6 h-6" />;
        }
    };

    return (
        <section className={`py-32 px-6 ${colors.background.secondary}`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-linear-to-br from-emerald-500/10 to-purple-500/10 border border-emerald-500/30 rounded-2xl p-12">
                        <Star className="w-12 h-12 text-emerald-400 mb-6 fill-emerald-400" />
                        <blockquote className={`text-2xl md:text-3xl font-bold ${colors.text.primary} mb-6 leading-relaxed`}>
                            &#34;{testimonial.quote}&#34;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-linear-to-br from-yellow-300 to-red-300"></div>
                            <div>
                                <p className={`font-bold ${colors.text.primary}`}>{testimonial.author}</p>
                                <p className={colors.text.secondary}>{testimonial.role} at {testimonial.company}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className={`text-3xl font-bold ${colors.text.primary} mb-8`}>The Wall of Logic</h3>
                        {techSpecs.map((spec, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 ${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-6`}
                            >
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                                    {getIcon(spec.icon)}
                                </div>
                                <div>
                                    <p className={`text-sm ${colors.text.secondary}`}>{spec.label}</p>
                                    <p className={`text-xl font-bold ${colors.text.primary}`}>{spec.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
