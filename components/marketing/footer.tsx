import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";

const FOOTER_SERVICES = [
    { label: "Business Websites", href: "/services" },
    { label: "Platform Development", href: "/services" },
    { label: "UI/UX Redesign", href: "/services" },
    { label: "Client Portals", href: "/services" },
    { label: "E-Commerce", href: "/services" },
    { label: "Growth Retainers", href: "/services" },
];

const FOOTER_COMPANY = [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
];

const FOOTER_LEGAL = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
    return (
        <footer className="border-t-2 border-border bg-background">
            <div className="section-container pt-20 pb-10">
                {/* Main footer grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center font-display font-bold text-white text-lg">
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
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-medium">
                            <Mail className="w-4 h-4" />
                            hello@fixhubtech.com
                        </div>

                        {/* Social links */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://twitter.com/fixhubtech"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com/company/fixhubtech"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com/fixhubtech"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-5 uppercase tracking-widest">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_SERVICES.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-foreground/80 hover:text-indigo-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-5 uppercase tracking-widest">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_COMPANY.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-foreground/80 hover:text-indigo-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / CTA */}
                    <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-5 uppercase tracking-widest">
                            Get Started
                        </h4>
                        <p className="text-sm text-foreground/80 mb-5 leading-relaxed font-medium">
                            Ready to build something great? Let&apos;s talk about your
                            project.
                        </p>
                        <Link href="/quote" className="btn-primary !py-2.5 !px-5 !text-sm mb-3">
                            <span>Request a Quote</span>
                        </Link>
                        <Link href="/audit" className="btn-secondary !py-2.5 !px-5 !text-sm w-full !justify-center">
                            Free Website Audit
                        </Link>
                        
                        <div className="mt-8 flex items-center gap-4">
                            {FOOTER_LEGAL.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-medium text-muted-foreground">
                        &copy; {new Date().getFullYear()} FixHub Technology. All rights
                        reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <p className="text-xs font-medium text-muted-foreground">
                            Built with precision.
                        </p>
                        <Link href="/sign-in" className="text-xs font-medium text-muted-foreground hover:text-indigo-400 transition-colors">
                            Client Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
