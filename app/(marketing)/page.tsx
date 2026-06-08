// Server Component

import Link from "next/link";
import {
    SectionReveal,
    FadeIn,
    ScaleIn,
    SpotlightCard,
} from "@/components/shared/motion";
import { ChevronRight, Globe, RefreshCw, LayoutTemplate, Utensils, Scissors, Building, Terminal, Target, ArrowRight, ShieldCheck, Zap, Server, Box, LayoutDashboard, Smartphone, CheckCircle2 } from "lucide-react";
import { db } from "@/db";
import { services, portfolioItems } from "@/db/schema";
import { eq, desc, asc } from "drizzle-orm";

// ============================================================
// BRAND BADGE
// ============================================================
function BrandBadge({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 backdrop-blur-md px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">{children}</span>
        </div>
    );
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
            <div className="absolute inset-0 bg-background pointer-events-none" />
            
            {/* Extremely subtle grid background for depth without clutter */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.01] mix-blend-multiply pointer-events-none" />

            <div className="section-container relative z-10 text-center flex flex-col items-center justify-center mt-12">
                <FadeIn delay={0.1}>
                    <BrandBadge>Now Accepting Projects</BrandBadge>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <h1 className="mt-10 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium tracking-tight mb-8 max-w-5xl mx-auto leading-[1.05] text-balance text-foreground">
                        Design that moves your business forward.
                    </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed text-balance font-light">
                        We build premium digital experiences, client portals, and brand websites designed to elevate your online presence and convert visitors into loyal customers.
                    </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link href="/quote" className="btn-primary text-base px-8 py-4 w-full sm:w-auto shadow-xl shadow-indigo-500/20">
                            Start a Project
                        </Link>
                        <Link href="/portfolio" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto bg-transparent border-border hover:bg-secondary">
                            View Our Work
                        </Link>
                    </div>
                </FadeIn>
                
                {/* Elegant abstract visual anchor instead of a fake browser mockup */}
                <FadeIn delay={0.6}>
                    <div className="mt-28 relative w-full max-w-4xl mx-auto aspect-[21/9] rounded-3xl overflow-hidden bg-secondary/30 border border-border/50">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-violet-500/5" />
                        <div className="absolute inset-0 backdrop-blur-[100px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                        <div className="relative h-full w-full flex items-center justify-center">
                            <span className="font-display text-2xl tracking-widest text-muted-foreground/30 uppercase font-light">FixHub Digital</span>
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
        { icon: <Zap className="w-5 h-5 text-foreground" />, label: "Fast Delivery", detail: "2–4 week turnaround" },
        { icon: <Smartphone className="w-5 h-5 text-foreground" />, label: "Mobile-First", detail: "Flawless on every screen" },
        { icon: <Target className="w-5 h-5 text-foreground" />, label: "Conversion-Focused", detail: "Engineered to perform" },
        { icon: <ShieldCheck className="w-5 h-5 text-foreground" />, label: "Structured Process", detail: "Zero guesswork" },
    ];

    return (
        <section className="relative py-12 border-y border-border/50 bg-secondary/20">
            <div className="section-container">
                <SectionReveal>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustItems.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="mb-3 p-3 rounded-xl bg-background border border-border/50 shadow-sm">
                                    {item.icon}
                                </div>
                                <p className="font-medium text-foreground text-sm tracking-tight mb-1">
                                    {item.label}
                                </p>
                                <p className="text-[13px] text-muted-foreground">{item.detail}</p>
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
async function ServicesSection() {
    let dbServices: any[] = [];
    try {
        dbServices = await db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.sortOrder)).limit(6);
    } catch (e) {
        console.error(e);
    }

    const displayServices = dbServices.length > 0 ? dbServices.map((s: any) => ({
        icon: <Box className="w-6 h-6 text-indigo-400" />,
        title: s.title,
        description: s.shortDescription || "",
        href: `/services/${s.slug}`,
    })) : [
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
                    {displayServices.map((service, idx) => (
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
async function PortfolioPreview() {
    let dbPortfolio: any[] = [];
    try {
        dbPortfolio = await db.select().from(portfolioItems).where(eq(portfolioItems.status, 'published')).orderBy(desc(portfolioItems.createdAt)).limit(3);
    } catch (e) {
        console.error(e);
    }

    const displayItems = dbPortfolio.length > 0 ? dbPortfolio.map((p: any, idx: number) => ({
        category: p.industry || "General",
        title: p.title,
        color: idx === 0 ? "indigo" : idx === 1 ? "emerald" : "violet",
        slug: p.slug
    })) : [
        { category: "Web Application", title: "Premium Logistics Portal", color: "indigo", slug: "" },
        { category: "E-Commerce", title: "Luxury Fashion Storefront", color: "emerald", slug: "" },
        { category: "SaaS Dashboard", title: "FinTech Analytics Platform", color: "violet", slug: "" },
    ];

    return (
        <section className="py-32 relative border-y border-border/50 bg-secondary/10">
            <div className="section-container">
                <SectionReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-2xl">
                            <BrandBadge>Featured Work</BrandBadge>
                            <h2 className="mt-6 font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground mb-4">
                                Proof of Quality.
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed font-light">
                                See how we transform ordinary businesses into premium digital brands.
                            </p>
                        </div>
                        <Link href="/portfolio" className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-indigo-500 transition-colors pb-2">
                            View case studies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayItems.map((project, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <SpotlightCard>
                                <Link href={project.slug ? `/portfolio/${project.slug}` : "/portfolio"} className="block group">
                                    {/* Sleek Abstract Project Visual */}
                                    <div className="aspect-[4/3] bg-secondary/30 relative overflow-hidden flex items-center justify-center p-8 border-b border-border/50">
                                        <div className={`absolute inset-0 bg-gradient-to-tr opacity-20 ${idx === 0 ? 'from-indigo-500 to-transparent' : idx === 1 ? 'from-emerald-500 to-transparent' : 'from-violet-500 to-transparent'}`} />
                                        <div className="w-16 h-16 rounded-2xl bg-background border border-border/50 flex items-center justify-center shadow-sm relative z-10">
                                            <span className={`text-xl font-display font-light ${idx === 0 ? 'text-indigo-500' : idx === 1 ? 'text-emerald-500' : 'text-violet-500'}`}>
                                                {project.title.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Data */}
                                    <div className="p-6">
                                        <div className={`text-[11px] font-medium tracking-widest uppercase mb-2 ${idx === 0 ? 'text-indigo-500' : idx === 1 ? 'text-emerald-500' : 'text-violet-500'}`}>{project.category}</div>
                                        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-indigo-500 transition-colors">
                                            {project.title}
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
        <section className="py-32 relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04),transparent_70%)]" />

            <div className="section-container relative z-10 text-center">
                <SectionReveal>
                    <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-foreground mb-8 max-w-4xl mx-auto text-balance">
                        Ready to elevate your standards?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance font-light">
                        Stop losing clients to competitors with better websites. Request a custom quote today and get a strategic breakdown.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/quote" className="btn-primary text-base px-8 py-4 w-full sm:w-auto shadow-xl shadow-indigo-500/20">
                            Start a Project
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
