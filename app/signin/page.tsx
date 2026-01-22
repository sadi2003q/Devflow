"use client"

import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, Mail, Lock, Eye, EyeOff, Zap, Shield, Check } from 'lucide-react';
import { SiGithub, SiGoogle } from 'react-icons/si';

// Centralized Color System (matching landing page)
const COLORS = {
    dark: {
        background: {
            primary: 'bg-black',
            secondary: 'bg-zinc-950',
            tertiary: 'bg-white/5',
            gradient: 'bg-gradient-to-br from-black via-emerald-950/20 to-black',
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
            accent: 'border-emerald-500/50',
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
            gradient: 'bg-gradient-to-br from-white via-emerald-50 to-white',
        },
        text: {
            primary: 'text-black',
            secondary: 'text-gray-600',
            tertiary: 'text-gray-600',
            accent: 'text-emerald-600',
        },
        border: {
            primary: 'border-black/10',
            secondary: 'border-black/20',
            accent: 'border-emerald-500/30',
        },
        hover: {
            background: 'hover:bg-black/5',
            border: 'hover:border-emerald-500',
        },
    },
};

const getColors = (isDarkMode: boolean) => isDarkMode ? COLORS.dark : COLORS.light;

// Theme Toggle Button
interface ThemeToggleProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, setIsDarkMode }) => {
    const colors = getColors(isDarkMode);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`fixed top-6 right-6 z-50 p-3 rounded-lg backdrop-blur-md ${colors.background.tertiary} ${colors.border.primary} border ${colors.hover.border} transition-all duration-200 hover:scale-105`}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
            ) : (
                <Moon className="w-5 h-5 text-purple-600" />
            )}
        </button>
    );
};

// Floating Particles Component
const FloatingParticles: React.FC = () => {
    const particles = [
        { left: '10%', top: '20%', duration: '3.5s', delay: '0.5s', color: 'bg-emerald-400/40' },
        { left: '30%', top: '50%', duration: '4s', delay: '1s', color: 'bg-lime-400/40' },
        { left: '60%', top: '10%', duration: '3.2s', delay: '0.8s', color: 'bg-yellow-400/40' },
        { left: '80%', top: '70%', duration: '4.1s', delay: '1.2s', color: 'bg-emerald-400/40' },
        { left: '50%', top: '40%', duration: '3.8s', delay: '0.3s', color: 'bg-lime-400/40' },
        { left: '20%', top: '80%', duration: '4.5s', delay: '0.7s', color: 'bg-orange-400/40' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${p.color}`}
                    style={{
                        left: p.left,
                        top: p.top,
                        animation: `float ${p.duration} ease-in-out infinite`,
                        animationDelay: p.delay,
                    }}
                ></div>
            ))}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
        </div>
    );
};

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
        console.log('Sign in attempt:', { email, password });
    };

    return (
        <div className={`min-h-screen ${colors.background.gradient} relative overflow-hidden`}>
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            <FloatingParticles />

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Branding & Benefits */}
                    <div className={`space-y-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div>
                            <h1 className={`text-5xl md:text-6xl font-bold ${colors.text.primary} mb-4 leading-tight`}>
                                Welcome to
                                <span className="block bg-linear-to-r from-emerald-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
                  DevFlow
                </span>
                            </h1>
                            <p className={`text-xl ${colors.text.secondary} leading-relaxed`}>
                                Stop chasing updates. Start shipping code.
                            </p>
                        </div>

                        {/* Benefits List */}
                        <div className="space-y-4">
                            {[
                                { icon: <Zap className="w-5 h-5" />, text: "60% faster issue resolution", color: "emerald" },
                                { icon: <Shield className="w-5 h-5" />, text: "SOC2 compliant & encrypted", color: "lime" },
                                { icon: <Check className="w-5 h-5" />, text: "2-minute GitHub sync", color: "yellow" }
                            ].map((benefit, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 transition-all duration-700 delay-${(i + 1) * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                                >
                                    <div className={`w-10 h-10 rounded-lg bg-${benefit.color}-500/10 border border-${benefit.color}-400/30 flex items-center justify-center text-${benefit.color}-400`}>
                                        {benefit.icon}
                                    </div>
                                    <span className={`${colors.text.secondary} font-medium`}>{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Trust Indicators */}
                        <div className={`flex items-center gap-4 pt-6 transition-all duration-500 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="flex -space-x-2">
                                <div className={`w-10 h-10 rounded-full bg-linear-to-br from-purple-300 to-pink-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                                <div className={`w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                                <div className={`w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                            </div>
                            <p className={`text-sm ${colors.text.tertiary}`}>
                                Trusted by 5,000+ developers worldwide
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Sign-In Form */}
                    <div className={`transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="relative">


                            {/* Form Card */}
                            <div className={`relative ${colors.background.tertiary} backdrop-blur-xl border ${colors.border.primary} rounded-2xl p-8 shadow-2xl`}>

                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2 className={`text-3xl font-bold ${colors.text.primary} mb-2`}>Sign In</h2>
                                    <p className={`${colors.text.secondary}`}>
                                        Continue your productivity journey
                                    </p>
                                </div>

                                {/* OAuth Buttons */}
                                <div className="space-y-3 mb-6">
                                    <button className={`w-full px-6 py-3 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200 flex items-center justify-center gap-3`}>
                                        <SiGithub className="w-5 h-5" />
                                        Continue with Github
                                    </button>

                                    <button className={`w-full px-6 py-3 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200 flex items-center justify-center gap-3`}>
                                        <SiGoogle className="w-5 h-5" />
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
                                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`} />
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
                                            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`} />
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
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500/20" />
                                            <span className={colors.text.secondary}>Remember me</span>
                                        </label>
                                        <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
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
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </button>

                                </form>

                                {/* Signup Link */}
                                <p className={`text-center text-sm ${colors.text.secondary} mt-6`}>
                                    Don&#39;t have an account?{' '}
                                    <a href="/signup" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
                                        Sign up for free
                                    </a>
                                </p>

                                {/* Security Badge */}
                                <div className={`flex items-center justify-center gap-2 mt-6 pt-6 border-t ${colors.border.primary}`}>
                                    <Shield className="w-4 h-4 text-emerald-400" />
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