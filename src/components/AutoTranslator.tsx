'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function setGoogleTransCookie(lang: string) {
  if (typeof window === 'undefined') return;
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (lang && lang !== 'en') {
    const val = `/en/${lang}`;
    document.cookie = `googtrans=${val}; path=/;`;
    if (!isLocal) {
      document.cookie = `googtrans=${val}; path=/; domain=${window.location.hostname};`;
      const parts = window.location.hostname.split('.');
      if (parts.length > 2) {
        document.cookie = `googtrans=${val}; path=/; domain=.${parts.slice(-2).join('.')};`;
      }
    }
  } else {
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    if (!isLocal) {
      document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      const parts = window.location.hostname.split('.');
      if (parts.length > 2) {
        document.cookie = `googtrans=; path=/; domain=.${parts.slice(-2).join('.')}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      }
    }
  }
}

export default function AutoTranslator() {
  const { currentLang } = useLanguage();
  const scriptInjected = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set cookie immediately before script loads
    setGoogleTransCookie(currentLang);

    window.googleTranslateElementInit = function () {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,de,fr,it,nl',
              autoDisplay: false,
              layout: 0,
            },
            'google_translate_element'
          );
        }
      } catch (err) {
        console.warn('Google Translate init error:', err);
      }
    };

    if (!scriptInjected.current && !document.getElementById('google-translate-script')) {
      scriptInjected.current = true;
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate && window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setGoogleTransCookie(currentLang);

    // Poll for the combo box to ensure language switch triggers
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (selectEl) {
        const targetValue = currentLang === 'en' ? '' : currentLang;
        if (selectEl.value !== targetValue) {
          selectEl.value = targetValue;
          selectEl.dispatchEvent(new Event('change'));
        }
        clearInterval(interval);
      }
      if (attempts > 25) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [currentLang]);

  return (
    <>
      <div
        id="google_translate_element"
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -100,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Hide Google Translate top banner and popups for clean native aesthetic */
            .goog-te-banner-frame,
            .goog-te-banner-frame.skiptranslate,
            iframe.goog-te-banner-frame,
            #goog-gt-tt,
            .goog-te-balloon-frame {
              display: none !important;
              visibility: hidden !important;
            }
            /* Fix Google Translate's body.top shift — must NOT use position:static as that breaks scroll */
            body.goog-te-menu-frame-visible,
            body[style*="top:"],
            body[style*="top: "] {
              top: 0px !important;
            }
            .goog-tooltip,
            .goog-tooltip:hover {
              display: none !important;
            }
            .goog-text-highlight {
              background-color: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
          `,
        }}
      />
    </>
  );
}
