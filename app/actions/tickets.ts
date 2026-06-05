"use server";
import { db } from "@/db";
import { supportTickets, users, clients } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTicket(projectId: string | null, subject: string, description: string, priority: string, category: string) {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, user.id));
    const [clientProfile] = await db.select().from(clients).where(eq(clients.userId, dbUser.id));

    await db.insert(supportTickets).values({
        clientId: clientProfile.id,
        projectId: projectId || null,
        subject,
        description,
        priority,
        category,
        status: "open"
    });

    revalidatePath("/dashboard/tickets");
}
