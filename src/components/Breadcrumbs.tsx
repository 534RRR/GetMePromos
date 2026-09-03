import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema, safeJsonLd } from '@/lib/seo';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', url: '/' }, ...items];
  const schemaData = generateBreadcrumbSchema(allItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schemaData) }}
      />

      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.84rem',
          color: 'var(--slate-500)',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
        }}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <React.Fragment key={item.url + index}>
              {index === 0 ? (
                <Link
                  href={item.url}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--slate-600)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  <Home size={14} color="var(--primary)" />
                  <span>Home</span>
                </Link>
              ) : isLast ? (
                <span style={{ color: 'var(--primary-hover)', fontWeight: 700 }}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  style={{
                    color: 'var(--slate-600)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </Link>
              )}

              {!isLast && (
                <ChevronRight size={13} color="var(--slate-400)" style={{ flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
