import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center max-w-md mx-auto px-6">
                <div className="mb-8">
                    <span className="text-8xl font-display font-bold text-gradient-brand">404</span>
                </div>
                <h1 className="text-2xl font-semibold text-foreground mb-3">
                    Page not found
                </h1>
                <p className="text-muted-foreground mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link href="/" className="btn-primary">
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
}
