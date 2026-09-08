import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import CouponCard from '@/components/CouponCard';
import { generateArticleSchema, safeJsonLd, SITE_URL } from '@/lib/seo';
import { Clock, User, Calendar, Tag, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const params = await Promise.resolve(props.params);
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!blog) return { title: 'Article Not Found — RefPromos' };

  const title = blog.seoTitle || `${blog.title} | RefPromos Shopping Guide`;
  const description = blog.metaDescription || blog.excerpt || blog.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blogs/${blog.slug}`,
      images: blog.featuredImage ? [blog.featuredImage] : [],
      type: 'article',
    },
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await Promise.resolve(props.params);
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      blogStores: {
        include: {
          store: {
            include: {
              _count: { select: { coupons: true, deals: true } },
            },
          },
        },
      },
      blogCoupons: {
        include: {
          coupon: {
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

  if (!blog || blog.status !== 'published') notFound();

  const relatedBlogs = await prisma.blog.findMany({
    where: {
      status: 'published',
      id: { not: blog.id },
      categoryId: blog.categoryId,
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });

  const articleSchema = generateArticleSchema({
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    featuredImage: blog.featuredImage,
    authorName: blog.authorName,
    publishedAt: blog.publishedAt,
    updatedAt: blog.updatedAt,
  });

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Blogs', url: '/blogs' },
          { name: blog.title, url: `/blogs/${blog.slug}` },
        ]}
      />

      {/* 2-COLUMN ARTICLE LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>
        
        {/* MAIN ARTICLE */}
        <article>
          {/* Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
              {blog.category.name}
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: '1.25', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              {blog.title}
            </h1>

            {/* Author Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.86rem', color: 'var(--text-muted)', flexWrap: 'wrap', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={15} color="var(--primary)" />
                <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{blog.authorName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} color="var(--primary)" />
                <span>{formattedDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={15} color="var(--primary)" />
                <span>{blog.readingTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div style={{
              width: '100%',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-card)',
              maxHeight: '440px',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
            }}>
              <img
                src={blog.featuredImage}
                alt={blog.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Article Excerpt */}
          {blog.excerpt && (
            <div style={{
              background: 'var(--primary-subtle)',
              borderLeft: '3px solid var(--primary)',
              padding: '1.25rem 1.6rem',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1.05rem',
              color: 'var(--text-main)',
              fontWeight: 600,
              lineHeight: '1.65',
              marginBottom: '2.5rem',
            }}>
              {blog.excerpt}
            </div>
          )}

          {/* Body Content */}
          <div
            style={{
              fontSize: '1.02rem',
              lineHeight: '1.8',
              color: 'var(--text-main)',
              marginBottom: '3rem',
            }}
          >
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ') || paragraph.startsWith('## ')) {
                return (
                  <h3 key={idx} style={{ fontSize: '1.45rem', fontWeight: 900, marginTop: '2.25rem', marginBottom: '0.75rem', color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
                    {paragraph.replace(/^#+\s*/, '')}
                  </h3>
                );
              }
              return (
                <p key={idx} style={{ marginBottom: '1.4rem' }}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Embedded Referenced Coupons in Blog */}
          {blog.blogCoupons.length > 0 && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-2xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '3rem',
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-heading)' }}>
                <Tag size={20} color="var(--primary)" /> Mentioned Promo Codes &amp; Deals
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {blog.blogCoupons.map(({ coupon }) => (
                  <CouponCard key={coupon.id} coupon={coupon as any} />
                ))}
              </div>
            </div>
          )}

          {/* Back to Guides */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1.75rem' }}>
            <Link href="/blogs" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowLeft size={16} /> All Shopping Guides
            </Link>
          </div>
        </article>

        {/* RIGHT SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-2xl)',
              padding: '1.6rem',
              boxShadow: 'var(--shadow-card)',
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-heading)' }}>
                <BookOpen size={17} color="var(--primary)" /> Related Guides
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {relatedBlogs.map((relBlog) => (
                  <Link
                    key={relBlog.id}
                    href={`/blogs/${relBlog.slug}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      padding: '0.65rem 0',
                      borderBottom: '1px solid var(--border)',
                      textDecoration: 'none',
                    }}
                  >
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: '1.4' }}>
                      {relBlog.title}
                    </h4>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{relBlog.readingTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>

      </div>
    </div>
  );
}
