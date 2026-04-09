export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="section-container max-w-md text-center">
                <div className="card-elevated p-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-xl mx-auto mb-6">
                        F
                    </div>
                    <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                        Create Account
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">
                        Join FixHub to track your projects and manage your digital presence.
                    </p>
                    {/* Clerk SignUp component will be placed here */}
                    <div className="card-glass p-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            Clerk Sign-Up component will render here.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            Configure NEXT_PUBLIC_CLERK_SIGN_UP_URL in .env
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
