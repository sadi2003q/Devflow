import { Menu, X } from "lucide-react";
import React from "react";

type ISidebarButton_Tab = {
    isDarkMode: boolean;
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarButton_Tab = ({
                                      isDarkMode,
                                      sidebarOpen,
                                      setSidebarOpen,
                                  }: ISidebarButton_Tab) => {
    return (
        <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`
                lg:hidden p-2 rounded-lg transition-colors
                ${isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-black/10 text-black"}
            `}
        >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
    );
};
