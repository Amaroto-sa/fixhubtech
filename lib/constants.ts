// FixHub Technology — Platform Constants
// All business content is CMS-driven; these are structural constants only.

export const SITE_CONFIG = {
    name: "FixHub Technology",
    tagline: "Premium Digital Solutions for Serious Businesses",
    description:
        "Build a stronger online presence with premium websites, business platforms, and modern digital solutions.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://fixhubtech.com",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
} as const;

export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
] as const;

export const CTA_LINKS = {
    quote: "/quote",
    audit: "/audit",
    demo: "/demo",
    consultation: "/consultation",
    contact: "/contact",
} as const;

export const LEAD_STATUSES = [
    "new",
    "qualified",
    "proposal_sent",
    "awaiting_response",
    "won",
    "lost",
    "archived",
] as const;

export const PROJECT_STATUSES = [
    "onboarding",
    "planning",
    "in_progress",
    "client_review",
    "revisions",
    "complete",
    "on_hold",
    "cancelled",
] as const;

export const INVOICE_STATUSES = [
    "draft",
    "sent",
    "paid",
    "overdue",
    "cancelled",
] as const;

export const TICKET_STATUSES = [
    "open",
    "in_progress",
    "waiting_on_client",
    "resolved",
    "closed",
] as const;

export const REVISION_STATUSES = [
    "submitted",
    "accepted",
    "in_progress",
    "delivered",
    "closed",
] as const;

export const TICKET_PRIORITIES = ["low", "medium", "high", "urgent"] as const;

export const USER_ROLES = [
    "visitor",
    "lead",
    "client",
    "admin",
    "super_admin",
] as const;

export const INDUSTRIES = [
    { label: "Restaurants", slug: "restaurants" },
    { label: "Salons & Spas", slug: "salons-spas" },
    { label: "Hotels & Hospitality", slug: "hotels-hospitality" },
    { label: "Service Businesses", slug: "service-businesses" },
    { label: "Real Estate", slug: "real-estate" },
] as const;

export const BUDGET_RANGES = [
    "Under $500",
    "$500 – $1,000",
    "$1,000 – $2,500",
    "$2,500 – $5,000",
    "$5,000 – $10,000",
    "$10,000+",
    "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
    "ASAP",
    "Within 2 weeks",
    "Within 1 month",
    "Within 3 months",
    "Flexible",
] as const;

export const CONTACT_METHODS = [
    "Email",
    "WhatsApp",
    "Phone call",
    "Any",
] as const;
