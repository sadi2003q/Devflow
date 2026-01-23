import {SiGithub, SiGoogle} from "react-icons/si";
import React from "react";
import {getColors} from "./colors";

type IAuthButtons = {
    isDarkMode: boolean;
}

export const AuthButtons = (
    {isDarkMode}: IAuthButtons
) => {
    const colors = getColors(isDarkMode);
    return (
        <div className="space-y-3 mb-6">
            <button
                className={`w-full px-6 py-3 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200 flex items-center justify-center gap-3`}>
                <SiGithub className="w-5 h-5"/>
                Continue with Github
            </button>

            <button
                className={`w-full px-6 py-3 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200 flex items-center justify-center gap-3`}>
                <SiGoogle className="w-5 h-5"/>
                Continue with Google
            </button>
        </div>
    );
}