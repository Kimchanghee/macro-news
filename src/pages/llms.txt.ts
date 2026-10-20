import type { APIRoute } from 'astro';
import site from '../site.config';
import { allRoutes } from '../lib/routes';
import { indicators } from '../lib/indicators';
import calendar from '../data/calendar.json';

export const GET: APIRoute = async () => {
  const r = await allRoutes();
  const stamp = [calendar.asOf, ...indicators.map((i) => i.asOf)].map((d) => d.slice(0, 10)).sort().pop();
  const sec = (k: string) => r.filter((x) => x.kind === k).map((x) => `- [${x.title}](${site.url}${x.path}): ${x.summary}`).join('\n');
  const body = `# ${site.name}

> ${site.description}

Last updated: ${stamp} (latest data retrieval date; calendar and indicator data refresh daily).

Entity: ${site.name} (${site.domain}) is an independent reference site. It reproduces official statistics from the U.S. Bureau of Labor Statistics, the U.S. Treasury, Eurostat, the Federal Reserve and the European Central Bank, each with reference period, retrieval time and source link. It publishes no forecasts and no investment advice.

## Latest official prints (snapshot)
${indicators.map((i) => `- ${i.name}: ${i.headline}${i.headlineUnit} (${i.latestLabel}; source ${i.agency}; retrieved ${i.asOf.slice(0, 10)})`).join('\n')}

## Data pages
${sec('home')}
${sec('data')}

## Guides
${sec('guide')}

## About
${sec('page')}

Full text of guides: ${site.url}/llms-full.txt
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
