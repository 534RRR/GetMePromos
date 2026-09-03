import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import RatingStars from './RatingStars';

interface ReviewCardProps {
  review: {
    id: string;
    title: string;
    slug: string;
    rating: number;
    summary?: string | null;
    prosJson?: string | null;
    consJson?: string | null;
    verdict?: string | null;
    authorName: string;
    store: {
      id: string;
      name: string;
      slug: string;
      logoUrl: string;
    };
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  let pros: string[] = [];

  try {
    if (review.prosJson) pros = JSON.parse(review.prosJson);
  } catch (e) {
    // Keep empty
  }

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        {/* Store Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            padding: '5px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: 'var(--shadow-xs)',
          }}>
            <img
              src={review.store.logoUrl}
              alt={review.store.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.25rem' }}>
              {review.store.name} Review
            </h3>
            <RatingStars score={review.rating} size={14} />
          </div>
        </div>

        {/* Review Title & Summary */}
        <p style={{
          fontSize: '0.96rem',
          color: 'var(--text-heading)',
          fontWeight: 800,
          lineHeight: '1.4',
          marginBottom: '0.65rem',
        }}>
          {review.title}
        </p>

        {review.summary && (
          <p style={{
            fontSize: '0.86rem',
            color: 'var(--text-muted)',
            lineHeight: '1.55',
            marginBottom: '1.15rem',
          }}>
            {review.summary}
          </p>
        )}

        {/* Pros Highlight Tag */}
        {pros.length > 0 && (
          <div style={{
            background: 'var(--primary-light)',
            border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 0.85rem',
            marginBottom: '1.15rem',
            fontSize: '0.82rem',
          }}>
            <div style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={14} strokeWidth={3} /> Tested Highlights
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
              {pros.slice(0, 2).map((pro, i) => (
                <li key={i}>{pro}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border)',
        paddingTop: '0.95rem',
        marginTop: '0.95rem',
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          By {review.authorName}
        </span>

        <Link
          href={`/reviews/${review.slug}`}
          className="btn btn-secondary btn-sm"
          style={{ fontWeight: 700 }}
        >
          Read Review <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
