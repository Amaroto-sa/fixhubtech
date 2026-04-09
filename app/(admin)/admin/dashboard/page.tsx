import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "FixHub Technology admin console — manage leads, projects, invoices, content, and more.",
};

export default function AdminDashboard() {
    const kpis = [
        {
            label: "New Leads",
            value: "24",
            change: "+8 this week",
            trend: "up",
            color: "from-indigo-500/20 to-indigo-500/5",
            icon: "🎯",
        },
        {
            label: "Active Projects",
            value: "12",
            change: "3 in review",
            trend: "neutral",
            color: "from-cyan-500/20 to-cyan-500/5",
            icon: "📂",
        },
        {
            label: "Revenue (MTD)",
            value: "$18,450",
            change: "+22% vs last month",
            trend: "up",
            color: "from-emerald-500/20 to-emerald-500/5",
            icon: "💰",
        },
        {
            label: "Overdue Invoices",
            value: "2",
            change: "$3,200 outstanding",
            trend: "down",
            color: "from-amber-500/20 to-amber-500/5",
            icon: "⚠️",
        },
        {
            label: "Open Tickets",
            value: "5",
            change: "1 urgent",
            trend: "neutral",
            color: "from-rose-500/20 to-rose-500/5",
            icon: "🎫",
        },
        {
            label: "Conversion Rate",
            value: "34%",
            change: "+5% this month",
            trend: "up",
            color: "from-violet-500/20 to-violet-500/5",
            icon: "📈",
        },
    ];

    const recentLeads = [
        { name: "James Okafor", company: "TechVenture", service: "Website Redesign", status: "New", time: "2h ago" },
        { name: "Maria Santos", company: "Bella Café", service: "Restaurant Pages", status: "Qualified", time: "5h ago" },
        { name: "David Kim", company: "Apex Realty", service: "Business Website", status: "Proposal Sent", time: "1d ago" },
        { name: "Aisha Mohammed", company: "Glow Studio", service: "Salon Booking", status: "New", time: "1d ago" },
    ];

    const activeProjects = [
        { name: "NovaTech Solutions Redesign", client: "NovaTech", progress: 75, status: "In Progress" },
        { name: "Golden Fork Menu System", client: "The Golden Fork", progress: 90, status: "Client Review" },
        { name: "Urban Fitness Website", client: "UrbanFit", progress: 40, status: "In Progress" },
    ];

    const statusColors: Record<string, string> = {
        "New": "text-emerald-400 bg-emerald-400/10",
        "Qualified": "text-indigo-400 bg-indigo-400/10",
        "Proposal Sent": "text-amber-400 bg-amber-400/10",
        "In Progress": "text-indigo-400",
        "Client Review": "text-amber-400",
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Overview of your platform operations and business metrics.
                </p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {kpis.map((kpi, idx) => (
                    <div
                        key={idx}
                        className={`card-elevated p-6 bg-gradient-to-b ${kpi.color} to-transparent`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-xl">{kpi.icon}</span>
                        </div>
                        <p className="font-display text-3xl font-bold text-foreground mb-1">
                            {kpi.value}
                        </p>
                        <p className="text-sm text-muted-foreground">{kpi.label}</p>
                        <p className="text-xs text-muted-foreground mt-2">{kpi.change}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent leads */}
                <div className="card-elevated p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-lg font-semibold text-foreground">
                            Recent Leads
                        </h2>
                        <Link
                            href="/admin/leads"
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            View all →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentLeads.map((lead, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 p-3 bg-secondary/30 rounded-xl"
                            >
                                <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-xs font-bold text-indigo-400">
                                    {lead.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {lead.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {lead.company} · {lead.service}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[lead.status] || "text-muted-foreground"}`}>
                                        {lead.status}
                                    </span>
                                    <p className="text-[10px] text-muted-foreground mt-1">{lead.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active projects */}
                <div className="card-elevated p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-lg font-semibold text-foreground">
                            Active Projects
                        </h2>
                        <Link
                            href="/admin/projects"
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            View all →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {activeProjects.map((project, idx) => (
                            <div key={idx} className="p-3 bg-secondary/30 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {project.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {project.client}
                                        </p>
                                    </div>
                                    <span className={`text-xs font-medium ${statusColors[project.status] || "text-muted-foreground"}`}>
                                        {project.status}
                                    </span>
                                </div>
                                {/* Progress bar */}
                                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1.5">
                                    {project.progress}% complete
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {[
                    { label: "Add Lead", href: "/admin/leads", icon: "➕" },
                    { label: "Create Project", href: "/admin/projects", icon: "📂" },
                    { label: "Issue Invoice", href: "/admin/invoices", icon: "💳" },
                    { label: "Edit Content", href: "/admin/content", icon: "📝" },
                ].map((action, idx) => (
                    <Link
                        key={idx}
                        href={action.href}
                        className="card-elevated p-5 text-center hover:border-indigo-500/30 transition-colors group"
                    >
                        <div className="text-2xl mb-2">{action.icon}</div>
                        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {action.label}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
