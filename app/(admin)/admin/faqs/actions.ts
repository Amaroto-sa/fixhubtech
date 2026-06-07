"use server";

import { db } from "@/db";
import { faqs } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createFaq(formData: FormData) {
    try {
        const question = formData.get("question") as string;
        const answer = formData.get("answer") as string;
        const category = formData.get("category") as string;
        
        if (!question || !answer) {
            return { success: false, error: "Question and Answer are required." };
        }

        await db.insert(faqs).values({
            question,
            answer,
            category: category || null,
            isActive: true
        });

        revalidatePath("/admin/faqs");
        revalidatePath("/faq"); // public route
        return { success: true };
    } catch (error) {
        console.error("Failed to create FAQ:", error);
        return { success: false, error: "Failed to create FAQ" };
    }
}
