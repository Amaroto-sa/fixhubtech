import { NextRequest, NextResponse } from "next/server";
import { auditFormSchema } from "@/lib/validation/schemas";

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

        // In production: insert into auditRequests table
        // await db.insert(auditRequests).values({...});
        // Send confirmation + admin notification

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
