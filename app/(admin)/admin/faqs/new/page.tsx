import Link from "next/link";
import { redirect } from "next/navigation";
import { createFaq } from "../actions";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    HelpCircle,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

export default function NewFaqPage() {
    async function handleSubmit(formData: FormData) {
        "use server";
        const result = await createFaq(formData);
        if (result.success) {
            redirect("/admin/faqs");
        }
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex items-center gap-4">
                    <Link 
                        href="/admin/faqs"
                        className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <HelpCircle className="w-6 h-6 text-indigo-400" />
                            Add FAQ
                        </h1>
                        <p className="text-muted-foreground/80 text-sm">
                            Add a new frequently asked question.
                        </p>
                    </div>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                    <form action={handleSubmit} className="space-y-6">
                        
                        <div className="space-y-2">
                            <label htmlFor="question" className="text-sm font-medium text-foreground">Question *</label>
                            <input 
                                type="text" 
                                id="question" 
                                name="question" 
                                required
                                placeholder="e.g. How long does a project take?"
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium text-foreground">Category</label>
                            <input 
                                type="text" 
                                id="category" 
                                name="category" 
                                placeholder="e.g. General, Pricing, Process"
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="answer" className="text-sm font-medium text-foreground">Answer *</label>
                            <textarea 
                                id="answer" 
                                name="answer" 
                                required
                                rows={4}
                                placeholder="The detailed answer to the question..."
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            ></textarea>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <Link 
                                href="/admin/faqs"
                                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Save FAQ
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
