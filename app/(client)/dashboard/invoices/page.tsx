import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients, invoices, projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { CreditCard, ExternalLink, Download } from "lucide-react";

export default async function ClientInvoicesPage() {
    const user = await currentUser();
    if (!user) return null;

    let userInvoices: any[] = [];
    let dbError = false;

    try {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (dbUser.length > 0) {
            const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
            if (clientProfile.length > 0) {
                userInvoices = await db
                    .select({
                        id: invoices.id,
                        invoiceNumber: invoices.invoiceNumber,
                        amount: invoices.amount,
                        currency: invoices.currency,
                        status: invoices.status,
                        dueDate: invoices.dueDate,
                        paymentLink: invoices.paymentLink,
                        projectName: projects.name
                    })
                    .from(invoices)
                    .leftJoin(projects, eq(invoices.projectId, projects.id))
                    .where(eq(invoices.clientId, clientProfile[0].id))
                    .orderBy(desc(invoices.createdAt));
            }
        }
    } catch (error) {
        console.error("Client Invoices DB Error:", error);
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
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-amber-400" />
                        Invoices
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Manage your billing, view payment history, and settle outstanding balances.
                    </p>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Invoice</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {userInvoices.length > 0 ? userInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-[14px] font-medium text-foreground tracking-tight">{inv.invoiceNumber}</p>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-foreground/80">{inv.projectName || "General"}</td>
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
                                        {inv.status.toLowerCase() !== "paid" && inv.paymentLink ? (
                                            <a 
                                                href={inv.paymentLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-[12px] font-medium rounded transition-colors"
                                            >
                                                Pay Now <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-muted-foreground text-[12px] font-medium rounded transition-colors">
                                                Download <Download className="w-3 h-3" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        {dbError ? "Unable to load invoices." : "You have no invoices at the moment."}
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
