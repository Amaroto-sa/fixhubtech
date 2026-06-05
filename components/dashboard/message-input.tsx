"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { sendMessage } from "@/app/actions/messages";

export function MessageInput({ projects }: { projects: { id: string; name: string }[] }) {
    const [content, setContent] = useState("");
    const [projectId, setProjectId] = useState(projects[0]?.id || "");
    const [isSending, setIsSending] = useState(false);

    if (projects.length === 0) {
        return <div className="text-muted-foreground text-sm">No active projects to message about.</div>;
    }

    const handleSend = async () => {
        if (!content.trim() || !projectId) return;
        setIsSending(true);
        try {
            await sendMessage(projectId, content);
            setContent("");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <select 
                value={projectId} 
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full sm:w-64 bg-[#0a0a0e] border border-white/10 rounded-lg p-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            >
                {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
            
            <div className="relative flex items-center">
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="Type your message here... (Press Enter to send)" 
                    className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl py-3 pl-4 pr-14 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none h-[50px]"
                    rows={1}
                />
                <button 
                    onClick={handleSend}
                    disabled={isSending || !content.trim()}
                    className="absolute right-2 p-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white rounded-lg transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
