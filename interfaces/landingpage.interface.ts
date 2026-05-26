export interface LandingPage {
  id: string;
  createAt: string;
  updateAt: string;
  name: string;
  title: string;
  description: string;
  backgroundImage: string;
  icon: string | null;
  language: Language;
  primaryLanguage?: string | null;
  supportedLanguages?: string[];
  translations?: Translations | null;
  html: string;
  json: string;
  viewCount: number | null;
  mainButton: string;
  directLink?: string | null;
  secondOffer?: string | null;
  backOffer?: string | null;
  percent: number;
  categoryId: string | null;
  creatorId: string;
  domainId: string | null;
}
export type Language =
  | "th"
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "hr"
  | "de-ch"
  | "fr-ch"
  | "it-ch"
  | "nl"
  | "fi"
  | "no"
  | "sv"
  | "ro"
  | "hu"
  | "pl"
  | "cs";

export interface LandingPageTranslation {
  strings: Record<string, string>;
  title: string;
  description: string;
}

export type Translations = Partial<Record<Language, LandingPageTranslation>>;
