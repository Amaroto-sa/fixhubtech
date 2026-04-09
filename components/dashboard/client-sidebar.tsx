"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const clientNavItems = [
    { label: "Overview", href: "/dashboard", icon: "📊" },
    { label: "Projects", href: "/dashboard/projects", icon: "📂" },
    { label: "Files", href: "/dashboard/files", icon: "📁" },
    { label: "Invoices", href: "/dashboard/invoices", icon: "💳" },
    { label: "Revisions", href: "/dashboard/revisions", icon: "🔄" },
    { label: "Tickets", href: "/dashboard/tickets", icon: "🎫" },
    { label: "Messages", href: "/dashboard/messages", icon: "💬" },
    { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export function ClientSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border/50 z-40 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-border/30">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-sm">
                        F
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-semibold text-sm text-foreground tracking-tight leading-tight">
                            FixHub
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground leading-tight">
                            Client Portal
                        </span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {clientNavItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all",
                                isActive
                                    ? "bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                            )}
                        >
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-border/30">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-semibold text-indigo-400">
                        U
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">User</p>
                        <p className="text-xs text-muted-foreground truncate">Client</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
