'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { generateFaqSchema } from '@/lib/seo';

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
  subtitle = 'Find answers to common questions about saving money with verified coupons.',
  faqs,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const schemaData = generateFaqSchema(faqs);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {title && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
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
                borderRadius: 'var(--radius-lg)',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                style={{
                  width: '100%',
                  padding: '1.1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isOpen ? 'var(--bg-subtle)' : '#ffffff',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                }}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                    marginLeft: '1rem',
                  }}
                />
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '1.1rem 1.25rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.92rem',
                    lineHeight: '1.6',
                    borderTop: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
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
