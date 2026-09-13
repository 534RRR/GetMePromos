'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Region,
  REGIONS,
  DEFAULT_REGION,
  getRegionBySlug,
  getRegionByCode,
  isValidRegionSlug,
} from '@/lib/regions';
import { getTranslation, Locale } from '@/lib/translations';

interface LanguageContextType {
  currentRegion: Region;
  currentLang: Locale;
  t: (key: string, fallback?: string) => string;
  changeRegion: (codeOrSlug: string) => void;
  regions: Region[];
  hasRegionInUrl: boolean;
  formatRegionLink: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialRegion,
  initialHasRegionInUrl,
}: {
  children: React.ReactNode;
  initialRegion?: Region;
  initialHasRegionInUrl?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Helper to extract region from current pathname
  const detectRegionFromPath = useCallback((): Region | null => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const segments = path.split('/').filter(Boolean);
      if (segments.length > 0 && isValidRegionSlug(segments[0])) {
        return getRegionBySlug(segments[0]);
      }
    }
    if (!pathname) return null;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && isValidRegionSlug(segments[0])) {
      return getRegionBySlug(segments[0]);
    }
    return null;
  }, [pathname]);

  const [currentRegion, setCurrentRegion] = useState<Region>(() => {
    return initialRegion || DEFAULT_REGION;
  });

  const [hasRegionInUrl, setHasRegionInUrl] = useState<boolean>(() => {
    return initialHasRegionInUrl ?? false;
  });

  // Sync region state from URL on mount and when pathname changes
  useEffect(() => {
    const fromPath = detectRegionFromPath();
    if (fromPath) {
      setCurrentRegion(fromPath);
      setHasRegionInUrl(true);
      // Synchronize cookie and localStorage
      const secure = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `gmp_country=${fromPath.code}; path=/; max-age=31536000; SameSite=Lax${secure}`;
      localStorage.setItem('gmp_country', fromPath.code);
    } else if (initialRegion && initialHasRegionInUrl) {
      setCurrentRegion(initialRegion);
      setHasRegionInUrl(true);
    } else {
      // When on root '/' or any URL without a region slug, keep clean English (DEFAULT_REGION)
      setCurrentRegion(DEFAULT_REGION);
      setHasRegionInUrl(false);
    }
  }, [pathname, detectRegionFromPath, initialRegion, initialHasRegionInUrl]);

  // Set html data attributes for language and region
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-lang', currentRegion.lang);
      document.documentElement.setAttribute('data-region', currentRegion.code);
    }
  }, [currentRegion]);

  const currentLang = useMemo<Locale>(() => {
    const lang = currentRegion.lang as Locale;
    return ['en', 'de', 'fr', 'it', 'nl'].includes(lang) ? lang : 'en';
  }, [currentRegion]);

  const t = useCallback(
    (key: string, fallback?: string) => {
      return getTranslation(currentLang, key, fallback);
    },
    [currentLang]
  );

  const changeRegion = useCallback(
    (codeOrSlug: string) => {
      const targetRegion =
        REGIONS.find(
          (r) =>
            r.code.toLowerCase() === codeOrSlug.toLowerCase() ||
            r.slug.toLowerCase() === codeOrSlug.toLowerCase()
        ) || DEFAULT_REGION;

      setCurrentRegion(targetRegion);

      // Save cookie and local storage
      if (typeof window !== 'undefined') {
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `gmp_country=${targetRegion.code}; path=/; max-age=31536000; SameSite=Lax${secure}`;
        localStorage.setItem('gmp_country', targetRegion.code);

        // Calculate new URL: replace or prepend targetRegion.slug
        const segments = pathname.split('/').filter(Boolean);
        let remainingSegments: string[] = [];

        if (segments.length > 0 && isValidRegionSlug(segments[0])) {
          remainingSegments = segments.slice(1);
        } else {
          remainingSegments = segments;
        }

        const newPath = `/${targetRegion.slug}${
          remainingSegments.length > 0 ? '/' + remainingSegments.join('/') : ''
        }`;

        // Trigger Google Translate cookie for dynamic auto-translation
        const lang = targetRegion.lang;
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (lang !== 'en') {
          document.cookie = `googtrans=/en/${lang}; path=/;`;
          if (!isLocal) {
            document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname};`;
            const parts = window.location.hostname.split('.');
            if (parts.length > 2) {
              document.cookie = `googtrans=/en/${lang}; path=/; domain=.${parts.slice(-2).join('.')};`;
            }
          }
        } else {
          document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          if (!isLocal) {
            document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
          }
        }

        // Hard reload to new region URL — ensures full page refresh with correct language/content
        window.location.href = newPath;
      }
    },
    [pathname]
  );

  const formatRegionLink = useCallback(
    (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      if (hasRegionInUrl) {
        return `/${currentRegion.slug}${cleanPath === '/' ? '' : cleanPath}`;
      }
      return cleanPath;
    },
    [hasRegionInUrl, currentRegion.slug]
  );

  return (
    <LanguageContext.Provider
      value={{
        currentRegion,
        currentLang,
        t,
        changeRegion,
        regions: REGIONS,
        hasRegionInUrl,
        formatRegionLink,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
