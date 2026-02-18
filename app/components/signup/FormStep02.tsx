import Image from "next/image";
import {Check, Upload, User} from "lucide-react";
import {SiGithub} from "react-icons/si";
import React from "react";
import {getColors} from "@/lib/colors";


type IForm_Step02 = {
    isDarkMode: boolean;
    isSubmitting: boolean;
    imagePreview: string;
    role: string
    setRole: React.Dispatch<React.SetStateAction<string>>;
    githubRepo: string;
    setGithubRepo: React.Dispatch<React.SetStateAction<string>>;
    isOwner: boolean;
    setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
    isManager: boolean;
    setIsManager: React.Dispatch<React.SetStateAction<boolean>>;

    prevStep(): void
    handleImageUpload(
        e: React.ChangeEvent<HTMLInputElement>,
    ): void
    handleSubmit(
        e: React.FormEvent,
    ): void
}

export const From_Step02 = (
    {isDarkMode, isSubmitting, imagePreview, handleImageUpload, role, setRole, githubRepo, setGithubRepo, isManager, setIsManager, isOwner, setIsOwner, prevStep, handleSubmit}: IForm_Step02,
) => {

    const colors = getColors(isDarkMode);

    return (
        <div className="space-y-4">
            {/* Profile Image Upload */}
            <div>
                <label
                    className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
                    Profile Picture (Optional)
                </label>
                <div className="flex items-center gap-4">
                    <div
                        className={`w-20 h-20 rounded-full ${colors.background.tertiary} border ${colors.border.primary} flex items-center justify-center overflow-hidden`}>
                        {imagePreview ? (
                            <Image src={imagePreview} alt="Preview"
                                   className="w-full h-full object-cover"/>
                        ) : (
                            <User className={`w-8 h-8 ${colors.text.tertiary}`}/>
                        )}
                    </div>
                    <label
                        className={`cursor-pointer px-4 py-2 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200 flex items-center gap-2`}>
                        <Upload className="w-4 h-4"/>
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
                <label
                    className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
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
                <label
                    className={`block text-sm font-semibold ${colors.text.secondary} mb-2`}>
                    GitHub Repository (Optional)
                </label>
                <div className="relative">
                    <SiGithub
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.text.tertiary}`}/>
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
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-3 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200`}
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="
                group flex-1 px-6 py-3
                rounded-lg border border-emerald-400
                text-emerald-400 font-semibold
                bg-emerald-400/10
                transition-all duration-300
                hover:bg-emerald-400
                hover:text-black
                hover:border-emerald-400
                disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
                "
                >
                    {isSubmitting ? "Creating..." : "Create Account"}
                    <Check className="w-5 h-5"/>
                </button>
            </div>
        </div>
    )
}
