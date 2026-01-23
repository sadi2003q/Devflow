"use client"

import React, {useState, useEffect} from 'react';
import {ArrowRight, Mail, Lock, Eye, EyeOff, Shield} from 'lucide-react';
import {SiGithub, SiGoogle} from 'react-icons/si';
import {FloatingParticles} from '../lib/FloatingParticle'
import {getColors} from '../components/signin/colors'
import {ThemeToggle} from "../components/landingPage/themeToggle";
import {SidebarHeading} from "@/app/components/signin/Sidebar-Heading";
import {BenefitList} from "@/app/components/signin/BenifitList";
import {TrustIndicator} from "@/app/components/signin/TrustIndicator";


export default function SignInPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colors = getColors(isDarkMode);

    useEffect(() => {

        const changeVisibility = () => {
            setIsVisible(true);
        }
        changeVisibility()

    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign in attempt:', {email, password});
    };

    return (
        <div className={`min-h-screen ${colors.background.gradient} relative overflow-hidden`}>
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

            <FloatingParticles/>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Branding & Benefits */}
                    <div
                        className={`space-y-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>


                        {/*   Heading    */}
                        <SidebarHeading isDarkMode={isDarkMode}/>

                        {/* Benefits List */}
                        <BenefitList isDarkMode={isDarkMode} isVisible={isVisible}/>

                        {/* Trust Indicators */}
                        <TrustIndicator isDarkMode={isDarkMode} isVisible={isVisible}/>
                    </div>

                    {/* Right Side - Sign-In Form */}
                    <div
                        className={`transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="relative">


                            {/* Form Card */}
                            <div
                                className={`relative ${colors.background.tertiary} backdrop-blur-xl border ${colors.border.primary} rounded-2xl p-8 shadow-2xl`}>

                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2 className={`text-3xl font-bold ${colors.text.primary} mb-2`}>Sign In</h2>
                                    <p className={`${colors.text.secondary}`}>
                                        Continue your productivity journey
                                    </p>
                                </div>

                                {/* OAuth Buttons */}
                                <div className="space-y-3 mb-6">
                                    <button
                                        className={`w-full px-6 py-3 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200 flex items-center justify-center gap-3`}>
                                        <SiGithub className="w-5 h-5"/>
                                        Continue with Github
                                    </button>

                                    <button
                                        className={`w-full px-6 py-3 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200 flex items-center justify-center gap-3`}>
                                        <SiGoogle className="w-5 h-5"/>
                                        Continue with Google
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="relative mb-6">
                                    <div className={`absolute inset-0 flex items-center`}>
                                        <div className={`w-full border-t ${colors.border.primary}`}></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                    <span className={`px-4 ${colors.background.tertiary} ${colors.text.tertiary}`}>
                      or continue with email
                    </span>
                                    </div>
                                </div>

                                {/* Email/Password Form */}
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
                                          "
                                    >
                                        Sign In
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1"/>
                                    </button>

                                </form>

                                {/* Signup Link */}
                                <p className={`text-center text-sm ${colors.text.secondary} mt-6`}>
                                    Don&#39;t have an account?{' '}
                                    <a href="/signup"
                                       className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
                                        Sign up for free
                                    </a>
                                </p>

                                {/* Security Badge */}
                                <div
                                    className={`flex items-center justify-center gap-2 mt-6 pt-6 border-t ${colors.border.primary}`}>
                                    <Shield className="w-4 h-4 text-emerald-400"/>
                                    <span className={`text-xs ${colors.text.tertiary}`}>
                    AES-256 encrypted • SOC2 Type II certified
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}