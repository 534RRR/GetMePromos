import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { SITE_URL } from '@/lib/seo';
import { REGION_SLUGS } from '@/lib/regions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    SITE_URL && !SITE_URL.includes('localhost')
      ? SITE_URL
      : 'https://refpromos.com';

  const [stores, categories, blogs, reviews] = await Promise.all([
    prisma.store.findMany({
      where: { status: 'active' },
      select: { slug: true, updatedAt: true },
    }),
    prisma.category.findMany({
      select: { slug: true, updatedAt: true },
    }),
    prisma.blog.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    }),
    prisma.review.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/coupons`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stores`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Region entry pages (e.g. /us, /uk, /au, /ca, /de, /fr, /it, /nl)
  const regionPages: MetadataRoute.Sitemap = REGION_SLUGS.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const storeUrls: MetadataRoute.Sitemap = stores.map((s) => ({
    url: `${baseUrl}/stores/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const reviewUrls: MetadataRoute.Sitemap = reviews.map((r) => ({
    url: `${baseUrl}/reviews/${r.slug}`,
    lastModified: r.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...regionPages, ...storeUrls, ...categoryUrls, ...blogUrls, ...reviewUrls];
}

