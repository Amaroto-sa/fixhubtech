"use server";

import { db } from "@/db";
import { packages } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createPackage(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const description = formData.get("description") as string;
        
        if (!name || !price) {
            return { success: false, error: "Name and Price are required." };
        }

        await db.insert(packages).values({
            name,
            price,
            description: description || null,
            isActive: true
        });

        revalidatePath("/admin/packages");
        revalidatePath("/pricing"); // public route
        return { success: true };
    } catch (error) {
        console.error("Failed to create package:", error);
        return { success: false, error: "Failed to create package" };
    }
}
