# Question backlog (playbook Phase 5)

Schema: Question | Basis | Type | Status | URL. Status: live = published page; open = candidate; skipped = not supported by existing data. Each row needs an official source before publishing.

| Question | Basis | Type | Status | URL |
|---|---|---|---|---|
| When is the next U.S. CPI release? | BLS release schedule (calendar dataset) | calendar question page | live | /calendar/us-cpi-release/ |
| When is the next U.S. jobs report? | BLS release schedule (calendar dataset) | calendar question page | live | /calendar/us-jobs-report-release/ |
| When is the next ECB interest rate decision? | ECB meeting calendar | calendar question page | skipped (calendar dataset holds no ECB meetings) | - |
| Is the U.S. yield curve inverted today? | U.S. Treasury par yield curve (treasury dataset) | data question page | open | /indicators/treasury-yield-curve/ (current home) |
| How is the CPI calculated? | BLS Handbook of Methods | guide | live | /guides/how-cpi-is-calculated/ |
| What is the difference between core and headline inflation? | BLS | guide | live | /guides/core-vs-headline-inflation/ |
| How do I read a CPI release? | BLS CPI news release | guide | live | /guides/reading-a-cpi-release/ |
| How do I read the jobs report? | BLS Employment Situation | guide | live | /guides/reading-the-jobs-report/ |
| Household vs establishment survey? | BLS | guide | live | /guides/household-vs-establishment-survey/ |
| Are wages keeping up with inflation? | BLS Real Earnings | guide | live | /guides/real-vs-nominal-wages/ |
| Why are jobs numbers revised? | BLS CES benchmark | guide | live | /guides/data-revisions-explained/ |
| HICP vs CPI? | Eurostat, BLS | guide | live | /guides/hicp-vs-cpi/ |
| How does the FOMC decide rates? | Federal Reserve | guide | live | /guides/how-fomc-decisions-work/ |
| How to read the Treasury yield curve? | U.S. Treasury, NY Fed | guide | live | /guides/reading-the-yield-curve/ |
| What are the ECB key rates? | ECB | guide | live | /guides/ecb-key-rates-explained/ |
| What is PCE inflation and how does it differ from CPI? | BEA | guide | open (needs BEA data source in refresh) | - |
| What is the labor force participation rate? | BLS LNS11300000 | guide + indicator | open | - |
| What is PPI and does it lead CPI? | BLS PPI | guide | open | - |
| What is JOLTS (job openings)? | BLS JOLTS | guide | open | - |
| What is the Sahm rule? | FRED/Sahm (2019) | guide | open (check source terms) | - |
| What does seasonal adjustment do? | BLS, X-13ARIMA-SEATS (Census) | guide | open | - |
| What is €STR and how does it relate to the deposit rate? | ECB | guide | open | - |
| What is the Employment Cost Index? | BLS ECI | guide | open | - |
| Why was October 2025 CPI not published? | BLS notice | note on CPI page | open (verify official BLS statement first) | - |

## Refresh / merge policy
- Refresh a page when its source data changes or impressions drop 30% or more between measurements.
- dateModified / sitemap lastmod change only on a real content or data change.
- Same-question duplicates: 301 to the stronger page plus canonical; 410 only as a last resort.
