import { db } from "@/db";
import { users, profiles } from "@/db/schema";
import { updateUserRole, deleteUser, toggleUserStatus } from "./actions";
import { desc, eq, ilike, or } from "drizzle-orm";
import { FadeIn, SectionReveal } from "@/components/shared/motion";
import { Users as UsersIcon, Shield, ShieldAlert, Trash2, Ban, CheckCircle2, Search, Building2, Phone } from "lucide-react";
import Image from "next/image";

export default async function UsersPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q || "";
    let usersData: any[] = [];
    let dbError = false;

    try {
        let dbQuery = db.select({
            user: users,
            profile: profiles
        })
        .from(users)
        .leftJoin(profiles, eq(users.id, profiles.userId));

        if (query) {
            dbQuery = dbQuery.where(
                or(
                    ilike(users.firstName, `%${query}%`),
                    ilike(users.lastName, `%${query}%`),
                    ilike(users.email, `%${query}%`)
                )
            );
        }

        usersData = await dbQuery.orderBy(desc(users.createdAt));
    } catch (error) {
        console.error("Admin Users DB Error:", error);
        dbError = true;
    }

    const totalUsers = usersData.length;
    const adminCount = usersData.filter(u => u.user.role === 'admin').length;
    const suspendedCount = usersData.filter(u => !u.user.isActive).length;

    return (
        <div className="pb-10 max-w-6xl mx-auto">
            {/* Header & Stats */}
            <FadeIn>
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
                        <UsersIcon className="w-8 h-8 text-indigo-400" />
                        User Management
                    </h1>
                    <p className="text-muted-foreground/80 text-lg mb-6">
                        Manage all platform users, staff accounts, and their permissions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="p-4 rounded-xl border border-white/[0.05] bg-[#0a0a0e] flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Total Users</p>
                                <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                <UsersIcon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/[0.05] bg-[#0a0a0e] flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Admins</p>
                                <p className="text-2xl font-bold text-foreground">{adminCount}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <Shield className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/[0.05] bg-[#0a0a0e] flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Suspended</p>
                                <p className="text-2xl font-bold text-foreground">{suspendedCount}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
                                <Ban className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <form className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                            type="text" 
                            name="q"
                            defaultValue={query}
                            placeholder="Search by name or email..." 
                            className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0e] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-foreground placeholder:text-muted-foreground/50"
                        />
                    </form>
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
                        {usersData.length > 0 ? usersData.map(({ user, profile }) => (
                            <div key={user.id} className={`p-5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${!user.isActive ? 'bg-rose-500/[0.02] hover:bg-rose-500/[0.05]' : 'hover:bg-white/[0.02]'}`}>
                                <div className="flex items-start gap-4 min-w-0">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-sm font-bold text-indigo-300">
                                                {user.firstName?.[0] || ""}{user.lastName?.[0] || ""}
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-display text-sm font-bold text-foreground truncate">
                                                {user.firstName} {user.lastName}
                                            </h3>
                                            <div className="flex gap-1.5">
                                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${user.role === 'admin' ? 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10' : 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10'}`}>
                                                    {user.role}
                                                </span>
                                                {!user.isActive && (
                                                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border text-rose-400 border-rose-500/20 bg-rose-500/10">
                                                        Suspended
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate mb-2">
                                            {user.email} • Joined {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                        
                                        {profile && (
                                            <div className="flex items-center gap-4 text-[11px] text-muted-foreground/80">
                                                {profile.company && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Building2 className="w-3 h-3" />
                                                        <span className="truncate max-w-[120px]">{profile.company}</span>
                                                    </div>
                                                )}
                                                {profile.phone && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Phone className="w-3 h-3" />
                                                        <span>{profile.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:ml-auto shrink-0 bg-background/50 p-1.5 rounded-lg border border-white/[0.05]">
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
                                        await toggleUserStatus(user.id, !user.isActive);
                                    }}>
                                        <button 
                                            type="submit"
                                            className={`p-2 text-muted-foreground rounded-md transition-colors ${user.isActive ? 'hover:text-amber-400 hover:bg-amber-500/10' : 'hover:text-emerald-400 hover:bg-emerald-500/10'}`}
                                            title={user.isActive ? 'Suspend User' : 'Activate User'}
                                        >
                                            {user.isActive ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                        </button>
                                    </form>
                                    <div className="w-px h-6 bg-white/[0.1] mx-1"></div>
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
                            <div className="p-16 text-center flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <UsersIcon className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <p className="text-foreground font-medium">No users found</p>
                                <p className="text-muted-foreground text-sm mt-1">Try adjusting your search query.</p>
                            </div>
                        )}
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
