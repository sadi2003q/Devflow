"use client"

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Search, Plus, Clock, CheckCircle, Users, GitBranch, Calendar, Activity, ChevronRight, Settings, LogOut, Menu, X } from 'lucide-react';

// Centralized Color System
const COLORS = {
    dark: {
        background: {
            primary: 'bg-black',
            secondary: 'bg-zinc-950',
            tertiary: 'bg-white/5',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-400',
            tertiary: 'text-gray-500',
            accent: 'text-emerald-400',
        },
        border: {
            primary: 'border-white/10',
            secondary: 'border-white/20',
        },
        hover: {
            background: 'hover:bg-white/5',
            border: 'hover:border-emerald-500/50',
        },
    },
    light: {
        background: {
            primary: 'bg-white',
            secondary: 'bg-gray-50',
            tertiary: 'bg-black/5',
        },
        text: {
            primary: 'text-black',
            secondary: 'text-gray-600',
            tertiary: 'text-gray-500',
            accent: 'text-emerald-600',
        },
        border: {
            primary: 'border-black/10',
            secondary: 'border-black/20',
        },
        hover: {
            background: 'hover:bg-black/5',
            border: 'hover:border-emerald-500',
        },
    },
};

const getColors = (isDarkMode: boolean) => isDarkMode ? COLORS.dark : COLORS.light;

// Mock Data
const projects = [
    { id: 1, name: 'DevFlow Platform', description: 'AI-powered workflow automation', createdBy: 'Sarah Chen', status: 'active', progress: 75 },
    { id: 2, name: 'Mobile App Redesign', description: 'UI/UX modernization project', createdBy: 'Mike Johnson', status: 'active', progress: 45 },
    { id: 3, name: 'API Integration', description: 'Third-party service integration', createdBy: 'Alex Kumar', status: 'review', progress: 90 },
];

const upcomingTasks = [
    { id: 1, title: 'Review PR #234', time: '2 hours', priority: 'high' },
    { id: 2, title: 'Team standup meeting', time: '4 hours', priority: 'medium' },
    { id: 3, title: 'Deploy to staging', time: 'Tomorrow', priority: 'high' },
    { id: 4, title: 'Update documentation', time: 'Tomorrow', priority: 'low' },
];

const stats = [
    { label: 'Active Projects', value: '12', change: '+2', icon: <GitBranch className="w-5 h-5" />, color: 'emerald' },
    { label: 'Tasks Completed', value: '48', change: '+12', icon: <CheckCircle className="w-5 h-5" />, color: 'emerald' },
    { label: 'Team Members', value: '24', change: '+3', icon: <Users className="w-5 h-5" />, color: 'yellow' },
    { label: 'Avg Response Time', value: '2.4h', change: '-0.5h', icon: <Clock className="w-5 h-5" />, color: 'yellow' },
];

const CalendarGrid = ({ currentDate = 24 }) => {
    // Example month array with nulls at start
    const dates = [
        null, null, null, 1, 2, 3, 4,
        5, 6, 7, 8, 9, 10, 11,
        12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31
    ];

    return (
        <div className="grid grid-cols-7 gap-2">
            {dates.map((date, i) => (
                <div
                    key={i}
                    className={`
            aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200
            ${date === null ? "" : date === currentDate
                        ? "bg-emerald-400 text-black"
                        : "text-gray-700 hover:bg-gray-300 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700"}
          `}
                >
                    {date}
                </div>
            ))}
        </div>
    );
};

export default function Dashboard() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const colors = getColors(isDarkMode);

    useEffect(() => {
        const changeVisibility = () => {
            setIsVisible(true);
        }
        changeVisibility();
    }, []);

    return (
        <div className={`min-h-screen ${colors.background.primary}`}>
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-64 ${colors.background.secondary} border-r ${colors.border.primary} transform transition-transform duration-200 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="p-6 border-b border-white/10">
                    <h1 className={`text-2xl font-bold bg-linear-to-r from-emerald-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent`}>
                        DevFlow
                    </h1>
                </div>

                <nav className="p-4 space-y-2">
                    {[
                        { icon: <Activity className="w-5 h-5" />, label: 'Dashboard', active: true },
                        { icon: <GitBranch className="w-5 h-5" />, label: 'Projects' },
                        { icon: <CheckCircle className="w-5 h-5" />, label: 'Tasks' },
                        { icon: <Users className="w-5 h-5" />, label: 'Team' },
                        { icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                item.active
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                    : `${colors.text.secondary} ${colors.hover.background}`
                            }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-2">
                    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${colors.text.secondary} ${colors.hover.background} transition-all duration-200`}>
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </button>
                    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${colors.text.secondary} ${colors.hover.background} transition-all duration-200`}>
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Navigation Bar */}
                <nav className={`sticky top-0 z-20 ${colors.background.secondary} border-b ${colors.border.primary} backdrop-blur-xl bg-opacity-80`}>
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-white/5"
                            >
                                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>

                            <div className="relative">
                                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`} />
                                <input
                                    type="text"
                                    placeholder="Search projects, tasks..."
                                    className={`pl-10 pr-4 py-2 w-64 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.text.primary} placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all duration-200`}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`p-2 rounded-lg ${colors.background.tertiary} border ${colors.border.primary} ${colors.hover.border} transition-all duration-200`}
                            >
                                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
                            </button>

                            <button className={`relative p-2 rounded-lg ${colors.background.tertiary} border ${colors.border.primary} ${colors.hover.border} transition-all duration-200`}>
                                <Bell className={`w-5 h-5 ${colors.text.primary}`} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
                            </button>

                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-lime-400"></div>
                                <div className="hidden md:block">
                                    <p className={`text-sm font-semibold ${colors.text.primary}`}>Sarah Chen</p>
                                    <p className={`text-xs ${colors.text.tertiary}`}>Product Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Dashboard Content */}
                <main className="p-4 md:p-6">
                    {/* Header */}
                    <div className={`mb-6 md:mb-8 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <h2 className={`text-2xl md:text-3xl font-bold ${colors.text.primary} mb-2`}>Opening Dashboard</h2>
                        <p className={`text-sm md:text-base ${colors.text.secondary}`}>Welcome back! Here&#39;s what&#39;s happening with your projects today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 transition-all duration-300 delay-75 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {stats.map((stat, i) => (
                            <div key={i} className={`${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6 ${colors.hover.border} transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]`}>
                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-400/30 flex items-center justify-center text-${stat.color}-400`}>
                                        {stat.icon}
                                    </div>
                                    <span className={`text-xs md:text-sm font-semibold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <h3 className={`text-xl md:text-2xl font-bold ${colors.text.primary} mb-1`}>{stat.value}</h3>
                                <p className={`text-xs md:text-sm ${colors.text.tertiary}`}>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
                        {/* Projects Section */}
                        <div className={`lg:col-span-2 transition-all duration-300 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <div className={`${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6`}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                                    <h3 className={`text-xl font-bold ${colors.text.primary}`}>Active Projects</h3>
                                    <button className={`w-full sm:w-auto group px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                                        isDarkMode
                                            ? 'bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400 hover:text-black'
                                            : 'bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-500'
                                    }`}>
                                        <Plus className="w-4 h-4" />
                                        <span>New Project</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {projects.map((project) => (
                                        <div key={project.id} className={`${colors.background.tertiary} border ${colors.border.primary} rounded-lg p-4 ${colors.hover.border} transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]`}>
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                                <div className="flex-1">
                                                    <h4 className={`text-lg font-semibold ${colors.text.primary} mb-2`}>{project.name}</h4>
                                                    <p className={`text-sm ${colors.text.secondary} leading-relaxed`}>{project.description}</p>
                                                </div>
                                                <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                                                    project.status === 'active'
                                                        ? isDarkMode
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/30'
                                                            : 'bg-emerald-500 text-white border border-emerald-500'
                                                        : isDarkMode
                                                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-400/30'
                                                            : 'bg-yellow-500 text-white border border-yellow-500'
                                                }`}>
                                                    {project.status}
                                                </span>
                                            </div>

                                            <div className="pt-3 border-t border-white/10">
                                                <p className={`text-xs ${colors.text.tertiary}`}>Created by <span className={colors.text.secondary}>{project.createdBy}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-4 md:space-y-6">
                            {/* Calendar Widget */}
                            <div className={`${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6 transition-all duration-300 delay-125 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`text-lg font-bold ${colors.text.primary}`}>Calendar</h3>
                                    <Calendar className={`w-5 h-5 ${colors.text.tertiary}`} />
                                </div>
                                <div className={`rounded-lg p-4`}>
                                    {/* Calendar Header */}
                                    <div className={`text-center mb-4 pb-3 border-b ${colors.border.primary}`}>
                                        <div className={`text-lg font-bold ${colors.text.primary}`}>January 2026</div>
                                    </div>

                                    {/* Day Names */}
                                    <div className="grid grid-cols-7 gap-2 mb-3">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                            <div key={day} className={`text-center text-xs font-semibold ${colors.text.tertiary}`}>
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
                                                    : `${colors.text.secondary} hover:bg-${ isDarkMode ? ("white") : ("black") }/20 `
                                                }`}
                                            >
                                                {date}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Tasks */}
                            <div className={`${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6 transition-all duration-300 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`text-lg font-bold ${colors.text.primary}`}>Today&#39;s / Upcoming Tasks</h3>
                                    <Clock className={`w-5 h-5 ${colors.text.tertiary}`} />
                                </div>
                                <div className="space-y-3">
                                    {upcomingTasks.map((task) => (
                                        <div key={task.id} className={`flex items-center gap-3 p-3 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.hover.border} transition-all duration-200`}>
                                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                                task.priority === 'high' ? 'bg-red-400' :
                                                    task.priority === 'medium' ? 'bg-yellow-400' : 'bg-emerald-400'
                                            }`}></div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium ${colors.text.primary} truncate`}>{task.title}</p>
                                                <p className={`text-xs ${colors.text.tertiary}`}>{task.time}</p>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 ${colors.text.tertiary} flex-shrink-0`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Chart */}
                    <div className={`mt-4 md:mt-6 ${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-4 md:p-6 transition-all duration-300 delay-175 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <h3 className={`text-lg md:text-xl font-bold ${colors.text.primary}`}>Activity Overview</h3>
                            <div className="flex items-center gap-2">
                                <button className={`px-3 py-1 text-xs md:text-sm rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-400/30`}>Week</button>
                                <button className={`px-3 py-1 text-xs md:text-sm rounded-lg ${colors.text.tertiary}`}>Month</button>
                                <button className={`px-3 py-1 text-xs md:text-sm rounded-lg ${colors.text.tertiary}`}>Year</button>
                            </div>
                        </div>
                        <div className="h-48 md:h-64 flex items-end justify-between gap-2 md:gap-4">
                            {[40, 65, 45, 80, 55, 75, 60].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex flex-col justify-end h-full">
                                        <div
                                            className="w-full bg-linear-to-t from-emerald-400 to-lime-400 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                                            style={{ height: `${height}%` }}
                                        ></div>
                                    </div>
                                    <span className={`text-xs ${colors.text.tertiary}`}>
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}