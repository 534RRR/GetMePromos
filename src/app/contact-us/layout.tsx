import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us — Customer Support & Partnerships | RefPromos',
  description:
    'Get in touch with the RefPromos support and editorial team for inquiries, partnership requests, or coupon feedback.',
  alternates: {
    canonical: getCanonicalUrl('/contact-us'),
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
