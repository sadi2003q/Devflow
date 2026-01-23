import React from "react";
import {getColors} from "@/app/lib/colors";

type IProgressBarProps = {
    isDarkMode: boolean;
    currentStep: number;
}
export const ProgressBar = (
    {isDarkMode, currentStep}: IProgressBarProps
) => {
    const colors = getColors(isDarkMode);
    return (
        <div className="relative mt-8 mb-4 mx-20">
            {/* Line connecting circles */}
            <div className={`absolute top-1/2 left-0 right-0 h-0.5 ${colors.border.primary} -translate-y-1/2`}></div>

            {/* Active progress line */}
            <div
                className="absolute top-1/2 left-0 h-0.5 bg-emerald-400 -translate-y-1/2 transition-all duration-500"
                style={{ width: currentStep === 1 ? '0%' : '50%' }}
            ></div>

            {/* Step circles */}
            <div className="relative flex justify-between items-center">
                {[1, 2].map((step) => (
                    <div
                        key={step}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                            currentStep >= step
                                ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400'
                                : `${colors.border.primary} ${colors.background.tertiary} ${colors.text.tertiary}`
                        }`}
                    >
                        {step}
                    </div>
                ))}
            </div>
        </div>
    );
}