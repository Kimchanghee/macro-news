---
title: "HICP vs CPI: how euro area and U.S. inflation differ"
seoTitle: "HICP vs CPI: How Euro Area and U.S. Inflation Differ"
description: "Euro area HICP and U.S. CPI both track consumer prices but differ on housing, coverage and weights. What each includes and why rates differ by design."
question: "what is the difference between HICP and CPI"
answer: "HICP is the euro area's harmonised consumer price index compiled by Eurostat; CPI is the U.S. index compiled by BLS. The biggest difference is housing: U.S. CPI includes owners' equivalent rent, while HICP leaves out owner-occupied housing costs, so the two rates are not directly comparable."
type: comparison
datePublished: 2026-10-16
updated: 2026-10-16
data_asof: "2026-09 HICP (Eurostat) and CPI (BLS)"
indicators: [euro-area-inflation, cpi]
related: [how-cpi-is-calculated, core-vs-headline-inflation, ecb-key-rates-explained]
sources:
  - { name: "Eurostat: HICP methodology", url: "https://ec.europa.eu/eurostat/web/hicp/methodology" }
  - { name: "Eurostat: prc_hicp_minr dataset", url: "https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_minr/default/table?lang=en" }
  - { name: "BLS Handbook of Methods: Consumer Price Index", url: "https://www.bls.gov/opub/hom/cpi/" }
  - { name: "BLS: CPI relative importance", url: "https://www.bls.gov/cpi/tables/relative-importance/" }
  - { name: "ECB: Monetary policy strategy statement", url: "https://www.ecb.europa.eu/home/search/review/html/ecb.strategyreview_monpol_strategy_statement.en.html" }
faq:
  - { q: "Which index does the ECB target?", a: "The ECB's 2% medium-term target is defined on the euro area HICP. The Federal Reserve's 2% target is defined on the PCE price index, not CPI." }
  - { q: "Does HICP include rent?", a: "Yes. Actual rents paid by tenants are in HICP. What it leaves out is the cost of owner-occupied housing, which U.S. CPI captures through owners' equivalent rent." }
  - { q: "Can I compare euro area and U.S. inflation directly?", a: "Only roughly. Differences in housing treatment, population coverage and weights mean a gap of a few tenths of a point can be methodological rather than economic." }
---

## Two indexes, one question

Both indexes answer the same question, how much the prices households pay have changed, but they were built for different jobs. U.S. **CPI** is compiled by the Bureau of Labor Statistics (BLS) for the United States. The **HICP** (Harmonised Index of Consumer Prices) is compiled by national statistics offices under common EU rules and aggregated by Eurostat, so that inflation in Germany, Spain and Slovakia is measured the same way.

That harmonisation goal shapes almost every design choice. HICP is meant to be comparable across countries; CPI is meant to describe the cost of living for urban U.S. consumers as well as one index can.

## Difference 1: owner-occupied housing

This is the gap that matters most.

- **U.S. CPI** treats housing as a service. Homeowners are assigned an *owners' equivalent rent* (OER): the rent their home would fetch. OER is one of the largest single items in CPI; BLS's relative importance tables put it at roughly a quarter of the all-items index.
- **HICP** includes actual rents paid by tenants but **excludes owner-occupied housing costs**. Eurostat publishes an experimental owner-occupied housing price index separately, but it is not in the headline HICP.

Because shelter inflation in the U.S. moves slowly and persistently, the housing difference can keep U.S. CPI higher or lower than an HICP-style measure for long stretches.

## Difference 2: whose spending is covered

| | U.S. CPI-U | Euro area HICP |
|---|---|---|
| Compiler | BLS | National statistics offices, aggregated by Eurostat |
| Population | Urban consumers (BLS says about 93% of the U.S. population) | All private households, urban and rural |
| Concept | Spending by resident urban households | Spending on the economic territory, including by non-residents such as tourists |
| Owner housing | Included (owners' equivalent rent) | Excluded |
| Weights | Updated annually from the Consumer Expenditure Surveys | Updated annually from national accounts data |
| Policy use | Benchmark for many indexation clauses; the Fed targets PCE | ECB 2% medium-term target |

The "domestic concept" in HICP means a hotel night bought by a visitor in Lisbon counts in Portugal's basket. In CPI, spending is defined by who the consumer is, not where they spend.

## Difference 3: release timing

Eurostat publishes a **flash estimate** of euro area HICP at the end of the reference month or on the first working days of the next, then the full release around mid-month. BLS publishes CPI once, usually in the second week of the following month. That means the euro area figure is often known before the U.S. figure for the same month. Our [release calendar](/calendar/) lists the next scheduled dates.

## What the latest numbers say

On our committed snapshot, the euro area HICP annual rate was **3.8% in September 2026**, up from 3.2% in August (Eurostat, prc_hicp_minr). The euro area figure is shown on the [euro area inflation page](/indicators/euro-area-inflation/), and the U.S. figure on the [CPI page](/indicators/cpi/), each with its own source date.

Reading those side by side is fine as a first look. Treating a gap of a few tenths of a point as proof that one economy has "higher inflation" is not, because the housing treatment alone can account for that.

## How to compare more fairly

1. **Compare like with like on housing.** BLS publishes CPI "all items less shelter". Comparing that with HICP narrows the methodological gap, though it also removes tenant rent from the U.S. side.
2. **Compare core with core.** Eurostat's HICP excluding energy, food, alcohol and tobacco is the closest euro area analogue to U.S. core CPI, but the exclusion lists differ: U.S. core keeps alcohol and tobacco.
3. **Compare changes, not levels.** Index levels have different base years (U.S. 1982–84 = 100; HICP uses its own Eurostat reference year), so only percentage changes are meaningful.
4. **Check the period.** Both headline rates are 12-month changes in the not seasonally adjusted index. Monthly changes are usually quoted seasonally adjusted in the U.S. but often not in euro area press coverage.

## Why the ECB uses HICP and the Fed does not use CPI

The ECB defines price stability as 2% HICP inflation over the medium term. Its 2021 strategy review recommended working toward including owner-occupied housing costs in HICP over time, acknowledging the gap described above.

The Federal Reserve's 2% objective is defined on the **PCE price index** from the Bureau of Economic Analysis, which has broader coverage than CPI and gives shelter a smaller weight. That is one reason U.S. CPI headlines and the Fed's own inflation reading can differ.

## Bottom line

Use HICP when you want euro area inflation measured consistently across member states, and CPI when you want the U.S. consumer cost-of-living measure that many contracts reference. When comparing them, remember the owner-housing gap first, then coverage and weights. For how the U.S. index is built step by step, see [how CPI is calculated](/guides/how-cpi-is-calculated/).
