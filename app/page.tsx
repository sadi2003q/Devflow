"use client"

import React, {useState, useEffect, useRef} from 'react';
import { Moon, Sun, Check, ArrowRight, Zap, Shield, Clock, MessageSquare, GitBranch, Star, ChevronDown, Code, Lock } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

// Centralized Color System
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

// Helper function to get colors based on the theme
const getColors = (isDarkMode: boolean) => isDarkMode ? COLORS.dark : COLORS.light;

// Custom hook for intersection observer
export function useInView<T extends HTMLElement>(
    options: IntersectionObserverInit = { threshold: 0.2 }
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

// Theme Toggle Button Component
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

// Hero Section Component
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  trustSignal: string;
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ headline, subheadline, ctaText, trustSignal, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const colors = getColors(isDarkMode);

  useEffect(() => {

    const changeVisibility = () => {
      setIsVisible(true);
    }

    changeVisibility();

  }, []);

  return (
      <section className={`min-h-screen flex items-center justify-center px-6 py-24 ${colors.background.primary}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div
              className={`space-y-8 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <h1 className={`text-5xl md:text-7xl font-bold ${colors.text.primary} leading-tight tracking-tight`}>
              {headline}
            </h1>
            <p className={`text-xl ${colors.text.secondary} leading-relaxed`}>
              {subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className={`px-8 py-4 border-2 ${colors.border.secondary} ${colors.text.primary} font-semibold rounded-lg ${colors.hover.background} ${colors.hover.border} transition-all duration-200`}>
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className={`w-10 h-10 rounded-full bg-linear-to-br from-purple-300 to-pink-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                <div className={`w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
                <div className={`w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 border-2 ${isDarkMode ? 'border-black' : 'border-white'}`}></div>
              </div>
              <p className={`text-sm ${colors.text.tertiary}`}>{trustSignal}</p>
            </div>
          </div>

          <div
              className={`transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
              <div className={`relative ${colors.background.tertiary} backdrop-blur-xl border ${colors.border.primary} rounded-2xl p-8 shadow-2xl`}>
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-emerald-400">$ devflow init</div>
                  <div className={colors.text.secondary}>✓ Connected to GitHub</div>
                  <div className={colors.text.secondary}>✓ Indexed 247 documents</div>
                  <div className={colors.text.secondary}>✓ AI model deployed</div>
                  <div className="text-purple-400 animate-pulse">→ Ready to automate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

// Problem Card Component
interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, icon, isDarkMode }) => {
  const colors = getColors(isDarkMode);

  return (
      <div className={`group relative ${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-8 ${colors.hover.border} transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]`}>
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div className="relative">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
            {icon}
          </div>
          <h3 className={`text-2xl font-bold ${colors.text.primary} mb-3`}>{title}</h3>
          <p className={`${colors.text.secondary} leading-relaxed`}>{description}</p>
        </div>
      </div>
  );
};

// Problem Section Component
interface ProblemSectionProps {
  headline: string;
  subheadline: string;
  problems: Array<{ title: string; description: string; icon: string }>;
  isDarkMode: boolean;
}

const ProblemSection: React.FC<ProblemSectionProps> = (
    {
     headline,
     subheadline,
     problems,
     isDarkMode,
   }) => {
  const colors = getColors(isDarkMode);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "slack":
        return <MessageSquare className="w-6 h-6" />;
      case "jira":
        return <GitBranch className="w-6 h-6" />;
      case "context":
        return <Clock className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  const header = useInView<HTMLHeadingElement>();
  const subHeader = useInView<HTMLParagraphElement>();

  return (
      <section className={`py-32 px-6 ${colors.background.secondary}`}>
        <div className="max-w-7xl mx-auto">
          <h2
              ref={header.ref}
              className={`text-4xl md:text-6xl font-bold text-center mb-4 transition-all duration-1000 ${
                  header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${colors.text.primary}`}
          >
            {headline}
          </h2>

          <p
              ref={subHeader.ref}
              className={`text-xl text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
                  subHeader.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${colors.text.tertiary}`}
          >
            {subheadline}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => {

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const card = useInView<HTMLDivElement>();

              return (
                  <div
                      key={index}
                      ref={card.ref}
                      className={`transition-all duration-1000 ease-out ${
                          card.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <ProblemCard
                        title={problem.title}
                        description={problem.description}
                        icon={getIcon(problem.icon)}
                        isDarkMode={isDarkMode}
                    />
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
};

// ROI Calculator Component
interface ROICalculatorProps {
  headline: string;
  subheadline: string;
  isDarkMode: boolean;
}


const ROICalculator: React.FC<ROICalculatorProps> = ({ headline, subheadline, isDarkMode }) => {
  const colors = getColors(isDarkMode);
  const [tickets, setTickets] = useState(100);
  const [resolutionTime, setResolutionTime] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(50);

  const calculateSavings = () => {
    const hoursSaved = (tickets * resolutionTime * 0.6) / 60;
    const moneySaved = hoursSaved * hourlyRate;
    return { hoursSaved: Math.round(hoursSaved), moneySaved: Math.round(moneySaved) };
  };

  const { hoursSaved, moneySaved } = calculateSavings();

  return (
      <section className={`relative py-32 px-6 overflow-hidden ${colors.background.primary}`}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400">Interactive Calculator</span>
            </div>
            <h2 className={`text-4xl md:text-6xl font-bold text-center mb-4 ${colors.text.primary}`}>
              {headline}
            </h2>
            <p className={`text-center ${colors.text.secondary} text-lg max-w-2xl mx-auto`}>
              {subheadline}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Controls Panel */}
            <div className="space-y-6">
              {/* Ticket Slider */}
              <div className={`group ${colors.background.tertiary} border ${colors.border.primary} rounded-2xl p-6 backdrop-blur-xl hover:border-cyan-400/50 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <label className={`text-sm font-semibold ${colors.text.secondary}`}>
                    Monthly Support Tickets
                  </label>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
                    <span className="text-2xl font-bold text-cyan-400">{tickets}</span>
                  </div>
                </div>
                <input
                    type="range"
                    min="10"
                    max="500"
                    value={tickets}
                    onChange={(e) => setTickets(Number(e.target.value))}
                    className={`w-full h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(6,182,212,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125`}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">10</span>
                  <span className="text-xs text-gray-500">500</span>
                </div>
              </div>

              {/* Time Slider */}
              <div className={`group ${colors.background.tertiary} border ${colors.border.primary} rounded-2xl p-6 backdrop-blur-xl hover:border-violet-400/50 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <label className={`text-sm font-semibold ${colors.text.secondary}`}>
                    Avg. Resolution Time
                  </label>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 rounded-lg border border-violet-400/30">
                    <span className="text-2xl font-bold text-violet-400">{resolutionTime}</span>
                    <span className="text-sm text-violet-400">min</span>
                  </div>
                </div>
                <input
                    type="range"
                    min="5"
                    max="120"
                    value={resolutionTime}
                    onChange={(e) => setResolutionTime(Number(e.target.value))}
                    className={`w-full h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125`}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">5 min</span>
                  <span className="text-xs text-gray-500">120 min</span>
                </div>
              </div>

              {/* Rate Slider */}
              <div className={`group ${colors.background.tertiary} border ${colors.border.primary} rounded-2xl p-6 backdrop-blur-xl hover:border-pink-400/50 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <label className={`text-sm font-semibold ${colors.text.secondary}`}>
                    Agent Hourly Rate
                  </label>
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-pink-500/10 rounded-lg border border-pink-400/30">
                    <span className="text-lg text-pink-400">$</span>
                    <span className="text-2xl font-bold text-pink-400">{hourlyRate}</span>
                  </div>
                </div>
                <input
                    type="range"
                    min="20"
                    max="200"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className={`w-full h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500 [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(236,72,153,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125`}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">$20</span>
                  <span className="text-xs text-gray-500">$200</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-linear-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>

              <div className={`relative ${isDarkMode ? 'bg-linear-to-br from-zinc-900 to-zinc-950' : 'bg-linear-to-br from-white to-gray-50'} rounded-3xl p-8 border-2 ${isDarkMode ? 'border-cyan-400/20' : 'border-cyan-400/30'} shadow-2xl`}>
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10 border border-cyan-400/30">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-cyan-400">Your Potential Savings</span>
                  </div>

                  {/* Money Saved */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10 blur-xl"></div>
                    <div className="relative">
                      <p className={`text-sm ${colors.text.secondary} mb-2`}>Monthly Cost Reduction</p>
                      <div className="flex items-start justify-center gap-1">
                        <span className="text-4xl font-bold bg-linear-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">$</span>
                        <span className="text-7xl md:text-8xl font-black bg-linear-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-none">
                          {moneySaved.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hours Saved */}
                  <div className={`grid grid-cols-2 gap-4 pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
                      <p className="text-sm text-cyan-400 mb-1">Hours Saved</p>
                      <p className="text-3xl font-bold text-cyan-400">{hoursSaved}h</p>
                    </div>
                    <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-400/30">
                      <p className="text-sm text-violet-400 mb-1">Annual Savings</p>
                      <p className="text-3xl font-bold text-violet-400">${(moneySaved * 12).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Bottom text */}
                  <p className={`text-sm ${colors.text.tertiary} pt-4`}>
                    Based on 60% automation rate with DevFlow AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

// Solution Section Component
interface BenefitProps {
  title: string;
  description: string;
  benefits: string[];
  index: number;
}






const SolutionSection: React.FC<{ benefits: BenefitProps[], isDarkMode: boolean }> = (
    {
      benefits,
      isDarkMode,
    }) => {
  const colors = getColors(isDarkMode);
  const title = useInView<HTMLHeadingElement>();
  const subtitle = useInView<HTMLParagraphElement>();


  const particles = [
    { left: '10%', top: '20%', duration: '3.5s', delay: '0.5s', color: 'bg-emerald-400/40' },
    { left: '30%', top: '50%', duration: '4s', delay: '1s', color: 'bg-orange-400/40' },
    { left: '60%', top: '10%', duration: '3.2s', delay: '0.8s', color: 'bg-lime-400/40' },
    { left: '80%', top: '70%', duration: '4.1s', delay: '1.2s', color: 'bg-emerald-400/40' },
    { left: '50%', top: '40%', duration: '3.8s', delay: '0.3s', color: 'bg-orange-400/40' },
    { left: '20%', top: '80%', duration: '4.5s', delay: '0.7s', color: 'bg-lime-400/40' },
  ];


  return (
      <section className={`py-32 px-6 ${colors.background.secondary}`}>
        <div className="max-w-7xl mx-auto">
          <h2
              ref={title.ref}
              className={`text-4xl md:text-6xl font-bold text-center mb-4 transition-all duration-1000 ${
                  title.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${colors.text.primary}`}
          >
            The New Way
          </h2>

          <p
              ref={subtitle.ref}
              className={`text-xl text-center mb-20 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
                  subtitle.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${colors.text.tertiary}`}
          >
            Stop patching broken workflows. DevFlow rebuilds your productivity from
            the ground up.
          </p>

          <div className="space-y-24">
            {benefits.map((benefit, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const row = useInView<HTMLDivElement>();

              return (
                  <div
                      key={index}
                      ref={row.ref}
                      className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
                          row.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      }`}
                  >
                    <div className={index % 2 === 1 ? "md:order-2" : ""}>
                      <h3 className={`text-3xl md:text-4xl font-bold ${colors.text.primary} mb-4`}>
                        {benefit.title}
                      </h3>
                      <p className={`text-lg ${colors.text.secondary} mb-6 leading-relaxed`}>
                        {benefit.description}
                      </p>

                      <ul className="space-y-3">
                        {benefit.benefits.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                                {item}
                              </span>
                            </li>
                        ))}
                      </ul>
                    </div>

                    <div className={index % 2 === 1 ? "md:order-1" : ""}>
                      <div className="relative group/card">


                        <div className={`relative ${colors.background.tertiary} border ${colors.border.primary} rounded-2xl p-8 backdrop-blur-md overflow-hidden group-hover/card:border-opacity-50 transition-all duration-300`}>
                          {/* Background pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{
                              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)`,
                              backgroundSize: '32px 32px'
                            }}></div>
                          </div>

                          {/* Main visual card */}
                          <div className="relative aspect-video rounded-xl overflow-hidden">
                            {/* Gradient background with different colors per index */}
                            <div className={`absolute inset-0 ${
                                index === 0 ? 'bg-linear-to-br from-emerald-500/30 via-lime-500/20 to-yellow-500/10' :
                                    index === 1 ? 'bg-linear-to-br from-orange-500/30 via-yellow-500/20 to-lime-500/10' :
                                        'bg-linear-to-br from-lime-500/30 via-emerald-500/20 to-teal-500/10'
                            }`}></div>

                            {/* Animated gradient orbs */}
                            <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl opacity-60 ${
                                index === 0 ? 'bg-emerald-400' :
                                    index === 1 ? 'bg-orange-400' :
                                        'bg-lime-400'
                            } animate-pulse`}></div>
                            <div className={`absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full blur-2xl opacity-60 ${
                                index === 0 ? 'bg-lime-400' :
                                    index === 1 ? 'bg-yellow-400' :
                                        'bg-emerald-400'
                            } animate-pulse`} style={{animationDelay: '1s'}}></div>

                            {/* Emoji with enhanced styling */}
                            <div className="relative z-10 flex items-center justify-center h-full">
                              <div className="relative">
                                {/* Glow behind emoji */}
                                <div className={`absolute inset-0 blur-3xl scale-150 ${
                                    index === 0 ? 'bg-emerald-400/50' :
                                        index === 1 ? 'bg-orange-400/50' :
                                            'bg-lime-400/50'
                                }`}></div>
                                <div className="text-7xl md:text-8xl filter drop-shadow-2xl transform group-hover/card:scale-110 transition-transform duration-300">
                                  {["🎯", "⚡", "🔄"][index]}
                                </div>
                              </div>
                            </div>

                            {/* Floating particles effect */}
                            <div className="absolute inset-0 overflow-hidden">
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
                            </div>


                            {/* Border highlight */}
                            <div className={`absolute inset-0 rounded-xl border ${
                                index === 0 ? 'border-emerald-400/20' :
                                    index === 1 ? 'border-orange-400/20' :
                                        'border-lime-400/20'
                            } group-hover/card:border-opacity-60 transition-all`}></div>
                          </div>

                          {/* Feature tag */}
                          <div className="mt-4 flex justify-center">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
                                index === 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20' :
                                    index === 1 ? 'bg-orange-500/10 text-orange-400 border border-orange-400/20' :
                                        'bg-lime-500/10 text-lime-400 border border-lime-400/20'
                            }`}>
                              {index === 0 && <Shield className="w-3 h-3" />}
                              {index === 1 && <Zap className="w-3 h-3" />}
                              {index === 2 && <GitBranch className="w-3 h-3" />}
                              {index === 0 ? 'Verified & Secure' : index === 1 ? 'Real-time Sync' : 'Smart Handoff'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
};









// Timeline Component
interface TimelineProps {
  headline: string;
  steps: Array<{ time: string; title: string; description: string }>;
  isDarkMode: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ headline, steps, isDarkMode }) => {
  const colors = getColors(isDarkMode);
  const header = useInView<HTMLHeadingElement>();

  return (
      <section className={`py-32 px-6 ${colors.background.primary}`}>
        <div className="max-w-4xl mx-auto">
          <h2
              ref={header.ref}
              className={`text-4xl md:text-6xl font-bold text-center mb-16 transition-all duration-1000 ${
                  header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${colors.text.primary}`}
          >
            {headline}
          </h2>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-emerald-500 via-emerald-500/50 to-transparent" />

            <div className="space-y-12">
              {steps.map((step, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const item = useInView<HTMLDivElement>();

                return (
                    <div
                        key={index}
                        ref={item.ref}
                        className={`relative pl-20 transition-all duration-700 ease-out ${
                            item.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                        }`}
                    >
                      <div className={`absolute left-5 top-2 w-6 h-6 bg-emerald-500 rounded-full border-4 ${isDarkMode ? 'border-black' : 'border-white'} shadow-[0_0_20px_rgba(16,185,129,0.5)]`} />

                      <div className="font-mono text-sm text-emerald-400 mb-2">
                        {step.time}
                      </div>
                      <h3 className={`text-2xl font-bold ${colors.text.primary} mb-2`}>
                        {step.title}
                      </h3>
                      <p className={`${colors.text.secondary} text-lg`}>
                        {step.description}
                      </p>
                    </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
  );
};

// Social Proof Component
interface SocialProofProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  techSpecs: Array<{ label: string; value: string; icon: string }>;
  isDarkMode: boolean;
}

const SocialProof: React.FC<SocialProofProps> = ({ testimonial, techSpecs, isDarkMode }) => {
  const colors = getColors(isDarkMode);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'lock':
        return <Lock className="w-6 h-6" />;
      case 'zap':
        return <Zap className="w-6 h-6" />;
      case 'code':
        return <Code className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  return (
      <section className={`py-32 px-6 ${colors.background.secondary}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-linear-to-br from-emerald-500/10 to-purple-500/10 border border-emerald-500/30 rounded-2xl p-12">
              <Star className="w-12 h-12 text-emerald-400 mb-6 fill-emerald-400" />
              <blockquote className={`text-2xl md:text-3xl font-bold ${colors.text.primary} mb-6 leading-relaxed`}>
                &#34;{testimonial.quote}&#34;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-yellow-300 to-red-300"></div>
                <div>
                  <p className={`font-bold ${colors.text.primary}`}>{testimonial.author}</p>
                  <p className={colors.text.secondary}>{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className={`text-3xl font-bold ${colors.text.primary} mb-8`}>The Wall of Logic</h3>
              {techSpecs.map((spec, index) => (
                  <div
                      key={index}
                      className={`flex items-center gap-4 ${colors.background.tertiary} border ${colors.border.primary} rounded-xl p-6`}
                  >
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                      {getIcon(spec.icon)}
                    </div>
                    <div>
                      <p className={`text-sm ${colors.text.secondary}`}>{spec.label}</p>
                      <p className={`text-xl font-bold ${colors.text.primary}`}>{spec.value}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isDarkMode: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isDarkMode }) => {
  const colors = getColors(isDarkMode);
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className={`border-b ${colors.border.primary}`}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-6 flex items-center justify-between text-left group"
        >
          <h3 className={`text-xl font-bold ${colors.text.primary} group-hover:text-emerald-400 transition-colors`}>
            {question}
          </h3>
          <ChevronDown
              className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
              }`}
          />
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 pb-6' : 'max-h-0'
            }`}
        >
          <p className={`${colors.text.secondary} text-lg leading-relaxed`}>
            {answer}
          </p>
        </div>
      </div>
  );
};

// FAQ Section Component
interface FAQSectionProps {
  faqs: Array<{ question: string; answer: string }>;
  isDarkMode: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, isDarkMode }) => {
  const colors = getColors(isDarkMode);

  return (
      <section className={`py-32 px-6 ${colors.background.primary}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-bold text-center ${colors.text.primary} mb-4`}>
            Questions? Answered.
          </h2>
          <p className={`text-xl ${colors.text.tertiary} text-center mb-16`}>
            Everything you need to know before you get started
          </p>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </section>
  );
};

// Final CTA Section Component
interface CTASectionProps {
  headline: string;
  subheadline: string;
  buttonText: string;
  microcopy: string;
  isDarkMode: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ headline, subheadline, buttonText, microcopy, isDarkMode }) => {
  const colors = getColors(isDarkMode);

  return (
      <section className={`relative py-32 px-6 overflow-hidden ${colors.background.primary}`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-linear-to-r from-emerald-400/30 to-lime-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-linear-to-l from-orange-400/30 to-yellow-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-br from-emerald-300/20 via-lime-300/20 to-yellow-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/10 via-lime-500/10 to-yellow-500/10 border border-emerald-400/30 mb-8">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold bg-linear-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Limited Time Offer
              </span>
            </div>

            <h2 className={`text-5xl md:text-7xl font-black ${colors.text.primary} mb-6 leading-tight`}>
              <span className="bg-linear-to-r from-emerald-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
                {headline}
              </span>
            </h2>

            <p className={`text-xl md:text-2xl ${colors.text.secondary} mb-12 max-w-2xl mx-auto`}>
              {subheadline}
            </p>
          </div>

          {/* CTA Card */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 via-lime-500 to-yellow-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

            <div className={`relative ${isDarkMode ? 'bg-zinc-900/90' : 'bg-white/90'} backdrop-blur-xl rounded-3xl p-8 md:p-12 border ${isDarkMode ? 'border-emerald-500/20' : 'border-emerald-400/30'}`}>
              <div className="flex flex-col items-center gap-6">
                {/* Main CTA Button */}
                <button className="group/btn relative px-10 py-5 bg-linear-to-r from-emerald-500 via-lime-500 to-yellow-500 text-black text-lg md:text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 w-full md:w-auto overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-500 via-lime-500 to-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <SiGithub className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">{buttonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                </button>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className={colors.text.secondary}>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-lime-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className={colors.text.secondary}>2-minute setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className={colors.text.secondary}>14-day free trial</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-6 w-full max-w-2xl">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">5K+</div>
                    <div className={`text-sm ${colors.text.secondary} mt-1`}>Developers</div>
                  </div>
                  <div className="text-center border-l border-r border-emerald-500/20">
                    <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-lime-400 to-yellow-400 bg-clip-text text-transparent">60%</div>
                    <div className={`text-sm ${colors.text.secondary} mt-1`}>Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">24/7</div>
                    <div className={`text-sm ${colors.text.secondary} mt-1`}>AI Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom microcopy */}
          <p className={`text-center text-sm ${colors.text.tertiary} mt-8`}>
            {microcopy}
          </p>
        </div>
      </section>
  );
};












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