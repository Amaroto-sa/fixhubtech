"use server";

import { db } from "@/db";
import { supportTickets, supportMessages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateTicketStatus(id: string, status: string) {
    try {
        await db.update(supportTickets)
            .set({ status, updatedAt: new Date() })
            .where(eq(supportTickets.id, id));
            
        revalidatePath("/admin/tickets");
        revalidatePath(`/admin/tickets/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update ticket status:", error);
        return { success: false, error: "Failed to update ticket status" };
    }
}

export async function addTicketMessage(ticketId: string, content: string, senderId?: string) {
    try {
        if (!ticketId || !content) return { success: false, error: "Ticket and Content are required." };

        await db.insert(supportMessages).values({
            ticketId,
            content,
            senderId: senderId || null,
        });

        revalidatePath(`/admin/tickets/${ticketId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to add ticket message:", error);
        return { success: false, error: "Failed to add ticket message" };
    }
}
