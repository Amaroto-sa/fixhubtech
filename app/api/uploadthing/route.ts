import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Calculate the proper callback URL to prevent Vercel env var conflicts
const callbackUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/uploadthing`
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/uploadthing`
    : undefined;

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: callbackUrl,
  }
});
