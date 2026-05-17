import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/schemas";
import { db } from "@/db";
import { contactRequests } from "@/db/schema";
import { sendLeadConfirmation, notifyAdminNewLead } from "@/lib/emails";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        const parsed = contactFormSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Validation failed", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, phone, subject, message } = parsed.data;

        // Insert into contactRequests table
        await db.insert(contactRequests).values({
            name,
            email,
            phone,
            subject,
            message,
        });

        // Send confirmation + notify admin
        await sendLeadConfirmation({ name, email });
        await notifyAdminNewLead({ name, email, service: subject || "Contact", source: "contact" });

        return NextResponse.json(
            { success: true, message: "Contact request submitted successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("[CONTACT API ERROR]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
