import {ArrowRight, Eye, EyeOff, Mail, User} from "lucide-react";
import React from "react";
import {getColors} from "@/lib/colors";

type IFrom_step01 = {
    isDarkMode: boolean;
    fullName: string
    setFullName: (value: React.SetStateAction<string>) => void
    email: string
    setEmail: (value: React.SetStateAction<string>) => void
    password: string
    setPassword: (value: React.SetStateAction<string>) => void
    showPassword: boolean,
    setShowPassword: (value: React.SetStateAction<boolean>) => void
    nextStep: () => void
}



export const From_step01 = (
    {isDarkMode, fullName, setFullName, email, setEmail, password, setPassword, showPassword, setShowPassword, nextStep}: IFrom_step01
) => {
    const colors = getColors(isDarkMode);
    return (
        <div className="space-y-4">
            {/* Full Name Input */}
            <div>
                <label
                    className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
                    Full Name *
                </label>
                <div className="relative">
                    <User
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`}/>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full pl-11 pr-4 py-3 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.text.primary} placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all`}
                        required
                    />
                </div>
            </div>

            {/* Email Input */}
            <div>
                <label
                    className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
                    Email Address *
                </label>
                <div className="relative">
                    <Mail
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`}/>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className={`w-full pl-11 pr-4 py-3 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.text.primary} placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all`}
                        required
                    />
                </div>
            </div>

            {/* Password Input */}
            <div>
                <label
                    className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
                    Password *
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pl-4 pr-12 py-3 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.text.primary} placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all`}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${colors.text.tertiary} hover:text-emerald-400 transition-colors`}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5"/> :
                            <Eye className="w-5 h-5"/>}
                    </button>
                </div>
            </div>

            {/* Next Button */}
            <button
                onClick={nextStep}
                disabled={!fullName || !email || !password}
                className="
        group w-full px-6 py-3 mt-6
        rounded-lg border border-emerald-400
        text-emerald-400 font-semibold
        bg-emerald-400/10
        transition-all duration-300
        hover:bg-emerald-400
        hover:text-black
        hover:border-emerald-400
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-emerald-400/10
        disabled:hover:text-emerald-400
        flex items-center justify-center gap-2
        "
            >
                Continue
                <ArrowRight
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"/>
            </button>
        </div>
    );
}