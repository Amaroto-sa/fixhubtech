import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }

    const [dbUser] = await db.select().from(users).where(eq(users.clerkId, user.id));
    if (!dbUser || (dbUser.role !== "admin" && dbUser.role !== "super_admin")) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
                <AdminSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Nav (Mobile & Breadcrumbs) */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-white/[0.05] bg-[#0a0a0e] sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <span className="md:hidden font-display font-semibold text-foreground tracking-tight">FixHub Admin</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.03),transparent_50%)]">
                    <div className="p-6 md:p-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
