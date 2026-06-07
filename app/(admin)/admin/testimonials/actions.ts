"use server";

import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData: FormData) {
    try {
        const clientName = formData.get("clientName") as string;
        const clientCompany = formData.get("clientCompany") as string;
        const content = formData.get("content") as string;
        const ratingStr = formData.get("rating") as string;
        
        if (!clientName || !content) {
            return { success: false, error: "Client Name and Content are required." };
        }

        await db.insert(testimonials).values({
            clientName,
            clientCompany: clientCompany || null,
            content,
            rating: parseInt(ratingStr) || 5,
            isActive: true
        });

        revalidatePath("/admin/testimonials");
        revalidatePath("/"); // public route
        return { success: true };
    } catch (error) {
        console.error("Failed to create testimonial:", error);
        return { success: false, error: "Failed to create testimonial" };
    }
}
