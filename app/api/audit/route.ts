import { NextRequest, NextResponse } from "next/server";
import { auditFormSchema } from "@/lib/validation/schemas";
import { db } from "@/db";
import { auditRequests } from "@/db/schema";

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

        await db.insert(auditRequests).values({
            businessName: data.businessName,
            websiteUrl: data.websiteUrl,
            industry: data.industry,
            mainIssue: data.mainIssue,
            email: data.email,
            whatsapp: data.whatsapp,
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
