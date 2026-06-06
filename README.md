# Atelier - Artist Portfolio & Art Commerce

A premium artist portfolio and art-commerce website built with Next.js 15, Supabase, and Stripe.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **Payments**: Stripe Checkout
- **State**: Zustand
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- Supabase account
- Stripe account

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

### 3. Set up Supabase

1. Create a new Supabase project
2. Run `supabase/schema.sql` in the SQL Editor to create tables
3. Run `supabase/seed.sql` to populate sample data
4. Create a storage bucket named `artwork-images` with public access
5. Copy your project URL and anon key to `.env.local`

### 4. Set up Stripe

1. Get your Stripe API keys from the dashboard
2. Set up a webhook endpoint pointing to `/api/webhook`
3. Add the webhook secret to `.env.local`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Pages and API routes
│   ├── admin/             # Admin dashboard
│   ├── api/               # Stripe checkout & webhook
│   ├── artwork/[slug]/    # Artwork detail pages
│   ├── cart/              # Shopping cart
│   ├── collections/       # Collection pages
│   ├── commission/        # Commission request form
│   ├── contact/           # Contact form
│   ├── gallery/           # Gallery with filters
│   └── story/             # Artist story page
├── components/            # React components
│   ├── admin/            # Admin panel components
│   ├── artwork/          # Artwork detail components
│   ├── cart/             # Cart components
│   ├── commission/       # Commission form
│   ├── contact/          # Contact form
│   ├── gallery/          # Gallery grid + filters
│   ├── home/             # Homepage sections
│   ├── layout/           # Navbar, Footer, Section
│   ├── story/            # Story page content
│   └── ui/               # Reusable UI primitives
├── lib/                   # Utilities and clients
│   ├── supabase/         # Supabase client/server
│   ├── stripe.ts         # Stripe client
│   └── utils.ts          # Helper functions
├── store/                 # Zustand stores
└── types/                 # TypeScript types
supabase/
├── schema.sql            # Database schema
└── seed.sql              # Sample data
```

## Features

- Full-screen hero with parallax
- Masonry gallery with real-time filtering
- Dark/Light mode toggle
- Artwork detail with zoom
- Shopping cart with Stripe Checkout
- Commission request system
- Contact form
- Admin dashboard (artwork/collection/order/commission management)
- SEO optimized (sitemap, robots.txt, OG tags)
- Fully responsive
- Smooth Framer Motion animations

## Deployment

### Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Stripe Webhook

After deployment, update your Stripe webhook URL to:
```
https://your-domain.com/api/webhook
```

## Admin Access

Navigate to `/admin` to access the admin dashboard. Protect this route with Supabase Auth by adding middleware or checking auth state in the admin layout.
