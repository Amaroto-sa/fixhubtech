import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/motion";
import { Target, Zap, Sparkles, ShieldCheck, Handshake, TrendingUp } from "lucide-react";
import { db } from "@/db";
import { contentSections } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about FixHub Technology — a premium digital solutions company helping serious businesses build stronger online presence.",
};

export default async function AboutPage() {
    let dbContent: any[] = [];
    try {
        dbContent = await db.select().from(contentSections).where(and(eq(contentSections.page, "about"), eq(contentSections.isActive, true)));
    } catch (e) {
        console.error(e);
    }

    const getContent = (key: string, fallback: { title: string; body: string }) => {
        const section = dbContent.find(s => s.sectionKey === key);
        if (section) {
            return {
                title: section.title || fallback.title,
                body: section.body || fallback.body,
            };
        }
        return fallback;
    };

    const hero = getContent("hero", {
        title: "We Build Digital Experiences That Win",
        body: "FixHub Technology is a premium digital solutions company. We help serious businesses launch, redesign, and manage high-converting websites and digital platforms."
    });

    const mission = getContent("mission", {
        title: "Our Mission",
        body: "To give every business — from local salons to growing tech companies — access to premium-quality digital solutions that were previously only available to well-funded startups. Speed, clarity, and execution are our core pillars."
    });

    const approach = getContent("approach", {
        title: "Our Approach",
        body: "We combine structured project management with modern design and engineering. Every project follows a clear plan with milestones, transparent communication, and measurable outcomes. No guesswork, no scope creep, no excuses."
    });

    return (
        <div className="pt-32 pb-24">
            <div className="section-container max-w-5xl">
                {/* Hero */}
                <SectionReveal>
                    <div className="text-center mb-20">
                        <span className="badge-primary mb-4 inline-flex">About Us</span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
                            {hero.title}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {hero.body}
                        </p>
                    </div>
                </SectionReveal>

                {/* Mission */}
                <SectionReveal>
                    <div className="card-elevated p-10 sm:p-14 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                                    {mission.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {mission.body}
                                </p>
                            </div>
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                                    {approach.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {approach.body}
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
                                { icon: <Target className="w-8 h-8" />, title: "Clarity", desc: "Clear scope, clear pricing, clear timelines." },
                                { icon: <Zap className="w-8 h-8" />, title: "Speed", desc: "Most projects launch in 2–4 weeks." },
                                { icon: <Sparkles className="w-8 h-8" />, title: "Quality", desc: "Premium design standards, no shortcuts." },
                                { icon: <ShieldCheck className="w-8 h-8" />, title: "Trust", desc: "Transparent processes — you always know where you stand." },
                                { icon: <Handshake className="w-8 h-8" />, title: "Partnership", desc: "We're invested in your success, not just the deliverable." },
                                { icon: <TrendingUp className="w-8 h-8" />, title: "Results", desc: "Everything we build is designed to convert and perform." },
                            ].map((value, idx) => (
                                <div key={idx} className="card-elevated p-6 text-center">
                                    <div className="mb-4 text-indigo-400 flex justify-center">{value.icon}</div>
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
