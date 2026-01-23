import React from "react";
import {getColors} from "./colors";

type IFormHeader = {
    isDarkMode: boolean;
}

export const FormHeader = ({
    isDarkMode,
                           }: IFormHeader) => {
    const colors = getColors(isDarkMode);
    return (
        <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${colors.text.primary} mb-2`}>Sign In</h2>
            <p className={`${colors.text.secondary}`}>
                Continue your productivity journey
            </p>
        </div>
    );
}