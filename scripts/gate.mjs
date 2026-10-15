// Publish gate (fire-your-seo-agency Phase 5 §4-4) run against the built dist/.
// Every page must pass; exits 1 on any failure.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const cfg = await readFile(path.join(root, 'src', 'site.config.ts'), 'utf8');
const SITE = 'https://' + cfg.match(/domain:\s*'([^']+)'/)[1];
const KEY = cfg.match(/indexNowKey:\s*'([^']+)'/)[1];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&nbsp;/g, ' ');
const norm = (s) => decode(s).replace(/\s+/g, ' ').trim();
const visible = (html) => norm(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '));
const attr = (html, re) => { const m = html.match(re); return m ? decode(m[1]) : null; };

const failures = [];
const warn = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);

for (const f of ['robots.txt', 'sitemap-index.xml', 'sitemap-0.xml', 'llms.txt', 'ads.txt', 'feed.xml', `${KEY}.txt`, '404.html']) {
  try { await stat(path.join(dist, f)); } catch { fail('/', `missing ${f}`); }
}
const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8').catch(() => '');
if (!/Sitemap:\s*https:\/\//.test(robots) || /Disallow:\s*\/\s*$/m.test(robots)) fail('/robots.txt', 'robots must allow all and list sitemap');
const ads = await readFile(path.join(dist, 'ads.txt'), 'utf8').catch(() => '');
if (!ads.includes('google.com, pub-4490818204529253, DIRECT, f08c47fec0942fa0')) fail('/ads.txt', 'wrong ads.txt');
const sitemap = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8').catch(() => '');
const inSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
for (const m of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) if (!/^\d{4}-\d{2}-\d{2}/.test(m[1])) fail('/sitemap-0.xml', `bad lastmod ${m[1]}`);

const titles = new Map(), descs = new Map();
const files = await walk(dist);
let pages = 0;
for (const file of files) {
  const rel = '/' + path.relative(dist, file).replace(/\\/g, '/');
  const is404 = rel === '/404.html';
  const urlPath = is404 ? '/404/' : rel.replace(/index\.html$/, '');
  const html = await readFile(file, 'utf8');
  pages++;
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const canon = attr(html, /<link rel="canonical" href="([^"]*)"/);
  if (!title || title.length < 50 || title.length > 60) fail(urlPath, `title length ${title?.length}: "${title}"`);
  if (!desc || desc.length < 150 || desc.length > 160) fail(urlPath, `description length ${desc?.length}: "${desc}"`);
  if (!is404 && canon !== SITE + urlPath) fail(urlPath, `canonical ${canon} != ${SITE + urlPath}`);
  if (/noindex/i.test(html)) fail(urlPath, 'contains noindex');
  if (!/<h1[\s>]/.test(html)) fail(urlPath, 'no h1');
  if ((html.match(/<h1[\s>]/g) || []).length > 1) fail(urlPath, 'multiple h1');
  if (titles.has(title)) fail(urlPath, `duplicate title with ${titles.get(title)}`); else titles.set(title, urlPath);
  if (descs.has(desc)) fail(urlPath, `duplicate description with ${descs.get(desc)}`); else descs.set(desc, urlPath);
  const og = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (!og) fail(urlPath, 'no og:image');
  else { try { await stat(path.join(dist, og.replace(SITE, ''))); } catch { fail(urlPath, `og image missing ${og}`); } }
  const text = visible(html.replace(/<head>[\s\S]*?<\/head>/, ''));
  if (/lorem ipsum|\bTODO\b|\bTBD\b|\bundefined\b|\bNaN\b|\[object Object\]|placeholder/i.test(text)) fail(urlPath, 'placeholder/undefined text in visible content');
  // JSON-LD: parse + match visible text
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1]); } catch (e) { fail(urlPath, 'invalid JSON-LD'); continue; }
    if (['Review', 'AggregateRating', 'Offer'].includes(j['@type'])) fail(urlPath, `forbidden LD type ${j['@type']}`);
    if ((j['@type'] === 'Article' || j['@type'] === 'TechArticle') && !text.includes(norm(j.headline))) fail(urlPath, `Article headline not visible: ${j.headline}`);
    if ((j['@type'] === 'Article' || j['@type'] === 'TechArticle') && !j.dateModified) fail(urlPath, 'Article without dateModified');
    if (j['@type'] === 'FAQPage') for (const q of j.mainEntity) {
      if (!text.includes(norm(q.name))) fail(urlPath, `FAQ question not visible: ${q.name}`);
      if (!text.includes(norm(q.acceptedAnswer.text))) fail(urlPath, `FAQ answer not visible: ${q.name}`);
    }
    if (j['@type'] === 'BreadcrumbList' && !/class="crumbs"/.test(html)) fail(urlPath, 'BreadcrumbList without visible breadcrumbs');
  }
  if (is404) continue;
  if (!inSitemap.has(SITE + urlPath)) fail(urlPath, 'not in sitemap');
  const ans = html.match(/id="answer"[^>]*>([\s\S]*?)<\/p>/);
  if (!ans) fail(urlPath, 'no direct answer paragraph (#answer)');
  else { const w = visible(ans[1]).split(' ').length; if (w < 15) fail(urlPath, `direct answer too short (${w} words)`); if (w > 90) warn.push(`${urlPath}: direct answer is ${w} words`); }
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const internal = new Set([...main.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]).filter((h) => h !== urlPath));
  if (internal.size < 2) fail(urlPath, `only ${internal.size} internal links in main`);
  for (const h of internal) {
    const target = h.endsWith('/') ? path.join(dist, h, 'index.html') : path.join(dist, h);
    try { await stat(target); } catch { fail(urlPath, `broken internal link ${h}`); }
  }
  if (/^\/(guides|indicators)\/[^/]+\/$/.test(urlPath) || urlPath === '/methodology/' || urlPath === '/calendar/') {
    const ext = [...main.matchAll(/href="(https?:\/\/[^"]+)"/g)].filter((m) => !m[1].startsWith(SITE));
    if (ext.length < 1) fail(urlPath, 'no external source links');
  }
}
const llms = await readFile(path.join(dist, 'llms.txt'), 'utf8').catch(() => '');
for (const u of inSitemap) if (!llms.includes(u)) warn.push(`llms.txt missing ${u}`);

console.log(`gate: ${pages} HTML pages, ${inSitemap.size} sitemap URLs`);
for (const w of warn) console.log('warn ', w);
if (failures.length) { for (const f of failures) console.error('FAIL ', f); console.error(`gate: ${failures.length} failure(s)`); process.exit(1); }
console.log('gate: PASS');
