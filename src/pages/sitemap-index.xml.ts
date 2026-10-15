import type { APIRoute } from 'astro';
import site from '../site.config';
import { allRoutes } from '../lib/routes';
export const GET: APIRoute = async () => {
  const r = await allRoutes();
  const last = r.map((x) => x.lastmod).sort().pop();
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${site.url}/sitemap-0.xml</loc><lastmod>${last}</lastmod></sitemap>\n</sitemapindex>\n`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
