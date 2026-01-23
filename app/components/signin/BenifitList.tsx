import {Check, Shield, Zap} from "lucide-react";
import React from "react";
import {getColors} from "./colors";


type IBenefitList = {
    isDarkMode: boolean;
    isVisible: boolean;
}


export const BenefitList = (
    {
        isDarkMode,
        isVisible,
    }: IBenefitList
) => {

    const colors = getColors(isDarkMode);

    return (
        <div className="space-y-4">
            {[
                {
                    icon: <Zap className="w-5 h-5"/>,
                    text: "60% faster issue resolution",
                    color: "emerald"
                },
                {
                    icon: <Shield className="w-5 h-5"/>,
                    text: "SOC2 compliant & encrypted",
                    color: "lime"
                },
                {icon: <Check className="w-5 h-5"/>, text: "2-minute GitHub sync", color: "yellow"}
            ].map((benefit, i) => (
                <div
                    key={i}
                    className={`flex items-center gap-3 transition-all duration-700 delay-${(i + 1) * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                >
                    <div
                        className={`w-10 h-10 rounded-lg bg-${benefit.color}-500/10 border border-${benefit.color}-400/30 flex items-center justify-center text-${benefit.color}-400`}>
                        {benefit.icon}
                    </div>
                    <span className={`${colors.text.secondary} font-medium`}>{benefit.text}</span>
                </div>
            ))}
        </div>
    )
}
