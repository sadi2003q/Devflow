import React from "react";
import {getColors} from "@/lib/colors";
import {CheckCircle, Clock, GitBranch, Users} from "lucide-react";

type IStartGrid = {
    isVisible: boolean;
    isDarkMode: boolean;

}

const stats = [
    {label: 'Active Projects', value: '12', change: '+2', icon: <GitBranch className="w-5 h-5"/>, color: 'emerald'},
    {label: 'Tasks Completed', value: '48', change: '+12', icon: <CheckCircle className="w-5 h-5"/>, color: 'emerald'},
    {label: 'Team Members', value: '24', change: '+3', icon: <Users className="w-5 h-5"/>, color: 'emerald'},
    {label: 'Avg Response Time', value: '2.4h', change: '-0.5h', icon: <Clock className="w-5 h-5"/>, color: 'emerald'},
];



export const StartGrid = (
    {isVisible, isDarkMode}: IStartGrid
) => {

    const colors = getColors(isDarkMode);

    return (
        <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 transition-all duration-300 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {stats.map((stat, i) => (
                <div key={i}
                     className={`${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6 ${colors.hover.border} transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]`}>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-400/30 flex items-center justify-center text-${stat.color}-400`}>
                            {stat.icon}
                        </div>
                        <span
                            className={`text-xs md:text-sm font-semibold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {stat.change}
                                    </span>
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold ${colors.text.primary} mb-1`}>{stat.value}</h3>
                    <p className={`text-xs md:text-sm ${colors.text.tertiary}`}>{stat.label}</p>
                </div>
            ))}
        </div>
    )
}
