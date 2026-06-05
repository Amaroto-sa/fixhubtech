"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { saveFileRecord } from "@/app/actions/files";
import { useRouter } from "next/navigation";

export function UploadForm({ projects }: { projects: { id: string; name: string }[] }) {
    const router = useRouter();
    const [projectId, setProjectId] = useState(projects[0]?.id || "");
    const [category, setCategory] = useState("reference");
    const [isUploading, setIsUploading] = useState(false);

    if (projects.length === 0) {
        return <div className="text-muted-foreground p-4 bg-white/5 rounded-lg border border-white/10">You must have an active project to upload files.</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2 text-foreground/90">Select Project</label>
                <select 
                    value={projectId} 
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                    {projects.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#0a0a0e]">{p.name}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium mb-2 text-foreground/90">File Category</label>
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                    <option value="reference" className="bg-[#0a0a0e]">Reference / Inspiration</option>
                    <option value="brand_asset" className="bg-[#0a0a0e]">Brand Asset (Logo, Colors)</option>
                    <option value="document" className="bg-[#0a0a0e]">Document (Brief, Copy)</option>
                    <option value="deliverable" className="bg-[#0a0a0e]">Deliverable</option>
                </select>
            </div>

            <div className="mt-8 border border-white/10 rounded-xl bg-white/[0.02] p-2">
                <UploadDropzone
                    endpoint="clientUploads"
                    onUploadBegin={() => setIsUploading(true)}
                    onClientUploadComplete={async (res) => {
                        if (res && res.length > 0) {
                            const file = res[0];
                            await saveFileRecord({
                                projectId,
                                fileName: file.name,
                                fileUrl: file.url,
                                fileSize: file.size,
                                fileType: file.type || "unknown",
                                category
                            });
                            router.push("/dashboard/files");
                        }
                        setIsUploading(false);
                    }}
                    onUploadError={(error: Error) => {
                        alert(`Upload failed: ${error.message}`);
                        setIsUploading(false);
                    }}
                    appearance={{
                        container: "border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors py-8",
                        label: "text-cyan-400 hover:text-cyan-300 font-medium",
                        allowedContent: "text-muted-foreground mt-2",
                        button: "bg-cyan-500 text-white mt-4 ut-uploading:bg-cyan-500/50"
                    }}
                />
            </div>
        </div>
    );
}
