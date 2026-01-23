"use client"

import React, {useState, useEffect} from 'react';

import {FloatingParticles} from '../lib/FloatingParticle'
import {getColors} from '../components/signin/colors'
import {ThemeToggle} from "../components/landingPage/themeToggle";
import {SidebarHeading} from "@/app/components/signin/Sidebar-Heading";
import {BenefitList} from "@/app/components/signin/BenifitList";
import {TrustIndicator} from "@/app/components/signin/TrustIndicator";
import {FormHeader} from "@/app/components/signin/FormHeader";
import {AuthButtons} from "@/app/components/signin/AuthButtons";
import {FormSignIn} from "@/app/components/signin/FormSignIn";
import {SignUpDivider} from "@/app/components/signin/Divider";
import {SecurityBadge} from "@/app/components/signin/SecurityBadge";
import {RoutingLink} from "@/app/components/signin/RoutingLink";


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
                                <FormHeader isDarkMode={isDarkMode}/>

                                {/* OAuth Buttons */}
                                <AuthButtons isDarkMode={isDarkMode}/>

                                {/* Divider */}
                                <SignUpDivider isDarkMode={isDarkMode}/>

                                {/* Email/Password Form */}
                                <FormSignIn
                                    isDarkMode={isDarkMode}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    handleSubmit={handleSubmit}
                                />

                                {/* Signup Link */}
                                <RoutingLink isDarkMode={isDarkMode}/>

                                {/* Security Badge */}
                                <SecurityBadge isDarkMode={isDarkMode}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}