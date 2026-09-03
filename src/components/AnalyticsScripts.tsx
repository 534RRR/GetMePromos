import React from 'react';
import Script from 'next/script';
import prisma from '@/lib/prisma';

export default async function AnalyticsScripts() {
  let ga4Id = '';
  let gtmId = '';
  let metaPixelId = '';

  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: ['ga4MeasurementId', 'gtmContainerId', 'metaPixelId'],
        },
      },
    });

    for (const s of settings) {
      if (s.key === 'ga4MeasurementId' && /^G-[A-Z0-9]{4,20}$/i.test(s.value.trim())) {
        ga4Id = s.value.trim();
      }
      if (s.key === 'gtmContainerId' && /^GTM-[A-Z0-9]{4,20}$/i.test(s.value.trim())) {
        gtmId = s.value.trim();
      }
      if (s.key === 'metaPixelId' && /^[0-9]{5,25}$/.test(s.value.trim())) {
        metaPixelId = s.value.trim();
      }
    }
  } catch (err) {
    // Database may not be initialized yet during build time
  }

  return (
    <>
      {/* Google Analytics 4 (GA4) */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager (GTM) */}
      {gtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

      {/* Meta (Facebook) Pixel */}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
