---
title: "What is the difference between core and headline inflation?"
seoTitle: "Core vs Headline Inflation: What Is the Difference?"
description: "Headline inflation covers every item in the basket; core inflation strips out food and energy to show the trend. How each is built, when they diverge and which to watch."
question: "core vs headline inflation"
answer: "Headline inflation measures price changes for the whole consumer basket. Core inflation excludes food and energy, whose prices swing with weather and oil markets, so it is used to judge the underlying trend. In the U.S. CPI, core is the all-items index less food and energy."
type: comparison
datePublished: 2026-10-15
updated: 2026-10-15
data_asof: "2026-09 CPI; 2026-09 HICP"
indicators: [cpi, core-cpi, euro-area-inflation]
related: [how-cpi-is-calculated, reading-a-cpi-release, hicp-vs-cpi]
sources:
  - { name: "BLS: CPI news release and table 1 (food, energy, all items less food and energy)", url: "https://www.bls.gov/news.release/cpi.toc.htm" }
  - { name: "BLS series CUUR0000SA0L1E (all items less food and energy)", url: "https://data.bls.gov/timeseries/CUUR0000SA0L1E" }
  - { name: "Federal Reserve: Why does the Federal Reserve look at core inflation? (FAQ)", url: "https://www.federalreserve.gov/faqs/economy_14419.htm" }
  - { name: "Eurostat: HICP special aggregates", url: "https://ec.europa.eu/eurostat/web/hicp" }
faq:
  - { q: "Is core inflation a better measure than headline?", a: "Neither is better in general. Headline is what households pay; core is a tool for spotting the persistent trend, because food and energy shocks often reverse." }
  - { q: "Why exclude food and energy if people buy them every day?", a: "They are excluded only from the trend measure, not from people's budgets. Their prices react to harvests, weather, geopolitics and oil supply, which central banks cannot influence much in the short run." }
  - { q: "Does the euro area use the same core definition?", a: "The most common euro-area core measure excludes energy, food, alcohol and tobacco, so it removes slightly more than the U.S. CPI core measure." }
---

## The two definitions side by side

| | Headline CPI | Core CPI |
|---|---|---|
| BLS series (NSA) | `CUUR0000SA0` | `CUUR0000SA0L1E` |
| Items covered | Entire CPI-U basket | Basket excluding food and energy |
| Share of basket | 100% | Roughly four-fifths (relative importance changes yearly) |
| Main drivers | Shelter, energy, food, core goods, services | Shelter, core services, core goods |
| Typical use | What consumers actually pay | Underlying trend, policy analysis |

The core share is not fixed. BLS publishes the *relative importance* of each component every December; food and energy together usually make up roughly a fifth of the CPI-U, which leaves around four-fifths for core.

## Why central banks watch core

Food and energy prices respond to things a central bank cannot steer: crop yields, weather, refinery outages, OPEC+ production decisions. Those moves are often large and short-lived. If a central bank reacted to every oil-price swing, it would be tightening and easing policy constantly. The Federal Reserve's FAQ explains that core inflation is often a better guide to where overall inflation is heading, precisely because it filters out the most volatile prices.

That does not mean policymakers ignore headline inflation. The Fed's 2% goal is defined for headline PCE inflation, and a prolonged energy shock can feed into core prices through transport costs, airfares and wage demands.

## When the two diverge

The gap between headline and core tells you, roughly, how much food and energy are adding to or subtracting from inflation.

- **Headline above core:** energy and/or food prices are rising faster than everything else. This is typical during an oil-price spike.
- **Headline below core:** energy prices are falling. In 2015 and again in 2023, falling energy prices pulled U.S. headline CPI below core for long stretches.
- **Both rising together:** price pressure is broad, not limited to commodities.

On our [CPI page](/indicators/cpi/) and [core CPI page](/indicators/core-cpi/) you can compare the latest 12-month rates for the same month; the difference is a quick read on the food-and-energy contribution. It is only approximate, because the weights differ.

## Core is not "inflation without volatility"

Core CPI still moves around. Used cars, airline fares and lodging away from home are all in core and can swing sharply. Shelter, the largest core component, moves slowly because rents are reset only when leases renew, so core inflation can lag turning points in market rents by a year or more.

Because of this, analysts also look at alternative trend measures: trimmed-mean and median CPI (published by the Federal Reserve Banks of Cleveland and Dallas for different indexes), "supercore" services excluding housing, and shorter-horizon annualised rates. These are complements, not replacements.

## Reading momentum: monthly and annualised core

The 12-month core rate changes slowly because it averages a full year of monthly moves. To see whether the trend is speeding up or slowing down, look at the seasonally adjusted monthly change in core (series `CUSR0000SA0L1E`) and its three- or six-month annualised rate. Our core CPI page computes both directly from BLS data. A three-month annualised rate below the 12-month rate suggests recent momentum is softer than the past year's average, and vice versa.

## Core in the euro area

Eurostat publishes many HICP special aggregates. The one most often called "core" is the overall index excluding energy, food, alcohol and tobacco. Our [euro-area inflation page](/indicators/euro-area-inflation/) shows it alongside the headline rate. Because the exclusion set differs from the U.S. CPI definition, and because HICP excludes owner-occupied housing costs, U.S. and euro-area core rates are not directly comparable; see [HICP vs CPI](/guides/hicp-vs-cpi/).

## A practical checklist for release day

1. Read headline 12-month CPI: what households paid on average.
2. Read core 12-month CPI: the slower-moving trend.
3. Compare the gap: is energy or food pushing headline around?
4. Check monthly SA core and its annualised pace for momentum.
5. Look at shelter and services excluding shelter in the BLS release tables to see what is driving core.

The [guide to reading a CPI release](/guides/reading-a-cpi-release/) explains where each of these numbers sits in the BLS news release.
