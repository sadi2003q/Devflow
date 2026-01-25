"use client"

import React, {useState, useEffect} from 'react';
import {getColors} from "@/app/lib/colors";
import {PROJECT} from "@/types/project.type";
import {TASK} from "@/types/task.type";
import {p, upcomingTask} from "@/mock/dashboard";
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



export default function Dashboard() {

    // =============   STATE VARIABLES  =============
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);


    // =============   MOCK DATA   =============
    // FIXME: setState is not intialised for these variables
    const [projects,] = useState<PROJECT[]>(p)
    const [upcomingTasks,] = useState<TASK[]>(upcomingTask)


    // =============   MOCK DATA   =============
    const colors = getColors(isDarkMode);


    // =============   HOOK's   =============
    useEffect(() => {
        const changeVisibility = () => {
            setIsVisible(true);
        }
        changeVisibility();
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