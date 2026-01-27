import {Calendar} from "lucide-react";
import {monthYear} from "@/lib/constants";
import React from "react";
import {getColors} from "@/lib/colors";

type ICalendarWidget = {
    isVisible: boolean;
    isDarkMode: boolean;
}

export const CalendarWidget = (
    {isVisible, isDarkMode}: ICalendarWidget
) => {
    const colors = getColors(isDarkMode)
    return (
        <div
            className={`${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6 transition-all duration-300 delay-125 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${colors.text.primary}`}>Calendar</h3>
                <Calendar className={`w-5 h-5 ${colors.text.tertiary}`}/>
            </div>
            <div className={`rounded-lg p-4`}>
                {/* Calendar Header */}
                <div className={`text-center mb-4 pb-3 border-b ${colors.border.primary}`}>
                    <div className={`text-lg font-bold ${colors.text.primary}`}>{monthYear}</div>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day}
                             className={`text-center text-xs font-semibold ${colors.text.tertiary}`}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Dates */}
                <div className="grid grid-cols-7 gap-2">
                    {[
                        null, null, null, 1, 2, 3, 4,
                        5, 6, 7, 8, 9, 10, 11,
                        12, 13, 14, 15, 16, 17, 18,
                        19, 20, 21, 22, 23, 24, 25,
                        26, 27, 28, 29, 30, 31
                    ].map((date, i) => (
                        <div
                            key={i}
                            className={`
                                                    cursor-pointer aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                                                    transition-transform duration-200
                                                    ${date === new Date().getDate()
                                ? "bg-emerald-400 text-black hover:scale-110"
                                : `${colors.text.secondary} hover:bg-${isDarkMode ? ("white") : ("black")}/20 `
                            }`}
                        >
                            {date}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );


}