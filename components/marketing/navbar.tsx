"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10"
                    : "bg-transparent"
                }`}
        >
            <nav className="section-container flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-lg shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
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

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link
                        href="/sign-in"
                        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link href="/quote" className="btn-primary !py-2.5 !px-6 !text-sm">
                        <span>Get a Quote</span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-foreground"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-2" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""
                            }`}
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border/50 transition-all duration-300 ${isMobileOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <div className="section-container py-6 flex flex-col gap-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-white/[0.04] rounded-lg transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="divider-gradient my-4" />
                    <div className="flex flex-col gap-3 px-4">
                        <Link
                            href="/sign-in"
                            className="btn-secondary !justify-center"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/quote"
                            className="btn-primary !justify-center"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <span>Get a Quote</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
