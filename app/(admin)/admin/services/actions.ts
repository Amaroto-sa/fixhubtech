"use server";

import { db } from "@/db";
import { services } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createService(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const shortDescription = formData.get("shortDescription") as string;
        const startingPrice = formData.get("startingPrice") as string;
        
        if (!title) {
            return { success: false, error: "Title is required." };
        }

        await db.insert(services).values({
            title,
            slug,
            shortDescription: shortDescription || null,
            startingPrice: startingPrice || null,
            isActive: true
        });

        revalidatePath("/admin/services");
        revalidatePath("/services"); // public route
        return { success: true };
    } catch (error) {
        console.error("Failed to create service:", error);
        return { success: false, error: "Failed to create service" };
    }
}
