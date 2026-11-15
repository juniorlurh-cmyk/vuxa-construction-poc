# Vuxa Project & Construction — Website POC

Multi-page website for **Vuxa Project & Construction**, a Sunnyside,
Pretoria-based contractor. Built with React + Vite, deployed to GitHub Pages.

## Structure

```
web/                      Vite + React app
  src/
    data/site.js          Verified public facts (address, phones, email, rating)
    data/services.js      5 service lines + process + service areas
    data/market.js        Indicative demand analytics for /insights
    ai/                   Groq provider + chart-spec eval gate
    components/           Layout, ChatWidget, VizBoard, shared page parts
    pages/                Home, Services, Work, About, Insights, Contact, 404
.github/workflows/        Pages deploy workflow
"*.html"/"*.md"           Original single-page v1 prototype (reference)
```

## Content verification register

**Verified from public listings (Google Maps, Cylex, 2pos):**
- Name: Vuxa project and construction
- Address: 99 Bourke St (308 Eden South), Sunnyside, Pretoria 0002
- Phones: 068 097 7407 (Google) · 076 293 6840 (Cylex)
- Email: muvhalidan@gmail.com
- Rating: 4.6 / 5 from 8 Google reviews; review texts quoted verbatim
- Hours: Mon–Fri 08:00–17:00
- Reviewer-praised speciality: traffic counts → featured as a service line

**Inferred (labelled as such, confirm with owner):**
- The five service lines (from listing categories + reviews)
- Service-area list (base + typical Pretoria spread)
- Insights demand scores (indicative only)

**Representative/placeholder:** service and area imagery (Unsplash + licensed
Commons area shots), the traffic-data-collection gallery, and the FAQ content
on `/work` — all clearly labelled as representative until the owner's own
site photography is available.

**Known unverified claims from the v1 prototype — NOT used:**
- "50+ projects", "8+ years", "R15M+ delivered", "since 2016"
- "CIDB Registered / NHBRC / B-BBEE Level 1 / CSD" (a `note` tells owners
  the certs pack is provided with quotes instead)
- Named testimonials (Thabo Molefe, Nomsa Sithole…) — replaced with real
  Google review excerpts
- info@vuxaconstruction.co.za + "(Pty) Ltd" — invented

## Local development

```bash
cd web
npm ci
cp .env.example .env.local   # add a Groq key for AI features
npm run dev
npm run build                # also emits dist/404.html (SPA fallback)
npm run lint
node serve.mjs               # static preview
```

## Deployment

GitHub Actions builds `web/` on every push to `main` and deploys `web/dist`
to GitHub Pages. `VITE_BASE` and the router basename are derived from the
repo name automatically. `VITE_AI_API_KEY` comes from the Actions secret.
