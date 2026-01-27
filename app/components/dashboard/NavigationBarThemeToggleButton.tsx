import {Moon, Sun} from "lucide-react";
import React from "react";
import {getColors} from "@/lib/colors";

type INavigationBarThemeToggleButton = {
    isDarkMode: boolean;
    setIsDarkMode: (value: React.SetStateAction<boolean>) => void

}


export const NavigationBarThemeToggleButton = (
    {isDarkMode, setIsDarkMode}: INavigationBarThemeToggleButton
) => {

    const colors = getColors(isDarkMode)

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${colors.background.tertiary} border ${colors.border.primary} ${colors.hover.border} transition-all duration-200`}
        >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
        </button>
    );
}