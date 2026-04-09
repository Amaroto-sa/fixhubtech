import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.text();
        const headers = {
            "svix-id": req.headers.get("svix-id") || "",
            "svix-timestamp": req.headers.get("svix-timestamp") || "",
            "svix-signature": req.headers.get("svix-signature") || "",
        };

        // Verify Clerk webhook
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
        const event = wh.verify(payload, headers) as {
            type: string;
            data: Record<string, unknown>;
        };

        switch (event.type) {
            case "user.created": {
                const { id, email_addresses, first_name, last_name, image_url } =
                    event.data as {
                        id: string;
                        email_addresses: { email_address: string }[];
                        first_name: string;
                        last_name: string;
                        image_url: string;
                    };

                // In production: create user in database
                // await db.insert(users).values({
                //   clerkId: id,
                //   email: email_addresses[0].email_address,
                //   firstName: first_name,
                //   lastName: last_name,
                //   avatar: image_url,
                //   role: "client",
                // });

                console.log(`[CLERK] User created: ${id}`);
                break;
            }

            case "user.updated": {
                // In production: update user record
                console.log("[CLERK] User updated:", event.data.id);
                break;
            }

            case "user.deleted": {
                // In production: soft-delete or deactivate user
                console.log("[CLERK] User deleted:", event.data.id);
                break;
            }
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("[CLERK WEBHOOK ERROR]", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}
