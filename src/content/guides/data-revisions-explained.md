---
title: "Why does economic data get revised?"
seoTitle: "Why Economic Data Gets Revised: Payrolls, CPI and Benchmarks"
description: "Why first prints change: late survey responses, annual benchmarks and new seasonal factors. How payroll, CPI and HICP revisions work and how to read a preliminary figure."
question: "why are jobs numbers revised"
answer: "Economic data are revised because first estimates are built from incomplete samples and later replaced with fuller information. U.S. payrolls are revised twice in the following months and benchmarked once a year to tax records; seasonally adjusted CPI is revised each February."
type: question
datePublished: 2026-10-15
updated: 2026-10-15
data_asof: "2026-09 payrolls (preliminary)"
indicators: [nonfarm-payrolls, cpi]
related: [reading-the-jobs-report, household-vs-establishment-survey, reading-a-cpi-release]
sources:
  - { name: "BLS: CES benchmark article and revisions", url: "https://www.bls.gov/web/empsit/cesbmart.htm" }
  - { name: "BLS: CES net birth-death model", url: "https://www.bls.gov/web/empsit/cesbd.htm" }
  - { name: "BLS: Seasonal adjustment in the CPI", url: "https://www.bls.gov/cpi/seasonal-adjustment/" }
  - { name: "Eurostat: HICP methodology", url: "https://ec.europa.eu/eurostat/web/hicp/methodology" }
faq:
  - { q: "Are revisions a sign of manipulation?", a: "No. Revision schedules are published in advance and follow documented procedures. They reflect more complete data, not changes of opinion." }
  - { q: "Does CPI get revised?", a: "Unadjusted CPI is never revised after publication. Seasonally adjusted CPI is revised each February for the previous five years when seasonal factors are re-estimated." }
  - { q: "How big are payroll revisions?", a: "Monthly revisions to recent months often reach tens of thousands of jobs, and annual benchmark revisions to the level can be several hundred thousand. BLS publishes the history of both." }
---

## The trade-off behind every first print

Statistical agencies face a choice between speed and completeness. The U.S. jobs report arrives about a week after the reference month ends, long before every employer has reported. The alternative, waiting months for complete records, would make the data far less useful. Revisions are the price of timeliness, and the agencies publish their revision policies in advance.

## Payrolls: three monthly estimates plus a benchmark

The establishment survey publishes a first estimate of each month's payroll change, then a second and third estimate in the next two monthly reports as late responses arrive. Our [nonfarm payrolls page](/indicators/nonfarm-payrolls/) marks the latest two months as preliminary for this reason.

| Stage | When | What changes |
|---|---|---|
| First estimate | First Friday after the month | Based on early sample responses |
| Second estimate | Next month's report | More responses collected |
| Third estimate | Report after that | Near-final sample |
| Annual benchmark | With January data, each February | March level re-anchored to UI tax records; seasonal factors updated |

The **annual benchmark** compares the survey-based March employment level with near-universe counts from state unemployment-insurance tax filings (the Quarterly Census of Employment and Wages). The difference is spread back across the preceding months. BLS publishes a *preliminary* benchmark estimate each late summer, then the final benchmark with the January Employment Situation report in February.

A source of benchmark differences is the **birth-death model**, which estimates jobs at newly opened businesses that are not yet in the sample, net of jobs lost at closing businesses. At economic turning points this model can miss, which is one reason benchmark revisions tend to be larger then.

## CPI: only the seasonally adjusted series moves

The unadjusted Consumer Price Index is final when published. The seasonally adjusted series is revised every February: BLS re-estimates seasonal factors with another year of data and revises seasonally adjusted indexes for the previous five years. A monthly change you remember as 0.3% might later read 0.2% or 0.4%. The 12-month headline rate, calculated from unadjusted data, does not change.

## Euro-area HICP: flash then final

Eurostat publishes a **flash estimate** of euro-area inflation around the end of the reference month and the full HICP release a couple of weeks later. Differences between flash and final are usually zero or one tenth of a percentage point. Eurostat also occasionally implements methodological changes; at the start of 2026 the HICP moved to a new classification (ECOICOP version 2). Our [euro-area inflation page](/indicators/euro-area-inflation/) reads the current Eurostat dataset.

## How this site handles revisions

Each refresh downloads the full current history from the agency, so our tables always show the latest vintage, not the first print. That means a value you saw last month may differ today. We mark preliminary payroll and earnings figures with "(p)". We do not keep a vintage-by-vintage archive; for real-time data vintages, the Federal Reserve Bank of St. Louis's ALFRED database is the standard reference.

## Reading a preliminary number well

- Treat the first payroll estimate as a range, not a point. The 90% confidence interval for the monthly change is roughly ±130,000.
- Look at the revisions paragraph in the release as carefully as the headline.
- Prefer three-month averages to single months.
- Around the February benchmark, expect level shifts and read BLS's explanatory notes.
- For CPI, use the unadjusted 12-month change when you need a figure that will not change.

Revisions are a feature of honest measurement. The question to ask is whether a pattern of revisions changes the story, not whether a single month moved.
