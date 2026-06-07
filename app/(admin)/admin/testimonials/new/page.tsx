import Link from "next/link";
import { redirect } from "next/navigation";
import { createTestimonial } from "../actions";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    MessageSquareQuote,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

export default function NewTestimonialPage() {
    async function handleSubmit(formData: FormData) {
        "use server";
        const result = await createTestimonial(formData);
        if (result.success) {
            redirect("/admin/testimonials");
        }
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex items-center gap-4">
                    <Link 
                        href="/admin/testimonials"
                        className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <MessageSquareQuote className="w-6 h-6 text-indigo-400" />
                            Add Testimonial
                        </h1>
                        <p className="text-muted-foreground/80 text-sm">
                            Publish a new client review to your website.
                        </p>
                    </div>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                    <form action={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="clientName" className="text-sm font-medium text-foreground">Client Name *</label>
                                <input 
                                    type="text" 
                                    id="clientName" 
                                    name="clientName" 
                                    required
                                    placeholder="e.g. Jane Doe"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="clientCompany" className="text-sm font-medium text-foreground">Company Name</label>
                                <input 
                                    type="text" 
                                    id="clientCompany" 
                                    name="clientCompany" 
                                    placeholder="e.g. Acme Corp"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="rating" className="text-sm font-medium text-foreground">Rating (1-5) *</label>
                            <input 
                                type="number" 
                                id="rating" 
                                name="rating" 
                                min="1"
                                max="5"
                                defaultValue="5"
                                required
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium text-foreground">Review Content *</label>
                            <textarea 
                                id="content" 
                                name="content" 
                                required
                                rows={4}
                                placeholder="What did the client say?"
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            ></textarea>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <Link 
                                href="/admin/testimonials"
                                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Save Testimonial
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
