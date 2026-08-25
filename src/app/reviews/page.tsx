import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReviewCard from '@/components/ReviewCard';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Store & Brand Reviews — Ratings, Pros & Cons | GrabYourDealz',
  description:
    'Unbiased in-depth reviews of top online stores, fashion brands, and tech retailers. Read rating scores, pros and cons, and find tested coupon codes.',
  openGraph: {
    title: 'Store & Brand Reviews — GrabYourDealz',
    description: 'Expert store ratings, pros & cons, and verified promo codes.',
  },
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
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <Breadcrumbs items={[{ name: 'Reviews', url: '/reviews' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <Star size={18} /> Store Reviews
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          In-Depth Store &amp; Brand Reviews
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px' }}>
          Read unbiased editorial reviews, customer satisfaction ratings, return policies, and shipping breakdowns for top merchant retailers.
        </p>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
          <Star size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Reviews Published Yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Our deal testing team is currently drafting new brand reviews.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review as any} />
          ))}
        </div>
      )}
    </div>
  );
}
