// Pure computations used at build time. Tested in tests/calc.test.mjs.

/** @param {{date:string,value:number}[]} obs @param {string} date YYYY-MM */
export function findObs(obs, date) {
  return obs.find((o) => o.date === date) ?? null;
}

/** Shift a YYYY-MM month string by n months. */
export function shiftMonth(ym, n) {
  const [y, m] = ym.split('-').map(Number);
  const t = y * 12 + (m - 1) + n;
  return `${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, '0')}`;
}

/** Percent change of value at `date` vs `lag` months earlier; null when either is missing. */
export function pctChange(obs, date, lag) {
  const a = findObs(obs, date);
  const b = findObs(obs, shiftMonth(date, -lag));
  if (!a || !b || b.value === 0) return null;
  return ((a.value / b.value) - 1) * 100;
}

/** Level difference vs `lag` months earlier. */
export function diff(obs, date, lag) {
  const a = findObs(obs, date);
  const b = findObs(obs, shiftMonth(date, -lag));
  if (!a || !b) return null;
  return a.value - b.value;
}

/** Derived series of YoY % changes (12-month). */
export function yoySeries(obs) {
  return obs.map((o) => ({ date: o.date, value: pctChange(obs, o.date, 12) })).filter((o) => o.value !== null);
}

/** Annualized rate from the change over `months` months (compounded). */
export function annualized(obs, date, months) {
  const a = findObs(obs, date);
  const b = findObs(obs, shiftMonth(date, -months));
  if (!a || !b || b.value <= 0) return null;
  return (Math.pow(a.value / b.value, 12 / months) - 1) * 100;
}

/** Average of last n monthly level changes (e.g. payroll gains). */
export function avgChange(obs, n) {
  if (obs.length < n + 1) return null;
  const tail = obs.slice(-(n + 1));
  let s = 0;
  for (let i = 1; i < tail.length; i++) s += tail[i].value - tail[i - 1].value;
  return s / n;
}

/** Min / max with dates over a window of the most recent n observations. */
export function range(obs, n = obs.length) {
  const w = obs.slice(-n);
  let min = w[0], max = w[0];
  for (const o of w) { if (o.value < min.value) min = o; if (o.value > max.value) max = o; }
  return { min, max };
}

/** Spread between two tenors in percentage points (e.g. 10Y minus 2Y). */
export function spread(a, b) {
  if (a == null || b == null) return null;
  return a - b;
}

/** Count consecutive observations (from the end) where predicate holds. */
export function streak(obs, pred) {
  let n = 0;
  for (let i = obs.length - 1; i >= 0; i--) { if (pred(obs[i], i)) n++; else break; }
  return n;
}

/** Round to fixed decimals and return a signed string (e.g. "+0.3"). */
export function signed(v, d = 1) {
  if (v == null || !Number.isFinite(v)) return '—';
  const s = v.toFixed(d);
  return v > 0 ? `+${s}` : s === (0).toFixed(d) ? s : s.replace('-', '−');
}

export function fmt(v, d = 1) {
  if (v == null || !Number.isFinite(v)) return '—';
  return v.toFixed(d).replace('-', '−');
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export function monthName(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
export function shortMonth(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1].slice(0, 3)} ${y}`;
}
export function longDate(iso) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** ISO week window helpers in UTC (Mon..Sun) for the release board. */
export function weekStart(isoDate) {
  const d = new Date(isoDate.slice(0, 10) + 'T00:00:00Z');
  const dow = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}
export function addDays(isoDate, n) {
  const d = new Date(isoDate.slice(0, 10) + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Fit text into [min,max] by appending optional clauses; trims at word boundary if too long. */
export function fitText(base, extras = [], min = 150, max = 160) {
  let s = base.trim();
  for (const e of extras) {
    if (s.length >= min) break;
    const cand = `${s} ${e.trim()}`;
    if (cand.length <= max) s = cand;
  }
  if (s.length > max) {
    s = s.slice(0, max - 1);
    s = s.slice(0, s.lastIndexOf(' ')).replace(/[,;:.]$/, '') + '…';
  }
  return s;
}
