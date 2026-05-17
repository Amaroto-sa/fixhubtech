"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProjectStatus(id: string, status: string) {
    try {
        await db.update(projects)
            .set({ status, updatedAt: new Date() })
            .where(eq(projects.id, id));
            
        revalidatePath("/admin/projects");
        revalidatePath(`/admin/projects/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update project status:", error);
        return { success: false, error: "Failed to update project status" };
    }
}
