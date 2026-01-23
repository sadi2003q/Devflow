import React from "react";
import {getColors} from "./colors";

type ISignUpDivider = {
    isDarkMode: boolean;
}

export const SignUpDivider = (
    {isDarkMode}: ISignUpDivider
) => {
    const colors = getColors(isDarkMode);
    return (
        <div className="relative mb-6">
            <div className={`absolute inset-0 flex items-center`}>
                <div className={`w-full border-t ${colors.border.primary}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className={`px-4 ${colors.background.tertiary} ${colors.text.tertiary}`}>
                    or continue with email
                </span>
            </div>
        </div>
    );
}