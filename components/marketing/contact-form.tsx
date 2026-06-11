"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
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
            <div className="card-elevated p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Message Sent!</h2>
                <p className="text-muted-foreground mb-8">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="btn-secondary">
                    Send another message
                </button>
            </div>
        );
    }

    return (
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
    );
}
