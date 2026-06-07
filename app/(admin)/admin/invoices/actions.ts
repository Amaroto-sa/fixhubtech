"use server";

import { db } from "@/db";
import { invoices } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createInvoice(formData: FormData) {
    try {
        const invoiceNumber = formData.get("invoiceNumber") as string;
        const clientId = formData.get("clientId") as string;
        const projectId = formData.get("projectId") as string;
        const amountStr = formData.get("amount") as string;
        const dueDateStr = formData.get("dueDate") as string;
        const notes = formData.get("notes") as string;
        
        if (!invoiceNumber || !clientId || !projectId || !amountStr || !dueDateStr) {
            return { success: false, error: "All required fields must be filled." };
        }

        await db.insert(invoices).values({
            invoiceNumber,
            clientId,
            projectId,
            amount: amountStr, // Decimal is a string in neon
            dueDate: new Date(dueDateStr),
            status: "draft",
            notes: notes || null
        });

        revalidatePath("/admin/invoices");
        return { success: true };
    } catch (error) {
        console.error("Failed to create invoice:", error);
        return { success: false, error: "Failed to create invoice" };
    }
}
