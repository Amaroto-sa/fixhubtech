import { ClientSidebar } from "@/components/dashboard/client-sidebar";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <ClientSidebar />
            <main className="ml-64 min-h-screen">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
