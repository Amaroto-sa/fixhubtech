import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, supportTickets, projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { LifeBuoy, ArrowRight, Plus } from "lucide-react";

export default async function ClientTicketsPage() {
    const user = await currentUser();
    if (!user) return null;

    let userTickets: any[] = [];
    let dbError = false;

    try {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (dbUser.length > 0) {
            const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
            if (clientProfile.length > 0) {
                userTickets = await db
                    .select({
                        id: supportTickets.id,
                        subject: supportTickets.subject,
                        category: supportTickets.category,
                        priority: supportTickets.priority,
                        status: supportTickets.status,
                        createdAt: supportTickets.createdAt,
                        projectName: projects.name
                    })
                    .from(supportTickets)
                    .leftJoin(projects, eq(supportTickets.projectId, projects.id))
                    .where(eq(supportTickets.clientId, clientProfile[0].id))
                    .orderBy(desc(supportTickets.createdAt));
            }
        }
    } catch (error) {
        console.error("Client Tickets DB Error:", error);
        dbError = true;
    }

    const getStatusTheme = (status: string) => {
        switch(status.toLowerCase()) {
            case "open": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "in progress": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
            case "waiting": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
            case "resolved": return "text-zinc-400 bg-white/5 border-white/10";
            default: return "text-muted-foreground bg-white/5 border-white/10";
        }
    };

    return (
        <div className="pb-10">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <LifeBuoy className="w-8 h-8 text-emerald-400" />
                            Support Tickets
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Get help from our team and track your technical inquiries.
                        </p>
                    </div>
                    <Link href="/dashboard/tickets/new" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap">
                        <Plus className="w-4 h-4" /> <span>New Ticket</span>
                    </Link>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider text-right">View</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {userTickets.length > 0 ? userTickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-[14px] font-medium text-foreground tracking-tight">{ticket.subject}</p>
                                        <p className="text-[12px] text-muted-foreground">{ticket.category || "General Support"}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{ticket.projectName || "None"}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-[13px] capitalize text-foreground/80">{ticket.priority}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-muted-foreground">
                                        {new Date(ticket.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        {dbError ? "Unable to load support tickets." : "You haven't opened any support tickets yet."}
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
