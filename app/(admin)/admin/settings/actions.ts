"use server";

import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const twitter = formData.get("twitter") as string;
        const linkedin = formData.get("linkedin") as string;
        const instagram = formData.get("instagram") as string;

        const { eq } = await import("drizzle-orm");

        const settingsToUpdate = [
            { key: "contact_email", value: email || "hello@fixhubtech.com", label: "Contact Email", category: "contact" },
            { key: "social_twitter", value: twitter || "https://twitter.com/fixhubtech", label: "Twitter URL", category: "social" },
            { key: "social_linkedin", value: linkedin || "https://linkedin.com/company/fixhubtech", label: "LinkedIn URL", category: "social" },
            { key: "social_instagram", value: instagram || "https://instagram.com/fixhubtech", label: "Instagram URL", category: "social" }
        ];

        for (const setting of settingsToUpdate) {
            // Check if exists
            const existing = await db.query.siteSettings.findFirst({
                where: eq(siteSettings.key, setting.key)
            });

            if (existing) {
                await db.update(siteSettings)
                    .set({ value: setting.value, updatedAt: new Date() })
                    .where(eq(siteSettings.key, setting.key));
            } else {
                await db.insert(siteSettings).values(setting);
            }
        }

        revalidatePath("/", "layout");
        return { success: true };
    } catch (error) {
        console.error("Failed to update settings:", error);
        return { success: false, error: "Failed to update settings" };
    }
}
