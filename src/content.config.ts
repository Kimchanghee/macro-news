import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    question: z.string().min(5),
    answer: z.string().min(40),
    type: z.enum(['question', 'data', 'glossary', 'comparison']).default('question'),
    datePublished: z.coerce.date(),
    updated: z.coerce.date(),
    data_asof: z.string(),
    sources: z.array(z.object({ name: z.string(), url: z.string().url() })).min(1),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    indicators: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published']).default('published'),
  }),
});
export const collections = { guides };

