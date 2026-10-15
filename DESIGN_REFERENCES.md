# Design references — Macro Release Desk (macrofinancenews.online)

## Metaphor
A central-bank **briefing book / release board**: a bound paper dossier with roman-numeral binder tabs (I Release board, II Indicators, III Calendar, IV Guides, V Method), a double-ruled masthead like a document header, a week-grid "release board" with the current day marked in oxblood, and "desk notes" lettered a), b), c) like a staff memo. Numbers are set in tabular mono in ruled tables, not in metric cards.

## Tokens (src/styles/global.css)
- Paper `#f4f0e6`, sheet `#fbf9f3`, ink `#17191f` / `#44474f` / `#5d6069`, rules `#b9b09a` / `#d8d0bd`.
- Binder-tab navy `#22324d`; one accent, oxblood `#8b1d1d`, reserved for release markers, "today", the 2% reference line and the latest point on charts.
- Focus ring `#1a5fb4` 3 px, offset 2 px (visible on paper and navy).
- Type: serif text stack (Charter / Sitka / Cambria / Georgia) for prose and headings; system sans for labels and metadata; Cascadia Mono / Consolas for times, series IDs and figures. No webfonts downloaded (zero layout shift, no third-party font requests).
- Scale: 0.8125 / 1.0625 / 1.25 / 1.5625 / 2.125 rem; measure 68ch; gutter clamp(1rem, 3vw, 2.5rem).
- Structure from rules (1 px, 2 px heavy section rules, 3 px double masthead rule) and density, not shadows, gradients, rounded cards or pills.

## Components
- Release board: Mon–Fri grid, 5 columns at desktop, stacked day rows at 390 px; empty days say "No tracked release" (empty state).
- Latest prints ledger: indicator / latest / period / comparison / next release; collapses to labelled rows on mobile.
- Indicator brief: question H1, direct-answer lede with oxblood rule, boxed "latest print" slip, lettered findings, build-time SVG chart (reserved aspect-ratio box), observations table, definition + publication schedule, sources with retrieval time.
- Stale/unavailable states: every figure carries reference period + retrieval date; a failed refresh keeps the last good snapshot and shows its real date; missing months render "—" (e.g. BLS did not publish October 2025 CPI).

## Distinctness vs sibling sites
Contrasts deliberately with forexcommoditynews.online (dark slate "exchange chalkboard / almanac", chalk-white mono quotes) and with stockmarketnews / etfnewsdaily (owned by other agents). No shared shell or CSS.

## OSS principles used
- GOV.UK Design System — content-first pages, plain-language headings, visible focus. https://design-system.service.gov.uk/ (MIT; principles only, no code copied)
- USWDS data-visualization guidance — label axes and sources directly on charts. https://designsystem.digital.gov/components/data-visualizations/ (public domain; principles only)
