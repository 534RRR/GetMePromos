'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Plus, Search, Trash2, Edit2, ExternalLink, Calendar, User, Clock, BookOpen } from 'lucide-react';

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  featuredImage: string | null;
  authorName: string;
  readingTime: string;
  status: string;
  publishedAt: string;
  category: { id: string; name: string };
  blogStores: { store: { id: string; name: string; logoUrl: string } }[];
  _count: { blogStores: number; blogCoupons: number };
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      if (data.blogs) setBlogs(data.blogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete article "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog post');
      fetchBlogs();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const categories = Array.from(new Set(blogs.map((b) => b.category.name)));

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.slug.toLowerCase().includes(search.toLowerCase()) ||
      b.authorName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || b.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Action Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Shopping Guides &amp; Blog Editor
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Publish search-optimized shopping guides, seasonal sales roundups, and savings tutorials.
          </p>
        </div>

        <Link href="/admin/blogs/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Write New Article
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 1, minWidth: '280px', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search articles by title, slug, or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '0.92rem',
              background: 'transparent',
            }}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="card"
          style={{
            padding: '0.85rem 1.25rem',
            border: '1px solid var(--border)',
            outline: 'none',
            fontSize: '0.9rem',
            cursor: 'pointer',
            minWidth: '180px',
            color: 'var(--text-main)',
          }}
        >
          <option value="ALL">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blogs Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 700 }}>
              <th style={{ padding: '1rem 1.25rem' }}>Article</th>
              <th style={{ padding: '1rem 1.25rem' }}>Category</th>
              <th style={{ padding: '1rem 1.25rem' }}>Author &amp; Read Time</th>
              <th style={{ padding: '1rem 1.25rem' }}>Linked Offers</th>
              <th style={{ padding: '1rem 1.25rem' }}>Status</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading articles...
                </td>
              </tr>
            ) : filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No articles found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredBlogs.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.15s' }}>
                  
                  {/* Article Title & Thumbnail */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {b.featuredImage ? (
                        <img
                          src={b.featuredImage}
                          alt={b.title}
                          style={{
                            width: '56px',
                            height: '42px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border)',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '56px',
                          height: '42px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--bg-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-muted)',
                        }}>
                          <FileText size={20} />
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.95rem', maxWidth: '340px' }}>
                          {b.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          /blogs/{b.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                      {b.category.name}
                    </span>
                  </td>

                  {/* Author & Read time */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.85rem' }}>{b.authorName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                      <Clock size={12} /> {b.readingTime}
                    </div>
                  </td>

                  {/* Linked stores & coupons */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <strong>{b._count.blogStores}</strong> Brands • <strong>{b._count.blogCoupons}</strong> Coupons
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className={`badge ${b.status === 'published' ? 'badge-verified' : 'badge-deal'}`}>
                      {b.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <Link
                        href={`/blogs/${b.slug}`}
                        target="_blank"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        title="View Live Article"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/admin/blogs/${b.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        title="Edit Article"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(b.id, b.title)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: '#ef4444' }}
                        title="Delete Article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
