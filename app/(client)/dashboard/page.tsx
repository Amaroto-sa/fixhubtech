import Link from "next/link";
import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, projects, invoices, supportTickets } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import {
    SpotlightCard,
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    FolderKanban,
    CreditCard,
    MessageSquare,
    LifeBuoy,
    UploadCloud,
    ArrowRight,
    CircleDotDashed,
    CheckCircle2
} from "lucide-react";

export default async function ClientDashboard() {
    const user = await currentUser();
    if (!user) return null;

    let activeProjectsCount = 0;
    let pendingInvoicesCount = 0;
    let openTicketsCount = 0;
    let recentProjectsList: any[] = [];
    let dbError = false;
    let redirectUrl = "";

    try {
        // Fetch DB user
        let [dbUser] = await db.select().from(users).where(eq(users.clerkId, user.id));
        
        // SYNC ON LOGIN: If Clerk webhook failed and user isn't in DB, create them now
        if (!dbUser) {
            console.log("User missing from DB, creating fallback record...");
            const newUser = await db.insert(users).values({
                clerkId: user.id,
                email: user.emailAddresses[0]?.emailAddress || "",
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                avatar: user.imageUrl || "",
                role: "super_admin", // Force the owner to be super_admin since DB was empty
                isActive: true
            }).returning();
            
            dbUser = newUser[0];
        }

        if (dbUser) {
            if (dbUser.role === "admin" || dbUser.role === "super_admin") {
                redirectUrl = "/admin/dashboard";
            } else {
                const [client] = await db.select().from(clients).where(eq(clients.userId, dbUser.id));

                if (client) {
                    // Fetch projects
                    const clientProjects = await db.select().from(projects).where(eq(projects.clientId, client.id));
                    activeProjectsCount = clientProjects.length;

                    // Fetch pending invoices
                    const clientInvoices = await db.select().from(invoices).where(
                        and(eq(invoices.clientId, client.id), eq(invoices.status, "draft"))
                    );
                    pendingInvoicesCount = clientInvoices.length;

                    // Fetch open tickets
                    const tickets = await db.select().from(supportTickets).where(
                        and(eq(supportTickets.clientId, client.id), eq(supportTickets.status, "open"))
                    );
                    openTicketsCount = tickets.length;

                    // Map recent projects
                    recentProjectsList = clientProjects.slice(0, 3).map(p => ({
                        name: p.name,
                        status: p.status,
                        statusIcon: CircleDotDashed,
                        statusColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
                        milestone: "Ongoing",
                        dueDate: p.dueDate ? new Date(p.dueDate).toLocaleDateString() : "TBD",
                        progress: p.status === 'completed' ? 100 : 50,
                    }));
                }
            }
        }
    } catch (error) {
        console.error("Dashboard DB Error:", error);
        dbError = true;
    }

    if (redirectUrl) {
        redirect(redirectUrl);
    }

    const stats = [
        {
            label: "Active Projects",
            value: activeProjectsCount.toString(),
            change: activeProjectsCount > 0 ? "All on track" : "No active projects",
            color: "from-indigo-500/20 to-indigo-500/5",
            borderColor: "border-indigo-500/20",
            icon: FolderKanban,
        },
        {
            label: "Pending Invoices",
            value: pendingInvoicesCount.toString(),
            change: pendingInvoicesCount > 0 ? "Action required" : "All paid up",
            color: "from-amber-500/20 to-amber-500/5",
            borderColor: "border-amber-500/20",
            icon: CreditCard,
        },
        {
            label: "Unread Messages",
            value: "0",
            change: "Up to date",
            color: "from-cyan-500/20 to-cyan-500/5",
            borderColor: "border-cyan-500/20",
            icon: MessageSquare,
        },
        {
            label: "Open Tickets",
            value: openTicketsCount.toString(),
            change: openTicketsCount > 0 ? "Support team is on it" : "Everything is resolved",
            color: "from-emerald-500/20 to-emerald-500/5",
            borderColor: "border-emerald-500/20",
            icon: LifeBuoy,
        },
    ];

    return (
        <div className="pb-10">
            {/* Header */}
            <FadeIn>
                <div className="mb-10">
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                        Welcome back, {user.firstName || "Client"}
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Here&apos;s an overview of your active operations and pending tasks.
                    </p>
                    {dbError && (
                        <div className="mt-4 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                            There was an error connecting to the database. Make sure your DATABASE_URL is set and the database schema is pushed.
                        </div>
                    )}
                </div>
            </FadeIn>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <SectionReveal key={idx} delay={idx * 0.1}>
                            <SpotlightCard className={`p-6 bg-gradient-to-b ${stat.color} to-transparent border-t border-t-white/[0.08]`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-2.5 rounded-lg border bg-background/50 backdrop-blur-sm shadow-sm ${stat.borderColor}`}>
                                        <Icon className="w-5 h-5 text-foreground/80" />
                                    </div>
                                </div>
                                <p className="font-display text-4xl font-bold text-foreground mb-1 tracking-tight">
                                    {stat.value}
                                </p>
                                <p className="text-[13px] font-medium text-foreground tracking-wide mb-1 opacity-80">{stat.label}</p>
                                <p className="text-[12px] text-muted-foreground">{stat.change}</p>
                            </SpotlightCard>
                        </SectionReveal>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Projects Column (Takes up 2/3) */}
                <div className="lg:col-span-2">
                    <SectionReveal delay={0.3}>
                        <div className="card-elevated bg-[#0a0a0e] overflow-hidden">
                            <div className="p-6 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                                    Active Projects
                                </h2>
                                <Link
                                    href="/dashboard/projects"
                                    className="text-[13px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                                >
                                    View Timeline <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            <div className="divide-y divide-white/[0.05]">
                                {recentProjectsList.length > 0 ? recentProjectsList.map((project, idx) => {
                                    const StatusIcon = project.statusIcon;
                                    return (
                                        <div
                                            key={idx}
                                            className="p-6 hover:bg-white/[0.02] transition-colors"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                                                        <FolderKanban className="w-5 h-5 text-indigo-400/80" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[15px] font-medium text-foreground tracking-tight">
                                                            {project.name}
                                                        </p>
                                                        <p className="text-[13px] text-muted-foreground">
                                                            Due {project.dueDate}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 w-fit ${project.statusColor}`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    <span className="text-[11px] font-semibold uppercase tracking-wider">{project.status}</span>
                                                </div>
                                            </div>

                                            {/* Progress Bar & Milestone */}
                                            <div className="bg-white/[0.02] rounded-lg p-4 border border-white/[0.04]">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[12px] text-muted-foreground/80">Next Milestone: <span className="text-foreground/80 font-medium">{project.milestone}</span></span>
                                                    <span className="text-[12px] font-medium text-indigo-400">{project.progress}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-500 rounded-full"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="p-8 text-center text-muted-foreground">
                                        No active projects at the moment.
                                    </div>
                                )}
                            </div>
                        </div>
                    </SectionReveal>
                </div>

                {/* Actions Column (Takes up 1/3) */}
                <div className="space-y-4">
                    <SectionReveal delay={0.4}>
                        <h3 className="text-[12px] font-semibold tracking-widest text-muted-foreground/50 uppercase mb-4 px-1">Quick Actions</h3>

                        <Link href="/dashboard/files" className="block mb-4">
                            <SpotlightCard className="p-5 flex items-center gap-4 group cursor-pointer border-t border-t-white/[0.05]">
                                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                    <UploadCloud className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[14px] font-medium text-foreground tracking-tight">Upload Files</h4>
                                    <p className="text-[12px] text-muted-foreground">Share project assets securely</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                            </SpotlightCard>
                        </Link>

                        <SpotlightCard className="p-5 flex items-center gap-4 group cursor-pointer border-t border-t-white/[0.05] mb-4">
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[14px] font-medium text-foreground tracking-tight">Pay Invoice</h4>
                                <p className="text-[12px] text-muted-foreground">Settle outstanding balances</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                        </SpotlightCard>

                        <SpotlightCard className="p-5 flex items-center gap-4 group cursor-pointer border-t border-t-white/[0.05]">
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                <LifeBuoy className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[14px] font-medium text-foreground tracking-tight">Support Ticket</h4>
                                <p className="text-[12px] text-muted-foreground">Get help from the team</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                        </SpotlightCard>

                    </SectionReveal>
                </div>

            </div>
        </div>
    );
}
