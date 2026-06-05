"use server";
import { db } from "@/db";
import { files, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveFileRecord(data: {
    projectId: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
    category: string;
}) {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, user.id));
    if (!dbUser) throw new Error("User not found");

    await db.insert(files).values({
        projectId: data.projectId,
        uploadedBy: dbUser.id,
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        fileSize: data.fileSize,
        fileType: data.fileType,
        category: data.category,
    });

    revalidatePath("/dashboard/files");
}
