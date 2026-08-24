'use client';

import React, { useState, useEffect } from 'react';
import { FolderTree, Plus, Trash2, Edit2, Star, Tag } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
  isFeatured: boolean;
  sortOrder: number;
  _count?: { storeCategories: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('Tag');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState('0');
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditId(null);
    setName('');
    setSlug('');
    setIcon('Tag');
    setDescription('');
    setIsFeatured(false);
    setSortOrder('0');
    setError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditId(c.id);
    setName(c.name);
    setSlug(c.slug);
    setIcon(c.icon || 'Tag');
    setDescription(c.description || '');
    setIsFeatured(c.isFeatured);
    setSortOrder(c.sortOrder.toString());
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        id: editId,
        name,
        slug,
        icon,
        description,
        isFeatured,
        sortOrder,
      };

      const res = await fetch('/api/admin/categories', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      setModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchCategories();
    } catch (err) {
      alert('Failed to delete category');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Shopping Categories
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Organize stores, coupons, and SEO hubs by shopping taxonomy.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 700 }}>
              <th style={{ padding: '1rem 1.25rem' }}>Category Name</th>
              <th style={{ padding: '1rem 1.25rem' }}>URL Slug</th>
              <th style={{ padding: '1rem 1.25rem' }}>Icon Key</th>
              <th style={{ padding: '1rem 1.25rem' }}>Stores Count</th>
              <th style={{ padding: '1rem 1.25rem' }}>Featured</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading categories...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {c.name}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <code style={{ background: 'var(--bg-subtle)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.82rem' }}>
                      /categories/{c.slug}
                    </code>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)' }}>{c.icon}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge badge-code">{c._count?.storeCategories || 0} Stores</span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    {c.isFeatured ? (
                      <span className="badge badge-amber"><Star size={12} fill="#d97706" /> Featured</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>No</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.6rem', color: '#ef4444' }}
                        title="Delete"
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

      {/* Modal: Add/Edit Category */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '500px',
            width: '100%',
            padding: '2rem',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              {editId ? 'Edit Category' : 'Create Category'}
            </h3>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.65rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="Fashion & Apparel"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editId) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="fashion"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Lucide Icon</label>
                  <input
                    type="text"
                    placeholder="Shirt"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Short category summary for SEO and user browsing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="isFeaturedCheck"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                <label htmlFor="isFeaturedCheck" style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                  Feature on Homepage
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
