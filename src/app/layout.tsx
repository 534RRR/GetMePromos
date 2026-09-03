import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeModal from '@/components/CodeModal';
import AnalyticsScripts from '@/components/AnalyticsScripts';

export const metadata: Metadata = {
  title: 'GrabYourDealz — Verified Coupons, Promo Codes & Shopping Deals',
  description:
    'Discover 20,000+ verified discount promo codes, daily sales, and exclusive merchant deals across top brands worldwide with GrabYourDealz.',
  keywords: ['coupons', 'promo codes', 'discounts', 'deals', 'vouchers', 'savings', 'GrabYourDealz'],
  authors: [{ name: 'GrabYourDealz Editorial' }],
  metadataBase: new URL('https://grabyourdealz.com'),
  openGraph: {
    title: 'GrabYourDealz — Save More on Every Online Order',
    description: '100% verified coupons and discount codes for Nike, Amazon, ASOS, Walmart, and more.',
    type: 'website',
    url: 'https://grabyourdealz.com',
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
                  var saved = localStorage.getItem('gyd_theme');
                  var pref = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', pref);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <AnalyticsScripts />
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <CodeModal />
      </body>
    </html>
  );
}
