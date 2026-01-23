import React from "react";
import {getColors} from "@/app/lib/colors";

type ITrustIndicatorProps = {
    isDarkMode: boolean;
    isVisible: boolean;
}

export const TrustIndicator = (
    {isVisible, isDarkMode}: ITrustIndicatorProps
) => {
    const colors = getColors(isDarkMode)
    return (
        <div
            className={`flex items-center gap-4 pt-6 transition-all duration-300 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex -space-x-2">
                <div
                    className={`w-10 h-10 rounded-full bg-linear-to-br from-purple-300 to-pink-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                <div
                    className={`w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                <div
                    className={`w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
            </div>
            <p className={`text-sm ${colors.text.tertiary}`}>
                Join 5,000+ developers worldwide
            </p>
        </div>
    );
}