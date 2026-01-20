"use client"

import React, {useState} from 'react';
import { Hero } from './components/landingPage/heroSection'
import { ThemeToggle } from './components/landingPage/themeToggle'
import { ProblemSection } from './components/landingPage/problemSection'
import { ROICalculator } from './components/landingPage/rioCalculator'
import { SolutionSection } from './components/landingPage/solutionSection'
import { Timeline } from './components/landingPage/timeline'
import { SocialProof } from './components/landingPage/socialProof'
import { FAQSection } from './components/landingPage/faq'
import { CTASection } from './components/landingPage/cta'




// Main App Part
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
      <div className="min-h-screen">
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Hero Section */}
        <Hero
            headline="Stop chasing updates. Start shipping code."
            subheadline="DevFlow unifies your tasks and team chat into one workspace. Resolve 60% of inquiries instantly and reclaim 2 hours of deep work every day."
            ctaText="Get Started Free — 2 mins to GitHub Sync"
            trustSignal="Used by 1,000+ engineering-led teams"
            isDarkMode={isDarkMode}
        />

        {/* Problem Section */}
        <ProblemSection
            headline="Your productivity is dying in a thousand tabs."
            subheadline="Repetitive questions and fragmented tools are killing your flow state"
            problems={[
              {
                title: "The Slack Abyss",
                description: "Decisions buried under 500 'quick question' pings. Your focus is fractured before you write a single line of code.",
                icon: "slack"
              },
              {
                title: "The Jira Graveyard",
                description: "Outdated tickets and a UI so slow it's ignored. Your project board is a lie, and everyone knows it.",
                icon: "jira"
              },
              {
                title: "The Context Tax",
                description: "Every tool-switch costs 20 minutes of focus. You're spending more time managing tools than building product.",
                icon: "context"
              }
            ]}
            isDarkMode={isDarkMode}
        />

        {/* ROI Calculator */}
        <ROICalculator
            headline="Stop guessing. Calculate your reclaimed hours."
            subheadline="See the exact time and money DevFlow saves your team"
            isDarkMode={isDarkMode}
        />

        {/* Solution Section */}
        <SolutionSection
            benefits={[
              {
                title: "The Hallucination Guard",
                description: "DevFlow only answers from your docs. If it's not there, it escalates. No 'AI guesses.'",
                benefits: [
                  "Verified Source Accuracy - Every answer is traceable to your documentation",
                  "Automatic escalation for complex queries that need human expertise",
                  "100% transparency with source citations on every response"
                ],
                index: 0
              },
              {
                title: "Live Git Sync",
                description: "Your board updates itself. Open a PR, and the ticket moves. No manual status pings.",
                benefits: [
                  "Real-time GitHub integration that watches your repositories 24/7",
                  "Automatic status updates - from 'In Progress' to 'Ready for Review' to 'Done'",
                  "Zero manual tracking - your team's work speaks for itself"
                ],
                index: 1
              },
              {
                title: "Seamless Handoff",
                description: "Complex issues reach experts with the complete chat history already attached.",
                benefits: [
                  "Full context preservation - no more 'can you forward me that thread?'",
                  "Smart routing to the right expert based on skills and availability",
                  "Zero information loss between AI and human handoff"
                ],
                index: 2
              }
            ]}
            isDarkMode={isDarkMode}
        />

        {/* Timeline */}
        <Timeline
            headline="From 0 to Automated in 120 Minutes"
            steps={[
              {
                time: "09:00 AM",
                title: "Connect Knowledge Base",
                description: "Link your Notion, GitHub, or documentation sources. One-click integrations with zero configuration required."
              },
              {
                time: "09:15 AM",
                title: "DevFlow indexes content",
                description: "Our AI builds your private model from your docs. It learns your codebase, conventions, and tribal knowledge."
              },
              {
                time: "11:00 AM",
                title: "Deploy and automate",
                description: "Your first ticket is resolved while you're at lunch. DevFlow is already saving your team hours of repetitive work."
              }
            ]}
            isDarkMode={isDarkMode}
        />

        {/* Social Proof */}
        <SocialProof
            testimonial={{
              quote: "DevFlow automated 55% of our tier-1 inquiries in week one. My team reclaimed 10 hours a week for deep work.",
              author: "Sarah Chen",
              role: "CTO",
              company: "TechStream"
            }}
            techSpecs={[
              { label: "Security", value: "AES-256 + SOC2 Type II", icon: "lock" },
              { label: "Latency", value: "<200ms global response", icon: "zap" },
              { label: "CLI", value: "Full control via CMD+K", icon: "code" }
            ]}
            isDarkMode={isDarkMode}
        />

        {/* FAQ Section */}
        <FAQSection
            faqs={[
              {
                question: "Does it require an engineer to set up?",
                answer: "No. If you can copy-paste a URL, you can deploy DevFlow in minutes. Our setup wizard walks you through connecting your knowledge base, and we handle all the AI infrastructure behind the scenes."
              },
              {
                question: "What about data security?",
                answer: "Your data is encrypted at rest with AES-256 and never used to train public models. We're SOC2 Type II certified and maintain strict data isolation. Your private documentation stays private."
              },
              {
                question: "How accurate is the AI?",
                answer: "DevFlow only answers from your verified sources. If the answer isn't in your documentation, it escalates to a human instead of guessing. This 'Hallucination Guard' ensures 100% accuracy on every automated response."
              },
              {
                question: "Can I customize the AI's responses?",
                answer: "Absolutely. You control the tone, technical depth, and escalation rules. DevFlow adapts to your team's communication style and can be tuned to match your brand voice."
              },
              {
                question: "What integrations do you support?",
                answer: "GitHub, GitLab, Notion, Confluence, Slack, Linear, Jira, and more. We're constantly adding new integrations based on customer feedback. If you need a specific integration, let us know."
              }
            ]}
            isDarkMode={isDarkMode}
        />

        {/* Final CTA */}
        <CTASection
            headline="Ready to reclaim your focus?"
            subheadline="Join 5,000+ developers shipping faster. Start your 14-day Pro trial today."
            buttonText="Continue with GitHub"
            microcopy="No credit card required. Setup takes < 2 minutes."
            isDarkMode={isDarkMode}
        />
      </div>
  );
}