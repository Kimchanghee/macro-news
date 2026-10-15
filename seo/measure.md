# Measurement plan — re-measure at +14 days after deployment

Baseline date = first production deploy (parent records it). Do not compare against the 402 period (no data).

## Google Search Console (property: https://macrofinancenews.online/)
1. Sitemaps: `sitemap-index.xml` submitted, "Success", discovered URLs ≈ 29 (grows with guides).
2. Pages report: indexed vs "Crawled – currently not indexed" / "Discovered – not indexed"; list any guide or indicator not indexed by +14 d.
3. Performance (last 14 d, by page): impressions, clicks, avg position for `/indicators/*`, `/calendar/`, `/guides/*`.
4. Queries containing question forms ("what is", "how", "when is", "latest") → map back to `content/backlog.md`.
5. Enhancements: Breadcrumbs, FAQ (informational only), Dataset — zero errors.
6. Core Web Vitals (field data may be insufficient at 14 d — record "not enough data" rather than guessing).

## GA4 (only after `PUBLIC_GA4_ID` is set)
- Sessions by landing page; engaged sessions rate; events `tool_used` (none expected on this site except calendar filters if added) and `outbound_click` to official agency sources.
- Consent: share of EEA/UK/CH traffic with denied analytics (modelled data only).

## AI / answer engines
- Spot-check (manual, logged): ask 5 backlog questions in Google AI Overviews / Bing Copilot / Perplexity and record whether macrofinancenews.online is cited. Record date and exact prompt; absence is a valid result.
- Server logs not available on assets-only Worker; use Cloudflare Web Analytics bot share if the parent enables it.

## Freshness
- Check that the deployed `/llms.txt` and indicator pages show a retrieval date within 1 day of the last scheduled `refresh-build.ps1` run; a stale date means the schedule failed (pages keep the last good snapshot by design).

## Decision rules at +14 d
- Pages indexed but 0 impressions → strengthen question match in H1/answer for that page.
- Not indexed → check internal links ≥2 (gate enforces) and request indexing for top 5 only.
- Next guides: pick the top 3 open items in `content/backlog.md` that match observed queries.
