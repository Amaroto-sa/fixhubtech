import { db } from "@/db";
import { files, projects, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { FileIcon, Trash2, Download } from "lucide-react";

export default async function AdminFilesPage() {
    let allFiles: any[] = [];
    let dbError = false;

    try {
        allFiles = await db.select({
            file: files,
            project: projects,
            user: users
        })
        .from(files)
        .leftJoin(projects, eq(files.projectId, projects.id))
        .leftJoin(users, eq(files.uploadedBy, users.id))
        .orderBy(desc(files.createdAt));
    } catch (error) {
        console.error("Admin Files DB Error:", error);
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
        <div className="pb-10 max-w-6xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <FileIcon className="w-8 h-8 text-indigo-400" />
                            File Management
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Central repository for all client uploads, project assets, and documents.
                        </p>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch files.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-hidden">
                    <div className="divide-y divide-white/[0.05]">
                        {allFiles.length > 0 ? allFiles.map(({ file, project, user }) => (
                            <div key={file.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4 group">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-display text-sm font-bold text-foreground truncate max-w-md">
                                            {file.fileName}
                                        </h3>
                                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border text-indigo-400 border-indigo-500/20 bg-indigo-500/10">
                                            {file.category}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Project: <span className="text-foreground/80">{project?.name || "Unknown"}</span> • 
                                        Size: {formatBytes(file.fileSize)} • 
                                        Uploaded by: {user?.firstName || "System"} on {new Date(file.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a 
                                        href={file.fileUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="p-2 text-muted-foreground hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors"
                                        title="Download"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                    <button 
                                        className="p-2 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="p-12 text-center bg-white/[0.01]">
                                <p className="text-muted-foreground">No files have been uploaded yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
