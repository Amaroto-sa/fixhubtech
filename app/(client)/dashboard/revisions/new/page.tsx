import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FadeIn } from "@/components/shared/motion";
import { PenTool, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RevisionForm } from "@/components/dashboard/revision-form";

export default async function NewRevisionPage() {
    const user = await currentUser();
    if (!user) return null;

    let clientProjects: any[] = [];

    const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
    if (dbUser.length > 0) {
        const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
        if (clientProfile.length > 0) {
            clientProjects = await db.select({ id: projects.id, name: projects.name })
                .from(projects)
                .where(eq(projects.clientId, clientProfile[0].id));
        }
    }

    return (
        <div className="pb-10 max-w-3xl">
            <FadeIn>
                <div className="mb-8">
                    <Link href="/dashboard/revisions" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to Revisions
                    </Link>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <PenTool className="w-8 h-8 text-rose-400" />
                        Request a Revision
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Tell us what you'd like to change about your active project deliverables.
                    </p>
                </div>

                <div className="card-elevated bg-[#0a0a0e] p-6 sm:p-8">
                    <RevisionForm projects={clientProjects} />
                </div>
            </FadeIn>
        </div>
    );
}
