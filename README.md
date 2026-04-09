<div align="center">

# FixHub Technology Platform

**Premium Digital Solutions for Serious Businesses**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square)](https://orm.drizzle.team/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)]()

</div>

---

## Overview

FixHub Technology is a full-stack B2B SaaS platform built as a **modular monolith**. It combines a premium marketing website, lead capture system, client portal, and admin dashboard into a single, scalable application.

### What It Does

- **Public Website** — Premium dark-themed marketing site with services, portfolio, pricing, FAQ, and lead capture forms
- **Client Portal** — Authenticated dashboard where clients track projects, upload files, pay invoices, and request revisions
- **Admin Console** — Full operations dashboard for managing leads, projects, invoices, content (CMS), and users

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.4 |
| **Styling** | Tailwind CSS 3.4 + Custom Design System |
| **UI Components** | Radix UI + shadcn/ui patterns |
| **Animations** | Framer Motion 12 |
| **Auth** | Clerk (RBAC via Organizations) |
| **Database** | PostgreSQL (Neon Serverless) |
| **ORM** | Drizzle ORM |
| **File Storage** | Cloudflare R2 (S3-compatible) |
| **Payments** | Flutterwave |
| **Email** | Resend |
| **Deployment** | Vercel / Netlify |

---

## Project Structure

```
fixhub-platform/
├── app/
│   ├── (marketing)/          # Public website pages
│   │   ├── page.tsx          # Homepage (11 sections)
│   │   ├── services/         # Services listing
│   │   ├── portfolio/        # Portfolio / case studies
│   │   ├── pricing/          # Pricing tiers
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact form
│   │   ├── quote/            # Quote request form
│   │   ├── audit/            # Free audit request
│   │   └── faq/              # FAQ accordion
│   ├── (client)/             # Client portal (auth required)
│   │   └── dashboard/        # Client dashboard
│   ├── (admin)/              # Admin console (admin role required)
│   │   └── admin/            # Admin dashboard + modules
│   ├── (auth)/               # Auth pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── api/                  # API routes
│   │   ├── contact/          # Contact form handler
│   │   ├── quote/            # Quote request handler
│   │   ├── audit/            # Audit request handler
│   │   └── webhooks/         # Clerk + Flutterwave webhooks
│   ├── globals.css           # Design system (HSL tokens, components)
│   └── layout.tsx            # Root layout (Clerk, fonts, SEO)
├── components/
│   ├── marketing/            # Navbar, Footer
│   ├── dashboard/            # Client sidebar
│   ├── admin/                # Admin sidebar
│   └── shared/               # Motion components
├── db/
│   ├── schema/               # Drizzle schema (25+ tables)
│   └── index.ts              # Database connection (lazy singleton)
├── lib/
│   ├── constants.ts          # Navigation, statuses, enums
│   ├── utils.ts              # cn(), formatters, helpers
│   ├── validation/           # Zod schemas for all forms
│   ├── permissions/          # RBAC utilities
│   ├── emails/               # Resend email abstraction
│   ├── uploads/              # R2 file upload utilities
│   └── payments/             # Flutterwave integration
├── types/                    # TypeScript type definitions
├── middleware.ts             # Clerk auth + route protection
├── tailwind.config.ts        # Design tokens, brand colors, animations
├── drizzle.config.ts         # Drizzle Kit configuration
├── netlify.toml              # Netlify deployment config
└── .env.example              # Environment variable template
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **pnpm**
- **PostgreSQL** database (recommended: [Neon](https://neon.tech))
- **Clerk** account for authentication
- **Flutterwave** account for payments (optional for dev)
- **Resend** account for transactional emails (optional for dev)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/fixhub-platform.git
cd fixhub-platform

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual credentials

# 4. Push database schema to Neon
npm run db:push

# 5. Start the development server
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key |
| `CLERK_WEBHOOK_SECRET` | ✅ | Clerk webhook signing secret |
| `FLUTTERWAVE_SECRET_KEY` | ⚠️ | Required for payments |
| `RESEND_API_KEY` | ⚠️ | Required for emails |
| `R2_ACCESS_KEY_ID` | ⚠️ | Required for file uploads |

> **Note:** Admin access requires Clerk Organizations with `org:admin` and `org:super_admin` roles configured in the Clerk Dashboard.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:push` | Push schema directly (dev) |
| `npm run db:studio` | Open Drizzle Studio (DB GUI) |

---

## Database Schema

The platform uses **25+ tables** organized by domain:

| Layer | Tables |
|---|---|
| **Users** | `users`, `profiles` |
| **Leads** | `leads`, `lead_notes`, `contact_requests`, `audit_requests`, `consultation_requests` |
| **Clients** | `clients` |
| **Projects** | `projects`, `project_milestones`, `project_messages`, `project_revisions` |
| **Finance** | `invoices`, `invoice_items`, `payments` |
| **Files** | `files` |
| **Support** | `support_tickets`, `support_messages` |
| **CMS** | `services`, `packages`, `portfolio_items`, `testimonials`, `faqs`, `site_settings`, `content_sections` |

---

## Design System

The platform uses a custom **dark modern SaaS** aesthetic:

- **Colors:** Deep charcoal base (`240 10% 4%`) with indigo/violet accents
- **Typography:** Inter (body) + Outfit (display headings)
- **Cards:** Glassmorphism (`card-glass`) and elevated (`card-elevated`) variants
- **Buttons:** Gradient primary with hover glow, bordered secondary
- **Animations:** Framer Motion scroll-reveal, fade-in, scale-in patterns
- **Spacing:** Generous padding, `2xl` border radius for premium feel

---

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub, then:
# 1. Import project in Vercel Dashboard
# 2. Add environment variables
# 3. Deploy — zero config needed
```

### Netlify

```bash
# Push to GitHub, then:
# 1. Import project in Netlify Dashboard
# 2. Build settings auto-detected from netlify.toml
# 3. Add environment variables in Site Settings
# 4. Deploy
```

---

## Architecture

```
┌─────────────────────────────────────────┐
│            Next.js 15 App Router         │
├─────────────┬──────────┬────────────────┤
│  Marketing  │  Client  │    Admin       │
│  (public)   │  Portal  │   Console      │
├─────────────┴──────────┴────────────────┤
│         Clerk Middleware (Edge)          │
├─────────────────────────────────────────┤
│          API Routes (Serverless)         │
├──────────┬──────────┬───────────────────┤
│ Drizzle  │  Resend  │   Flutterwave    │
│  + Neon  │  Email   │   Payments       │
├──────────┴──────────┴───────────────────┤
│       Cloudflare R2 (File Storage)      │
└─────────────────────────────────────────┘
```

---

## License

This project is **private and proprietary**. All rights reserved by FixHub Technology.

---

<div align="center">
  <p><strong>Built with precision. Designed for impact.</strong></p>
  <p>© 2026 FixHub Technology</p>
</div>
"# fixhubtech" 
