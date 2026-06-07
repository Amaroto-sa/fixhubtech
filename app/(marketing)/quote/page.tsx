"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionReveal } from "@/components/shared/motion";
import { BUDGET_RANGES, TIMELINE_OPTIONS, CONTACT_METHODS } from "@/lib/constants";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function QuotePage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const form = e.currentTarget;
        const formData = new FormData(form);
        const body = {
            name: formData.get("name") as string,
            businessName: (formData.get("businessName") as string) || undefined,
            email: formData.get("email") as string,
            phone: (formData.get("phone") as string) || undefined,
            countryCity: (formData.get("countryCity") as string) || undefined,
            industry: (formData.get("industry") as string) || undefined,
            serviceNeeded: formData.get("serviceNeeded") as string,
            currentWebsite: (formData.get("currentWebsite") as string) || undefined,
            budgetRange: formData.get("budgetRange") as string,
            timeline: (formData.get("timeline") as string) || undefined,
            projectSummary: formData.get("projectSummary") as string,
            preferredContact: (formData.get("preferredContact") as string) || undefined,
        };

        try {
            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            form.reset();
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to submit quote request");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="pt-32 pb-24">
                <div className="section-container max-w-2xl text-center">
                    <div className="card-elevated p-12 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Quote Request Received!</h1>
                        <p className="text-muted-foreground mb-8">Thank you! We&apos;ll review your project details and get back to you within 24 hours with a tailored proposal.</p>
                        <Link href="/" className="btn-primary">
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                        {status === "error" && (
                            <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                                {errorMsg}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Your Info */}
                            <div>
                                <h2 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-sm text-indigo-400 font-bold">1</span>
                                    Your Information
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                                        <input type="text" name="name" className="input-premium" placeholder="Your name" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
                                        <input type="text" name="businessName" className="input-premium" placeholder="Your company" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                                        <input type="email" name="email" className="input-premium" placeholder="you@company.com" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Phone / WhatsApp</label>
                                        <input type="tel" name="phone" className="input-premium" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Country / City</label>
                                        <input type="text" name="countryCity" className="input-premium" placeholder="e.g. Lagos, Nigeria" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
                                        <select name="industry" className="input-premium">
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
                                        <select name="serviceNeeded" className="input-premium" required>
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
                                        <input type="url" name="currentWebsite" className="input-premium" placeholder="https://yoursite.com (if applicable)" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Budget Range *</label>
                                            <select name="budgetRange" className="input-premium" required>
                                                <option value="">Select budget</option>
                                                {BUDGET_RANGES.map((range) => (
                                                    <option key={range} value={range}>{range}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Desired Timeline</label>
                                            <select name="timeline" className="input-premium">
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
                                            name="projectSummary"
                                            className="input-premium min-h-[140px] resize-none"
                                            placeholder="Describe your project, goals, and any specific requirements..."
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Preferred Contact Method</label>
                                        <select name="preferredContact" className="input-premium">
                                            <option value="">Select</option>
                                            {CONTACT_METHODS.map((method) => (
                                                <option key={method} value={method}>{method}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full text-base py-4" disabled={status === "loading"}>
                                {status === "loading" ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                ) : (
                                    <>
                                        <span>Submit Quote Request</span>
                                        <span>→</span>
                                    </>
                                )}
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
