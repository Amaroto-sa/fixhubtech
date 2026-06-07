import Link from "next/link";
import { redirect } from "next/navigation";
import { createLead } from "../actions";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    Target,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

export default function NewLeadPage() {
    async function handleSubmit(formData: FormData) {
        "use server";
        const result = await createLead(formData);
        if (result.success) {
            redirect("/admin/leads");
        }
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex items-center gap-4">
                    <Link 
                        href="/admin/leads"
                        className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <Target className="w-6 h-6 text-indigo-400" />
                            Add New Lead
                        </h1>
                        <p className="text-muted-foreground/80 text-sm">
                            Manually enter a new prospective client into the system.
                        </p>
                    </div>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                    <form action={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name *</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium text-foreground">Company Name</label>
                                <input 
                                    type="text" 
                                    id="company" 
                                    name="company" 
                                    placeholder="Acme Corp"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="serviceNeeded" className="text-sm font-medium text-foreground">Service Needed</label>
                                <input 
                                    type="text" 
                                    id="serviceNeeded" 
                                    name="serviceNeeded" 
                                    placeholder="Web Development"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="source" className="text-sm font-medium text-foreground">Lead Source</label>
                            <select 
                                id="source" 
                                name="source" 
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground appearance-none"
                            >
                                <option value="manual">Manual Entry</option>
                                <option value="referral">Referral</option>
                                <option value="website">Website Form</option>
                                <option value="linkedin">LinkedIn</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <Link 
                                href="/admin/leads"
                                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Save Lead
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
