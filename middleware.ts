import { NextFetchEvent, NextRequest } from "next/server";

// Dynamic import wrapper to prevent Netlify from evaluating Clerk before environment variables (CLERK_SECRET_KEY) are fully hydrated
const runClerkMiddleware = async (req: NextRequest, event: NextFetchEvent) => {
    const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");

    // Routes that require authentication
    const isClientRoute = createRouteMatcher(["/dashboard(.*)"]);
    const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

    const middleware = clerkMiddleware(async (auth, req) => {
        // Protect client routes
        if (isClientRoute(req)) {
            await auth().protect();
        }

        // Protect admin routes + check for admin role
        if (isAdminRoute(req)) {
            await auth().protect((has) => {
                return has({ role: "org:admin" }) || has({ role: "org:super_admin" });
            });
        }
    });

    return middleware(req, event);
};

export default function middleware(req: NextRequest, event: NextFetchEvent) {
    return runClerkMiddleware(req, event);
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
