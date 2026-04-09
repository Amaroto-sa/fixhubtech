import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        const parsed = quoteFormSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Validation failed", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const data = parsed.data;

        // In production: insert into leads table with source "quote"
        // const [lead] = await db.insert(leads).values({
        //   name: data.name,
        //   email: data.email,
        //   phone: data.phone,
        //   company: data.businessName,
        //   industry: data.industry,
        //   serviceNeeded: data.serviceNeeded,
        //   budgetRange: data.budgetRange,
        //   timeline: data.timeline,
        //   currentWebsite: data.currentWebsite,
        //   projectSummary: data.projectSummary,
        //   preferredContact: data.preferredContact,
        //   source: "quote",
        //   status: "new",
        // }).returning();

        // In production: send emails
        // await sendLeadConfirmation({ name: data.name, email: data.email });
        // await notifyAdminNewLead({ name: data.name, email: data.email, service: data.serviceNeeded, source: "quote" });

        return NextResponse.json(
            { success: true, message: "Quote request submitted successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("[QUOTE API ERROR]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
