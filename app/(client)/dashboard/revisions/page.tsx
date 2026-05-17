import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, projectRevisions, projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { PenTool, ArrowRight, Plus } from "lucide-react";

export default async function ClientRevisionsPage() {
    const user = await currentUser();
    if (!user) return null;

    let userRevisions: any[] = [];
    let dbError = false;

    try {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (dbUser.length > 0) {
            const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
            if (clientProfile.length > 0) {
                userRevisions = await db
                    .select({
                        id: projectRevisions.id,
                        description: projectRevisions.description,
                        status: projectRevisions.status,
                        createdAt: projectRevisions.createdAt,
                        projectName: projects.name
                    })
                    .from(projectRevisions)
                    .leftJoin(projects, eq(projectRevisions.projectId, projects.id))
                    .where(eq(projectRevisions.clientId, clientProfile[0].id))
                    .orderBy(desc(projectRevisions.createdAt));
            }
        }
    } catch (error) {
        console.error("Client Revisions DB Error:", error);
        dbError = true;
    }

    const getStatusTheme = (status: string) => {
        switch(status.toLowerCase()) {
            case "submitted": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "in progress": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
            case "completed": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "rejected": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
            default: return "text-muted-foreground bg-white/5 border-white/10";
        }
    };

    return (
        <div className="pb-10">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <PenTool className="w-8 h-8 text-rose-400" />
                            Project Revisions
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Request changes and track revision history for your deliverables.
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap">
                        <Plus className="w-4 h-4" /> Request Revision
                    </button>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider w-1/2">Request Description</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Date Submitted</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {userRevisions.length > 0 ? userRevisions.map((rev) => (
                                <tr key={rev.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-[14px] text-foreground/90 leading-relaxed line-clamp-2">{rev.description}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{rev.projectName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(rev.status)}`}>
                                            {rev.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-muted-foreground">
                                        {new Date(rev.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                        {dbError ? "Unable to load revisions." : "You haven't requested any revisions yet."}
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
