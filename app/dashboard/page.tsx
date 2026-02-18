"use client"

import React, {useState, useEffect} from 'react';
import {getColors} from "@/lib/colors";
import {PROJECT} from "@/types/project.type";
import {STATUS, TASK} from "@/types/task.type";
import {PRIORITIES} from "@/types/subtask.type";
import {Heading} from "@/app/components/dashboard/Heading";
import {AdditionalLinks} from "@/app/components/dashboard/AdditioinalLinks";
import {SidebarButton_Mobile} from "@/app/components/dashboard/SidebarButton_Mobile";
import {UserInformation} from "@/app/components/dashboard/UserInformation";
import {NotificationBell} from "@/app/components/dashboard/NotificationBell";
import {NavigationBarThemeToggleButton} from "@/app/components/dashboard/NavigationBarThemeToggleButton";
import {SearchComponent} from "@/app/components/dashboard/SearchComponent";
import {SidebarButton_Tab} from "@/app/components/dashboard/SidebarButton_Tab";
import {StartGrid} from "@/app/components/dashboard/StartGrid";
import {ProjectSection} from "@/app/components/dashboard/ProjectSection";
import {CalendarWidget} from "@/app/components/dashboard/CalendarWidget";
import {UpcomingTask_Section} from "@/app/components/dashboard/UpcomingTask";
import {ActivityChart} from "@/app/components/dashboard/ActivityChart";
import {WelcomeBoard} from "@/app/components/dashboard/WelcomeBoard";
import axios from "axios";
import {toast} from "react-hot-toast";



export default function Dashboard() {

    // =============   STATE VARIABLES  =============
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [loadingError, setLoadingError] = useState("");


    const [projects, setProjects] = useState<PROJECT[]>([])
    const [upcomingTasks, setUpcomingTasks] = useState<TASK[]>([])
    const colors = getColors(isDarkMode);


    // =============   HOOK's   =============
    useEffect(() => {
        const changeVisibility = () => {
            setIsVisible(true);
        }
        changeVisibility();
    }, []);

    useEffect(() => {
        const normalizeProjects = (rawProjects: unknown[]): PROJECT[] => {
            return rawProjects.map((project) => {
                const typedProject = project as Record<string, unknown>;
                return {
                    id: String(typedProject.id ?? ""),
                    name: String(typedProject.name ?? ""),
                    description: String(typedProject.description ?? ""),
                    createdBy: String(typedProject.createdBy ?? ""),
                    createdAt: new Date(String(typedProject.createdAt ?? Date.now())),
                    githubRepo: String(typedProject.githubRepo ?? ""),
                    ownerId: String(typedProject.ownerId ?? ""),
                    managerId: String(typedProject.managerId ?? ""),
                    teamMembers: Array.isArray(typedProject.teamMembers)
                        ? typedProject.teamMembers.map((member) => String(member))
                        : [],
                    completionDate: new Date(String(typedProject.completionDate ?? Date.now())),
                };
            });
        };

        const normalizeTasks = (rawTasks: unknown[]): TASK[] => {
            return rawTasks.map((task) => {
                const typedTask = task as Record<string, unknown>;
                return {
                    projectId: String(typedTask.projectId ?? ""),
                    taskId: String(typedTask.taskId ?? ""),
                    title: String(typedTask.title ?? ""),
                    content: String(typedTask.content ?? ""),
                    createdAt: new Date(String(typedTask.createdAt ?? Date.now())),
                    submissionDate: new Date(String(typedTask.submissionDate ?? Date.now())),
                    createdBy: String(typedTask.createdBy ?? ""),
                    assignedTo: Array.isArray(typedTask.assignedTo)
                        ? typedTask.assignedTo.map((member) => String(member))
                        : [],
                    tag: String(typedTask.tag ?? ""),
                    priority:
                        typedTask.priority === PRIORITIES.High
                            ? PRIORITIES.High
                            : typedTask.priority === PRIORITIES.Low
                                ? PRIORITIES.Low
                                : PRIORITIES.Medium,
                    status:
                        typedTask.status === STATUS.DONE
                            ? STATUS.DONE
                            : typedTask.status === STATUS.IN_PROGRESS
                                ? STATUS.IN_PROGRESS
                                : STATUS.TODO,
                    isComplete: Boolean(typedTask.isComplete),
                    workQuality:
                        typeof typedTask.workQuality === "number" || typedTask.workQuality === null
                            ? typedTask.workQuality
                            : null,
                };
            });
        };

        const fetchDashboardData = async () => {
            try {
                setIsLoadingData(true);
                setLoadingError("");

                const [projectsResponse, tasksResponse] = await Promise.all([
                    axios.get("/api/projects"),
                    axios.get("/api/tasks?upcoming=true"),
                ]);

                setProjects(normalizeProjects(projectsResponse.data.projects ?? []));
                setUpcomingTasks(normalizeTasks(tasksResponse.data.tasks ?? []));
            } catch (error) {
                setLoadingError("Failed to load dashboard data.");
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.error ?? "Failed to load dashboard data.");
                } else {
                    toast.error("Failed to load dashboard data.");
                }
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className={`min-h-screen ${colors.background.primary}`}>
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 ${colors.background.secondary} border-r ${colors.border.primary} transform transition-transform duration-200 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <Heading/>


                {/*   Navigation Bar  */}
                <AdditionalLinks isDarkMode={isDarkMode}/>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && <SidebarButton_Mobile setSidebarOpen={setSidebarOpen}/> }

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Navigation Bar */}
                <nav
                    className={`sticky top-0 z-20 ${colors.background.secondary} border-b ${colors.border.primary} backdrop-blur-xl bg-opacity-80`}>
                    <div className="px-6 py-4 flex items-center justify-between">
                            <SidebarButton_Tab
                                isDarkMode={isDarkMode}
                                sidebarOpen={sidebarOpen}
                                setSidebarOpen={setSidebarOpen}/>

                            <SearchComponent isDarkMode={isDarkMode}/>

                        {/*   navigation bar items  */}
                        <div className="flex items-center gap-4">

                            <NavigationBarThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

                            <NotificationBell isDarkMode={isDarkMode}/>

                            <UserInformation isDarkMode={isDarkMode}/>


                        </div>
                    </div>
                </nav>

                {/* Dashboard Content */}
                <main className="p-4 md:p-6">
                    {/* Header */}
                    <WelcomeBoard isVisible={isVisible} isDarkMode={isDarkMode}/>

                    {/* Stats Grid */}
                    <StartGrid isDarkMode={isDarkMode} isVisible={isVisible}/>

                    {isLoadingData && (
                        <p className={`mb-4 text-sm ${colors.text.tertiary}`}>Loading dashboard data...</p>
                    )}
                    {loadingError && (
                        <p className="mb-4 text-sm text-red-400">{loadingError}</p>
                    )}

                    <div className="grid lg:grid-cols-3 gap-4 md:gap-6">

                        {/* Projects Section */}
                        <ProjectSection projects={projects} isVisible={isVisible} isDarkMode={isDarkMode}/>






                        {/* Right Sidebar */}
                        <div className="space-y-4 md:space-y-6">
                            {/* Calendar Widget */}
                            <CalendarWidget isDarkMode={isDarkMode} isVisible={isVisible}/>

                            {/* Upcoming Tasks */}
                            <UpcomingTask_Section upcomingTasks={upcomingTasks} isVisible={isVisible} isDarkMode={isDarkMode}/>
                        </div>
                    </div>

                    {/* Activity Chart */}
                    <ActivityChart isVisible={isVisible} isDarkMode={isDarkMode}/>

                </main>
            </div>
        </div>
    );
}
