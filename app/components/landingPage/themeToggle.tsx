


// Theme Toggle Button Component
import React from "react";
import {getColors} from "@/app/components/landingPage/visual";
import {Moon, Sun} from "lucide-react";

interface ThemeToggleProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, setIsDarkMode }) => {
    const colors = getColors(isDarkMode);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`fixed top-6 right-6 z-50 p-3 rounded-lg backdrop-blur-md ${colors.background.tertiary} ${colors.border.primary} border ${colors.hover.border} transition-all duration-200 hover:scale-105`}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
            ) : (
                <Moon className="w-5 h-5 text-purple-600" />
            )}
        </button>
    );
};