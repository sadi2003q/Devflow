"use client"

import React, {useState, useEffect} from 'react';
import {getColors} from '@/lib/colors'

import {FloatingParticles} from '@/lib/FloatingParticle'
import {ThemeToggle} from "@/app/components/landingPage/themeToggle";
import {SidebarHeader} from "@/app/components/signup/SidebarHeading";
import {Benefits} from "@/app/components/signup/Benefits";
import {TrustIndicator} from "@/app/components/signup/TrustIndicator";
import {FormHeader} from "@/app/components/signup/FormHeader";
import {AuthButtons} from "@/app/components/signin/AuthButtons";
import {SignUpDivider} from "@/app/components/signin/Divider";
import {From_step01} from "@/app/components/signup/FormStep01";
import {From_Step02} from "@/app/components/signup/FormStep02";
import {RoutingLink} from "@/app/components/signin/RoutingLink";
import {SecurityBadge} from "@/app/components/signin/SecurityBadge";

import axios from "axios";
import {useRouter} from "next/navigation";
import { toast } from "react-hot-toast";


export default function SignUpPage() {

    // =============   STATE VARIABLES   =============
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // =============   USER INFORMATION   =============
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [role, setRole] = useState('developer');
    const [isOwner, setIsOwner] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [githubRepo, setGithubRepo] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const colors = getColors(isDarkMode);
    const router = useRouter();



    // =============   USE EFFECTS   =============
    useEffect(() => {
        const changeVisibility = () => {
            setIsVisible(true);
        }
        changeVisibility()
    }, []);





    // =============   FUNCTIONS   =============

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        try {
            setIsSubmitting(true);
            const userData = {
                name: fullName,
                email: email,
                password: password,
                imageUrl: imageUrl,
                projects: [],
                role: role,
                isOwner: isOwner,
                isManager: isManager,
                githubRepo: githubRepo,
            };

            const response = await axios.post('/api/users/signup', userData)
            toast.success(response.data.message ?? "User created successfully");
            router.push('/dashboard')
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error ?? "Error signing up");
            } else {
                toast.error("Error signing up");
            }
        } finally {
            setIsSubmitting(false);
        }


    };

    const nextStep = () => {
        if (currentStep < 2) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };


    // =============   UI   =============
    return (
        <div className={`min-h-screen ${colors.background.gradient} relative overflow-hidden`}>
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

            <FloatingParticles/>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Branding & Benefits */}
                    <div className={`space-y-8 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>

                        <SidebarHeader isDarkMode={isDarkMode}/>

                        {/* Benefits List */}
                        <Benefits isVisible={isVisible} isDarkMode={isDarkMode}/>

                        {/* Trust Indicators */}
                        <TrustIndicator isVisible={isVisible} isDarkMode={isDarkMode}/>
                    </div>

                    {/* Right Side - Sign-Up Form */}
                    <div
                        className={`transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="relative">
                            {/* Form Card */}
                            <div
                                className={`relative ${colors.background.tertiary} backdrop-blur-xl border ${colors.border.primary} rounded-2xl p-8 shadow-2xl`}>

                                {/* Header */}
                                <FormHeader
                                    isDarkMode={isDarkMode}
                                    currentStep={currentStep}
                                />

                                {currentStep === 1 ? (
                                    <>
                                        {/* OAuth Buttons */}
                                        <AuthButtons isDarkMode={isDarkMode}/>

                                        {/* Divider */}
                                        <SignUpDivider isDarkMode={isDarkMode}/>

                                        {/* Step 1 Form */}
                                        <From_step01
                                            email={email} setEmail={setEmail}
                                            nextStep={nextStep}
                                            isDarkMode={isDarkMode}
                                            fullName={fullName} setFullName={setFullName}
                                            password={password} setPassword={setPassword}
                                            showPassword={showPassword} setShowPassword={setShowPassword}
                                        />
                                    </>
                                ) : (

                                    <>
                                        {/* Step 2 Form */}
                                        <From_Step02
                                            isDarkMode={isDarkMode}
                                            imagePreview={imagePreview}
                                            role={role} setRole={setRole}
                                            githubRepo={githubRepo}
                                            setGithubRepo={setGithubRepo}
                                            isOwner={isOwner}
                                            setIsOwner={setIsOwner}
                                            isManager={isManager}
                                            setIsManager={setIsManager}
                                            prevStep={prevStep}
                                            handleImageUpload={handleImageUpload}
                                            handleSubmit={handleSubmit}
                                            isSubmitting={isSubmitting}
                                        />
                                    </>
                                )}


                                {/* Signup Link */}
                                <RoutingLink isDarkMode={isDarkMode} link={"/signin"}/>

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
