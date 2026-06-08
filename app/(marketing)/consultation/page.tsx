import { FadeIn } from "@/components/shared/motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
    title: "Book a Consultation | FixHub",
    description: "Schedule a free strategy session with our team.",
};

export default function ConsultationPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-4xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-sm text-indigo-500 font-medium mb-6">
                            <Calendar className="w-4 h-4" />
                            <span>Free Strategy Session</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                            Let's discuss your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                                next big project.
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Book a 30-minute discovery call to explore how our team can help you achieve your technical and business goals.
                        </p>
                    </div>

                    <div className="card-elevated bg-background/80 backdrop-blur-xl border border-border/50 p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Calendar Integration Pending</h2>
                        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                            Please connect your Calendly or Cal.com embed code here. In the meantime, you can reach out to us via our contact form.
                        </p>
                        <Link 
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
                        >
                            Go to Contact Form
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
