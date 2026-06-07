import { FadeIn } from "@/components/shared/motion";

export const metadata = {
    title: "Terms of Service | FixHub",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative">
            <div className="max-w-3xl mx-auto">
                <FadeIn>
                    <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <div className="prose prose-invert prose-indigo max-w-none">
                        <p>
                            Welcome to FixHub! By accessing or using our website and services, you agree to be bound by these Terms of Service.
                        </p>
                        
                        <h3>1. Acceptance of Terms</h3>
                        <p>
                            By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                        </p>

                        <h3>2. Use License</h3>
                        <p>
                            Permission is granted to temporarily download one copy of the materials on FixHub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>

                        <h3>3. Disclaimer</h3>
                        <p>
                            The materials on FixHub's website are provided "as is". FixHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>

                        <h3>4. Limitations</h3>
                        <p>
                            In no event shall FixHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FixHub's website.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
