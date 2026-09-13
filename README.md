# NextStep — Digital Studio Faisalabad

Premium retro-editorial agency site. Static export for GitHub Pages custom domain **zportfolio.site** (repo `zaidportfolio.site`).

## Stack
Next.js 15 App Router · TypeScript · Tailwind 3 · shadcn/ui · Framer Motion · GSAP + ScrollTrigger · Lenis. No backend.

## Quickstart
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export → out/
```

## Deploy (GitHub Pages)
1. Push `main` — Action `.github/workflows/deploy.yml` builds & deploys `out/`.
2. Repo Settings → Pages → Custom domain: `zportfolio.site` (GoDaddy DNS: `A @ → 185.199.108.153/.109/.110/.111`, `CNAME www → <user>.github.io`).
3. Enforce HTTPS. `public/.nojekyll` + `out/.nojekyll` preserved automatically.

## SEO (5-pillar, under-the-hood)
- 1× `<h1>` per page, `<nav>`/`<main>`/`<section>` semantics, canonicals via `lib/seo.ts`.
- JSON-LD: WebSite+SearchAction, Organization/ProfessionalService (Faisalabad geo, dual phones, no sameAs), 2× Person, SiteNavigationElement, FAQPage, BreadcrumbList.
- `app/sitemap.ts`, `app/robots.ts` (allows GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot), `app/llms.txt/route.ts` + `public/llms.txt`.
- Conversational Q&A copy + entity sentences (NextStep + service + Faisalabad) inside existing containers.
- Titles 50–60 chars, descriptions 140–150 chars, `og:locale en_PK`, Twitter cards.

## Contacts
- Abdul Rahman (Marketing): +92 328 4738123
- Zaid Mughal (Developer/Designer): +92 339 4807064
- Email: info.zaid.officials@gmail.com
