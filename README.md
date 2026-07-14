# Porfolio — Marvin Aguilar

A personal portfolio for **Marvin Aguilar, Software Engineer II**, themed after the
main menu of *Clair Obscur: Expedition 33* — a candlelit, Belle Époque void with
gilded chapter navigation, drifting embers, and painterly motion.

Built as an **isolated** project: React + TypeScript + Tailwind + Framer Motion,
with **no external company libraries**.

**🌐 Live site: https://marvin-aguilards.github.io/portfolio/**

---

## ✦ Features

- **Expedition-33 title screen** — a hero card + a vertical, glowing "chapter" menu.
- **Fully keyboard navigable** (see below) with visible focus rings and a legend.
- **Signature animations** — flickering candlelight, drifting gilded motes and rising
  embers, shimmering gold title, a breathing avatar halo with a rotating conic ring,
  staggered section reveals, and animated skill meters. All respect
  `prefers-reduced-motion`.
- **Custom SVG avatar** stylized from your photo (glasses, beard, burgundy shirt),
  framed in an Expedition gold halo. Drop in a real photo any time (see below).
- **Pluggable data layer** — the entire app reads through a `PortfolioAdapter`
  interface. Ships with a **JSON adapter** (default) and a **MongoDB adapter**;
  switch with a single config/env change.
- **Professional sections**: About, Experience, Projects, Skills, Education,
  Achievements, Testimonials, Contact.
- **Client-side routing** (React Router) — every section has its own shareable
  URL (`/projects`, `/contact`, …), with working browser back/forward and refresh.
  Unknown paths redirect to the menu.

## ✦ Keyboard controls

| Key | Action |
| --- | --- |
| `↑` / `↓` (also `W`/`S`, `K`/`J`) | Move selection (wraps) |
| `Enter` / `Space` / `→` | Open the highlighted section |
| `Esc` / `Backspace` / `←` | Go back to the menu |
| `Home` / `End` | Jump to first / last item |
| `1`–`8` | Jump straight to a section |
| `Tab` | Native focus traversal (buttons & links) |

## ✦ Routes

| Path | Screen |
| --- | --- |
| `/` | Main menu (title screen) |
| `/about`, `/experience`, `/projects`, `/skills`, `/education`, `/achievements`, `/testimonials`, `/contact` | Section pages |
| anything else | redirects to `/` |

Static hosts need an SPA fallback (rewrite everything to `index.html`).
A Netlify [`public/_redirects`](public/_redirects) is included; Vite dev/preview
fall back automatically. On Vercel add a rewrite in `vercel.json`.

## ✦ Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into /dist
npm run preview    # serve the production build
```

## ✦ Editing your content

All content is **placeholder data** you can freely edit. With the default JSON
source, just edit the files in [`public/data/`](public/data):

- `profile.json` — name, title, tagline, epigraph, summary, socials, avatar path
- `experience.json` — roles (timeline)
- `projects.json` — projects (grid; set `"featured": true` to pin & badge)
- `skills.json` — skill groups with 0–100 levels (drive the meters)
- `education.json` — degrees & certifications
- `achievements.json` — milestones
- `testimonials.json` — quotes from colleagues
- `contact.json` — location & availability
- **`links.json` — the single source of truth for your email, GitHub and
  LinkedIn.** Edit it once; the adapter derives the mailto link and every social
  button (hero, About, Contact) from it — no need to touch other files.

The shapes are defined in [`src/types/portfolio.ts`](src/types/portfolio.ts).

### Using your real photo instead of the SVG avatar

Drop an image into `public/avatar/` (e.g. `marvin.png`) and set
`"avatarUrl": "/avatar/marvin.png"` in `profile.json`. The gilded frame works with
any square image.

## ✦ Switching data sources (JSON ⇆ MongoDB)

The app never talks to a database directly — it talks to a `PortfolioAdapter`
([`src/data/adapter.ts`](src/data/adapter.ts)). Two implementations are provided,
selected by [`src/data/config.ts`](src/data/config.ts) or env vars.

**Stay on JSON (default):** nothing to do.

**Switch to MongoDB:**

1. Run the reference API (owns the Mongo driver — browsers can't connect directly):

   ```bash
   cd server
   npm install
   MONGODB_URI="mongodb://localhost:27017" npm run seed   # loads from public/data/*.json
   MONGODB_URI="mongodb://localhost:27017" npm start       # http://localhost:4000
   ```

2. Point the front end at it — copy `.env.example` to `.env.local` and set:

   ```env
   VITE_DATA_SOURCE=mongo
   VITE_API_BASE_URL=http://localhost:4000/api
   ```

   (Or just flip `DATA_SOURCE` in `src/data/config.ts`.)

3. `npm run dev` — the UI is byte-for-byte identical; only the source changed.
   A small `data · <source>` badge in the corner confirms which adapter answered.

**Add a third backend later** (CMS, GraphQL, …): implement `PortfolioAdapter`,
register it in [`src/data/index.ts`](src/data/index.ts). No component changes.

## ✦ Project structure

```
porfolio/
├── public/
│   ├── data/               # JSON adapter source of truth (placeholder data)
│   ├── avatar/marvin.svg   # stylized SVG portrait
│   └── favicon.svg
├── server/                 # reference Express + MongoDB API (for the mongo adapter)
│   ├── server.js
│   └── seed.js             # seeds Mongo from public/data/*.json
└── src/
    ├── data/               # adapter interface, JSON & Mongo adapters, factory, config
    ├── context/            # PortfolioProvider — loads data once, shares via context
    ├── hooks/              # usePortfolioData, useKeyboardNav
    ├── lib/                # sections (menu/route defs), cx (classNames helper)
    ├── pages/              # MenuPage, SectionPage (routed)
    ├── components/
    │   ├── ui/             # reusable primitives: Card, Tag, Button, Meter, Icon,
    │   │                   #   Avatar, SocialLinks, HighlightList, Eyebrow, Kbd, Rise…
    │   │                   #   (import from '@/components/ui')
    │   ├── layout/         # Layout, SectionShell, ErrorBoundary
    │   ├── effects/        # Backdrop, ParticleField (atmosphere)
    │   ├── menu/           # MainMenu, MenuHero, MenuItem, ControlsLegend
    │   └── sections/       # the 8 section bodies (composed from ui primitives)
    ├── types/portfolio.ts  # domain types (shared by every adapter)
    ├── App.tsx             # Router + Provider + ErrorBoundary wiring
    └── index.css           # Expedition backdrop, grain, vignette, gilded utilities
```

## ✦ Stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · (optional) Express + MongoDB.

---

*"When one falls, we continue."*
