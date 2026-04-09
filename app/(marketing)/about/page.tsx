import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/motion";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about FixHub Technology — a premium digital solutions company helping serious businesses build stronger online presence.",
};

export default function AboutPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="section-container max-w-5xl">
                {/* Hero */}
                <SectionReveal>
                    <div className="text-center mb-20">
                        <span className="badge-primary mb-4 inline-flex">About Us</span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
                            We Build Digital Experiences That Win
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            FixHub Technology is a premium digital solutions company. We help
                            serious businesses launch, redesign, and manage high-converting
                            websites and digital platforms.
                        </p>
                    </div>
                </SectionReveal>

                {/* Mission */}
                <SectionReveal>
                    <div className="card-elevated p-10 sm:p-14 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                                    Our Mission
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    To give every business — from local salons to growing tech
                                    companies — access to premium-quality digital solutions that
                                    were previously only available to well-funded startups. Speed,
                                    clarity, and execution are our core pillars.
                                </p>
                            </div>
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                                    Our Approach
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We combine structured project management with modern design and
                                    engineering. Every project follows a clear plan with milestones,
                                    transparent communication, and measurable outcomes. No
                                    guesswork, no scope creep, no excuses.
                                </p>
                            </div>
                        </div>
                    </div>
                </SectionReveal>

                {/* Values */}
                <SectionReveal>
                    <div className="mb-20">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                            What We Stand For
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: "🎯", title: "Clarity", desc: "Clear scope, clear pricing, clear timelines." },
                                { icon: "⚡", title: "Speed", desc: "Most projects launch in 2–4 weeks." },
                                { icon: "✨", title: "Quality", desc: "Premium design standards, no shortcuts." },
                                { icon: "🔒", title: "Trust", desc: "Transparent processes — you always know where you stand." },
                                { icon: "🤝", title: "Partnership", desc: "We're invested in your success, not just the deliverable." },
                                { icon: "📈", title: "Results", desc: "Everything we build is designed to convert and perform." },
                            ].map((value, idx) => (
                                <div key={idx} className="card-elevated p-6 text-center">
                                    <div className="text-3xl mb-3">{value.icon}</div>
                                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionReveal>

                {/* CTA */}
                <SectionReveal>
                    <div className="card-glass p-12 text-center glow-indigo">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-4">
                            Ready to Work Together?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                            Let&apos;s build something great. Start with a conversation — no
                            pressure, no commitment.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/quote" className="btn-primary">
                                <span>Request a Quote</span>
                            </Link>
                            <Link href="/consultation" className="btn-secondary">
                                Book Consultation
                            </Link>
                        </div>
                    </div>
                </SectionReveal>
            </div>
        </div>
    );
}
