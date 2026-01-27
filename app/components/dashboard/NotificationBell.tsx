import {Bell} from "lucide-react";
import React from "react";
import {getColors} from "@/lib/colors";

type INotificationBell = {
    isDarkMode: boolean;
}

export const NotificationBell = (
    {isDarkMode}: INotificationBell
) => {
    const colors = getColors(isDarkMode);
    return (
        <button className={`relative p-2 rounded-lg ${colors.background.tertiary} border ${colors.border.primary} ${colors.hover.border} transition-all duration-200`}>
            <Bell className={`w-5 h-5 ${colors.text.primary}`} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
        </button>
    );
}