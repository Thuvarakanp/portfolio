# Thuvarakan - QA Portfolio

A five-page static portfolio site. Designer -> Developer -> QA.
Refined-minimal design, Phosphor icons, motion layer. **Zero build step.**

## Pages
- `index.html`  - Home
- `about.html`  - Trajectory, why the order matters, full stack of quality
- `work.html`   - Case studies + metrics
- `skills.html` - Interactive skill suite, toolkit, bug specimen
- `contact.html`- Contact + availability
- `404.html`    - Custom not-found page

## Deploy to Vercel

**Option A - drag & drop (fastest)**
1. Go to https://vercel.com/new
2. Drag this whole folder onto the page.
3. Deploy. Done. `vercel.json` enables clean URLs (`/about`, not `/about.html`).

**Option B - Git + Vercel**
1. `git init && git add . && git commit -m "portfolio"`
2. Push to GitHub/GitLab.
3. Import the repo at https://vercel.com/new - it auto-detects a static site (no framework, no build command).

**Option C - Vercel CLI**
```
npm i -g vercel
vercel        # preview
vercel --prod # production
```

## After first deploy
1. Copy your real domain (e.g. `https://your-name.vercel.app`).
2. In `build.py` set `BASE_URL` to it (affects canonical, Open Graph, sitemap), or
   just find/replace `https://thuvarakan.vercel.app` across the `.html`, `sitemap.xml`, `robots.txt` files.

## Replace the placeholder content (important)
The structure is real; the content is sample. Update:
- **Contact** (`contact.html`): `hello@example.com`, the LinkedIn / GitHub / Resume `href="#"` links.
- **Work** (`work.html`): the three case studies + the metric numbers (`data-to="..."`).
- **Headline / copy**: across pages if the wording isn't yours.
- **og-image.png**: regenerate or replace with your own 1200x630 social image.

## Regenerating
All pages are generated from `build.py` so shared parts (CSS, nav, footer, icons,
motion) never drift. Edit `build.py`, then:
```
python3 build.py
```

## Notes
- No dependencies, no tracking, no analytics.
- Respects `prefers-reduced-motion`.
- Icons: Phosphor (MIT). Fonts: Newsreader, Instrument Sans, Spline Sans Mono (Google Fonts).
