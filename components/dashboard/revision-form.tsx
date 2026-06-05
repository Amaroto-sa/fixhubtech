"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestRevision } from "@/app/actions/revisions";
import { Save } from "lucide-react";

export function RevisionForm({ projects }: { projects: { id: string; name: string }[] }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (projects.length === 0) {
        return <div className="text-muted-foreground p-4 bg-white/5 rounded-lg border border-white/10">You must have an active project to request a revision.</div>;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        try {
            await requestRevision(
                formData.get("projectId") as string,
                formData.get("description") as string
            );
            router.push("/dashboard/revisions");
            router.refresh();
        } catch (error) {
            alert("Failed to request revision.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2 text-foreground/90">Select Project</label>
                <select required name="projectId" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                    {projects.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#0a0a0e]">{p.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-foreground/90">What needs to be revised?</label>
                <textarea required name="description" rows={6} placeholder="Describe exactly what needs changing (e.g. 'Please change the hero image on the home page to the new one I uploaded...')" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"></textarea>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition-colors shadow-lg shadow-rose-500/20">
                    <Save className="w-4 h-4" /> {isSubmitting ? "Submitting..." : "Submit Revision"}
                </button>
            </div>
        </form>
    );
}
