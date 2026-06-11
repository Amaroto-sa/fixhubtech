import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextRequest } from "next/server";

// Clean environment variables globally to prevent Vercel quote/space injection bugs
const cleanEnv = (val?: string) => val ? val.replace(/^['"]|['"]$/g, '').trim() : undefined;
const uploadthingId = cleanEnv(process.env.UPLOADTHING_APP_ID);
const uploadthingSecret = cleanEnv(process.env.UPLOADTHING_SECRET);

export async function GET(req: NextRequest) {
  const handlers = createRouteHandler({ router: ourFileRouter });
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  // Dynamically resolve the exact callback URL from the incoming request.
  // This completely bypasses Vercel's proxy issues, localhost leaks, and invalid protocol errors.
  let callbackUrl = `${req.nextUrl.origin}/api/uploadthing`;
  
  // Force HTTPS in production to prevent UploadThing from rejecting the URL with a 400 error.
  if (process.env.NODE_ENV === "production" && callbackUrl.startsWith("http://")) {
    callbackUrl = callbackUrl.replace("http://", "https://");
  }

  const handlers = createRouteHandler({
    router: ourFileRouter,
    config: {
      uploadthingId,
      uploadthingSecret,
      callbackUrl,
    }
  });

  return handlers.POST(req);
}
