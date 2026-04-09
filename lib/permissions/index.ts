// FixHub Technology — Permission Helpers
// Role-based access control utilities

import type { UserRole } from "@/types";

const ROLE_HIERARCHY: Record<UserRole, number> = {
    visitor: 0,
    lead: 1,
    client: 2,
    admin: 3,
    super_admin: 4,
};

/**
 * Check if a user has at least the required role level
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if user is an admin (admin or super_admin)
 */
export function isAdmin(role: UserRole): boolean {
    return hasRole(role, "admin");
}

/**
 * Check if user is a super admin
 */
export function isSuperAdmin(role: UserRole): boolean {
    return role === "super_admin";
}

/**
 * Check if user is a client
 */
export function isClient(role: UserRole): boolean {
    return hasRole(role, "client");
}

/**
 * Permission check for specific resources
 */
export function canAccessProject(
    userRole: UserRole,
    userId: string,
    projectOwnerId: string
): boolean {
    if (isAdmin(userRole)) return true;
    return userId === projectOwnerId;
}

export function canAccessInvoice(
    userRole: UserRole,
    userId: string,
    invoiceClientId: string
): boolean {
    if (isAdmin(userRole)) return true;
    return userId === invoiceClientId;
}

export function canManageContent(role: UserRole): boolean {
    return isAdmin(role);
}

export function canManageUsers(role: UserRole): boolean {
    return isSuperAdmin(role);
}

export function canManageSettings(role: UserRole): boolean {
    return isSuperAdmin(role);
}
