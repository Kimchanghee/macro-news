// Build-time inline SVG charts. No client JS. Every chart ships <title>/<desc> and a table elsewhere on the page.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function niceTicks(min, max, count = 5) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const step0 = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag;
  const step = (norm >= 5 ? 10 : norm >= 2 ? 5 : norm >= 1 ? 2 : 1) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Number(v.toFixed(10)));
  return { lo, hi, ticks, step };
}

/**
 * @param {{x:string,y:number|null}[]} points  x = label (YYYY-MM or YYYY-MM-DD)
 * @param {{title:string,desc:string,unit?:string,kind?:'line'|'bar'|'step',w?:number,h?:number,decimals?:number,zero?:boolean,ref?:number|null,xLabel?:(x:string)=>string}} o
 */
export function chart(points, o) {
  const W = o.w ?? 600, H = o.h ?? 290;
  const pad = { l: 46, r: 14, t: 14, b: 30 };
  const pts = points.filter((p) => p.y != null && Number.isFinite(p.y));
  if (pts.length < 2) return `<p class="chart-empty">Not enough observations to draw a chart.</p>`;
  let ymin = Math.min(...pts.map((p) => p.y)), ymax = Math.max(...pts.map((p) => p.y));
  if (o.zero || o.kind === 'bar') { ymin = Math.min(0, ymin); ymax = Math.max(0, ymax); }
  if (o.ref != null) { ymin = Math.min(ymin, o.ref); ymax = Math.max(ymax, o.ref); }
  const { lo, hi, ticks } = niceTicks(ymin, ymax, 5);
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const X = (i) => pad.l + (pts.length === 1 ? iw / 2 : (i / (pts.length - 1)) * iw);
  const Y = (v) => pad.t + ih - ((v - lo) / (hi - lo)) * ih;
  const d = o.decimals ?? 1;
  const xl = o.xLabel ?? ((x) => x.slice(0, 4));
  let g = '';
  for (const t of ticks) {
    g += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${Y(t).toFixed(1)}" y2="${Y(t).toFixed(1)}" class="${t === 0 ? 'c-zero' : 'c-grid'}"/>`;
    g += `<text x="${pad.l - 6}" y="${(Y(t) + 4).toFixed(1)}" class="c-yl" text-anchor="end">${esc(t.toFixed(Math.abs(ticks[1] - ticks[0]) < 1 ? 1 : 0))}</text>`;
  }
  // x labels: first point of each year, thinned
  const yearIdx = [];
  pts.forEach((p, i) => { if (i === 0 || xl(p.x) !== xl(pts[i - 1].x)) yearIdx.push(i); });
  const every = Math.ceil(yearIdx.length / 8);
  yearIdx.filter((_, k) => k % every === 0).forEach((i) => {
    g += `<line x1="${X(i).toFixed(1)}" x2="${X(i).toFixed(1)}" y1="${pad.t + ih}" y2="${pad.t + ih + 4}" class="c-axis"/>`;
    g += `<text x="${X(i).toFixed(1)}" y="${H - 8}" class="c-xl" text-anchor="middle">${esc(xl(pts[i].x))}</text>`;
  });
  if (o.ref != null) g += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${Y(o.ref).toFixed(1)}" y2="${Y(o.ref).toFixed(1)}" class="c-ref"/><text x="${W - pad.r}" y="${(Y(o.ref) - 5).toFixed(1)}" class="c-reflabel" text-anchor="end">${esc(o.refLabel ?? '')}</text>`;
  let body = '';
  if (o.kind === 'bar') {
    const bw = Math.max(1, (iw / pts.length) * 0.7);
    pts.forEach((p, i) => {
      const y0 = Y(0), y1 = Y(p.y);
      body += `<rect x="${(X(i) - bw / 2).toFixed(1)}" y="${Math.min(y0, y1).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(0.5, Math.abs(y1 - y0)).toFixed(1)}" class="${p.y < 0 ? 'c-bar-neg' : 'c-bar'}"/>`;
    });
  } else {
    let path = '';
    pts.forEach((p, i) => {
      if (o.kind === 'step' && i > 0) path += `L${X(i).toFixed(1)},${Y(pts[i - 1].y).toFixed(1)}`;
      path += `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`;
    });
    body += `<path d="${path}" class="c-line"/>`;
    const last = pts[pts.length - 1];
    body += `<circle cx="${X(pts.length - 1).toFixed(1)}" cy="${Y(last.y).toFixed(1)}" r="3.5" class="c-dot"/>`;
  }
  const last = pts[pts.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-labelledby="ct-${o.id} cd-${o.id}" preserveAspectRatio="xMidYMid meet"><title id="ct-${o.id}">${esc(o.title)}</title><desc id="cd-${o.id}">${esc(o.desc)} Latest: ${esc(last.x)} ${esc(last.y.toFixed(d))}${esc(o.unit ?? '')}.</desc><line x1="${pad.l}" x2="${W - pad.r}" y1="${pad.t + ih}" y2="${pad.t + ih}" class="c-axis"/>${g}${body}</svg>`;
}

/** Yield-curve shape chart: categorical x (tenors). */
export function curveChart(series, o) {
  const W = o.w ?? 600, H = o.h ?? 270;
  const pad = { l: 46, r: 14, t: 14, b: 30 };
  const all = series.flatMap((s) => s.values.filter((v) => v != null));
  const { lo, hi, ticks } = niceTicks(Math.min(...all), Math.max(...all), 5);
  const n = o.labels.length;
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const X = (i) => pad.l + (i / (n - 1)) * iw;
  const Y = (v) => pad.t + ih - ((v - lo) / (hi - lo)) * ih;
  let g = '';
  for (const t of ticks) g += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${Y(t).toFixed(1)}" y2="${Y(t).toFixed(1)}" class="c-grid"/><text x="${pad.l - 6}" y="${(Y(t) + 4).toFixed(1)}" class="c-yl" text-anchor="end">${t.toFixed(1)}</text>`;
  o.labels.forEach((l, i) => { g += `<text x="${X(i).toFixed(1)}" y="${H - 8}" class="c-xl" text-anchor="middle">${esc(l.replace(' Mo', 'M').replace(' Yr', 'Y'))}</text>`; });
  let body = '';
  series.forEach((s, k) => {
    let p = '';
    s.values.forEach((v, i) => { if (v == null) return; p += `${p ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`; });
    body += `<path d="${p}" class="${k === 0 ? 'c-line' : 'c-line2'}"/>`;
    if (k === 0) s.values.forEach((v, i) => { if (v != null) body += `<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="2.6" class="c-dot"/>`; });
  });
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-labelledby="ct-${o.id} cd-${o.id}"><title id="ct-${o.id}">${esc(o.title)}</title><desc id="cd-${o.id}">${esc(o.desc)}</desc><line x1="${pad.l}" x2="${W - pad.r}" y1="${pad.t + ih}" y2="${pad.t + ih}" class="c-axis"/>${g}${body}</svg>`;
}
