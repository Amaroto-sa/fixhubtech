import Link from "next/link";
import { SectionReveal } from "@/components/shared/motion";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

export default async function ContactPage() {
    let settingsMap: Record<string, string> = {};
    try {
        const settings = await db.select().from(siteSettings);
        settings.forEach(s => {
            settingsMap[s.key] = s.value;
        });
    } catch (error) {
        console.error("Failed to fetch contact settings:", error);
    }

    const contactEmail = settingsMap["contact_email"] || "hello@fixhubtech.com";
    const contactWhatsapp = settingsMap["contact_whatsapp"] || "+1 (555) 000-0000";
    const businessHours = settingsMap["business_hours"] || "Mon – Fri, 9am – 6pm";

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
                        <ContactForm />
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
                                            <p className="text-sm text-foreground">{contactEmail}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5"><MessageCircle className="w-5 h-5 text-indigo-400" /></span>
                                        <div>
                                            <p className="text-sm text-muted-foreground">WhatsApp / Phone</p>
                                            <p className="text-sm text-foreground">{contactWhatsapp}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5"><Clock className="w-5 h-5 text-indigo-400" /></span>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Business Hours</p>
                                            <p className="text-sm text-foreground">{businessHours}</p>
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
