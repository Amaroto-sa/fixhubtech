"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionReveal } from "@/components/shared/motion";
import { Mail, MessageCircle, Clock, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
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
            email: formData.get("email") as string,
            phone: (formData.get("phone") as string) || undefined,
            subject: (formData.get("subject") as string) || undefined,
            message: formData.get("message") as string,
        };

        try {
            const res = await fetch("/api/contact", {
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
            setErrorMsg(err.message || "Failed to send message");
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
                        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Message Sent!</h1>
                        <p className="text-muted-foreground mb-8">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
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
            <div className="section-container">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Contact</span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
                            Let&apos;s Talk
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Have a project in mind? Need a quote? Or just want to say hello?
                            We&apos;d love to hear from you.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                    {/* Contact form */}
                    <SectionReveal className="lg:col-span-3">
                        <div className="card-elevated p-8 sm:p-10">
                            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                                Send us a message
                            </h2>
                            {status === "error" && (
                                <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                                    {errorMsg}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="input-premium"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="input-premium"
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="input-premium"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            className="input-premium"
                                            placeholder="What's this about?"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        className="input-premium min-h-[160px] resize-none"
                                        placeholder="Tell us about your project, your goals, or anything you need help with..."
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full" disabled={status === "loading"}>
                                    {status === "loading" ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                    ) : (
                                        <span>Send Message</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </SectionReveal>

                    {/* Contact info */}
                    <SectionReveal className="lg:col-span-2" delay={0.2}>
                        <div className="space-y-6">
                            <div className="card-elevated p-8">
                                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                                    Quick Contact
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5"><Mail className="w-5 h-5 text-indigo-400" /></span>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="text-sm text-foreground">hello@fixhubtech.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5"><MessageCircle className="w-5 h-5 text-indigo-400" /></span>
                                        <div>
                                            <p className="text-sm text-muted-foreground">WhatsApp</p>
                                            <p className="text-sm text-foreground">+1 (555) 000-0000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5"><Clock className="w-5 h-5 text-indigo-400" /></span>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Business Hours</p>
                                            <p className="text-sm text-foreground">Mon – Fri, 9am – 6pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-elevated p-8">
                                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                                    Prefer a structured conversation?
                                </h3>
                                <p className="text-sm text-muted-foreground mb-5">
                                    Book a free 15-minute consultation to discuss your project in
                                    detail.
                                </p>
                                <Link href="/consultation" className="btn-secondary w-full !justify-center">
                                    Book Consultation
                                </Link>
                            </div>

                            <div className="card-glass p-8">
                                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                                    Need a quote?
                                </h3>
                                <p className="text-sm text-muted-foreground mb-5">
                                    Fill out our detailed quote form and get a response within 24
                                    hours.
                                </p>
                                <Link href="/quote" className="btn-primary w-full !justify-center">
                                    <span>Request a Quote</span>
                                </Link>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </div>
    );
}

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with FixHub Technology. We'd love to hear about your project and discuss how we can help.",
};

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="section-container">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="badge-primary mb-4 inline-flex">Contact</span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
                            Let&apos;s Talk
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Have a project in mind? Need a quote? Or just want to say hello?
                            We&apos;d love to hear from you.
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                    {/* Contact form */}
                    <SectionReveal className="lg:col-span-3">
                        <div className="card-elevated p-8 sm:p-10">
                            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                                Send us a message
                            </h2>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            className="input-premium"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            className="input-premium"
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            className="input-premium"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            className="input-premium"
                                            placeholder="What's this about?"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        className="input-premium min-h-[160px] resize-none"
                                        placeholder="Tell us about your project, your goals, or anything you need help with..."
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full">
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </div>
                    </SectionReveal>

                    {/* Contact info */}
                    <SectionReveal className="lg:col-span-2" delay={0.2}>
                        <div className="space-y-6">
                            <div className="card-elevated p-8">
                                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                                    Quick Contact
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5"><Mail className="w-5 h-5 text-indigo-400" /></span>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="text-sm text-foreground">hello@fixhubtech.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5"><MessageCircle className="w-5 h-5 text-indigo-400" /></span>
                                        <div>
                                            <p className="text-sm text-muted-foreground">WhatsApp</p>
                                            <p className="text-sm text-foreground">+1 (555) 000-0000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5"><Clock className="w-5 h-5 text-indigo-400" /></span>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Business Hours</p>
                                            <p className="text-sm text-foreground">Mon – Fri, 9am – 6pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-elevated p-8">
                                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                                    Prefer a structured conversation?
                                </h3>
                                <p className="text-sm text-muted-foreground mb-5">
                                    Book a free 15-minute consultation to discuss your project in
                                    detail.
                                </p>
                                <Link href="/consultation" className="btn-secondary w-full !justify-center">
                                    Book Consultation
                                </Link>
                            </div>

                            <div className="card-glass p-8">
                                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                                    Need a quote?
                                </h3>
                                <p className="text-sm text-muted-foreground mb-5">
                                    Fill out our detailed quote form and get a response within 24
                                    hours.
                                </p>
                                <Link href="/quote" className="btn-primary w-full !justify-center">
                                    <span>Request a Quote</span>
                                </Link>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </div>
    );
}
