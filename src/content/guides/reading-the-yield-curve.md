---
title: "How do you read the Treasury yield curve?"
seoTitle: "How to Read the Treasury Yield Curve: Spreads and Inversions"
description: "What the U.S. Treasury par yield curve shows, how to compute the 10-year minus 2-year and 10-year minus 3-month spreads, what an inversion means and its limits."
question: "how to read the treasury yield curve"
answer: "The Treasury yield curve plots yields on U.S. government debt from one month to 30 years. Normally longer maturities yield more. Analysts watch the 10-year minus 2-year and 10-year minus 3-month spreads; when they turn negative the curve is inverted, which has preceded past U.S. recessions with long, variable lags."
type: question
datePublished: 2026-10-16
updated: 2026-10-16
data_asof: "Treasury par yields for 2026-10-14"
indicators: [treasury-yield-curve]
related: [how-fomc-decisions-work, data-revisions-explained, real-vs-nominal-wages]
sources:
  - { name: "U.S. Treasury: Daily Treasury Par Yield Curve Rates", url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve" }
  - { name: "U.S. Treasury: Interest rate statistics methodology", url: "https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics/treasury-yield-curve-methodology" }
  - { name: "New York Fed: The yield curve as a leading indicator", url: "https://www.newyorkfed.org/research/capital_markets/ycfaq" }
faq:
  - { q: "What is a par yield?", a: "The coupon rate at which a Treasury security of that maturity would price at par (100). Treasury derives the curve each business day from indicative bid prices of the most recently auctioned securities." }
  - { q: "Does an inverted curve mean a recession is certain?", a: "No. Inversions have preceded U.S. recessions since the late 1960s, but the lag has varied widely and the signal can be distorted by term premiums and central-bank asset purchases." }
  - { q: "Which spread is better, 10y-2y or 10y-3m?", a: "Both are widely used. The New York Fed's recession-probability model uses 10-year minus 3-month; market commentary often quotes 10-year minus 2-year." }
---

## What the curve is

Every business day the U.S. Treasury publishes **par yield curve rates** for thirteen maturities, from 1 month to 30 years. Plot them left to right and you get the yield curve: the price of borrowing for the U.S. government over different horizons.

The short end is anchored by Federal Reserve policy, because bills are close substitutes for overnight money. The long end reflects expected future short rates plus a **term premium** that investors demand for locking money up longer.

## The latest curve

On our committed snapshot, Treasury's par yields for **14 October 2026** were:

| Maturity | Yield |
|---|---|
| 3-month | 4.28% |
| 2-year | 4.82% |
| 10-year | 5.19% |
| 30-year | 5.52% |

From those figures:

- **10-year minus 2-year** = 5.19 − 4.82 = **+0.37 percentage point** (37 basis points)
- **10-year minus 3-month** = 5.19 − 4.28 = **+0.91 point** (91 basis points)

Both spreads were positive, so the curve was upward sloping across these points. A year earlier, at the end of September 2025, the 2-year was 3.60% and the 10-year 4.16%, a 10y–2y spread of +0.56 point. The full curve and its history are on the [yield curve page](/indicators/treasury-yield-curve/), refreshed from Treasury with the date shown.

## Shapes and what they suggest

| Shape | What it looks like | Common reading |
|---|---|---|
| Normal (upward) | Long yields above short yields | Investors expect steady growth and demand a term premium |
| Flat | Little difference across maturities | Transition; markets unsure about the path of policy |
| Inverted | Short yields above long yields | Markets expect policy rates to fall, often because growth is expected to slow |
| Humped | Middle maturities highest | Expected hikes in the near term followed by cuts |

## Why inversions get attention

When short rates exceed long rates, investors are effectively betting that the Fed will have to cut in the future. The New York Fed notes that the 10-year minus 3-month spread has turned negative before each U.S. recession since the late 1960s, and it publishes a model that converts the spread into a probability of recession twelve months ahead.

The 10y–2y spread inverted in July 2022 and stayed negative for about two years, one of the longest inversions on record, and the anticipated recession did not arrive on the usual timetable. That episode is a reminder of the signal's limits.

## Limits of the signal

1. **Lags are long and variable.** Historically, recessions have started anywhere from several months to about two years after inversion.
2. **Term premiums move.** If investors demand less compensation for duration (for example during large central-bank bond purchases), long yields fall and the curve can flatten or invert without any change in growth expectations.
3. **It is one indicator.** Labour-market data such as [payrolls](/indicators/nonfarm-payrolls/) and the [unemployment rate](/indicators/unemployment-rate/) tell you whether the slowdown the curve anticipates is actually happening.
4. **Re-steepening is not all-clear.** In past cycles the curve often steepened again shortly before or during a downturn, as the Fed cut short rates.

## Reading it day to day

- Watch **level and slope separately**. A curve can steepen because long yields rise (a "bear steepener") or because short yields fall (a "bull steepener"); they mean different things for borrowers.
- Check the **2-year after Fed meetings and data releases**. It moves most with expected policy, so it reacts to [FOMC decisions](/guides/how-fomc-decisions-work/) and CPI surprises.
- Remember that **mortgage and corporate rates** key off the intermediate and long end, not the federal funds rate.

## Methodology note

Treasury's par yields are model-based: since December 2021 Treasury uses a monotone convex spline fitted to indicative bid-side prices of on-the-run securities. They are not transaction yields and can differ slightly from figures quoted by trading platforms. We republish Treasury's numbers unchanged and show the date of the latest row; see our [methodology](/methodology/) for refresh rules.
