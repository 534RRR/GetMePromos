import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, User } from 'lucide-react';

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
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`/blogs/${blog.slug}`}
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
      {/* Blog Image */}
      {blog.featuredImage ? (
        <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
          <img
            src={blog.featuredImage}
            alt={blog.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          />
        </div>
      ) : (
        <div style={{ height: '160px', width: '100%', background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)' }} />
      )}

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {blog.category && (
          <span className="badge badge-amber" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
            {blog.category.name}
          </span>
        )}

        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          lineHeight: '1.4',
          marginBottom: '0.6rem',
        }}>
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            lineHeight: '1.5',
            marginBottom: '1.25rem',
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
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border)',
          paddingTop: '0.85rem',
          marginTop: 'auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={14} />
            <span>{blog.readingTime}</span>
          </div>

          <span style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Read Guide <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
