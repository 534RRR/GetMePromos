import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReviewCard from '@/components/ReviewCard';
import { Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Store & Brand Reviews — Ratings, Pros & Cons | GrabYourDealz',
  description:
    'Unbiased in-depth reviews of top online stores, fashion brands, and tech retailers. Read rating scores, pros and cons, and find tested coupon codes.',
};

export default async function ReviewsHubPage() {
  const reviews = await prisma.review.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    include: {
      store: {
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl: true,
        },
      },
    },
  });

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <Breadcrumbs items={[{ name: 'Reviews', url: '/reviews' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="eyebrow-pill" style={{ marginBottom: '0.85rem' }}>
          <Star size={13} /> Editorial Ratings
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Store &amp; Brand Reviews
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px' }}>
          Read unbiased retailer reviews, rating scores, pros &amp; cons, and return policy rundowns before checking out.
        </p>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
          <Star size={44} color="var(--primary)" style={{ margin: '0 auto 1.25rem auto' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-heading)' }}>No Reviews Published Yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>Our deal testing team is currently drafting new brand reviews.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))' }}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review as any} />
          ))}
        </div>
      )}
    </div>
  );
}
