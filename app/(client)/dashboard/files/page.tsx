import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, files, projects } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { FileCode2, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function ClientFilesPage() {
    const user = await currentUser();
    if (!user) return null;

    let userFiles: any[] = [];
    let dbError = false;

    try {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (dbUser.length > 0) {
            const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
            if (clientProfile.length > 0) {
                // Find client's projects to get their files
                const clientProjects = await db.select({ id: projects.id }).from(projects).where(eq(projects.clientId, clientProfile[0].id));
                const projectIds = clientProjects.map(p => p.id);
                
                if (projectIds.length > 0) {
                    userFiles = await db
                        .select({
                            id: files.id,
                            fileName: files.fileName,
                            fileUrl: files.fileUrl,
                            fileSize: files.fileSize,
                            fileType: files.fileType,
                            category: files.category,
                            createdAt: files.createdAt,
                            projectName: projects.name
                        })
                        .from(files)
                        .leftJoin(projects, eq(files.projectId, projects.id))
                        .where(inArray(files.projectId, projectIds))
                        .orderBy(desc(files.createdAt));
                }
            }
        }
    } catch (error) {
        console.error("Client Files DB Error:", error);
        dbError = true;
    }

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="pb-10">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <FileCode2 className="w-8 h-8 text-cyan-400" />
                            Project Deliverables & Files
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Access and download assets, documents, and final deliverables for your projects.
                        </p>
                    </div>
                    <Link href="/dashboard/files/new" className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap">
                        Upload File
                    </Link>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">File Name</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Size</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {userFiles.length > 0 ? userFiles.map((file) => (
                                <tr key={file.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-[14px] font-medium text-foreground tracking-tight flex items-center gap-2">
                                            {file.fileName}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground">{file.fileType}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{file.projectName}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border text-cyan-400 bg-cyan-400/10 border-cyan-400/20">
                                            {file.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-muted-foreground">{formatBytes(file.fileSize)}</td>
                                    <td className="px-6 py-4 text-[13px] text-muted-foreground">
                                        {new Date(file.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a 
                                            href={file.fileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-foreground text-[12px] font-medium rounded transition-colors"
                                        >
                                            View <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                        </a>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        {dbError ? "Unable to load files." : "No files have been uploaded to your projects yet."}
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
