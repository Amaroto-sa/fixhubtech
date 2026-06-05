import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { Settings, Save, User, Building2, MapPin } from "lucide-react";
import { updateProfile } from "@/app/actions/settings";
import { SubmitButton } from "@/components/dashboard/submit-button";

export default async function ClientSettingsPage() {
    const user = await currentUser();
    if (!user) return null;

    let profile: any = null;
    let dbError = false;

    try {
        const dbUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (dbUser.length > 0) {
            const clientProfile = await db.select().from(clients).where(eq(clients.userId, dbUser[0].id)).limit(1);
            if (clientProfile.length > 0) {
                profile = { ...dbUser[0], ...clientProfile[0] };
            } else {
                profile = dbUser[0]; // Fallback if client record isn't fully set up
            }
        }
    } catch (error) {
        console.error("Client Settings DB Error:", error);
        dbError = true;
    }

    return (
        <div className="pb-10 max-w-4xl">
            <FadeIn>
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <Settings className="w-8 h-8 text-zinc-400" />
                        Account Settings
                    </h1>
                    <p className="text-muted-foreground/80 text-lg">
                        Update your company details and billing information.
                    </p>
                </div>
            </FadeIn>

            <SectionReveal delay={0.1}>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch your profile settings.
                    </div>
                )}
                
                <div className="space-y-6">
                    {/* Personal Info */}
                    <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                        <h2 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-muted-foreground" />
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">First Name</label>
                                <input type="text" defaultValue={profile?.firstName || ""} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 text-foreground" readOnly />
                            </div>
                            <div>
                                <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Last Name</label>
                                <input type="text" defaultValue={profile?.lastName || ""} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 text-foreground" readOnly />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email Address</label>
                                <input type="email" defaultValue={profile?.email || ""} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 text-foreground" readOnly />
                                <p className="text-[11px] text-muted-foreground mt-2">Email addresses must be updated via your Clerk account settings.</p>
                            </div>
                        </div>
                    </div>

                    {/* Company Info */}
                    <div className="card-elevated bg-[#0a0a0e] p-6 border border-white/[0.05]">
                        <h2 className="text-lg font-semibold tracking-tight text-foreground mb-6 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-muted-foreground" />
                            Company Profile
                        </h2>
                        <form action={updateProfile} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Company Name</label>
                                    <input type="text" name="companyName" defaultValue={profile?.companyName || ""} placeholder="e.g. Acme Corp" className="w-full px-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground transition-all" />
                                </div>
                                <div>
                                    <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Contact Phone</label>
                                    <input type="text" name="phone" defaultValue={profile?.phone || ""} placeholder="+1 (555) 000-0000" className="w-full px-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground transition-all" />
                                </div>
                            </div>
                            
                            <h3 className="text-[13px] font-semibold tracking-tight text-foreground border-b border-white/[0.05] pb-2 mt-6 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" /> Billing Address
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Country</label>
                                    <input type="text" name="country" defaultValue={profile?.country || ""} placeholder="United States" className="w-full px-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground transition-all" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Full Address</label>
                                    <textarea name="billingAddress" defaultValue={profile?.billingAddress || ""} placeholder="123 Business St, Suite 100..." rows={3} className="w-full px-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-foreground transition-all resize-none"></textarea>
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-4">
                                <SubmitButton label="Save Changes" />
                            </div>
                        </form>
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
