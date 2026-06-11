"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateUserRole(id: string, role: string) {
    try {
        await db.update(users)
            .set({ role, updatedAt: new Date() })
            .where(eq(users.id, id));
            
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to update user role:", error);
        return { success: false, error: "Failed to update user role" };
    }
}

export async function toggleUserStatus(id: string, isActive: boolean) {
    try {
        await db.update(users)
            .set({ isActive, updatedAt: new Date() })
            .where(eq(users.id, id));
            
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to update user status:", error);
        return { success: false, error: "Failed to update user status" };
    }
}

export async function deleteUser(id: string) {
    try {
        await db.delete(users).where(eq(users.id, id));
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}
