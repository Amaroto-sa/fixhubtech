import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { users, clients, projects, invoices, files, supportTickets } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { ArrowLeft, FolderKanban, CreditCard, FileText, LifeBuoy, Clock, Calendar } from "lucide-react";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;

    let project: any = null;
    let projectInvoices: any[] = [];
    let projectFiles: any[] = [];
    let projectTickets: any[] = [];
    let dbError = false;

    try {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (dbUser.length === 0) return notFound();

        const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
        if (clientProfile.length === 0) return notFound();

        const projectResult = await db
            .select()
            .from(projects)
            .where(and(eq(projects.id, params.id), eq(projects.clientId, clientProfile[0].id)))
            .limit(1);

        if (projectResult.length === 0) return notFound();
        project = projectResult[0];

        // Fetch related data
        projectInvoices = await db.select().from(invoices)
            .where(eq(invoices.projectId, params.id))
            .orderBy(desc(invoices.createdAt));

        projectFiles = await db.select().from(files)
            .where(eq(files.projectId, params.id))
            .orderBy(desc(files.createdAt));

        projectTickets = await db.select().from(supportTickets)
            .where(eq(supportTickets.projectId, params.id))
            .orderBy(desc(supportTickets.createdAt));
    } catch (error) {
        console.error("Project Detail DB Error:", error);
        dbError = true;
    }

    if (!project && !dbError) return notFound();

    const getStatusTheme = (status: string) => {
        switch (status?.toLowerCase()) {
            case "onboarding": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "in_progress": case "in progress": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
            case "client_review": case "review": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
            case "complete": case "completed": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "on_hold": case "on hold": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
            default: return "text-muted-foreground bg-white/5 border-white/10";
        }
    };

    const getInvoiceStatusTheme = (status: string) => {
        switch (status?.toLowerCase()) {
            case "paid": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "sent": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "overdue": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
            default: return "text-muted-foreground bg-white/5 border-white/10";
        }
    };

    return (
        <div className="pb-10">
            <FadeIn>
                <Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back to Projects
                </Link>

                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not load all project data.
                    </div>
                )}

                {project && (
                    <>
                        {/* Project Header */}
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <h1 className="font-display text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                                    <FolderKanban className="w-8 h-8 text-indigo-400" />
                                    {project.name}
                                </h1>
                                <span className={`px-3 py-1.5 rounded-lg text-xs uppercase font-bold tracking-wider border whitespace-nowrap ${getStatusTheme(project.status)}`}>
                                    {project.status?.replace(/_/g, " ")}
                                </span>
                            </div>
                            {project.description && (
                                <p className="text-muted-foreground/80 text-lg max-w-3xl">{project.description}</p>
                            )}
                        </div>

                        {/* Project Meta */}
                        <SectionReveal delay={0.1}>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                <div className="card-elevated bg-[#0a0a0e] p-4 border border-white/[0.05]">
                                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Started</p>
                                    <p className="text-sm text-foreground font-medium">{new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                </div>
                                {project.dueDate && (
                                    <div className="card-elevated bg-[#0a0a0e] p-4 border border-white/[0.05]">
                                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Due</p>
                                        <p className="text-sm text-foreground font-medium">{new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                    </div>
                                )}
                                <div className="card-elevated bg-[#0a0a0e] p-4 border border-white/[0.05]">
                                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Service</p>
                                    <p className="text-sm text-foreground font-medium">{project.serviceType || "Custom"}</p>
                                </div>
                                <div className="card-elevated bg-[#0a0a0e] p-4 border border-white/[0.05]">
                                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Files</p>
                                    <p className="text-sm text-foreground font-medium">{projectFiles.length} uploaded</p>
                                </div>
                            </div>
                        </SectionReveal>

                        {/* Invoices */}
                        <SectionReveal delay={0.15}>
                            <div className="mb-10">
                                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-muted-foreground" /> Invoices
                                </h2>
                                {projectInvoices.length > 0 ? (
                                    <div className="space-y-3">
                                        {projectInvoices.map((inv) => (
                                            <div key={inv.id} className="card-elevated bg-[#0a0a0e] p-4 border border-white/[0.05] flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-foreground font-medium">
                                                        {inv.currency} {Number(inv.amount).toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">Due {new Date(inv.dueDate).toLocaleDateString()}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${getInvoiceStatusTheme(inv.status)}`}>
                                                    {inv.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No invoices yet.</p>
                                )}
                            </div>
                        </SectionReveal>

                        {/* Files */}
                        <SectionReveal delay={0.2}>
                            <div className="mb-10">
                                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-muted-foreground" /> Project Files
                                </h2>
                                {projectFiles.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {projectFiles.map((file) => (
                                            <a key={file.id} href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="card-elevated bg-[#0a0a0e] p-4 border border-white/[0.05] hover:border-indigo-500/30 transition-colors">
                                                <p className="text-sm text-foreground font-medium truncate">{file.fileName}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{file.fileType} · {(file.fileSize / 1024).toFixed(0)} KB</p>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
                                )}
                            </div>
                        </SectionReveal>

                        {/* Support Tickets */}
                        <SectionReveal delay={0.25}>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                        <LifeBuoy className="w-5 h-5 text-muted-foreground" /> Support Tickets
                                    </h2>
                                    <Link href="/dashboard/tickets/new" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                                        + New Ticket
                                    </Link>
                                </div>
                                {projectTickets.length > 0 ? (
                                    <div className="space-y-3">
                                        {projectTickets.map((ticket) => (
                                            <div key={ticket.id} className="card-elevated bg-[#0a0a0e] p-4 border border-white/[0.05] flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-foreground font-medium">{ticket.subject}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{ticket.category} · {new Date(ticket.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${
                                                    ticket.status === "resolved" || ticket.status === "closed" 
                                                        ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" 
                                                        : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                                                }`}>
                                                    {ticket.status?.replace(/_/g, " ")}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No support tickets for this project.</p>
                                )}
                            </div>
                        </SectionReveal>
                    </>
                )}
            </FadeIn>
        </div>
    );
}
