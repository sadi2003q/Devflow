import {ChevronRight, Clock} from "lucide-react";
import React from "react";
import {getColors} from "@/app/lib/colors";
import {TASK} from "@/types/task.type";

type IUpcomingTask = {
    isVisible: boolean;
    isDarkMode: boolean;
    upcomingTasks: TASK[]
}


export const UpcomingTask_Section = (
    {isVisible, isDarkMode, upcomingTasks}: IUpcomingTask
) => {
    const colors = getColors(isDarkMode);
    return (
        <div
            className={`${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6 transition-all duration-300 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${colors.text.primary}`}>Today&#39;s / Upcoming
                    Tasks</h3>
                <Clock className={`w-5 h-5 ${colors.text.tertiary}`}/>
            </div>
            <div className="space-y-3">
                {upcomingTasks.map((task) => (
                    <div key={task.taskID}
                         className={`flex items-center gap-3 p-3 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.hover.border} transition-all duration-200`}>
                        <div className={`w-2 h-2 rounded-full shrink-0 ${
                            task.priority === 'high' ? 'bg-red-400' :
                                task.priority === 'medium' ? 'bg-yellow-400' : 'bg-emerald-400'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                            <p
                                className={`text-sm font-medium ${colors.text.primary} truncate`}
                                title={task.title}
                            >
                                {task.title}
                            </p>

                            <p className={`text-xs ${colors.text.tertiary} truncate`}>
                                {new Date(task.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>

                        </div>

                        <ChevronRight className={`w-4 h-4 ${colors.text.tertiary} shrink-0`}/>
                    </div>
                ))}
            </div>
        </div>
    );
}