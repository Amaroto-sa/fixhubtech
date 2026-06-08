import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionReveal } from "@/components/shared/motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Monitor } from "lucide-react";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";
import { eq } from "drizzle-orm";

const FALLBACK_PORTFOLIO_DATA: Record<string, {
    title: string;
    industry: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string[];
    services: string[];
}> = {
    "bella-salon": {
        title: "Bella Salon & Spa",
        industry: "Beauty & Wellness",
        summary: "A complete digital transformation for a premium salon — online booking, service catalog, and client management.",
        challenge: "Bella Salon was relying on phone bookings and walk-ins, missing 40% of potential clients who searched online. Their old website was outdated and not mobile-friendly.",
        solution: "We designed a stunning, mobile-first booking platform with real-time availability, a full service catalog with pricing, and automated confirmation emails. The brand was elevated with premium visuals and a cohesive color palette.",
        results: ["65% increase in online bookings", "40% reduction in no-shows via reminders", "3x more Google reviews within 2 months", "Mobile traffic up 120%"],
        services: ["Salon Booking Platform", "Brand Design"],
    },
    "the-golden-fork": {
        title: "The Golden Fork",
        industry: "Food & Beverage",
        summary: "Digital menu and ordering system that increased online orders by 150% in the first quarter.",
        challenge: "The Golden Fork was losing revenue to delivery apps charging 30% commission. They needed their own online ordering system that was fast, beautiful, and easy to manage.",
        solution: "We built a custom ordering platform with a visual menu, real-time order tracking, and WhatsApp notifications. The system integrated directly with their kitchen workflow.",
        results: ["150% increase in direct online orders", "Eliminated 30% delivery app commission", "Average order value up 22%", "5-star Google rating maintained"],
        services: ["Restaurant Menu Page", "Online Ordering"],
    },
    "horizon-suites": {
        title: "Horizon Suites",
        industry: "Hospitality",
        summary: "Luxury hotel website with integrated room booking, photo galleries, and guest experience pages.",
        challenge: "Horizon Suites had a generic template website that didn't reflect their luxury brand. Booking was handled through third-party OTAs, costing them significant commission fees.",
        solution: "We created a premium hotel website with immersive photo galleries, virtual room tours, a direct booking engine, and a concierge contact system. The design matched their 5-star positioning.",
        results: ["35% increase in direct bookings", "Reduced OTA dependency by 50%", "Guest inquiry rate up 80%", "Average stay duration increased 1.2 nights"],
        services: ["Hotel Website", "Reservation System"],
    },
    "urbanfit-gym": {
        title: "UrbanFit Gym",
        industry: "Health & Fitness",
        summary: "Modern gym website with class schedules, membership plans, and a member login portal.",
        challenge: "UrbanFit had no digital presence beyond social media. Members had no way to check schedules, sign up for classes, or manage their memberships online.",
        solution: "We built a dynamic website with real-time class schedules, online membership sign-up, trainer profiles, and a member portal for tracking attendance and payments.",
        results: ["200+ new member sign-ups in month one", "Class booking efficiency up 70%", "Member retention improved 25%", "Staff time saved on admin tasks"],
        services: ["Business Website", "Membership Portal"],
    },
    "novatech-solutions": {
        title: "NovaTech Solutions",
        industry: "Technology",
        summary: "Complete website overhaul for a B2B tech company — modern design, case studies, and client portal.",
        challenge: "NovaTech's website looked dated and didn't convey the sophistication of their enterprise solutions. Lead conversion from the website was under 1%.",
        solution: "We redesigned their entire web presence with a focus on trust signals: case studies, client logos, ROI metrics, and a clean service architecture. Added a client portal for project tracking.",
        results: ["Lead conversion rate up to 4.2%", "Average time on site increased 3x", "Enterprise inquiries doubled", "Client portal reduced support emails by 60%"],
        services: ["Website Redesign", "Client Dashboard"],
    },
    "green-meadows": {
        title: "Green Meadows Realty",
        industry: "Real Estate",
        summary: "Real estate website with property listings, search filters, virtual tours, and agent profiles.",
        challenge: "Green Meadows was posting listings only on third-party platforms, missing the opportunity to build their own brand and capture buyer data directly.",
        solution: "We built a custom property listing platform with advanced search filters, virtual tour embeds, saved searches, and agent profiles. Integrated with their CRM for lead management.",
        results: ["300% more direct buyer inquiries", "Agent productivity up 40%", "Brand recognition improved significantly", "Listing page engagement up 5x"],
        services: ["Property Website", "Listing Platform"],
    },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const dbPortfolio = await db.select().from(portfolioItems).where(eq(portfolioItems.slug, params.slug)).limit(1);
        if (dbPortfolio.length > 0) {
            return {
                title: `${dbPortfolio[0].title} — Case Study`,
                description: (dbPortfolio[0].summary || "").slice(0, 160),
            };
        }
    } catch (e) {}

    const project = FALLBACK_PORTFOLIO_DATA[params.slug];
    if (!project) return { title: "Project Not Found" };
    return {
        title: `${project.title} — Case Study`,
        description: project.summary.slice(0, 160),
    };
}

export async function generateStaticParams() {
    return Object.keys(FALLBACK_PORTFOLIO_DATA).map((slug) => ({ slug }));
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
    let project: any = null;

    try {
        const dbPortfolio = await db.select().from(portfolioItems).where(eq(portfolioItems.slug, params.slug)).limit(1);
        if (dbPortfolio.length > 0) {
            const p = dbPortfolio[0];
            project = {
                title: p.title,
                industry: p.industry || "General",
                summary: p.summary || "",
                challenge: p.challenge || "Not provided.",
                solution: p.solution || "Not provided.",
                results: p.servicesDelivered || [], // Reusing this for results if needed, or maybe screenshots
                services: p.servicesDelivered || [],
            };
        }
    } catch (e) {
        console.error(e);
    }

    if (!project) {
        project = FALLBACK_PORTFOLIO_DATA[params.slug];
    }

    if (!project) notFound();

    return (
        <div className="pt-32 pb-24">
            <div className="section-container max-w-4xl">
                <SectionReveal>
                    <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                    </Link>

                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="badge-primary">{project.industry}</span>
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-6">
                            {project.title}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            {project.summary}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            {(project.services || []).map((s: string, i: number) => (
                                <span key={i} className="badge !text-xs">{s}</span>
                            ))}
                        </div>
                    </div>
                </SectionReveal>

                {/* Project Image */}
                <SectionReveal delay={0.1}>
                    <div className="aspect-[16/9] bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-2xl overflow-hidden relative mb-16 border border-border/50">
                        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Monitor className="w-16 h-16 text-white opacity-10" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] to-transparent opacity-40" />
                    </div>
                </SectionReveal>

                {/* Challenge */}
                <SectionReveal>
                    <div className="card-elevated p-8 mb-8">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">The Challenge</h2>
                        <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
                    </div>
                </SectionReveal>

                {/* Solution */}
                <SectionReveal>
                    <div className="card-elevated p-8 mb-8">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">Our Solution</h2>
                        <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                    </div>
                </SectionReveal>

                {/* Results */}
                <SectionReveal>
                    <div className="card-glass p-8 glow-indigo mb-16">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-6">Results</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(project.results || []).map((result: string, i: number) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    {result}
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionReveal>

                {/* CTA */}
                <SectionReveal>
                    <div className="card-elevated p-12 text-center">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-4">
                            Want similar results?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                            Let&apos;s build something that works just as hard as you do.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/quote" className="btn-primary">
                                <span>Request a Quote</span>
                                <ArrowRight className="w-4 h-4" />
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
