import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import RatingStars from '@/components/RatingStars';
import CouponCard from '@/components/CouponCard';
import { generateReviewSchema, safeJsonLd, SITE_URL } from '@/lib/seo';
import { Star, Check, X, ShieldCheck, ExternalLink, Tag, ArrowRight } from 'lucide-react';

interface ReviewPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const review = await prisma.review.findUnique({
    where: { slug: params.slug },
    include: { store: true },
  });

  if (!review) return { title: 'Review Not Found — GetMePromos' };

  const currentYear = new Date().getFullYear();
  const title =
    review.seoTitle ||
    `${review.store.name} Review (${currentYear}) — Ratings, Pros & Cons | GetMePromos`;
  const description =
    review.metaDescription ||
    review.summary ||
    `Honest review of ${review.store.name}. We analyze discounts, shipping speed, product quality, return policy, and customer reviews.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/reviews/${review.slug}`,
      images: [review.store.logoUrl],
    },
  };
}

export default async function StoreReviewDetailPage({ params }: ReviewPageProps) {
  const review = await prisma.review.findUnique({
    where: { slug: params.slug },
    include: {
      store: {
        include: {
          coupons: {
            where: { status: 'active' },
            take: 4,
            orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
            include: {
              store: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  logoUrl: true,
                  affiliateUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!review || review.status !== 'published') notFound();

  let pros: string[] = [];
  let cons: string[] = [];

  try {
    if (review.prosJson) pros = JSON.parse(review.prosJson);
    if (review.consJson) cons = JSON.parse(review.consJson);
  } catch {}

  const reviewSchema = generateReviewSchema(
    {
      title: review.title,
      slug: review.slug,
      rating: review.rating,
      summary: review.summary,
      authorName: review.authorName,
      verdict: review.verdict,
    },
    {
      name: review.store.name,
      slug: review.store.slug,
      logoUrl: review.store.logoUrl,
    }
  );

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(reviewSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Reviews', url: '/reviews' },
          { name: `${review.store.name} Review`, url: `/reviews/${review.slug}` },
        ]}
      />

      {/* REVIEW HERO */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border)',
          padding: '2.25rem 2rem',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '6px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <img
              src={review.store.logoUrl}
              alt={review.store.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <div>
            <span className="badge badge-amber" style={{ marginBottom: '0.45rem' }}>
              <ShieldCheck size={12} /> Verified Review
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
              {review.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <RatingStars score={review.rating} size={16} />
              <span style={{ color: 'var(--slate-300)' }}>•</span>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Reviewed by <strong style={{ color: 'var(--text-heading)' }}>{review.authorName}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href={`/stores/${review.store.slug}`} className="btn btn-secondary btn-sm">
            View Coupons ({review.store.coupons.length})
          </Link>
          <a
            href={`/out/store/${review.store.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Visit Store <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* MAIN REVIEW LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>
        
        {/* REVIEW CONTENT */}
        <div>
          {/* Summary */}
          {review.summary && (
            <div
              style={{
                background: 'var(--primary-light)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.4rem 1.6rem',
                fontSize: '1.02rem',
                color: 'var(--text-main)',
                lineHeight: '1.65',
                fontWeight: 500,
                marginBottom: '2.25rem',
              }}
            >
              <strong style={{ color: 'var(--primary)' }}>Summary: </strong> {review.summary}
            </div>
          )}

          {/* Pros & Cons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {pros.length > 0 && (
              <div style={{ background: 'var(--primary-light)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-xl)', padding: '1.4rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={16} strokeWidth={3} /> What Shoppers Love
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.88rem' }}>
                  {pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
            )}

            {cons.length > 0 && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 'var(--radius-xl)', padding: '1.4rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ef4444', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <X size={16} strokeWidth={3} /> Things to Keep in Mind
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.88rem' }}>
                  {cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Detailed Content */}
          <div style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '2.5rem' }}>
            {review.detailedContent.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: '1.35rem' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Verdict */}
          {review.verdict && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid var(--primary)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-card)',
                marginBottom: '3rem',
              }}
            >
              <span className="badge badge-code" style={{ marginBottom: '0.65rem' }}>
                Editorial Recommendation
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                Our Verdict on {review.store.name}
              </h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.94rem', lineHeight: '1.65' }}>
                {review.verdict}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Active Promo Codes */}
          {review.store.coupons.length > 0 && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-2xl)',
                padding: '1.6rem',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)' }}>
                <Tag size={16} color="var(--primary)" /> Active {review.store.name} Deals
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {review.store.coupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon as any} />
                ))}
              </div>
            </div>
          )}

        </aside>

      </div>
    </div>
  );
}
