import { NextRequest, NextResponse } from "next/server";
import { validateWebhookSignature } from "@/lib/payments";

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

            // In production:
            // 1. Update invoice status to "paid"
            // 2. Record payment in payments table
            // 3. Update project payment status
            // 4. Send payment confirmation email

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
