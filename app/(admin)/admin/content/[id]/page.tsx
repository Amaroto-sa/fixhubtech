import Link from "next/link";
import { db } from "@/db";
import { contentSections } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { updateContentSection } from "../actions";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

export default async function EditContentPage({ params }: { params: { id: string } }) {
    const sectionId = params.id;
    
    let sectionData: any = null;
    try {
        const [result] = await db
            .select()
            .from(contentSections)
            .where(eq(contentSections.id, sectionId));
            
        sectionData = result;
    } catch (error) {
        console.error("Failed to fetch content section:", error);
    }

    if (!sectionData) {
        notFound();
    }

    async function handleSubmit(formData: FormData) {
        "use server";
        const result = await updateContentSection(sectionId, formData);
        if (result.success) {
            redirect("/admin/content");
        }
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex items-center gap-4">
                    <Link 
                        href="/admin/content"
                        className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            Edit Content: {sectionData.sectionKey}
                        </h1>
                        <p className="text-muted-foreground/80 text-sm uppercase tracking-wider mt-1">
                            Page: {sectionData.page}
                        </p>
                    </div>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                    <form action={handleSubmit} className="space-y-6">
                        
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium text-foreground">Heading / Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                defaultValue={sectionData.title || ""}
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subtitle" className="text-sm font-medium text-foreground">Subtitle</label>
                            <input 
                                type="text" 
                                id="subtitle" 
                                name="subtitle" 
                                defaultValue={sectionData.subtitle || ""}
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="body" className="text-sm font-medium text-foreground">Main Body Text</label>
                            <textarea 
                                id="body" 
                                name="body" 
                                rows={6}
                                defaultValue={sectionData.body || ""}
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            ></textarea>
                            <p className="text-xs text-muted-foreground mt-1">Accepts basic text. Formatting depends on where it is displayed on the site.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="space-y-2">
                                <label htmlFor="ctaText" className="text-sm font-medium text-foreground">Button Text</label>
                                <input 
                                    type="text" 
                                    id="ctaText" 
                                    name="ctaText" 
                                    defaultValue={sectionData.ctaText || ""}
                                    placeholder="e.g. Learn More"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="ctaLink" className="text-sm font-medium text-foreground">Button Link</label>
                                <input 
                                    type="text" 
                                    id="ctaLink" 
                                    name="ctaLink" 
                                    defaultValue={sectionData.ctaLink || ""}
                                    placeholder="e.g. /contact"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <input 
                                type="checkbox" 
                                id="isActive" 
                                name="isActive" 
                                defaultChecked={sectionData.isActive}
                                className="w-4 h-4 rounded border-white/20 bg-black/50 text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-0"
                            />
                            <label htmlFor="isActive" className="text-sm font-medium text-foreground">
                                Make this section live on the website
                            </label>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Link 
                                href="/admin/content"
                                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Save Content
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
