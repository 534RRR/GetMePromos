import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import CouponCard from '@/components/CouponCard';
import NewsletterBox from '@/components/NewsletterBox';
import { generateArticleSchema, SITE_URL } from '@/lib/seo';
import { Clock, User, Calendar, Tag, ArrowLeft, ArrowRight, Share2, Store, BookOpen } from 'lucide-react';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!blog) return { title: 'Article Not Found — GrabYourDealz' };

  const title = blog.seoTitle || `${blog.title} | GrabYourDealz Shopping Guide`;
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
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

  // Fetch related articles in same category
  const relatedBlogs = await prisma.blog.findMany({
    where: {
      status: 'published',
      id: { not: blog.id },
      categoryId: blog.categoryId,
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });

  // Schema generation
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
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: '1.25', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {blog.title}
            </h1>

            {/* Author Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)', flexWrap: 'wrap', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={16} color="var(--primary)" />
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{blog.authorName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} />
                <span>{formattedDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} />
                <span>{blog.readingTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div style={{
              width: '100%',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-md)',
              maxHeight: '440px',
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
              background: 'var(--bg-subtle)',
              borderLeft: '4px solid var(--primary)',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.05rem',
              color: 'var(--text-main)',
              fontWeight: 500,
              lineHeight: '1.6',
              marginBottom: '2rem',
            }}>
              {blog.excerpt}
            </div>
          )}

          {/* Body Content */}
          <div
            style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: 'var(--text-main)',
              marginBottom: '3rem',
            }}
          >
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ') || paragraph.startsWith('## ')) {
                return (
                  <h3 key={idx} style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                    {paragraph.replace(/^#+\s*/, '')}
                  </h3>
                );
              }
              return (
                <p key={idx} style={{ marginBottom: '1.25rem' }}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Embedded Referenced Coupons in Blog */}
          {blog.blogCoupons.length > 0 && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              marginBottom: '3rem',
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Tag size={20} color="var(--primary)" /> Mentioned Promo Codes &amp; Deals
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {blog.blogCoupons.map(({ coupon }) => (
                  <CouponCard key={coupon.id} coupon={coupon as any} />
                ))}
              </div>
            </div>
          )}

          {/* Back to Guides */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <Link href="/blogs" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowLeft size={16} /> All Shopping Guides
            </Link>
          </div>
        </article>

        {/* RIGHT SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={18} color="var(--primary)" /> Related Guides
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedBlogs.map((rBlog) => (
                  <Link
                    key={rBlog.id}
                    href={`/blogs/${rBlog.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.4', marginBottom: '0.25rem' }}>
                      {rBlog.title}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rBlog.readingTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Featured Stores Widget */}
          {blog.blogStores.length > 0 && (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Store size={18} color="var(--primary)" /> Featured Brands
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {blog.blogStores.map(({ store }) => (
                  <Link
                    key={store.id}
                    href={`/stores/${store.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                    }}
                  >
                    <img src={store.logoUrl} alt={store.name} style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--border)' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{store.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{store._count.coupons + store._count.deals} Offers</div>
                    </div>
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
