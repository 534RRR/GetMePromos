# GrabYourDealz.com — Project Memory & Session State

> **Last Updated:** August 25, 2026  
> **Repository:** `https://github.com/534RRR/GrabYourDealz.git` (Branch: `main`)  
> **Current Progress:** Phase 1, Phase 2, Phase 3, Phase 4 & Phase 5 Completed (100% Verified)  
> **Next Milestone:** Phase 6 (Performance, Security, SEO Validation & Launch QA)  

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
| [`wireframe.md`](file:///e:/Zeeshan/Website/wireframe.md) | Visual UI/UX wireframes and component breakdown for all core page layouts. |
| [`sequence.md`](file:///e:/Zeeshan/Website/sequence.md) | 6-Phase zero-rework execution sequence and dependency matrix. |
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

### ✅ Phase 3: Conversion Engine, Search & SEO Infrastructure
- **Server-Side Affiliate Redirection Route:** `/out/coupon/:id` and `/out/store/:id` with SHA-256 IP hashing, country header detection, `click_logs` recording, `usedCount` increments, and 307 redirects.
- **Global Instant Search & Autocomplete:** `/api/search` + [`GlobalSearchModal.tsx`](file:///e:/Zeeshan/Website/src/components/GlobalSearchModal.tsx) triggered via header and `Ctrl+K`.
- **Dynamic SEO & Schema.org JSON-LD:** Organization, WebSite, Breadcrumbs, Store, Offers, Articles, Reviews, and FAQs in [`src/lib/seo.ts`](file:///e:/Zeeshan/Website/src/lib/seo.ts), plus dynamic `sitemap.ts` and `robots.ts`.
- **Shared UI Components:** [`Breadcrumbs.tsx`](file:///e:/Zeeshan/Website/src/components/Breadcrumbs.tsx), [`RatingStars.tsx`](file:///e:/Zeeshan/Website/src/components/RatingStars.tsx), [`FaqAccordion.tsx`](file:///e:/Zeeshan/Website/src/components/FaqAccordion.tsx), [`NewsletterBox.tsx`](file:///e:/Zeeshan/Website/src/components/NewsletterBox.tsx), [`BlogCard.tsx`](file:///e:/Zeeshan/Website/src/components/BlogCard.tsx), [`ReviewCard.tsx`](file:///e:/Zeeshan/Website/src/components/ReviewCard.tsx).

### ✅ Phase 4: Public Marketplace & Content Pages
- **Stores Directory (`/stores`):** Search, Category filters, and A-Z alphabetical directory index.
- **Dynamic Store Detail (`/stores/[slug]`):** Active promo codes / deals tabs, ratings, review preview, FAQs accordion, and collapsible expired coupons archive.
- **Coupons Hub (`/coupons`):** Deep-filtering sidebar by Category, Store, and Offer Type (Codes, Deals, Free Shipping).
- **Categories Hub (`/categories`, `/categories/[slug]`):** Category directory and category-specific stores & coupons.
- **Shopping Guides & Blogs (`/blogs`, `/blogs/[slug]`):** Article reader with embedded live store/coupon cards and schema.
- **Store Reviews (`/reviews`, `/reviews/[slug]`):** Review directory and detailed rating breakdowns, pros/cons, and verdict.
- **Static & Legal Pages:** `/about-us`, `/contact-us` (with working `/api/contact`), `/privacy-policy`, `/terms-and-conditions`.

### ✅ Phase 5: CMS Editorial Expansion & Global Settings
- **Shopping Guides & Blog Editor (`/admin/blogs`):** Full-featured Markdown composer, category selector, featured image preview, relational store & coupon tagger, and SEO metadata manager (`/admin/blogs/new`, `/admin/blogs/[id]`).
- **Store Reviews Manager (`/admin/reviews`):** Store selector, 1.0–5.0 star rating slider, interactive Pros & Cons bullet builder, verdict box, and detailed review writer (`/admin/reviews/new`, `/admin/reviews/[id]`).
- **Global Site Settings & Analytics (`/admin/settings`):** Tabbed management for Branding, Google Analytics 4 (GA4), Google Tag Manager (GTM), Meta Pixel, custom scripts, Affiliate compliance, and Social media channels.
- **Dynamic Script Injector ([`AnalyticsScripts.tsx`](file:///e:/Zeeshan/Website/src/components/AnalyticsScripts.tsx)):** Non-blocking marketing script loader embedded in root layout.
- **Admin Dashboard KPI Expansion:** Live 6-metric counters for Stores, Coupons, Guides, Reviews, Regions, and Clicks with quick creation shortcuts.

---

## 4. Immediate Next Step: Phase 6 Roadmap

Proceed with **Phase 6 (Performance, Security, SEO Audit & Launch QA)**:
1. **Core Web Vitals & Asset Optimization:** Next-gen image formats, CSS cleanup, dynamic imports, zero hydration mismatches.
2. **Security & Input Sanitization:** XSS protection, rate limiting, secure headers, database input validation.
3. **SEO & Schema Verification:** Rich snippets validation, canonical link checks, multi-region sitemap integrity.
4. **End-to-End Regression Audit:** Full test of affiliate redirection, modal copy triggers, search autocomplete, and responsive mobile testing.

---

## 5. Development Command Cheatsheet

```powershell
# Start local development server
npm run dev -- -p 3000

# Push schema changes to database
npx prisma db push

# Re-seed database
npx tsx prisma/seed.ts

# Run production build check
npm run build

# Git sync at end of session
git add .
git commit -m "feat: complete Phase 3 and Phase 4 frontend marketplace, search, and affiliate tracking"
git push origin main
```
