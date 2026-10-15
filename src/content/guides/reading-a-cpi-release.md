---
title: "How do you read a CPI release?"
seoTitle: "How to Read a CPI Release: A Table-by-Table Walkthrough"
description: "A table-by-table walkthrough of the monthly BLS CPI release: where headline, core, monthly change, shelter and energy figures sit and what each one tells you."
question: "how to read cpi report"
answer: "Read a CPI release in four passes: the 12-month all-items change (not seasonally adjusted), the one-month seasonally adjusted change, the same two numbers for core CPI, and then Table A’s component lines (shelter, energy, food, goods, services) to see what drove the month."
type: question
datePublished: 2026-10-15
updated: 2026-10-15
data_asof: "2026-09 CPI"
indicators: [cpi, core-cpi]
related: [how-cpi-is-calculated, core-vs-headline-inflation, data-revisions-explained]
sources:
  - { name: "BLS: Consumer Price Index news release (latest)", url: "https://www.bls.gov/news.release/cpi.nr0.htm" }
  - { name: "BLS: CPI release schedule", url: "https://www.bls.gov/schedule/news_release/cpi.htm" }
  - { name: "BLS: CPI detailed report and tables", url: "https://www.bls.gov/cpi/tables/" }
  - { name: "BLS: Seasonal adjustment in the CPI", url: "https://www.bls.gov/cpi/seasonal-adjustment/" }
faq:
  - { q: "What time is CPI released?", a: "The BLS publishes the CPI news release at 8:30 a.m. Eastern time on the scheduled date, usually in the middle of the month following the reference month." }
  - { q: "Why do monthly and annual CPI numbers use different series?", a: "BLS reports the 12-month change from the unadjusted index and the 1-month change from the seasonally adjusted index, because seasonal effects matter month to month but cancel over a full year." }
  - { q: "Can CPI be revised?", a: "Unadjusted CPI data are not revised after publication. Seasonally adjusted data are revised each February for the previous five years when new seasonal factors are calculated." }
---

## Before the release: know the schedule

The BLS publishes the Consumer Price Index at 8:30 a.m. Eastern time, typically around the middle of the month after the reference month. September data arrive in October, for example. The dates are fixed a year in advance on the [BLS CPI schedule](https://www.bls.gov/schedule/news_release/cpi.htm), and our [release calendar](/calendar/) lists the next one. The figures are embargoed until release; no official number exists before 8:30 a.m.

## Pass 1: the headline paragraph

The first paragraph of the news release states two numbers for the all-items CPI-U:

- the **one-month change, seasonally adjusted**, for example "increased 0.6 percent on a seasonally adjusted basis";
- the **12-month change, not seasonally adjusted**, for example "the all items index increased 3.7 percent before seasonal adjustment."

These are the two figures most headlines quote. They come from different series on purpose: the monthly number needs seasonal adjustment; the annual number does not, because a full year contains every season once.

## Pass 2: core CPI

The release then gives the same two statistics for "all items less food and energy". The monthly core change is the cleanest single read on underlying momentum in a given month; the 12-month core rate shows the trend over a year. See [core vs headline inflation](/guides/core-vs-headline-inflation/) for why both exist.

## Pass 3: Table A — what drove the month

Table A of the release lists seasonally adjusted monthly changes for the main components over the past six months, plus the unadjusted 12-month change. The lines worth scanning, in order of weight:

| Component | Why it matters |
|---|---|
| Shelter (rent, owners’ equivalent rent) | Largest single component, roughly a third of the index; slow-moving |
| Energy (gasoline, electricity, natural gas) | Most volatile; often explains headline vs core gaps |
| Food at home / away from home | Large weight; food away from home tracks wages in restaurants |
| Commodities less food and energy | Goods such as cars, apparel, household furnishings |
| Services less energy services | Includes shelter, medical care, transportation services |

A month in which headline jumps but core is calm is usually an energy story. A month in which core is strong and shelter is calm points to other services or goods.

## Pass 4: check the six-month row and annualise

Table A shows six months of monthly changes side by side. Adding them up mentally gives a sense of trend. To compare with a 12-month rate, annualise: a 0.3% monthly change compounds to about 3.7% a year ((1.003)^12 − 1). Our [CPI indicator page](/indicators/cpi/) computes three- and six-month annualised rates from the seasonally adjusted index so you do not have to.

## Common misreadings to avoid

- **Mixing NSA and SA.** Do not compute a monthly change from the unadjusted index and compare it with the seasonally adjusted headline monthly figure.
- **Treating the index level as a rate.** An index of 336.9 is not 336.9% of anything meaningful by itself; only percent changes are.
- **Comparing with PCE without adjustment.** The Fed's target uses the PCE price index from the Bureau of Economic Analysis, which has different weights and coverage. CPI usually runs somewhat higher.
- **Over-reading one month.** Single-month changes are noisy; the BLS notes standard errors for its estimates.
- **Assuming revisions.** Unadjusted CPI is final when published. Only seasonally adjusted figures change, once a year in February.

## Where else to look

The BLS also publishes Real Earnings at the same time as CPI, which deflates average hourly earnings by the CPI. Our [average hourly earnings page](/indicators/average-hourly-earnings/) shows a simple real-wage calculation; the guide on [real vs nominal wages](/guides/real-vs-nominal-wages/) explains the method.

## A ten-minute routine

1. Note the release time and reference month.
2. Write down the four numbers: headline monthly SA, headline 12-month NSA, core monthly SA, core 12-month NSA.
3. Compare each with the prior month on our indicator pages.
4. Scan Table A for shelter, energy, food and core goods.
5. Annualise the latest three months of core for momentum.
6. Check the release for any methodology notes or data-collection caveats in the technical note.
