import {ArrowRight, Eye, EyeOff, Lock, Mail} from "lucide-react";
import React from "react";
import {getColors} from "./colors";


type IFormSignIn = {

    isDarkMode: boolean;
    isSubmitting: boolean;
    email: string
    setEmail: (value: React.SetStateAction<string>) => void
    password: string
    setPassword: (value: React.SetStateAction<string>) => void
    showPassword: boolean,
    setShowPassword: (value: React.SetStateAction<boolean>) => void
    handleSubmit(
        e: React.FormEvent,
    ): void
}

export const FormSignIn = (
    {isDarkMode, isSubmitting, email, setEmail, password, setPassword, showPassword, setShowPassword, handleSubmit
    }: IFormSignIn
) => {

    const colors = getColors(isDarkMode);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
                <label className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
                    Email Address
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
                <label className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
                    Password
                </label>
                <div className="relative">
                    <Lock
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`}/>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pl-11 pr-12 py-3 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.text.primary} placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all`}
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox"
                           className="w-4 h-4 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500/20"/>
                    <span className={colors.text.secondary}>Remember me</span>
                </label>
                <a href="#"
                   className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
                    Forgot password?
                </a>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="
                                            group w-full px-6 py-3 mt-6
                                            rounded-lg border border-emerald-400
                                            text-emerald-400 font-semibold
                                            bg-emerald-400/10
                                            transition-all duration-300
                                            hover:bg-emerald-400
                                            hover:text-black
                                            hover:border-emerald-400

                                            flex items-center justify-center gap-2
                                            disabled:opacity-70 disabled:cursor-not-allowed
                                          "
            >
                {isSubmitting ? "Signing In..." : "Sign In"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1"/>
            </button>

        </form>
    )
}
