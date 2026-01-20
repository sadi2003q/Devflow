// Problem Card Component
import React from "react";
import {getColors} from "@/app/components/landingPage/visual";

interface ProblemCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    isDarkMode: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, icon, isDarkMode }) => {
    const colors = getColors(isDarkMode);

    return (
        <div className={`group relative ${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-8 ${colors.hover.border} transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]`}>
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            <div className="relative">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                    {icon}
                </div>
                <h3 className={`text-2xl font-bold ${colors.text.primary} mb-3`}>{title}</h3>
                <p className={`${colors.text.secondary} leading-relaxed`}>{description}</p>
            </div>
        </div>
    );
};