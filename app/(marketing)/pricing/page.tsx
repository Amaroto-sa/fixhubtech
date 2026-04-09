import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/motion";

export const metadata: Metadata = {
    title: "Pricing",
    description:
        "Transparent pricing for FixHub Technology's premium digital services. Choose from Starter, Growth, Premium, or Custom plans.",
};

const plans = [
    {
        name: "Starter",
        price: "499",
        period: "one-time",
        description: "Perfect for small businesses getting online for the first time.",
        features: [
            "Up to 5 pages",
            "Mobile responsive design",
            "Contact form",
            "Basic SEO setup",
            "1 round of revisions",
            "2-week delivery",
            "30-day support",
        ],
        notIncluded: ["CMS integration", "Analytics setup", "Custom animations"],
        cta: "Get Started",
        highlighted: false,
    },
    {
        name: "Growth",
        price: "1,499",
        period: "one-time",
        description: "For businesses ready to scale their online presence seriously.",
        features: [
            "Up to 10 pages",
            "Custom modern design",
            "CMS integration",
            "Advanced SEO",
            "3 rounds of revisions",
            "Analytics & tracking setup",
            "Social media integration",
            "3-week delivery",
            "60-day support",
        ],
        notIncluded: ["Client portal"],
        cta: "Get Started",
        highlighted: true,
    },
    {
        name: "Premium",
        price: "3,499",
        period: "one-time",
        description: "Full-scale digital solution for serious brands and growing businesses.",
        features: [
            "Unlimited pages",
            "Custom platform build",
            "Client portal access",
            "Payment integration",
            "Booking / order system",
            "Priority support",
            "5 rounds of revisions",
            "Custom animations",
            "4-week delivery",
            "90-day support",
        ],
        notIncluded: [],
        cta: "Get Started",
        highlighted: false,
    },
];

const addOns = [
    { name: "Extra revision round", price: "$49" },
    { name: "Logo design", price: "$199" },
    { name: "Content writing (per page)", price: "$79" },
    { name: "Monthly maintenance", price: "$99/mo" },
    { name: "Rush delivery (–50% time)", price: "+30%" },
    { name: "WhatsApp chat integration", price: "$49" },
];

export default function PricingPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="section-container">
                {/* Header */}
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Pricing</span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            No hidden fees. No long contracts. Choose a package and
                            we&apos;ll build something great.
                        </p>
                    </div>
                </SectionReveal>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                    {plans.map((plan, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <div
                                className={`relative card-elevated p-8 h-full flex flex-col ${plan.highlighted
                                        ? "border-indigo-500/40 bg-gradient-to-b from-indigo-500/[0.08] to-transparent glow-indigo"
                                        : ""
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="badge-primary !text-xs">Most Popular</span>
                                    </div>
                                )}
                                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                                    {plan.name}
                                </h3>
                                <div className="mb-4">
                                    <span className="text-sm text-muted-foreground">From </span>
                                    <span className="font-display text-5xl font-bold text-foreground">
                                        ${plan.price}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                                    {plan.description}
                                </p>

                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                                        What&apos;s included
                                    </p>
                                    <ul className="space-y-2.5 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                                <span className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-[10px] text-emerald-400 flex-shrink-0">
                                                    ✓
                                                </span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    {plan.notIncluded.length > 0 && (
                                        <ul className="space-y-2 mb-6">
                                            {plan.notIncluded.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground/50">
                                                    <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-[10px] text-muted-foreground flex-shrink-0">
                                                        ✕
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <Link
                                    href="/quote"
                                    className={`w-full mt-4 ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
                                >
                                    <span>{plan.cta}</span>
                                </Link>
                            </div>
                        </SectionReveal>
                    ))}
                </div>

                {/* Custom plan */}
                <SectionReveal>
                    <div className="card-glass p-10 text-center max-w-3xl mx-auto mb-20 glow-indigo">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                            Need Something Custom?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Enterprise builds, multi-platform projects, and complex systems.
                            Let&apos;s design a plan that fits.
                        </p>
                        <Link href="/quote" className="btn-primary">
                            <span>Request Custom Quote</span>
                        </Link>
                    </div>
                </SectionReveal>

                {/* Add-ons */}
                <SectionReveal>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                            Optional Add-ons
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {addOns.map((addon, idx) => (
                                <div
                                    key={idx}
                                    className="card-elevated p-5 flex items-center justify-between"
                                >
                                    <span className="text-sm text-foreground">{addon.name}</span>
                                    <span className="text-sm font-semibold text-indigo-400">
                                        {addon.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionReveal>
            </div>
        </div>
    );
}
