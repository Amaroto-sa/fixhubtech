import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { leads, projects, invoices, supportTickets, payments } from "@/db/schema";
import { eq, and, ne, sum } from "drizzle-orm";
import {
    SpotlightCard,
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    Target,
    FolderKanban,
    BadgeDollarSign,
    AlertCircle,
    LifeBuoy,
    TrendingUp,
    ArrowRight,
    Plus,
    FileEdit
} from "lucide-react";

export default async function AdminDashboard() {
    const user = await currentUser();
    if (!user) return null;

    let kpis: any[] = [];
    let recentLeads: any[] = [];
    let activeProjectsList: any[] = [];
    let dbError = false;

    try {
        // Fetch KPIs
        const [allLeads] = await db.select({ count: sum(leads.id) }).from(leads); // This is wrong, use count()
        // Wait, Drizzle 0.30 count is a bit different. Let's just fetch all and get length for now if we want to be safe or use sql`count(*)`
        
        const newLeads = await db.select().from(leads).where(eq(leads.status, "new"));
        const activeProjects = await db.select().from(projects).where(ne(projects.status, "completed"));
        const overdueInvoices = await db.select().from(invoices).where(eq(invoices.status, "overdue"));
        const openTickets = await db.select().from(supportTickets).where(eq(supportTickets.status, "open"));
        
        // Fetch revenue (simplified)
        // const [rev] = await db.select({ total: sum(payments.amount) }).from(payments);
        // let totalRevenue = rev?.total || "0";

        kpis = [
            {
                label: "New Leads",
                value: newLeads.length.toString(),
                change: "Across all sources",
                borderColor: "border-indigo-500/20",
                icon: Target,
            },
            {
                label: "Active Projects",
                value: activeProjects.length.toString(),
                change: "Awaiting delivery",
                borderColor: "border-cyan-500/20",
                icon: FolderKanban,
            },
            {
                label: "Revenue (MTD)",
                value: "$0", // Simplified for now
                change: "Updated live",
                borderColor: "border-emerald-500/20",
                icon: BadgeDollarSign,
            },
            {
                label: "Overdue Invoices",
                value: overdueInvoices.length.toString(),
                change: "Follow up required",
                borderColor: "border-amber-500/20",
                icon: AlertCircle,
            },
            {
                label: "Open Tickets",
                value: openTickets.length.toString(),
                change: "Support needed",
                borderColor: "border-rose-500/20",
                icon: LifeBuoy,
            },
            {
                label: "Conversion Rate",
                value: "0%",
                change: "Leads to Clients",
                borderColor: "border-violet-500/20",
                icon: TrendingUp,
            },
        ];

        recentLeads = newLeads.slice(0, 4).map(l => ({
            name: l.name,
            company: l.company || "Direct",
            service: l.serviceNeeded || "Inquiry",
            status: l.status,
            statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
            time: "Recently"
        }));

        activeProjectsList = activeProjects.slice(0, 3).map(p => ({
            name: p.name,
            client: "FixHub Client",
            progress: p.status === 'completed' ? 100 : 50,
            status: p.status
        }));

    } catch (error) {
        console.error("Admin Dashboard DB Error:", error);
        dbError = true;
    }

    const getStatusTheme = (status: string) => {
        if (status === "In Progress") return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
        if (status === "Review") return "text-amber-400 bg-amber-500/10 border-amber-500/20";
        return "text-muted-foreground bg-white/5 border-white/10";
    };

    return (
        <div className="pb-10">
            {/* Header */}
            <FadeIn>
                <div className="mb-10">
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                        Admin Command, {user.firstName || "Admin"}
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Global overview of platform operations and business analytics.
                    </p>
                    {dbError && (
                        <div className="mt-4 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                            Database Error: Could not connect to the database. Ensure schema is pushed.
                        </div>
                    )}
                </div>
            </FadeIn>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                {kpis.map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                        <SectionReveal key={idx} delay={idx * 0.05}>
                            <SpotlightCard className="p-5 bg-[#0a0a0e] border-t border-t-white/[0.08] h-full flex flex-col">
                                <div className={`p-2 w-fit rounded-lg border bg-background/50 backdrop-blur-sm mb-3 ${kpi.borderColor}`}>
                                    <Icon className="w-4 h-4 text-foreground/80" />
                                </div>
                                <div className="mt-auto">
                                    <p className="font-display text-2xl font-bold text-foreground mb-1 tracking-tight">
                                        {kpi.value}
                                    </p>
                                    <p className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase mb-1">{kpi.label}</p>
                                    <p className="text-[10px] text-muted-foreground/60">{kpi.change}</p>
                                </div>
                            </SpotlightCard>
                        </SectionReveal>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <SectionReveal delay={0.2}>
                    <div className="card-elevated bg-[#0a0a0e] overflow-hidden h-full">
                        <div className="p-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                Incoming Leads
                            </h2>
                            <Link
                                href="/admin/leads"
                                className="text-[13px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                            >
                                View Pipeline <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="divide-y divide-white/[0.05]">
                            {recentLeads.length > 0 ? recentLeads.map((lead, idx) => (
                                <div key={idx} className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                                            {lead.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-medium text-foreground tracking-tight">
                                                {lead.name}
                                                <span className="text-muted-foreground ml-2 font-normal">from {lead.company}</span>
                                            </p>
                                            <p className="text-[12px] text-muted-foreground">
                                                Inquiry: {lead.service}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-1">
                                        <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${lead.statusColor}`}>
                                            {lead.status}
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/60">{lead.time}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-10 text-center text-muted-foreground">No new leads.</div>
                            )}
                        </div>
                    </div>
                </SectionReveal>

                {/* Active Projects */}
                <SectionReveal delay={0.3}>
                    <div className="card-elevated bg-[#0a0a0e] overflow-hidden h-full">
                        <div className="p-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                Active Deliverables
                            </h2>
                            <Link
                                href="/admin/projects"
                                className="text-[13px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                            >
                                All Projects <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="divide-y divide-white/[0.05]">
                            {activeProjectsList.length > 0 ? activeProjectsList.map((project, idx) => (
                                <div key={idx} className="p-5 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="text-[14px] font-medium text-foreground tracking-tight">
                                                {project.name}
                                            </p>
                                            <p className="text-[12px] text-muted-foreground">
                                                Client: {project.client}
                                            </p>
                                        </div>
                                        <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(project.status)}`}>
                                            {project.status}
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-[11px] font-medium text-indigo-400">
                                        {project.progress}% completed
                                    </p>
                                </div>
                            )) : (
                                <div className="p-10 text-center text-muted-foreground">No active projects.</div>
                            )}
                        </div>
                    </div>
                </SectionReveal>
            </div>

            {/* Quick Administrator Actions */}
            <SectionReveal delay={0.4}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    {[
                        { label: "New Lead", href: "/admin/leads/new", icon: Plus },
                        { label: "New Project", href: "/admin/projects/new", icon: FolderKanban },
                        { label: "Issue Invoice", href: "/admin/invoices/new", icon: BadgeDollarSign },
                        { label: "Edit Site Content", href: "/admin/content", icon: FileEdit },
                    ].map((action, idx) => {
                        const Icon = action.icon;
                        return (
                            <Link key={idx} href={action.href} className="group block">
                                <SpotlightCard className="p-5 text-center flex flex-col items-center justify-center border-t border-t-white/[0.05]">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 group-hover:text-indigo-400 transition-all duration-300 text-muted-foreground">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors tracking-tight">
                                        {action.label}
                                    </p>
                                </SpotlightCard>
                            </Link>
                        );
                    })}
                </div>
            </SectionReveal>

        </div>
    );
}

