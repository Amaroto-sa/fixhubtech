import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FadeIn } from "@/components/shared/motion";
import { FileCode2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UploadForm } from "@/components/dashboard/upload-form";

export default async function NewFileUploadPage() {
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
        <div className="pb-10 max-w-2xl">
            <FadeIn>
                <div className="mb-8">
                    <Link href="/dashboard/files" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to Files
                    </Link>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <FileCode2 className="w-8 h-8 text-cyan-400" />
                        Upload File
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Securely upload assets or documents for your project.
                    </p>
                </div>

                <div className="card-elevated bg-[#0a0a0e] p-6 sm:p-8">
                    <UploadForm projects={clientProjects} />
                </div>
            </FadeIn>
        </div>
    );
}
