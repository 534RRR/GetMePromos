'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, Eye, Code, Tag, Store, Image as ImageIcon } from 'lucide-react';

interface CategoryOption {
  id: string;
  name: string;
}

interface StoreOption {
  id: string;
  name: string;
  logoUrl: string;
}

interface CouponOption {
  id: string;
  title: string;
  discountValue: string;
  store: { name: string };
}

export default function AdminNewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [stores, setStores] = useState<StoreOption[]>([]);
  const [coupons, setCoupons] = useState<CouponOption[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [authorName, setAuthorName] = useState('GetMePromos Editorial');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [status, setStatus] = useState('published');
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [ogImage, setOgImage] = useState('');

  useEffect(() => {
    // Fetch categories, stores, and coupons
    const loadData = async () => {
      try {
        const [catRes, storeRes, couponRes] = await Promise.all([
          fetch('/api/admin/blogs/categories'),
          fetch('/api/admin/stores'),
          fetch('/api/admin/coupons'),
        ]);

        const catData = await catRes.json();
        if (catData.categories && catData.categories.length > 0) {
          setCategories(catData.categories);
          setCategoryId(catData.categories[0].id);
        }

        const storeData = await storeRes.json();
        if (storeData.stores) setStores(storeData.stores);

        const couponData = await couponRes.json();
        if (couponData.coupons) setCoupons(couponData.coupons);
      } catch (err) {
        console.error('Failed to load initial form data', err);
      }
    };
    loadData();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(autoSlug);
    if (!seoTitle) setSeoTitle(val);
  };

  const handleInsertSnippet = (prefix: string, suffix: string = '') => {
    setContent((prev) => prev + `\n${prefix} ` + suffix);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in both title and content.');
      return;
    }

    setLoading(true);
    try {
      let finalCategoryId = categoryId;

      // Create new category if user entered a custom name
      if (!finalCategoryId && newCategoryName) {
        const newCatRes = await fetch('/api/admin/blogs/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newCategoryName }),
        });
        const newCatData = await newCatRes.json();
        if (newCatData.category) finalCategoryId = newCatData.category.id;
      }

      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: finalCategoryId,
          title,
          slug,
          excerpt,
          content,
          featuredImage,
          authorName,
          readingTime,
          status,
          seoTitle,
          metaDescription,
          ogImage: ogImage || featuredImage,
          storeIds: selectedStores,
          couponIds: selectedCoupons,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create blog');

      router.push('/admin/blogs');
    } catch (err: any) {
      alert(err.message || 'Submission error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/blogs" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem 0.6rem' }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Write Shopping Guide / Article
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Compose comprehensive shopping advice with embedded promo codes and brand tags.
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Save size={16} /> {loading ? 'Saving...' : 'Publish Article'}
        </button>
      </div>

      {/* Main Grid */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column: Content Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Article Title & Slug */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 10 Secret Ways to Save at Nike (Promo Code Hacks)"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                URL Slug (/blogs/...)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  fontSize: '0.88rem',
                  background: 'var(--bg-subtle)',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Excerpt / Short Summary
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary appearing on guide cards and header highlight..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '0.92rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Markdown Content Composer */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 800 }}>
                Article Body Content (Markdown Supported) *
              </label>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem' }}
                >
                  {previewMode ? <Code size={13} /> : <Eye size={13} />}
                  {previewMode ? 'Edit Markdown' : 'Preview Output'}
                </button>
              </div>
            </div>

            {/* Quick Format Snippet Bar */}
            {!previewMode && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', background: 'var(--bg-subtle)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <button type="button" onClick={() => handleInsertSnippet('## Section Heading')} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>H2</button>
                <button type="button" onClick={() => handleInsertSnippet('### Sub Heading')} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>H3</button>
                <button type="button" onClick={() => handleInsertSnippet('**Bold text**')} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Bold</button>
                <button type="button" onClick={() => handleInsertSnippet('*Italic text*')} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Italic</button>
                <button type="button" onClick={() => handleInsertSnippet('- Bullet item')} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>List</button>
                <button type="button" onClick={() => handleInsertSnippet('> Highlighted tip or note')} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>Quote</button>
              </div>
            )}

            {previewMode ? (
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                minHeight: '320px',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: 'var(--text-main)',
              }}>
                {content.split('\n\n').map((p, idx) => {
                  if (p.startsWith('### ')) return <h3 key={idx} style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1rem 0 0.5rem' }}>{p.replace('### ', '')}</h3>;
                  if (p.startsWith('## ')) return <h2 key={idx} style={{ fontSize: '1.45rem', fontWeight: 800, margin: '1.25rem 0 0.5rem' }}>{p.replace('## ', '')}</h2>;
                  return <p key={idx} style={{ marginBottom: '1rem' }}>{p}</p>;
                })}
              </div>
            ) : (
              <textarea
                required
                rows={14}
                placeholder="Write your guide content here with headers, discount tips, and step-by-step instructions..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  fontFamily: 'monospace',
                  outline: 'none',
                }}
              />
            )}
          </div>

          {/* SEO Metadata Card */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} color="var(--primary)" /> SEO &amp; Social Meta Tags
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Meta Title
              </label>
              <input
                type="text"
                placeholder="Custom title for Google Search results..."
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Meta Description
              </label>
              <textarea
                rows={2}
                placeholder="Compelling 150-160 character description for search engine snippets..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>
          </div>

        </div>

        {/* Right Column: Publishing & Relational Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Publishing Controls */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Publishing Settings</h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
              >
                <option value="published">Published (Live)</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Estimated Read Time
              </label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ImageIcon size={18} color="var(--primary)" /> Featured Image
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Image URL (Unsplash or CDN)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>

            {featuredImage && (
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)', maxHeight: '160px' }}>
                <img src={featuredImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          {/* Relational Store Linker */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Store size={18} color="var(--primary)" /> Tag Featured Brands
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Brands selected here appear in the guide&apos;s sidebar.
            </p>

            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              {stores.map((s) => (
                <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedStores.includes(s.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedStores([...selectedStores, s.id]);
                      else setSelectedStores(selectedStores.filter((id) => id !== s.id));
                    }}
                  />
                  <span>{s.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Relational Coupon Linker */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Tag size={18} color="var(--primary)" /> Embed Live Coupons
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Selected coupons render as interactive cards at the bottom of the article.
            </p>

            <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              {coupons.map((c) => (
                <label key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedCoupons.includes(c.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedCoupons([...selectedCoupons, c.id]);
                      else setSelectedCoupons(selectedCoupons.filter((id) => id !== c.id));
                    }}
                    style={{ marginTop: '0.2rem' }}
                  />
                  <div>
                    <strong>{c.discountValue}</strong> — {c.store.name} ({c.title})
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
