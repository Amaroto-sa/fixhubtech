import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Create your FixHub Technology account to manage projects and track progress.",
};

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%)]" />

            <div className="relative z-10 w-full max-w-md mx-auto px-4 py-20">
                {/* Brand header */}
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-xl mx-auto mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                        F
                    </div>
                    <h1 className="font-display text-2xl font-bold text-foreground tracking-tight mb-2">
                        Create Account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Join FixHub to track your projects and manage your digital presence.
                    </p>
                </div>

                {/* Clerk SignUp Component */}
                <div className="flex justify-center">
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "bg-transparent shadow-none border-none p-0 w-full",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton:
                                    "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-all",
                                formButtonPrimary:
                                    "bg-gradient-to-b from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(79,70,229,0.4)] transition-all text-sm font-medium",
                                formFieldInput:
                                    "bg-white/[0.04] border-white/[0.08] focus:border-indigo-500/50 focus:ring-indigo-500/20 text-foreground rounded-lg",
                                formFieldLabel: "text-muted-foreground text-sm",
                                footerActionLink:
                                    "text-indigo-400 hover:text-indigo-300 transition-colors",
                                identityPreviewEditButton:
                                    "text-indigo-400 hover:text-indigo-300",
                                dividerLine: "bg-white/[0.08]",
                                dividerText: "text-muted-foreground/50",
                                footer: "hidden",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
