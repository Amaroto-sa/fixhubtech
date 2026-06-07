import Link from "next/link";
import { db } from "@/db";
import { invoices, projects, clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    ArrowLeft,
    BadgeDollarSign,
    Calendar,
    FolderKanban,
    FileText
} from "lucide-react";

export default async function InvoiceDetailsPage({ params }: { params: { id: string } }) {
    const invoiceId = params.id;
    
    let invoiceDetails: any = null;
    try {
        const [result] = await db
            .select({
                id: invoices.id,
                invoiceNumber: invoices.invoiceNumber,
                amount: invoices.amount,
                currency: invoices.currency,
                status: invoices.status,
                dueDate: invoices.dueDate,
                createdAt: invoices.createdAt,
                notes: invoices.notes,
                paymentLink: invoices.paymentLink,
                projectName: projects.name,
                clientName: clients.companyName,
                clientEmail: clients.email,
            })
            .from(invoices)
            .leftJoin(projects, eq(invoices.projectId, projects.id))
            .leftJoin(clients, eq(invoices.clientId, clients.id))
            .where(eq(invoices.id, invoiceId));
            
        invoiceDetails = result;
    } catch (error) {
        console.error("Failed to fetch invoice details:", error);
    }

    if (!invoiceDetails) {
        notFound();
    }

    const getStatusTheme = (status: string) => {
        switch(status?.toLowerCase()) {
            case "draft": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case "sent": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
            case "paid": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "overdue": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
            default: return "text-muted-foreground bg-white/5 border-white/10";
        }
    };

    return (
        <div className="pb-10 max-w-4xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/admin/invoices"
                            className="p-2 bg-[#0a0a0e] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                                    Invoice {invoiceDetails.invoiceNumber}
                                </h1>
                                <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(invoiceDetails.status)}`}>
                                    {invoiceDetails.status}
                                </span>
                            </div>
                            <p className="text-muted-foreground/80 text-sm flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Created on {new Date(invoiceDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SectionReveal delay={0.1}>
                    <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05] h-full flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-lg border bg-emerald-500/10 border-emerald-500/20 shadow-sm">
                                <BadgeDollarSign className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Amount</p>
                                <p className="text-3xl font-display font-bold text-foreground">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoiceDetails.currency }).format(invoiceDetails.amount)}
                                </p>
                            </div>
                        </div>
                        {invoiceDetails.paymentLink && (
                            <div className="mt-4 pt-4 border-t border-white/[0.05]">
                                <p className="text-xs text-muted-foreground mb-2">Payment Link</p>
                                <a href={invoiceDetails.paymentLink} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300 break-all">
                                    {invoiceDetails.paymentLink}
                                </a>
                            </div>
                        )}
                    </div>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                    <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05] h-full space-y-4 flex flex-col justify-center">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Due Date</p>
                                <p className="text-sm font-medium text-foreground">
                                    {new Date(invoiceDetails.dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.05]">
                            <FolderKanban className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Associated Project</p>
                                <p className="text-sm font-medium text-foreground">{invoiceDetails.projectName || "None"}</p>
                            </div>
                        </div>
                    </div>
                </SectionReveal>
            </div>

            <SectionReveal delay={0.3}>
                <div className="card-elevated bg-[#0a0a0e] border border-white/[0.05] overflow-hidden">
                    <div className="p-5 border-b border-white/[0.05] bg-white/[0.01]">
                        <h2 className="text-sm font-semibold text-foreground">Client Details</h2>
                    </div>
                    <div className="p-6 flex flex-col md:flex-row gap-8">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Company / Name</p>
                            <p className="text-sm text-foreground/90">{invoiceDetails.clientName}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                            <p className="text-sm text-foreground/90">{invoiceDetails.clientEmail}</p>
                        </div>
                    </div>
                </div>
            </SectionReveal>
            
            {invoiceDetails.notes && (
                <SectionReveal delay={0.4}>
                    <div className="mt-6 card-elevated bg-[#0a0a0e] border border-white/[0.05] overflow-hidden">
                        <div className="p-5 border-b border-white/[0.05] bg-white/[0.01]">
                            <h2 className="text-sm font-semibold text-foreground">Notes</h2>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-foreground/90 whitespace-pre-wrap">{invoiceDetails.notes}</p>
                        </div>
                    </div>
                </SectionReveal>
            )}
        </div>
    );
}
