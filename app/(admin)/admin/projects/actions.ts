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

export async function createProject(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const clientId = formData.get("clientId") as string;
        const serviceType = formData.get("serviceType") as string;
        const dueDateStr = formData.get("dueDate") as string;
        
        if (!name || !clientId) {
            return { success: false, error: "Name and Client are required." };
        }

        await db.insert(projects).values({
            name,
            clientId,
            serviceType: serviceType || null,
            status: "onboarding",
            dueDate: dueDateStr ? new Date(dueDateStr) : null,
            paymentStatus: "pending"
        });

        revalidatePath("/admin/projects");
        return { success: true };
    } catch (error) {
        console.error("Failed to create project:", error);
        return { success: false, error: "Failed to create project" };
    }
}
