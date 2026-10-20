import { getCollection } from 'astro:content';
import calendar from '../data/calendar.json';
import { indicators } from './indicators';

export type RouteEntry = { path: string; lastmod: string; title: string; summary: string; kind: 'home' | 'data' | 'guide' | 'page' };

export async function allRoutes(): Promise<RouteEntry[]> {
  const guides = (await getCollection('guides')).filter((g) => g.data.status === 'published');
  const latestGuide = guides.map((g) => g.data.updated.toISOString().slice(0, 10)).sort().pop() ?? '2026-10-15';
  const latestData = indicators.map((i) => i.asOf.slice(0, 10)).sort().pop()!;
  return [
    { path: '/', lastmod: calendar.asOf.slice(0, 10), title: 'Release board (this week and next)', summary: 'Scheduled U.S. releases and FOMC meetings this week and next, with the latest official print for each tracked indicator.', kind: 'home' },
    { path: '/calendar/', lastmod: calendar.asOf.slice(0, 10), title: 'Economic release calendar (90 days)', summary: 'Dates and Eastern times of BLS releases and FOMC decisions.', kind: 'data' },
    { path: '/calendar/us-cpi-release/', lastmod: calendar.asOf.slice(0, 10), title: 'When is the next U.S. CPI release?', summary: 'Next scheduled BLS Consumer Price Index release date and Eastern time, with upcoming dates from the BLS schedule.', kind: 'data' },
    { path: '/calendar/us-jobs-report-release/', lastmod: calendar.asOf.slice(0, 10), title: 'When is the next U.S. jobs report?', summary: 'Next scheduled BLS Employment Situation release date and Eastern time, with upcoming dates from the BLS schedule.', kind: 'data' },
    { path: '/indicators/', lastmod: latestData, title: 'Indicator ledger', summary: 'All tracked indicators with latest value and series ID.', kind: 'data' },
    ...indicators.map((i) => ({ path: `/indicators/${i.slug}/`, lastmod: i.asOf.slice(0, 10), title: i.name, summary: i.answer, kind: 'data' as const })),
    { path: '/guides/', lastmod: latestGuide, title: 'Guides', summary: 'How to read each economic release.', kind: 'page' },
    ...guides.map((g) => ({ path: `/guides/${g.id}/`, lastmod: g.data.updated.toISOString().slice(0, 10), title: g.data.title, summary: g.data.answer, kind: 'guide' as const })),
    { path: '/methodology/', lastmod: latestData, title: 'Methodology and data sources', summary: 'Sources, refresh cycle and formulas.', kind: 'page' },
    { path: '/about/', lastmod: '2026-10-15', title: 'About and editorial standards', summary: 'Who runs the desk and how figures are sourced and corrected.', kind: 'page' },
    { path: '/contact/', lastmod: '2026-10-15', title: 'Contact', summary: 'Corrections and questions.', kind: 'page' },
    { path: '/privacy/', lastmod: '2026-10-15', title: 'Privacy policy', summary: 'Analytics, ads and consent.', kind: 'page' },
    { path: '/terms/', lastmod: '2026-10-15', title: 'Terms of use', summary: 'Terms.', kind: 'page' },
    { path: '/disclaimer/', lastmod: '2026-10-15', title: 'Disclaimer', summary: 'Not investment advice.', kind: 'page' },
  ];
}
