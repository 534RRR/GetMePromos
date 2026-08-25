import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import RatingStars from '@/components/RatingStars';
import CouponCard from '@/components/CouponCard';
import { generateReviewSchema, SITE_URL } from '@/lib/seo';
import { Star, Check, X, ShieldCheck, User, Calendar, ExternalLink, Tag, ArrowRight } from 'lucide-react';

interface ReviewPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const review = await prisma.review.findUnique({
    where: { slug: params.slug },
    include: { store: true },
  });

  if (!review) return { title: 'Review Not Found — GrabYourDealz' };

  const currentYear = new Date().getFullYear();
  const title =
    review.seoTitle ||
    `${review.store.name} Review (${currentYear}) — Is It Legit & Worth It? Ratings & Coupons`;
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
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
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
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <img
            src={review.store.logoUrl}
            alt={review.store.name}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              objectFit: 'cover',
            }}
          />

          <div>
            <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
              <ShieldCheck size={13} /> Verified Store Review
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {review.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <RatingStars score={review.rating} size={18} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Reviewed by <strong style={{ color: 'var(--text-main)' }}>{review.authorName}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href={`/stores/${review.store.slug}`} className="btn btn-secondary">
            View Coupons ({review.store.coupons.length})
          </Link>
          <a
            href={`/out/store/${review.store.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visit Store <ExternalLink size={16} />
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
                border: '1px solid #a7f3d0',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                fontSize: '1.05rem',
                color: 'var(--primary-hover)',
                lineHeight: '1.6',
                fontWeight: 500,
                marginBottom: '2rem',
              }}
            >
              <strong>Summary: </strong> {review.summary}
            </div>
          )}

          {/* Pros & Cons Side-by-Side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {pros.length > 0 && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={20} /> The Good (Pros)
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#15803d', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem' }}>
                  {pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
            )}

            {cons.length > 0 && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#991b1b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <X size={20} /> The Bad (Cons)
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#b91c1c', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem' }}>
                  {cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Detailed Content */}
          <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '2.5rem' }}>
            {review.detailedContent.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: '1.25rem' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Verdict */}
          {review.verdict && (
            <div
              style={{
                background: '#ffffff',
                border: '2px solid var(--primary)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '3rem',
              }}
            >
              <span className="badge badge-code" style={{ marginBottom: '0.5rem' }}>
                Final Recommendation
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Editor&apos;s Verdict
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                {review.verdict}
              </p>
            </div>
          )}

          {/* Active Store Coupons */}
          {review.store.coupons.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Active {review.store.name} Promo Codes
                </h3>
                <Link href={`/stores/${review.store.slug}`} className="btn btn-secondary btn-sm" style={{ fontWeight: 700 }}>
                  View All Offers <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {review.store.coupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon as any} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Quick Score Card */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: 'var(--primary)',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {review.rating.toFixed(1)}
            </div>
            <RatingStars score={review.rating} showScore={false} size={22} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.75rem', marginBottom: '1.5rem' }}>
              Overall Score based on pricing, coupon reliability, and customer service.
            </p>

            <a
              href={`/out/store/${review.store.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              Shop at {review.store.name} <ExternalLink size={16} />
            </a>
          </div>
        </aside>

      </div>
    </div>
  );
}
