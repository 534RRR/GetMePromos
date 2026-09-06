'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Mail,
  User,
  ShieldAlert,
  Crown,
  KeyRound,
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  // Form State for Creating New Admin
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isActive: true,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchCurrentSession();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentSession = async () => {
    try {
      const res = await fetch('/api/admin/auth/me');
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
      }
    } catch (err) {}
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create admin');
      }

      setModalOpen(false);
      setFormData({ name: '', email: '', password: '', isActive: true });
      setFeedbackMessage({ type: 'success', text: `Admin "${data.name}" was created successfully!` });
      fetchUsers();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        setFeedbackMessage({ type: 'error', text: data.error || 'Failed to delete user' });
      } else {
        setFeedbackMessage({ type: 'success', text: 'Admin account removed successfully.' });
        fetchUsers();
      }
    } catch (err) {
      setFeedbackMessage({ type: 'error', text: 'Network error deleting user.' });
    } finally {
      setDeleteModalId(null);
    }
  };

  const superAdminCount = users.filter((u) => u.role === 'super_admin').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header & Action Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
              Admin Management
            </h1>
            <span style={{
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#f59e0b',
              border: '1px solid #f59e0b',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}>
              <Crown size={12} /> Super Admin Only
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            As Super Admin, you can create and manage website administrators with full CMS capabilities.
          </p>
        </div>

        <button
          onClick={() => {
            setFormError('');
            setModalOpen(true);
          }}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
        >
          <UserPlus size={16} /> Create New Admin
        </button>
      </div>

      {/* Global Feedback Banner */}
      {feedbackMessage && (
        <div style={{
          background: feedbackMessage.type === 'success' ? 'var(--primary-light)' : '#fef2f2',
          border: `1px solid ${feedbackMessage.type === 'success' ? 'var(--primary-border)' : '#fecaca'}`,
          color: feedbackMessage.type === 'success' ? 'var(--primary)' : '#b91c1c',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {feedbackMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedbackMessage.text}</span>
          </div>
          <button onClick={() => setFeedbackMessage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-3 gap-5">
        <div className="card" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{users.length}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Accounts</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Crown size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{superAdminCount}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Super Administrator</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)' }}>{adminCount}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Website Admins</div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-heading)' }}>
            Admin Accounts &amp; Access Roles
          </h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Showing {users.length} accounts
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No users registered.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <th style={{ padding: '0.9rem 1.5rem' }}>Name / User</th>
                  <th style={{ padding: '0.9rem 1.5rem' }}>Email</th>
                  <th style={{ padding: '0.9rem 1.5rem' }}>Role</th>
                  <th style={{ padding: '0.9rem 1.5rem' }}>Privileges</th>
                  <th style={{ padding: '0.9rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '0.9rem 1.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isCurrent = currentUser?.id === u.id;
                  const isSuperAdmin = u.role === 'super_admin';

                  return (
                    <tr
                      key={u.id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        transition: 'background 0.15s ease',
                      }}
                      className="hover-bg"
                    >
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-full)',
                            background: isSuperAdmin ? 'rgba(245, 158, 11, 0.2)' : 'var(--primary-light)',
                            color: isSuperAdmin ? '#f59e0b' : 'var(--primary)',
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${isSuperAdmin ? '#f59e0b' : 'var(--primary-border)'}`,
                          }}>
                            {isSuperAdmin ? <Crown size={16} /> : u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              {u.name}
                              {isCurrent && (
                                <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700 }}>
                                  (You)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-main)', fontFamily: 'monospace', fontSize: '0.88rem' }}>
                        {u.email}
                      </td>

                      <td style={{ padding: '1rem 1.5rem' }}>
                        {isSuperAdmin ? (
                          <span
                            className="badge"
                            style={{
                              background: 'rgba(245, 158, 11, 0.15)',
                              color: '#f59e0b',
                              border: '1px solid #f59e0b',
                              fontWeight: 800,
                            }}
                          >
                            <Crown size={11} /> Super Admin
                          </span>
                        ) : (
                          <span
                            className="badge"
                            style={{
                              background: 'var(--primary-light)',
                              color: 'var(--primary)',
                              border: '1px solid var(--primary-border)',
                              fontWeight: 800,
                            }}
                          >
                            <Shield size={11} /> Admin
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {isSuperAdmin ? (
                          <span style={{ color: '#f59e0b', fontWeight: 600 }}>Full Website Rights + User Management</span>
                        ) : (
                          <span>Full Website Rights (Cannot manage admins)</span>
                        )}
                      </td>

                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span
                          className="badge"
                          style={{
                            background: u.isActive ? 'var(--primary-light)' : '#fef2f2',
                            color: u.isActive ? 'var(--primary)' : '#dc2626',
                            border: `1px solid ${u.isActive ? 'var(--primary-border)' : '#fecaca'}`,
                          }}
                        >
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        {isSuperAdmin ? (
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', paddingRight: '0.5rem' }}>
                            Protected
                          </span>
                        ) : (
                          <button
                            onClick={() => setDeleteModalId(u.id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.08)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#ef4444',
                              borderRadius: 'var(--radius-sm)',
                              padding: '0.45rem 0.65rem',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                            title="Delete Admin Account"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* REGISTER NEW ADMIN MODAL */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem',
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-2xl)',
            width: '100%',
            maxWidth: '500px',
            padding: '2.25rem',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserPlus size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-heading)' }}>
                    Create New Admin
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Admin will receive full website management access
                  </div>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.86rem',
              }}>
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                  Admin Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-heading)',
                      outline: 'none',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-heading)',
                      outline: 'none',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                  Password * (minimum 6 characters)
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-input)',
                      color: 'var(--text-heading)',
                      outline: 'none',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              {/* Fixed Role Permission Box */}
              <div style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}>
                <KeyRound size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.2rem' }}>
                    Assigned Role: Administrator
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                    Has full control over stores, coupons, categories, regions, blogs, reviews, and site settings, but cannot add, edit, or remove other admin accounts.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  {formLoading ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteModalId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem',
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-2xl)',
            width: '100%',
            maxWidth: '420px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-full)', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
              <ShieldAlert size={26} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
              Delete Admin Account?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: '1.5' }}>
              Are you sure you want to delete this administrator? They will immediately lose access to the GetMePromos CMS Dashboard.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setDeleteModalId(null)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteModalId)}
                className="btn btn-dark"
                style={{ flex: 1, background: '#dc2626', borderColor: '#dc2626' }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
