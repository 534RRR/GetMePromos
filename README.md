# GetMePromos.com — Multi-Region Coupon & Deals Platform

A high-performance, multi-region coupon directory, merchant review engine, promo code marketplace, and affiliate shopping platform built with Next.js 14, TypeScript, and Prisma ORM.

---

> [!CAUTION]
> ### 🚨 CRITICAL SECURITY NOTICE: ROTATE ALL HISTORICAL SECRETS IMMEDIATELY
> If you are deploying this application to staging or production, **you MUST generate fresh, unique production secrets**.
>
> During early development, default placeholder values and initial seed credentials (including JWT secret strings and initial development passwords) existed in the codebase and may remain in past Git commit history (`git log`).
>
> **Mandatory Production Actions:**
> 1. **JWT Secret:** NEVER use any previously referenced JWT secret string. Generate a completely new cryptographic key using:
>    ```bash
>    openssl rand -base64 48
>    ```
> 2. **IP Salt:** Generate a fresh 32-byte hexadecimal salt for click log IP hashing:
>    ```bash
>    openssl rand -hex 32
>    ```
> 3. **Admin Password:** Choose a unique, strong password for `ADMIN_PASSWORD` before running database seeding or change it immediately in `/admin/users`.
> 4. **Database URL & TLS/SSL:** Ensure your production database credentials (e.g. PostgreSQL) are kept exclusively in production environment secrets and never committed. Production database connections MUST enforce TLS/SSL (e.g. `?sslmode=require`). Default credentials and unauthenticated remote ports are strictly rejected.
> 5. **Git History Scrubbing:** If this repository was ever public or accessible by third parties, use [`git-filter-repo`](https://github.com/newren/git-filter-repo) or [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to purge historical commits containing test credentials.

---

## Getting Started

### 1. Prerequisites
- **Node.js:** v18.17+ or v20+
- **npm:** v9+ or v10+

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Ensure `.env` contains:
| Variable | Scope | Description | Example / Method |
|---|---|---|---|
| `DATABASE_URL` | Server-only | SQLite local path or PostgreSQL production connection string | `"file:./dev.db"` or `postgresql://...` |
| `JWT_SECRET` | Server-only | Cryptographic key used to sign and verify Admin session JWTs (min 32 chars) | `openssl rand -base64 48` |
| `IP_SALT` | Server-only | Salt string for one-way SHA-256 IP address hashing in click logs | `openssl rand -hex 32` |
| `ADMIN_EMAIL` | Server-only | Super Admin email initialized during `db:seed` | `"admin@yourdomain.com"` |
| `ADMIN_PASSWORD` | Server-only | Super Admin password initialized during `db:seed` | A strong password |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | Public canonical domain URL of the website | `"https://getmepromos.com"` |
| `NEXT_PUBLIC_APP_URL` | Client & Server | Public application URL | `"http://localhost:3000"` |

> [!IMPORTANT]
> Never prefix sensitive credentials (database connection strings, tokens, salts, or passwords) with `NEXT_PUBLIC_` or `REACT_APP_`. Variables with those prefixes are bundled into client-side JavaScript by Next.js and exposed publicly to browser users.

### 3. Install Dependencies & Generate Prisma Client
```bash
npm install
npx prisma generate
```

### 4. Database Setup & Seeding
```bash
# Push schema to local database
npm run db:push

# Seed countries, categories, top brands, coupons, reviews, and admin user
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the marketplace.  
Access the CMS admin panel at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

---

## Production Deployment

### Build Verification
Before deploying, always execute a clean production build check:
```bash
npm run build
```

### Recommended Hosting Providers
- **Frontend & Edge Middleware:** Vercel, Cloudflare Pages, or AWS Amplify.
- **Production Database:** Neon, Supabase PostgreSQL, AWS RDS, or Railway PostgreSQL.

---

## License
Proprietary & Confidential. All rights reserved.
