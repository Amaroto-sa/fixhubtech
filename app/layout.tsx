import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "FixHub Technology | Premium Digital Solutions for Serious Businesses",
        template: "%s | FixHub Technology",
    },
    description:
        "Build a stronger online presence with premium websites, business platforms, and modern digital solutions. FixHub Technology helps serious businesses launch, redesign, and manage high-converting digital experiences.",
    keywords: [
        "web design",
        "website development",
        "business website",
        "digital solutions",
        "web redesign",
        "landing page",
        "client portal",
        "premium web design",
        "FixHub Technology",
    ],
    authors: [{ name: "FixHub Technology" }],
    creator: "FixHub Technology",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://fixhubtech.com",
        siteName: "FixHub Technology",
        title: "FixHub Technology | Premium Digital Solutions",
        description:
            "Build a stronger online presence with premium websites, business platforms, and modern digital solutions.",
    },
    twitter: {
        card: "summary_large_image",
        title: "FixHub Technology | Premium Digital Solutions",
        description:
            "Build a stronger online presence with premium websites, business platforms, and modern digital solutions.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: "#6366f1",
                    colorBackground: "#0a0a0f",
                    colorInputBackground: "#12121a",
                    colorInputText: "#f1f5f9",
                },
            }}
        >
            <html
                lang="en"
                className={`${inter.variable} ${outfit.variable} dark`}
                suppressHydrationWarning
            >
                <body className="min-h-screen bg-background font-sans antialiased">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
