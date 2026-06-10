import Link from "next/link";
import { redirect } from "next/navigation";
import { updatePortfolioItem } from "../actions";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    Image as ImageIcon,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
    const items = await db.select().from(portfolioItems).where(eq(portfolioItems.id, params.id)).limit(1);
    const item = items[0];

    if (!item) {
        redirect("/admin/portfolio");
    }

    const imageUrl = item.screenshots && item.screenshots.length > 0 ? item.screenshots[0] : "";

    async function handleSubmit(formData: FormData) {
        "use server";
        const result = await updatePortfolioItem(params.id, formData);
        if (result.success) {
            redirect("/admin/portfolio");
        }
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex items-center gap-4">
                    <Link 
                        href="/admin/portfolio"
                        className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <ImageIcon className="w-6 h-6 text-indigo-400" />
                            Edit Portfolio Item
                        </h1>
                        <p className="text-muted-foreground/80 text-sm">
                            Update case study information.
                        </p>
                    </div>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                    <form action={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium text-foreground">Project Title *</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    defaultValue={item.title}
                                    required
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="clientName" className="text-sm font-medium text-foreground">Client Name</label>
                                <input 
                                    type="text" 
                                    id="clientName" 
                                    name="clientName"
                                    defaultValue={item.clientName || ""} 
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="slug" className="text-sm font-medium text-foreground">URL Slug</label>
                                <input 
                                    type="text" 
                                    id="slug" 
                                    name="slug" 
                                    defaultValue={item.slug}
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="status" className="text-sm font-medium text-foreground">Status</label>
                                <select 
                                    id="status" 
                                    name="status" 
                                    defaultValue={item.status}
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="summary" className="text-sm font-medium text-foreground">Summary</label>
                            <textarea 
                                id="summary" 
                                name="summary" 
                                rows={4}
                                defaultValue={item.summary || ""}
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="imageUrl" className="text-sm font-medium text-foreground">Project Image URL</label>
                            <input 
                                type="url" 
                                id="imageUrl" 
                                name="imageUrl" 
                                defaultValue={imageUrl}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                            {imageUrl && (
                                <div className="mt-4 border border-white/10 rounded-lg overflow-hidden max-w-sm">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={imageUrl} alt="Project Preview" className="w-full h-auto object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <Link 
                                href="/admin/portfolio"
                                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
