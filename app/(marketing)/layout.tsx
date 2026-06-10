import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let logoUrl = "";
    try {
        const logoSetting = await db.query.siteSettings.findFirst({
            where: eq(siteSettings.key, "brand_logo")
        });
        if (logoSetting?.value) {
            logoUrl = logoSetting.value;
        }
    } catch (error) {
        console.error("Failed to fetch brand logo:", error);
    }

    return (
        <>
            <Navbar logoUrl={logoUrl} />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
