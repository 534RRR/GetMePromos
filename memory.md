# GrabYourDealz.com — Project Memory & Session State

> **Last Updated:** August 25, 2026  
> **Repository:** `https://github.com/534RRR/GrabYourDealz.git` (Branch: `main`)  
> **Current Progress:** Phase 1 & Phase 2 Completed (100% Verified)  
> **Next Milestone:** Phase 3 (Frontend Foundation, Affiliate /out/:id Engine & SEO Schemas)  

---

## 1. Project Overview & Quick Reference

* **Domain:** `grabyourdealz.com`
* **Type:** Multi-Region Coupon, Deals, Store Directory, Reviews & Affiliate Platform.
* **Tech Stack:** Next.js 14 (App Router), React, TypeScript, Prisma ORM, SQLite (local) / PostgreSQL (production), Modular CSS Design Tokens, Lucide Icons.
* **Default Admin CMS Login:**
  - **URL:** `http://localhost:3000/admin/login`
  - **Email:** `admin@grabyourdealz.com`
  - **Password:** `admin123456`

---

## 2. Core Documentation Suite

| File | Purpose |
| :--- | :--- |
| [`architecture.md`](file:///e:/Zeeshan/Website/architecture.md) | Relational database models, multi-region architecture, affiliate flow, and SEO engine. |
| [`wireframe.md`](file:///e:/Zeeshan/Website/wireframe.md) | Visual UI/UX wireframes and component breakdown for all 8 core page layouts. |
| [`sequence.md`](file:///e:/Zeeshan/Website/sequence.md) | 6-Phase zero-rework execution sequence and dependency matrix. |
| [`walkthrough.md`](file:///C:/Users/Aman/.gemini/antigravity-ide/brain/e5ae658b-639a-4838-bae0-4637ace728e7/walkthrough.md) | Verification logs, screenshots, and live browser test results. |
| [`prisma/schema.prisma`](file:///e:/Zeeshan/Website/prisma/schema.prisma) | Complete database schema with 14 relational tables. |
| [`prisma/seed.ts`](file:///e:/Zeeshan/Website/prisma/seed.ts) | Multi-region seed engine (8 countries, 8 categories, stores, coupons, blogs, reviews). |

---

## 3. Completed Phases Summary

### ✅ Phase 1: Project Setup & Database Foundation
- Next.js 14 App Router, TypeScript, and Prisma ORM configuration.
- Multi-region database schema with 14 models.
- Seed script with 8 countries (US, UK, AU, CA, DE, FR, IT, NL), 8 categories, top brands (Nike, Amazon, ASOS, Sephora, etc.), verified coupons, and blog guides.
- CSS design system with custom properties (`src/app/globals.css`).
- Dynamic Homepage (`src/app/page.tsx`) with all 10 wireframe sections.
- Interactive [`CodeModal.tsx`](file:///e:/Zeeshan/Website/src/components/CodeModal.tsx) with 1-click code copying and merchant tab trigger.

### ✅ Phase 2: Admin CMS Engine & Taxonomies
- Admin authentication with bcrypt + JWT session cookies in [`src/lib/auth.ts`](file:///e:/Zeeshan/Website/src/lib/auth.ts).
- Admin Dashboard Overview (`/admin`) with real-time database metric counters.
- Country / Region Management (`/admin/countries`) with active toggles and currencies.
- Category Taxonomy Management (`/admin/categories`).
- Store & Brand Management (`/admin/stores`, `/admin/stores/new`, `/admin/stores/[id]`).
- Coupon & Promo Code Management (`/admin/coupons`, `/admin/coupons/new`, `/admin/coupons/[id]`).
- End-to-end browser testing: Created Puma store + PUMA20 coupon and verified immediate rendering on public homepage.
- Pushed all commits to `https://github.com/534RRR/GrabYourDealz.git`.

---

## 4. Immediate Next Step: Phase 3 Roadmap

When resuming the project, proceed immediately with **Phase 3 (Frontend Foundation & Shared Conversion/SEO Engines)**:

1. **Server-Side Affiliate Redirection Route:**
   - Implement `/out/coupon/:id` and `/out/store/:id`.
   - Log click analytics in `click_logs` table (timestamp, IP hash, device, country, subID).
   - Issue 302/307 redirect to the target merchant affiliate URL.

2. **Global Instant Search & Autocomplete:**
   - Build global search modal with categorized suggestions (Stores, Coupons, Categories, Blogs).
   - Debounced query handler with fast in-memory filtering.

3. **Dynamic SEO & JSON-LD Schemas:**
   - Create Schema.org JSON-LD builders for `BreadcrumbList`, `Store`, `Offer`, `Article`, and `FAQPage`.
   - Create dynamic OpenGraph metadata helpers.

4. **Public Marketplace Pages (Phase 4):**
   - Stores Directory (`/stores`) & Dynamic Store Detail (`/stores/[slug]`).
   - Coupons Hub (`/coupons`) with real-time multi-filtering.
   - Categories Hub (`/categories`) & Category Store Pages (`/categories/[slug]`).
   - Blogs Hub (`/blogs`, `/blogs/[slug]`) & Reviews (`/reviews`, `/reviews/[slug]`).
   - Static/Legal Pages (`/about-us`, `/contact-us`, `/privacy-policy`, `/terms-and-conditions`).

---

## 5. Development Command Cheatsheet

```powershell
# Start local development server
npm run dev -- -p 3000

# Push schema changes to database
npx prisma db push

# Re-seed database
npx tsx prisma/seed.ts

# Open Prisma Studio GUI
npx prisma studio

# Run production build check
npm run build

# Git sync at end of session
git add .
git commit -m "feat: description of work completed"
git push origin main
```

---

*This file preserves the exact project memory, architecture decisions, and roadmap.*
