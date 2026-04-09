// FixHub Technology — Flutterwave Payment Integration

interface CreatePaymentLinkOptions {
    amount: number;
    currency: string;
    customerEmail: string;
    customerName: string;
    invoiceId: string;
    description: string;
    redirectUrl?: string;
}

interface PaymentLinkResult {
    link: string;
    reference: string;
}

/**
 * Create a Flutterwave payment link for an invoice
 */
export async function createPaymentLink(
    options: CreatePaymentLinkOptions
): Promise<PaymentLinkResult> {
    const reference = `FH-${options.invoiceId}-${Date.now()}`;

    const payload = {
        tx_ref: reference,
        amount: options.amount,
        currency: options.currency,
        customer: {
            email: options.customerEmail,
            name: options.customerName,
        },
        customizations: {
            title: "FixHub Technology",
            description: options.description,
            logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
        },
        redirect_url:
            options.redirectUrl ||
            `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/invoices?payment=success`,
    };

    try {
        const response = await fetch(
            "https://api.flutterwave.com/v3/payments",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();

        if (data.status === "success") {
            return {
                link: data.data.link,
                reference,
            };
        }

        throw new Error(data.message || "Failed to create payment link");
    } catch (err) {
        console.error("[FLUTTERWAVE ERROR]", err);
        throw err;
    }
}

/**
 * Verify a Flutterwave transaction
 */
export async function verifyTransaction(
    transactionId: string
): Promise<{
    success: boolean;
    amount: number;
    currency: string;
    reference: string;
}> {
    try {
        const response = await fetch(
            `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                },
            }
        );

        const data = await response.json();

        if (data.status === "success" && data.data.status === "successful") {
            return {
                success: true,
                amount: data.data.amount,
                currency: data.data.currency,
                reference: data.data.tx_ref,
            };
        }

        return {
            success: false,
            amount: 0,
            currency: "",
            reference: "",
        };
    } catch (err) {
        console.error("[FLUTTERWAVE VERIFY ERROR]", err);
        return {
            success: false,
            amount: 0,
            currency: "",
            reference: "",
        };
    }
}

/**
 * Validate Flutterwave webhook signature
 */
export function validateWebhookSignature(
    payload: string,
    signature: string
): boolean {
    const hash = process.env.FLUTTERWAVE_WEBHOOK_HASH;
    return signature === hash;
}
