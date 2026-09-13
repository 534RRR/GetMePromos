'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedBlogTitle, getLocalizedCategoryName } from '@/lib/translations';

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    authorName: string;
    readingTime: string;
    publishedAt: Date | string;
    category?: {
      name: string;
      slug: string;
    } | null;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { t, currentLang, formatRegionLink } = useLanguage();

  const readingTimeText = blog.readingTime
    ? blog.readingTime.replace(/min read/i, t('min_read'))
    : `5 ${t('min_read')}`;

  return (
    <Link
      href={formatRegionLink(`/blogs/${blog.slug}`)}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        overflow: 'hidden',
        textDecoration: 'none',
        height: '100%',
      }}
    >
      {/* Featured Image */}
      {blog.featuredImage ? (
        <div style={{ height: '190px', width: '100%', overflow: 'hidden', position: 'relative', background: 'var(--slate-100)' }}>
          <img
            src={blog.featuredImage}
            alt={blog.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          />
        </div>
      ) : (
        <div style={{ height: '160px', width: '100%', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }} />
      )}

      {/* Card Content */}
      <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {blog.category && (
          <span className="badge badge-amber" style={{ alignSelf: 'flex-start', marginBottom: '0.85rem' }}>
            {getLocalizedCategoryName(blog.category.name, currentLang)}
          </span>
        )}

        <h3 style={{
          fontSize: '1.18rem',
          fontWeight: 800,
          color: 'var(--text-heading)',
          lineHeight: '1.35',
          marginBottom: '0.6rem',
          letterSpacing: '-0.02em',
        }}>
          {getLocalizedBlogTitle(blog.title, currentLang)}
        </h3>

        {blog.excerpt && (
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            lineHeight: '1.55',
            marginBottom: '1.35rem',
            flex: 1,
          }}>
            {blog.excerpt}
          </p>
        )}

        {/* Footer Meta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border)',
          paddingTop: '0.95rem',
          marginTop: 'auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={14} color="var(--primary)" />
            <span>{readingTimeText}</span>
          </div>

          <span style={{ color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            {t('read_guide')} <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

