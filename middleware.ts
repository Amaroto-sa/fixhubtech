import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that require authentication
const isClientRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    // Protect client routes — redirect to sign-in if unauthenticated
    if (isClientRoute(req)) {
        await auth.protect();
    }

    // Protect admin routes — require org:admin or org:super_admin role
    if (isAdminRoute(req)) {
        await auth.protect((has) => {
            return has({ role: "org:admin" }) || has({ role: "org:super_admin" });
        });
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
