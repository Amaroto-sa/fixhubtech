import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Your FixHub Technology client dashboard — track projects, invoices, files, and more.",
};

export default function ClientDashboard() {
    // Stats cards data
    const stats = [
        {
            label: "Active Projects",
            value: "3",
            change: "+1 this month",
            color: "from-indigo-500/20 to-indigo-500/5",
            icon: "📂",
        },
        {
            label: "Pending Invoices",
            value: "1",
            change: "$1,499 due",
            color: "from-amber-500/20 to-amber-500/5",
            icon: "💳",
        },
        {
            label: "Unread Messages",
            value: "5",
            change: "2 new today",
            color: "from-cyan-500/20 to-cyan-500/5",
            icon: "💬",
        },
        {
            label: "Open Tickets",
            value: "0",
            change: "All resolved",
            color: "from-emerald-500/20 to-emerald-500/5",
            icon: "🎫",
        },
    ];

    const recentProjects = [
        {
            name: "Company Website Redesign",
            status: "In Progress",
            statusColor: "text-indigo-400",
            milestone: "Design Review",
            dueDate: "Apr 15, 2026",
        },
        {
            name: "Landing Page — Q2 Campaign",
            status: "Client Review",
            statusColor: "text-amber-400",
            milestone: "Final Feedback",
            dueDate: "Apr 18, 2026",
        },
        {
            name: "Booking System Integration",
            status: "Planning",
            statusColor: "text-cyan-400",
            milestone: "Scope Approval",
            dueDate: "Apr 22, 2026",
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                    Welcome back 👋
                </h1>
                <p className="text-muted-foreground">
                    Here&apos;s an overview of your projects and recent activity.
                </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`card-elevated p-6 bg-gradient-to-b ${stat.color} to-transparent`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="text-2xl">{stat.icon}</span>
                        </div>
                        <p className="font-display text-3xl font-bold text-foreground mb-1">
                            {stat.value}
                        </p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* Recent projects */}
            <div className="card-elevated p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg font-semibold text-foreground">
                        Your Projects
                    </h2>
                    <Link
                        href="/dashboard/projects"
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        View all →
                    </Link>
                </div>
                <div className="space-y-3">
                    {recentProjects.map((project, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg">
                                📂
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                    {project.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Next: {project.milestone} · Due {project.dueDate}
                                </p>
                            </div>
                            <span className={`text-xs font-medium ${project.statusColor}`}>
                                {project.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Link href="/dashboard/files" className="card-elevated p-6 hover:border-indigo-500/30 transition-colors group">
                    <div className="text-2xl mb-3">📁</div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-indigo-400 transition-colors">Upload Files</h3>
                    <p className="text-xs text-muted-foreground">Share content, assets, or references for your project.</p>
                </Link>
                <Link href="/dashboard/tickets" className="card-elevated p-6 hover:border-indigo-500/30 transition-colors group">
                    <div className="text-2xl mb-3">🎫</div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-indigo-400 transition-colors">Create Ticket</h3>
                    <p className="text-xs text-muted-foreground">Need help? Open a support ticket and we&apos;ll respond fast.</p>
                </Link>
                <Link href="/dashboard/invoices" className="card-elevated p-6 hover:border-indigo-500/30 transition-colors group">
                    <div className="text-2xl mb-3">💳</div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-indigo-400 transition-colors">Pay Invoice</h3>
                    <p className="text-xs text-muted-foreground">View and pay outstanding invoices securely.</p>
                </Link>
            </div>
        </div>
    );
}
