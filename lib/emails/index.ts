// FixHub Technology — Email Abstraction
// Uses Resend for transactional emails

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}

/**
 * Send a transactional email via Resend
 */
export async function sendEmail({
    to,
    subject,
    html,
    replyTo,
}: EmailPayload): Promise<{ success: boolean; error?: string }> {
    try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "FixHub <noreply@fixhubtech.com>",
            to,
            subject,
            html,
            replyTo: replyTo || process.env.RESEND_REPLY_TO,
        });

        if (error) {
            console.error("[EMAIL ERROR]", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error("[EMAIL EXCEPTION]", err);
        return { success: false, error: "Failed to send email" };
    }
}

/**
 * Send lead notification to admin
 */
export async function notifyAdminNewLead(lead: {
    name: string;
    email: string;
    service: string;
    source: string;
}) {
    const adminEmail = process.env.RESEND_REPLY_TO || "admin@fixhubtech.com";

    return sendEmail({
        to: adminEmail,
        subject: `New Lead: ${lead.name} — ${lead.service}`,
        html: `
      <h2>New Lead Received</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Service:</strong> ${lead.service}</p>
      <p><strong>Source:</strong> ${lead.source}</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads">View in Admin →</a></p>
    `,
    });
}

/**
 * Send confirmation to lead
 */
export async function sendLeadConfirmation(lead: {
    name: string;
    email: string;
}) {
    return sendEmail({
        to: lead.email,
        subject: "We received your request — FixHub Technology",
        html: `
      <h2>Thanks, ${lead.name}!</h2>
      <p>We've received your request and our team will review it shortly.</p>
      <p>You can expect to hear from us within 24 hours.</p>
      <br />
      <p>– The FixHub Technology Team</p>
    `,
    });
}
