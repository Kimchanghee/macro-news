// Generates 1200x630 Open Graph PNGs (briefing-book cover style) at build time via sharp.
import sharp from 'sharp';
import { readdir, readFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public', 'og');
await mkdir(out, { recursive: true });
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, max) {
  const words = text.split(/\s+/); const lines = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > max) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
  if (cur.trim()) lines.push(cur.trim());
  return lines.slice(0, 4);
}

function card({ kicker, title, foot }) {
  const lines = wrap(title, 30);
  const tl = lines.map((l, i) => `<text x="96" y="${250 + i * 74}" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="600" fill="#17191f">${esc(l)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#22324d"/>
  <rect x="40" y="36" width="1120" height="558" fill="#f4f0e6"/>
  <rect x="40" y="36" width="1120" height="12" fill="#8b1d1d"/>
  <text x="96" y="122" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="5" fill="#8b1d1d">${esc(kicker.toUpperCase())}</text>
  <line x1="96" x2="1104" y1="150" y2="150" stroke="#17191f" stroke-width="3"/>
  <line x1="96" x2="1104" y1="157" y2="157" stroke="#17191f" stroke-width="1"/>
  ${tl}
  <line x1="96" x2="1104" y1="520" y2="520" stroke="#b9b09a" stroke-width="2"/>
  <text x="96" y="562" font-family="Georgia, serif" font-size="30" font-weight="600" fill="#17191f">Macro Release Desk</text>
  <text x="1104" y="562" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#44474f">${esc(foot)}</text>
</svg>`;
}

const cards = [
  { file: 'home', kicker: 'Briefing book', title: 'This week’s economic releases and the latest official prints', foot: 'macrofinancenews.online' },
  { file: 'guides', kicker: 'Guides', title: 'How to read U.S. and euro area economic releases', foot: 'Sourced to BLS, Treasury, Eurostat, Fed, ECB' },
  { file: 'ind-cpi', kicker: 'Indicator brief · BLS', title: 'U.S. CPI inflation: latest print, history and schedule', foot: 'Series CUUR0000SA0' },
  { file: 'ind-core-cpi', kicker: 'Indicator brief · BLS', title: 'Core CPI inflation: latest print and history', foot: 'Series CUUR0000SA0L1E' },
  { file: 'ind-unemployment-rate', kicker: 'Indicator brief · BLS', title: 'U.S. unemployment rate: latest reading and trend', foot: 'Series LNS14000000' },
  { file: 'ind-nonfarm-payrolls', kicker: 'Indicator brief · BLS', title: 'Nonfarm payrolls: monthly job gains and revisions', foot: 'Series CES0000000001' },
  { file: 'ind-average-hourly-earnings', kicker: 'Indicator brief · BLS', title: 'Average hourly earnings: U.S. wage growth', foot: 'Series CES0500000003' },
  { file: 'ind-treasury-yield-curve', kicker: 'Indicator brief · Treasury', title: 'Treasury yield curve: 2-year, 10-year and spread', foot: 'Daily par yield curve' },
  { file: 'ind-euro-area-inflation', kicker: 'Indicator brief · Eurostat', title: 'Euro area HICP inflation: headline and core', foot: 'Eurostat prc_hicp_minr' },
  { file: 'ind-ecb-interest-rates', kicker: 'Indicator brief · ECB', title: 'ECB key interest rates: deposit, MRO, lending', foot: 'ECB Data Portal' },
];
const gdir = path.join(root, 'src', 'content', 'guides');
for (const f of (await readdir(gdir)).filter((x) => x.endsWith('.md'))) {
  const t = await readFile(path.join(gdir, f), 'utf8');
  const title = (t.match(/^title:\s*"?(.+?)"?\s*$/m) || [])[1];
  if (title) cards.push({ file: `guide-${f.replace(/\.md$/, '')}`, kicker: 'Guide', title, foot: 'macrofinancenews.online/guides' });
}
let n = 0;
for (const c of cards) {
  const target = path.join(out, `${c.file}.png`);
  await sharp(Buffer.from(card(c))).png({ compressionLevel: 9, palette: true }).toFile(target);
  n++;
}
// logo for Organization LD (square)
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="#22324d"/><rect x="64" y="80" width="384" height="352" fill="#f4f0e6"/><rect x="64" y="80" width="384" height="40" fill="#8b1d1d"/><text x="256" y="320" text-anchor="middle" font-family="Georgia, serif" font-size="150" font-weight="700" fill="#17191f">MRD</text></svg>`)).png().toFile(path.join(root, 'public', 'logo.png'));
console.log(`og: wrote ${n} cards`);
