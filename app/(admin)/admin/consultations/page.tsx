import { db } from "@/db";
import { consultationRequests } from "@/db/schema";
import { desc } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    MessageSquare,
    ArrowRight
} from "lucide-react";

export default async function ConsultationsPage() {
    let allRequests: any[] = [];
    let dbError = false;

    try {
        allRequests = await db.select().from(consultationRequests).orderBy(desc(consultationRequests.createdAt));
    } catch (error) {
        console.error("Admin Consultations DB Error:", error);
        dbError = true;
    }

    const getStatusTheme = (status: string) => {
        if (status === "new") return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
        if (status === "contacted") return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
        return "text-muted-foreground border-white/10 bg-white/5";
    };

    return (
        <div className="pb-10 max-w-5xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <MessageSquare className="w-8 h-8 text-indigo-400" />
                            Consultation Requests
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            Review and manage inbound consultation bookings.
                        </p>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch consultation requests.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-hidden">
                    <div className="divide-y divide-white/[0.05]">
                        {allRequests.length > 0 ? allRequests.map((req) => (
                            <div key={req.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4 group">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-display text-sm font-bold text-foreground">{req.name}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${getStatusTheme(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {req.email} • Interest: {req.serviceInterest || "General"} • {new Date(req.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-sm font-medium">
                                    View <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )) : (
                            <div className="p-12 text-center bg-white/[0.01]">
                                <p className="text-muted-foreground">No consultation requests found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
