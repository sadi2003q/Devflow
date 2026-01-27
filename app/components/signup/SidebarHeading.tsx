import React from "react";
import {getColors} from "@/lib/colors";

type ISidebarHeading = {
    isDarkMode: boolean;
}

export const SidebarHeader = (
    {isDarkMode}: ISidebarHeading
) => {

    const colors = getColors(isDarkMode);

    return (
        <div>
            <h1 className={`text-5xl md:text-6xl font-bold ${colors.text.primary} mb-4 leading-tight`}>
                Join
                <span
                    className="block bg-linear-to-r from-emerald-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
                                    DevFlow
                                </span>
            </h1>
            <p className={`text-xl ${colors.text.secondary} leading-relaxed`}>
                Create your account and start shipping code faster.
            </p>
        </div>
    );
}