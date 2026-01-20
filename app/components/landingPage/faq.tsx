import React, {useState} from "react";
import {getColors} from "@/app/components/landingPage/visual";
import {ChevronDown} from "lucide-react";


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

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, isDarkMode }) => {
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