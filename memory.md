# GrabYourDealz.com — Project Memory & Session State

> **Last Updated:** August 25, 2026  
> **Repository:** `https://github.com/534RRR/GrabYourDealz.git` (Branch: `main`)  
> **Current Progress:** Phase 1, Phase 2, Phase 3 & Phase 4 Completed (100% Verified)  
> **Next Milestone:** Phase 5 (CMS Editorial Expansion: Blog/Review Editors & Site Settings)  

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
| [`walkthrough.md`](file:///C:/Users/Aman/.gemini/antigravity-ide/brain/57327822-22c4-4ebf-b103-742c87bd2386/walkthrough.md) | Verification logs, screenshots, and live browser test results for Phases 3 & 4. |
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

---

## 4. Immediate Next Step: Phase 5 Roadmap

Proceed with **Phase 5 (CMS Editorial Expansion & Global Settings)**:
1. **Blog & Shopping Guide Editor (`/admin/blogs`):** Create, edit, publish, category assignment, store/coupon tagger.
2. **Store Reviews Manager (`/admin/reviews`):** Rating scores, structured Pros & Cons builder, and editorial verdict.
3. **Site Settings & Analytics Manager (`/admin/settings`):** Manage site branding, logo, Google Analytics 4 (GA4), GTM ID, Meta Pixel, and support contact details.

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
