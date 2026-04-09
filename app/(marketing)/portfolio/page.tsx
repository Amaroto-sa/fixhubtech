import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/motion";

export const metadata: Metadata = {
    title: "Portfolio",
    description:
        "See our latest work. FixHub Technology creates premium websites, booking platforms, and digital solutions for businesses worldwide.",
};

const portfolioItems = [
    {
        title: "Bella Salon & Spa",
        slug: "bella-salon",
        industry: "Beauty & Wellness",
        services: ["Salon Booking Platform", "Brand Design"],
        summary:
            "A complete digital transformation for a premium salon — online booking, service catalog, and client management.",
        isFeatured: true,
    },
    {
        title: "The Golden Fork",
        slug: "the-golden-fork",
        industry: "Food & Beverage",
        services: ["Restaurant Menu Page", "Online Ordering"],
        summary:
            "Digital menu and ordering system that increased online orders by 150% in the first quarter.",
        isFeatured: true,
    },
    {
        title: "Horizon Suites",
        slug: "horizon-suites",
        industry: "Hospitality",
        services: ["Hotel Website", "Reservation System"],
        summary:
            "Luxury hotel website with integrated room booking, photo galleries, and guest experience pages.",
        isFeatured: true,
    },
    {
        title: "UrbanFit Gym",
        slug: "urbanfit-gym",
        industry: "Health & Fitness",
        services: ["Business Website", "Membership Portal"],
        summary:
            "Modern gym website with class schedules, membership plans, and a member login portal.",
        isFeatured: false,
    },
    {
        title: "NovaTech Solutions",
        slug: "novatech-solutions",
        industry: "Technology",
        services: ["Website Redesign", "Client Dashboard"],
        summary:
            "Complete website overhaul for a B2B tech company — modern design, case studies, and client portal.",
        isFeatured: false,
    },
    {
        title: "Green Meadows Realty",
        slug: "green-meadows",
        industry: "Real Estate",
        services: ["Property Website", "Listing Platform"],
        summary:
            "Real estate website with property listings, search filters, virtual tours, and agent profiles.",
        isFeatured: false,
    },
];

export default function PortfolioPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="section-container">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Our Work</span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
                            Projects That Perform
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Every project is built to convert, designed to impress, and
                            delivered on time. Here&apos;s a sample of our work.
                        </p>
                    </div>
                </SectionReveal>

                {/* Portfolio grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {portfolioItems.map((item, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.08}>
                            <Link href={`/portfolio/${item.slug}`} className="group block h-full">
                                <div className="card-elevated overflow-hidden h-full flex flex-col">
                                    {/* Image area */}
                                    <div className="aspect-[16/10] bg-gradient-to-br from-indigo-500/10 to-violet-500/10 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-5xl opacity-15">🖥️</div>
                                        </div>
                                        {item.isFeatured && (
                                            <div className="absolute top-4 left-4">
                                                <span className="badge-primary !text-xs">Featured</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] to-transparent opacity-60" />
                                    </div>
                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs text-indigo-400 font-medium">
                                                {item.industry}
                                            </span>
                                        </div>
                                        <h2 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-indigo-400 transition-colors">
                                            {item.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                                            {item.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.services.map((s, i) => (
                                                <span key={i} className="badge !text-xs">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SectionReveal>
                    ))}
                </div>

                {/* CTA */}
                <SectionReveal>
                    <div className="text-center">
                        <p className="text-muted-foreground mb-6">
                            Want your business featured here?
                        </p>
                        <Link href="/quote" className="btn-primary">
                            <span>Start Your Project</span>
                            <span>→</span>
                        </Link>
                    </div>
                </SectionReveal>
            </div>
        </div>
    );
}
