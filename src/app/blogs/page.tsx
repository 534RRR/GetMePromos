import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import NewsletterBox from '@/components/NewsletterBox';
import { BookOpen, Clock, Sparkles, ArrowRight, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shopping Guides, Saving Hacks & Money Tips | GrabYourDealz',
  description:
    'Expert shopping guides, seasonal sale roundups, promo code stacking strategies, and money-saving hacks to help you stretch your budget.',
};

interface BlogsPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const selectedCategory = searchParams.category || '';

  const blogCategories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' },
  });

  const whereCondition: any = {
    status: 'published',
  };

  if (selectedCategory) {
    whereCondition.category = {
      slug: selectedCategory,
    };
  }

  const blogs = await prisma.blog.findMany({
    where: whereCondition,
    orderBy: { publishedAt: 'desc' },
    include: {
      category: true,
    },
  });

  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      <Breadcrumbs items={[{ name: 'Guides & Articles', url: '/blogs' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="eyebrow-pill" style={{ marginBottom: '0.85rem' }}>
          <BookOpen size={13} /> Shopping Editorial
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Saving Guides, Reviews &amp; Hacks
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px' }}>
          Expert shopping tips, retailer buying guides, and tested strategies to save money at checkout.
        </p>
      </div>

      {/* Categories Filter Strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <Link
          href="/blogs"
          className={`btn btn-sm ${!selectedCategory ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Articles
        </Link>
        {blogCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blogs?category=${cat.slug}`}
            className={`btn btn-sm ${selectedCategory === cat.slug ? 'btn-primary' : 'btn-secondary'}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Featured Blog Spotlight */}
      {featuredBlog && !selectedCategory && (
        <section style={{ marginBottom: '3.5rem' }}>
          <Link
            href={`/blogs/${featuredBlog.slug}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-card)',
              alignItems: 'center',
              padding: 0,
            }}
            className="card"
          >
            {featuredBlog.featuredImage && (
              <div style={{ height: '320px', width: '100%', overflow: 'hidden', background: 'var(--bg-subtle)' }}>
                <img
                  src={featuredBlog.featuredImage}
                  alt={featuredBlog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <div style={{ padding: '2.25rem 2rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.85rem' }}>
                <Sparkles size={11} /> Featured Guide
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-heading)', lineHeight: '1.3', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                {featuredBlog.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {featuredBlog.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={14} color="var(--primary)" />
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{featuredBlog.authorName}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} color="var(--primary)" />
                  <span>{featuredBlog.readingTime}</span>
                </div>
                <span style={{ color: 'var(--primary)', fontWeight: 800, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Read Guide <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Guides Grid */}
      <section style={{ marginBottom: '4.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '1.75rem', letterSpacing: '-0.02em' }}>
          {selectedCategory ? 'Category Articles' : 'Recent Shopping Guides'}
        </h2>

        {blogs.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            <BookOpen size={44} color="var(--primary)" style={{ margin: '0 auto 1.25rem auto' }} />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-heading)' }}>No Guides Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>New shopping hacks and store guides are published every week.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))' }}>
            {(selectedCategory ? blogs : remainingBlogs).map((blog) => (
              <BlogCard key={blog.id} blog={blog as any} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
}
