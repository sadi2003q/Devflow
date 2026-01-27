import {Search} from "lucide-react";
import React from "react";
import {getColors} from "@/lib/colors";


type ISearchComponent = {
    isDarkMode: boolean;
}

export const SearchComponent = (
    {isDarkMode}: ISearchComponent
) => {

    const colors = getColors(isDarkMode);

    return (
        <div className="relative">
            <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`}/>
            <input
                type="text"
                placeholder="Search projects, tasks..."
                className={`
                    pl-10 pr-4 py-2
                    mx-1
                    px-1
                    w-40 sm:w-72 md:w-80 lg:w-96
                    ${colors.background.tertiary}
                    border ${colors.border.primary}
                    rounded-lg
                    ${colors.text.primary}
                    placeholder-gray-500
                    focus:outline-none focus:border-emerald-500/50
                    transition-all duration-200
                `}
            />

        </div>
    )
        ;
}