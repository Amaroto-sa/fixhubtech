"use server";

import { db } from "@/db";
import { files } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteFile(id: string) {
    try {
        await db.delete(files).where(eq(files.id, id));
        revalidatePath("/admin/files");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete file:", error);
        return { success: false, error: "Failed to delete file" };
    }
}
