import { db } from "@/db";
import { supportTickets, clients } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    LifeBuoy,
    ArrowRight
} from "lucide-react";

export default async function TicketsPage() {
    let allTickets: any[] = [];
    let dbError = false;

    try {
        allTickets = await db
            .select({
                id: supportTickets.id,
                subject: supportTickets.subject,
                priority: supportTickets.priority,
                status: supportTickets.status,
                createdAt: supportTickets.createdAt,
                clientName: clients.companyName
            })
            .from(supportTickets)
            .leftJoin(clients, eq(supportTickets.clientId, clients.id))
            .orderBy(desc(supportTickets.createdAt));
    } catch (error) {
        console.error("Admin Tickets DB Error:", error);
        dbError = true;
    }

    const getStatusTheme = (status: string) => {
        if (status === "open") return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
        if (status === "in_progress") return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
        if (status === "closed") return "text-muted-foreground border-white/10 bg-white/5";
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    };

    return (
        <div className="pb-10 max-w-5xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <LifeBuoy className="w-8 h-8 text-indigo-400" />
                            Support Tickets
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Manage issues and support requests from your clients.
                        </p>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch tickets.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-hidden">
                    <div className="divide-y divide-white/[0.05]">
                        {allTickets.length > 0 ? allTickets.map((ticket) => (
                            <div key={ticket.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4 group">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-display text-sm font-bold text-foreground">{ticket.subject}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${ticket.priority === 'high' ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' : 'text-muted-foreground border-white/10 bg-white/5'}`}>
                                            {ticket.priority}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        From: {ticket.clientName} • {new Date(ticket.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-sm font-medium">
                                    View <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )) : (
                            <div className="p-12 text-center bg-white/[0.01]">
                                <p className="text-muted-foreground">No support tickets found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
