"use client";

import Link from "next/link";
import {
    SectionReveal,
    FadeIn,
    ScaleIn,
} from "@/components/shared/motion";

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background effects */}
            <div className="absolute inset-0 bg-hero-glow" />
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.07] blur-[120px] animate-glow-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/[0.05] blur-[100px]" />

            <div className="section-container relative z-10 text-center py-20">
                <FadeIn>
                    <div className="inline-flex items-center gap-2 badge-primary mb-8">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Now Accepting New Projects</span>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 max-w-5xl mx-auto leading-[1.05]">
                        <span className="text-gradient">Build a Stronger</span>
                        <br />
                        <span className="text-gradient-brand">Digital Presence</span>
                    </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                        Premium websites, redesigns, client portals, and digital systems for
                        businesses that want to look serious online. From concept to launch —
                        built with precision, designed for impact.
                    </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/quote" className="btn-primary text-base px-8 py-4">
                            <span>Start a Project</span>
                            <span>→</span>
                        </Link>
                        <Link href="/portfolio" className="btn-secondary text-base px-8 py-4">
                            View Our Work
                        </Link>
                    </div>
                </FadeIn>

                {/* Dashboard mockup preview */}
                <FadeIn delay={0.5}>
                    <div className="mt-20 relative max-w-4xl mx-auto">
                        <div className="absolute -inset-4 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-3xl blur-2xl opacity-40" />
                        <div className="relative card-glass p-1.5 rounded-2xl">
                            <div className="bg-[#0d0d14] rounded-xl overflow-hidden">
                                {/* Mock browser bar */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <div className="bg-secondary/60 rounded-md px-3 py-1 text-xs text-muted-foreground max-w-xs">
                                            fixhubtech.com/dashboard
                                        </div>
                                    </div>
                                </div>
                                {/* Mock dashboard content */}
                                <div className="p-6">
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {[
                                            { label: "Active Projects", value: "12", color: "from-indigo-500/20 to-indigo-500/5" },
                                            { label: "Pending Invoices", value: "3", color: "from-cyan-500/20 to-cyan-500/5" },
                                            { label: "Completion Rate", value: "98%", color: "from-emerald-500/20 to-emerald-500/5" },
                                        ].map((stat) => (
                                            <div
                                                key={stat.label}
                                                className={`bg-gradient-to-b ${stat.color} rounded-xl p-4 border border-border/30`}
                                            >
                                                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                                                <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-4 bg-secondary/30 rounded-lg p-3"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20" />
                                                <div className="flex-1">
                                                    <div className="h-3 bg-secondary rounded w-1/3 mb-1.5" />
                                                    <div className="h-2 bg-secondary/60 rounded w-1/2" />
                                                </div>
                                                <div className="badge-primary !text-xs">In Progress</div>
                                            </div>
                                        ))}
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
        { icon: "⚡", label: "Fast Delivery", detail: "2–4 week turnaround" },
        { icon: "📱", label: "Mobile-First", detail: "Every screen, every device" },
        { icon: "🎯", label: "Conversion-Focused", detail: "Built to perform" },
        { icon: "🛡️", label: "Structured Process", detail: "No guesswork" },
    ];

    return (
        <section className="relative py-16 border-y border-border/30">
            <div className="section-container">
                <SectionReveal>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustItems.map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <p className="font-semibold text-foreground text-sm mb-1">
                                    {item.label}
                                </p>
                                <p className="text-xs text-muted-foreground">{item.detail}</p>
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
            icon: "🌐",
            title: "Business Websites",
            description: "Custom-built, conversion-optimized websites that make your business look premium and professional.",
            href: "/services/business-websites",
        },
        {
            icon: "🔄",
            title: "Website Redesign",
            description: "Transform your outdated site into a modern digital experience that builds trust instantly.",
            href: "/services/website-redesign",
        },
        {
            icon: "📄",
            title: "Landing Pages",
            description: "High-converting landing pages designed to capture leads and drive specific business actions.",
            href: "/services/landing-pages",
        },
        {
            icon: "🍽️",
            title: "Restaurant Pages",
            description: "Menu display, online ordering, and reservation systems built for the food industry.",
            href: "/services/restaurant-menu-pages",
        },
        {
            icon: "💈",
            title: "Salon & Spa Booking",
            description: "Beautiful booking experiences with service menus, pricing, and client management.",
            href: "/services/salon-booking-pages",
        },
        {
            icon: "🏨",
            title: "Hospitality Systems",
            description: "Reservation platforms and guest management for hotels, lodges, and hospitality brands.",
            href: "/services/hospitality-systems",
        },
    ];

    return (
        <section className="py-24 lg:py-32 relative">
            <div className="section-container">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Our Services</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6">
                            Everything You Need to Win Online
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            From brand-new builds to complete overhauls — we design and develop
                            digital experiences that convert visitors into customers.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <Link href={service.href} className="block group">
                                <div className="card-elevated p-8 h-full">
                                    <div className="text-4xl mb-5">{service.icon}</div>
                                    <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-indigo-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-sm text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Learn more
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </Link>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================
// PLATFORM PREVIEW
// ============================================================
function PlatformPreview() {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent" />
            <div className="section-container relative">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">The Platform</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6">
                            Your Projects, Organized
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            No more scattered emails and files. Track every project, milestone,
                            invoice, and file from one beautiful dashboard.
                        </p>
                    </div>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                title: "Client Dashboard",
                                items: ["Project tracking", "File uploads", "Invoice payments", "Revision requests"],
                                color: "from-indigo-500/10",
                            },
                            {
                                title: "Project Workspace",
                                items: ["Milestone timeline", "Status updates", "Direct messaging", "Deliverable downloads"],
                                color: "from-violet-500/10",
                            },
                            {
                                title: "Admin Console",
                                items: ["Lead pipeline", "Content CMS", "Usage analytics", "Team management"],
                                color: "from-cyan-500/10",
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className={`card-elevated p-8 bg-gradient-to-b ${feature.color} to-transparent`}
                            >
                                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                                    {feature.title}
                                </h3>
                                <ul className="space-y-3">
                                    {feature.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

// ============================================================
// INDUSTRIES
// ============================================================
function IndustriesSection() {
    const industries = [
        { icon: "🍽️", name: "Restaurants & Cafés", slug: "restaurants" },
        { icon: "💈", name: "Salons & Spas", slug: "salons-spas" },
        { icon: "🏨", name: "Hotels & Hospitality", slug: "hotels-hospitality" },
        { icon: "🔧", name: "Service Businesses", slug: "service-businesses" },
        { icon: "🏠", name: "Real Estate", slug: "real-estate" },
    ];

    return (
        <section className="py-24 lg:py-32">
            <div className="section-container">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Industries</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6">
                            Built for Your Industry
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We understand the unique needs of different industries and build
                            solutions tailored to drive results in your market.
                        </p>
                    </div>
                </SectionReveal>

                <div className="flex flex-wrap justify-center gap-4">
                    {industries.map((industry, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.08}>
                            <Link
                                href={`/industries/${industry.slug}`}
                                className="group flex items-center gap-3 card-elevated px-6 py-4"
                            >
                                <span className="text-2xl">{industry.icon}</span>
                                <span className="text-sm font-medium text-foreground group-hover:text-indigo-400 transition-colors">
                                    {industry.name}
                                </span>
                            </Link>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================
// PROCESS
// ============================================================
function ProcessSection() {
    const steps = [
        {
            step: "01",
            title: "Request",
            description: "Submit a quote request or book a free consultation. Tell us what you need.",
        },
        {
            step: "02",
            title: "Plan",
            description: "We review your requirements, define the scope, and create a clear project plan.",
        },
        {
            step: "03",
            title: "Build",
            description: "Our team designs and develops your solution with regular updates and milestones.",
        },
        {
            step: "04",
            title: "Launch",
            description: "Final review, revisions, and deployment. Your project goes live with full support.",
        },
    ];

    return (
        <section className="py-24 lg:py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent" />
            <div className="section-container relative">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">How It Works</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6">
                            Simple, Structured Process
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            From first contact to final delivery — a clear path with no
                            surprises.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {steps.map((step, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.12}>
                            <div className="relative card-elevated p-8 text-center">
                                <div className="font-display text-4xl font-bold text-indigo-500/20 mb-4">
                                    {step.step}
                                </div>
                                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-center text-muted-foreground/30 text-lg">
                                        →
                                    </div>
                                )}
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================
// PRICING PREVIEW
// ============================================================
function PricingPreview() {
    const plans = [
        {
            name: "Starter",
            price: "499",
            description: "Perfect for small businesses getting online for the first time.",
            features: ["5-page website", "Mobile responsive", "Contact form", "Basic SEO", "1 revision round"],
            highlighted: false,
        },
        {
            name: "Growth",
            price: "1,499",
            description: "For businesses ready to scale their online presence.",
            features: [
                "10-page website",
                "Custom design",
                "CMS integration",
                "Advanced SEO",
                "3 revision rounds",
                "Analytics setup",
            ],
            highlighted: true,
        },
        {
            name: "Premium",
            price: "3,499",
            description: "Full-scale digital solution for serious brands.",
            features: [
                "Unlimited pages",
                "Custom platform",
                "Client portal",
                "Payment integration",
                "Priority support",
                "Ongoing maintenance",
            ],
            highlighted: false,
        },
    ];

    return (
        <section className="py-24 lg:py-32">
            <div className="section-container">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Pricing</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6">
                            Transparent Pricing
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Choose a package that fits your needs. All plans include premium
                            design and development quality.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                                    <span className="font-display text-4xl font-bold text-foreground">
                                        ${plan.price}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                    {plan.description}
                                </p>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-400">
                                                ✓
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/quote"
                                    className={plan.highlighted ? "btn-primary w-full" : "btn-secondary w-full"}
                                >
                                    <span>Get Started</span>
                                </Link>
                            </div>
                        </SectionReveal>
                    ))}
                </div>

                <SectionReveal delay={0.3}>
                    <p className="text-center text-sm text-muted-foreground mt-8">
                        Need something custom?{" "}
                        <Link href="/quote" className="text-indigo-400 hover:underline">
                            Request a custom quote →
                        </Link>
                    </p>
                </SectionReveal>
            </div>
        </section>
    );
}

// ============================================================
// TESTIMONIALS
// ============================================================
function TestimonialsSection() {
    const testimonials = [
        {
            content: "FixHub completely transformed our online presence. The new website brought in 3x more inquiries in the first month alone.",
            author: "Sarah J.",
            title: "Owner, Bella Salon & Spa",
            rating: 5,
        },
        {
            content: "Professional, fast, and the design quality is outstanding. Our restaurant now has a beautiful online menu that our customers love.",
            author: "Marcus D.",
            title: "GM, The Golden Fork",
            rating: 5,
        },
        {
            content: "The client portal made everything so easy — files, invoices, communication. Working with FixHub feels like working with a top-tier agency.",
            author: "Priya K.",
            title: "CEO, TechVenture Solutions",
            rating: 5,
        },
    ];

    return (
        <section className="py-24 lg:py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
            <div className="section-container relative">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Testimonials</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6">
                            What Our Clients Say
                        </h2>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {testimonials.map((t, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <div className="card-elevated p-8 h-full flex flex-col">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <span key={i} className="text-amber-400 text-sm">★</span>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                                    &ldquo;{t.content}&rdquo;
                                </p>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                                    <p className="text-xs text-muted-foreground">{t.title}</p>
                                </div>
                            </div>
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
        <section className="py-24 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.06] to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/[0.08] blur-[150px] rounded-full" />

            <div className="section-container relative z-10 text-center">
                <SectionReveal>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6 max-w-3xl mx-auto">
                        Ready to Build Something Great?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                        Let&apos;s discuss your project. Get a free consultation or request a
                        custom quote — no pressure, just clarity.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/quote" className="btn-primary text-base px-8 py-4">
                            <span>Request a Quote</span>
                            <span>→</span>
                        </Link>
                        <Link href="/audit" className="btn-secondary text-base px-8 py-4">
                            Get a Free Audit
                        </Link>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

// ============================================================
// FEATURED WORK
// ============================================================
function FeaturedWork() {
    const projects = [
        {
            title: "Bella Salon & Spa",
            category: "Salon Booking Platform",
            industry: "Beauty & Wellness",
        },
        {
            title: "The Golden Fork",
            category: "Restaurant Menu + Ordering",
            industry: "Food & Beverage",
        },
        {
            title: "Horizon Suites",
            category: "Hotel Reservation System",
            industry: "Hospitality",
        },
    ];

    return (
        <section className="py-24 lg:py-32">
            <div className="section-container">
                <SectionReveal>
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <span className="badge-primary mb-4 inline-flex">Portfolio</span>
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
                                Featured Work
                            </h2>
                        </div>
                        <Link
                            href="/portfolio"
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
                        >
                            View all projects <span>→</span>
                        </Link>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <div className="group card-elevated overflow-hidden">
                                {/* Image placeholder */}
                                <div className="aspect-[16/10] bg-gradient-to-br from-indigo-500/10 to-violet-500/10 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-4xl opacity-20">🖥️</div>
                                    </div>
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="btn-primary !py-2 !px-4 !text-xs">
                                            <span>View Project</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-xs text-indigo-400 mb-2">{project.industry}</p>
                                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{project.category}</p>
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================
// WHY CHOOSE FIXHUB
// ============================================================
function WhyFixHub() {
    const reasons = [
        {
            icon: "✨",
            title: "Premium Design Quality",
            description: "Every project is designed to feel high-end. No generic templates, no shortcuts.",
        },
        {
            icon: "🚀",
            title: "Fast Turnaround",
            description: "Most projects launch in 2–4 weeks. We move fast without sacrificing quality.",
        },
        {
            icon: "🔒",
            title: "Structured Process",
            description: "Clear milestones, regular updates, and organized communication from day one.",
        },
        {
            icon: "💬",
            title: "Dedicated Support",
            description: "Direct access to your project team. No ticket waiting, no runaround.",
        },
    ];

    return (
        <section className="py-24 lg:py-32 relative">
            <div className="section-container">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Why FixHub</span>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6">
                            Built Different
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We&apos;re not a template shop or a freelance marketplace. We&apos;re a
                            premium digital solutions partner for businesses that take their
                            online presence seriously.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {reasons.map((reason, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <div className="card-elevated p-8 flex gap-5">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl flex-shrink-0">
                                    {reason.icon}
                                </div>
                                <div>
                                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                                        {reason.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {reason.description}
                                    </p>
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================
// HOMEPAGE
// ============================================================
export default function HomePage() {
    return (
        <>
            <HeroSection />
            <TrustStrip />
            <ServicesSection />
            <PlatformPreview />
            <FeaturedWork />
            <IndustriesSection />
            <ProcessSection />
            <WhyFixHub />
            <PricingPreview />
            <TestimonialsSection />
            <FinalCTA />
        </>
    );
}
