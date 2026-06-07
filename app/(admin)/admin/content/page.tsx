import Link from "next/link";
import { db } from "@/db";
import { contentSections } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    FileEdit,
    ArrowRight,
    Globe
} from "lucide-react";

export default async function ContentManagementPage() {
    let sections: any[] = [];
    let dbError = false;

    try {
        sections = await db.select().from(contentSections).orderBy(asc(contentSections.page), asc(contentSections.sortOrder));
        
        // If empty, let's insert a seed record just so the UI isn't completely blank for the user to start
        if (sections.length === 0) {
            const [newSection] = await db.insert(contentSections).values({
                page: "home",
                sectionKey: "hero",
                title: "Transform Your Business",
                subtitle: "We build digital experiences that drive growth.",
                ctaText: "Get Started",
                ctaLink: "/quote"
            }).returning();
            sections = [newSection];
        }
    } catch (error) {
        console.error("Admin Content DB Error:", error);
        dbError = true;
    }

    // Group sections by page
    const groupedSections = sections.reduce((acc, section) => {
        if (!acc[section.page]) {
            acc[section.page] = [];
        }
        acc[section.page].push(section);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <div className="pb-10 max-w-5xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <FileEdit className="w-8 h-8 text-indigo-400" />
                            Content Management
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Edit the text, headings, and call-to-actions across your public website.
                        </p>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch content sections.
                    </div>
                )}
            </FadeIn>

            <div className="space-y-8">
                {Object.entries(groupedSections).map(([pageName, pageSections]: [string, any], idx: number) => (
                    <SectionReveal key={pageName} delay={idx * 0.1}>
                        <div className="card-elevated bg-[#0a0a0e] overflow-hidden">
                            <div className="p-5 border-b border-white/[0.05] bg-white/[0.01] flex items-center gap-3">
                                <Globe className="w-5 h-5 text-muted-foreground" />
                                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                                    {pageName} Page
                                </h2>
                            </div>
                            <div className="divide-y divide-white/[0.05]">
                                {pageSections.map((section: any) => (
                                    <div key={section.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4 group">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground tracking-tight mb-1">
                                                Section: {section.sectionKey}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {section.title || section.body || "No content written yet."}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${section.isActive ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' : 'text-muted-foreground border-white/10 bg-white/5'}`}>
                                                {section.isActive ? "Live" : "Hidden"}
                                            </span>
                                            <Link 
                                                href={`/admin/content/${section.id}`}
                                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-medium text-foreground transition-colors flex items-center gap-1.5"
                                            >
                                                Edit <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>
                ))}

                {Object.keys(groupedSections).length === 0 && !dbError && (
                    <div className="p-12 text-center border border-white/10 rounded-xl bg-white/[0.01]">
                        <p className="text-muted-foreground">No content sections defined in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
