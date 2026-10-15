// Central, config-driven site settings. Public IDs only; never put secrets here.
const env = (import.meta as any).env ?? {};

export const site = {
  domain: 'macrofinancenews.online',
  url: 'https://macrofinancenews.online',
  name: 'Macro Release Desk',
  shortName: 'Release Desk',
  description:
    'Macro Release Desk is an independent reference that tracks scheduled U.S. and euro-area economic releases and records each official print (CPI, jobs, wages, Treasury yields, ECB rates) with its source and date.',
  ga4Id: (env.PUBLIC_GA4_ID as string) || '',
  gscVerification: (env.PUBLIC_GSC_VERIFICATION as string) || '',
  naverVerification: (env.PUBLIC_NAVER_VERIFICATION as string) || '',
  adsenseClient: 'ca-pub-4490818204529253',
  contactEmail: 'contact@macrofinancenews.online',
  indexNowKey: '7c1e4a9d2b8f4e63a05d91c2e8b47f10',
  locale: 'en-US',
  // Affiliate URLs stay empty until the owner signs up; CTAs render only when set.
  affiliates: {} as Record<string, string>,
  // EEA + UK + CH regions for Consent Mode v2 "denied" defaults.
  consentRegions: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'],
} as const;

export default site;
