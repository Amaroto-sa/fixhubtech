import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextResponse, NextRequest } from "next/server";

// SANITIZE VERCEL ENV VARS: If the user copy-pasted quotes into Vercel, this strips them out.
// UploadThing's API will reject keys with quotes (returning 400 Bad Request).
if (process.env.UPLOADTHING_SECRET) {
  process.env.UPLOADTHING_SECRET = process.env.UPLOADTHING_SECRET.replace(/^['"]|['"]$/g, '');
}
if (process.env.UPLOADTHING_APP_ID) {
  process.env.UPLOADTHING_APP_ID = process.env.UPLOADTHING_APP_ID.replace(/^['"]|['"]$/g, '');
}

// FORCE DELETE UPLOADTHING_URL ON VERCEL
// If the user accidentally set UPLOADTHING_URL=http://localhost:3000 in Vercel, it breaks everything.
if (process.env.VERCEL || process.env.VERCEL_ENV) {
  delete process.env.UPLOADTHING_URL;
}

// Calculate the proper callback URL to prevent Vercel env var conflicts
const callbackUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/uploadthing`
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/uploadthing`
    : process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/uploadthing`
      : undefined;

const handlers = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: callbackUrl,
  }
});

export async function GET(req: NextRequest) {
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  if (!process.env.UPLOADTHING_SECRET) {
    console.error("FATAL: UPLOADTHING_SECRET is missing from environment variables.");
    return NextResponse.json(
      { error: "UPLOADTHING_SECRET is not set in Vercel." }, 
      { status: 500 }
    );
  }
  
  if (!process.env.UPLOADTHING_APP_ID) {
    console.error("FATAL: UPLOADTHING_APP_ID is missing from environment variables.");
    return NextResponse.json(
      { error: "UPLOADTHING_APP_ID is not set in Vercel." }, 
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
