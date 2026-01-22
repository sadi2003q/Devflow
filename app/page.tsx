"use client"

import React, { useState } from "react";
import { Hero } from "./components/landingPage/heroSection";
import { ThemeToggle } from "./components/landingPage/themeToggle";
import { ProblemSection } from "./components/landingPage/problemSection";
import { ROICalculator } from "./components/landingPage/rioCalculator";
import { SolutionSection } from "./components/landingPage/solutionSection";
import { Timeline } from "./components/landingPage/timeline";
import { SocialProof } from "./components/landingPage/socialProof";
import { FAQSection } from "./components/landingPage/faq";
import { CTASection } from "./components/landingPage/cta";

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div className="min-h-screen">
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            {/* HERO SECTION */}
            <Hero
                headline="Tasks and discussions, finally in one place."
                subheadline="DevFlow is a task scheduling and messaging platform built for software teams. Assign work, track progress, and discuss implementation details directly inside tasks—without losing context."
                ctaText="Get Started Free"
                trustSignal="Built for small engineering teams who value clarity"
                isDarkMode={isDarkMode}
            />

            {/* PROBLEM SECTION */}
            <ProblemSection
                headline="Your work is scattered across tools."
                subheadline="When tasks and conversations live separately, execution slows down."
                problems={[
                    {
                        title: "Disconnected Conversations",
                        description:
                            "Discussions happen in chat apps, while tasks live somewhere else. Important decisions get buried and context is lost.",
                        icon: "chat",
                    },
                    {
                        title: "Unclear Ownership",
                        description:
                            "Without a clear task system, deadlines slip and responsibility becomes unclear.",
                        icon: "users",
                    },
                    {
                        title: "Constant Status Chasing",
                        description:
                            "Managers and leads waste time asking for updates instead of planning real work.",
                        icon: "clock",
                    },
                ]}
                isDarkMode={isDarkMode}
            />

            {/* VALUE SECTION (Replacing ROI Claims) */}
            <ROICalculator
                headline="Designed for execution, not noise."
                subheadline="DevFlow helps teams stay focused by keeping tasks, deadlines, and discussions together."
                isDarkMode={isDarkMode}
            />

            {/* SOLUTION SECTION */}
            <SolutionSection
                benefits={[
                    {
                        title: "Task-Centric Messaging",
                        description:
                            "Every task has its own discussion space, so questions, decisions, and updates stay connected to the work.",
                        benefits: [
                            "No more searching chat history",
                            "All context lives inside the task",
                            "Clear communication for every assignment",
                        ],
                        index: 0,
                    },
                    {
                        title: "Structured Task Scheduling",
                        description:
                            "Break work into tasks and subtasks with clear deadlines and priorities.",
                        benefits: [
                            "Clear ownership for every task",
                            "Visible deadlines and progress",
                            "Simple, distraction-free task views",
                        ],
                        index: 1,
                    },
                    {
                        title: "Team Visibility",
                        description:
                            "See what everyone is working on without asking for updates.",
                        benefits: [
                            "Team-wide task overview",
                            "Current status at a glance",
                            "Better planning with less effort",
                        ],
                        index: 2,
                    },
                ]}
                isDarkMode={isDarkMode}
            />

            {/* TIMELINE */}
            <Timeline
                headline="Get started in minutes"
                steps={[
                    {
                        time: "Step 1",
                        title: "Create a project",
                        description:
                            "Set up your project and define tasks, deadlines, and priorities.",
                    },
                    {
                        time: "Step 2",
                        title: "Invite your team",
                        description:
                            "Assign roles like owner, manager, or developer with clear responsibilities.",
                    },
                    {
                        time: "Step 3",
                        title: "Plan, discuss, execute",
                        description:
                            "Track progress and discuss work directly inside each task.",
                    },
                ]}
                isDarkMode={isDarkMode}
            />

            {/* SOCIAL PROOF */}
            <SocialProof
                testimonial={{
                    quote:
                        "DevFlow helped us stop losing context. Tasks and discussions finally live in the same place.",
                    author: "Engineering Lead",
                    role: "Startup Team",
                    company: "Early-stage SaaS",
                }}
                techSpecs={[
                    { label: "Focus", value: "Task-first design", icon: "check" },
                    { label: "Workflow", value: "Simple & structured", icon: "layers" },
                    { label: "Teams", value: "Built for developers", icon: "code" },
                ]}
                isDarkMode={isDarkMode}
            />

            {/* FAQ */}
            <FAQSection
                faqs={[
                    {
                        question: "Is DevFlow a project management tool?",
                        answer:
                            "DevFlow focuses on task scheduling and task-based discussions. It’s designed to keep execution simple and clear, not overloaded.",
                    },
                    {
                        question: "Does DevFlow replace chat apps?",
                        answer:
                            "It replaces task-related conversations. Casual chat can still live elsewhere.",
                    },
                    {
                        question: "Is this suitable for small teams?",
                        answer:
                            "Yes. DevFlow is built for small to mid-sized software teams who want structure without complexity.",
                    },
                    {
                        question: "Can I assign roles?",
                        answer:
                            "Yes. Projects support owners, managers, and developers with clear task ownership.",
                    },
                ]}
                isDarkMode={isDarkMode}
            />

            {/* FINAL CTA */}
            <CTASection
                headline="Bring clarity to your team’s workflow."
                subheadline="Stop switching tools. Start executing with focus."
                buttonText="Create Your First Project"
                microcopy="Free to start. No credit card required."
                isDarkMode={isDarkMode}
            />
        </div>
    );
}
