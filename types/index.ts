// FixHub Technology — Core Type Definitions

// ---- Roles ----
export type UserRole = "visitor" | "lead" | "client" | "admin" | "super_admin";

// ---- Lead ----
export type LeadStatus =
    | "new"
    | "qualified"
    | "proposal_sent"
    | "awaiting_response"
    | "won"
    | "lost"
    | "archived";

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    industry?: string;
    serviceNeeded?: string;
    budgetRange?: string;
    timeline?: string;
    currentWebsite?: string;
    projectSummary?: string;
    preferredContact?: string;
    source: string;
    status: LeadStatus;
    assignedTo?: string;
    createdAt: Date;
    updatedAt: Date;
}

// ---- Project ----
export type ProjectStatus =
    | "onboarding"
    | "planning"
    | "in_progress"
    | "client_review"
    | "revisions"
    | "complete"
    | "on_hold"
    | "cancelled";

export interface Project {
    id: string;
    name: string;
    clientId: string;
    serviceType: string;
    packageId?: string;
    scopeSummary: string;
    status: ProjectStatus;
    dueDate?: Date;
    assignedTo?: string;
    paymentStatus: string;
    createdAt: Date;
    updatedAt: Date;
}

// ---- Milestone ----
export interface Milestone {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    status: "pending" | "in_progress" | "complete";
    dueDate?: Date;
    sortOrder: number;
    createdAt: Date;
}

// ---- Invoice ----
export type InvoiceStatus =
    | "draft"
    | "sent"
    | "paid"
    | "overdue"
    | "cancelled";

export interface Invoice {
    id: string;
    projectId: string;
    clientId: string;
    amount: number;
    currency: string;
    status: InvoiceStatus;
    dueDate: Date;
    paidAt?: Date;
    paymentLink?: string;
    receiptRef?: string;
    createdAt: Date;
}

// ---- File ----
export interface ProjectFile {
    id: string;
    projectId: string;
    uploadedBy: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
    category: "source" | "draft" | "delivery" | "reference";
    createdAt: Date;
}

// ---- Revision ----
export type RevisionStatus =
    | "submitted"
    | "accepted"
    | "in_progress"
    | "delivered"
    | "closed";

export interface Revision {
    id: string;
    projectId: string;
    milestoneId?: string;
    clientId: string;
    description: string;
    status: RevisionStatus;
    createdAt: Date;
    updatedAt: Date;
}

// ---- Support Ticket ----
export type TicketStatus =
    | "open"
    | "in_progress"
    | "waiting_on_client"
    | "resolved"
    | "closed";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface SupportTicket {
    id: string;
    clientId: string;
    projectId?: string;
    subject: string;
    category: string;
    priority: TicketPriority;
    description: string;
    status: TicketStatus;
    assignedTo?: string;
    createdAt: Date;
    updatedAt: Date;
}

// ---- Service (CMS) ----
export interface Service {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    features: string[];
    addOns?: string[];
    process?: string[];
    timeline?: string;
    startingPrice?: number;
    sortOrder: number;
    isActive: boolean;
    createdAt: Date;
}

// ---- Portfolio Item (CMS) ----
export interface PortfolioItem {
    id: string;
    title: string;
    slug: string;
    clientName: string;
    industry: string;
    servicesDelivered: string[];
    summary: string;
    challenge?: string;
    solution?: string;
    screenshots: string[];
    liveUrl?: string;
    isFeatured: boolean;
    status: "draft" | "published";
    createdAt: Date;
}

// ---- Testimonial (CMS) ----
export interface Testimonial {
    id: string;
    clientName: string;
    clientTitle?: string;
    clientCompany?: string;
    clientAvatar?: string;
    content: string;
    rating: number;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: Date;
}

// ---- Package (CMS) ----
export interface PricingPackage {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    isStartingFrom: boolean;
    deliverables: string[];
    timeline: string;
    addOns?: string[];
    isPopular: boolean;
    sortOrder: number;
    isActive: boolean;
    createdAt: Date;
}

// ---- FAQ ----
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category?: string;
    sortOrder: number;
    isActive: boolean;
}

// ---- Site Settings ----
export interface SiteSettings {
    id: string;
    key: string;
    value: string;
    label: string;
    category: string;
}

// ---- Navigation ----
export interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
    children?: NavItem[];
}
