import { db } from "@/db";
import { users } from "@/db/schema";
import { updateUserRole, deleteUser } from "./actions";
import { desc } from "drizzle-orm";
import {
    FadeIn,
    SectionReveal
} from "@/components/shared/motion";
import {
    Users as UsersIcon,
    ArrowRight,
    Shield,
    ShieldAlert,
    Trash2
} from "lucide-react";

export default async function UsersPage() {
    let allUsers: any[] = [];
    let dbError = false;

    try {
        allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    } catch (error) {
        console.error("Admin Users DB Error:", error);
        dbError = true;
    }

    return (
        <div className="pb-10 max-w-5xl mx-auto">
            <FadeIn>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                            <UsersIcon className="w-8 h-8 text-indigo-400" />
                            Users Directory
                        </h1>
                        <p className="text-muted-foreground/80 text-lg">
                            View registered users and staff accounts. User authentication is managed by Clerk.
                        </p>
                    </div>
                </div>
                {dbError && (
                    <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg text-sm">
                        Database Error: Could not fetch users.
                    </div>
                )}
            </FadeIn>

            <SectionReveal delay={0.1}>
                <div className="card-elevated bg-[#0a0a0e] overflow-hidden">
                    <div className="divide-y divide-white/[0.05]">
                        {allUsers.length > 0 ? allUsers.map((user) => (
                            <div key={user.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-4 group">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-display text-sm font-bold text-foreground">
                                            {user.firstName} {user.lastName}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${user.role === 'admin' ? 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10' : 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10'}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {user.email} • Joined: {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <form action={async () => {
                                        "use server";
                                        await updateUserRole(user.id, user.role === 'admin' ? 'client' : 'admin');
                                    }}>
                                        <button 
                                            type="submit"
                                            className="p-2 text-muted-foreground hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors"
                                            title={user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                                        >
                                            {user.role === 'admin' ? <ShieldAlert className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                        </button>
                                    </form>
                                    <form action={async () => {
                                        "use server";
                                        await deleteUser(user.id);
                                    }}>
                                        <button 
                                            type="submit"
                                            className="p-2 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )) : (
                            <div className="p-12 text-center bg-white/[0.01]">
                                <p className="text-muted-foreground">No users found in database.</p>
                            </div>
                        )}
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
