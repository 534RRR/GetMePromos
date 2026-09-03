'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, Check, X, Star, Sparkles, Code, Eye } from 'lucide-react';

interface StoreOption {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
}

export default function AdminNewReviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState<StoreOption[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  // Form State
  const [storeId, setStoreId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [rating, setRating] = useState('4.8');
  const [summary, setSummary] = useState('');
  const [pros, setPros] = useState<string[]>([
    'Consistently active promo codes & seasonal sales',
    'Fast and reliable worldwide shipping options',
    'Generous 30-day return policy and quick refunds',
  ]);
  const [cons, setCons] = useState<string[]>([
    'Promo codes rarely stack on top of clearance items',
    'Free shipping usually requires a minimum order threshold',
  ]);
  const [verdict, setVerdict] = useState('');
  const [detailedContent, setDetailedContent] = useState('');
  const [authorName, setAuthorName] = useState('Deal Experts Team');
  const [status, setStatus] = useState('published');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch('/api/admin/stores');
        const data = await res.json();
        if (data.stores && data.stores.length > 0) {
          setStores(data.stores);
          setStoreId(data.stores[0].id);
          handleStoreSelect(data.stores[0]);
        }
      } catch (err) {
        console.error('Error fetching stores', err);
      }
    };
    fetchStores();
  }, []);

  const handleStoreSelect = (st: StoreOption) => {
    setStoreId(st.id);
    const currentYear = new Date().getFullYear();
    const defaultTitle = `${st.name} Review (${currentYear}) — Legitimacy, Promo Codes & Savings`;
    setTitle(defaultTitle);
    setSlug(`${st.slug}-review`);
    setVerdict(`Overall, ${st.name} is a highly trusted brand with excellent product variety and frequent discount opportunities. Pairing active promo codes with seasonal sales delivers maximum value.`);
    setDetailedContent(`## Overview of ${st.name}\n\n${st.name} is one of the premier shopping destinations offering high-quality products and competitive online pricing.\n\n### How to Get the Best Discounts\n1. Check GrabYourDealz before checkout for verified promo codes.\n2. Join their newsletter for first-order welcome coupons.\n3. Take advantage of seasonal sales events.`);
  };

  const handleAddPro = () => setPros([...pros, '']);
  const handleRemovePro = (index: number) => setPros(pros.filter((_, i) => i !== index));
  const handleProChange = (index: number, val: string) => {
    const next = [...pros];
    next[index] = val;
    setPros(next);
  };

  const handleAddCon = () => setCons([...cons, '']);
  const handleRemoveCon = (index: number) => setCons(cons.filter((_, i) => i !== index));
  const handleConChange = (index: number, val: string) => {
    const next = [...cons];
    next[index] = val;
    setCons(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeId || !title || !detailedContent) {
      alert('Please fill in Store, Title, and Review content.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId,
          title,
          slug,
          rating: parseFloat(rating),
          summary,
          pros: pros.filter(Boolean),
          cons: cons.filter(Boolean),
          verdict,
          detailedContent,
          authorName,
          status,
          seoTitle,
          metaDescription,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create review');

      router.push('/admin/reviews');
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
          <Link href="/admin/reviews" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem 0.6rem' }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Write Store Review
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Create an authoritative store review with pros/cons, score breakdown, and verdict.
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Save size={16} /> {loading ? 'Saving...' : 'Publish Review'}
        </button>
      </div>

      {/* Main Grid */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Store Selection & Title */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Select Store / Merchant Brand *
              </label>
              <select
                value={storeId}
                onChange={(e) => {
                  const s = stores.find((st) => st.id === e.target.value);
                  if (s) handleStoreSelect(s);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} (/stores/{s.slug})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Review Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                Review Slug (/reviews/...)
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
                Summary Callout
              </label>
              <textarea
                rows={2}
                placeholder="High-level evaluation appearing in the prominent green callout box..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
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

          {/* Interactive Pros & Cons Builder */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Pros &amp; Cons Builder</h3>

            {/* Pros List */}
            <div style={{ background: 'var(--primary-light)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={18} /> The Good (Pros)
                </span>
                <button
                  type="button"
                  onClick={handleAddPro}
                  className="btn btn-secondary btn-sm"
                  style={{ background: 'var(--bg-card)', color: 'var(--primary)', border: '1px solid var(--primary-border)', fontSize: '0.78rem' }}
                >
                  <Plus size={13} /> Add Pro
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {pros.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={p}
                      placeholder="e.g. Verified coupon reliability"
                      onChange={(e) => handleProChange(i, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--primary-border)',
                        fontSize: '0.88rem',
                        background: 'var(--bg-card)',
                        color: 'var(--text-heading)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePro(i)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.3rem' }}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cons List */}
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <X size={18} /> The Bad (Cons)
                </span>
                <button
                  type="button"
                  onClick={handleAddCon}
                  className="btn btn-secondary btn-sm"
                  style={{ background: 'var(--bg-card)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.25)', fontSize: '0.78rem' }}
                >
                  <Plus size={13} /> Add Con
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cons.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={c}
                      placeholder="e.g. Free shipping requires $50 threshold"
                      onChange={(e) => handleConChange(i, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        fontSize: '0.88rem',
                        background: 'var(--bg-card)',
                        color: 'var(--text-heading)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCon(i)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.3rem' }}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Detailed Content */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                Detailed In-Depth Review Body (Markdown) *
              </label>

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

            {previewMode ? (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', minHeight: '280px', fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
                {detailedContent.split('\n\n').map((p, idx) => {
                  if (p.startsWith('### ')) return <h3 key={idx} style={{ fontSize: '1.2rem', fontWeight: 800, margin: '1rem 0 0.5rem' }}>{p.replace('### ', '')}</h3>;
                  if (p.startsWith('## ')) return <h2 key={idx} style={{ fontSize: '1.4rem', fontWeight: 800, margin: '1.25rem 0 0.5rem' }}>{p.replace('## ', '')}</h2>;
                  return <p key={idx} style={{ marginBottom: '1rem' }}>{p}</p>;
                })}
              </div>
            ) : (
              <textarea
                required
                rows={12}
                value={detailedContent}
                onChange={(e) => setDetailedContent(e.target.value)}
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

          {/* Verdict Box */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 800 }}>
              Editor&apos;s Final Verdict &amp; Recommendation
            </label>
            <textarea
              rows={3}
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              placeholder="Final concluding advice and purchasing verdict..."
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

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Rating Score Card */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={18} color="#f59e0b" fill="#f59e0b" /> Overall Score
            </h3>

            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                {parseFloat(rating).toFixed(1)} / 5.0
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Score Rating: {rating}
              </label>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Publishing Info */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Publishing Info</h3>

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
          </div>

          {/* SEO Metadata */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} color="var(--primary)" /> SEO Meta Tags
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Meta Title
              </label>
              <input
                type="text"
                placeholder="Custom title for Google search results..."
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
                placeholder="Search result snippet..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem' }}
              />
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
