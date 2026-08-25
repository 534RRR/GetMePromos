import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo';

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
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
                    gap: '0.25rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  <Home size={14} />
                  <span>Home</span>
                </Link>
              ) : isLast ? (
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Link>
              )}

              {!isLast && (
                <ChevronRight size={14} color="var(--text-muted)" style={{ opacity: 0.6 }} />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
