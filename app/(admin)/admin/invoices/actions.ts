"use server";

import { db } from "@/db";
import { invoices, invoiceItems } from "@/db/schema";
import { eq } from "drizzle-orm";
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

export async function updateInvoiceStatus(id: string, status: string) {
    try {
        await db.update(invoices)
            .set({ status, updatedAt: new Date() })
            .where(eq(invoices.id, id));
            
        revalidatePath("/admin/invoices");
        revalidatePath(`/admin/invoices/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to update invoice status:", error);
        return { success: false, error: "Failed to update invoice status" };
    }
}

export async function addInvoiceItem(formData: FormData) {
    try {
        const invoiceId = formData.get("invoiceId") as string;
        const description = formData.get("description") as string;
        const quantity = Number(formData.get("quantity")) || 1;
        const unitPriceStr = formData.get("unitPrice") as string;
        
        if (!invoiceId || !description || !unitPriceStr) return { success: false, error: "Missing required fields" };

        const unitPrice = parseFloat(unitPriceStr);
        const total = (quantity * unitPrice).toFixed(2);

        await db.insert(invoiceItems).values({
            invoiceId,
            description,
            quantity,
            unitPrice: unitPrice.toFixed(2),
            total
        });

        // Optional: Update invoice total amount here by re-summing items
        revalidatePath(`/admin/invoices/${invoiceId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to add invoice item:", error);
        return { success: false, error: "Failed to add invoice item" };
    }
}
