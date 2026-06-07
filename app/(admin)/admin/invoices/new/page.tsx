import Link from "next/link";
import { db } from "@/db";
import { clients, projects } from "@/db/schema";
import { redirect } from "next/navigation";
import { createInvoice } from "../actions";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    BadgeDollarSign,
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

export default async function NewInvoicePage() {
    let allClients: any[] = [];
    let allProjects: any[] = [];
    
    try {
        allClients = await db.select({
            id: clients.id,
            companyName: clients.companyName,
        }).from(clients);
        
        allProjects = await db.select({
            id: projects.id,
            name: projects.name,
            clientId: projects.clientId
        }).from(projects);
    } catch (error) {
        console.error("Failed to fetch dependencies for new invoice:", error);
    }

    async function handleSubmit(formData: FormData) {
        "use server";
        const result = await createInvoice(formData);
        if (result.success) {
            redirect("/admin/invoices");
        }
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex items-center gap-4">
                    <Link 
                        href="/admin/invoices"
                        className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            Create New Invoice
                        </h1>
                        <p className="text-muted-foreground/80 text-sm">
                            Generate a draft invoice for a project.
                        </p>
                    </div>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                    <form action={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="invoiceNumber" className="text-sm font-medium text-foreground">Invoice Number</label>
                                <input 
                                    type="text" 
                                    id="invoiceNumber" 
                                    name="invoiceNumber" 
                                    required
                                    defaultValue={`INV-${Math.floor(1000 + Math.random() * 9000)}`}
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="amount" className="text-sm font-medium text-foreground">Amount (USD)</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    id="amount" 
                                    name="amount" 
                                    required
                                    placeholder="0.00"
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="clientId" className="text-sm font-medium text-foreground">Select Client</label>
                                <select 
                                    id="clientId" 
                                    name="clientId" 
                                    required
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground appearance-none"
                                >
                                    <option value="" disabled selected>Select a client...</option>
                                    {allClients.map(client => (
                                        <option key={client.id} value={client.id}>{client.companyName}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="projectId" className="text-sm font-medium text-foreground">Select Project</label>
                                <select 
                                    id="projectId" 
                                    name="projectId" 
                                    required
                                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground appearance-none"
                                >
                                    <option value="" disabled selected>Select a project...</option>
                                    {allProjects.map(project => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="dueDate" className="text-sm font-medium text-foreground">Due Date</label>
                            <input 
                                type="date" 
                                id="dueDate" 
                                name="dueDate" 
                                required
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground [color-scheme:dark]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium text-foreground">Notes / Description</label>
                            <textarea 
                                id="notes" 
                                name="notes" 
                                rows={3}
                                placeholder="Details about this invoice..."
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            ></textarea>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <Link 
                                href="/admin/invoices"
                                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Create Invoice
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
