import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { FolderKanban, ArrowRight } from "lucide-react";

export default async function ClientProjectsPage() {
    const user = await currentUser();
    if (!user) return null;

    let userProjects = [];
    let dbError = false;

    try {
        // Find DB User
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        
        if (dbUser.length > 0) {
            // Find Client Profile
            const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
            
            if (clientProfile.length > 0) {
                // Find Projects
                userProjects = await db
                    .select()
                    .from(projects)
                    .where(eq(projects.clientId, clientProfile[0].id))
                    .orderBy(desc(projects.createdAt));
            }
        }
    } catch (error) {
        console.error("Client Projects DB Error:", error);
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
            <FadeIn>
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <FolderKanban className="w-8 h-8 text-indigo-400" />
                        My Projects
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Track the progress of your ongoing and completed projects.
                    </p>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch your projects. Please try again later.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProjects.length > 0 ? userProjects.map((project) => (
                        <div key={project.id} className="card-elevated bg-[#0a0a0e] p-6 flex flex-col h-full border border-white/[0.05] hover:border-indigo-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-foreground tracking-tight line-clamp-2">
                                    {project.name}
                                </h3>
                                <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border whitespace-nowrap ml-3 ${getStatusTheme(project.status)}`}>
                                    {project.status}
                                </span>
                            </div>
                            
                            <div className="space-y-3 mb-6 flex-grow">
                                <div>
                                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Service Type</p>
                                    <p className="text-[14px] text-foreground/90">{project.serviceType || "Custom Project"}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Started</p>
                                    <p className="text-[14px] text-foreground/90">{new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                </div>
                                {project.dueDate && (
                                    <div>
                                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Est. Delivery</p>
                                        <p className="text-[14px] text-foreground/90">{new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                    </div>
                                )}
                            </div>

                            <Link 
                                href={`/dashboard/projects/${project.id}`}
                                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[13px] font-medium text-foreground text-center transition-colors flex items-center justify-center gap-2 group-hover:bg-indigo-500/10 group-hover:text-indigo-400"
                            >
                                View Details <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    )) : (
                        <div className="col-span-full card-elevated bg-[#0a0a0e] p-12 text-center border-dashed border-white/10">
                            <FolderKanban className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                You don't have any active projects right now. If you recently requested a service, we'll set up your project board soon.
                            </p>
                        </div>
                    )}
                </div>
            </SectionReveal>
        </div>
    );
}
