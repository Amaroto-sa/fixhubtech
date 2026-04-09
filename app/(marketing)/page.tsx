"use client";

import Link from "next/link";
import {
    SectionReveal,
    FadeIn,
    ScaleIn,
    SpotlightCard,
} from "@/components/shared/motion";
import {
    LayoutDashboard,
    Globe,
    RefreshCw,
    LayoutTemplate,
    Utensils,
    Scissors,
    Building,
    ArrowRight,
    Zap,
    Smartphone,
    Target,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";

// ============================================================
// BRAND BADGE
// ============================================================
function BrandBadge({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300 tracking-wide uppercase">{children}</span>
        </div>
    );
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Dark premium gradient backdrops */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="section-container relative z-10 text-center py-20 mt-10">
                <FadeIn delay={0.1}>
                    <BrandBadge>Now Accepting Projects</BrandBadge>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <h1 className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-8 max-w-5xl mx-auto leading-[1.05] text-balance">
                        <span className="text-foreground">Build a Stronger</span>
                        <br />
                        <span className="text-gradient-brand">Digital Presence.</span>
                    </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <p className="text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
                        Premium websites, redesigns, client portals, and robust digital systems
                        for businesses that refuse to settle for templates. Fast execution. Zero compromises.
                    </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/quote" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                            <span>Start a Project</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/portfolio" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
                            View Our Work
                        </Link>
                    </div>
                </FadeIn>

                {/* Dashboard Application Mockup */}
                <FadeIn delay={0.6}>
                    <div className="mt-24 relative max-w-5xl mx-auto perspective-1000">
                        {/* Glow Behind Mockup */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-[32px] blur-3xl opacity-30 pointer-events-none" />

                        <div className="relative card-glass p-2 rounded-2xl md:rounded-[24px] shadow-2xl shadow-black/50 transform-gpu rotate-x-12 scale-95 transition-transform duration-700 hover:rotate-x-0 hover:scale-100">
                            <div className="bg-[#0a0a0e] rounded-xl md:rounded-[20px] overflow-hidden border border-white/5">
                                {/* Browser Toolbar */}
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] bg-white/[0.01]">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10" />
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10" />
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10" />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="bg-white/[0.03] border border-white/[0.05] rounded-md px-4 py-1 text-[11px] font-medium text-muted-foreground/60 tracking-wider">
                                            app.fixhubtech.com
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard Content */}
                                <div className="p-6 md:p-10 flex gap-8">
                                    {/* Sidebar Mock */}
                                    <div className="hidden md:flex flex-col gap-4 w-48 border-r border-white/[0.02] pr-6">
                                        <div className="h-4 w-24 bg-white/10 rounded-sm mb-6" />
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="flex gap-3 items-center">
                                                <div className="w-4 h-4 rounded bg-white/5" />
                                                <div className="h-2 w-full bg-white/5 rounded-sm" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Main Content Mock */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-8">
                                            <div className="h-6 w-32 bg-white/10 rounded" />
                                            <div className="h-8 w-8 rounded-full bg-indigo-500/20 border border-indigo-500/30" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                                                    <div className="h-8 w-8 rounded-full bg-white/5 mb-3" />
                                                    <div className="h-5 w-16 bg-white/10 rounded mb-2" />
                                                    <div className="h-2 w-24 bg-white/5 rounded" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-3">
                                            {[1, 2].map(i => (
                                                <div key={i} className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10" />
                                                        <div>
                                                            <div className="h-3 w-32 bg-white/10 rounded mb-1.5" />
                                                            <div className="h-2 w-20 bg-white/5 rounded" />
                                                        </div>
                                                    </div>
                                                    <div className="h-6 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

// ============================================================
// TRUST STRIP
// ============================================================
function TrustStrip() {
    const trustItems = [
        { icon: <Zap className="w-5 h-5 text-indigo-400" />, label: "Fast Delivery", detail: "2–4 week turnaround" },
        { icon: <Smartphone className="w-5 h-5 text-indigo-400" />, label: "Mobile-First", detail: "Flawless on every screen" },
        { icon: <Target className="w-5 h-5 text-indigo-400" />, label: "Conversion-Focused", detail: "Engineered to perform" },
        { icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />, label: "Structured Process", detail: "Zero guesswork" },
    ];

    return (
        <section className="relative py-12 border-y border-white/[0.05] bg-white/[0.01]">
            <div className="section-container">
                <SectionReveal>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustItems.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="mb-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                    {item.icon}
                                </div>
                                <p className="font-medium text-foreground text-sm tracking-tight mb-1">
                                    {item.label}
                                </p>
                                <p className="text-[13px] text-muted-foreground/70">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

// ============================================================
// SERVICES OVERVIEW
// ============================================================
function ServicesSection() {
    const services = [
        {
            icon: <Globe className="w-6 h-6 text-indigo-400" />,
            title: "Business Websites",
            description: "Custom-built, conversion-optimized platforms that make your business look like an industry leader.",
            href: "/services/business-websites",
        },
        {
            icon: <RefreshCw className="w-6 h-6 text-indigo-400" />,
            title: "Website Redesign",
            description: "Transform your outdated site into a modern digital experience that builds absolute trust.",
            href: "/services/website-redesign",
        },
        {
            icon: <LayoutTemplate className="w-6 h-6 text-indigo-400" />,
            title: "Landing Pages",
            description: "High-converting landing pages engineered to capture leads and drive specific business actions.",
            href: "/services/landing-pages",
        },
        {
            icon: <Utensils className="w-6 h-6 text-indigo-400" />,
            title: "Restaurant Pages",
            description: "Beautiful menu displays, integrated online ordering, and smooth reservation systems.",
            href: "/services/restaurant-menu-pages",
        },
        {
            icon: <Scissors className="w-6 h-6 text-indigo-400" />,
            title: "Salon Booking",
            description: "Frictionless booking experiences mapping service menus to client management.",
            href: "/services/salon-booking-pages",
        },
        {
            icon: <Building className="w-6 h-6 text-indigo-400" />,
            title: "Hospitality Systems",
            description: "High-end reservation platforms tailored for hotels, lodges, and luxury hospitality brands.",
            href: "/services/hospitality-systems",
        },
    ];

    return (
        <section className="py-32 relative">
            <div className="section-container">
                <SectionReveal>
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <BrandBadge>Our Capabilities</BrandBadge>
                        <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient mb-6 text-balance">
                            Everything You Need to Win Online.
                        </h2>
                        <p className="text-lg text-muted-foreground/80 leading-relaxed text-balance">
                            From brand-new builds to complete architectural overhauls — we design and develop
                            digital platforms that convert passive visitors into paying customers.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <SpotlightCard className="h-full">
                                <Link href={service.href} className="block group p-8 lg:p-10 h-full">
                                    <div className="mb-6 inline-flex p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                    <h3 className="font-display text-xl font-medium tracking-tight text-foreground mb-3 group-hover:text-indigo-300 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-[15px] text-muted-foreground/70 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="mt-8 flex items-center gap-2 text-sm font-medium text-indigo-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        Explore service <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </SpotlightCard>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================
// PROJECT PROCESS
// ============================================================
function ProcessSection() {
    const steps = [
        {
            step: "01",
            title: "Discovery & Scope",
            description: "We review your requirements, define the core metrics of success, and create a precise technical plan.",
        },
        {
            step: "02",
            title: "Design & UX",
            description: "Drafting the wireframes and applying a premium design system tailored exactly to your brand.",
        },
        {
            step: "03",
            title: "Development",
            description: "Writing clean, scalable code. You track everything through your dedicated client dashboard.",
        },
        {
            step: "04",
            title: "Launch & Support",
            description: "Final quality assurance, deployment, and ongoing priority support to keep you scaling.",
        },
    ];

    return (
        <section className="py-32 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.05),transparent_50%)]" />
            <div className="section-container relative">
                <SectionReveal>
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <BrandBadge>Methodology</BrandBadge>
                        <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient mb-6 text-balance">
                            Engineered for Predictability.
                        </h2>
                        <p className="text-lg text-muted-foreground/80 leading-relaxed text-balance">
                            No endless email chains. No missed deadlines. Just a transparent, structured process.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    <div className="hidden lg:block absolute top-[44%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

                    {steps.map((step, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <SpotlightCard className="h-full relative z-10 bg-[#0a0a0e]">
                                <div className="p-8">
                                    <div className="font-display text-4xl font-bold tracking-tighter text-white/5 mb-6">
                                        {step.step}
                                    </div>
                                    <h3 className="font-display text-lg font-medium tracking-tight text-foreground mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-[14px] text-muted-foreground/70 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </SpotlightCard>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================
// PORTFOLIO PREVIEW
// ============================================================
function PortfolioPreview() {
    return (
        <section className="py-32 relative border-y border-white/[0.05] bg-white/[0.01]">
            <div className="section-container">
                <SectionReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-2xl">
                            <BrandBadge>Featured Work</BrandBadge>
                            <h2 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-gradient mb-4">
                                Proof of Quality.
                            </h2>
                            <p className="text-lg text-muted-foreground/80 leading-relaxed">
                                See how we transform ordinary businesses into premium digital brands.
                            </p>
                        </div>
                        <Link href="/portfolio" className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-indigo-400 transition-colors pb-2">
                            View case studies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <SpotlightCard>
                                <Link href="/portfolio" className="block group">
                                    {/* Project Image Panel */}
                                    <div className="aspect-[4/3] bg-[#0a0a0e] relative overflow-hidden flex items-center justify-center p-8 border-b border-white/[0.05]">
                                        {/* Abstract UI composition */}
                                        <div className="absolute inset-x-8 -bottom-4 top-8 rounded-t-xl bg-white/[0.03] border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                                            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                            </div>
                                            <div className="p-4 space-y-3">
                                                <div className="w-1/3 h-4 bg-white/10 rounded" />
                                                <div className="w-full h-16 bg-white/[0.02] rounded border border-white/5" />
                                                <div className="w-2/3 h-16 bg-white/[0.02] rounded border border-white/5" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Data */}
                                    <div className="p-6">
                                        <div className="text-[11px] font-medium tracking-widest uppercase text-indigo-400/80 mb-2">Web Application</div>
                                        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-indigo-300 transition-colors">
                                            Premium Logistics Portal
                                        </h3>
                                    </div>
                                </Link>
                            </SpotlightCard>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================
// FINAL CTA
// ============================================================
function FinalCTA() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)]" />

            <div className="section-container relative z-10 text-center">
                <SectionReveal>
                    <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gradient mb-8 max-w-4xl mx-auto text-balance">
                        Ready to elevate your standards?
                    </h2>
                    <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 text-balance">
                        Stop losing clients to competitors with better websites. Request a custom quote today and get a strategic breakdown.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/quote" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                            <span>Start a Project</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

// ============================================================
// MAIN EXPORT
// ============================================================
export default function HomePage() {
    return (
        <div className="w-full flex-col">
            <HeroSection />
            <TrustStrip />
            <ServicesSection />
            <ProcessSection />
            <PortfolioPreview />
            <FinalCTA />
        </div>
    );
}
