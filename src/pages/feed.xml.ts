import type { APIRoute } from 'astro';
import site from '../site.config';
import { getCollection } from 'astro:content';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const GET: APIRoute = async () => {
  const g = (await getCollection('guides')).filter((x) => x.data.status === 'published').sort((a, b) => +b.data.updated - +a.data.updated);
  const items = g.map((x) => `    <item><title>${esc(x.data.title)}</title><link>${site.url}/guides/${x.id}/</link><guid isPermaLink="true">${site.url}/guides/${x.id}/</guid><pubDate>${x.data.datePublished.toUTCString()}</pubDate><description>${esc(x.data.answer)}</description></item>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${esc(site.name)} — guides</title>\n    <link>${site.url}/guides/</link>\n    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>\n    <description>${esc(site.description)}</description>\n    <language>en-us</language>\n    <lastBuildDate>${(g[0]?.data.updated ?? new Date()).toUTCString()}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
