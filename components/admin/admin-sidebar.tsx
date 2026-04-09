"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminNavSections = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
        ],
    },
    {
        title: "Sales",
        items: [
            { label: "Leads", href: "/admin/leads", icon: "🎯" },
            { label: "Clients", href: "/admin/clients", icon: "👥" },
            { label: "Consultations", href: "/admin/consultations", icon: "📅" },
        ],
    },
    {
        title: "Operations",
        items: [
            { label: "Projects", href: "/admin/projects", icon: "📂" },
            { label: "Invoices", href: "/admin/invoices", icon: "💳" },
            { label: "Tickets", href: "/admin/tickets", icon: "🎫" },
        ],
    },
    {
        title: "Content",
        items: [
            { label: "Services", href: "/admin/services", icon: "🛠️" },
            { label: "Packages", href: "/admin/packages", icon: "📦" },
            { label: "Portfolio", href: "/admin/portfolio", icon: "🖼️" },
            { label: "Testimonials", href: "/admin/testimonials", icon: "⭐" },
            { label: "FAQs", href: "/admin/faqs", icon: "❓" },
            { label: "Content", href: "/admin/content", icon: "📝" },
        ],
    },
    {
        title: "System",
        items: [
            { label: "Users", href: "/admin/users", icon: "👤" },
            { label: "Settings", href: "/admin/settings", icon: "⚙️" },
        ],
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border/50 z-40 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-border/30">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-sm">
                        F
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-semibold text-sm text-foreground tracking-tight leading-tight">
                            FixHub
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground leading-tight">
                            Admin Console
                        </span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {adminNavSections.map((section) => (
                    <div key={section.title}>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 px-4">
                            {section.title}
                        </p>
                        <div className="space-y-0.5">
                            {section.items.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all",
                                            isActive
                                                ? "bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                                        )}
                                    >
                                        <span className="text-sm">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-border/30">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-semibold text-violet-400">
                        A
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Admin</p>
                        <p className="text-xs text-muted-foreground truncate">Super Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
