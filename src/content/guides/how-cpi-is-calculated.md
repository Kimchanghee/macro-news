---
title: "How is the Consumer Price Index calculated?"
seoTitle: "How Is the Consumer Price Index (CPI) Calculated? A Guide"
description: "How the BLS builds the Consumer Price Index: the market basket, price collection, expenditure weights, seasonal adjustment and why the 12-month rate uses unadjusted data."
question: "how is cpi calculated"
answer: "The BLS calculates the CPI by pricing a fixed basket of consumer goods and services across U.S. urban areas each month, combining price changes within about 240 item categories and 75 areas, then weighting them by household spending shares."
type: glossary
datePublished: 2026-10-15
updated: 2026-10-15
data_asof: "2026-09 (latest CPI on this site)"
indicators: [cpi, core-cpi]
related: [reading-a-cpi-release, core-vs-headline-inflation, hicp-vs-cpi]
sources:
  - { name: "BLS Handbook of Methods: Consumer Price Index", url: "https://www.bls.gov/opub/hom/cpi/" }
  - { name: "BLS CPI frequently asked questions", url: "https://www.bls.gov/cpi/questions-and-answers.htm" }
  - { name: "BLS: Seasonal adjustment in the CPI", url: "https://www.bls.gov/cpi/seasonal-adjustment/" }
  - { name: "BLS: Relative importance of CPI components", url: "https://www.bls.gov/cpi/tables/relative-importance/" }
faq:
  - { q: "Is the CPI the same as the cost of living?", a: "No. BLS describes the CPI as a measure of the average change in prices paid by urban consumers for a market basket. It is not a complete cost-of-living index because it does not capture every change in how people live, such as public goods or environmental factors." }
  - { q: "Why does my own inflation feel different from the CPI?", a: "The CPI weights reflect average spending across urban households. A household that spends a larger share on rent, fuel or childcare than average will experience a different rate of price change." }
  - { q: "Which CPI number is the headline?", a: "The headline figure most media quote is the 12-month percent change in the all-items CPI-U, not seasonally adjusted (series CUUR0000SA0)." }
---

## What the CPI measures

The Consumer Price Index for All Urban Consumers (CPI-U) tracks the average change over time in the prices that urban households pay for a representative basket of goods and services. The Bureau of Labor Statistics (BLS) says the CPI-U population represents more than 90% of the U.S. population. A second index, the CPI-W, covers households of wage earners and clerical workers and is used for Social Security cost-of-living adjustments.

The index level itself (for example, about 337 for September 2026 on this site) has no meaning on its own. It is set so that the 1982–84 average equals 100. What matters is the percent change between two periods.

## Step 1: define the basket and its weights

The basket comes from the Consumer Expenditure Surveys, in which households report what they buy. BLS groups spending into about 240 basic item categories organised into eight major groups: food and beverages, housing, apparel, transportation, medical care, recreation, education and communication, and other goods and services.

Each category gets a weight, called its *relative importance*, equal to its share of total consumer spending. Shelter alone carries roughly a third of the all-items index, which is why rent and owners' equivalent rent move the headline number so much. Since January 2023 BLS updates these weights every year, based on a single calendar year of expenditure data.

## Step 2: collect prices

Every month BLS data collectors record prices for tens of thousands of specific items at stores, service providers and websites, plus rent quotes from a large sample of housing units. Prices are collected in 75 urban areas across the country. The specific items priced are chosen by probability sampling, so that a particular brand of cereal in a particular store stands in for the broader "breakfast cereal" category in that area.

When an item disappears or changes, BLS substitutes a comparable item and, where the quality differs, applies *quality adjustment* so that a price change reflects price rather than a better or worse product. For goods such as apparel and electronics this uses statistical models called hedonic regressions.

## Step 3: build basic indexes

Within each item category and area (the "basic cells"), BLS combines individual price changes into a basic index. For most categories it uses a geometric mean formula, which assumes consumers shift somewhat toward items whose prices rise less. For a few categories, such as utilities and some medical services, it uses an arithmetic (Laspeyres) formula.

## Step 4: aggregate to the all-items index

The basic indexes are then combined using the expenditure weights into higher-level indexes: food at home, energy, shelter, and finally the all-items CPI. This upper level uses a modified Laspeyres formula, meaning the weights are fixed for the year rather than adjusting monthly.

BLS also publishes the Chained CPI-U (C-CPI-U), which uses a formula that accounts for substitution between categories and is revised after initial publication. It tends to rise slightly more slowly than the CPI-U.

## Step 5: seasonal adjustment

Some prices follow predictable seasonal patterns: apparel discounts after the holidays, fuel prices in summer. BLS publishes both seasonally adjusted (SA) and not seasonally adjusted (NSA) indexes. Each February it re-estimates the seasonal factors and revises the previous five years of SA data.

| Use | Which series | Why |
|---|---|---|
| 12-month change (headline) | NSA, `CUUR0000SA0` | Seasonal effects cancel over a full year, and NSA data are never revised |
| Month-to-month change | SA, `CUSR0000SA0` | Removes predictable seasonal swings |
| Annualised 3- or 6-month rate | SA | Same reason as monthly changes |

Our [CPI indicator page](/indicators/cpi/) follows exactly this convention: the 12-month rate is from the unadjusted index and the monthly and annualised rates from the adjusted index.

## Worked example: from index levels to inflation

Suppose the NSA index is 336.940 in September 2026 and 329.0 in September 2025 (illustrative values). The 12-month change is:

(336.940 ÷ 329.0 − 1) × 100 = 2.41%, published rounded to one decimal as 2.4%.

For a monthly change you divide the SA index in one month by the SA index in the prior month. To annualise a three-month change you raise the ratio to the power of 12/3 = 4. The [methodology page](/methodology/) lists every formula we use.

## What the CPI does not do

- It does not measure the price *level* in one city versus another; area indexes compare each area with itself over time.
- It excludes spending by rural households, institutional populations and businesses.
- It counts owner-occupied housing through *owners' equivalent rent*, the implicit rent owners would pay, rather than house prices or mortgage payments.
- It is not the Federal Reserve's target measure. The Fed's 2% objective refers to the PCE price index published by the Bureau of Economic Analysis.

Understanding these choices explains most of the gaps people notice between the CPI and their own experience, and between the CPI and other measures such as euro-area HICP, covered in our [HICP vs CPI guide](/guides/hicp-vs-cpi/).

## How to use this when a release comes out

On release day, look first at the 12-month NSA rate, then at the SA monthly change for momentum, then at core CPI to see whether food and energy drove the move. Our [guide to reading a CPI release](/guides/reading-a-cpi-release/) walks through the news release table by table.
