"use server";

import { db } from "@/db";
import { portfolioItems } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createPortfolioItem(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const clientName = formData.get("clientName") as string;
        const summary = formData.get("summary") as string;
        const imageUrl = formData.get("imageUrl") as string;
        
        if (!title) {
            return { success: false, error: "Title is required." };
        }

        await db.insert(portfolioItems).values({
            title,
            slug,
            clientName: clientName || null,
            summary: summary || null,
            screenshots: imageUrl ? [imageUrl] : [],
            status: "published"
        });

        revalidatePath("/admin/portfolio");
        revalidatePath("/portfolio"); 
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create portfolio item:", error);
        return { success: false, error: "Failed to create portfolio item" };
    }
}

export async function updatePortfolioItem(id: string, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const clientName = formData.get("clientName") as string;
        const summary = formData.get("summary") as string;
        const imageUrl = formData.get("imageUrl") as string;
        const status = formData.get("status") as string || "published";
        
        if (!title) {
            return { success: false, error: "Title is required." };
        }

        const { eq } = await import("drizzle-orm");

        await db.update(portfolioItems).set({
            title,
            slug,
            clientName: clientName || null,
            summary: summary || null,
            screenshots: imageUrl ? [imageUrl] : [],
            status,
            updatedAt: new Date()
        }).where(eq(portfolioItems.id, id));

        revalidatePath("/admin/portfolio");
        revalidatePath("/portfolio");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update portfolio item:", error);
        return { success: false, error: "Failed to update portfolio item" };
    }
}
