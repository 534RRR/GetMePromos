import type { Metadata } from 'next';
import { headers, cookies } from 'next/headers';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeModal from '@/components/CodeModal';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import InitialPreloader from '@/components/InitialPreloader';
import AutoTranslator from '@/components/AutoTranslator';
import { LanguageProvider } from '@/context/LanguageContext';
import { getRegionByCode, getRegionBySlug, DEFAULT_REGION, Region } from '@/lib/regions';

export const metadata: Metadata = {
  title: 'RefPromos — Verified Coupons, Promo Codes & Shopping Deals',
  description:
    'Discover 20,000+ verified discount promo codes, daily sales, and exclusive merchant deals across top brands worldwide with RefPromos.',
  authors: [{ name: 'RefPromos Editorial' }],
  metadataBase: new URL('https://refpromos.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'RefPromos — Save More on Every Online Order',
    description: '100% verified coupons and discount codes for Nike, Amazon, ASOS, Walmart, and more.',
    type: 'website',
    url: 'https://refpromos.com',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const cookieStore = await cookies();

  const regionSlugHeader = headerList.get('x-region-slug');
  const countryHeader = headerList.get('x-country');
  const cookieCountry = cookieStore.get('gmp_country')?.value;

  let initialRegion: Region = DEFAULT_REGION;
  let hasRegionInUrl = false;

  if (regionSlugHeader) {
    initialRegion = getRegionBySlug(regionSlugHeader);
    hasRegionInUrl = true;
  } else if (countryHeader) {
    initialRegion = getRegionByCode(countryHeader);
  } else if (cookieCountry) {
    initialRegion = getRegionByCode(cookieCountry);
  }

  return (
    <html lang="en" data-lang={initialRegion.lang} data-region={initialRegion.code} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('gmp_theme');
                  var pref = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', pref);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider initialRegion={initialRegion} initialHasRegionInUrl={hasRegionInUrl}>
          <InitialPreloader />
          <AnalyticsScripts />
          <AutoTranslator />
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <CodeModal />
        </LanguageProvider>
      </body>
    </html>
  );
}

