import bls from '../data/bls.json';
import treasury from '../data/treasury.json';
import ecb from '../data/ecb.json';
import calendar from '../data/calendar.json';
import { pctChange, diff, yoySeries, annualized, avgChange, range, signed, fmt, monthName, shortMonth, longDate, streak, shiftMonth } from './calc.mjs';

export type Obs = { date: string; value: number; preliminary?: boolean };
export type Stat = { label: string; value: string; note?: string };
export type Row = { period: string; cells: string[] };
export type ChartSpec = { kind: 'line' | 'bar' | 'step' | 'curve'; points?: { x: string; y: number | null }[]; unit: string; decimals: number; title: string; desc: string; ref?: number; refLabel?: string; curve?: { labels: string[]; series: { name: string; values: (number | null)[] }[] } };
export type Indicator = {
  slug: string; code: string; name: string; h1: string; title: string; agency: string;
  releaseTitle?: string; latestPeriod: string; latestLabel: string; headline: string; headlineUnit: string;
  priorLabel: string; changeLabel: string; answer: string; insights: string[]; stats: Stat[];
  chart: ChartSpec; table: { head: string[]; rows: Row[] }; definition: string[]; measurement: string[];
  sources: { name: string; url: string }[]; asOf: string; dataAsOf: string; nextRelease?: { date: string; timeET: string } | null;
  related: string[]; guides: string[]; description: string; preliminary?: boolean;
};

const S = (id: string) => (bls.series as any)[id].observations as Obs[];
const last = <T,>(a: T[]) => a[a.length - 1];
const today = new Date().toISOString().slice(0, 10);

export function nextRelease(title: string) {
  const ev = (calendar.events as any[]).find((e) => e.title === title && e.date >= today);
  return ev ? { date: ev.date as string, timeET: ev.timeET as string } : null;
}

const BLS_SRC = (path: string, label: string) => ({ name: label, url: path });
const recent = (obs: Obs[], n: number) => obs.slice(-n);

function cpiLike(slug: string, nsa: string, sa: string, isCore: boolean): Indicator {
  const n = S(nsa), s = S(sa);
  const p = last(n).date;
  const yoy = pctChange(n, p, 12)!;
  const yoyPrev = pctChange(n, shiftMonth(p, -1), 12);
  const mom = pctChange(s, last(s).date, 1);
  const ann3 = annualized(s, last(s).date, 3);
  const ann6 = annualized(s, last(s).date, 6);
  const ys = yoySeries(n);
  const r = range(ys, 60);
  const peak = range(ys);
  const above2 = streak(ys, (o: Obs) => o.value > 2);
  const name = isCore ? 'Core CPI (less food and energy)' : 'Consumer Price Index (CPI-U)';
  const insights = [
    `${isCore ? 'Core' : 'Headline'} CPI rose ${fmt(yoy)}% in the 12 months to ${monthName(p)}, ${yoyPrev == null ? '' : yoy > yoyPrev + 0.05 ? `up from ${fmt(yoyPrev)}% a month earlier` : yoy < yoyPrev - 0.05 ? `down from ${fmt(yoyPrev)}% a month earlier` : `about the same as the ${fmt(yoyPrev)}% recorded a month earlier`}.`,
    `On a seasonally adjusted basis prices moved ${signed(mom)}% in ${monthName(last(s).date)}; compounded, the last three months run at ${fmt(ann3)}% annualized and the last six at ${fmt(ann6)}%.`,
    `Over the past five years the 12-month rate ranged from ${fmt(r.min.value)}% (${shortMonth(r.min.date)}) to ${fmt(r.max.value)}% (${shortMonth(r.max.date)}); the highest reading in this ${ys.length}-month window was ${fmt(peak.max.value)}% in ${shortMonth(peak.max.date)}.`,
    above2 > 0 ? `The 12-month rate has been above 2% for ${above2} consecutive months. (The Fed's 2% goal refers to PCE inflation, not CPI, so this is context rather than a target test.)` : `The 12-month rate is at or below 2% in the latest month. (The Fed's 2% goal refers to PCE inflation, not CPI.)`,
  ];
  const rows = recent(n, 13).reverse().map((o) => {
    const so = s.find((x) => x.date === o.date);
    return { period: shortMonth(o.date), cells: [fmt(o.value, 3), fmt(pctChange(n, o.date, 12)), so ? signed(pctChange(s, o.date, 1)) : '—'] };
  });
  return {
    slug, code: nsa, name,
    h1: isCore ? 'What is the latest core CPI inflation rate?' : 'What is the latest U.S. CPI inflation rate?',
    title: isCore ? 'Core CPI Inflation: Latest Print, History and Schedule' : 'U.S. CPI Inflation Rate: Latest Print, History, Schedule',
    agency: 'U.S. Bureau of Labor Statistics', releaseTitle: 'Consumer Price Index',
    latestPeriod: p, latestLabel: monthName(p), headline: fmt(yoy), headlineUnit: '% y/y',
    priorLabel: yoyPrev == null ? '—' : `${fmt(yoyPrev)}% in ${shortMonth(shiftMonth(p, -1))}`, changeLabel: `${signed(mom)}% m/m (SA)`,
    answer: `${isCore ? 'Core CPI, which excludes food and energy,' : 'The U.S. Consumer Price Index for All Urban Consumers'} rose ${fmt(yoy)}% over the 12 months ending ${monthName(p)}, according to the Bureau of Labor Statistics. Seasonally adjusted, it changed ${signed(mom)}% from the prior month.`,
    insights,
    stats: [
      { label: '12-month change', value: `${fmt(yoy)}%`, note: monthName(p) },
      { label: '1-month change (SA)', value: `${signed(mom)}%` },
      { label: '3-month annualized (SA)', value: `${fmt(ann3)}%` },
      { label: '6-month annualized (SA)', value: `${fmt(ann6)}%` },
      { label: 'Index level (NSA)', value: fmt(last(n).value, 3), note: '1982–84 = 100' },
    ],
    chart: { kind: 'line', points: ys.map((o: Obs) => ({ x: o.date, y: o.value })), unit: '%', decimals: 1, title: `${name}: 12-month percent change`, desc: `Monthly 12-month percent change in ${isCore ? 'core ' : ''}CPI-U, not seasonally adjusted, ${shortMonth(ys[0].date)} to ${shortMonth(p)}.`, ref: 2, refLabel: '2%' },
    table: { head: ['Month', 'Index (NSA)', '12-mo %', '1-mo % (SA)'], rows },
    definition: isCore ? [
      'Core CPI is the Consumer Price Index for All Urban Consumers excluding food and energy (BLS series CUUR0000SA0L1E, seasonally adjusted CUSR0000SA0L1E). Removing the two most volatile categories makes the underlying trend easier to see, though households still pay for food and energy.',
      'Shelter (rent and owners’ equivalent rent) is the largest component of core CPI, so it tends to move core inflation slowly and with a lag relative to market rents.',
    ] : [
      'The Consumer Price Index for All Urban Consumers (CPI-U, BLS series CUUR0000SA0) measures the average change over time in the prices urban consumers pay for a market basket of goods and services. It represents more than 90% of the U.S. population.',
      'The headline 12-month rate is computed from the not seasonally adjusted index, because seasonal factors cancel over a full year. Month-to-month changes are read from the seasonally adjusted index (CUSR0000SA0).',
    ],
    measurement: [
      'BLS data collectors record tens of thousands of prices and rent quotes each month across urban areas, and BLS weights them by spending shares from the Consumer Expenditure Surveys.',
      'The release is published at 8:30 a.m. Eastern time, typically in the second week of the following month. Seasonal factors are revised each February for the previous five years.',
    ],
    sources: [BLS_SRC('https://www.bls.gov/cpi/', 'BLS Consumer Price Index program'), BLS_SRC(`https://data.bls.gov/timeseries/${nsa}`, `BLS series ${nsa}`), BLS_SRC(`https://data.bls.gov/timeseries/${sa}`, `BLS series ${sa}`), BLS_SRC('https://www.bls.gov/schedule/news_release/cpi.htm', 'BLS CPI release schedule')],
    asOf: bls.asOf, dataAsOf: p, nextRelease: nextRelease('Consumer Price Index'),
    related: isCore ? ['cpi', 'average-hourly-earnings', 'euro-area-inflation'] : ['core-cpi', 'average-hourly-earnings', 'treasury-yield-curve'],
    guides: isCore ? ['core-vs-headline-inflation', 'how-cpi-is-calculated'] : ['how-cpi-is-calculated', 'core-vs-headline-inflation', 'reading-a-cpi-release'],
    description: '', preliminary: false,
  };
}

function unemployment(): Indicator {
  const u = S('LNS14000000'); const p = last(u).date;
  const v = last(u).value; const chg = diff(u, p, 1); const y = diff(u, p, 12);
  const r = range(u, 36); const low = range(u);
  const ma3 = u.slice(-3).reduce((a, o) => a + o.value, 0) / 3;
  const min12 = Math.min(...u.slice(-15, -3).map((o) => o.value));
  const sahm = ma3 - Math.min(...u.slice(-15).map((_, i, a) => i >= 2 ? (a[i].value + a[i - 1].value + a[i - 2].value) / 3 : Infinity).slice(0, 12));
  const rows = recent(u, 13).reverse().map((o) => ({ period: shortMonth(o.date), cells: [fmt(o.value), signed(diff(u, o.date, 1))] }));
  return {
    slug: 'unemployment-rate', code: 'LNS14000000', name: 'Unemployment rate', h1: 'What is the current U.S. unemployment rate?',
    title: 'U.S. Unemployment Rate: Latest Jobs Report Reading and Trend', agency: 'U.S. Bureau of Labor Statistics', releaseTitle: 'Employment Situation',
    latestPeriod: p, latestLabel: monthName(p), headline: fmt(v), headlineUnit: '%', priorLabel: `${fmt(v - (chg ?? 0))}% in ${shortMonth(shiftMonth(p, -1))}`, changeLabel: `${signed(chg)} pt m/m`,
    answer: `The U.S. unemployment rate was ${fmt(v)}% in ${monthName(p)}, seasonally adjusted, according to the BLS household survey. That is ${signed(chg)} percentage point versus the prior month and ${signed(y)} point versus a year earlier.`,
    insights: [
      `The three-month average unemployment rate is ${fmt(ma3, 2)}%; over the last 36 months the rate ranged from ${fmt(r.min.value)}% (${shortMonth(r.min.date)}) to ${fmt(r.max.value)}% (${shortMonth(r.max.date)}).`,
      `The lowest reading in the ${u.length}-month window shown here was ${fmt(low.min.value)}% in ${shortMonth(low.min.date)}; the highest was ${fmt(low.max.value)}% in ${shortMonth(low.max.date)}.`,
      `A Sahm-rule style calculation (three-month average minus the lowest three-month average of the prior 12 months) gives ${signed(sahm, 2)} percentage point. The rule's historical recession signal is a rise of 0.50 point or more; this is a mechanical reading, not a forecast.`,
      `The minimum single-month rate in the 12 months before the latest quarter was ${fmt(min12)}%.`,
    ],
    stats: [
      { label: 'Rate (SA)', value: `${fmt(v)}%`, note: monthName(p) },
      { label: 'Change vs prior month', value: `${signed(chg)} pt` },
      { label: 'Change vs year earlier', value: `${signed(y)} pt` },
      { label: '3-month average', value: `${fmt(ma3, 2)}%` },
      { label: 'Sahm-style gap', value: `${signed(sahm, 2)} pt` },
    ],
    chart: { kind: 'line', points: u.map((o) => ({ x: o.date, y: o.value })), unit: '%', decimals: 1, title: 'U.S. unemployment rate, seasonally adjusted', desc: `Monthly unemployment rate (BLS LNS14000000), ${shortMonth(u[0].date)} to ${shortMonth(p)}.` },
    table: { head: ['Month', 'Rate %', 'Change (pt)'], rows },
    definition: [
      'The unemployment rate is the number of unemployed people as a percentage of the civilian labor force, ages 16 and over. A person counts as unemployed if they had no job, were available for work, and actively looked for work in the prior four weeks (or were on temporary layoff).',
      'It comes from the Current Population Survey (household survey) of about 60,000 eligible households, not from unemployment insurance claims.',
    ],
    measurement: [
      'The rate is published in the monthly Employment Situation report, usually on the first Friday of the month at 8:30 a.m. Eastern time, covering the prior month.',
      'Because it is a sample estimate, BLS notes that a month-to-month change of about 0.2 percentage point is needed to be statistically significant.',
    ],
    sources: [BLS_SRC('https://www.bls.gov/cps/', 'BLS Current Population Survey'), BLS_SRC('https://data.bls.gov/timeseries/LNS14000000', 'BLS series LNS14000000'), BLS_SRC('https://www.bls.gov/schedule/news_release/empsit.htm', 'BLS Employment Situation schedule')],
    asOf: bls.asOf, dataAsOf: p, nextRelease: nextRelease('Employment Situation'),
    related: ['nonfarm-payrolls', 'average-hourly-earnings', 'cpi'], guides: ['household-vs-establishment-survey', 'reading-the-jobs-report'], description: '',
  };
}

function payrolls(): Indicator {
  const e = S('CES0000000001'); const p = last(e).date;
  const ch = e.slice(1).map((o, i) => ({ date: o.date, value: o.value - e[i].value, preliminary: o.preliminary }));
  const lastCh = last(ch);
  const avg3 = avgChange(e, 3), avg6 = avgChange(e, 6), avg12 = avgChange(e, 12);
  const yoy = diff(e, p, 12);
  const neg = ch.slice(-24).filter((o) => o.value < 0).length;
  const prelim = e.slice(-2).some((o) => o.preliminary);
  const rows = recent(ch, 13).reverse().map((o) => ({ period: shortMonth(o.date) + (o.preliminary ? ' (p)' : ''), cells: [fmt(e.find((x) => x.date === o.date)!.value, 0), signed(o.value, 0)] }));
  return {
    slug: 'nonfarm-payrolls', code: 'CES0000000001', name: 'Nonfarm payrolls', h1: 'How many jobs did the U.S. economy add last month?',
    title: 'Nonfarm Payrolls: Latest Monthly Job Gains and Revisions', agency: 'U.S. Bureau of Labor Statistics', releaseTitle: 'Employment Situation',
    latestPeriod: p, latestLabel: monthName(p), headline: signed(lastCh.value, 0), headlineUnit: 'k jobs', priorLabel: `${signed(ch[ch.length - 2].value, 0)}k in ${shortMonth(ch[ch.length - 2].date)}`, changeLabel: `3-mo avg ${signed(avg3, 0)}k`,
    answer: `U.S. nonfarm payroll employment changed by ${signed(lastCh.value, 0)} thousand in ${monthName(p)}${lastCh.preliminary ? ' (preliminary)' : ''}, seasonally adjusted, per the BLS establishment survey. Total payrolls stand at ${fmt(last(e).value / 1000, 1)} million jobs.`,
    insights: [
      `Average monthly change: ${signed(avg3, 0)}k over 3 months, ${signed(avg6, 0)}k over 6 months, and ${signed(avg12, 0)}k over 12 months. Over the past year payrolls changed by ${signed(yoy, 0)} thousand in total.`,
      `${neg} of the last 24 monthly changes were negative.`,
      prelim ? 'The two most recent months are preliminary and will be revised in the next two monthly reports; the annual benchmark revision arrives with the January data each February.' : 'Recent months are revised in the following two reports, and annually with the January benchmark.',
    ],
    stats: [
      { label: 'Monthly change', value: `${signed(lastCh.value, 0)}k`, note: monthName(p) },
      { label: '3-month average', value: `${signed(avg3, 0)}k` },
      { label: '12-month average', value: `${signed(avg12, 0)}k` },
      { label: 'Total employment', value: `${fmt(last(e).value / 1000, 2)}m` },
    ],
    chart: { kind: 'bar', points: ch.slice(-48).map((o) => ({ x: o.date, y: o.value })), unit: 'k', decimals: 0, title: 'Monthly change in U.S. nonfarm payrolls (thousands)', desc: `Monthly change in total nonfarm employment, seasonally adjusted, last 48 months to ${shortMonth(p)}.` },
    table: { head: ['Month', 'Level (k)', 'Change (k)'], rows },
    definition: [
      'Nonfarm payrolls count the number of paid jobs on the payrolls of U.S. businesses and government agencies, excluding farm workers, private household employees and the self-employed. The figure comes from the Current Employment Statistics (establishment) survey.',
      'The headline number is the month-over-month change in seasonally adjusted total nonfarm employment (BLS series CES0000000001).',
    ],
    measurement: [
      'The CES survey samples more than 100,000 businesses and government agencies covering several hundred thousand worksites. Estimates are revised twice in the following months as more responses arrive.',
      'Once a year, the March level is benchmarked to unemployment-insurance tax records, which can shift the level by several hundred thousand jobs.',
    ],
    sources: [BLS_SRC('https://www.bls.gov/ces/', 'BLS Current Employment Statistics'), BLS_SRC('https://data.bls.gov/timeseries/CES0000000001', 'BLS series CES0000000001'), BLS_SRC('https://www.bls.gov/schedule/news_release/empsit.htm', 'BLS Employment Situation schedule')],
    asOf: bls.asOf, dataAsOf: p, nextRelease: nextRelease('Employment Situation'),
    related: ['unemployment-rate', 'average-hourly-earnings', 'treasury-yield-curve'], guides: ['reading-the-jobs-report', 'household-vs-establishment-survey', 'data-revisions-explained'], description: '', preliminary: prelim,
  };
}

function ahe(): Indicator {
  const a = S('CES0500000003'); const p = last(a).date;
  const yoy = pctChange(a, p, 12)!; const mom = pctChange(a, p, 1);
  const cpi = S('CUUR0000SA0'); const cpiYoy = pctChange(cpi, p, 12);
  const real = cpiYoy == null ? null : ((1 + yoy / 100) / (1 + cpiYoy / 100) - 1) * 100;
  const ys = yoySeries(a); const r = range(ys);
  const rows = recent(a, 13).reverse().map((o) => ({ period: shortMonth(o.date) + (o.preliminary ? ' (p)' : ''), cells: [`$${fmt(o.value, 2)}`, fmt(pctChange(a, o.date, 12)), signed(pctChange(a, o.date, 1))] }));
  return {
    slug: 'average-hourly-earnings', code: 'CES0500000003', name: 'Average hourly earnings', h1: 'How fast are U.S. wages growing?',
    title: 'Average Hourly Earnings: U.S. Wage Growth, Latest and History', agency: 'U.S. Bureau of Labor Statistics', releaseTitle: 'Employment Situation',
    latestPeriod: p, latestLabel: monthName(p), headline: fmt(yoy), headlineUnit: '% y/y', priorLabel: `$${fmt(last(a).value, 2)} per hour`, changeLabel: `${signed(mom)}% m/m`,
    answer: `Average hourly earnings of all private-sector employees were $${fmt(last(a).value, 2)} in ${monthName(p)}, up ${fmt(yoy)}% from a year earlier and ${signed(mom)}% from the prior month (seasonally adjusted), according to the BLS establishment survey.`,
    insights: [
      cpiYoy == null ? 'CPI for the same month is not yet published, so a real-wage comparison is not shown.' : `With headline CPI up ${fmt(cpiYoy)}% over the same 12 months, nominal wage growth of ${fmt(yoy)}% implies real hourly earnings growth of roughly ${signed(real)}% (computed here as (1+wage)/(1+CPI)−1; BLS publishes its own Real Earnings release).`,
      `In the ${ys.length}-month window shown, 12-month wage growth ranged from ${fmt(r.min.value)}% (${shortMonth(r.min.date)}) to ${fmt(r.max.value)}% (${shortMonth(r.max.date)}). The 2020 spike reflected job losses concentrated among lower-paid workers, a composition effect rather than broad raises.`,
    ],
    stats: [
      { label: 'Hourly earnings', value: `$${fmt(last(a).value, 2)}`, note: monthName(p) },
      { label: '12-month change', value: `${fmt(yoy)}%` },
      { label: '1-month change', value: `${signed(mom)}%` },
      { label: 'Implied real change', value: real == null ? '—' : `${signed(real)}%` },
    ],
    chart: { kind: 'line', points: ys.map((o: Obs) => ({ x: o.date, y: o.value })), unit: '%', decimals: 1, title: 'Average hourly earnings, total private: 12-month percent change', desc: `12-month change in average hourly earnings (CES0500000003), ${shortMonth(ys[0].date)} to ${shortMonth(p)}.` },
    table: { head: ['Month', 'Earnings', '12-mo %', '1-mo %'], rows },
    definition: ['Average hourly earnings (AHE) are gross payroll for all private-sector employees divided by total hours paid, from the BLS establishment survey (series CES0500000003, seasonally adjusted). They include overtime but exclude benefits and irregular bonuses.', 'Because AHE is an average, shifts in the mix of jobs (for example, more low-wage jobs) can move it even when individual pay does not change. The Employment Cost Index controls for that mix.'],
    measurement: ['Published with the Employment Situation report on the first Friday of most months at 8:30 a.m. ET; the latest two months are preliminary.', 'For inflation-adjusted figures BLS publishes a separate Real Earnings release alongside CPI.'],
    sources: [BLS_SRC('https://www.bls.gov/ces/', 'BLS Current Employment Statistics'), BLS_SRC('https://data.bls.gov/timeseries/CES0500000003', 'BLS series CES0500000003'), BLS_SRC('https://www.bls.gov/schedule/news_release/realer.htm', 'BLS Real Earnings release')],
    asOf: bls.asOf, dataAsOf: p, nextRelease: nextRelease('Employment Situation'),
    related: ['nonfarm-payrolls', 'cpi', 'unemployment-rate'], guides: ['real-vs-nominal-wages', 'reading-the-jobs-report'], description: '',
  };
}

function curve(): Indicator {
  const t = treasury as any; const L = t.latest; const tenors: string[] = t.tenors;
  const yrAgo = t.recentDaily.find((d: any) => d.date >= `${Number(L.date.slice(0, 4)) - 1}${L.date.slice(4)}`) ?? t.recentDaily[0];
  const s10_2 = L['10 Yr'] - L['2 Yr']; const s10_3m = L['10 Yr'] - L['3 Mo'];
  const me = (t.monthEnd as any[]).map((d) => ({ date: d.date.slice(0, 7), value: d['10 Yr'] != null && d['2 Yr'] != null ? Number((d['10 Yr'] - d['2 Yr']).toFixed(2)) : null })).filter((o) => o.value != null) as Obs[];
  const invMonths = me.filter((o) => o.value < 0).length;
  const lastInv = [...me].reverse().find((o) => o.value < 0);
  const tens = (t.recentDaily as any[]).slice(-252).map((d) => d['10 Yr']).filter((v: any) => v != null);
  const rows = tenors.filter((x) => L[x] != null).map((x) => ({ period: x.replace('Mo', 'month').replace('Yr', 'year'), cells: [fmt(L[x], 2), yrAgo[x] == null ? '—' : fmt(yrAgo[x], 2), yrAgo[x] == null ? '—' : signed(L[x] - yrAgo[x], 2)] }));
  return {
    slug: 'treasury-yield-curve', code: 'Daily par yield curve', name: 'Treasury yield curve', h1: 'What is the U.S. Treasury yield curve today?',
    title: 'U.S. Treasury Yield Curve: 2Y, 10Y, Spread and Curve Shape', agency: 'U.S. Department of the Treasury',
    latestPeriod: L.date, latestLabel: longDate(L.date), headline: fmt(L['10 Yr'], 2), headlineUnit: '% 10-yr', priorLabel: `2-yr ${fmt(L['2 Yr'], 2)}%`, changeLabel: `10y−2y ${signed(s10_2, 2)} pt`,
    answer: `On ${longDate(L.date)} the 10-year Treasury par yield was ${fmt(L['10 Yr'], 2)}% and the 2-year was ${fmt(L['2 Yr'], 2)}%, a 10-year minus 2-year spread of ${signed(s10_2, 2)} percentage point, according to the U.S. Treasury's daily par yield curve.`,
    insights: [
      `The 10-year minus 3-month spread is ${signed(s10_3m, 2)} point. A one-year-earlier comparison (${longDate(yrAgo.date)}) had the 10-year at ${fmt(yrAgo['10 Yr'], 2)}% and the 2-year at ${fmt(yrAgo['2 Yr'], 2)}%.`,
      `Over the last 252 trading days the 10-year yield ranged from ${fmt(Math.min(...tens), 2)}% to ${fmt(Math.max(...tens), 2)}%.`,
      `Using month-end data, the 10y−2y spread was negative (inverted) in ${invMonths} of the ${me.length} months shown${lastInv ? `, most recently at the end of ${monthName(lastInv.date)}` : ''}.`,
    ],
    stats: [
      { label: '10-year', value: `${fmt(L['10 Yr'], 2)}%`, note: longDate(L.date) },
      { label: '2-year', value: `${fmt(L['2 Yr'], 2)}%` },
      { label: '3-month', value: `${fmt(L['3 Mo'], 2)}%` },
      { label: '30-year', value: `${fmt(L['30 Yr'], 2)}%` },
      { label: '10y − 2y', value: `${signed(s10_2, 2)} pt` },
    ],
    chart: { kind: 'curve', unit: '%', decimals: 2, title: 'U.S. Treasury par yield curve', desc: `Par yields by maturity on ${L.date} (solid) and ${yrAgo.date} (dashed).`, curve: { labels: tenors.filter((x) => L[x] != null), series: [{ name: L.date, values: tenors.filter((x) => L[x] != null).map((x) => L[x]) }, { name: yrAgo.date, values: tenors.filter((x) => L[x] != null).map((x) => yrAgo[x]) }] } },
    table: { head: ['Maturity', `${L.date} %`, `${yrAgo.date} %`, 'Change (pt)'], rows },
    definition: ['The Treasury par yield curve shows the yield at which a Treasury security of each maturity would trade at par, estimated daily by the Treasury from indicative bid-side prices of the most recently auctioned securities.', 'The spread between long and short maturities summarises the curve’s slope. When short yields exceed long yields the curve is “inverted”.'],
    measurement: ['Treasury publishes the curve each business day, normally by 6:00 p.m. ET, using a monotone convex spline method. Values are bond-equivalent yields.', 'The monthly spread history below uses the last trading day of each month in our snapshot.'],
    sources: [{ name: 'U.S. Treasury: Daily Treasury Par Yield Curve Rates', url: t.sourceUrl }, { name: 'Treasury yield curve methodology', url: 'https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics/treasury-yield-curve-methodology' }],
    asOf: t.asOf, dataAsOf: L.date, nextRelease: null,
    related: ['ecb-interest-rates', 'cpi', 'nonfarm-payrolls'], guides: ['yield-curve-inversion-explained', 'how-fomc-decisions-work'], description: '',
  };
}

export function spreadHistory() {
  const t = treasury as any;
  return (t.monthEnd as any[]).map((d) => ({ x: d.date.slice(0, 7), y: d['10 Yr'] != null && d['2 Yr'] != null ? Number((d['10 Yr'] - d['2 Yr']).toFixed(2)) : null }));
}

function hicp(): Indicator {
  const h = (ecb as any).hicp.observations as Obs[]; const c = (ecb as any).core.observations as Obs[];
  const p = last(h).date; const v = last(h).value; const prev = h[h.length - 2];
  const cv = c.find((o) => o.date === p) ?? last(c);
  const r = range(h);
  const rows = recent(h, 13).reverse().map((o) => ({ period: shortMonth(o.date), cells: [fmt(o.value), (c.find((x) => x.date === o.date) ? fmt(c.find((x) => x.date === o.date)!.value) : '—')] }));
  return {
    slug: 'euro-area-inflation', code: 'Eurostat prc_hicp_minr TOTAL', name: 'Euro area HICP inflation', h1: 'What is the latest euro area inflation rate?',
    title: 'Euro Area Inflation (HICP): Latest Rate, Core and History', agency: 'Eurostat',
    latestPeriod: p, latestLabel: monthName(p), headline: fmt(v), headlineUnit: '% y/y', priorLabel: `${fmt(prev.value)}% in ${shortMonth(prev.date)}`, changeLabel: `core ${fmt(cv.value)}% (${shortMonth(cv.date)})`,
    answer: `Euro area annual HICP inflation was ${fmt(v)}% in ${monthName(p)}, compared with ${fmt(prev.value)}% in ${monthName(prev.date)}, according to Eurostat. Core inflation excluding energy, food, alcohol and tobacco was ${fmt(cv.value)}%.`,
    insights: [
      `The ECB's medium-term target is 2% HICP inflation; the latest reading is ${signed(v - 2)} point from that level.`,
      `In the ${h.length}-month window shown, headline HICP inflation ranged from ${fmt(r.min.value)}% (${shortMonth(r.min.date)}) to ${fmt(r.max.value)}% (${shortMonth(r.max.date)}).`,
      `The gap between headline and core is ${signed(v - cv.value)} point, a rough gauge of the net contribution of energy and food.`,
    ],
    stats: [{ label: 'Headline HICP', value: `${fmt(v)}%`, note: monthName(p) }, { label: 'Core HICP', value: `${fmt(cv.value)}%`, note: monthName(cv.date) }, { label: 'Distance to 2% target', value: `${signed(v - 2)} pt` }],
    chart: { kind: 'line', points: h.map((o) => ({ x: o.date, y: o.value })), unit: '%', decimals: 1, title: 'Euro area HICP inflation, annual rate', desc: `Annual rate of change of the euro area HICP, ${shortMonth(h[0].date)} to ${shortMonth(p)}.`, ref: 2, refLabel: 'ECB 2% target' },
    table: { head: ['Month', 'Headline %', 'Core %'], rows },
    definition: ['The Harmonised Index of Consumer Prices (HICP) is the euro area’s official inflation measure, compiled by Eurostat from national statistics using a common methodology. The euro area aggregate uses the changing composition of member states.', 'Core HICP here means the overall index excluding energy, food, alcohol and tobacco (Eurostat aggregate TOT_X_NRG_FOOD).'],
    measurement: ['Eurostat publishes a flash estimate around the end of the reference month and the full release about two to three weeks later.', 'With the January 2026 data Eurostat moved the HICP to the ECOICOP version 2 classification (dataset prc_hicp_minr). We read annual rates from that dataset; compare long histories with care.'],
    sources: [{ name: 'Eurostat dataset prc_hicp_minr (HICP, ECOICOP ver.2)', url: 'https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_minr/default/table?lang=en' }, { name: 'Eurostat: HICP overview', url: 'https://ec.europa.eu/eurostat/web/hicp' }, { name: 'ECB: monetary policy strategy (2% target)', url: 'https://www.ecb.europa.eu/mopo/strategy/html/index.en.html' }],
    asOf: (ecb as any).asOf, dataAsOf: p, nextRelease: null,
    related: ['ecb-interest-rates', 'cpi', 'core-cpi'], guides: ['hicp-vs-cpi', 'core-vs-headline-inflation'], description: '',
  };
}

function ecbRates(): Indicator {
  const R = (ecb as any).rates; const d = R.dfr.changes as Obs[]; const m = R.mro.changes as Obs[]; const l = R.mlf.changes as Obs[];
  const dl = last(d); const realChanges = d.filter((o, i) => i > 0 && o.value !== d[i - 1].value);
  const lastMove = last(realChanges);
  const prevVal = lastMove ? d[d.indexOf(lastMove) - 1].value : null;
  const cuts = realChanges.filter((o) => o.value < d[d.indexOf(o) - 1].value).length;
  const hikes = realChanges.length - cuts;
  const rows = [...realChanges].reverse().slice(0, 14).map((o) => ({ period: longDate(o.date), cells: [fmt(o.value, 2), signed(o.value - d[d.indexOf(o) - 1].value, 2)] }));
  const pts: { x: string; y: number }[] = d.map((o) => ({ x: o.date, y: o.value }));
  return {
    slug: 'ecb-interest-rates', code: 'FM.B.U2.EUR.4F.KR.DFR.LEV', name: 'ECB key interest rates', h1: 'What are the ECB key interest rates now?',
    title: 'ECB Interest Rates: Deposit, Refinancing and Lending Rates', agency: 'European Central Bank',
    latestPeriod: dl.date, latestLabel: longDate(dl.date), headline: fmt(dl.value, 2), headlineUnit: '% deposit rate', priorLabel: `MRO ${fmt(last(m).value, 2)}%`, changeLabel: `MLF ${fmt(last(l).value, 2)}%`,
    answer: `The ECB deposit facility rate stands at ${fmt(dl.value, 2)}%, the main refinancing operations rate at ${fmt(last(m).value, 2)}% and the marginal lending facility rate at ${fmt(last(l).value, 2)}% (ECB Data Portal, latest observation ${longDate(dl.date)}).`,
    insights: [
      lastMove ? `The most recent change in the deposit facility rate took effect on ${longDate(lastMove.date)}, from ${fmt(prevVal, 2)}% to ${fmt(lastMove.value, 2)}%.` : 'No deposit-rate change occurred within the window shown.',
      `Within the window shown (${longDate(d[0].date)} onward) the deposit rate changed ${realChanges.length} times: ${hikes} increases and ${cuts} cuts.`,
      `Since September 2024 the deposit facility rate is the ECB’s main policy-signalling rate; the spread between the MRO and deposit rates was narrowed to 15 basis points at that time. The current MRO–deposit spread is ${fmt((last(m).value - dl.value) * 100, 0)} basis points.`,
    ],
    stats: [{ label: 'Deposit facility', value: `${fmt(dl.value, 2)}%`, note: 'policy-signalling rate' }, { label: 'Main refinancing', value: `${fmt(last(m).value, 2)}%` }, { label: 'Marginal lending', value: `${fmt(last(l).value, 2)}%` }],
    chart: { kind: 'step', points: pts, unit: '%', decimals: 2, title: 'ECB deposit facility rate', desc: `Deposit facility rate change points from ${d[0].date} to ${dl.date}.` },
    table: { head: ['Effective date', 'Deposit rate %', 'Change (pt)'], rows },
    definition: ['The ECB sets three key interest rates: the deposit facility rate (paid on banks’ overnight deposits with the Eurosystem), the main refinancing operations rate (for weekly liquidity), and the marginal lending facility rate (overnight credit).', 'With abundant excess liquidity, the deposit facility rate anchors short-term euro money-market rates such as €STR.'],
    measurement: ['The Governing Council takes monetary-policy decisions roughly every six weeks; decisions are announced at 14:15 CET and rate changes usually take effect the following Wednesday.', 'Our snapshot records the change points of the business-daily series on the ECB Data Portal.'],
    sources: [{ name: 'ECB Data Portal: deposit facility rate', url: 'https://data.ecb.europa.eu/data/datasets/FM/FM.B.U2.EUR.4F.KR.DFR.LEV' }, { name: 'ECB: key interest rates', url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html' }, { name: 'ECB: monetary policy meeting calendar', url: 'https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html' }],
    asOf: (ecb as any).asOf, dataAsOf: dl.date, nextRelease: null,
    related: ['euro-area-inflation', 'treasury-yield-curve', 'cpi'], guides: ['how-ecb-sets-rates', 'how-fomc-decisions-work'], description: '',
  };
}

export const indicators: Indicator[] = [
  cpiLike('cpi', 'CUUR0000SA0', 'CUSR0000SA0', false),
  cpiLike('core-cpi', 'CUUR0000SA0L1E', 'CUSR0000SA0L1E', true),
  unemployment(), payrolls(), ahe(), curve(), hicp(), ecbRates(),
];
export const bySlug = (s: string) => indicators.find((i) => i.slug === s)!;
