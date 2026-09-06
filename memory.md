# GetMePromos.com — Project Memory & Session State

> **Last Updated:** August 26, 2026  
> **Repository:** `https://github.com/534RRR/GetMePromos.git` (Branch: `main`)  
> **Overall Status:** 100% Complete & Production-Ready across all 6 Phases (All 12 Milestones from `Assets/Milestones.txt` verified)  

---

## 1. Platform Overview & Quick Reference

* **Domain:** `getmepromos.com`
* **Platform Type:** Multi-Region Coupon, Promo Code Directory, Product Deals, Merchant Reviews & Affiliate Content Engine.
* **Core Technology Stack:**
  - **Framework:** Next.js 14 (App Router, Server Components & Dynamic API Routes)
  - **Language:** TypeScript (Strict Mode)
  - **Database & ORM:** Prisma ORM with 14 Relational Models (SQLite locally, PostgreSQL ready for production)
  - **Styling:** CSS Design Tokens & Native Modular Styles (`src/app/globals.css`)
  - **Icons:** Lucide React Icons
  - **Authentication:** Bcrypt Password Hashing + JWT Session Cookies (`src/lib/auth.ts`)
* **Admin CMS Login Access:**
  - **URL:** `http://localhost:3000/admin/login`
  - **Credentials:** Configured via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` (seeded via `npm run db:seed`)

---

## 2. Core Documentation Suite

| Document | Description |
| :--- | :--- |
| [`architecture.md`](file:///e:/Zeeshan/Website/architecture.md) | Relational database schema, multi-region architecture, outbound affiliate redirect engine, and SEO infrastructure. |
| [`wireframe.md`](file:///e:/Zeeshan/Website/wireframe.md) | Detailed UI/UX wireframes and component breakdown for all public and CMS views. |
| [`sequence.md`](file:///e:/Zeeshan/Website/sequence.md) | 6-Phase zero-rework execution roadmap. |
| [`Assets/Milestones.txt`](file:///e:/Zeeshan/Website/Assets/Milestones.txt) | Original 12-milestone requirements blueprint. |
| [`prisma/schema.prisma`](file:///e:/Zeeshan/Website/prisma/schema.prisma) | Complete database schema with 14 relational tables. |
| [`prisma/seed.ts`](file:///e:/Zeeshan/Website/prisma/seed.ts) | Multi-region seed engine (8 countries, 8 categories, top brands, coupons, guides, and reviews). |

---

## 3. Milestone-by-Milestone Implementation Summary

### ✅ Phase 1: Project Setup & Database Foundation (Milestones 1, 2, 3)
- Initialized Next.js 14 App Router, TypeScript, and Prisma ORM configuration.
- Multi-region database schema with 14 relational models.
- Seed script with 8 countries (US, UK, AU, CA, DE, FR, IT, NL), 8 categories, top brands (Nike, Amazon, ASOS, Sephora, etc.), verified coupons, and blog guides.
- CSS design system with custom properties (`src/app/globals.css`).
- Dynamic Homepage (`src/app/page.tsx`) with all 10 wireframe sections.
- Interactive [`CodeModal.tsx`](file:///e:/Zeeshan/Website/src/components/CodeModal.tsx) with 1-click code copying and merchant tab trigger.

### ✅ Phase 2: Admin CMS Engine & Taxonomies (Milestones 4, 5)
- Admin authentication with bcrypt + JWT session cookies in [`src/lib/auth.ts`](file:///e:/Zeeshan/Website/src/lib/auth.ts).
- Admin Dashboard Overview (`/admin`) with real-time database metric counters.
- Country / Region Management (`/admin/countries`) with active toggles and currencies.
- Category Taxonomy Management (`/admin/categories`).
- Store & Brand Management (`/admin/stores`, `/admin/stores/new`, `/admin/stores/[id]`).
- Coupon & Promo Code Management (`/admin/coupons`, `/admin/coupons/new`, `/admin/coupons/[id]`).

### ✅ Phase 3: Conversion Engine, Search & SEO Infrastructure (Milestones 6, 9, 10)
- **Server-Side Affiliate Redirection Route:** `/out/coupon/:id` and `/out/store/:id` with SHA-256 IP hashing, country header detection, `click_logs` recording, `usedCount` increments, and 307 redirects.
- **Global Instant Search & Autocomplete:** `/api/search` + [`GlobalSearchModal.tsx`](file:///e:/Zeeshan/Website/src/components/GlobalSearchModal.tsx) triggered via header and `Ctrl+K`.
- **Dynamic SEO & Schema.org JSON-LD:** Organization, WebSite, Breadcrumbs, Store, Offers, Articles, Reviews, and FAQs in [`src/lib/seo.ts`](file:///e:/Zeeshan/Website/src/lib/seo.ts), plus dynamic `sitemap.ts` and `robots.ts`.
- **Shared UI Components:** [`Breadcrumbs.tsx`](file:///e:/Zeeshan/Website/src/components/Breadcrumbs.tsx), [`RatingStars.tsx`](file:///e:/Zeeshan/Website/src/components/RatingStars.tsx), [`FaqAccordion.tsx`](file:///e:/Zeeshan/Website/src/components/FaqAccordion.tsx), [`NewsletterBox.tsx`](file:///e:/Zeeshan/Website/src/components/NewsletterBox.tsx), [`BlogCard.tsx`](file:///e:/Zeeshan/Website/src/components/BlogCard.tsx), [`ReviewCard.tsx`](file:///e:/Zeeshan/Website/src/components/ReviewCard.tsx).

### ✅ Phase 4: Public Marketplace & Content Pages (Milestones 7, 8)
- **Stores Directory (`/stores`):** Search, Category filters, and A-Z alphabetical directory index.
- **Dynamic Store Detail (`/stores/[slug]`):** Active promo codes / deals tabs, ratings, review preview, FAQs accordion, and collapsible expired coupons archive.
- **Coupons Hub (`/coupons`):** Deep-filtering sidebar by Category, Store, and Offer Type (Codes, Deals, Free Shipping).
- **Categories Hub (`/categories`, `/categories/[slug]`):** Category directory and category-specific stores & coupons.
- **Shopping Guides & Blogs (`/blogs`, `/blogs/[slug]`):** Article reader with embedded live store/coupon cards and schema.
- **Store Reviews (`/reviews`, `/reviews/[slug]`):** Review directory and detailed rating breakdowns, pros/cons, and verdict.
- **Static & Legal Pages:** `/about-us`, `/contact-us` (with working `/api/contact`), `/privacy-policy`, `/terms-and-conditions`.

### ✅ Phase 5: CMS Editorial Expansion & Global Settings (Milestones 4, 8, 11)
- **Shopping Guides & Blog Editor (`/admin/blogs`):** Full-featured Markdown composer, category selector, featured image preview, relational store & coupon tagger, and SEO metadata manager (`/admin/blogs/new`, `/admin/blogs/[id]`).
- **Store Reviews Manager (`/admin/reviews`):** Store selector, 1.0–5.0 star rating slider, interactive Pros & Cons bullet builder, verdict box, and detailed review writer (`/admin/reviews/new`, `/admin/reviews/[id]`).
- **Global Site Settings & Analytics (`/admin/settings`):** Tabbed management for Branding, Google Analytics 4 (GA4), Google Tag Manager (GTM), Meta Pixel, custom scripts, Affiliate compliance, and Social media channels.
- **Dynamic Script Injector ([`AnalyticsScripts.tsx`](file:///e:/Zeeshan/Website/src/components/AnalyticsScripts.tsx)):** Non-blocking marketing script loader embedded in root layout.
- **Admin Dashboard KPI Expansion:** Live 6-metric counters for Stores, Coupons, Guides, Reviews, Regions, and Clicks with quick creation shortcuts.

### ✅ Phase 6: Performance, Security, SEO Audit & Launch QA (Milestones 11, 12)
- **HTTP Security Headers & Compression:** Configured in `next.config.js` (`HSTS`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, AVIF/WebP image formats).
- **Abuse Prevention & Rate Limiting ([`src/lib/rateLimit.ts`](file:///e:/Zeeshan/Website/src/lib/rateLimit.ts)):** Sliding-window rate limiters protecting `/api/search` and `/api/contact`.
- **HTML Sanitization:** Input sanitization on contact submissions and search queries.
- **Responsive Mobile & Desktop QA:** Polished compact mobile header with navigation drawer and clean touch interactions across 375px to 4K displays.
- **Full End-to-End Test:** Search autocomplete, Store coupons, Code Reveal Modal, Outbound tracking, and Review directory 100% verified.

---

## 4. Production Deployment & Hosting Guide

```powershell
# 1. Start local development server
npm run dev -- -p 3000

# 2. Push schema changes to database
npx prisma db push

# 3. Seed / Re-seed database
npx tsx prisma/seed.ts

# 4. Run production build check (Type safety & optimization)
npm run build

# 5. Start production server
npm run start
```

### Environment Variables (.env)
Refer to `.env.example` for all required variables and configuration instructions.
```env
DATABASE_URL="file:./dev.db" # or postgresql://...
JWT_SECRET="<generate-via-openssl-rand-base64-48>"
IP_SALT="<generate-via-openssl-rand-hex-32>"
ADMIN_EMAIL="admin@getmepromos.com"
ADMIN_PASSWORD="<choose-a-strong-password>"
NEXT_PUBLIC_SITE_URL="https://getmepromos.com"
```
