export const SITE_NAME = 'GrabYourDealz';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://grabyourdealz.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

/**
 * Generates Schema.org Organization structured data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/grabyourdealz',
      'https://facebook.com/grabyourdealz',
      'https://instagram.com/grabyourdealz',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@grabyourdealz.com',
    },
  };
}

/**
 * Generates Schema.org WebSite structured data with SearchAction
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/coupons?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generates Schema.org BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generates Schema.org Store / OnlineBusiness structured data
 */
export function generateStoreSchema(
  store: {
    name: string;
    slug: string;
    logoUrl: string;
    shortDescription?: string | null;
    ratingScore?: number;
    ratingCount?: number;
    merchantUrl?: string;
  },
  coupons: Array<{
    id: string;
    title: string;
    discountValue: string;
    couponCode?: string | null;
    expiryDate?: Date | string | null;
  }> = []
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: store.name,
    url: `${SITE_URL}/stores/${store.slug}`,
    image: store.logoUrl,
    description: store.shortDescription || `Find verified coupons, promo codes, and daily deals for ${store.name}.`,
    ...(store.merchantUrl && { sameAs: store.merchantUrl }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (store.ratingScore || 4.8).toFixed(1),
      reviewCount: store.ratingCount || 12,
      bestRating: '5',
      worstRating: '1',
    },
    makesOffer: coupons.map((c) => ({
      '@type': 'Offer',
      name: c.title,
      description: `${c.discountValue} discount for ${store.name}`,
      url: `${SITE_URL}/out/coupon/${c.id}`,
      availability: 'https://schema.org/InStock',
      ...(c.expiryDate && { priceValidUntil: new Date(c.expiryDate).toISOString().split('T')[0] }),
    })),
  };
}

/**
 * Generates Schema.org Article / BlogPosting structured data
 */
export function generateArticleSchema(blog: {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  authorName?: string;
  publishedAt?: Date | string;
  updatedAt?: Date | string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt || blog.title,
    image: blog.featuredImage || DEFAULT_OG_IMAGE,
    datePublished: new Date(blog.publishedAt || Date.now()).toISOString(),
    dateModified: new Date(blog.updatedAt || Date.now()).toISOString(),
    author: {
      '@type': 'Person',
      name: blog.authorName || 'GrabYourDealz Editorial',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${blog.slug}`,
    },
  };
}

/**
 * Generates Schema.org Review structured data
 */
export function generateReviewSchema(
  review: {
    title: string;
    slug: string;
    rating: number;
    summary?: string | null;
    authorName?: string;
    verdict?: string | null;
  },
  store: {
    name: string;
    slug: string;
    logoUrl: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: store.name,
      image: store.logoUrl,
      url: `${SITE_URL}/stores/${store.slug}`,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: review.authorName || 'Deal Experts Team',
    },
    reviewBody: review.summary || review.verdict || `Comprehensive store review of ${store.name}.`,
  };
}

/**
 * Generates Schema.org FAQPage structured data
 */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
