import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    Settings as SettingsIcon,
    CheckCircle2,
    Globe,
    Mail,
    Image as ImageIcon
} from "lucide-react";
import { updateSettings } from "./actions";
import { ImageUpload } from "@/components/admin/image-upload";

export default async function SettingsPage() {
    let settingsMap: Record<string, string> = {};
    try {
        const settings = await db.select().from(siteSettings);
        settings.forEach(s => {
            settingsMap[s.key] = s.value;
        });
    } catch (error) {
        console.error("Failed to fetch settings:", error);
    }

    async function handleSubmit(formData: FormData) {
        "use server";
        await updateSettings(formData);
    }

    return (
        <div className="pb-10 max-w-3xl mx-auto">
            <FadeIn>
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <SettingsIcon className="w-8 h-8 text-indigo-400" />
                        Platform Settings
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Manage global platform information and social integrations.
                    </p>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] border border-white/[0.05] p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-indigo-400" />
                        </div>
                        <h2 className="text-lg font-bold text-foreground font-display tracking-tight">Global Contact & Socials</h2>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2 mb-8">
                            <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                Brand Logo
                            </label>
                            <p className="text-xs text-muted-foreground mb-3">Upload your official brand logo. This replaces the default "F" block in the navbar and footer.</p>
                            <ImageUpload defaultValue={settingsMap["brand_logo"] || ""} />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                Official Contact Email
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                defaultValue={settingsMap["contact_email"] || "hello@fixhubtech.com"}
                                required
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="twitter" className="text-sm font-medium text-foreground">Twitter / X Profile URL</label>
                            <input 
                                type="url" 
                                id="twitter" 
                                name="twitter" 
                                defaultValue={settingsMap["social_twitter"] || "https://twitter.com/fixhubtech"}
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="linkedin" className="text-sm font-medium text-foreground">LinkedIn Company URL</label>
                            <input 
                                type="url" 
                                id="linkedin" 
                                name="linkedin" 
                                defaultValue={settingsMap["social_linkedin"] || "https://linkedin.com/company/fixhubtech"}
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="instagram" className="text-sm font-medium text-foreground">Instagram Profile URL</label>
                            <input 
                                type="url" 
                                id="instagram" 
                                name="instagram" 
                                defaultValue={settingsMap["social_instagram"] || "https://instagram.com/fixhubtech"}
                                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground"
                            />
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end">
                            <button 
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Save Global Settings
                            </button>
                        </div>
                    </form>
                </div>
            </SectionReveal>
        </div>
    );
}
