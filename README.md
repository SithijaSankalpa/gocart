## Features

GoCart is a full-stack, multi-vendor e-commerce platform that combines a customer-facing storefront with seller and admin dashboards, offering payments, reviews, coupons, and AI-assisted product listing in one codebase.

- **Multi-vendor marketplace:** Stores can apply, get approved, and sell under their own brand.
- **Customer storefront:** Product discovery, ratings/reviews, cart, and order history.
- **Seller dashboard:** Manage inventory, orders, pricing, and ratings.
- **Admin panel:** Approve stores, monitor revenue, manage coupons, and oversee orders.
- **Stripe checkout:** Card payments with webhook-based order reconciliation.
- **Coupons & memberships:** New-user and member-only discounts, shipping logic.
- **AI product helper:** Generate product name + description from image.
- **Media hosting:** Image uploads served via ImageKit.
- **Background jobs:** Inngest syncs Clerk users and expires coupons.

## 🖼️ Screenshots

![Dashboard](assets/dashboard.jpg)
![Product Details](assets/prodductdetails.jpg)
![Cart](assets/cart.jpg)
![Stripe Checkout](assets/stripe.jpg)

## 🛠️ Tech Stack <a name="-tech-stack"></a>

- **Framework:** Next.js 15 (App Router, Route Handlers)
- **Language & UI:** React 19, JSX
- **Styling:** Tailwind CSS 4
- **State:** Redux Toolkit + React Redux
- **Auth:** Clerk (middleware + server auth)
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Payments:** Stripe (Checkout + Webhooks)
- **Media:** ImageKit
- **Background jobs:** Inngest
- **AI:** OpenAI (image-to-text product helper)
- **Charts:** Recharts
- **Utilities:** Axios, date-fns, react-hot-toast, lucide-react, ws

## 🧱 Architecture Highlights

- **App Router structure:** Public storefront, seller area, and admin area under `app/`.
- **API routes:** Route handlers under `app/api/*` for cart, orders, store, admin, Stripe, and AI.
- **Role enforcement:** Clerk authentication + custom middleware for admin/seller gates.
- **Stripe flow:** Checkout session creation and webhook reconciliation to mark paid orders.
- **Edge-ready Prisma:** Neon adapter for serverless/edge compatibility.

## 🔐 Environment Variables

Required variables referenced in the codebase:

```bash
# Database
DATABASE_URL=
DIRECT_URL=

# Admin access
ADMIN_EMAIL=

# Auth (Clerk)
# Use your Clerk dashboard values

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# ImageKit
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

# OpenAI
OPENAI_API_KEY=
OPENAI_BASE_URL=
OPENAI_MODEL=

# Client
NEXT_PUBLIC_CURRENCY_SYMBOL=$
```

## 📦 Scripts

- `npm run dev` - Start dev server (Turbopack)
- `npm run build` - Generate Prisma client and build
- `npm run start` - Run production server
- `npm run lint` - Lint the project
