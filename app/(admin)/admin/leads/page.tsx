import Link from "next/link";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    Target,
    ArrowRight,
    Search,
    Filter,
    MoreHorizontal
} from "lucide-react";

export default async function LeadsPage() {
    let allLeads: any[] = [];
    let dbError = false;

    try {
        allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
    } catch (error) {
        console.error("Admin Leads DB Error:", error);
        dbError = true;
    }

    const getStatusTheme = (status: string) => {
        switch(status.toLowerCase()) {
            case "new": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "contacted": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "qualified": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
            case "lost": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
            case "converted": return "text-violet-400 bg-violet-500/10 border-violet-500/20";
            default: return "text-muted-foreground bg-white/5 border-white/10";
        }
    };

    return (
        <div className="pb-10">
            {/* Header */}
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <Target className="w-8 h-8 text-indigo-400" />
                            Lead Pipeline
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Manage incoming inquiries and convert prospects to clients.
                        </p>
                    </div>
                    {/* Toolbar */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Search leads..." 
                                className="pl-9 pr-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-foreground w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-foreground">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch leads.
                    </div>
                )}
            </FadeIn>

            {/* Leads Table */}
            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Prospect</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Service Needed</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Budget</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {allLeads.length > 0 ? allLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                                                {lead.name.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="text-[14px] font-medium text-foreground tracking-tight">{lead.name}</p>
                                                <p className="text-[12px] text-muted-foreground">{lead.company || lead.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{lead.serviceNeeded || "General"}</td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{lead.budgetRange || "N/A"}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-muted-foreground">
                                        {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            href={`/admin/leads/${lead.id}`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        {dbError ? "Unable to load leads." : "No leads found. When prospects fill out the quote form, they will appear here."}
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
