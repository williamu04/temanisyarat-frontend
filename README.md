# Frontend — Teman Isyarat

[![Status](https://img.shields.io/badge/status-active-brightgreen)]()
[![Next.js](https://img.shields.io/badge/next.js-16.2-000000?logo=nextdotjs)]()
[![Tailwind](https://img.shields.io/badge/tailwind-v4-06B6D4?logo=tailwindcss)]()

Frontend web platform for **Teman Isyarat** — the landing site, blog, and team information for an AI-powered BISINDO (Indonesian Sign Language) recognition project. Built with Next.js 16 App Router and styled with Tailwind CSS v4.

---

## Overview

The client serves as the public-facing web presence for the Teman Isyarat project. It provides:

- **Landing page** — Project introduction, features, team preview, and calls to action
- **Articles** — Blog posts and project updates served from Sanity CMS
- **Team page** — Research team member profiles

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (strict) |
| CMS | Sanity.io (headless) |
| Fonts | Roboto (Google Fonts) |

---

## Project Structure

```
frontend/
├── assets/                     # Static assets (images, icons, logos)
│   ├── illustrations/
│   ├── logo/
│   ├── mobile/
│   └── web/
│       ├── icons/
│       └── images/
├── public/                     # Public assets (favicons, etc.)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home /
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── artikel/
│   │   │   ├── page.tsx        # Articles list /artikel
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Article detail /artikel/[slug]
│   │   └── tentang/
│   │       └── page.tsx        # About / team /tentang
│   ├── components/
│   │   ├── page-chrome.tsx     # SiteHeader, SiteFooter, ActionButton, etc.
│   │   ├── article-card.tsx    # Article preview card
│   │   ├── team-card.tsx       # Team member card
│   │   └── pagination.tsx      # Article pagination UI
│   └── lib/
│       ├── sanity.ts           # Sanity CMS client & queries
│       ├── articles.ts         # Article content utilities
│       └── format.ts           # Date & read-time formatting
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
└── package.json
```

---

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, features, process, team preview, CTA |
| `/artikel` | Articles | Paginated article listing from Sanity CMS |
| `/artikel/[slug]` | Article Detail | Full article content with rich text |
| `/tentang` | About / Team | Research team member profiles |

---

## Data Flow

```
Sanity CMS (headless)
    │
    ▼ GROQ queries via CDN
src/lib/sanity.ts  (fetchSanity, getArticles, getArticleBySlug, getAuthors)
    │
    ▼ Server Components (RSC)
src/app/artikel/page.tsx        → getArticles(6)
src/app/artikel/[slug]/page.tsx → getArticleBySlug(slug)
src/app/tentang/page.tsx        → getAuthors(9)
    │
    ▼ Child Components
ArticleCard, TeamCard, Pagination, SiteHeader, SiteFooter
```

All data-fetching pages are **Server Components** with `force-dynamic` for fresh content on each request. The data layer includes resilient fallbacks so the site renders fully even when Sanity is unreachable.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev          # http://localhost:3000

# Build for production
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

---

## Environment Variables

| Variable | Default | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `mxxqb8kk` | No |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | No |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-06-04` | No |

All variables have hardcoded defaults and are optional for development. Create a `.env.local` file to override them.

---

## Architecture Notes

- **No client-side state** — Fully server-rendered with React Server Components
- **ISR-ready** — Data fetching uses `next: { revalidate: 300 }`, overridden by `force-dynamic` on content pages
- **Resilient** — Every page has hardcoded fallback content if Sanity is unavailable
- **Mobile-first** — Responsive design with Tailwind breakpoints and hamburger navigation
- **Self-hosted assets** — All icons, logos, and illustrations stored locally under `assets/`
- **Monorepo-compatible** — Turbopack root configured for nested module resolution

---

## Related

| Package | Description |
|---------|-------------|
| [`backend`](https://github.com/temanisyarat/backend) | Sanity CMS Content Studio |
