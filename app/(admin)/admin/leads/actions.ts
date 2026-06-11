"use server";

import { db } from "@/db";
import { leads, clients } from "@/db/schema";
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

export async function createLead(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const company = formData.get("company") as string;
        const serviceNeeded = formData.get("serviceNeeded") as string;
        const source = formData.get("source") as string || "manual";
        
        if (!name || !email) {
            return { success: false, error: "Name and Email are required." };
        }

        await db.insert(leads).values({
            name,
            email,
            company: company || null,
            serviceNeeded: serviceNeeded || null,
            source,
            status: "new"
        });

        revalidatePath("/admin/leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to create lead:", error);
        return { success: false, error: "Failed to create lead" };
    }
}

export async function convertLeadToClient(leadId: string) {
    try {
        const [lead] = await db.select().from(leads).where(eq(leads.id, leadId));
        if (!lead) return { success: false, error: "Lead not found" };

        const [newClient] = await db.insert(clients).values({
            leadId: lead.id,
            companyName: lead.company || "Unknown Company",
            contactName: lead.name,
            email: lead.email,
            phone: lead.phone || null,
        }).returning();

        await db.update(leads)
            .set({ status: "converted", convertedClientId: newClient.id, updatedAt: new Date() })
            .where(eq(leads.id, leadId));

        revalidatePath("/admin/leads");
        revalidatePath("/admin/clients");
        return { success: true, clientId: newClient.id };
    } catch (error) {
        console.error("Failed to convert lead:", error);
        return { success: false, error: "Failed to convert lead" };
    }
}
