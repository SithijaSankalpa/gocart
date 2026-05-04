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

## 🖼️ Screenshots

<img width="1701" height="840" alt="dashboard" src="https://github.com/user-attachments/assets/309c80bd-346b-4723-9cc7-1b3cbe8fea7a" />
<img width="1861" height="867" alt="admindashboard" src="https://github.com/user-attachments/assets/8dde498a-5a1e-40c0-b86e-005aaf30d1bb" />
<img width="1670" height="993" alt="prodductdetails" src="https://github.com/user-attachments/assets/16a7307f-ca10-498e-82d8-60213ec49680" />
<img width="1651" height="772" alt="cart" src="https://github.com/user-attachments/assets/fcf6a85c-ed2a-434c-916b-56e3e17690e1" />
<img width="1248" height="1031" alt="Stripe" src="https://github.com/user-attachments/assets/7849c7fc-2f82-4c22-a1f6-a783b1bfbe22" />
<img width="1670" height="993" alt="prodductdetails" src="https://github.com/user-attachments/assets/0700ce25-66de-4cd0-b595-8566a9ca52e9" />
<img width="1657" height="1088" alt="products" src="https://github.com/user-attachments/assets/0c79dadb-d661-46ff-ba8d-f9f85bb9182d" />

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
