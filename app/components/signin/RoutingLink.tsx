import React from "react";
import {getColors} from "./colors"

type IRoutingLink = {
    isDarkMode: boolean;
    link?: string;
}

export const RoutingLink = (
    {isDarkMode, link="/signup"}: IRoutingLink

) => {
    const colors = getColors(isDarkMode);
    return (
        <p className={`text-center text-sm ${colors.text.secondary} mt-6`}>
            Don&#39;t have an account?{' '}
            <a href={link}
               className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
                Sign up for free
            </a>
        </p>
    );
}