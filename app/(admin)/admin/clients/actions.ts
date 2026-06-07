"use server";

import { db } from "@/db";
import { clients } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createClient(formData: FormData) {
    try {
        const companyName = formData.get("companyName") as string;
        const contactName = formData.get("contactName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const country = formData.get("country") as string;
        
        if (!companyName || !contactName || !email) {
            return { success: false, error: "Company, Contact, and Email are required." };
        }

        await db.insert(clients).values({
            companyName,
            contactName,
            email,
            phone: phone || null,
            country: country || null,
            isActive: true
        });

        revalidatePath("/admin/clients");
        return { success: true };
    } catch (error) {
        console.error("Failed to create client:", error);
        return { success: false, error: "Failed to create client" };
    }
}
