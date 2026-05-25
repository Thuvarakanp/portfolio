# Thuvarakan — QA Portfolio + Admin

A Next.js 15 (App Router) portfolio with a Prisma/SQLite-backed admin UI at `/admin`.
Replaces the previous static-HTML version — same visual design, same animations,
now editable through a logged-in admin instead of edited by hand.

## Stack
- **Next.js 15** (App Router, React 19, TypeScript)
- **Prisma + SQLite** for content (file: `prisma/dev.db`)
- **Auth.js v5** with Google OAuth (allowlist via `ADMIN_EMAILS`)
- **Local file uploads** to `public/uploads/` (dev only — disabled in production)

## First-time setup

```powershell
npm install
copy .env.example .env        # or `cp` on macOS/Linux
npx prisma migrate dev        # creates prisma/dev.db
npm run db:seed               # populates with the initial portfolio content
npm run dev                   # http://localhost:3000
```

### Google OAuth credentials

1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth client (Web application).
3. Add authorized JavaScript origin `http://localhost:3000` and redirect URI
   `http://localhost:3000/api/auth/callback/google`.
4. Paste the client ID + secret into `.env` as `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.
5. Add your Gmail address to `ADMIN_EMAILS` (comma-separated for multiple).
6. Restart `npm run dev`.

For production, add the same client with the production URL added to origins/redirects,
and set the env vars in your Vercel project.

### Auth secret

```powershell
npx auth secret    # writes AUTH_SECRET to .env (or print and copy)
```

## Day-to-day

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server. |
| `npm run build` | Generate Prisma client + production build (type-check). |
| `npm run start` | Run the production build. |
| `npm run db:seed` | Re-seed the DB (idempotent for pages, wipes case studies + gallery). |
| `npm run db:studio` | Open Prisma Studio at http://localhost:5555. |

## What's editable

Sign in at `/admin/login` (Google) and you'll see the dashboard with:

- **Pages** — per page: `<title>`, meta description, OG meta, canonical path, hero block,
  page-specific sections. Both hero and sections are stored as JSON — there are inline shape
  hints, and the seed script (`prisma/seed.ts`) is the canonical shape reference.
- **Case studies** — CRUD on the articles on `/work`.
- **Gallery** — six slots that map to the asymmetric grid on `/work`. Upload images (dev only)
  or paste any URL. Each item has alt text, label, title and reference.
- **Site config** — site name, status pill, copyright, footer credit, contact (email + socials),
  availability block, OG image, theme color.
- **Navigation** — reorder, rename, or change the top-bar links.

## Image uploads

Vercel's filesystem is read-only at runtime, so uploads only work locally. To enable in
production you'd swap [`app/api/upload/route.ts`](./app/api/upload/route.ts) for a Vercel Blob
(`@vercel/blob`), Cloudinary or S3-compatible writer. For now, upload locally and commit the
files in `public/uploads/`.

## Deploy

This is now a Next.js app — Vercel auto-detects it. You'll need to:

1. Push to a GitHub repo.
2. Import in Vercel.
3. Set env vars in the Vercel project: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_TRUST_HOST=true`,
   `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `ADMIN_EMAILS`, `SITE_URL`.
4. SQLite on Vercel: the default `file:./prisma/dev.db` is ephemeral and read-only.
   For real production persistence, switch to Turso (libSQL) or Postgres in
   [`prisma/schema.prisma`](./prisma/schema.prisma) and re-run `prisma migrate`.

## Project layout

```
app/
  page.tsx, about/, work/, skills/, contact/, not-found.tsx   ← public pages
  layout.tsx                                                  ← root layout (Bar/Footer/SVG)
  globals.css                                                 ← all the original CSS
  admin/                                                      ← admin UI
    layout.tsx, page.tsx, login/
    pages/, cases/, gallery/, site/, nav/
  api/
    auth/[...nextauth]/route.ts   ← NextAuth handlers
    pages/[id]/, cases/, cases/[id]/, gallery/, gallery/[id]/,
    site/, nav/, upload/
components/
  Bar, Footer, IconSprite, Reveal, Hero, PageHead, Band, Counter, TestRunner
lib/
  prisma.ts, content.ts, guard.ts
auth.ts            ← Auth.js v5 config
middleware.ts      ← /admin protection
prisma/
  schema.prisma, seed.ts, migrations/
public/
  favicon.svg, og-image.png, sitemap.xml, robots.txt, uploads/
```
