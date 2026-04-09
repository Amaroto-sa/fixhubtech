import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

const FOOTER_SERVICES = [
    { label: "Business Websites", href: "/services/business-websites" },
    { label: "Website Redesign", href: "/services/website-redesign" },
    { label: "Landing Pages", href: "/services/landing-pages" },
    { label: "Restaurant Pages", href: "/services/restaurant-menu-pages" },
    { label: "Salon Booking", href: "/services/salon-booking-pages" },
    { label: "Support Plans", href: "/services/growth-retainers" },
];

const FOOTER_RESOURCES = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Free Audit", href: "/audit" },
    { label: "Book Consultation", href: "/consultation" },
];

const FOOTER_LEGAL = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
    return (
        <footer className="relative border-t border-border/50 bg-background">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            <div className="section-container pt-20 pb-10">
                {/* Main footer grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-lg shadow-lg shadow-indigo-500/25">
                                F
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-lg text-foreground tracking-tight leading-tight">
                                    FixHub
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-tight">
                                    Technology
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                            Premium digital solutions for serious businesses. We build
                            websites, platforms, and digital systems that convert.
                        </p>
                        {/* Social links placeholder */}
                        <div className="flex items-center gap-3">
                            {["twitter", "linkedin", "instagram"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    aria-label={social}
                                    className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-indigo-500/30 transition-all"
                                >
                                    <span className="text-xs font-medium uppercase">
                                        {social[0]}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_SERVICES.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_RESOURCES.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / CTA */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                            Get Started
                        </h4>
                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                            Ready to build something great? Let&apos;s talk about your
                            project.
                        </p>
                        <Link href="/quote" className="btn-primary !py-2.5 !px-5 !text-sm">
                            <span>Request a Quote</span>
                        </Link>
                        <div className="mt-6 space-y-2">
                            {FOOTER_LEGAL.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="divider-gradient mb-8" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} FixHub Technology. All rights
                        reserved.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Built with precision. Designed for impact.
                    </p>
                </div>
            </div>
        </footer>
    );
}
