import React from "react";
import {getColors} from "@/lib/colors";

type IWelcomeBoard = {
    isVisible: boolean;
    isDarkMode: boolean;
}

export const WelcomeBoard = (
    {isVisible, isDarkMode}: IWelcomeBoard
) => {
    const colors = getColors(isDarkMode);
    return (
        <div
            className={`mb-6 md:mb-8 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className={`text-2xl md:text-3xl font-bold ${colors.text.primary} mb-2`}>Opening
                Dashboard</h2>
            <p className={`text-sm md:text-base ${colors.text.secondary}`}>Welcome back! Here&#39;s
                what&#39;s happening with your projects today.</p>
        </div>
    );
}
