// Hand-computed cases for build-time macro computations (node:test).
import test from 'node:test';
import assert from 'node:assert/strict';
import { shiftMonth, pctChange, diff, annualized, avgChange, range, spread, streak, signed, fmt, weekStart, addDays, fitText, yoySeries } from '../src/lib/calc.mjs';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

test('shiftMonth crosses year boundaries', () => {
  assert.equal(shiftMonth('2026-01', -1), '2025-12');
  assert.equal(shiftMonth('2026-09', -12), '2025-09');
  assert.equal(shiftMonth('2025-12', 1), '2026-01');
  assert.equal(shiftMonth('2026-03', -27), '2023-12');
});

const cpi = [
  { date: '2025-09', value: 320.0 },
  { date: '2026-08', value: 328.0 },
  { date: '2026-09', value: 329.6 },
];

test('pctChange: YoY and MoM by hand', () => {
  // 329.6 / 320 - 1 = 3.0%
  near(pctChange(cpi, '2026-09', 12), 3.0);
  // 329.6 / 328 - 1 = 0.487804...%
  near(pctChange(cpi, '2026-09', 1), (1.6 / 328) * 100);
  assert.equal(pctChange(cpi, '2026-08', 12), null); // base month missing -> null, never interpolated
});

test('diff: payroll level change', () => {
  const p = [{ date: '2026-08', value: 158900 }, { date: '2026-09', value: 159044 }];
  assert.equal(diff(p, '2026-09', 1), 144);
  assert.equal(diff(p, '2026-08', 1), null);
});

test('annualized 3-month rate compounds', () => {
  const s = [{ date: '2026-06', value: 100 }, { date: '2026-09', value: 101 }];
  // (1.01)^(12/3) - 1 = 4.060401%
  near(annualized(s, '2026-09', 3), 4.060401, 1e-6);
});

test('avgChange of last n monthly changes', () => {
  const p = [100, 110, 130, 160].map((v, i) => ({ date: `2026-0${i + 1}`, value: v }));
  // changes 10, 20, 30 -> avg of last 3 = 20; last 2 = 25
  assert.equal(avgChange(p, 3), 20);
  assert.equal(avgChange(p, 2), 25);
  assert.equal(avgChange(p, 4), null);
});

test('range and streak', () => {
  const s = [3.5, 4.1, 3.9, 4.2, 4.2].map((v, i) => ({ date: `2026-0${i + 1}`, value: v }));
  const r = range(s);
  assert.equal(r.min.value, 3.5); assert.equal(r.max.value, 4.2); assert.equal(r.max.date, '2026-04');
  assert.equal(streak(s, (o) => o.value >= 4.0), 2);
});

test('yield spread 10y-2y from Treasury 2026-10-14 snapshot', () => {
  near(spread(5.19, 4.82), 0.37, 1e-9);
  near(spread(5.19, 4.28), 0.91, 1e-9);
  assert.equal(spread(null, 4.82), null);
});

test('signed/fmt formatting uses true minus sign', () => {
  assert.equal(signed(0.3), '+0.3');
  assert.equal(signed(-0.25, 2), '−0.25');
  assert.equal(signed(0), '0.0');
  assert.equal(signed(null), '—');
  assert.equal(fmt(-1.234, 2), '−1.23');
});

test('weekStart is Monday (UTC) and addDays', () => {
  assert.equal(weekStart('2026-10-15'), '2026-10-12'); // Thursday -> Monday
  assert.equal(weekStart('2026-10-12'), '2026-10-12');
  assert.equal(weekStart('2026-10-18'), '2026-10-12'); // Sunday
  assert.equal(addDays('2026-12-30', 3), '2027-01-02');
});

test('fitText respects 150-160 bounds', () => {
  const t = fitText('a'.repeat(120), ['b'.repeat(35), 'c'.repeat(5)]);
  assert.ok(t.length >= 150 && t.length <= 160, String(t.length));
});

test('yoySeries only emits months with a real base', () => {
  const s = yoySeries(cpi);
  assert.equal(s.length, 1);
  assert.equal(s[0].date, '2026-09');
});
