import { NextRequest, NextResponse } from "next/server";
import { auditFormSchema } from "@/lib/validation/schemas";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { sendLeadConfirmation, notifyAdminNewLead } from "@/lib/emails";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsed = auditFormSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Validation failed", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const data = parsed.data;

        await db.insert(leads).values({
            name: data.businessName, // Fallback since audit doesn't have personal name
            email: data.email,
            phone: data.whatsapp,
            company: data.businessName,
            industry: data.industry,
            currentWebsite: data.websiteUrl,
            projectSummary: data.mainIssue,
            serviceNeeded: "Free SEO Audit",
            source: "audit",
            status: "new",
        });

        await sendLeadConfirmation({ name: data.businessName, email: data.email });
        await notifyAdminNewLead({ 
            name: data.businessName, 
            email: data.email, 
            service: "Free SEO Audit", 
            source: "audit" 
        });

        return NextResponse.json(
            { success: true, message: "Audit request submitted successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("[AUDIT API ERROR]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
