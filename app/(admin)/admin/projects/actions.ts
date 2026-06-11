"use server";

import { db } from "@/db";
import { projects, projectMilestones, projectMessages, projectRevisions } from "@/db/schema";
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

export async function createProjectMilestone(formData: FormData) {
    try {
        const projectId = formData.get("projectId") as string;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const dueDateStr = formData.get("dueDate") as string;
        
        if (!projectId || !title) return { success: false, error: "Project and Title are required." };

        await db.insert(projectMilestones).values({
            projectId,
            title,
            description: description || null,
            dueDate: dueDateStr ? new Date(dueDateStr) : null,
            status: "pending"
        });

        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to create milestone:", error);
        return { success: false, error: "Failed to create milestone" };
    }
}

export async function updateMilestoneStatus(id: string, projectId: string, status: string) {
    try {
        await db.update(projectMilestones)
            .set({ 
                status, 
                completedAt: status === "completed" ? new Date() : null 
            })
            .where(eq(projectMilestones.id, id));
            
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update milestone status:", error);
        return { success: false, error: "Failed to update milestone status" };
    }
}

export async function addProjectMessage(projectId: string, content: string, senderId?: string) {
    try {
        if (!projectId || !content) return { success: false, error: "Project and Content are required." };

        await db.insert(projectMessages).values({
            projectId,
            content,
            senderId: senderId || null,
        });

        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to add project message:", error);
        return { success: false, error: "Failed to add project message" };
    }
}

export async function createProjectRevision(formData: FormData) {
    try {
        const projectId = formData.get("projectId") as string;
        const clientId = formData.get("clientId") as string;
        const description = formData.get("description") as string;
        const milestoneId = formData.get("milestoneId") as string;
        
        if (!projectId || !clientId || !description) return { success: false, error: "Missing required fields" };

        await db.insert(projectRevisions).values({
            projectId,
            clientId,
            description,
            milestoneId: milestoneId || null,
            status: "submitted"
        });

        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to create revision:", error);
        return { success: false, error: "Failed to create revision" };
    }
}

export async function updateRevisionStatus(id: string, projectId: string, status: string) {
    try {
        await db.update(projectRevisions)
            .set({ 
                status, 
                updatedAt: new Date() 
            })
            .where(eq(projectRevisions.id, id));
            
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update revision status:", error);
        return { success: false, error: "Failed to update revision status" };
    }
}
