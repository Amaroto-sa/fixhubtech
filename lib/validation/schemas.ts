import { z } from "zod";

// ---- Contact Form ----
export const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ---- Quote Request ----
export const quoteFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    businessName: z.string().optional(),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().optional(),
    countryCity: z.string().optional(),
    industry: z.string().optional(),
    serviceNeeded: z.string().min(1, "Please select a service"),
    currentWebsite: z.string().url().optional().or(z.literal("")),
    budgetRange: z.string().min(1, "Please select a budget range"),
    timeline: z.string().optional(),
    projectSummary: z.string().min(20, "Please provide more detail about your project"),
    preferredContact: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// ---- Audit Request ----
export const auditFormSchema = z.object({
    businessName: z.string().min(2, "Business name is required"),
    websiteUrl: z.string().url("Please enter a valid URL"),
    industry: z.string().optional(),
    mainIssue: z.string().min(10, "Please describe the issue in more detail"),
    email: z.string().email("Please enter a valid email"),
    whatsapp: z.string().optional(),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;

// ---- Consultation Request ----
export const consultationFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().optional(),
    company: z.string().optional(),
    serviceInterest: z.string().optional(),
    preferredDate: z.string().optional(),
    message: z.string().optional(),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;

// ---- Support Ticket ----
export const ticketFormSchema = z.object({
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    category: z.string().min(1, "Please select a category"),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    description: z.string().min(20, "Please provide more details"),
});

export type TicketFormData = z.infer<typeof ticketFormSchema>;

// ---- Revision Request ----
export const revisionFormSchema = z.object({
    projectId: z.string().uuid(),
    milestoneId: z.string().uuid().optional(),
    description: z.string().min(10, "Please describe the changes you need"),
});

export type RevisionFormData = z.infer<typeof revisionFormSchema>;

// ---- Admin: Service CMS ----
export const serviceFormSchema = z.object({
    title: z.string().min(2, "Title is required"),
    slug: z.string().min(2, "Slug is required"),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    icon: z.string().optional(),
    features: z.array(z.string()).optional(),
    addOns: z.array(z.string()).optional(),
    process: z.array(z.string()).optional(),
    timeline: z.string().optional(),
    startingPrice: z.number().optional(),
    sortOrder: z.number().default(0),
    isActive: z.boolean().default(true),
});

export type ServiceFormData = z.infer<typeof serviceFormSchema>;

// ---- Admin: Invoice ----
export const invoiceFormSchema = z.object({
    projectId: z.string().uuid(),
    clientId: z.string().uuid(),
    amount: z.number().positive("Amount must be positive"),
    currency: z.string().default("USD"),
    dueDate: z.string(),
    notes: z.string().optional(),
    items: z.array(
        z.object({
            description: z.string(),
            quantity: z.number().positive(),
            unitPrice: z.number().positive(),
        })
    ),
});

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;
