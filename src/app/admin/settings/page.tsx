'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Globe,
  BarChart,
  ShieldCheck,
  Share2,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'analytics' | 'affiliate' | 'social'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings State dictionary
  const [settings, setSettings] = useState<Record<string, string>>({
    siteName: 'RefPromos',
    siteTagline: 'Verified Coupons, Promo Codes & Shopping Deals',
    siteUrl: 'https://refpromos.com',
    supportEmail: 'support@refpromos.com',
    contactPhone: '+1 (800) 555-DEAL',
    copyrightText: '© 2026 RefPromos.com. All rights reserved.',
    defaultCurrency: '$',
    
    // Analytics
    ga4MeasurementId: '',
    gtmContainerId: '',
    metaPixelId: '',
    customHeadScripts: '',
    customFooterScripts: '',

    // Affiliate
    defaultSubId: 'gmp_direct',
    affiliateDisclosure: 'RefPromos is reader-supported. When you purchase through links on our site, we may earn an affiliate commission at no additional cost to you.',
    redirectDelayMs: '0',

    // Social
    twitterUrl: 'https://twitter.com/refpromos',
    facebookUrl: 'https://facebook.com/refpromos',
    instagramUrl: 'https://instagram.com/refpromos',
    pinterestUrl: 'https://pinterest.com/refpromos',
    youtubeUrl: 'https://youtube.com/@refpromos',
  });

  const groupMapping: Record<string, string> = {
    siteName: 'general',
    siteTagline: 'general',
    siteUrl: 'general',
    supportEmail: 'general',
    contactPhone: 'general',
    copyrightText: 'general',
    defaultCurrency: 'general',
    ga4MeasurementId: 'analytics',
    gtmContainerId: 'analytics',
    metaPixelId: 'analytics',
    customHeadScripts: 'analytics',
    customFooterScripts: 'analytics',
    defaultSubId: 'affiliate',
    affiliateDisclosure: 'affiliate',
    redirectDelayMs: 'affiliate',
    twitterUrl: 'social',
    facebookUrl: 'social',
    instagramUrl: 'social',
    pinterestUrl: 'social',
    youtubeUrl: 'social',
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.settings && Object.keys(data.settings).length > 0) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaveSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings, groupMapping }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      alert(err.message || 'Save error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading site settings...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
            Global Site Settings &amp; Analytics
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Configure site-wide metadata, marketing trackers, affiliate parameters, and social links.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div style={{
          background: 'var(--primary-light)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--primary)',
          fontWeight: 700,
          fontSize: '0.92rem',
        }}>
          <CheckCircle size={20} />
          Settings saved and updated across RefPromos successfully!
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          style={{
            padding: '0.7rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTab === 'general' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'general' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.15s ease',
          }}
        >
          <Globe size={16} /> General &amp; Branding
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '0.7rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTab === 'analytics' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'analytics' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.15s ease',
          }}
        >
          <BarChart size={16} /> Marketing &amp; Analytics
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('affiliate')}
          style={{
            padding: '0.7rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTab === 'affiliate' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'affiliate' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.15s ease',
          }}
        >
          <ShieldCheck size={16} /> Affiliate &amp; Compliance
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          style={{
            padding: '0.7rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: activeTab === 'social' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'social' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.15s ease',
          }}
        >
          <Share2 size={16} /> Social Media Links
        </button>
      </div>

      {/* Tab Panels */}
      <form onSubmit={handleSave} className="card" style={{ padding: '2rem' }}>
        
        {/* TAB 1: General & Branding */}
        {activeTab === 'general' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-heading)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              General Website Settings
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Platform Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Primary Website URL
                </label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => handleChange('siteUrl', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Default Site Tagline
              </label>
              <input
                type="text"
                value={settings.siteTagline}
                onChange={(e) => handleChange('siteTagline', e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Support Contact Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleChange('supportEmail', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={settings.copyrightText}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>
        )}

        {/* TAB 2: Analytics & Tracking */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              Marketing &amp; Web Analytics Tags
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
              Insert your measurement and tracking keys below. The system automatically initializes standard tracking on all public pages.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Google Analytics 4 (GA4 ID)
                </label>
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={settings.ga4MeasurementId}
                  onChange={(e) => handleChange('ga4MeasurementId', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. G-12345ABCDE</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Google Tag Manager (GTM ID)
                </label>
                <input
                  type="text"
                  placeholder="GTM-XXXXXXX"
                  value={settings.gtmContainerId}
                  onChange={(e) => handleChange('gtmContainerId', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>e.g. GTM-W9XYZ12</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Meta (Facebook) Pixel ID
                </label>
                <input
                  type="text"
                  placeholder="123456789012345"
                  value={settings.metaPixelId}
                  onChange={(e) => handleChange('metaPixelId', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Custom Header Embed Code (e.g. verification tags, hotjar)
              </label>
              <textarea
                rows={3}
                placeholder="<!-- Custom Head Scripts -->"
                value={settings.customHeadScripts}
                onChange={(e) => handleChange('customHeadScripts', e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.85rem' }}
              />
            </div>
          </div>
        )}

        {/* TAB 3: Affiliate & Compliance */}
        {activeTab === 'affiliate' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              Affiliate Tracking &amp; Compliance
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Default Outbound SubID / Source Tag
                </label>
                <input
                  type="text"
                  value={settings.defaultSubId}
                  onChange={(e) => handleChange('defaultSubId', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Appended to merchant affiliate links as ?subid=...</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Redirect Delay (milliseconds)
                </label>
                <input
                  type="number"
                  value={settings.redirectDelayMs}
                  onChange={(e) => handleChange('redirectDelayMs', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Set to 0 for instant 307 redirect</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Affiliate Disclosure &amp; FTC Notice
              </label>
              <textarea
                rows={3}
                value={settings.affiliateDisclosure}
                onChange={(e) => handleChange('affiliateDisclosure', e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
              />
            </div>
          </div>
        )}

        {/* TAB 4: Social Media Links */}
        {activeTab === 'social' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              Social Channels &amp; Profiles
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  X / Twitter Profile URL
                </label>
                <input
                  type="url"
                  value={settings.twitterUrl}
                  onChange={(e) => handleChange('twitterUrl', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) => handleChange('facebookUrl', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={settings.instagramUrl}
                  onChange={(e) => handleChange('instagramUrl', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Pinterest URL
                </label>
                <input
                  type="url"
                  value={settings.pinterestUrl}
                  onChange={(e) => handleChange('pinterestUrl', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={settings.youtubeUrl}
                  onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>
          </div>
        )}

      </form>

    </div>
  );
}
