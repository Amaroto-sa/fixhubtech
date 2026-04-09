import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your FixHub Technology client portal.",
};

export default function SignInPage() {
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
                        Welcome Back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to access your FixHub dashboard.
                    </p>
                </div>

                {/* Clerk SignIn Component */}
                <div className="flex justify-center mt-6">
                    <SignIn
                        routing="path"
                        path="/sign-in"
                        appearance={{
                            elements: {
                                card: "bg-[#0a0a0e] border border-white/[0.05] shadow-2xl",
                                headerTitle: "text-foreground font-display",
                                headerSubtitle: "text-muted-foreground",
                                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
                                formFieldInput: "bg-white/[0.03] border-white/10 text-foreground",
                                formFieldLabel: "text-muted-foreground",
                                footerActionLink: "text-indigo-400 hover:text-indigo-300",
                                socialButtonsBlockButton: "border-white/10 hover:bg-white/[0.02]",
                                dividerLine: "bg-white/10",
                                dividerText: "text-muted-foreground/50",
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
