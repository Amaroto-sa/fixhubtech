import { FadeIn } from "@/components/shared/motion";

export const metadata = {
    title: "Privacy Policy | FixHub",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative">
            <div className="max-w-3xl mx-auto">
                <FadeIn>
                    <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <div className="prose prose-invert prose-indigo max-w-none">
                        <p>
                            At FixHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                        </p>
                        
                        <h3>1. Information We Collect</h3>
                        <p>
                            We may collect information about you in a variety of ways. The information we may collect includes:
                        </p>
                        <ul>
                            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, browser type, and operating system.</li>
                        </ul>

                        <h3>2. Use of Your Information</h3>
                        <p>
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
                        </p>
                        <ul>
                            <li>Create and manage your account.</li>
                            <li>Process your transactions.</li>
                            <li>Email you regarding your account or order.</li>
                        </ul>

                        <h3>3. Contact Us</h3>
                        <p>
                            If you have questions or comments about this Privacy Policy, please contact us at support@fixhubtech.com.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
