import Link from "next/link";
import { db } from "@/db";
import { projects, clients } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    FolderKanban,
    ArrowRight,
    Search,
    Filter
} from "lucide-react";

export default async function ProjectsPage() {
    let allProjects = [];
    let dbError = false;

    try {
        allProjects = await db
            .select({
                id: projects.id,
                name: projects.name,
                status: projects.status,
                serviceType: projects.serviceType,
                paymentStatus: projects.paymentStatus,
                dueDate: projects.dueDate,
                clientName: clients.companyName
            })
            .from(projects)
            .leftJoin(clients, eq(projects.clientId, clients.id))
            .orderBy(desc(projects.createdAt));
    } catch (error) {
        console.error("Admin Projects DB Error:", error);
        dbError = true;
    }

    const getStatusTheme = (status: string) => {
        switch(status.toLowerCase()) {
            case "onboarding": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "in progress": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
            case "review": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
            case "completed": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "on hold": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
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
                            <FolderKanban className="w-8 h-8 text-indigo-400" />
                            Active Projects
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Manage deliverables and track project milestones.
                        </p>
                    </div>
                    {/* Toolbar */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Search projects..." 
                                className="pl-9 pr-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-foreground w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-foreground">
                            <Filter className="w-4 h-4" />
                        </button>
                        <Link 
                            href="/admin/projects/new"
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap"
                        >
                            New Project
                        </Link>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch projects.
                    </div>
                )}
            </FadeIn>

            {/* Projects Table */}
            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Project Name</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {allProjects.length > 0 ? allProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-[14px] font-medium text-foreground tracking-tight">{project.name}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{project.clientName || "Unknown Client"}</td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{project.serviceType || "Custom"}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-muted-foreground">
                                        {project.dueDate ? new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Not set"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            href={`/admin/projects/${project.id}`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        {dbError ? "Unable to load projects." : "No projects found. Create a new project to get started."}
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
