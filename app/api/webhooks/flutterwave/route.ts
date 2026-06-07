import { NextRequest, NextResponse } from "next/server";
import { validateWebhookSignature } from "@/lib/payments";
import { db } from "@/db";
import { invoices, payments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get("verif-hash") || "";
        const body = await req.text();

        // Validate webhook signature
        if (!validateWebhookSignature(body, signature)) {
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 401 }
            );
        }

        const event = JSON.parse(body);

        if (event.event === "charge.completed" && event.data.status === "successful") {
            const { tx_ref, amount, currency, id } = event.data;

            // Extract invoice ID from tx_ref (format: FH-{invoiceId}-{timestamp})
            const parts = tx_ref.split("-");
            const invoiceId = parts[1];

            // 1. Record payment in payments table
            await db.insert(payments).values({
                invoiceId,
                amount: amount.toString(),
                currency,
                provider: "flutterwave",
                providerRef: id.toString(),
                status: "successful",
                metadata: { tx_ref, raw_event: event.data },
            });

            // 2. Update invoice status to "paid"
            await db.update(invoices).set({
                status: "paid",
                paidAt: new Date(),
                receiptRef: id.toString(),
                updatedAt: new Date(),
            }).where(eq(invoices.id, invoiceId));

            console.log(`[PAYMENT] Invoice ${invoiceId} paid: ${currency} ${amount}`);
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("[FLUTTERWAVE WEBHOOK ERROR]", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}
