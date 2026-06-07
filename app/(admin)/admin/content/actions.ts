"use server";

import { db } from "@/db";
import { contentSections } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateContentSection(id: string, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const subtitle = formData.get("subtitle") as string;
        const body = formData.get("body") as string;
        const ctaText = formData.get("ctaText") as string;
        const ctaLink = formData.get("ctaLink") as string;
        const isActive = formData.get("isActive") === "on";

        await db.update(contentSections)
            .set({
                title: title || null,
                subtitle: subtitle || null,
                body: body || null,
                ctaText: ctaText || null,
                ctaLink: ctaLink || null,
                isActive,
                updatedAt: new Date()
            })
            .where(eq(contentSections.id, id));

        revalidatePath("/admin/content");
        revalidatePath(`/admin/content/${id}`);
        // Also revalidate the public marketing routes so changes appear instantly
        revalidatePath("/", "layout"); 

        return { success: true };
    } catch (error) {
        console.error("Failed to update content section:", error);
        return { success: false, error: "Failed to update content section" };
    }
}
