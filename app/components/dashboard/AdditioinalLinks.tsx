import {Activity, Calendar, CheckCircle, GitBranch, LogOut, Settings, Users} from "lucide-react";
import React from "react";
import {getColors} from "@/app/lib/colors";

type IAdditionalLinks = {
    isDarkMode: boolean;
}

export const AdditionalLinks = (
    {isDarkMode}: IAdditionalLinks
) => {

    const colors = getColors(isDarkMode);

    return (
        <>
            <nav className="p-4 space-y-2">
                {[
                    { icon: <Activity className="w-5 h-5" />, label: 'Dashboard', active: true },
                    { icon: <GitBranch className="w-5 h-5" />, label: 'Projects' },
                    { icon: <CheckCircle className="w-5 h-5" />, label: 'Tasks' },
                    { icon: <Users className="w-5 h-5" />, label: 'Team' },
                    { icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
                ].map((item, i) => (
                    <button
                        key={i}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                            item.active
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : `${colors.text.secondary} ${colors.hover.background}`
                        }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-2">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${colors.text.secondary} ${colors.hover.background} transition-all duration-200`}>
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${colors.text.secondary} ${colors.hover.background} transition-all duration-200`}>
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </>
    );
}