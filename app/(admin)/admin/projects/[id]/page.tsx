import Link from "next/link";
import { db } from "@/db";
import { projects, clients, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    ArrowLeft,
    FolderKanban,
    Calendar,
    BadgeDollarSign,
    UserCircle2,
    Activity
} from "lucide-react";

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
    const projectId = params.id;
    
    let projectDetails: any = null;
    try {
        const [result] = await db
            .select({
                id: projects.id,
                name: projects.name,
                status: projects.status,
                serviceType: projects.serviceType,
                scopeSummary: projects.scopeSummary,
                paymentStatus: projects.paymentStatus,
                dueDate: projects.dueDate,
                createdAt: projects.createdAt,
                clientName: clients.companyName,
                clientContact: clients.contactName,
                clientEmail: clients.email,
                assigneeFirstName: users.firstName,
                assigneeLastName: users.lastName,
            })
            .from(projects)
            .leftJoin(clients, eq(projects.clientId, clients.id))
            .leftJoin(users, eq(projects.assignedTo, users.id))
            .where(eq(projects.id, projectId));
            
        projectDetails = result;
    } catch (error) {
        console.error("Failed to fetch project details:", error);
    }

    if (!projectDetails) {
        notFound();
    }

    const getStatusTheme = (status: string) => {
        switch(status?.toLowerCase()) {
            case "onboarding": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "in progress": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
            case "review": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
            case "completed": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "on hold": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
            default: return "text-muted-foreground bg-white/5 border-white/10";
        }
    };

    return (
        <div className="pb-10 max-w-5xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/admin/projects"
                            className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                                    {projectDetails.name}
                                </h1>
                                <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(projectDetails.status)}`}>
                                    {projectDetails.status}
                                </span>
                            </div>
                            <p className="text-muted-foreground/80 text-sm flex items-center gap-2">
                                <FolderKanban className="w-4 h-4" />
                                Project Reference: {projectDetails.id.split('-')[0]}
                            </p>
                        </div>
                    </div>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <SectionReveal delay={0.1}>
                        <div className="card-elevated bg-[#0a0a0e] border border-white/[0.05] overflow-hidden">
                            <div className="p-5 border-b border-white/[0.05] bg-white/[0.01]">
                                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-indigo-400" />
                                    Project Overview
                                </h2>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Scope Summary</h3>
                                <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                                    {projectDetails.scopeSummary || "No scope summary provided yet."}
                                </p>
                            </div>
                        </div>
                    </SectionReveal>
                </div>

                <div className="space-y-6">
                    <SectionReveal delay={0.2}>
                        <div className="card-elevated bg-[#0a0a0e] border border-white/[0.05] overflow-hidden">
                            <div className="p-5 border-b border-white/[0.05] bg-white/[0.01]">
                                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <UserCircle2 className="w-4 h-4 text-indigo-400" />
                                    Client Details
                                </h2>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Company</p>
                                    <p className="text-sm font-medium text-foreground">{projectDetails.clientName}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Contact Person</p>
                                    <p className="text-sm text-foreground/90">{projectDetails.clientContact}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-sm text-foreground/90">{projectDetails.clientEmail}</p>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.3}>
                        <div className="card-elevated bg-[#0a0a0e] border border-white/[0.05] overflow-hidden">
                            <div className="p-5 border-b border-white/[0.05] bg-white/[0.01]">
                                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-400" />
                                    Key Dates
                                </h2>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Created At</p>
                                    <p className="text-sm text-foreground/90">
                                        {new Date(projectDetails.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Target Due Date</p>
                                    <p className="text-sm font-medium text-indigo-400">
                                        {projectDetails.dueDate ? new Date(projectDetails.dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "TBD"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                    
                    <SectionReveal delay={0.4}>
                        <div className="card-elevated bg-[#0a0a0e] border border-white/[0.05] overflow-hidden">
                            <div className="p-5 border-b border-white/[0.05] bg-white/[0.01]">
                                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <BadgeDollarSign className="w-4 h-4 text-indigo-400" />
                                    Financials
                                </h2>
                            </div>
                            <div className="p-5">
                                <div>
                                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Payment Status</p>
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border inline-block ${
                                        projectDetails.paymentStatus === 'paid' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
                                        projectDetails.paymentStatus === 'pending' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                                        'text-rose-400 bg-rose-500/10 border-rose-500/20'
                                    }`}>
                                        {projectDetails.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </div>
    );
}
