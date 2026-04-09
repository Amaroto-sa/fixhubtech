import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/motion";

export const metadata: Metadata = {
    title: "Services",
    description:
        "Explore FixHub Technology's premium digital services — business websites, redesigns, landing pages, restaurant menus, salon booking, and hospitality systems.",
};

const allServices = [
    {
        icon: "🌐",
        title: "Business Website Design",
        slug: "business-websites",
        description:
            "Custom-built, conversion-optimized websites that make your business look premium and credible from the first visit.",
        features: [
            "Custom design from scratch",
            "Mobile-first responsive layout",
            "SEO-ready structure",
            "Contact forms & lead capture",
            "Fast load times",
        ],
        startingPrice: "$499",
    },
    {
        icon: "🔄",
        title: "Website Redesign",
        slug: "website-redesign",
        description:
            "Transform your outdated website into a modern, high-performing digital experience that builds instant trust.",
        features: [
            "Full visual overhaul",
            "Content restructuring",
            "Performance optimization",
            "Modern UI/UX patterns",
            "SEO migration support",
        ],
        startingPrice: "$799",
    },
    {
        icon: "📄",
        title: "Landing Pages",
        slug: "landing-pages",
        description:
            "High-converting landing pages designed to capture leads, promote offers, and drive specific business actions.",
        features: [
            "Conversion-focused design",
            "A/B test ready",
            "Fast deployment",
            "Analytics integration",
            "Mobile optimized",
        ],
        startingPrice: "$299",
    },
    {
        icon: "🍽️",
        title: "Restaurant Menu & Order Pages",
        slug: "restaurant-menu-pages",
        description:
            "Beautiful online menus, ordering systems, and table reservations built specifically for the food industry.",
        features: [
            "Digital menu display",
            "Online ordering flow",
            "Reservation system",
            "Photo gallery",
            "Location & hours",
        ],
        startingPrice: "$699",
    },
    {
        icon: "💈",
        title: "Salon & Spa Booking",
        slug: "salon-booking-pages",
        description:
            "Elegant booking experiences with service menus, pricing displays, and client management for beauty businesses.",
        features: [
            "Service catalog",
            "Online booking system",
            "Staff profiles",
            "Pricing display",
            "Gallery showcase",
        ],
        startingPrice: "$699",
    },
    {
        icon: "🏨",
        title: "Hospitality & Reservations",
        slug: "hospitality-systems",
        description:
            "Reservation platforms and guest management solutions for hotels, lodges, and hospitality brands.",
        features: [
            "Room/suite showcase",
            "Booking system",
            "Guest management",
            "Photo galleries",
            "Rate calendar",
        ],
        startingPrice: "$999",
    },
    {
        icon: "📈",
        title: "Growth Retainers",
        slug: "growth-retainers",
        description:
            "Ongoing support plans for maintenance, updates, performance monitoring, and continuous improvement.",
        features: [
            "Monthly maintenance",
            "Content updates",
            "Performance monitoring",
            "Security patches",
            "Priority support",
        ],
        startingPrice: "$199/mo",
    },
    {
        icon: "📍",
        title: "Local Visibility",
        slug: "local-visibility",
        description:
            "Google Business optimization and local SEO services to help you get found by customers in your area.",
        features: [
            "Google Business setup",
            "Local SEO optimization",
            "Review management",
            "Citation building",
            "Analytics tracking",
        ],
        startingPrice: "$299",
    },
];

export default function ServicesPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="section-container">
                {/* Header */}
                <SectionReveal>
                    <div className="text-center mb-20">
                        <span className="badge-primary mb-4 inline-flex">Our Services</span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
                            Premium Digital Solutions
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            From brand-new website builds to complete digital overhauls — we
                            design and develop experiences that convert visitors into paying
                            customers.
                        </p>
                    </div>
                </SectionReveal>

                {/* Services grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {allServices.map((service, idx) => (
                        <SectionReveal key={idx} delay={idx * 0.08}>
                            <Link
                                href={`/services/${service.slug}`}
                                className="group block h-full"
                            >
                                <div className="card-elevated p-8 h-full flex flex-col">
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl flex-shrink-0">
                                            {service.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-indigo-400 transition-colors mb-2">
                                                {service.title}
                                            </h2>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-6 flex-1">
                                        {service.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                                        <span className="text-sm text-muted-foreground">
                                            From{" "}
                                            <span className="font-semibold text-foreground">
                                                {service.startingPrice}
                                            </span>
                                        </span>
                                        <span className="text-sm text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            Learn more →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SectionReveal>
                    ))}
                </div>

                {/* CTA */}
                <SectionReveal>
                    <div className="card-glass p-12 text-center max-w-3xl mx-auto glow-indigo">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-4">
                            Not sure which service you need?
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Request a free audit and we&apos;ll recommend the best solution for
                            your business.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/audit" className="btn-primary">
                                <span>Get a Free Audit</span>
                            </Link>
                            <Link href="/quote" className="btn-secondary">
                                Request Custom Quote
                            </Link>
                        </div>
                    </div>
                </SectionReveal>
            </div>
        </div>
    );
}
