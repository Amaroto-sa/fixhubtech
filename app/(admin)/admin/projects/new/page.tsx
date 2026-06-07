import Link from "next/link";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { redirect } from "next/navigation";
import { createProject } from "../actions";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    FolderKanban,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

export default async function NewProjectPage() {
    let allClients: any[] = [];
    
    try {
        allClients = await db.select({
            id: clients.id,
            companyName: clients.companyName,
            contactName: clients.contactName
        }).from(clients);
    } catch (error) {
        console.error("Failed to fetch clients for new project:", error);
    }

    async function handleSubmit(formData: FormData) {
        "use server";
        const result = await createProject(formData);
        if (result.success) {
            redirect("/admin/projects");
        }
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            {/* Header */}
            <FadeIn>
                <div className="mb-8 flex items-center gap-4">
                    <Link 
                        href="/admin/projects"
                        className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            Create New Project
                        </h1>
                        <p className="text-muted-foreground/80 text-sm">
                            Setup a new deliverable and assign it to a client.
                        </p>
                    </div>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                    <form action={handleSubmit} className="space-y-6">
                        
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-foreground">Project Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                required
                                placeholder="e.g. Website Redesign"
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="clientId" className="text-sm font-medium text-foreground">Assign Client</label>
                            <select 
                                id="clientId" 
                                name="clientId" 
                                required
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground appearance-none"
                            >
                                <option value="" disabled selected>Select a client...</option>
                                {allClients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.companyName} ({client.contactName})
                                    </option>
                                ))}
                            </select>
                            {allClients.length === 0 && (
                                <p className="text-xs text-amber-400 mt-1">No clients found. You need to create a client first.</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="serviceType" className="text-sm font-medium text-foreground">Service Type</label>
                                <input 
                                    type="text" 
                                    id="serviceType" 
                                    name="serviceType" 
                                    placeholder="e.g. Web Development"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="dueDate" className="text-sm font-medium text-foreground">Target Due Date</label>
                                <input 
                                    type="date" 
                                    id="dueDate" 
                                    name="dueDate" 
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <Link 
                                href="/admin/projects"
                                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Create Project
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
