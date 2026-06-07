import Link from "next/link";
import { redirect } from "next/navigation";
import { createService } from "../actions";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    LayoutGrid,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

export default function NewServicePage() {
    async function handleSubmit(formData: FormData) {
        "use server";
        const result = await createService(formData);
        if (result.success) {
            redirect("/admin/services");
        }
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex items-center gap-4">
                    <Link 
                        href="/admin/services"
                        className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <LayoutGrid className="w-6 h-6 text-indigo-400" />
                            Add New Service
                        </h1>
                        <p className="text-muted-foreground/80 text-sm">
                            Create a new service offering for your website.
                        </p>
                    </div>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                    <form action={handleSubmit} className="space-y-6">
                        
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium text-foreground">Service Title *</label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                required
                                placeholder="e.g. Full-Stack Web Development"
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="slug" className="text-sm font-medium text-foreground">URL Slug</label>
                                <input 
                                    type="text" 
                                    id="slug" 
                                    name="slug" 
                                    placeholder="Leave blank to auto-generate"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="startingPrice" className="text-sm font-medium text-foreground">Starting Price (USD)</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    id="startingPrice" 
                                    name="startingPrice" 
                                    placeholder="e.g. 1000.00"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="shortDescription" className="text-sm font-medium text-foreground">Short Description</label>
                            <textarea 
                                id="shortDescription" 
                                name="shortDescription" 
                                rows={3}
                                placeholder="A brief summary of what this service includes..."
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            ></textarea>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <Link 
                                href="/admin/services"
                                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Create Service
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
