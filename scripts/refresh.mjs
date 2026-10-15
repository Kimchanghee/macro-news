// Fetches official public macro data into src/data/*.json.
// Rule: on any failure keep the last good snapshot (never invent or interpolate values).
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'src', 'data');
const UA = 'macrofinancenews.online data refresh (contact@macrofinancenews.online)';
const nowIso = () => new Date().toISOString();
let failures = 0;

async function get(url, init = {}) {
  const res = await fetch(url, { ...init, headers: { 'User-Agent': UA, Accept: '*/*', ...(init.headers || {}) }, signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

async function keepOrWrite(file, producer) {
  const target = path.join(dataDir, file);
  try {
    const data = await producer();
    await writeFile(target, JSON.stringify(data, null, 1) + '\n');
    console.log(`ok   ${file} asOf=${data.asOf}`);
  } catch (err) {
    failures++;
    let prev = null;
    try { prev = JSON.parse(await readFile(target, 'utf8')); } catch {}
    console.error(`FAIL ${file}: ${err.message}${prev ? ` (kept snapshot asOf=${prev.asOf})` : ' (no snapshot!)'}`);
    if (!prev) throw err;
  }
}

// ---------- BLS (API v1, no key: 25 queries/day, 10 years per query) ----------
const BLS_SERIES = {
  CUUR0000SA0: 'CPI-U all items, NSA (1982-84=100)',
  CUSR0000SA0: 'CPI-U all items, SA (1982-84=100)',
  CUUR0000SA0L1E: 'CPI-U less food and energy, NSA',
  CUSR0000SA0L1E: 'CPI-U less food and energy, SA',
  LNS14000000: 'Unemployment rate, SA (percent)',
  CES0000000001: 'All employees, total nonfarm, SA (thousands)',
  CES0500000003: 'Average hourly earnings, total private, SA (dollars)',
};
async function bls() {
  const end = new Date().getUTCFullYear();
  const body = { seriesid: Object.keys(BLS_SERIES), startyear: String(end - 9), endyear: String(end) };
  const res = await get('https://api.bls.gov/publicAPI/v1/timeseries/data/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await res.json();
  if (j.status !== 'REQUEST_SUCCEEDED') throw new Error('BLS: ' + j.status + ' ' + (j.message || []).join(' '));
  const series = {};
  for (const s of j.Results.series) {
    const obs = s.data
      .filter((d) => /^M(0[1-9]|1[0-2])$/.test(d.period) && d.value !== '-')
      .map((d) => ({ date: `${d.year}-${d.period.slice(1)}`, value: Number(d.value), preliminary: (d.footnotes || []).some((f) => f && f.code === 'P') }))
      .filter((d) => Number.isFinite(d.value))
      .sort((a, b) => a.date.localeCompare(b.date));
    if (obs.length < 24) throw new Error('BLS series too short: ' + s.seriesID);
    series[s.seriesID] = { title: BLS_SERIES[s.seriesID], observations: obs };
  }
  for (const id of Object.keys(BLS_SERIES)) if (!series[id]) throw new Error('BLS missing ' + id);
  return { asOf: nowIso(), source: 'U.S. Bureau of Labor Statistics, Public Data API v1', sourceUrl: 'https://www.bls.gov/developers/', series };
}

// ---------- BLS release schedule (ICS) + FOMC calendar ----------
const TRACKED = ['Consumer Price Index', 'Employment Situation', 'Producer Price Index', 'Real Earnings', 'Job Openings and Labor Turnover Survey', 'Employment Cost Index', 'Productivity and Costs', 'U.S. Import and Export Price Indexes'];
async function calendar() {
  const ics = (await (await get('https://www.bls.gov/schedule/news_release/bls.ics')).text()).replace(/\r?\n[ \t]/g, '');
  const events = ics.split('BEGIN:VEVENT').slice(1).map((b) => ({
    title: (b.match(/SUMMARY:(.*)/) || [])[1]?.trim(),
    start: (b.match(/DTSTART[^:]*:(\d{8}T\d{6})/) || [])[1],
  })).filter((e) => e.title && e.start && TRACKED.includes(e.title))
    .map((e) => ({ agency: 'BLS', title: e.title, date: `${e.start.slice(0, 4)}-${e.start.slice(4, 6)}-${e.start.slice(6, 8)}`, timeET: `${e.start.slice(9, 11)}:${e.start.slice(11, 13)}` }));
  if (events.length < 20) throw new Error('BLS ICS parse returned too few events');
  const html = await (await get('https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm')).text();
  const fomc = [];
  for (const yr of [new Date().getUTCFullYear(), new Date().getUTCFullYear() + 1]) {
    const i = html.indexOf(`${yr} FOMC Meetings`);
    if (i < 0) continue;
    const j = html.indexOf(`${yr - 1} FOMC Meetings`, i);
    const seg = html.slice(i, j > i ? j : i + 80000);
    for (const m of seg.matchAll(/fomc-meeting__month[^>]*>\s*<strong>([^<]+)<\/strong>[\s\S]*?fomc-meeting__date[^>]*>([^<]+)</g)) {
      const month = m[1].trim(); const days = m[2].trim();
      const sep = /\*/.test(days);
      const mm = month.split('/'); const dd = days.replace(/[*\s]/g, '').split('-');
      const lastMonth = mm[mm.length - 1];
      const mIdx = new Date(`${lastMonth} 1, ${yr}`).getMonth();
      if (Number.isNaN(mIdx)) continue;
      const lastDay = Number(dd[dd.length - 1].replace(/\D/g, ''));
      if (!lastDay) continue;
      fomc.push({ agency: 'Federal Reserve', title: 'FOMC meeting' + (sep ? ' (with Summary of Economic Projections)' : ''), label: `${month} ${days.replace('*', '')}`, date: `${yr}-${String(mIdx + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`, timeET: '14:00', sep });
    }
  }
  if (fomc.length < 6) throw new Error('FOMC parse returned too few meetings');
  return {
    asOf: nowIso(),
    source: 'BLS Economic News Release Schedule (iCalendar); Federal Reserve FOMC meeting calendar',
    sourceUrl: 'https://www.bls.gov/schedule/news_release/',
    sources: [
      { name: 'BLS release schedule (ICS)', url: 'https://www.bls.gov/schedule/news_release/bls.ics' },
      { name: 'Federal Reserve: FOMC meeting calendars', url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm' },
    ],
    note: 'FOMC statements are released at 2:00 p.m. ET on the final day of each meeting.',
    events: [...events, ...fomc].sort((a, b) => (a.date + a.timeET).localeCompare(b.date + b.timeET)),
  };
}

// ---------- U.S. Treasury daily par yield curve ----------
const TENORS = ['1 Mo', '2 Mo', '3 Mo', '4 Mo', '6 Mo', '1 Yr', '2 Yr', '3 Yr', '5 Yr', '7 Yr', '10 Yr', '20 Yr', '30 Yr'];
function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const head = lines[0].split(',').map((h) => h.replace(/"/g, '').trim());
  return lines.slice(1).map((l) => { const c = l.split(','); const o = {}; head.forEach((h, i) => (o[h] = c[i])); return o; });
}
async function treasury() {
  const y = new Date().getUTCFullYear();
  const rows = [];
  for (let yr = y - 9; yr <= y; yr++) {
    const url = `https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/${yr}/all?type=daily_treasury_yield_curve&field_tdr_date_value=${yr}&page&_format=csv`;
    const t = await (await get(url)).text();
    rows.push(...parseCsv(t));
    await new Promise((r) => setTimeout(r, 300));
  }
  const daily = rows.map((r) => {
    const [mm, dd, yyyy] = r.Date.split('/');
    const v = {};
    for (const t of TENORS) { const n = Number(r[t]); v[t] = r[t] === undefined || r[t] === '' || !Number.isFinite(n) ? null : n; }
    return { date: `${yyyy}-${mm}-${dd}`, ...v };
  }).sort((a, b) => a.date.localeCompare(b.date));
  if (daily.length < 1000) throw new Error('Treasury: too few rows');
  // month-end observations (last trading day of each month) for 10 years; full daily for last ~400 days
  const monthEnd = [];
  for (let i = 0; i < daily.length; i++) if (i === daily.length - 1 || daily[i + 1].date.slice(0, 7) !== daily[i].date.slice(0, 7)) monthEnd.push(daily[i]);
  return { asOf: nowIso(), source: 'U.S. Department of the Treasury, Daily Treasury Par Yield Curve Rates', sourceUrl: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve', tenors: TENORS, latest: daily[daily.length - 1], recentDaily: daily.slice(-400), monthEnd };
}

// ---------- ECB Data Portal ----------
async function ecbSeries(key, start) {
  const url = `https://data-api.ecb.europa.eu/service/data/${key}?format=csvdata&detail=dataonly&startPeriod=${start}`;
  const t = await (await get(url)).text();
  const obs = parseCsv(t).map((r) => ({ date: r.TIME_PERIOD, value: Number(r.OBS_VALUE) })).filter((o) => o.date && Number.isFinite(o.value));
  if (!obs.length) throw new Error('ECB empty ' + key);
  return { key, url: `https://data.ecb.europa.eu/data/datasets/${key.split('/')[0]}/${key.replace('/', '.')}`, observations: obs };
}
// Eurostat HICP (ECOICOP ver.2 dataset prc_hicp_minr; the legacy ECB ICP flow stopped at 2025-12).
async function eurostatHicp(code, start) {
  const url = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?geo=EA&unit=RCH_A&coicop18=${code}&sinceTimePeriod=${start}`;
  const j = await (await get(url)).json();
  const idx = j.dimension.time.category.index;
  const obs = Object.entries(idx).map(([date, i]) => ({ date, value: j.value[i] })).filter((o) => typeof o.value === 'number').sort((a, b) => a.date.localeCompare(b.date));
  if (obs.length < 24) throw new Error('Eurostat HICP too short ' + code);
  return { key: `prc_hicp_minr / EA / RCH_A / ${code}`, url: `https://ec.europa.eu/eurostat/databrowser/view/prc_hicp_minr/default/table?lang=en`, apiUrl: url, updated: j.updated, observations: obs };
}
async function ecb() {
  const y = new Date().getUTCFullYear();
  const start = `${y - 9}-01`;
  const hicp = await eurostatHicp('TOTAL', start);
  const core = await eurostatHicp('TOT_X_NRG_FOOD', start);
  const dfr = await ecbSeries('FM/B.U2.EUR.4F.KR.DFR.LEV', `${y - 9}-01-01`);
  const mro = await ecbSeries('FM/B.U2.EUR.4F.KR.MRR_FR.LEV', `${y - 9}-01-01`);
  const mlf = await ecbSeries('FM/B.U2.EUR.4F.KR.MLFR.LEV', `${y - 9}-01-01`);
  // Key-rate series are business-daily; keep only change points + last value to stay compact.
  const changes = (s) => s.observations.filter((o, i, a) => i === 0 || i === a.length - 1 || o.value !== a[i - 1].value);
  return {
    asOf: nowIso(), source: 'Eurostat HICP (prc_hicp_minr) and European Central Bank Data Portal (key rates)', sourceUrl: 'https://data.ecb.europa.eu/',
    hicp: { title: 'Euro area HICP, overall index, annual rate of change (%)', ...hicp },
    core: { title: 'Euro area HICP excluding energy, food, alcohol & tobacco, annual rate of change (%)', ...core },
    rates: {
      dfr: { title: 'Deposit facility rate (%)', key: dfr.key, url: dfr.url, changes: changes(dfr) },
      mro: { title: 'Main refinancing operations fixed rate (%)', key: mro.key, url: mro.url, changes: changes(mro) },
      mlf: { title: 'Marginal lending facility rate (%)', key: mlf.key, url: mlf.url, changes: changes(mlf) },
    },
  };
}

// Optional CLI filter, e.g. `node scripts/refresh.mjs ecb` (BLS v1 allows only 25 queries/day).
const only = process.argv.slice(2);
const jobs = { bls: ['bls.json', bls], calendar: ['calendar.json', calendar], treasury: ['treasury.json', treasury], ecb: ['ecb.json', ecb] };
for (const [name, [file, fn]] of Object.entries(jobs)) if (!only.length || only.includes(name)) await keepOrWrite(file, fn);
console.log(failures ? `refresh finished with ${failures} source failure(s); last good snapshots kept` : 'refresh ok');
process.exitCode = 0;
