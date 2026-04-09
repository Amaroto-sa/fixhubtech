import { ClientSidebar } from "@/components/dashboard/client-sidebar";
import { UserButton } from "@clerk/nextjs";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
                <ClientSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Nav (Mobile & Breadcrumbs) */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-white/[0.05] bg-[#0a0a0e] sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        {/* Empty space for breadcrumbs later or a mobile menu toggle */}
                        <span className="md:hidden font-display font-semibold text-foreground tracking-tight">FixHub Portal</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* We hide the user button on desktop topbar since it's in the sidebar, but show it on mobile */}
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
