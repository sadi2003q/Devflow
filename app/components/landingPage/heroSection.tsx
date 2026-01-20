

// Hero Section Component
import React, {useEffect, useState} from "react";
import {getColors} from "@/app/components/landingPage/visual";
import {ArrowRight} from "lucide-react";

interface HeroProps {
    headline: string;
    subheadline: string;
    ctaText: string;
    trustSignal: string;
    isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ headline, subheadline, ctaText, trustSignal, isDarkMode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const colors = getColors(isDarkMode);

    useEffect(() => {

        const changeVisibility = () => {
            setIsVisible(true);
        }

        changeVisibility();

    }, []);

    return (
        <section className={`min-h-screen flex items-center justify-center px-6 py-24 ${colors.background.primary}`}>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div
                    className={`space-y-8 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h1 className={`text-5xl md:text-7xl font-bold ${colors.text.primary} leading-tight tracking-tight`}>
                        {headline}
                    </h1>
                    <p className={`text-xl ${colors.text.secondary} leading-relaxed`}>
                        {subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2">
                            {ctaText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className={`px-8 py-4 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200`}>
                            Watch Demo
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            <div className={`w-10 h-10 rounded-full bg-linear-to-br from-purple-300 to-pink-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                            <div className={`w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                            <div className={`w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                        </div>
                        <p className={`text-sm ${colors.text.tertiary}`}>{trustSignal}</p>
                    </div>
                </div>

                <div
                    className={`transition-all duration-1000 delay-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                        <div className={`relative ${colors.background.tertiary} backdrop-blur-xl border ${colors.border.primary} rounded-2xl p-8 shadow-2xl`}>
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="space-y-4 font-mono text-sm">
                                <div className="text-emerald-400">$ devflow init</div>
                                <div className={colors.text.secondary}>✓ Connected to GitHub</div>
                                <div className={colors.text.secondary}>✓ Indexed 247 documents</div>
                                <div className={colors.text.secondary}>✓ AI model deployed</div>
                                <div className="text-purple-400 animate-pulse">→ Ready to automate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};