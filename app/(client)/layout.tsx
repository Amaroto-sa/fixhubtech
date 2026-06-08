import { ClientSidebar } from "@/components/dashboard/client-sidebar";
import { UserButton } from "@clerk/nextjs";
import { MobileNav } from "@/components/shared/mobile-nav";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dark min-h-screen bg-background flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0 border-r border-white/[0.05]">
                <div className="fixed top-0 left-0 bottom-0 w-64">
                    <ClientSidebar />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Nav (Mobile & Breadcrumbs) */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-white/[0.05] bg-[#0a0a0e]/80 backdrop-blur-xl sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <MobileNav>
                            <ClientSidebar />
                        </MobileNav>
                        <span className="font-display font-semibold text-foreground tracking-tight hidden md:block">Client Portal</span>
                        <span className="font-display font-semibold text-foreground tracking-tight md:hidden">Portal</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-3 pr-1 py-1">
                            <span className="text-xs font-medium text-foreground hidden sm:block">My Account</span>
                            <UserButton 
                                afterSignOutUrl="/" 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-7 h-7 border border-white/20",
                                    }
                                }}
                            />
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
