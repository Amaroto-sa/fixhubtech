import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, projectMessages, projects } from "@/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { MessageSquare, Send } from "lucide-react";
import { MessageInput } from "@/components/dashboard/message-input";

export default async function ClientMessagesPage() {
    const user = await currentUser();
    if (!user) return null;

    let userMessages: any[] = [];
    let dbError = false;

    try {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (dbUser.length > 0) {
            const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
            if (clientProfile.length > 0) {
                const clientProjects = await db.select({ id: projects.id, name: projects.name }).from(projects).where(eq(projects.clientId, clientProfile[0].id));
                const projectIds = clientProjects.map(p => p.id);
                
                if (projectIds.length > 0) {
                    userMessages = await db
                        .select({
                            id: projectMessages.id,
                            content: projectMessages.content,
                            isRead: projectMessages.isRead,
                            createdAt: projectMessages.createdAt,
                            senderName: users.firstName,
                            projectName: projects.name
                        })
                        .from(projectMessages)
                        .leftJoin(projects, eq(projectMessages.projectId, projects.id))
                        .leftJoin(users, eq(projectMessages.senderId, users.id))
                        .where(inArray(projectMessages.projectId, projectIds))
                        .orderBy(desc(projectMessages.createdAt));
                }
            }
        }
    } catch (error) {
        console.error("Client Messages DB Error:", error);
        dbError = true;
    }

    // Default empty array if query failed or no projects
    let availableProjects: {id: string, name: string}[] = [];
    try {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (dbUser.length > 0) {
            const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
            if (clientProfile.length > 0) {
                availableProjects = await db.select({ id: projects.id, name: projects.name }).from(projects).where(eq(projects.clientId, clientProfile[0].id));
            }
        }
    } catch(e) {}

    return (
        <div className="pb-10 h-[80vh] flex flex-col">
            <FadeIn>
                <div className="mb-6">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-indigo-400" />
                        Project Communications
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Chat directly with the team working on your projects.
                    </p>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1} className="flex-1 min-h-0">
                <div className="card-elevated bg-[#0a0a0e] border border-white/[0.05] h-full flex flex-col">
                    {/* Message History */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {userMessages.length > 0 ? userMessages.map((msg) => {
                            const isMe = msg.senderName === user.firstName;
                            return (
                                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-[12px] font-medium text-foreground/80">{msg.senderName || "FixHub Team"}</span>
                                        <span className="text-[10px] text-muted-foreground">{new Date(msg.createdAt).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${isMe ? 'bg-indigo-500 text-white rounded-tr-sm' : 'bg-white/10 text-foreground/90 border border-white/[0.05] rounded-tl-sm'}`}>
                                        <p className="text-[14px] whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground mt-1 px-1">Project: {msg.projectName}</span>
                                </div>
                            );
                        }) : (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <MessageSquare className="w-12 h-12 text-white/5 mb-4" />
                                <p className="text-muted-foreground">No messages found.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Input Area */}
                    <div className="p-4 bg-white/[0.02] border-t border-white/[0.05]">
                        <MessageInput projects={availableProjects} />
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
