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
  openGraph: {
    title: 'GrabYourDealz Shopping Guides & Saving Tips',
    description: 'Expert advice on coupon stacking, holiday sales, and smart online shopping.',
  },
};

interface BlogsPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const selectedCategory = searchParams.category || '';

  // 1. Fetch Blog Categories
  const blogCategories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' },
  });

  // 2. Fetch published blogs
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
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      <Breadcrumbs items={[{ name: 'Blogs & Guides', url: '/blogs' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <BookOpen size={18} /> Shopping Advice
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Shopping Guides &amp; Coupon Tips
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px' }}>
          Discover proven shopping strategies, seasonal clearance guides, and insider hacks to get the maximum discount on every order.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <Link
          href="/blogs"
          className={`btn btn-sm ${!selectedCategory ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Guides
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

      {/* Featured Blog Hero Banner */}
      {featuredBlog && !selectedCategory && (
        <section style={{ marginBottom: '3.5rem' }}>
          <Link
            href={`/blogs/${featuredBlog.slug}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-md)',
              alignItems: 'center',
            }}
          >
            {featuredBlog.featuredImage && (
              <div style={{ height: '320px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={featuredBlog.featuredImage}
                  alt={featuredBlog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <div style={{ padding: '2.5rem 2rem' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.85rem' }}>
                <Sparkles size={12} /> Featured Guide
              </span>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: '1.3', marginBottom: '0.75rem' }}>
                {featuredBlog.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {featuredBlog.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={14} />
                  <span>{featuredBlog.authorName}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} />
                  <span>{featuredBlog.readingTime}</span>
                </div>
                <span style={{ color: 'var(--primary)', fontWeight: 700, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Read Guide <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Guides Grid */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
          {selectedCategory ? 'Category Articles' : 'Recent Shopping Guides'}
        </h2>

        {blogs.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
            <BookOpen size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Guides Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>New guides and shopping hacks are published every week.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
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
