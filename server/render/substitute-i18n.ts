import type { Translations, Language } from '../../interfaces';

/**
 * Walk the document, replacing the text content of every [data-i18n] element
 * with the corresponding string from translations[lang], falling back to
 * translations[primary], then to the original text. <script> and <style>
 * elements are never touched.
 */
export function applyI18nSubstitution(
  doc: Document,
  translations: Translations | null | undefined,
  lang: Language,
  primary: Language,
): void {
  if (!translations) return;

  const nodes = doc.querySelectorAll('[data-i18n]');
  nodes.forEach((node) => {
    const tag = node.tagName.toLowerCase();
    if (tag === 'script' || tag === 'style') return;

    const key = node.getAttribute('data-i18n');
    if (!key) return;

    const targetText = translations[lang]?.strings?.[key];
    if (typeof targetText === 'string' && targetText.length > 0) {
      node.textContent = targetText;
      return;
    }

    const primaryText = translations[primary]?.strings?.[key];
    if (typeof primaryText === 'string' && primaryText.length > 0) {
      node.textContent = primaryText;
    }
  });
}
