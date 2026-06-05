"use server";
import { db } from "@/db";
import { clients, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, user.id));
    if (!dbUser) throw new Error("User not found");

    const companyName = formData.get("companyName") as string;
    const phone = formData.get("phone") as string;
    const country = formData.get("country") as string;
    const billingAddress = formData.get("billingAddress") as string;

    const [existingClient] = await db.select().from(clients).where(eq(clients.userId, dbUser.id));

    if (existingClient) {
        await db.update(clients).set({
            companyName,
            phone,
            country,
            billingAddress,
            updatedAt: new Date()
        }).where(eq(clients.userId, dbUser.id));
    } else {
        await db.insert(clients).values({
            userId: dbUser.id,
            companyName: companyName || "New Company",
            contactName: `${dbUser.firstName} ${dbUser.lastName}`,
            email: dbUser.email,
            phone,
            country,
            billingAddress,
        });
    }

    revalidatePath("/dashboard/settings");
}
