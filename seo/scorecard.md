# SEO / AEO / GEO / LLMO scorecard — macrofinancenews.online (Macro Release Desk)

Method: fire-your-seo-agency v1.2.1 Phase 0 crawler-eye checks (curl, no JS). Full AFTER curl log: `qa/crawl.txt` (local, not committed).

## BEFORE — live domain, 2026-10-16 01:32 KST

```
$ curl -sI https://macrofinancenews.online/
HTTP/1.1 402 Payment Required
Content-Type: text/plain; charset=utf-8
Server: Vercel
```

| Lane | Status | Evidence |
|---|---|---|
| SEO | ❌ | Every URL returns HTTP 402 (Vercel payment required); no HTML, no sitemap, no robots |
| AEO | ❌ | No content served |
| GEO | ❌ | No llms.txt, no entity page |
| LLMO | ❌ | Nothing citable |
| Measurement | ❌ | No GA4/GSC wiring in served output |
| Content ops | ❌ | Old repo was an AI-news auto-publisher (removed); no question mapping, no live posts |

## AFTER — local `astro preview` (http://localhost:4321), 2026-10-16 01:32 KST

```
GET /                         200   <h1> count 1, <meta name="robots" content="index, follow, max-image-preview:large">, X-Robots-Tag: none
GET /calendar/                200   title 57, desc 152, Dataset LD
GET /indicators/cpi/          200   title 56, desc 154, Dataset + Article + BreadcrumbList LD
GET /indicators/treasury-yield-curve/ 200
GET /guides/hicp-vs-cpi/      200   title 52, desc 150, Article + FAQPage LD (FAQ visible on page)
GET /sitemap-index.xml        200   -> sitemap-0.xml with 29 URLs, newest lastmod 2026-10-16
GET /robots.txt               200   "User-agent: * / Allow: /" + Sitemap line (AI crawlers not blocked)
GET /llms.txt                 200   entity statement + latest prints with period/source/retrieval date
GET /ads.txt                  200   google.com, pub-4490818204529253, DIRECT, f08c47fec0942fa0
GET /feed.xml                 200   RSS for guides
GET /7c1e4a9d2b8f4e63a05d91c2e8b47f10.txt 200 (IndexNow key)
GET /no-such-page/            404
```

| Lane | Status | Evidence |
|---|---|---|
| SEO | ✅ | All content in server HTML; titles 50–60 and descriptions 150–160 enforced by `pnpm gate` on all 30 pages; absolute canonicals; per-page 1200×630 OG PNG; sitemap lastmod = data/content dates; real 404 |
| AEO | ✅ | Question-shaped H1 on every indicator and guide; ~40-word direct answer first; FAQPage LD only on the 11 guides with visible FAQ; LD generated from frontmatter/data and checked by gate |
| GEO | ✅ | llms.txt + llms-full.txt, About/Organization entity text identical, methodology page, citable sentences with number + period + agency + link |
| LLMO | ✅ | Dataset LD (creator agency, isBasedOn, temporalCoverage, license) on data pages; stable URLs `/indicators/<slug>/`, `/guides/<slug>/` |
| Measurement | ⚠️ | GA4 gtag + Consent Mode v2 render only when `PUBLIC_GA4_ID` is set; GSC verification via `PUBLIC_GSC_VERIFICATION` — both are owner/parent actions. Plan in `seo/measure.md` |
| Content ops | ⚠️ | 11 sourced guides mapped to questions, RSS, backlog in `content/backlog.md`, publish gate; indicator pages refresh with data. Cadence depends on owner scheduling `scripts/refresh-build.ps1` |

Not claimed: deployment, indexing, rankings, AdSense approval or revenue.
