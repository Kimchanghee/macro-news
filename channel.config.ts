import type { Locale } from './i18n';
export type Category = { slug: string; name: Partial<Record<Locale, string>>; };
export type RSSSource = { url: string; category: string; weight?: number; };
export const channel = {
  id: 'MACRO',
  name: '매크로시그널',
  tagline: '금리·연준·인플레이션 신호를 매일 빠르게',
  description: 'Fed·한국은행·ECB의 금리 결정, CPI, GDP, 고용지표 등 거시경제 신호를 초등생도 이해할 수 있게 풀어드립니다.',
  domain: 'macrosignal.live',
  accent: 'orange',
  keywords: ['거시경제', '금리', '연준', '인플레이션', 'CPI', 'GDP'],
  geo: { country: 'KR', region: 'Asia', primaryCity: 'Seoul' },
  rssSources: [
    { url: 'https://news.google.com/rss/search?q=%EC%97%B0%EC%A4%80+%EA%B8%88%EB%A6%AC&hl=ko&gl=KR&ceid=KR:ko', category: 'policy' },
    { url: 'https://news.google.com/rss/search?q=%EC%9D%B8%ED%94%8C%EB%A0%88%EC%9D%B4%EC%85%98+CPI&hl=ko&gl=KR&ceid=KR:ko', category: 'analysis' },
    { url: 'https://news.google.com/rss/search?q=federal+reserve+rate&hl=en&gl=US&ceid=US:en', category: 'policy' },
    { url: 'https://news.google.com/rss/search?q=inflation+CPI&hl=en&gl=US&ceid=US:en', category: 'breaking' },
    { url: 'https://news.google.com/rss/search?q=GDP+economy&hl=en&gl=US&ceid=US:en', category: 'analysis' }
  ] as RSSSource[],
  categories: [
    { slug: 'breaking', name: { ko: '속보', en: 'Breaking', ja: '速報', zh: '快讯', es: 'Última hora', pt: 'Última hora', de: 'Eilmeldung', fr: 'Dernières', ar: 'عاجل', hi: 'ब्रेकिंग', id: 'Terbaru' } },
    { slug: 'policy',   name: { ko: '통화정책', en: 'Monetary Policy', ja: '金融政策', zh: '货币政策', es: 'Política Monetaria', pt: 'Política Monetária', de: 'Geldpolitik', fr: 'Politique Monétaire', ar: 'السياسة النقدية', hi: 'मौद्रिक नीति', id: 'Kebijakan Moneter' } },
    { slug: 'analysis', name: { ko: '지표분석', en: 'Indicators', ja: '指標分析', zh: '指标分析', es: 'Indicadores', pt: 'Indicadores', de: 'Indikatoren', fr: 'Indicateurs', ar: 'المؤشرات', hi: 'संकेतक', id: 'Indikator' } },
    { slug: 'market',   name: { ko: '시장영향', en: 'Market Impact', ja: '市場影響', zh: '市场影响', es: 'Impacto en el mercado', pt: 'Impacto no mercado', de: 'Marktauswirkung', fr: 'Impact marché', ar: 'تأثير السوق', hi: 'बाज़ार पर असर', id: 'Dampak Pasar' } }
  ] as Category[]
};
export type ChannelConfig = typeof channel;
