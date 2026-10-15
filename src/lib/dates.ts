/** Today's date in U.S. Eastern time (YYYY-MM-DD), evaluated at build time. */
export function todayET(d = new Date()): string {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d);
  const g = (t: string) => p.find((x) => x.type === t)!.value;
  return `${g('year')}-${g('month')}-${g('day')}`;
}

/** Map a calendar event title to the indicator page that covers it, if any. */
export function eventLink(title: string): string | null {
  if (title === 'Consumer Price Index') return '/indicators/cpi/';
  if (title === 'Employment Situation') return '/indicators/nonfarm-payrolls/';
  if (title === 'Real Earnings') return '/indicators/average-hourly-earnings/';
  if (title.startsWith('FOMC')) return '/guides/how-fomc-decisions-work/';
  return null;
}
