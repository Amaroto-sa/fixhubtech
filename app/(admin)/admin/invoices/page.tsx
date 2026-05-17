import Link from "next/link";
import { db } from "@/db";
import { invoices, projects, clients } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { BadgeDollarSign, ArrowRight, Search, Filter } from "lucide-react";

export default async function InvoicesPage() {
    let allInvoices: any[] = [];
    let dbError = false;

    try {
        allInvoices = await db
            .select({
                id: invoices.id,
                invoiceNumber: invoices.invoiceNumber,
                amount: invoices.amount,
                currency: invoices.currency,
                status: invoices.status,
                dueDate: invoices.dueDate,
                projectName: projects.name,
                clientName: clients.companyName
            })
            .from(invoices)
            .leftJoin(projects, eq(invoices.projectId, projects.id))
            .leftJoin(clients, eq(invoices.clientId, clients.id))
            .orderBy(desc(invoices.createdAt));
    } catch (error) {
        console.error("Admin Invoices DB Error:", error);
        dbError = true;
    }

    const getStatusTheme = (status: string) => {
        switch(status.toLowerCase()) {
            case "draft": return "text-muted-foreground bg-white/5 border-white/10";
            case "sent": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "paid": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "overdue": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
            case "cancelled": return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
            default: return "text-muted-foreground bg-white/5 border-white/10";
        }
    };

    return (
        <div className="pb-10">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <BadgeDollarSign className="w-8 h-8 text-emerald-400" />
                            Invoices & Billing
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Manage payments, billing, and financial health.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Search invoices..." 
                                className="pl-9 pr-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-foreground w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-foreground">
                            <Filter className="w-4 h-4" />
                        </button>
                        <Link 
                            href="/admin/invoices/new"
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap"
                        >
                            Create Invoice
                        </Link>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch invoices.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Invoice</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {allInvoices.length > 0 ? allInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-[14px] font-medium text-foreground tracking-tight">{inv.invoiceNumber}</p>
                                        <p className="text-[12px] text-muted-foreground">{inv.projectName || "General"}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{inv.clientName || "Unknown"}</td>
                                    <td className="px-6 py-4 text-[14px] font-medium text-foreground">
                                        {inv.currency} {Number(inv.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(inv.status)}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-muted-foreground">
                                        {new Date(inv.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            href={`/admin/invoices/${inv.id}`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        {dbError ? "Unable to load invoices." : "No invoices found. Generate an invoice to get paid."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </SectionReveal>
        </div>
    );
}
