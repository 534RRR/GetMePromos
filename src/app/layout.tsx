import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeModal from '@/components/CodeModal';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import InitialPreloader from '@/components/InitialPreloader';

export const metadata: Metadata = {
  title: 'RefPromos — Verified Coupons, Promo Codes & Shopping Deals',
  description:
    'Discover 20,000+ verified discount promo codes, daily sales, and exclusive merchant deals across top brands worldwide with RefPromos.',
  keywords: ['coupons', 'promo codes', 'discounts', 'deals', 'vouchers', 'savings', 'RefPromos'],
  authors: [{ name: 'RefPromos Editorial' }],
  metadataBase: new URL('https://refpromos.com'),
  openGraph: {
    title: 'RefPromos — Save More on Every Online Order',
    description: '100% verified coupons and discount codes for Nike, Amazon, ASOS, Walmart, and more.',
    type: 'website',
    url: 'https://refpromos.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body>
        <InitialPreloader />
        <AnalyticsScripts />
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <CodeModal />
      </body>
    </html>
  );
}
