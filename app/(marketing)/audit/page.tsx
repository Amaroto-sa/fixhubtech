import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/motion";

export const metadata: Metadata = {
    title: "Free Website Audit",
    description:
        "Get a free website audit from FixHub Technology. We'll review your current website and recommend improvements.",
};

export default function AuditPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="section-container max-w-3xl">
                <SectionReveal>
                    <div className="text-center mb-12">
                        <span className="badge-primary mb-4 inline-flex">Free Audit</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-6">
                            Get a Free Website Audit
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Not sure what your website needs? Let us take a look and give you
                            clear, actionable recommendations — completely free.
                        </p>
                    </div>
                </SectionReveal>

                <SectionReveal delay={0.1}>
                    <div className="card-elevated p-8 sm:p-10">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Business Name *
                                </label>
                                <input type="text" className="input-premium" placeholder="Your business name" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Website URL *
                                </label>
                                <input type="url" className="input-premium" placeholder="https://yourwebsite.com" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Industry
                                </label>
                                <select className="input-premium">
                                    <option value="">Select industry</option>
                                    <option>Restaurant / Café</option>
                                    <option>Salon / Spa</option>
                                    <option>Hotel / Hospitality</option>
                                    <option>Service Business</option>
                                    <option>Real Estate</option>
                                    <option>E-commerce</option>
                                    <option>Technology</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    What&apos;s your main issue? *
                                </label>
                                <textarea
                                    className="input-premium min-h-[120px] resize-none"
                                    placeholder="e.g., Low traffic, outdated design, not mobile-friendly, slow loading..."
                                    required
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Email *
                                    </label>
                                    <input type="email" className="input-premium" placeholder="you@company.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        WhatsApp
                                    </label>
                                    <input type="tel" className="input-premium" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full text-base py-4">
                                <span>Request Free Audit</span>
                                <span>→</span>
                            </button>

                            <p className="text-xs text-muted-foreground text-center">
                                We&apos;ll review your site and email you a summary within 48 hours. No strings attached.
                            </p>
                        </form>
                    </div>
                </SectionReveal>
            </div>
        </div>
    );
}
