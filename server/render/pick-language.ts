import type { Language } from '../../interfaces';

interface ParsedEntry {
  lang: string;
  q: number;
}

function parseAcceptLanguage(header: string): ParsedEntry[] {
  return header
    .split(',')
    .map((part) => {
      const [tagRaw, ...params] = part.trim().split(';');
      const tag = tagRaw.trim().toLowerCase();
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? Number(qParam.split('=')[1]) : 1;
      return { lang: tag, q: Number.isFinite(q) ? q : 0 };
    })
    .filter((e) => e.lang.length > 0)
    .sort((a, b) => b.q - a.q);
}

export function pickLanguage(
  header: string | null | undefined,
  supported: readonly Language[],
  fallback: Language,
): Language {
  if (supported.length === 0) return fallback;
  if (!header) return fallback;

  const supportedSet = new Set<string>(supported);
  for (const { lang } of parseAcceptLanguage(header)) {
    if (supportedSet.has(lang)) return lang as Language;
    const base = lang.split('-')[0];
    if (supportedSet.has(base)) return base as Language;
  }
  return fallback;
}
