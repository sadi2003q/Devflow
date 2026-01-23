import {Shield} from "lucide-react";
import React from "react";
import {getColors} from "./colors";

type ISecurityBadge = {
    isDarkMode: boolean;
}

export const SecurityBadge = (
    {isDarkMode}: ISecurityBadge
) => {
    const colors = getColors(isDarkMode);
    return (
        <div
            className={`flex items-center justify-center gap-2 mt-6 pt-6 border-t ${colors.border.primary}`}>
            <Shield className="w-4 h-4 text-emerald-400"/>
            <span className={`text-xs ${colors.text.tertiary}`}>
                                        AES-256 encrypted • SOC2 Type II certified
                                    </span>
        </div>
    );
}