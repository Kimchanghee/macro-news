---
title: "Why do the household and establishment surveys disagree?"
seoTitle: "Household vs Establishment Survey: Why Jobs Data Disagree"
description: "The jobs report holds two surveys: households (unemployment rate) and employers (payrolls). How each works, why job counts diverge and which to trust."
question: "household survey vs establishment survey"
answer: "The unemployment rate comes from the household survey of about 60,000 homes, while payroll job gains come from the establishment survey of employers. They count different things: people with jobs versus jobs on payrolls, so self-employment, multiple jobholders and sampling error make them diverge."
type: comparison
datePublished: 2026-10-15
updated: 2026-10-15
data_asof: "2026-09 Employment Situation"
indicators: [unemployment-rate, nonfarm-payrolls]
related: [reading-the-jobs-report, data-revisions-explained, real-vs-nominal-wages]
sources:
  - { name: "BLS: Comparing employment from the BLS household and payroll surveys", url: "https://www.bls.gov/web/empsit/ces_cps_trends.htm" }
  - { name: "BLS Handbook of Methods: Current Population Survey", url: "https://www.bls.gov/opub/hom/cps/" }
  - { name: "BLS Handbook of Methods: Current Employment Statistics", url: "https://www.bls.gov/opub/hom/ces/" }
  - { name: "BLS: Employment Situation technical note", url: "https://www.bls.gov/news.release/empsit.tn.htm" }
faq:
  - { q: "Which survey is more accurate for job growth?", a: "For month-to-month job growth, the establishment survey has a much larger sample and smaller sampling error. For who is unemployed, and for demographic detail, only the household survey can answer." }
  - { q: "Can the two surveys move in opposite directions?", a: "Yes. In a given month household employment can fall while payrolls rise, because of sampling error, different concepts and population-control adjustments." }
  - { q: "Are gig workers counted?", a: "Self-employed and independent contractors are counted as employed in the household survey but are not on payrolls, so they are absent from the establishment survey." }
---

## Two surveys, one release

The monthly Employment Situation report from the Bureau of Labor Statistics combines two independent surveys:

| | Household survey (CPS) | Establishment survey (CES) |
|---|---|---|
| Who is asked | About 60,000 eligible households | Over 100,000 businesses and government agencies |
| Run by | Census Bureau for BLS | BLS with state agencies |
| Counts | People: employed, unemployed, not in labour force | Jobs on nonfarm payrolls, hours, earnings |
| Headline output | [Unemployment rate](/indicators/unemployment-rate/) | [Nonfarm payrolls](/indicators/nonfarm-payrolls/), [average hourly earnings](/indicators/average-hourly-earnings/) |
| Reference period | Week including the 12th | Pay period including the 12th |
| Includes self-employed | Yes | No |
| Counts multiple jobholders | Once (as a person) | Each job separately |
| Includes farm workers | Yes | No (nonfarm) |

## Why the job counts differ

**Concepts.** A person with two part-time jobs is one employed person in the household survey but two jobs in the establishment survey. A freelance designer is employed in the household survey but invisible on payrolls. Unpaid family workers, private household workers and agricultural workers are counted only by households.

**Sample size and error.** The establishment survey samples a very large share of total employment, so its estimate of the monthly change is far more precise. BLS's technical note puts the 90% confidence interval for the monthly payroll change at roughly ±130,000 jobs, while the household survey's monthly employment change has a much wider interval of several hundred thousand. A household-survey employment drop of 200,000 in one month can be statistical noise.

**Population controls.** Each January the household survey adopts new population estimates from the Census Bureau. That can shift levels by hundreds of thousands overnight; BLS publishes the effect but does not revise earlier months, so January-to-December comparisons need care.

**Benchmarking.** The establishment survey is benchmarked annually to near-complete unemployment-insurance tax records. That can revise the payroll level, sometimes substantially (see [data revisions](/guides/data-revisions-explained/)).

## What each survey is good for

Use the **establishment survey** to judge how fast employers are adding jobs, which industries are hiring, how long the average workweek is and how fast hourly pay is growing.

Use the **household survey** for the unemployment rate, labour-force participation, the employment-population ratio, part-time work for economic reasons and demographic breakdowns by age, sex, race and education. Payroll records cannot tell you whether someone is looking for work.

## Reading divergence sensibly

When the two surveys disagree for a single month, the payroll number usually deserves more weight for the direction of job growth because of its sample size. When they disagree persistently over many months, it is worth investigating the reasons: a shift toward self-employment, changes in immigration that population controls have not yet captured, or a coming benchmark revision.

BLS publishes an "adjusted" household employment series that puts the household data on a concept closer to payrolls (removing agricultural and self-employed workers, adding multiple jobholders). Comparing that series with payrolls is a fairer test than comparing raw totals.

## Unemployment rate precision

Because the household survey is a sample, the unemployment rate has sampling error too. BLS states that a change of about 0.2 percentage point in the monthly unemployment rate is needed for statistical significance. A move from 4.1% to 4.2% is therefore within normal noise unless it persists. Our unemployment page shows the three-month average to smooth this.

## Bottom line

The two surveys are not competing estimates of the same number; they measure related but different concepts. Read payrolls for the pace of hiring and the household survey for the condition of workers. For a step-by-step reading of the whole release, see [how to read the jobs report](/guides/reading-the-jobs-report/).
