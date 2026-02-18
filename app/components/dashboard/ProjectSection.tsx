import {Plus} from "lucide-react";
import React from "react";
import {PROJECT} from "@/types/project.type";
import {getColors} from "@/lib/colors";


type IProjectSection = {
    isVisible: boolean;
    isDarkMode: boolean;
    projects: PROJECT[]
}

export const ProjectSection = (
    {isVisible, isDarkMode, projects}: IProjectSection
) => {

    const colors = getColors(isDarkMode);

    return (
        <div
            className={`lg:col-span-2 transition-all duration-300 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div
                className={`${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6`}>
                <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h3 className={`text-xl font-bold ${colors.text.primary}`}>Active Projects</h3>
                    <button
                        className={`w-full sm:w-auto group px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                            isDarkMode
                                ? 'bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400 hover:text-black'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-500'
                        }`}>
                        <Plus className="w-4 h-4"/>
                        <span>New Project</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {projects.map((project) => (
                        <div key={project.id}
                             className={`${colors.background.tertiary} border ${colors.border.primary} rounded-lg p-4 ${colors.hover.border} transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]`}>
                            <div
                                className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                <div className="flex-1">
                                    <h4 className={`text-lg font-semibold ${colors.text.primary} mb-2`}>{project.name}</h4>
                                    <p className={`text-sm ${colors.text.secondary} leading-relaxed`}>{project.description}</p>
                                </div>

                            </div>

                            <div className="pt-3 border-t border-white/10">
                                <p className={`text-xs ${colors.text.tertiary}`}>Created by <span
                                    className={colors.text.secondary}>{project.createdBy}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
