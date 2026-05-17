"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
    try {
        await db.update(leads)
            .set({ status, updatedAt: new Date() })
            .where(eq(leads.id, id));
            
        revalidatePath("/admin/leads");
        revalidatePath(`/admin/leads/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update lead status:", error);
        return { success: false, error: "Failed to update lead status" };
    }
}

export async function deleteLead(id: string) {
    try {
        await db.delete(leads).where(eq(leads.id, id));
        revalidatePath("/admin/leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete lead:", error);
        return { success: false, error: "Failed to delete lead" };
    }
}
