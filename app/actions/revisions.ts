"use server";
import { db } from "@/db";
import { projectRevisions, users, clients } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function requestRevision(projectId: string, description: string) {
    if (!projectId || !description) throw new Error("Missing required fields");

    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, user.id));
    const [clientProfile] = await db.select().from(clients).where(eq(clients.userId, dbUser.id));

    await db.insert(projectRevisions).values({
        clientId: clientProfile.id,
        projectId,
        description,
        status: "submitted"
    });

    revalidatePath("/dashboard/revisions");
}
