"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, User, Eye, EyeOff, Zap, Shield, Check, Upload } from 'lucide-react';
import { SiGithub} from 'react-icons/si';
import { SiGoogle } from 'react-icons/si';
import  Image  from "next/image"
import { getColors } from '../lib/colors'
import { ThemeToggle } from "../components/landingPage/themeToggle";
import { FloatingParticles } from '../lib/FloatingParticle'



export default function SignUpPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [role, setRole] = useState('developer');
    const [isOwner, setIsOwner] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [githubRepo, setGithubRepo] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const colors = getColors(isDarkMode);

    useEffect(() => {
        const changeVisibility = () => {
            setIsVisible(true);
        }
        changeVisibility()
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setImageURL(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            name: fullName,
            email: email,
            imageURL: imageURL || undefined,
            joinedAt: new Date(),
            projects: [],
            role: role || undefined,
            isOwner: isOwner,
            isManager: isManager,
            githubRepo: githubRepo || undefined,
        };

        console.log('Sign up data:', userData);
    };

    const nextStep = () => {
        if (currentStep < 2) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className={`min-h-screen ${colors.background.gradient} relative overflow-hidden`}>
    <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

    <FloatingParticles />

    {/* Main Content */}
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
    <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side - Branding & Benefits */}
        <div className={`space-y-8 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
    <div>
        <h1 className={`text-5xl md:text-6xl font-bold ${colors.text.primary} mb-4 leading-tight`}>
    Join
    <span className="block bg-linear-to-r from-emerald-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
        DevFlow
        </span>
        </h1>
        <p className={`text-xl ${colors.text.secondary} leading-relaxed`}>
    Create your account and start shipping code faster.
    </p>
    </div>

    {/* Benefits List */}
    <div className="space-y-4">
        {[
                { icon: <Zap className="w-5 h-5" />, text: "Set up in under 2 minutes", color: "emerald" },
    { icon: <Shield className="w-5 h-5" />, text: "Enterprise-grade security", color: "lime" },
    { icon: <Check className="w-5 h-5" />, text: "14-day free trial included", color: "yellow" }
].map((benefit, i) => (
        <div
            key={i}
    className={`flex items-center gap-3 transition-all duration-300 delay-${(i + 1) * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
>
    <div className={`w-10 h-10 rounded-lg bg-${benefit.color}-500/10 border border-${benefit.color}-400/30 flex items-center justify-center text-${benefit.color}-400`}>
    {benefit.icon}
    </div>
    <span className={`${colors.text.secondary} font-medium`}>{benefit.text}</span>
    </div>
))}
    </div>

    {/* Trust Indicators */}
    <div className={`flex items-center gap-4 pt-6 transition-all duration-300 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    <div className="flex -space-x-2">
    <div className={`w-10 h-10 rounded-full bg-linear-to-br from-purple-300 to-pink-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
    <div className={`w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
    <div className={`w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
    </div>
    <p className={`text-sm ${colors.text.tertiary}`}>
    Join 5,000+ developers worldwide
    </p>
    </div>
    </div>

    {/* Right Side - Sign-Up Form */}
    <div className={`transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
    <div className="relative">
        {/* Form Card */}
        <div className={`relative ${colors.background.tertiary} backdrop-blur-xl border ${colors.border.primary} rounded-2xl p-8 shadow-2xl`}>

    {/* Header */}
    <div className="text-center mb-8">
    <h2 className={`text-3xl font-bold ${colors.text.primary} mb-2`}>Create Account</h2>
    <p className={`${colors.text.secondary}`}>
    Step {currentStep} of 2 - {currentStep === 1 ? 'Basic Info' : 'Profile Setup'}
    </p>

    {/* Progress Bar */}
    <div className={`w-full h-2 ${colors.background.tertiary} rounded-full mt-4 overflow-hidden`}>
    <div
        className="h-full bg-linear-to-r from-emerald-400 to-lime-400 transition-all duration-500"
    style={{ width: `${(currentStep / 2) * 100}%` }}
></div>
    </div>
    </div>

    {currentStep === 1 ? (
        <>
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

    {/* Step 1 Form */}
        <div className="space-y-4">
        {/* Full Name Input */}
        <div>
        <label className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
        Full Name *
    </label>
    <div className="relative">
    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`} />
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
            <label className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
        Email Address *
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
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
        </div>
        </>
    ) : (
        <>
            {/* Step 2 Form */}
        <div className="space-y-4">
    {/* Profile Image Upload */}
    <div>
    <label className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
        Profile Picture (Optional)
    </label>
    <div className="flex items-center gap-4">
    <div className={`w-20 h-20 rounded-full ${colors.background.tertiary} border ${colors.border.primary} flex items-center justify-center overflow-hidden`}>
        {imagePreview ? (
            <Image src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
            <User className={`w-8 h-8 ${colors.text.tertiary}`} />
        )}
        </div>
        <label className={`cursor-pointer px-4 py-2 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200 flex items-center gap-2`}>
        <Upload className="w-4 h-4" />
            Upload
            <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
            />
            </label>
            </div>
            </div>

        {/* Role Selection */}
        <div>
            <label className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
        Your Role (Optional)
    </label>
    <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className={`w-full px-4 py-3 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.text.primary} focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all`}
    >
        <option value="developer">Developer</option>
            <option value="designer">Designer</option>
        <option value="product-manager">Product Manager</option>
    <option value="engineer">Engineer</option>
        <option value="other">Other</option>
        </select>
        </div>

        {/* GitHub Repo */}
        <div>
            <label className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
        GitHub Repository (Optional)
    </label>
    <div className="relative">
    <SiGithub className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`} />
    <input
        type="text"
        value={githubRepo}
        onChange={(e) => setGithubRepo(e.target.value)}
        placeholder="username/repository"
        className={`w-full pl-11 pr-4 py-3 ${colors.background.tertiary} border ${colors.border.primary} rounded-lg ${colors.text.primary} placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all`}
        />
        </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
        <input
            type="checkbox"
        checked={isOwner}
        onChange={(e) => setIsOwner(e.target.checked)}
        className="w-4 h-4 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500/20"
        />
        <span className={`text-sm ${colors.text.secondary}`}>I&#39;m a project owner</span>
    </label>

    <label className="flex items-center gap-3 cursor-pointer">
    <input
        type="checkbox"
        checked={isManager}
        onChange={(e) => setIsManager(e.target.checked)}
        className="w-4 h-4 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500/20"
        />
        <span className={`text-sm ${colors.text.secondary}`}>I&#39;m a team manager</span>
    </label>
    </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
                <button
                    onClick={prevStep}
                    className={`flex-1 px-6 py-3 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200`}
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="
                group flex-1 px-6 py-3
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
                    Create Account
                <Check className="w-5 h-5" />
                </button>
            </div>
        </div>
        </>
)}


            {/* Sign In Link */}
            <p className={`text-center text-sm ${colors.text.secondary} mt-6`}>
                Already have an account?{' '}
                <a href="/signin" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
                    Sign in
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