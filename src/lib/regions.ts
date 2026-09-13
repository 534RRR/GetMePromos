export interface Region {
  code: string;        // e.g. 'US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL'
  slug: string;        // URL path slug: 'us', 'uk', 'au', 'ca', 'de', 'fr', 'it', 'nl'
  name: string;        // Display name
  fullName: string;    // Full country name
  flag: string;        // Flag emoji
  lang: string;        // National language ISO code ('en', 'de', 'fr', 'it', 'nl')
  langName: string;    // National language name
  currencySymbol: string;
  currencyCode: string;
}

// Strictly ordered as requested by user:
// 1. USA, 2. UK, 3. AUSTRALIA, 4. CANADA, 5. GERMANY, then the rest (France, Italy, Netherlands)
export const REGIONS: Region[] = [
  {
    code: 'US',
    slug: 'us',
    name: 'USA',
    fullName: 'United States',
    flag: '🇺🇸',
    lang: 'en',
    langName: 'English',
    currencySymbol: '$',
    currencyCode: 'USD',
  },
  {
    code: 'UK',
    slug: 'uk',
    name: 'UK',
    fullName: 'United Kingdom',
    flag: '🇬🇧',
    lang: 'en',
    langName: 'English',
    currencySymbol: '£',
    currencyCode: 'GBP',
  },
  {
    code: 'AU',
    slug: 'au',
    name: 'Australia',
    fullName: 'Australia',
    flag: '🇦🇺',
    lang: 'en',
    langName: 'English',
    currencySymbol: 'A$',
    currencyCode: 'AUD',
  },
  {
    code: 'CA',
    slug: 'ca',
    name: 'Canada',
    fullName: 'Canada',
    flag: '🇨🇦',
    lang: 'en',
    langName: 'English',
    currencySymbol: 'C$',
    currencyCode: 'CAD',
  },
  {
    code: 'DE',
    slug: 'de',
    name: 'Germany',
    fullName: 'Germany',
    flag: '🇩🇪',
    lang: 'de',
    langName: 'Deutsch',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  {
    code: 'FR',
    slug: 'fr',
    name: 'France',
    fullName: 'France',
    flag: '🇫🇷',
    lang: 'fr',
    langName: 'Français',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  {
    code: 'IT',
    slug: 'it',
    name: 'Italy',
    fullName: 'Italy',
    flag: '🇮🇹',
    lang: 'it',
    langName: 'Italiano',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  {
    code: 'NL',
    slug: 'nl',
    name: 'Netherlands',
    fullName: 'Netherlands',
    flag: '🇳🇱',
    lang: 'nl',
    langName: 'Nederlands',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
];

export const DEFAULT_REGION = REGIONS[0]; // USA

export const REGION_SLUGS = REGIONS.map((r) => r.slug);

export function getRegionBySlug(slug: string | null | undefined): Region {
  if (!slug) return DEFAULT_REGION;
  const normalized = slug.toLowerCase().trim();
  return REGIONS.find((r) => r.slug === normalized) || DEFAULT_REGION;
}

export function getRegionByCode(code: string | null | undefined): Region {
  if (!code) return DEFAULT_REGION;
  const normalized = code.toUpperCase().trim();
  // Handle GB alias for UK
  if (normalized === 'GB') {
    return REGIONS.find((r) => r.code === 'UK') || DEFAULT_REGION;
  }
  return REGIONS.find((r) => r.code === normalized) || DEFAULT_REGION;
}

export function isValidRegionSlug(slug: string): boolean {
  if (!slug) return false;
  return REGIONS.some((r) => r.slug === slug.toLowerCase());
}
