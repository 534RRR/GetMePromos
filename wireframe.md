# GetMePromos.com — UI/UX Wireframe & Layout Specification

> **Document Version:** 1.0  
> **Source:** GetMePromos Wireframe Sheet (Main Pages)  
> **Purpose:** Structural blueprint for all core page layouts, component hierarchies, user interaction zones, and content sections.

---

## 1. Global Navigation & Header (All Pages)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO] GetMePromos    Coupons   Deals   Stores   Categories   Blogs   Reviews    [🔍] [🇺🇸 US ▾] [🤍]│
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown
* **Left:** Brand Logo (GetMePromos with vector icon).
* **Center Navigation:** `Coupons`, `Deals`, `Stores`, `Categories`, `Blogs`, `Reviews`.
* **Right Utility Bar:**
  * **Global Instant Search (`🔍`):** Opens interactive search bar with categorized autocomplete (Stores, Coupons, Blogs).
  * **Country / Region Selector (`🇺🇸 US ▾`):** Dropdown to switch active geographic scope (US, UK, AU, CA, DE, FR, IT, NL).
  * **Favorites / Saved Deals (`🤍`):** Quick drawer for saved stores & favorite coupon codes.
  * **Mobile Menu Trigger (Hamburger):** Opens slide-over navigation on mobile viewports.

---

## 2. Page-by-Page Wireframe Specifications

---

### Wireframe 1: Homepage (`/`)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  HERO SECTION                                                                                    │
│  ┌───────────────────────────────┐  ┌─────────────────────────────────────────────────────────┐  │
│  │                               │  │  Save More with GetMePromos                           │  │
│  │   [Featured Hero Promo/Image] │  │  Verified Coupons & Amazing Deals from Your Stores       │  │
│  │                               │  │  [ Search for stores, coupons, categories...   ] [Search]│  │
│  └───────────────────────────────┘  └─────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│  TODAY'S POPULAR OFFERS                                                            [View All ➔]  │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                       │
│  │ [Logo] [CODE]│   │ [Logo] [DEAL]│   │ [Logo] [DEAL]│   │ [Logo] [CODE]│                       │
│  │ 25% OFF      │   │ Up to 50% OFF│   │ Free Shipping│   │ 30% OFF      │                       │
│  │ [  SAVE25  ] │   │ [   GET50  ] │   │ [ FREESHIP ] │   │ [  SAVE30  ] │                       │
│  │  [Get Code]  │   │  [Get Deal]  │   │  [Get Deal]  │   │  [Get Code]  │                       │
│  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘                       │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│  POPULAR STORES                                                                    [View All ➔]  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                                                 │
│  │Store│ │Store│ │Store│ │Store│ │Store│ │Store│                                                 │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                                                 │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│  TOP CATEGORIES                                                                    [View All ➔]  │
│  [👗 Fashion]  [💻 Electronics]  [💄 Beauty]  [🏡 Home & Garden]  [✈️ Travel]  [⚽ Sports]  [••• More]│
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│  WHY SHOP WITH US? (4 Trust Columns)                                                             │
│  ✓ Verified Coupons      💰 Huge Savings       🆓 100% Free           🛡️ Trusted by Shoppers      │
│    Manually verified        Best offers daily     No hidden charges      Thousands saved daily   │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│  NEWSLETTER / EMAIL SIGNUP                                                                       │
│  "Subscribe to get the latest coupons, deals & updates."   [ Enter email... ] [ Subscribe ]      │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│  TRUST BADGES:  [Affiliate Disclosure]      [Secure & Safe]      [24/7 Support]                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                                          │
│  About Us (4 links) | Coupons (4 links) | Stores (4 links) | Categories (4 links) | Socials [↑]  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Key Sections:
1. **Hero & Search Banner:** 2-column layout with high-impact visual on left and value proposition headline + prominent search bar on right.
2. **Today's Popular Offers:** Carousel/grid of top 4 performing coupon & deal cards with dashed code reveal boxes and CTA buttons.
3. **Popular Stores:** Clean logo tile grid of trending brands.
4. **Top Categories:** Visual icon pill buttons for high-traffic shopping niches.
5. **Why Shop With Us:** 4 trust pillars emphasizing verification, savings, free access, and shopper credibility.
6. **Newsletter Box:** Email capture input with immediate subscription confirmation.
7. **Trust & Compliance Bar:** Transparent affiliate disclosure and security guarantee.
8. **Multi-Column Footer:** Full site navigation, country switcher, legal pages, social links, and back-to-top button.

---

### Wireframe 2: Coupons Listing Page (`/coupons`)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home / Coupons                                                                      │
│ Title: All Coupons (Browse 20,000+ verified coupon codes from your favorite stores)              │
│ Top Filter Bar: [ All Categories ▾ ]  [ All Stores ▾ ]  [ All Types ▾ ]  [ Sort: Popular ▾ ] [🔍]│
├────────────────────────────────┬─────────────────────────────────────────────────────────────────┤
│ SIDEBAR FILTERS                │ MAIN COUPON LIST                                                │
│                                │                                                                 │
│ 📁 Categories:                 │ ┌─────────────────────────────────────────────────────────────┐ │
│ • All Categories               │ │ [Store Logo]  [CODE] 25% OFF - Get 25% Off Sitewide          │ │
│ • Fashion                      │ │               ✓ Verified • Expires Aug 31 • 100% Success    │ │
│ • Electronics                  │ │                                   [ SAVE25 ]  [ Get Code ]  │ │
│ • Beauty                       │ └─────────────────────────────────────────────────────────────┘ │
│ • Home & Garden                │ ┌─────────────────────────────────────────────────────────────┐ │
│ • Travel                       │ │ [Store Logo]  [DEAL] Up to 50% OFF on Selected Items        │ │
│ • Sports                       │ │               ✓ Verified • Expires Aug 31 • 100% Success    │ │
│ • Health & Beauty              │ │                                               [ Get Deal ]  │ │
│                                │ └─────────────────────────────────────────────────────────────┘ │
│ 🏷️ Coupon Type:                │ ┌─────────────────────────────────────────────────────────────┐ │
│ [ ] All Types                  │ │ [Store Logo]  [FREE SHIPPING] Free Shipping on All Orders   │ │
│ [ ] Coupon Codes               │ │               ✓ Verified • Expires Aug 31 • 100% Success    │ │
│ [ ] Deals                      │ │                                   [FREESHIP]  [ Get Code ]  │ │
│ [ ] Free Shipping              │ └─────────────────────────────────────────────────────────────┘ │
│                                │                                                                 │
│                                │ Pagination: [ 1 ] [ 2 ] [ 3 ] [ 4 ] ... [ 100 ] [ > ]           │
└────────────────────────────────┴─────────────────────────────────────────────────────────────────┘
```

#### Key Elements:
* **Top Dynamic Filter Strip:** Multi-dropdown filtering (Category, Store, Offer Type, Sorting, Search).
* **Left Category & Type Filter:** Deep-filtering sidebar with live counts.
* **Coupon Card Layout:**
  - Store Logo (Left)
  - Offer Details, Verification Badge & Expiry countdown (Center)
  - Dashed Code Box & High-Contrast CTA button (Right)
* **Pagination:** SEO-friendly page numbering.

---

### Wireframe 3: Coupon Detail View / Reveal Modal (`/coupons/[slug]`)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home / Coupons / [Store Name] / 25% OFF Sitewide                                    │
│                                                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ ┌───────────────────┐  25% OFF Sitewide  [CODE]                                              │ │
│ │ │                   │  Get 25% Off on All Orders Sitewide                                    │ │
│ │ │ [Store Logo Hero] │  📅 Expires: Aug 31, 2024  |  ✓ Verified: 2 days ago |  ⭐ 100% Success│ │
│ │ │                   │                                                                        │ │
│ │ └───────────────────┘  ┌───────────────────────────────────────────────┐ ┌─────────────────┐ │ │
│ │                        │                 S A V E 2 5                   │ │ [📋 Copy Code]  │ │ │
│ │                        └───────────────────────────────────────────────┘ └─────────────────┘ │ │
│ │                                  [ Visit Store & Redeem Offers ↗ ]                           │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                  │
│ ┌──────────────────────────────────────┐  ┌──────────────────────────────────────────────────┐ │
│ │ HOW TO USE THIS COUPON               │  │ OFFER DETAILS & TERMS                            │ │
│ │ 1. Copy the code above.              │  │ • Applicable on all sitewide items               │ │
│ │ 2. Click "Visit Store" to open site. │  │ • Minimum purchase: $0                           │ │
│ │ 3. Paste the code at checkout.       │  │ • Cannot be combined with other offers           │ │
│ │ 4. Enjoy instant savings!            │  │ • One use per customer                           │ │
│ └──────────────────────────────────────┘  └──────────────────────────────────────────────────┘ │
│                                                                                                  │
│ YOU MIGHT ALSO LIKE (Related Store Coupons Carousel)                                             │
│ ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                        │
│ │ [Logo] [DEAL]│   │ [Logo] [CODE]│   │ [Logo] [DEAL]│   │ [Logo] [CODE]│                        │
│ │ Up to 50% OFF│   │ Free Shipping│   │ 30% OFF      │   │ 15% OFF      │                        │
│ │  [Get Deal]  │   │  [Get Code]  │   │  [Get Deal]  │   │  [Get Code]  │                        │
│ └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘                        │
│                                                                                                  │
│ ABOUT [STORE NAME]                                                                               │
│ [Store Logo] Store Description & Brand Overview...                          [ Visit Store ➔ ]   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Wireframe 4: Stores Directory Page (`/stores`)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home / Stores                                                                       │
│ Title: All Stores (Browse thousands of stores and save with the best offers)                     │
│ Search & Filters: [ Search for stores... ]  [ All Categories ▾ ]  [ All Countries ▾ ] [ Sort: ▾ ]│
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ TOP STORES (Featured Grid)                                                                       │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│ │  Store Logo  │ │  Store Logo  │ │  Store Logo  │ │  Store Logo  │ │  Store Logo  │             │
│ │  Store Name  │ │  Store Name  │ │  Store Name  │ │  Store Name  │ │  Store Name  │             │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘             │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ RECENTLY ADDED STORES                                                                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│ │  Store Logo  │ │  Store Logo  │ │  Store Logo  │ │  Store Logo  │ │  Store Logo  │             │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘             │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ALL STORES (A-Z INDEX)                                                                           │
│ [ All ] [ A ] [ B ] [ C ] [ D ] [ E ] [ F ] [ G ] [ H ] [ I ] [ J ] [ K ] ... [ Z ] [ # ]         │
│                                                                                                  │
│ • A                                                                                              │
│   A Store Name .......................................................................... [🤍]   │
│   ABC Store ............................................................................. [🤍]   │
│   Ace Store ............................................................................. [🤍]   │
│   Another Store ......................................................................... [🤍]   │
│                                                                                                  │
│ • B                                                                                              │
│   Best Store ............................................................................ [🤍]   │
│   Big Store ............................................................................. [🤍]   │
│   Bargain Store ......................................................................... [🤍]   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Wireframe 5: Individual Store Page (`/stores/[slug]`)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home / Stores / [Store Name]                                                        │
│                                                                                                  │
│ STORE HEADER CARD                                                                                │
│ ┌───────────────┐  Store Name   ⭐⭐⭐⭐⭐ 4.5 (120 reviews)                             [🤍]      │
│ │  Store Logo   │                                                           [ Visit Store ↗ ]   │
│ │               │  [🎟️ 20 Coupons]  [🔥 10 Deals]  [🌍 United States]  [🏷️ Fashion]             │
│ └───────────────┘                                                                                │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ABOUT STORE & STORE DETAILS                                                                      │
│ ┌───────────────────────────────────────────────┐ ┌────────────────────────────────────────────┐ │
│ │ About Store:                                  │ │ Store Details:                             │ │
│ │ Full store description, shopping perks,       │ │ • Website: www.store.com                   │ │
│ │ and money-saving tips...                      │ │ • Customer Care: support@store.com         │ │
│ │                                               │ │ • Free Shipping: Yes (over $50)            │ │
│ │                                               │ │ • Return Policy: 30 Days Free Returns      │ │
│ └───────────────────────────────────────────────┘ └────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ TOP COUPONS & DEALS (Active Verified Offers)                                                     │
│ ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                        │
│ │ [25% OFF]    │   │ [Up to 50%]  │   │ [Free Ship]  │   │ [20% OFF]    │                        │
│ │ Get 25% Off  │   │ Selected Sale│   │ On all orders│   │ Sitewide     │                        │
│ │ [  SAVE25  ] │   │ [  GET50   ] │   │ [ FREESHIP ] │   │ [  SAVE20  ] │                        │
│ │  [Get Code]  │   │  [Get Deal]  │   │  [Get Deal]  │   │  [Get Code]  │                        │
│ └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘                        │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ STORE REVIEWS, PROS & CONS, RELATED BLOGS & STORE FAQS                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Wireframe 6: Categories Hub (`/categories`)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home / Categories                                                                   │
│ Title: All Categories (Browse coupons and deals by categories)                                   │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ CATEGORY GRID                                                                                    │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│ │     👗       │ │     💻       │ │     💄       │ │     🏡       │ │     ✈️       │             │
│ │   Fashion    │ │ Electronics  │ │    Beauty    │ │ Home & Garden│ │    Travel    │             │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘             │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│ │     ⚽       │ │     🧴       │ │     🍔       │ │     🚗       │ │     🎬       │             │
│ │    Sports    │ │Health/Beauty │ │Food & Drink  │ │  Automotive  │ │Entertainment│             │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘             │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│ │     👶       │ │     📚       │ │     🐾       │ │     💼       │ │     •••      │             │
│ │ Kids & Baby  │ │Books/Edu     │ │ Pet Supplies │ │   Business   │ │   View All   │             │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘             │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Wireframe 7: Blogs Hub (`/blogs`)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home / Blogs                                                                        │
│ Title: Latest Blogs (Tips, guides and news to help you save more)                                │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ FEATURED HERO ARTICLE                                                                            │
│ ┌───────────────────────────────┐  10 Ways to Save More Online Shopping in 2024                  │
│ │                               │  Detailed guide on how to stack coupons, cashback and sales... │
│ │     [Featured Blog Image]     │  📅 May 20, 2024  •  ⏱️ 5 min read                             │
│ │                               │                                                                │
│ └───────────────────────────────┘  [ Read More ➔ ]                                               │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ RECENT ARTICLES GRID                                                                             │
│ ┌───────────────────────────────┐ ┌───────────────────────────────┐ ┌──────────────────────────┐ │
│ │ Best Summer Sales You Need    │ │ How to Use Promo Codes        │ │ Top 20 Coupon Sites 2024 │ │
│ │ May 18, 2024 • 4 min read     │ │ May 15, 2024 • 6 min read     │ │ May 10, 2024 • 8 min read│ │
│ └───────────────────────────────┘ └───────────────────────────────┘ └──────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Wireframe 8: Blog Post Page (`/blogs/[slug]`)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home / Blogs / 10 Ways to Save More Online Shopping in 2024                         │
│ Title: 10 Ways to Save More Online Shopping in 2024 (May 20, 2024 • 5 min read)                  │
├────────────────────────────────────────────────────────┬─────────────────────────────────────────┤
│ MAIN ARTICLE CONTENT                                   │ RIGHT SIDEBAR                           │
│                                                        │                                         │
│ [ Full Featured Image ]                                │ 📰 Related Posts:                       │
│                                                        │ • Best Summer Sales You Shouldn't Miss  │
│ Paragraph introduction...                              │ • How to Use Coupon Codes Effectively   │
│                                                        │ • Top 20 Coupon Websites in 2024        │
│ 1. Use Coupon Codes                                    │                                         │
│ Explanation of verified codes with embedded store links│ 🏷️ Trending Stores:                     │
│ [ Embedded Live Coupon Card Widget ]                   │ • Amazon (25 Coupons)                   │
│                                                        │ • Nike (14 Coupons)                     │
│ 2. Compare Prices & Stack Discounts                    │ • Walmart (18 Coupons)                  │
│ Explanation of deals and sales...                      │                                         │
│                                                        │ 📧 Newsletter Box:                      │
│ FAQ Accordion & Social Share Buttons                   │ [ Email... ] [ Subscribe ]              │
└────────────────────────────────────────────────────────┴─────────────────────────────────────────┘
```

---

## 3. Responsive Breakpoints & Mobile Adaptations

* **Desktop ($\ge$ 1024px):** Full multi-column grids, persistent left filters on directory pages, and right sidebar on blog/review pages.
* **Tablet (768px - 1023px):** 2-column coupon grids, collapsible filter drawers, sticky header.
* **Mobile (< 768px):** 
  - Single-column flow with touch-optimized CTA buttons.
  - Sticky bottom/top search bar.
  - Slide-out filter modal.
  - 1-tap "Copy Code" interaction with visual feedback.

---

*This document is stored in `wireframe.md` and provides the exact UI/UX structure for GetMePromos.com.*
