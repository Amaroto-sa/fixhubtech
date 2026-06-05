"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTicket } from "@/app/actions/tickets";
import { Save } from "lucide-react";

export function TicketForm({ projects }: { projects: { id: string; name: string }[] }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        try {
            await createTicket(
                formData.get("projectId") as string || null,
                formData.get("subject") as string,
                formData.get("description") as string,
                formData.get("priority") as string,
                formData.get("category") as string
            );
            router.push("/dashboard/tickets");
            router.refresh();
        } catch (error) {
            alert("Failed to create ticket.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2 text-foreground/90">Related Project (Optional)</label>
                <select name="projectId" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                    <option value="" className="bg-[#0a0a0e]">General Support / No Project</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#0a0a0e]">{p.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-foreground/90">Subject</label>
                    <input required type="text" name="subject" placeholder="Brief summary of the issue" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-foreground/90">Category</label>
                        <select name="category" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                            <option value="Bug Report" className="bg-[#0a0a0e]">Bug Report</option>
                            <option value="Billing" className="bg-[#0a0a0e]">Billing</option>
                            <option value="Feature Request" className="bg-[#0a0a0e]">Feature Request</option>
                            <option value="Other" className="bg-[#0a0a0e]">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-foreground/90">Priority</label>
                        <select name="priority" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                            <option value="low" className="bg-[#0a0a0e]">Low</option>
                            <option value="medium" className="bg-[#0a0a0e]">Medium</option>
                            <option value="high" className="bg-[#0a0a0e]">High</option>
                            <option value="urgent" className="bg-[#0a0a0e]">Urgent</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-foreground/90">Description</label>
                <textarea required name="description" rows={5} placeholder="Provide details about your issue..." className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"></textarea>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition-colors shadow-lg shadow-emerald-500/20">
                    <Save className="w-4 h-4" /> {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </button>
            </div>
        </form>
    );
}
