export type CountryCode = 'US' | 'UK' | 'AU' | 'CA' | 'DE' | 'FR' | 'IT' | 'NL';

export interface CountryItem {
  id: string;
  code: string;
  name: string;
  currencySymbol: string;
  currencyCode: string;
  flagIcon: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
  isFeatured: boolean;
}

export interface StoreItem {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  bannerUrl?: string | null;
  shortDescription?: string | null;
  longDescription?: string | null;
  merchantUrl: string;
  affiliateUrl: string;
  ratingScore: number;
  ratingCount: number;
  isFeatured: boolean;
  isPopular: boolean;
  coupons?: CouponItem[];
  deals?: DealItem[];
}

export interface CouponItem {
  id: string;
  storeId: string;
  store?: StoreItem;
  title: string;
  description?: string | null;
  couponCode?: string | null;
  discountValue: string;
  discountType: string;
  couponType: string;
  ctaText: string;
  affiliateUrlOverride?: string | null;
  isVerified: boolean;
  lastVerifiedAt: Date;
  expiryDate?: Date | null;
  successRate: number;
}

export interface DealItem {
  id: string;
  storeId: string;
  store?: StoreItem;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  dealUrl: string;
  affiliateUrl?: string | null;
  discountValue?: string | null;
  expiryDate?: Date | null;
  isFeatured: boolean;
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  authorName: string;
  readingTime: string;
  publishedAt: Date;
}

export interface ReviewItem {
  id: string;
  storeId: string;
  store?: StoreItem;
  title: string;
  slug: string;
  rating: number;
  summary?: string | null;
  prosJson?: string | null;
  consJson?: string | null;
  verdict?: string | null;
  detailedContent: string;
  authorName: string;
}
