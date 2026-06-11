import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextResponse, NextRequest } from "next/server";

// Securely read and sanitize the environment variables without mutating process.env
const secret = (process.env.UPLOADTHING_SECRET || "").replace(/^['"]|['"]$/g, '');
const appId = (process.env.UPLOADTHING_APP_ID || "").replace(/^['"]|['"]$/g, '');

const handlers = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: appId,
    uploadthingSecret: secret,
    isDev: process.env.NODE_ENV === "development",
    // Explicitly define the callback URL to prevent Vercel's dynamic URL resolution from failing UploadThing's strict URL validation.
    callbackUrl: process.env.NODE_ENV === "development" 
      ? "http://localhost:3000/api/uploadthing" 
      : "https://www.fixhubtech.com/api/uploadthing"
  }
});

export async function GET(req: NextRequest) {
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  if (!secret) {
    console.error("FATAL: UPLOADTHING_SECRET is missing from environment variables.");
    return NextResponse.json(
      { error: "UPLOADTHING_SECRET is not set." }, 
      { status: 500 }
    );
  }
  
  if (!appId) {
    console.error("FATAL: UPLOADTHING_APP_ID is missing from environment variables.");
    return NextResponse.json(
      { error: "UPLOADTHING_APP_ID is not set." }, 
      { status: 500 }
    );
  }

  try {
    return await handlers.POST(req);
  } catch (error: any) {
    console.error("UploadThing POST Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error in UploadThing" }, 
      { status: 500 }
    );
  }
}
