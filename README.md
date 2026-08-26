# Shoppable Video Analytics Dashboard

A full-stack dashboard for e-commerce merchants to track the performance of shoppable videos on their storefronts — built as a technical assessment submission.

**Repository:** https://github.com/abhimistry-07/Videoselz

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running Both Together](#running-both-together)
- [API Documentation](#api-documentation)
- [Key Design Decisions](#key-design-decisions)
- [AI Collaboration](#ai-collaboration)
- [Links](#links)

---

## Overview

This application lets merchants see how their shoppable videos are performing — total views, clicks, and add-to-cart conversions per video — through a paginated dashboard table, with a live "Simulate Traffic" control to demonstrate real-time data updates.

**Core features:**

- RESTful backend API with a normalized SQL database
- Event ingestion endpoint simulating webhook-style traffic
- Aggregated, paginated analytics endpoint
- React (Next.js) dashboard with a data table, client-side conversion rate calculation, and pagination
- One-click traffic simulation that posts a random engagement event and refreshes the table

---

## Tech Stack

| Layer      | Choice                                      | Why                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend   | **Next.js (App Router) + TypeScript**       | Satisfies the React requirement with a more structured project convention; built-in CSS Modules support fits the no-Tailwind constraint with zero extra config. Used purely as a client-rendered SPA here — no SSR/SSG or Next API routes, since the backend is a separate standalone service and the data is inherently dynamic.           |
| Backend    | **NestJS + TypeScript**                     | Satisfies the "Node.js/Express or similar framework" requirement. NestJS's module/controller/service structure and dependency injection made the layered architecture (Products/Videos/EngagementEvents/Analytics as separate modules) explicit and easy to reason about — a good fit for an assessment evaluating architectural decisions. |
| Database   | **SQLite (via `better-sqlite3` + TypeORM)** | As specified in the requirements. Zero setup for anyone cloning this repo — no separate DB server to install or configure.                                                                                                                                                                                                                  |
| ORM        | **TypeORM**                                 | Fits NestJS's decorator/DI style naturally; used with explicit migrations (`synchronize: false`) rather than auto-sync, to demonstrate a real migration workflow as the brief requests.                                                                                                                                                     |
| Styling    | **CSS Modules**                             | Tailwind is explicitly disallowed. CSS Modules are built into Next.js, provide locally-scoped class names by default, and avoid adding a CSS-in-JS runtime dependency (styled-components) for a project with fairly static styling needs.                                                                                                   |
| Validation | **class-validator / class-transformer**     | Integrates natively with NestJS's `ValidationPipe` for automatic DTO validation on both `POST /api/events` and query params.                                                                                                                                                                                                                |

---

## Architecture

```
┌─────────────────┐         HTTP/JSON          ┌──────────────────┐
│   Next.js SPA    │ ─────────────────────────▶ │   NestJS API      │
│  (localhost:3000)│ ◀───────────────────────── │  (localhost:3001) │
└─────────────────┘                             └──────────────────┘
                                                          │
                                                          ▼
                                                 ┌──────────────────┐
                                                 │  SQLite Database  │
                                                 │  (better-sqlite3) │
                                                 └──────────────────┘
```

**Backend** is organized into feature modules, each with a single responsibility:

- `products/` — Product entity + repository registration (no dedicated endpoints; not required by spec)
- `videos/` — Video entity, plus `GET /api/videos` (used by the frontend to fetch valid video IDs for traffic simulation)
- `engagement-events/` — EngagementEvent entity + `POST /api/events`
- `analytics/` — cross-entity aggregation logic + `GET /api/analytics/videos` (no entity of its own; a pure reporting layer over Video and EngagementEvent)
- `database/` — TypeORM data source config, migrations, and seed scripts, grouped separately from feature modules since they're infrastructure, not domain logic

**Frontend** is a single-page client-rendered dashboard:

- `app/page.tsx` — the dashboard page, owns data-fetching and pagination state
- `components/layout/` — page shell (Header, DashboardLayout)
- `components/analytics/` — VideoAnalyticsTable, Pagination, SimulateTrafficButton
- `components/ui/` — reusable LoadingState / ErrorState components
- `lib/api.ts` — typed fetch wrapper for all backend calls
- `types/analytics.ts` — shared TypeScript types mirroring backend response shapes

---

## Database Schema

```
┌─────────────┐       ┌──────────────┐       ┌────────────────────┐
│  products   │       │    videos    │       │ engagement_events  │
├─────────────┤       ├──────────────┤       ├────────────────────┤
│ id (PK)     │──┐    │ id (PK)      │──┐    │ id (PK)            │
│ name        │  └───▶│ product_id   │  └───▶│ video_id           │
│ price       │       │ video_url    │       │ event_type         │
│ created_at  │       │ title        │       │ timestamp          │
└─────────────┘       └──────────────┘       └────────────────────┘
```

- `videos.product_id` → `products.id` (CASCADE on delete)
- `engagement_events.video_id` → `videos.id` (CASCADE on delete)
- `event_type` is constrained at the application layer (`view` | `click` | `add_to_cart`) via a shared TypeScript enum, since SQLite has no native `ENUM` column type.
- Schema is version-controlled via TypeORM migrations in `backend/src/database/migrations/` — no `synchronize: true` auto-sync is used.

---

## Project Structure

```
Videoselz/
├── AI_PROMPTING.md
├── README.md
├── backend/
│   ├── src/
│   │   ├── analytics/
│   │   ├── engagement-events/
│   │   ├── videos/
│   │   ├── products/
│   │   ├── database/
│   │   │   ├── data-source.ts
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── data/                  (gitignored — generated SQLite file)
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   │   ├── layout/
    │   │   ├── analytics/
    │   │   └── ui/
    │   ├── lib/
    │   └── types/
    ├── .env.local.example
    └── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later ([nodejs.org](https://nodejs.org))
- **npm** (bundled with Node.js)
- Git

Verify your versions:

```bash
node -v
npm -v
```

---

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/abhimistry-07/Videoselz.git
cd Videoselz/backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# The default values work out of the box for local development —
# no changes needed unless you want a different port or DB path.

# 4. Run database migrations (creates the SQLite schema)
npm run migration:run

# 5. Seed the database with sample data
#    (3 products, 4 videos, and a realistic spread of engagement events)
npm run seed

# 6. Start the backend server
npm run start:dev
```

The API will be running at **http://localhost:3001/api**.

**Available backend scripts:**
| Script | Purpose |
|---|---|
| `npm run start:dev` | Start the server in watch mode |
| `npm run migration:run` | Apply pending migrations |
| `npm run migration:generate -- src/database/migrations/<Name>` | Generate a new migration from entity changes |
| `npm run migration:revert` | Roll back the last migration |
| `npm run seed` | Re-seed the database (clears and repopulates all tables) |

---

### Frontend Setup

Open a **new terminal** (keep the backend running):

```bash
cd Videoselz/frontend

# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Default points to http://localhost:3001/api — matches the backend above.

# 3. Start the frontend dev server
npm run dev
```

The dashboard will be running at **http://localhost:3000**.

---

### Running Both Together

You need **two terminals** open simultaneously:

```bash
# Terminal 1
cd Videoselz/backend
npm run start:dev

# Terminal 2
cd Videoselz/frontend
npm run dev
```

Then visit **http://localhost:3000** — you should see the dashboard populated with the seeded videos and their metrics. Click **"Simulate Traffic"** to post a random engagement event and watch the table update.

---

## API Documentation

### `POST /api/events`

Ingests a new engagement event (simulates webhook traffic).

**Request body:**

```json
{
  "videoId": 1,
  "eventType": "view"
}
```

`eventType` must be one of: `view`, `click`, `add_to_cart`.

**Success response — `201`:**

```json
{
  "id": 253,
  "videoId": 1,
  "eventType": "view",
  "timestamp": "2026-08-26T05:03:36.000Z"
}
```

**Error responses:**

- `400` — invalid `eventType`, missing fields, or unexpected extra fields
- `404` — `videoId` does not exist

---

### `GET /api/analytics/videos`

Returns videos aggregated with total views, clicks, and add-to-cart conversions.

**Query params:**
| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number (1-indexed) |
| `limit` | number | `10` | Results per page |

**Example:** `GET /api/analytics/videos?page=1&limit=10`

**Response — `200`:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Earbuds Unboxing",
      "videoUrl": "https://example.com/v1.mp4",
      "productId": 1,
      "views": 57,
      "clicks": 16,
      "addToCarts": 3
    }
  ],
  "total": 4,
  "page": 1,
  "limit": 10
}
```

---

### `GET /api/videos`

Returns all videos (id, productId, videoUrl, title). Added beyond the spec's minimum requirements so the frontend's traffic simulator always uses real, current video IDs rather than hardcoded values that could go stale if the database is reseeded differently.

---

## Key Design Decisions

- **Conditional aggregation (`SUM(CASE WHEN ...)`) over multiple JOINs** in the analytics query — avoids the cartesian-product row duplication bug that naive multi-JOIN aggregation queries commonly hit.
- **`LEFT JOIN` & Zero-Event Edge Case Handling** — The analytics query uses a `LEFT JOIN` on `engagement_events` so videos without any engagement events are still included in the dataset (showing 0 views, 0 clicks, 0 add-to-carts). The seed script intentionally seeds a 5th video (`Earbuds Battery Life Test`) with zero events to explicitly verify this behavior and confirm the frontend's conversion-rate calculation correctly shows 0.0% rather than NaN%.
- **Explicit migrations, not `synchronize: true`** — demonstrates a real schema-versioning workflow and avoids TypeORM silently altering/dropping columns.
- **Conversion rate computed client-side**, per the spec's explicit requirement, with a guard against divide-by-zero on videos with no views.
- **`GET /api/videos` added beyond the minimum spec** — a small, deliberate addition to remove a real fragility (hardcoded video IDs on the frontend), not scope creep.
- **CASCADE deletes** on both foreign key relations — deleting a product removes its videos and their events, keeping the database consistent by default.
- **No `ProductsController`/`VideosController` CRUD endpoints** — the spec only requires event ingestion and analytics aggregation; the Products/Videos modules exist to register entities and repositories for other modules to use, not as full CRUD APIs.

---

## AI Collaboration

This project was built with AI assistance throughout (Claude). Every significant interaction — including one case where an AI-suggested change was reviewed and rejected after verification — is logged in [`AI_PROMPTING.md`](./AI_PROMPTING.md) at the repository root, per the assessment's requirements.

---

## Links

- **Public GitHub Repository:** https://github.com/abhimistry-07/Videoselz
- **Other Public Repositories:** `https://github.com/abhimistry-07/chat_app-mern`
  <!-- - **YouTube Pitch (30s, private/unlisted):** `[PLACEHOLDER — add link here]` -->
  <!-- - **Technical Walkthrough (Loom/screen recording, 3-5 min):** `[PLACEHOLDER — add link here]` -->
