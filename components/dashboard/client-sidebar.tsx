"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import {
    LayoutDashboard,
    FolderKanban,
    HardDrive,
    CreditCard,
    History,
    LifeBuoy,
    MessageSquare,
    Settings
} from "lucide-react";

const clientNavItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { label: "Files", href: "/dashboard/files", icon: HardDrive },
    { label: "Invoices", href: "/dashboard/invoices", icon: CreditCard },
    { label: "Revisions", href: "/dashboard/revisions", icon: History },
    { label: "Tickets", href: "/dashboard/tickets", icon: LifeBuoy },
    { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function ClientSidebar() {
    const pathname = usePathname();
    const { isLoaded, isSignedIn, user } = useUser();

    return (
        <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#0a0a0e] border-r border-white/[0.05] z-40 flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-white/[0.05]">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                        F
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-semibold text-sm text-foreground tracking-tight leading-none mb-1">
                            FixHub
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60 leading-none">
                            Client Portal
                        </span>
                    </div>
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                <div className="px-2 mb-2 text-xs font-medium text-muted-foreground/50 tracking-wider uppercase">Menu</div>
                {clientNavItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                                isActive
                                    ? "bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                            )}
                        >
                            <Icon className={cn("w-[18px] h-[18px] transition-colors", isActive ? "text-indigo-400" : "text-muted-foreground/70 group-hover:text-foreground")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom User Area */}
            <div className="p-4 border-t border-white/[0.05] bg-white/[0.01]">
                {isLoaded && isSignedIn ? (
                    <div className="flex items-center gap-3 px-2 py-1">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 border border-white/10",
                                }
                            }}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate tracking-tight">{user.fullName || "Client"}</p>
                            <p className="text-[11px] text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 px-2 py-1 opacity-50">
                        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3 w-16 bg-white/10 rounded" />
                            <div className="h-2 w-24 bg-white/10 rounded" />
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
