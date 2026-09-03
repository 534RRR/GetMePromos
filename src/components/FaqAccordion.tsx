'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { generateFaqSchema, safeJsonLd } from '@/lib/seo';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title?: string;
  subtitle?: string;
  faqs: FaqItem[];
}

export default function FaqAccordion({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about redeeming verified coupons and saving online.',
  faqs,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const schemaData = generateFaqSchema(faqs);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schemaData) }}
      />

      {title && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-heading)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-card)',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                style={{
                  width: '100%',
                  padding: '1.15rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isOpen ? 'var(--primary-subtle)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  color: 'var(--text-heading)',
                }}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: isOpen ? 'var(--primary)' : 'var(--slate-400)',
                    flexShrink: 0,
                    marginLeft: '1rem',
                  }}
                />
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '1.15rem 1.4rem',
                    color: 'var(--text-main)',
                    fontSize: '0.92rem',
                    lineHeight: '1.65',
                    borderTop: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card-subtle)',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
