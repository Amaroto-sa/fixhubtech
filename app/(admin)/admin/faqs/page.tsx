import Link from "next/link";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    HelpCircle,
    Plus,
    ArrowRight
} from "lucide-react";

export default async function FaqsPage() {
    let allFaqs: any[] = [];
    let dbError = false;

    try {
        allFaqs = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));
    } catch (error) {
        console.error("Admin FAQs DB Error:", error);
        dbError = true;
    }

    return (
        <div className="pb-10 max-w-5xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <HelpCircle className="w-8 h-8 text-indigo-400" />
                            FAQs
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Manage Frequently Asked Questions.
                        </p>
                    </div>
                    <Link 
                        href="/admin/faqs/new"
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add FAQ
                    </Link>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch FAQs.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-hidden">
                    <div className="divide-y divide-white/[0.05]">
                        {allFaqs.length > 0 ? allFaqs.map((faq) => (
                            <div key={faq.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-start justify-between gap-4 group">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-display text-sm font-bold text-foreground">{faq.question}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${faq.isActive ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-muted-foreground border-white/10 bg-white/5'}`}>
                                            {faq.isActive ? "Active" : "Hidden"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {faq.answer}
                                    </p>
                                </div>
                                <div className="flex items-center mt-1">
                                    <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-sm font-medium">
                                        Edit <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="p-12 text-center border border-white/10 bg-white/[0.01]">
                                <p className="text-muted-foreground">No FAQs found. Create one to answer common queries.</p>
                            </div>
                        )}
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
