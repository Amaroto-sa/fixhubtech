import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    Settings as SettingsIcon,
    AlertTriangle
} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="pb-10 max-w-5xl mx-auto">
            <FadeIn>
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <SettingsIcon className="w-8 h-8 text-indigo-400" />
                        Platform Settings
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Configure global application settings and integrations.
                    </p>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] border border-white/[0.05] p-12 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-amber-400" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">Settings Module Pending</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Global system settings are currently managed via environment variables (.env). A dynamic UI interface for system settings is scheduled for the next deployment phase.
                    </p>
                </div>
            </SectionReveal>
        </div>
    );
}
