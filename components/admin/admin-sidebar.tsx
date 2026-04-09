"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import {
    LayoutDashboard, Target, Users, Calendar, FolderKanban,
    CreditCard, LifeBuoy, Wrench, Package, ImageIcon,
    Star, HelpCircle, FileText, UserCog, Settings
} from "lucide-react";

const adminNavSections = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        ],
    },
    {
        title: "Sales",
        items: [
            { label: "Leads", href: "/admin/leads", icon: Target },
            { label: "Clients", href: "/admin/clients", icon: Users },
            { label: "Consultations", href: "/admin/consultations", icon: Calendar },
        ],
    },
    {
        title: "Operations",
        items: [
            { label: "Projects", href: "/admin/projects", icon: FolderKanban },
            { label: "Invoices", href: "/admin/invoices", icon: CreditCard },
            { label: "Tickets", href: "/admin/tickets", icon: LifeBuoy },
        ],
    },
    {
        title: "Content",
        items: [
            { label: "Services", href: "/admin/services", icon: Wrench },
            { label: "Packages", href: "/admin/packages", icon: Package },
            { label: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
            { label: "Testimonials", href: "/admin/testimonials", icon: Star },
            { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
            { label: "Content", href: "/admin/content", icon: FileText },
        ],
    },
    {
        title: "System",
        items: [
            { label: "Users", href: "/admin/users", icon: UserCog },
            { label: "Settings", href: "/admin/settings", icon: Settings },
        ],
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { isLoaded, isSignedIn, user } = useUser();

    return (
        <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#0a0a0e] border-r border-white/[0.05] z-40 flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-white/[0.05]">
                <Link href="/admin/dashboard" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                        F
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-semibold text-sm text-foreground tracking-tight leading-none mb-1">
                            FixHub
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-indigo-400/80 leading-none">
                            Admin Console
                        </span>
                    </div>
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
                {adminNavSections.map((section) => (
                    <div key={section.title}>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-semibold mb-2 px-3">
                            {section.title}
                        </p>
                        <div className="space-y-0.5">
                            {section.items.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all duration-200 group",
                                            isActive
                                                ? "bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                                        )}
                                    >
                                        <Icon className={cn("w-[16px] h-[16px] transition-colors", isActive ? "text-indigo-400" : "text-muted-foreground/70 group-hover:text-foreground")} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
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
                            <p className="text-[13px] font-medium text-foreground truncate tracking-tight">{user.fullName || "Admin"}</p>
                            <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider text-indigo-400">Super Admin</p>
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
