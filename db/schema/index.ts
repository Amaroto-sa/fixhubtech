import {
    pgTable,
    text,
    timestamp,
    varchar,
    boolean,
    integer,
    decimal,
    uuid,
    jsonb,
    index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// =====================================================
// USER LAYER
// =====================================================

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: varchar("clerk_id", { length: 255 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    avatar: text("avatar"),
    role: varchar("role", { length: 50 }).default("client").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const profiles = pgTable("profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .unique()
        .notNull(),
    company: varchar("company", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    whatsapp: varchar("whatsapp", { length: 50 }),
    country: varchar("country", { length: 100 }),
    city: varchar("city", { length: 100 }),
    bio: text("bio"),
    website: text("website"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// =====================================================
// LEAD LAYER
// =====================================================

export const leads = pgTable(
    "leads",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }).notNull(),
        phone: varchar("phone", { length: 50 }),
        company: varchar("company", { length: 255 }),
        industry: varchar("industry", { length: 100 }),
        serviceNeeded: varchar("service_needed", { length: 255 }),
        budgetRange: varchar("budget_range", { length: 100 }),
        timeline: varchar("timeline", { length: 100 }),
        currentWebsite: text("current_website"),
        projectSummary: text("project_summary"),
        preferredContact: varchar("preferred_contact", { length: 50 }),
        source: varchar("source", { length: 100 }).default("website").notNull(),
        status: varchar("status", { length: 50 }).default("new").notNull(),
        assignedTo: uuid("assigned_to").references(() => users.id),
        convertedClientId: uuid("converted_client_id"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => ({
        statusIdx: index("leads_status_idx").on(table.status),
        emailIdx: index("leads_email_idx").on(table.email),
    })
);

export const leadNotes = pgTable("lead_notes", {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("lead_id")
        .references(() => leads.id, { onDelete: "cascade" })
        .notNull(),
    authorId: uuid("author_id").references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactRequests = pgTable("contact_requests", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    subject: varchar("subject", { length: 255 }),
    message: text("message").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditRequests = pgTable("audit_requests", {
    id: uuid("id").defaultRandom().primaryKey(),
    businessName: varchar("business_name", { length: 255 }).notNull(),
    websiteUrl: text("website_url").notNull(),
    industry: varchar("industry", { length: 100 }),
    mainIssue: text("main_issue"),
    email: varchar("email", { length: 255 }).notNull(),
    whatsapp: varchar("whatsapp", { length: 50 }),
    status: varchar("status", { length: 50 }).default("new").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultationRequests = pgTable("consultation_requests", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    company: varchar("company", { length: 255 }),
    serviceInterest: varchar("service_interest", { length: 255 }),
    preferredDate: timestamp("preferred_date"),
    message: text("message"),
    status: varchar("status", { length: 50 }).default("new").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// =====================================================
// CLIENT LAYER
// =====================================================

export const clients = pgTable(
    "clients",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        userId: uuid("user_id")
            .references(() => users.id)
            .unique(),
        leadId: uuid("lead_id").references(() => leads.id),
        companyName: varchar("company_name", { length: 255 }).notNull(),
        contactName: varchar("contact_name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }).notNull(),
        phone: varchar("phone", { length: 50 }),
        country: varchar("country", { length: 100 }),
        billingAddress: text("billing_address"),
        isActive: boolean("is_active").default(true).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => ({
        emailIdx: index("clients_email_idx").on(table.email),
    })
);

// =====================================================
// PROJECT LAYER
// =====================================================

export const projects = pgTable(
    "projects",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
        clientId: uuid("client_id")
            .references(() => clients.id, { onDelete: "cascade" })
            .notNull(),
        serviceType: varchar("service_type", { length: 255 }),
        packageId: uuid("package_id"),
        scopeSummary: text("scope_summary"),
        status: varchar("status", { length: 50 }).default("onboarding").notNull(),
        dueDate: timestamp("due_date"),
        assignedTo: uuid("assigned_to").references(() => users.id),
        paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => ({
        statusIdx: index("projects_status_idx").on(table.status),
        clientIdx: index("projects_client_idx").on(table.clientId),
    })
);

export const projectMilestones = pgTable("project_milestones", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
        .references(() => projects.id, { onDelete: "cascade" })
        .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    status: varchar("status", { length: 50 }).default("pending").notNull(),
    dueDate: timestamp("due_date"),
    sortOrder: integer("sort_order").default(0).notNull(),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectMessages = pgTable("project_messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
        .references(() => projects.id, { onDelete: "cascade" })
        .notNull(),
    senderId: uuid("sender_id").references(() => users.id),
    content: text("content").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectRevisions = pgTable("project_revisions", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
        .references(() => projects.id, { onDelete: "cascade" })
        .notNull(),
    milestoneId: uuid("milestone_id").references(() => projectMilestones.id),
    clientId: uuid("client_id")
        .references(() => clients.id)
        .notNull(),
    description: text("description").notNull(),
    status: varchar("status", { length: 50 }).default("submitted").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// =====================================================
// FINANCE LAYER
// =====================================================

export const invoices = pgTable(
    "invoices",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        invoiceNumber: varchar("invoice_number", { length: 50 }).unique().notNull(),
        projectId: uuid("project_id")
            .references(() => projects.id)
            .notNull(),
        clientId: uuid("client_id")
            .references(() => clients.id)
            .notNull(),
        amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
        currency: varchar("currency", { length: 10 }).default("USD").notNull(),
        status: varchar("status", { length: 50 }).default("draft").notNull(),
        dueDate: timestamp("due_date").notNull(),
        paidAt: timestamp("paid_at"),
        paymentLink: text("payment_link"),
        receiptRef: varchar("receipt_ref", { length: 255 }),
        notes: text("notes"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => ({
        statusIdx: index("invoices_status_idx").on(table.status),
        clientIdx: index("invoices_client_idx").on(table.clientId),
    })
);

export const invoiceItems = pgTable("invoice_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    invoiceId: uuid("invoice_id")
        .references(() => invoices.id, { onDelete: "cascade" })
        .notNull(),
    description: varchar("description", { length: 500 }).notNull(),
    quantity: integer("quantity").default(1).notNull(),
    unitPrice: decimal("unit_price", { precision: 12, scale: 2 }).notNull(),
    total: decimal("total", { precision: 12, scale: 2 }).notNull(),
});

export const payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),
    invoiceId: uuid("invoice_id")
        .references(() => invoices.id)
        .notNull(),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).default("USD").notNull(),
    provider: varchar("provider", { length: 50 }).default("flutterwave"),
    providerRef: varchar("provider_ref", { length: 255 }),
    status: varchar("status", { length: 50 }).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// =====================================================
// FILE LAYER
// =====================================================

export const files = pgTable(
    "files",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        projectId: uuid("project_id")
            .references(() => projects.id, { onDelete: "cascade" })
            .notNull(),
        uploadedBy: uuid("uploaded_by").references(() => users.id),
        fileName: varchar("file_name", { length: 500 }).notNull(),
        fileUrl: text("file_url").notNull(),
        fileSize: integer("file_size").notNull(),
        fileType: varchar("file_type", { length: 100 }).notNull(),
        category: varchar("category", { length: 50 })
            .default("reference")
            .notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
        projectIdx: index("files_project_idx").on(table.projectId),
    })
);

// =====================================================
// SUPPORT LAYER
// =====================================================

export const supportTickets = pgTable(
    "support_tickets",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        clientId: uuid("client_id")
            .references(() => clients.id)
            .notNull(),
        projectId: uuid("project_id").references(() => projects.id),
        subject: varchar("subject", { length: 255 }).notNull(),
        category: varchar("category", { length: 100 }),
        priority: varchar("priority", { length: 50 }).default("medium").notNull(),
        description: text("description").notNull(),
        status: varchar("status", { length: 50 }).default("open").notNull(),
        assignedTo: uuid("assigned_to").references(() => users.id),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => ({
        statusIdx: index("tickets_status_idx").on(table.status),
        clientIdx: index("tickets_client_idx").on(table.clientId),
    })
);

export const supportMessages = pgTable("support_messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    ticketId: uuid("ticket_id")
        .references(() => supportTickets.id, { onDelete: "cascade" })
        .notNull(),
    senderId: uuid("sender_id").references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// =====================================================
// CMS LAYER
// =====================================================

export const services = pgTable("services", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    shortDescription: text("short_description"),
    fullDescription: text("full_description"),
    icon: varchar("icon", { length: 100 }),
    features: jsonb("features").$type<string[]>().default([]),
    addOns: jsonb("add_ons").$type<string[]>().default([]),
    process: jsonb("process").$type<string[]>().default([]),
    timeline: varchar("timeline", { length: 100 }),
    startingPrice: decimal("starting_price", { precision: 12, scale: 2 }),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const packages = pgTable("packages", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: decimal("price", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).default("USD").notNull(),
    isStartingFrom: boolean("is_starting_from").default(false).notNull(),
    deliverables: jsonb("deliverables").$type<string[]>().default([]),
    timeline: varchar("timeline", { length: 100 }),
    addOns: jsonb("add_ons").$type<string[]>().default([]),
    isPopular: boolean("is_popular").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const portfolioItems = pgTable("portfolio_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    clientName: varchar("client_name", { length: 255 }),
    industry: varchar("industry", { length: 100 }),
    servicesDelivered: jsonb("services_delivered").$type<string[]>().default([]),
    summary: text("summary"),
    challenge: text("challenge"),
    solution: text("solution"),
    screenshots: jsonb("screenshots").$type<string[]>().default([]),
    liveUrl: text("live_url"),
    isFeatured: boolean("is_featured").default(false).notNull(),
    status: varchar("status", { length: 50 }).default("draft").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
    id: uuid("id").defaultRandom().primaryKey(),
    clientName: varchar("client_name", { length: 255 }).notNull(),
    clientTitle: varchar("client_title", { length: 255 }),
    clientCompany: varchar("client_company", { length: 255 }),
    clientAvatar: text("client_avatar"),
    content: text("content").notNull(),
    rating: integer("rating").default(5).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const faqs = pgTable("faqs", {
    id: uuid("id").defaultRandom().primaryKey(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    category: varchar("category", { length: 100 }),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
    id: uuid("id").defaultRandom().primaryKey(),
    key: varchar("key", { length: 255 }).unique().notNull(),
    value: text("value").notNull(),
    label: varchar("label", { length: 255 }),
    category: varchar("category", { length: 100 }),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contentSections = pgTable("content_sections", {
    id: uuid("id").defaultRandom().primaryKey(),
    page: varchar("page", { length: 100 }).notNull(),
    sectionKey: varchar("section_key", { length: 100 }).notNull(),
    title: text("title"),
    subtitle: text("subtitle"),
    body: text("body"),
    ctaText: varchar("cta_text", { length: 255 }),
    ctaLink: varchar("cta_link", { length: 500 }),
    metadata: jsonb("metadata"),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// =====================================================
// RELATIONS
// =====================================================

export const usersRelations = relations(users, ({ one, many }) => ({
    profile: one(profiles, {
        fields: [users.id],
        references: [profiles.userId],
    }),
}));

export const leadsRelations = relations(leads, ({ many }) => ({
    notes: many(leadNotes),
}));

export const leadNotesRelations = relations(leadNotes, ({ one }) => ({
    lead: one(leads, { fields: [leadNotes.leadId], references: [leads.id] }),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
    user: one(users, { fields: [clients.userId], references: [users.id] }),
    projects: many(projects),
    invoices: many(invoices),
    tickets: many(supportTickets),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
    client: one(clients, {
        fields: [projects.clientId],
        references: [clients.id],
    }),
    milestones: many(projectMilestones),
    messages: many(projectMessages),
    revisions: many(projectRevisions),
    files: many(files),
    invoices: many(invoices),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
    project: one(projects, {
        fields: [invoices.projectId],
        references: [projects.id],
    }),
    client: one(clients, {
        fields: [invoices.clientId],
        references: [clients.id],
    }),
    items: many(invoiceItems),
    payments: many(payments),
}));
