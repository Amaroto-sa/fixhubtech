"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionReveal } from "@/components/shared/motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function AuditPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const form = e.currentTarget;
        const formData = new FormData(form);
        const body = {
            businessName: formData.get("businessName") as string,
            websiteUrl: formData.get("websiteUrl") as string,
            industry: (formData.get("industry") as string) || undefined,
            mainIssue: formData.get("mainIssue") as string,
            email: formData.get("email") as string,
            whatsapp: (formData.get("whatsapp") as string) || undefined,
        };

        try {
            const res = await fetch("/api/audit", {
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
            setErrorMsg(err.message || "Failed to submit audit request");
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
                        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Audit Request Received!</h1>
                        <p className="text-muted-foreground mb-8">We&apos;ll review your site and email you a summary within 48 hours. No strings attached.</p>
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
                        {status === "error" && (
                            <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                                {errorMsg}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Business Name *
                                </label>
                                <input type="text" name="businessName" className="input-premium" placeholder="Your business name" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Website URL *
                                </label>
                                <input type="url" name="websiteUrl" className="input-premium" placeholder="https://yourwebsite.com" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Industry
                                </label>
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
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    What&apos;s your main issue? *
                                </label>
                                <textarea
                                    name="mainIssue"
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
                                    <input type="email" name="email" className="input-premium" placeholder="you@company.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        WhatsApp
                                    </label>
                                    <input type="tel" name="whatsapp" className="input-premium" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full text-base py-4" disabled={status === "loading"}>
                                {status === "loading" ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                ) : (
                                    <>
                                        <span>Request Free Audit</span>
                                        <span>→</span>
                                    </>
                                )}
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
