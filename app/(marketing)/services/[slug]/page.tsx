import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionReveal } from "@/components/shared/motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";

const FALLBACK_SERVICE_DATA: Record<string, {
    title: string;
    description: string;
    features: string[];
    process: string[];
    startingPrice: string;
    timeline: string;
}> = {
    "business-websites": {
        title: "Business Website Design",
        description: "Custom-built, conversion-optimized websites that make your business look premium and credible from the first visit. We design every pixel from scratch — no templates, no shortcuts.",
        features: ["Custom design from scratch", "Mobile-first responsive layout", "SEO-ready structure", "Contact forms & lead capture", "Fast load times", "Analytics integration", "Content management system", "SSL & security setup"],
        process: ["Discovery call to understand your brand", "Wireframe & layout approval", "Full design in Figma", "Development & testing", "Launch & handover"],
        startingPrice: "$499",
        timeline: "2–3 weeks",
    },
    "website-redesign": {
        title: "Website Redesign",
        description: "Transform your outdated website into a modern, high-performing digital experience that builds instant trust. We audit your current site, identify conversion killers, and rebuild from the ground up.",
        features: ["Full visual overhaul", "Content restructuring", "Performance optimization", "Modern UI/UX patterns", "SEO migration support", "Mobile responsiveness", "Speed improvements", "Analytics setup"],
        process: ["Audit of your current site", "Competitive analysis", "New design direction", "Development & migration", "QA & launch"],
        startingPrice: "$799",
        timeline: "3–4 weeks",
    },
    "landing-pages": {
        title: "Landing Pages",
        description: "High-converting landing pages designed to capture leads, promote offers, and drive specific business actions. Built for speed, optimized for conversions.",
        features: ["Conversion-focused design", "A/B test ready", "Fast deployment", "Analytics integration", "Mobile optimized", "Lead capture forms", "Social proof sections", "Speed optimized"],
        process: ["Brief & goal alignment", "Copy + design draft", "Development", "Testing & launch"],
        startingPrice: "$299",
        timeline: "1–2 weeks",
    },
    "restaurant-menu-pages": {
        title: "Restaurant Menu & Order Pages",
        description: "Beautiful online menus, ordering systems, and table reservations built specifically for the food industry. Give your customers a seamless digital experience.",
        features: ["Digital menu display", "Online ordering flow", "Reservation system", "Photo gallery", "Location & hours", "Special offers section", "Mobile-friendly menu", "Social media integration"],
        process: ["Menu content collection", "Design & UX mapping", "Development & testing", "Staff training & launch"],
        startingPrice: "$699",
        timeline: "2–3 weeks",
    },
    "salon-booking-pages": {
        title: "Salon & Spa Booking",
        description: "Elegant booking experiences with service menus, pricing displays, and client management for beauty businesses. Let your clients book 24/7.",
        features: ["Service catalog", "Online booking system", "Staff profiles", "Pricing display", "Gallery showcase", "Client reviews", "Contact integration", "Gift card support"],
        process: ["Service & pricing setup", "Design & branding", "Booking system integration", "Testing & launch"],
        startingPrice: "$699",
        timeline: "2–3 weeks",
    },
    "hospitality-systems": {
        title: "Hospitality & Reservations",
        description: "Reservation platforms and guest management solutions for hotels, lodges, and hospitality brands. Premium design meets powerful functionality.",
        features: ["Room/suite showcase", "Booking system", "Guest management", "Photo galleries", "Rate calendar", "Amenity listings", "Location maps", "Review integration"],
        process: ["Property audit & content", "Design & UX", "Booking engine setup", "Testing & go-live"],
        startingPrice: "$999",
        timeline: "3–4 weeks",
    },
    "growth-retainers": {
        title: "Growth Retainers",
        description: "Ongoing support plans for maintenance, updates, performance monitoring, and continuous improvement. Keep your site sharp without lifting a finger.",
        features: ["Monthly maintenance", "Content updates", "Performance monitoring", "Security patches", "Priority support", "Monthly reports", "Uptime monitoring", "Backup management"],
        process: ["Onboarding & audit", "Monthly sprint planning", "Execution & reporting", "Continuous optimization"],
        startingPrice: "$199/mo",
        timeline: "Ongoing",
    },
    "local-visibility": {
        title: "Local Visibility",
        description: "Google Business optimization and local SEO services to help you get found by customers in your area. Dominate local search results.",
        features: ["Google Business setup", "Local SEO optimization", "Review management", "Citation building", "Analytics tracking", "Keyword research", "Competitor analysis", "Monthly reporting"],
        process: ["Local audit", "Optimization plan", "Implementation", "Monthly monitoring"],
        startingPrice: "$299",
        timeline: "Ongoing",
    },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const dbService = await db.select().from(services).where(eq(services.slug, params.slug)).limit(1);
        if (dbService.length > 0) {
            return {
                title: dbService[0].title,
                description: (dbService[0].shortDescription || "").slice(0, 160),
            };
        }
    } catch (e) {}
    
    const service = FALLBACK_SERVICE_DATA[params.slug];
    if (!service) return { title: "Service Not Found" };
    return {
        title: service.title,
        description: service.description.slice(0, 160),
    };
}

export async function generateStaticParams() {
    return Object.keys(FALLBACK_SERVICE_DATA).map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
    let service: any = null;

    try {
        const dbService = await db.select().from(services).where(eq(services.slug, params.slug)).limit(1);
        if (dbService.length > 0) {
            const s = dbService[0];
            service = {
                title: s.title,
                description: s.fullDescription || s.shortDescription || "",
                features: s.features || [],
                process: s.process || [],
                startingPrice: s.startingPrice ? `$${s.startingPrice}` : "Custom",
                timeline: s.timeline || "TBD",
            };
        }
    } catch (e) {
        console.error(e);
    }

    if (!service) {
        service = FALLBACK_SERVICE_DATA[params.slug];
    }
    
    if (!service) notFound();

    return (
        <div className="pt-32 pb-24">
            <div className="section-container max-w-4xl">
                <SectionReveal>
                    <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Services
                    </Link>

                    <div className="mb-12">
                        <span className="badge-primary mb-4 inline-flex">Service</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-6">
                            {service.title}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            {service.description}
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <SectionReveal className="lg:col-span-2">
                        <div className="card-elevated p-8">
                            <h2 className="font-display text-xl font-semibold text-foreground mb-6">What&apos;s Included</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {(service.features || []).map((feature: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.1}>
                        <div className="card-glass p-8 glow-indigo text-center">
                            <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                            <p className="font-display text-4xl font-bold text-foreground mb-2">{service.startingPrice}</p>
                            <p className="text-sm text-muted-foreground mb-6">Timeline: {service.timeline}</p>
                            <Link href="/quote" className="btn-primary w-full !justify-center">
                                <span>Get a Quote</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </SectionReveal>
                </div>

                <SectionReveal>
                    <div className="card-elevated p-8 mb-16">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-6">Our Process</h2>
                        <div className="space-y-4">
                            {(service.process || []).map((step: string, i: number) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-sm text-indigo-400 font-bold flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-muted-foreground pt-1.5">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionReveal>

                <SectionReveal>
                    <div className="card-glass p-12 text-center glow-indigo">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-4">
                            Ready to get started?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                            Request a custom quote and we&apos;ll get back to you within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/quote" className="btn-primary">
                                <span>Request a Quote</span>
                            </Link>
                            <Link href="/consultation" className="btn-secondary">
                                Book Consultation
                            </Link>
                        </div>
                    </div>
                </SectionReveal>
            </div>
        </div>
    );
}
