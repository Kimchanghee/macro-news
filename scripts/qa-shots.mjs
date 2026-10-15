// QA screenshots + overflow/CLS/focus checks against a running `astro preview`.
// Usage: PLAYWRIGHT_BROWSERS_PATH=... node scripts/qa-shots.mjs http://localhost:4321 /,/indicators/cpi/
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire('D:/웹 수익 자동화/rebuild-202610/_qa-tools/package.json');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:4321';
const pages = (process.argv[3] || '/').split(',');
const outDir = path.resolve('qa', 'shots');
await mkdir(outDir, { recursive: true });
// Contract browser cache (_pw-browsers) is absent on this host; fall back to the installed Chrome/Edge channel.
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome' });
const report = [];
for (const width of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width, height: width > 500 ? 900 : 844 }, deviceScaleFactor: 1 });
  for (const p of pages) {
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      window.__cls = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    const res = await page.goto(base + p, { waitUntil: 'networkidle' }).catch((e) => ({ status: () => 'ERR ' + e.message }));
    await page.waitForTimeout(500);
    const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, cls: window.__cls }));
    await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
    const focus = await page.evaluate(() => { const a = document.activeElement; if (!a) return null; const s = getComputedStyle(a); return { tag: a.tagName, text: (a.textContent || '').trim().slice(0, 30), outline: s.outlineStyle + ' ' + s.outlineWidth }; });
    const name = `${p === '/' ? 'home' : p.replace(/\//g, '_').replace(/^_|_$/g, '')}-${width}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
    report.push({ page: p, width, status: res.status(), overflow: m.sw > m.cw, scrollWidth: m.sw, cls: Number(m.cls.toFixed(4)), focus, shot: `qa/shots/${name}` });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
await writeFile(path.resolve('qa', 'shots-report.json'), JSON.stringify(report, null, 2));
console.table(report.map((r) => ({ page: r.page, w: r.width, status: r.status, overflow: r.overflow, cls: r.cls, focus: r.focus && r.focus.outline })));

