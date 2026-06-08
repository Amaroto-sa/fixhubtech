import { FadeIn } from "@/components/shared/motion";
import { Building2, ShoppingBag, HeartPulse, GraduationCap, Plane, Wallet } from "lucide-react";

export const metadata = {
    title: "Industries We Serve | FixHub",
    description: "Tailored digital solutions across various business sectors.",
};

const industries = [
    { name: "E-Commerce & Retail", icon: ShoppingBag, desc: "High-converting storefronts and inventory systems." },
    { name: "Healthcare & Tech", icon: HeartPulse, desc: "HIPAA-compliant portals and patient management." },
    { name: "Finance & Fintech", icon: Wallet, desc: "Secure transaction platforms and dashboards." },
    { name: "Real Estate", icon: Building2, desc: "Property listings and agent CRMs." },
    { name: "Education", icon: GraduationCap, desc: "E-learning platforms and student portals." },
    { name: "Travel & Hospitality", icon: Plane, desc: "Booking engines and itinerary managers." },
];

export default function IndustriesPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                            Industries We Serve
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We bring domain expertise to build software that actually solves the unique challenges of your sector.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {industries.map((industry, i) => (
                            <div key={i} className="card-elevated bg-background border border-border/50 p-8 hover:border-indigo-500/30 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
                                    <industry.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{industry.name}</h3>
                                <p className="text-muted-foreground">{industry.desc}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
