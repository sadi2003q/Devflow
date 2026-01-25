import {p} from "@/mock/dashboard";
import React from "react";
import {getColors} from "@/app/lib/colors";

type IUserInformation = {
    isDarkMode: boolean;
}
export const UserInformation = (
    {isDarkMode}: IUserInformation
) => {

    const colors = getColors(isDarkMode);

    return (
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-lime-400"></div>
            <div className="hidden md:block">
                <p className={`text-sm font-semibold ${colors.text.primary}`}>Sarah Chen</p>
                <p className={`text-xs ${colors.text.tertiary}`}>Product Manager</p>
            </div>
        </div>
    );
}