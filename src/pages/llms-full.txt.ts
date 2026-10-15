import type { APIRoute } from 'astro';
import site from '../site.config';
import { getCollection } from 'astro:content';
import { indicators } from '../lib/indicators';

export const GET: APIRoute = async () => {
  const g = (await getCollection('guides')).filter((x) => x.data.status === 'published');
  const ind = indicators.map((i) => `## ${i.name}\nURL: ${site.url}/indicators/${i.slug}/\nRetrieved: ${i.asOf}\n\n${i.answer}\n\n${i.insights.join('\n\n')}\n\nSources: ${i.sources.map((s) => s.url).join(', ')}`).join('\n\n');
  const guides = g.map((x) => `## ${x.data.title}\nURL: ${site.url}/guides/${x.id}/\nUpdated: ${x.data.updated.toISOString().slice(0, 10)}\n\n${x.data.answer}\n\n${(x.body ?? '').trim()}\n\nSources: ${x.data.sources.map((s) => s.url).join(', ')}`).join('\n\n');
  return new Response(`# ${site.name} — full text\n\n> ${site.description}\n\n# Indicators\n\n${ind}\n\n# Guides\n\n${guides}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
