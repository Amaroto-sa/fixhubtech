import type { Metadata } from "next";
import { SectionReveal } from "@/components/shared/motion";

export const metadata: Metadata = {
    title: "FAQ",
    description:
        "Frequently asked questions about FixHub Technology's services, pricing, process, and platform.",
};

const faqCategories = [
    {
        title: "General",
        questions: [
            {
                q: "What does FixHub Technology do?",
                a: "FixHub Technology designs and builds premium websites, redesigns, booking platforms, and digital systems for businesses. We help you look serious online and convert visitors into customers.",
            },
            {
                q: "Who is FixHub for?",
                a: "We work with small-to-medium businesses, restaurants, salons, hotels, service companies, and any brand that wants a premium, conversion-focused online presence.",
            },
            {
                q: "Where is FixHub located?",
                a: "We work with clients globally. Our team operates remotely, which means we can serve businesses anywhere in the world.",
            },
        ],
    },
    {
        title: "Pricing & Packages",
        questions: [
            {
                q: "How much does a website cost?",
                a: "Our packages start from $499 for a Starter site. Most businesses choose our Growth package at $1,499. Custom projects are priced based on scope — request a quote for details.",
            },
            {
                q: "Are there any hidden fees?",
                a: "No. We provide transparent pricing upfront. You'll know exactly what you're paying for before any work begins.",
            },
            {
                q: "Do you offer payment plans?",
                a: "Yes, we can arrange milestone-based payments for larger projects. Typically 50% upfront and 50% on completion.",
            },
        ],
    },
    {
        title: "Process & Delivery",
        questions: [
            {
                q: "How long does a project take?",
                a: "Most projects are delivered within 2–4 weeks depending on complexity. We'll give you a clear timeline at the start.",
            },
            {
                q: "What if I need changes after delivery?",
                a: "Every package includes revision rounds. Additional revisions can be purchased as add-ons. We want you to be 100% happy with the result.",
            },
            {
                q: "Do you provide hosting?",
                a: "We can deploy your project on Vercel, Netlify, or any hosting provider of your choice. We'll guide you through the setup.",
            },
        ],
    },
    {
        title: "Support",
        questions: [
            {
                q: "How do I communicate during a project?",
                a: "You'll have access to our client portal where you can track progress, upload files, request revisions, and message our team directly.",
            },
            {
                q: "Do you offer ongoing support?",
                a: "Yes, we offer monthly maintenance plans starting from $99/month. This includes content updates, performance monitoring, and priority support.",
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="section-container max-w-4xl">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">FAQ</span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to know about working with FixHub Technology.
                        </p>
                    </div>
                </SectionReveal>

                <div className="space-y-12">
                    {faqCategories.map((category, catIdx) => (
                        <SectionReveal key={catIdx} delay={catIdx * 0.1}>
                            <div>
                                <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-xs text-indigo-400 font-bold">
                                        {catIdx + 1}
                                    </div>
                                    {category.title}
                                </h2>
                                <div className="space-y-4">
                                    {category.questions.map((faq, qIdx) => (
                                        <details
                                            key={qIdx}
                                            className="card-elevated group"
                                        >
                                            <summary className="cursor-pointer p-6 flex items-center justify-between text-sm font-medium text-foreground list-none">
                                                {faq.q}
                                                <span className="ml-4 text-muted-foreground group-open:rotate-45 transition-transform text-lg">
                                                    +
                                                </span>
                                            </summary>
                                            <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
                                                {faq.a}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
