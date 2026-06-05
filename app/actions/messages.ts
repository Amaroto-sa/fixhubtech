"use server";
import { db } from "@/db";
import { projectMessages, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function sendMessage(projectId: string, content: string) {
    if (!content.trim() || !projectId) return;

    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, user.id));
    
    await db.insert(projectMessages).values({
        projectId,
        senderId: dbUser.id,
        content
    });
    
    revalidatePath("/dashboard/messages");
}
