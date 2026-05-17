import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import {
    ArrowLeft,
    Building2,
    Mail,
    Phone,
    Globe,
    Calendar,
    Briefcase,
    DollarSign,
    Target
} from "lucide-react";
import { updateLeadStatus } from "../actions";
import { format } from "date-fns";

export default async function LeadDetailsPage({ params }: { params: { id: string } }) {
    const leadRecords = await db.select().from(leads).where(eq(leads.id, params.id));
    const lead = leadRecords[0];

    if (!lead) {
        notFound();
    }

    return (
        <div className="pb-10">
            {/* Header / Breadcrumb */}
            <FadeIn>
                <div className="mb-8">
                    <Link 
                        href="/admin/leads"
                        className="inline-flex items-center text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors mb-4 gap-1"
                    >
                        <ArrowLeft className="w-3 h-3" /> Back to Leads
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2">
                                {lead.name}
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                {lead.company || "Individual Prospect"}
                            </p>
                        </div>
                        
                        {/* Status Update Form */}
                        <form action={async (formData: FormData) => {
                            "use server";
                            const status = formData.get("status") as string;
                            if (status) {
                                await updateLeadStatus(lead.id, status);
                            }
                        }} className="flex items-center gap-3">
                            <select 
                                name="status"
                                defaultValue={lead.status}
                                className="px-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-foreground"
                            >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="lost">Lost</option>
                                <option value="converted">Converted to Client</option>
                            </select>
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors"
                            >
                                Update Status
                            </button>
                        </form>
                    </div>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    <SectionReveal delay={0.1}>
                        <div className="card-elevated bg-[#0a0a0e] p-6">
                            <h2 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
                                <Target className="w-5 h-5 text-indigo-400" />
                                Project Request Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Service Needed</p>
                                    <p className="text-[15px] text-foreground/90 font-medium">{lead.serviceNeeded || "Not specified"}</p>
                                </div>
                                <div>
                                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Budget Range</p>
                                    <p className="text-[15px] text-foreground/90 font-medium">{lead.budgetRange || "Not specified"}</p>
                                </div>
                                <div>
                                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Timeline</p>
                                    <p className="text-[15px] text-foreground/90 font-medium">{lead.timeline || "Not specified"}</p>
                                </div>
                                <div>
                                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Current Website</p>
                                    {lead.currentWebsite ? (
                                        <a href={lead.currentWebsite} target="_blank" rel="noreferrer" className="text-[15px] text-indigo-400 hover:underline font-medium break-all">
                                            {lead.currentWebsite}
                                        </a>
                                    ) : (
                                        <p className="text-[15px] text-foreground/90 font-medium">None</p>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Summary / Message</p>
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                                    <p className="text-[14px] text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                        {lead.projectSummary || "No additional details provided."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>

                {/* Right Column: Contact & Meta */}
                <div className="space-y-6">
                    <SectionReveal delay={0.2}>
                        <div className="card-elevated bg-[#0a0a0e] p-6">
                            <h3 className="text-[14px] font-semibold tracking-tight text-foreground mb-4 border-b border-white/[0.05] pb-3">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Email</p>
                                        <a href={`mailto:${lead.email}`} className="text-[14px] font-medium text-foreground hover:text-indigo-400 transition-colors">{lead.email}</a>
                                    </div>
                                </div>
                                {lead.phone && (
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Phone</p>
                                            <a href={`tel:${lead.phone}`} className="text-[14px] font-medium text-foreground hover:text-indigo-400 transition-colors">{lead.phone}</a>
                                        </div>
                                    </div>
                                )}
                                {lead.company && (
                                    <div className="flex items-start gap-3">
                                        <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Company</p>
                                            <p className="text-[14px] font-medium text-foreground">{lead.company}</p>
                                        </div>
                                    </div>
                                )}
                                {lead.industry && (
                                    <div className="flex items-start gap-3">
                                        <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Industry</p>
                                            <p className="text-[14px] font-medium text-foreground">{lead.industry}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.3}>
                        <div className="card-elevated bg-[#0a0a0e] p-6">
                            <h3 className="text-[14px] font-semibold tracking-tight text-foreground mb-4 border-b border-white/[0.05] pb-3">Metadata</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Received On</p>
                                        <p className="text-[14px] font-medium text-foreground">{format(new Date(lead.createdAt), "PPP 'at' p")}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Globe className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Source</p>
                                        <p className="text-[14px] font-medium text-foreground capitalize">{lead.source}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </div>
    );
}
