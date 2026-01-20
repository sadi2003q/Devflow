

// ROI Calculator Component
import React, {useState} from "react";
import {getColors} from "@/app/components/landingPage/visual";
import {Clock, Zap} from "lucide-react";

interface ROICalculatorProps {
    headline: string;
    subheadline: string;
    isDarkMode: boolean;
}


export const ROICalculator: React.FC<ROICalculatorProps> = ({ headline, subheadline, isDarkMode }) => {
    const colors = getColors(isDarkMode);
    const [tickets, setTickets] = useState(100);
    const [resolutionTime, setResolutionTime] = useState(30);
    const [hourlyRate, setHourlyRate] = useState(50);

    const calculateSavings = () => {
        const hoursSaved = (tickets * resolutionTime * 0.6) / 60;
        const moneySaved = hoursSaved * hourlyRate;
        return { hoursSaved: Math.round(hoursSaved), moneySaved: Math.round(moneySaved) };
    };

    const { hoursSaved, moneySaved } = calculateSavings();

    return (
        <section className={`relative py-32 px-6 overflow-hidden ${colors.background.primary}`}>
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-6">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-semibold text-cyan-400">Interactive Calculator</span>
                    </div>
                    <h2 className={`text-4xl md:text-6xl font-bold text-center mb-4 ${colors.text.primary}`}>
                        {headline}
                    </h2>
                    <p className={`text-center ${colors.text.secondary} text-lg max-w-2xl mx-auto`}>
                        {subheadline}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Controls Panel */}
                    <div className="space-y-6">
                        {/* Ticket Slider */}
                        <div className={`group ${colors.background.tertiary} border ${colors.border.primary} rounded-2xl p-6 backdrop-blur-xl hover:border-cyan-400/50 transition-all duration-300`}>
                            <div className="flex items-center justify-between mb-4">
                                <label className={`text-sm font-semibold ${colors.text.secondary}`}>
                                    Monthly Support Tickets
                                </label>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
                                    <span className="text-2xl font-bold text-cyan-400">{tickets}</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="500"
                                value={tickets}
                                onChange={(e) => setTickets(Number(e.target.value))}
                                className={`w-full h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(6,182,212,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125`}
                            />
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-gray-500">10</span>
                                <span className="text-xs text-gray-500">500</span>
                            </div>
                        </div>

                        {/* Time Slider */}
                        <div className={`group ${colors.background.tertiary} border ${colors.border.primary} rounded-2xl p-6 backdrop-blur-xl hover:border-violet-400/50 transition-all duration-300`}>
                            <div className="flex items-center justify-between mb-4">
                                <label className={`text-sm font-semibold ${colors.text.secondary}`}>
                                    Avg. Resolution Time
                                </label>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 rounded-lg border border-violet-400/30">
                                    <span className="text-2xl font-bold text-violet-400">{resolutionTime}</span>
                                    <span className="text-sm text-violet-400">min</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="120"
                                value={resolutionTime}
                                onChange={(e) => setResolutionTime(Number(e.target.value))}
                                className={`w-full h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125`}
                            />
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-gray-500">5 min</span>
                                <span className="text-xs text-gray-500">120 min</span>
                            </div>
                        </div>

                        {/* Rate Slider */}
                        <div className={`group ${colors.background.tertiary} border ${colors.border.primary} rounded-2xl p-6 backdrop-blur-xl hover:border-pink-400/50 transition-all duration-300`}>
                            <div className="flex items-center justify-between mb-4">
                                <label className={`text-sm font-semibold ${colors.text.secondary}`}>
                                    Agent Hourly Rate
                                </label>
                                <div className="flex items-center gap-1 px-3 py-1.5 bg-pink-500/10 rounded-lg border border-pink-400/30">
                                    <span className="text-lg text-pink-400">$</span>
                                    <span className="text-2xl font-bold text-pink-400">{hourlyRate}</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="200"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(Number(e.target.value))}
                                className={`w-full h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(236,72,153,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125`}
                            />
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-gray-500">$20</span>
                                <span className="text-xs text-gray-500">$200</span>
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-linear-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>

                        <div className={`relative ${isDarkMode ? 'bg-linear-to-br from-zinc-900 to-zinc-950' : 'bg-linear-to-br from-white to-gray-50'} rounded-3xl p-8 border-2 ${isDarkMode ? 'border-cyan-400/20' : 'border-cyan-400/30'} shadow-2xl`}>
                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10 border border-cyan-400/30">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm font-semibold text-cyan-400">Your Potential Savings</span>
                                </div>

                                {/* Money Saved */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10 blur-xl"></div>
                                    <div className="relative">
                                        <p className={`text-sm ${colors.text.secondary} mb-2`}>Monthly Cost Reduction</p>
                                        <div className="flex items-start justify-center gap-1">
                                            <span className="text-4xl font-bold bg-linear-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">$</span>
                                            <span className="text-7xl md:text-8xl font-black bg-linear-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-none">
                          {moneySaved.toLocaleString()}
                        </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hours Saved */}
                                <div className={`grid grid-cols-2 gap-4 pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
                                        <p className="text-sm text-cyan-400 mb-1">Hours Saved</p>
                                        <p className="text-3xl font-bold text-cyan-400">{hoursSaved}h</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-400/30">
                                        <p className="text-sm text-violet-400 mb-1">Annual Savings</p>
                                        <p className="text-3xl font-bold text-violet-400">${(moneySaved * 12).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Bottom text */}
                                <p className={`text-sm ${colors.text.tertiary} pt-4`}>
                                    Based on 60% automation rate with DevFlow AI
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};