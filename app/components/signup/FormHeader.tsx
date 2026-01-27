import React from "react";
import {getColors} from "@/lib/colors";
import {ProgressBar} from "@/app/components/signup/ProgressBar";


type IFormHeader = {
    isDarkMode: boolean;
    currentStep: number;
}

export const FormHeader = (
    {isDarkMode, currentStep}: IFormHeader
) => {

    const colors = getColors(isDarkMode);

    return (
        <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${colors.text.primary} mb-2`}>Create Account</h2>
            <p className={`${colors.text.secondary}`}>
                Step {currentStep} of 2 - {currentStep === 1 ? 'Basic Info' : 'Profile Setup'}
            </p>

            {/* Progress Bar */}
            <ProgressBar isDarkMode={isDarkMode} currentStep={currentStep}/>
        </div>
    );
}