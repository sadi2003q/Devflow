// Final CTA Section Component
import {getColors} from "@/app/components/landingPage/visual";
import {ArrowRight, Check, Zap} from "lucide-react";
import {SiGithub} from "react-icons/si";
import React from "react";

interface CTASectionProps {
    headline: string;
    subheadline: string;
    buttonText: string;
    microcopy: string;
    isDarkMode: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({ headline, subheadline, buttonText, microcopy, isDarkMode }) => {
    const colors = getColors(isDarkMode);

    return (
        <section className={`relative py-32 px-6 overflow-hidden ${colors.background.primary}`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-linear-to-r from-emerald-400/30 to-lime-400/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-linear-to-l from-orange-400/30 to-yellow-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-br from-emerald-300/20 via-lime-300/20 to-yellow-300/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/10 via-lime-500/10 to-yellow-500/10 border border-emerald-400/30 mb-8">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-semibold bg-linear-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Limited Time Offer
              </span>
                    </div>

                    <h2 className={`text-5xl md:text-7xl font-black ${colors.text.primary} mb-6 leading-tight`}>
              <span className="bg-linear-to-r from-emerald-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
                {headline}
              </span>
                    </h2>

                    <p className={`text-xl md:text-2xl ${colors.text.secondary} mb-12 max-w-2xl mx-auto`}>
                        {subheadline}
                    </p>
                </div>

                {/* CTA Card */}
                <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 via-lime-500 to-yellow-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                    <div className={`relative ${isDarkMode ? 'bg-zinc-900/90' : 'bg-white/90'} backdrop-blur-xl rounded-3xl p-8 md:p-12 border ${isDarkMode ? 'border-emerald-500/20' : 'border-emerald-400/30'}`}>
                        <div className="flex flex-col items-center gap-6">
                            {/* Main CTA Button */}
                            <button className="group/btn relative px-10 py-5 bg-linear-to-r from-emerald-500 via-lime-500 to-yellow-500 text-black text-lg md:text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 w-full md:w-auto overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-r from-yellow-500 via-lime-500 to-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                <SiGithub className="w-6 h-6 relative z-10" />
                                <span className="relative z-10">{buttonText}</span>
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                            </button>

                            {/* Trust signals */}
                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className={colors.text.secondary}>No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className={colors.text.secondary}>2-minute setup</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className={colors.text.secondary}>14-day free trial</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 mt-6 w-full max-w-2xl">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">5K+</div>
                                    <div className={`text-sm ${colors.text.secondary} mt-1`}>Developers</div>
                                </div>
                                <div className="text-center border-l border-r border-emerald-500/20">
                                    <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-lime-400 to-yellow-400 bg-clip-text text-transparent">60%</div>
                                    <div className={`text-sm ${colors.text.secondary} mt-1`}>Time Saved</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">24/7</div>
                                    <div className={`text-sm ${colors.text.secondary} mt-1`}>AI Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom microcopy */}
                <p className={`text-center text-sm ${colors.text.tertiary} mt-8`}>
                    {microcopy}
                </p>
            </div>
        </section>
    );
};
