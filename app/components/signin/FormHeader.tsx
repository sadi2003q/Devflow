import React from "react";
import {getColors} from "./colors";

type IFormHeader = {
    isDarkMode: boolean;
    Heading?: string,
    subHeading?: string
}

export const FormHeader = (
    {isDarkMode, Heading="Sign In", subHeading="Continue your productivity journey"
    }: IFormHeader) => {
    const colors = getColors(isDarkMode);
    return (
        <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${colors.text.primary} mb-2`}>{Heading}</h2>
            <p className={`${colors.text.secondary}`}>
                {subHeading}
            </p>
        </div>
    );
}