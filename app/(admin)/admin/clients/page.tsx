import Link from "next/link";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { desc } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    Users,
    ArrowRight,
    Search
} from "lucide-react";

export default async function ClientsPage() {
    let allClients: any[] = [];
    let dbError = false;

    try {
        allClients = await db.select().from(clients).orderBy(desc(clients.createdAt));
    } catch (error) {
        console.error("Admin Clients DB Error:", error);
        dbError = true;
    }

    return (
        <div className="pb-10">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <Users className="w-8 h-8 text-indigo-400" />
                            Client Management
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Manage all onboarded clients and their primary contacts.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Search clients..." 
                                className="pl-9 pr-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-foreground w-full md:w-64"
                            />
                        </div>
                        <Link 
                            href="/admin/clients/new"
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap"
                        >
                            Add Client
                        </Link>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch clients.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Contact Person</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {allClients.length > 0 ? allClients.map((client) => (
                                <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-[14px] font-medium text-foreground tracking-tight">{client.companyName}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{client.contactName}</td>
                                    <td className="px-6 py-4 text-[14px] text-muted-foreground">{client.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${client.isActive ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'}`}>
                                            {client.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        {dbError ? "Unable to load clients." : "No clients found. Add a client to start creating projects."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </SectionReveal>
        </div>
    );
}
