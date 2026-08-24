'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Plus, Trash2, Edit2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface Country {
  id: string;
  code: string;
  name: string;
  currencySymbol: string;
  currencyCode: string;
  flagIcon: string;
  isActive: boolean;
  sortOrder: number;
}

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form State
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [flagIcon, setFlagIcon] = useState('🌍');
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState('0');
  const [error, setError] = useState('');

  const fetchCountries = async () => {
    try {
      const res = await fetch('/api/admin/countries');
      const data = await res.json();
      if (data.countries) setCountries(data.countries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleOpenAdd = () => {
    setEditId(null);
    setCode('');
    setName('');
    setCurrencySymbol('$');
    setCurrencyCode('USD');
    setFlagIcon('🌍');
    setIsActive(true);
    setSortOrder('0');
    setError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Country) => {
    setEditId(c.id);
    setCode(c.code);
    setName(c.name);
    setCurrencySymbol(c.currencySymbol);
    setCurrencyCode(c.currencyCode);
    setFlagIcon(c.flagIcon);
    setIsActive(c.isActive);
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
        code,
        name,
        currencySymbol,
        currencyCode,
        flagIcon,
        isActive,
        sortOrder,
      };

      const res = await fetch('/api/admin/countries', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      setModalOpen(false);
      fetchCountries();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string, countryName: string) => {
    if (!confirm(`Are you sure you want to delete ${countryName}?`)) return;

    try {
      const res = await fetch(`/api/admin/countries?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchCountries();
    } catch (err) {
      alert('Failed to delete country');
    }
  };

  const handleToggleActive = async (c: Country) => {
    try {
      await fetch('/api/admin/countries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: c.id, isActive: !c.isActive }),
      });
      fetchCountries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Countries & Geographic Regions
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage supported multi-region markets, ISO codes, currencies and localized settings.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
          <Plus size={16} /> Add New Country
        </button>
      </div>

      {/* Countries Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 700 }}>
              <th style={{ padding: '1rem 1.25rem' }}>Flag & Code</th>
              <th style={{ padding: '1rem 1.25rem' }}>Country Name</th>
              <th style={{ padding: '1rem 1.25rem' }}>Currency</th>
              <th style={{ padding: '1rem 1.25rem' }}>Status</th>
              <th style={{ padding: '1rem 1.25rem' }}>Sort Order</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading countries...
                </td>
              </tr>
            ) : countries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No countries added yet.
                </td>
              </tr>
            ) : (
              countries.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.15s' }}>
                  <td style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{c.flagIcon}</span>
                    <span style={{ fontWeight: 800, fontFamily: 'Space Grotesk, monospace' }}>{c.code}</span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span className="badge badge-deal">{c.currencySymbol} ({c.currencyCode})</span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <button
                      onClick={() => handleToggleActive(c)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      title="Click to toggle active"
                    >
                      {c.isActive ? (
                        <span className="badge badge-verified"><CheckCircle2 size={12} /> Active</span>
                      ) : (
                        <span className="badge badge-amber"><XCircle size={12} /> Inactive</span>
                      )}
                    </button>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)' }}>{c.sortOrder}</td>
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

      {/* Modal: Add/Edit Country */}
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
            maxWidth: '480px',
            width: '100%',
            padding: '2rem',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              {editId ? 'Edit Country' : 'Add New Country'}
            </h3>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.65rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Code (ISO)</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    placeholder="US"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textTransform: 'uppercase' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Country Name</label>
                  <input
                    type="text"
                    required
                    placeholder="United States"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Symbol</label>
                  <input
                    type="text"
                    required
                    placeholder="$"
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Currency</label>
                  <input
                    type="text"
                    required
                    placeholder="USD"
                    value={currencyCode}
                    onChange={(e) => setCurrencyCode(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textTransform: 'uppercase' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Flag Emoji</label>
                  <input
                    type="text"
                    required
                    placeholder="🇺🇸"
                    value={flagIcon}
                    onChange={(e) => setFlagIcon(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.3rem' }}>Sort Order</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="isActiveCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label htmlFor="isActiveCheck" style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                  Enable this region on website
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
                  Save Country
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
