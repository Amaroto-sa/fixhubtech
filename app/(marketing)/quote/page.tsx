import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/motion";
import { BUDGET_RANGES, TIMELINE_OPTIONS, CONTACT_METHODS } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Request a Quote",
    description:
        "Get a custom quote for your project. Tell us what you need and we'll respond within 24 hours.",
};

export default function QuotePage() {
    return (
        <div className="pt-32 pb-24">
            <div className="section-container max-w-4xl">
                <SectionReveal>
                    <div className="text-center mb-12">
                        <span className="badge-primary mb-4 inline-flex">Get a Quote</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-6">
                            Tell Us About Your Project
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Fill out the details below and we&apos;ll get back to you within 24
                            hours with a tailored proposal.
                        </p>
                    </div>
                </SectionReveal>

                <SectionReveal delay={0.1}>
                    <div className="card-elevated p-8 sm:p-12">
                        <form className="space-y-8">
                            {/* Your Info */}
                            <div>
                                <h2 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-sm text-indigo-400 font-bold">1</span>
                                    Your Information
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                                        <input type="text" className="input-premium" placeholder="Your name" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
                                        <input type="text" className="input-premium" placeholder="Your company" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                                        <input type="email" className="input-premium" placeholder="you@company.com" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Phone / WhatsApp</label>
                                        <input type="tel" className="input-premium" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Country / City</label>
                                        <input type="text" className="input-premium" placeholder="e.g. Lagos, Nigeria" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
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
                                </div>
                            </div>

                            <div className="divider-gradient" />

                            {/* Project Details */}
                            <div>
                                <h2 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-sm text-indigo-400 font-bold">2</span>
                                    Project Details
                                </h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">What service do you need? *</label>
                                        <select className="input-premium" required>
                                            <option value="">Select a service</option>
                                            <option>Business Website Design</option>
                                            <option>Website Redesign</option>
                                            <option>Landing Page</option>
                                            <option>Restaurant Menu / Order Page</option>
                                            <option>Salon / Spa Booking Page</option>
                                            <option>Hotel / Reservation System</option>
                                            <option>Growth Retainer / Support Plan</option>
                                            <option>Other / Not Sure</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Current Website URL</label>
                                        <input type="url" className="input-premium" placeholder="https://yoursite.com (if applicable)" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Budget Range *</label>
                                            <select className="input-premium" required>
                                                <option value="">Select budget</option>
                                                {BUDGET_RANGES.map((range) => (
                                                    <option key={range} value={range}>{range}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Desired Timeline</label>
                                            <select className="input-premium">
                                                <option value="">Select timeline</option>
                                                {TIMELINE_OPTIONS.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Project Summary *</label>
                                        <textarea
                                            className="input-premium min-h-[140px] resize-none"
                                            placeholder="Describe your project, goals, and any specific requirements..."
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Preferred Contact Method</label>
                                        <select className="input-premium">
                                            <option value="">Select</option>
                                            {CONTACT_METHODS.map((method) => (
                                                <option key={method} value={method}>{method}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full text-base py-4">
                                <span>Submit Quote Request</span>
                                <span>→</span>
                            </button>

                            <p className="text-xs text-muted-foreground text-center">
                                We typically respond within 24 hours. No spam, no pressure — just clarity.
                            </p>
                        </form>
                    </div>
                </SectionReveal>
            </div>
        </div>
    );
}
