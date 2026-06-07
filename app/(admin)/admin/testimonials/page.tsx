import Link from "next/link";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { desc } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    MessageSquareQuote,
    Plus,
    ArrowRight
} from "lucide-react";

export default async function TestimonialsPage() {
    let allTestimonials: any[] = [];
    let dbError = false;

    try {
        allTestimonials = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
    } catch (error) {
        console.error("Admin Testimonials DB Error:", error);
        dbError = true;
    }

    return (
        <div className="pb-10 max-w-5xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <MessageSquareQuote className="w-8 h-8 text-indigo-400" />
                            Testimonials
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Manage client reviews and testimonials displayed on your site.
                        </p>
                    </div>
                    <Link 
                        href="/admin/testimonials/new"
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Testimonial
                    </Link>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch testimonials.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allTestimonials.length > 0 ? allTestimonials.map((testimonial) => (
                        <div key={testimonial.id} className="card-elevated bg-[#0a0a0e] border border-white/[0.05] p-6 hover:border-white/10 transition-colors group flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-display text-lg font-bold text-foreground">{testimonial.clientName}</h3>
                                    <p className="text-sm text-indigo-400">{testimonial.clientCompany}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${testimonial.isActive ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-muted-foreground border-white/10 bg-white/5'}`}>
                                    {testimonial.isActive ? "Active" : "Hidden"}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground italic mb-6 flex-1">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                                <span className="text-sm font-medium text-amber-400 flex items-center">
                                    {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                                </span>
                                <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-sm font-medium">
                                    Edit <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full p-12 text-center border border-white/10 rounded-xl bg-white/[0.01]">
                            <p className="text-muted-foreground">No testimonials found. Add a review to show social proof.</p>
                        </div>
                    )}
                </div>
            </SectionReveal>
        </div>
    );
}
