import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X, ShieldCheck } from 'lucide-react';
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
  let cons: string[] = [];

  try {
    if (review.prosJson) pros = JSON.parse(review.prosJson);
    if (review.consJson) cons = JSON.parse(review.consJson);
  } catch (e) {
    // Keep empty arrays
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <img
            src={review.store.logoUrl}
            alt={review.store.name}
            style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              objectFit: 'cover',
            }}
          />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              {review.store.name} Review
            </h3>
            <RatingStars score={review.rating} size={15} />
          </div>
        </div>

        {/* Review Title & Summary */}
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-main)',
          fontWeight: 600,
          lineHeight: '1.5',
          marginBottom: '0.75rem',
        }}>
          {review.title}
        </p>

        {review.summary && (
          <p style={{
            fontSize: '0.86rem',
            color: 'var(--text-muted)',
            lineHeight: '1.5',
            marginBottom: '1.25rem',
          }}>
            {review.summary}
          </p>
        )}

        {/* Pros preview */}
        {pros.length > 0 && (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem',
            marginBottom: '1rem',
            fontSize: '0.82rem',
          }}>
            <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Check size={14} /> Highlights
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#15803d' }}>
              {pros.slice(0, 2).map((pro, i) => (
                <li key={i}>{pro}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border)',
        paddingTop: '1rem',
        marginTop: '1rem',
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
