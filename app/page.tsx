"use client"

import React, {useState, useEffect, useRef} from 'react';
import { Moon, Sun, Check, ArrowRight, Zap, Shield, Clock, MessageSquare, GitBranch, Star, ChevronDown, Code, Lock } from 'lucide-react';
import { SiGithub } from 'react-icons/si';


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
        observer.unobserve(entry.target); // animate only once
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}


// Theme Context
const ThemeContext = React.createContext<{
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => {},
});

// Theme Toggle Button Component
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
      <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 p-3 rounded-lg bg-white/10 dark:bg-white/10 light:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/20 light:border-black/20 hover:border-emerald-500/50 transition-all duration-200 hover:scale-105"
          aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
        ) : (
            <Moon className="w-5 h-5 text-purple-600" />
        )}
      </button>
  );
};

// 1. Hero Section Component
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  trustSignal: string;
}

const Hero: React.FC<HeroProps> = ({ headline, subheadline, ctaText, trustSignal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    const makeVisible =() => {
      setIsVisible(true);
    }

    makeVisible();


  }, []);

  return (
      <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-black dark:bg-black light:bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div
              className={`space-y-8 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-white light:text-black leading-tight tracking-tight">
              {headline}
            </h1>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
              {subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-white/20 dark:border-white/20 light:border-black/20 text-white dark:text-white light:text-black font-semibold rounded-lg hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 hover:border-emerald-500 transition-all duration-200">
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-300 to-pink-500 border-2 border-black dark:border-black light:border-white"></div>
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 border-2 border-black dark:border-black light:border-white"></div>
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 border-2 border-black dark:border-black light:border-white"></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-600">{trustSignal}</p>
            </div>
          </div>

          <div
              className={`transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-white/5 dark:bg-white/5 light:bg-black/5 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-emerald-400">$ devflow init</div>
                  <div className="text-gray-400 dark:text-gray-400 light:text-gray-600">✓ Connected to GitHub</div>
                  <div className="text-gray-400 dark:text-gray-400 light:text-gray-600">✓ Indexed 247 documents</div>
                  <div className="text-gray-400 dark:text-gray-400 light:text-gray-600">✓ AI model deployed</div>
                  <div className="text-purple-400 animate-pulse">→ Ready to automate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

// 2. Problem Section Component
interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, icon }) => {
  return (
      <div className="group relative bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div className="relative">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white dark:text-white light:text-black mb-3">{title}</h3>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
  );
};

interface ProblemSectionProps {
  headline: string;
  subheadline: string;
  problems: Array<{ title: string; description: string; icon: string }>;
}












const ProblemSection: React.FC<ProblemSectionProps> = ({
                                                         headline,
                                                         subheadline,
                                                         problems,
                                                       }) => {
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

  // Header animation
  const header = useInView<HTMLHeadingElement>();
  const subHeader = useInView<HTMLParagraphElement>();

  return (
      <section className="py-32 px-6 bg-zinc-950 dark:bg-zinc-950 light:bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Headline */}
          <h2
              ref={header.ref}
              className={`text-4xl md:text-6xl font-bold text-center mb-4 transition-all duration-1000
            ${
                  header.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
              }
            text-white dark:text-white light:text-black`}
          >
            {headline}
          </h2>

          {/* Subheadline */}
          <p
              ref={subHeader.ref}
              className={`text-xl text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 delay-200
            ${
                  subHeader.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
              }
            text-gray-500 dark:text-gray-500 light:text-gray-600`}
          >
            {subheadline}
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const card = useInView<HTMLDivElement>();

              return (
                  <div
                      key={index}
                      ref={card.ref}
                      className={`transition-all duration-1000 ease-out
                  ${
                          card.isVisible
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-12"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <ProblemCard
                        title={problem.title}
                        description={problem.description}
                        icon={getIcon(problem.icon)}
                    />
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
};


















// 3. ROI Calculator Component
interface ROICalculatorProps {
  headline: string;
  subheadline: string;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ headline, subheadline }) => {
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
      <section className="py-32 px-6 bg-black dark:bg-black light:bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white dark:text-white light:text-black mb-4">
            {headline}
          </h2>
          <p className="text-center text-gray-400 dark:text-gray-400 light:text-gray-600 mb-12 text-lg">
            {subheadline}
          </p>

          <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-3">
                  Monthly Support Tickets: <span className="text-emerald-400 font-bold">{tickets}</span>
                </label>
                <input
                    type="range"
                    min="10"
                    max="500"
                    value={tickets}
                    onChange={(e) => setTickets(Number(e.target.value))}
                    className="w-full h-2 bg-gray-800 dark:bg-gray-800 light:bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-3">
                  Avg. Resolution Time (minutes): <span className="text-emerald-400 font-bold">{resolutionTime}</span>
                </label>
                <input
                    type="range"
                    min="5"
                    max="120"
                    value={resolutionTime}
                    onChange={(e) => setResolutionTime(Number(e.target.value))}
                    className="w-full h-2 bg-gray-800 dark:bg-gray-800 light:bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-3">
                  Agent Hourly Rate ($): <span className="text-emerald-400 font-bold">{hourlyRate}</span>
                </label>
                <input
                    type="range"
                    min="20"
                    max="200"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-800 dark:bg-gray-800 light:bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            <div className="mt-12 p-8 bg-linear-to-br from-emerald-500/20 to-purple-500/20 rounded-xl border border-emerald-500/30">
              <div className="text-center">
                <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">DevFlow could save you</p>
                <p className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-purple-400 mb-2">
                  ${moneySaved.toLocaleString()}
                </p>
                <p className="text-2xl text-white dark:text-white light:text-black font-semibold">
                  and {hoursSaved} hours every month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

// 4. Solution/Benefits Section Component
interface BenefitProps {
  title: string;
  description: string;
  benefits: string[];
  index: number;
}



const SolutionSection: React.FC<{ benefits: BenefitProps[] }> = ({
                                                                   benefits,
                                                                 }) => {
  const title = useInView<HTMLHeadingElement>();
  const subtitle = useInView<HTMLParagraphElement>();

  return (
      <section className="py-32 px-6 bg-zinc-950 dark:bg-zinc-950 light:bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2
              ref={title.ref}
              className={`text-4xl md:text-6xl font-bold text-center mb-4 transition-all duration-1000
            ${
                  title.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
              }
            text-white dark:text-white light:text-black`}
          >
            The New Way
          </h2>

          {/* Subtitle */}
          <p
              ref={subtitle.ref}
              className={`text-xl text-center mb-20 max-w-3xl mx-auto transition-all duration-1000 delay-200
            ${
                  subtitle.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
              }
            text-gray-500 dark:text-gray-500 light:text-gray-600`}
          >
            Stop patching broken workflows. DevFlow rebuilds your productivity from
            the ground up.
          </p>

          {/* Benefit blocks */}
          <div className="space-y-24">
            {benefits.map((benefit, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const row = useInView<HTMLDivElement>();

              return (
                  <div
                      key={index}
                      ref={row.ref}
                      className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out
                  ${
                          row.isVisible
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-12"
                      }`}
                  >
                    {/* Text */}
                    <div className={index % 2 === 1 ? "md:order-2" : ""}>
                      <h3 className="text-3xl md:text-4xl font-bold text-white dark:text-white light:text-black mb-4">
                        {benefit.title}
                      </h3>
                      <p className="text-lg text-gray-400 dark:text-gray-400 light:text-gray-600 mb-6 leading-relaxed">
                        {benefit.description}
                      </p>

                      <ul className="space-y-3">
                        {benefit.benefits.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-lg">
                          {item}
                        </span>
                            </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual */}
                    <div className={index % 2 === 1 ? "md:order-1" : ""}>
                      <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-6 backdrop-blur-md">
                        <div className="aspect-video bg-linear-to-br from-emerald-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                          <div className="text-6xl">
                            {["🎯", "⚡", "🔄"][index]}
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













// 5. Timeline Component
interface TimelineProps {
  headline: string;
  steps: Array<{ time: string; title: string; description: string }>;
}



const Timeline: React.FC<TimelineProps> = ({ headline, steps }) => {
  const header = useInView<HTMLHeadingElement>();

  return (
      <section className="py-32 px-6 bg-black dark:bg-black light:bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h2
              ref={header.ref}
              className={`text-4xl md:text-6xl font-bold text-center mb-16 transition-all duration-1000
            ${
                  header.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
              }
            text-white dark:text-white light:text-black`}
          >
            {headline}
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-emerald-500 via-emerald-500/50 to-transparent" />

            <div className="space-y-12">
              {steps.map((step, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const item = useInView<HTMLDivElement>();

                return (
                    <div
                        key={index}
                        ref={item.ref}
                        className={`relative pl-20 transition-all duration-700 ease-out
                    ${
                            item.isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-10"
                        }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-5 top-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-black dark:border-black light:border-white shadow-[0_0_20px_rgba(16,185,129,0.5)]" />

                      <div className="font-mono text-sm text-emerald-400 mb-2">
                        {step.time}
                      </div>
                      <h3 className="text-2xl font-bold text-white dark:text-white light:text-black mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg">
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




// 6. Social Proof & Differentiation Section
interface SocialProofProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  techSpecs: Array<{ label: string; value: string; icon: string }>;
}

const SocialProof: React.FC<SocialProofProps> = ({ testimonial, techSpecs }) => {
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
      <section className="py-32 px-6 bg-zinc-950 dark:bg-zinc-950 light:bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-linear-to-br from-emerald-500/10 to-purple-500/10 border border-emerald-500/30 rounded-2xl p-12">
              <Star className="w-12 h-12 text-emerald-400 mb-6 fill-emerald-400" />
              <blockquote className="text-2xl md:text-3xl font-bold text-white dark:text-white light:text-black mb-6 leading-relaxed">
                &#34;{testimonial.quote}&#34;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-yellow-300 to-red-300"></div>
                <div>
                  <p className="font-bold text-white dark:text-white light:text-black">{testimonial.author}</p>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white dark:text-white light:text-black mb-8">The Wall of Logic</h3>
              {techSpecs.map((spec, index) => (
                  <div
                      key={index}
                      className="flex items-center gap-4 bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-xl p-6"
                  >
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                      {getIcon(spec.icon)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">{spec.label}</p>
                      <p className="text-xl font-bold text-white dark:text-white light:text-black">{spec.value}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

// 7. FAQ Section Component
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className="border-b border-white/10 dark:border-white/10 light:border-black/10">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-6 flex items-center justify-between text-left group"
        >
          <h3 className="text-xl font-bold text-white dark:text-white light:text-black group-hover:text-emerald-400 transition-colors">
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
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
  );
};

interface FAQSectionProps {
  faqs: Array<{ question: string; answer: string }>;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
      <section className="py-32 px-6 bg-black dark:bg-black light:bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white dark:text-white light:text-black mb-4">
            Questions? Answered.
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-500 light:text-gray-600 text-center mb-16">
            Everything you need to know before you get started
          </p>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
  );
};

// 8. Final CTA Section Component
interface CTASectionProps {
  headline: string;
  subheadline: string;
  buttonText: string;
  microcopy: string;
}

const CTASection: React.FC<CTASectionProps> = ({ headline, subheadline, buttonText, microcopy }) => {
  return (
      <section className="py-32 px-6 bg-linear-to-br from-black via-emerald-950/20 to-black dark:from-black dark:via-emerald-950/20 dark:to-black light:from-white light:via-emerald-50 light:to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl"></div>
            <div className="relative bg-white/5 dark:bg-white/5 light:bg-black/5 border border-emerald-500/50 dark:border-emerald-500/50 light:border-emerald-500/30 rounded-3xl p-12 md:p-16 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <h2 className="text-4xl md:text-6xl font-bold text-white dark:text-white light:text-black mb-6">
                {headline}
              </h2>
              <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 mb-10">
                {subheadline}
              </p>
              <button className="group px-12 py-6 bg-emerald-500 hover:bg-emerald-400 text-black text-xl font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] flex items-center justify-center gap-3 mx-auto">
                <SiGithub className="w-7 h-7" />
                {buttonText}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-600 mt-6">{microcopy}</p>
            </div>
          </div>
        </div>
      </section>
  );
};

// Main App Part
export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
          <ThemeToggle />

          {/* 1. Hero Section */}
          <Hero
              headline="Stop chasing updates. Start shipping code."
              subheadline="DevFlow unifies your tasks and team chat into one workspace. Resolve 60% of inquiries instantly and reclaim 2 hours of deep work every day."
              ctaText="Get Started Free — 2 mins to GitHub Sync"
              trustSignal="Used by 1,000+ engineering-led teams"
          />

          {/* 2. Problem & Agitation Section */}
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
          />

          {/* 3. Interactive ROI Calculator */}
          <ROICalculator
              headline="Stop guessing. Calculate your reclaimed hours."
              subheadline="See the exact time and money DevFlow saves your team"
          />

          {/* 4. Solution/Benefits Section */}
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
          />

          {/* 5. The Momentum Timeline */}
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
          />

          {/* 6. Social Proof & Differentiation */}
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
          />

          {/* 7. FAQ Section */}
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
          />

          {/* 8. Final CTA */}
          <CTASection
              headline="Ready to reclaim your focus?"
              subheadline="Join 5,000+ developers shipping faster. Start your 14-day Pro trial today."
              buttonText="Continue with GitHub"
              microcopy="No credit card required. Setup takes < 2 minutes."
          />
        </div>
      </ThemeContext.Provider>
  );
}