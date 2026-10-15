---
title: "Are wages beating inflation? Real vs nominal wages"
seoTitle: "Real vs Nominal Wages: Are U.S. Wages Beating Inflation?"
description: "Nominal wages are dollars paid; real wages adjust for inflation. How to compute real wage growth from BLS earnings and CPI data, with a worked example."
question: "are wages keeping up with inflation"
answer: "Wages beat inflation when nominal wage growth exceeds the inflation rate over the same period. Real wage growth is (1 + wage growth) ÷ (1 + inflation) − 1. Using BLS average hourly earnings and CPI for the same 12 months gives a simple answer; BLS also publishes an official Real Earnings release."
type: question
datePublished: 2026-10-15
updated: 2026-10-15
data_asof: "2026-09 AHE and CPI"
indicators: [average-hourly-earnings, cpi]
related: [reading-the-jobs-report, core-vs-headline-inflation, how-cpi-is-calculated]
sources:
  - { name: "BLS: Real Earnings news release", url: "https://www.bls.gov/news.release/realer.nr0.htm" }
  - { name: "BLS series CES0500000003 (average hourly earnings, total private)", url: "https://data.bls.gov/timeseries/CES0500000003" }
  - { name: "BLS: Employment Cost Index", url: "https://www.bls.gov/eci/" }
  - { name: "BLS: CPI", url: "https://www.bls.gov/cpi/" }
faq:
  - { q: "Why not just subtract inflation from wage growth?", a: "Subtraction is a close approximation when rates are small. The exact formula divides: (1 + wage growth) / (1 + inflation) − 1. At 4% wages and 3% inflation the difference is about 0.03 point." }
  - { q: "Which inflation measure should I use?", a: "BLS's Real Earnings release deflates by CPI-U for all employees and CPI-W for production and nonsupervisory workers. Using CPI-U for all private employees is a reasonable default." }
  - { q: "Is average hourly earnings the best wage measure?", a: "It is the most timely. The Employment Cost Index and the Atlanta Fed wage growth tracker control better for changes in the mix of jobs but are less frequent or less direct." }
---

## Nominal vs real

A **nominal** wage is the dollar amount on a pay slip. A **real** wage is that amount measured in constant prices: what it can buy. If your pay rises 4% while prices rise 3%, your purchasing power rose by about 1%.

## The formula

Real wage growth over a period = (1 + nominal wage growth) ÷ (1 + inflation) − 1.

Worked example with round numbers:

| Item | Value |
|---|---|
| Average hourly earnings, 12 months ago | $36.50 |
| Average hourly earnings, now | $37.81 |
| Nominal 12-month growth | 3.59% |
| CPI-U 12-month inflation | 3.70% |
| Real wage growth | (1.0359 ÷ 1.0370) − 1 = −0.11% |

In this example nominal pay rose, but slightly less than prices, so real hourly earnings fell. Our [average hourly earnings page](/indicators/average-hourly-earnings/) runs this calculation with the latest BLS figures for the same month.

## The official version: BLS Real Earnings

The BLS publishes **Real Earnings** on the same morning as the CPI. It deflates average hourly and weekly earnings for all private employees using CPI-U, and for production and nonsupervisory employees using CPI-W. Because it uses the latest CPI and the latest (revised) earnings, it is the authoritative figure; ours is a transparent illustration from the same public series.

## Hourly vs weekly

Real *hourly* earnings show the purchasing power of an hour of work. Real *weekly* earnings also reflect changes in hours worked. If employers cut the average workweek, weekly earnings can fall in real terms even when hourly earnings keep pace.

## Measurement caveats

**Composition effects.** Average hourly earnings is an average across all private jobs. When low-wage jobs disappear, as in spring 2020, the average jumps without anyone receiving a raise. When low-wage hiring surges, the average can understate pay growth for individual workers.

**Coverage.** The series covers private nonfarm payroll employees only. It excludes government employees, the self-employed and benefits such as health insurance.

**Alternatives.**

- The **Employment Cost Index** (quarterly) holds the job mix fixed and includes benefits; it is often preferred for measuring underlying labour-cost pressure.
- The **Atlanta Fed Wage Growth Tracker** follows the same individuals over 12 months, which removes composition effects, using household survey microdata.

**Choice of deflator.** CPI-U is the standard. The PCE price index usually shows slightly lower inflation, which would make real wage growth look slightly higher.

## Short-run vs long-run

Real wage growth tends to turn negative when inflation rises quickly, because pay is renegotiated slowly. When inflation falls, real wages can recover even with stable nominal growth. Looking at a single month can mislead; compare several months of 12-month rates.

## How to check it yourself

1. Open the BLS series CES0500000003 and note the latest value and the value 12 months earlier.
2. Open CPI-U (CUUR0000SA0) for the same two months.
3. Compute both 12-month growth rates and apply the formula.
4. Compare your result with the BLS Real Earnings release for that month.

The [jobs report guide](/guides/reading-the-jobs-report/) explains where average hourly earnings appear in the Employment Situation release, and the [CPI guide](/guides/how-cpi-is-calculated/) explains the deflator.
