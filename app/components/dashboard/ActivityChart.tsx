import React from "react";
import {getColors} from "@/app/lib/colors";

type IActivityChart = {
    isVisible: boolean;
    isDarkMode: boolean;
}

export const ActivityChart = (
    {isVisible, isDarkMode}: IActivityChart,
) => {

    const colors = getColors(isDarkMode);

    return (
        <div
            className={`mt-4 md:mt-6 ${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6 transition-all duration-300 delay-175 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className={`text-lg md:text-xl font-bold ${colors.text.primary}`}>Activity Overview</h3>
                <div className="flex items-center gap-2">
                    <button
                        className={`px-3 py-1 text-xs md:text-sm rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-400/30`}>Week
                    </button>
                    <button
                        className={`px-3 py-1 text-xs md:text-sm rounded-lg ${colors.text.tertiary}`}>Month
                    </button>
                    <button
                        className={`px-3 py-1 text-xs md:text-sm rounded-lg ${colors.text.tertiary}`}>Year
                    </button>
                </div>
            </div>
            <div className="h-48 md:h-64 flex items-end justify-between gap-2 md:gap-4">
                {[40, 65, 45, 80, 55, 75, 60].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex flex-col justify-end h-full">
                            <div
                                className="w-full bg-linear-to-t from-emerald-400 to-lime-400 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                                style={{height: `${height}%`}}
                            ></div>
                        </div>
                        <span className={`text-xs ${colors.text.tertiary}`}>
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                    </span>
                    </div>
                ))}
            </div>
        </div>
    )
}