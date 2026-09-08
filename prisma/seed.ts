import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting GetMePromos database seed...');

  // Check if database is already initialized
  try {
    const existingStores = await prisma.store.count();
    if (existingStores > 0) {
      console.log('✅ Database already seeded with stores. Skipping initial seed.');
      return;
    }
  } catch (e) {
    // Tables might not exist yet, continue with push/seed
  }

  // 1. Clean existing records (in dependency order)
  await prisma.clickLog.deleteMany().catch(() => {});
  await prisma.fAQ.deleteMany().catch(() => {});
  await prisma.review.deleteMany().catch(() => {});
  await prisma.blogCoupon.deleteMany().catch(() => {});
  await prisma.blogStore.deleteMany().catch(() => {});
  await prisma.blog.deleteMany().catch(() => {});
  await prisma.blogCategory.deleteMany().catch(() => {});
  await prisma.dealCountry.deleteMany().catch(() => {});
  await prisma.deal.deleteMany().catch(() => {});
  await prisma.couponCountry.deleteMany().catch(() => {});
  await prisma.coupon.deleteMany().catch(() => {});
  await prisma.storeCategory.deleteMany().catch(() => {});
  await prisma.storeCountry.deleteMany().catch(() => {});
  await prisma.store.deleteMany().catch(() => {});
  await prisma.category.deleteMany().catch(() => {});
  await prisma.country.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});
  await prisma.siteSetting.deleteMany().catch(() => {});

  // 2. Seed Super Admin User from Environment
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@getmepromos.com').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminRefPromos2026!#';

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash,
      name: 'Super Admin',
      role: 'super_admin',
      isActive: true,
    },
  });
  console.log('✅ Super Admin user seeded successfully.');

  // 3. Seed Countries
  const countriesData = [
    { code: 'US', name: 'United States', currencySymbol: '$', currencyCode: 'USD', flagIcon: '🇺🇸', sortOrder: 1 },
    { code: 'UK', name: 'United Kingdom', currencySymbol: '£', currencyCode: 'GBP', flagIcon: '🇬🇧', sortOrder: 2 },
    { code: 'AU', name: 'Australia', currencySymbol: 'A$', currencyCode: 'AUD', flagIcon: '🇦🇺', sortOrder: 3 },
    { code: 'CA', name: 'Canada', currencySymbol: 'C$', currencyCode: 'CAD', flagIcon: '🇨🇦', sortOrder: 4 },
    { code: 'DE', name: 'Germany', currencySymbol: '€', currencyCode: 'EUR', flagIcon: '🇩🇪', sortOrder: 5 },
    { code: 'FR', name: 'France', currencySymbol: '€', currencyCode: 'EUR', flagIcon: '🇫🇷', sortOrder: 6 },
    { code: 'IT', name: 'Italy', currencySymbol: '€', currencyCode: 'EUR', flagIcon: '🇮🇹', sortOrder: 7 },
    { code: 'NL', name: 'Netherlands', currencySymbol: '€', currencyCode: 'EUR', flagIcon: '🇳🇱', sortOrder: 8 },
  ];

  const countries: Record<string, any> = {};
  for (const c of countriesData) {
    countries[c.code] = await prisma.country.create({ data: c });
  }
  console.log('✅ 8 Countries seeded.');

  // 4. Seed Categories
  const categoriesData = [
    { name: 'Fashion & Apparel', slug: 'fashion', icon: 'Shirt', isFeatured: true, description: 'Discounts on clothing, shoes, and designer apparel.' },
    { name: 'Electronics & Computers', slug: 'electronics', icon: 'Laptop', isFeatured: true, description: 'Laptops, smartphones, TVs, and gaming gear promos.' },
    { name: 'Beauty & Skincare', slug: 'beauty', icon: 'Sparkles', isFeatured: true, description: 'Cosmetics, skincare, perfumes, and haircare coupons.' },
    { name: 'Home & Garden', slug: 'home-garden', icon: 'Home', isFeatured: true, description: 'Furniture, kitchen appliances, and home decor sales.' },
    { name: 'Travel & Flights', slug: 'travel', icon: 'Plane', isFeatured: true, description: 'Hotels, airline tickets, car rentals, and vacation deals.' },
    { name: 'Sports & Outdoors', slug: 'sports', icon: 'Activity', isFeatured: true, description: 'Fitness gear, activewear, camping, and outdoor equipment.' },
    { name: 'Food & Beverages', slug: 'food-dining', icon: 'Utensils', isFeatured: true, description: 'Food delivery coupons, meal kits, and dining deals.' },
    { name: 'Software & Tech', slug: 'software', icon: 'Code', isFeatured: true, description: 'VPNs, antivirus, cloud storage, and SaaS subscription deals.' },
  ];

  const categories: Record<string, any> = {};
  for (const cat of categoriesData) {
    categories[cat.slug] = await prisma.category.create({ data: cat });
  }
  console.log('✅ 8 Categories seeded.');

  // 5. Seed Blog Categories
  const blogCatsData = [
    { name: 'Shopping Guides', slug: 'shopping-guides', description: 'Expert guides to maximize your savings.' },
    { name: 'Deals & Roundups', slug: 'deals-roundups', description: 'Seasonal sales, Prime day, and Black Friday roundups.' },
    { name: 'Money Saving Tips', slug: 'money-saving', description: 'Actionable tips to cut down everyday shopping expenses.' },
  ];

  const blogCategories: Record<string, any> = {};
  for (const bCat of blogCatsData) {
    blogCategories[bCat.slug] = await prisma.blogCategory.create({ data: bCat });
  }

  // 6. Seed Stores
  const storesData = [
    {
      name: 'Nike',
      slug: 'nike',
      logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&auto=format&fit=crop&q=80',
      shortDescription: 'World leader in athletic footwear, activewear, and sports equipment.',
      longDescription: 'Nike delivers innovative products, experiences, and services to inspire athletes worldwide. Find exclusive Nike promo codes, student discounts, and free shipping vouchers right here.',
      merchantUrl: 'https://www.nike.com',
      affiliateUrl: 'https://www.nike.com/?ref=getmepromos',
      ratingScore: 4.8,
      ratingCount: 342,
      isFeatured: true,
      isPopular: true,
      categorySlugs: ['fashion', 'sports'],
      countryCodes: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL'],
    },
    {
      name: 'Amazon',
      slug: 'amazon',
      logoUrl: 'https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1hem9uJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D',
      bannerUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80',
      shortDescription: 'The biggest online retailer with millions of daily discounts and Lightning Deals.',
      longDescription: 'Shop millions of products across electronics, fashion, groceries, and home goods with Amazon promo codes, Prime savings, and daily Lightning Deals.',
      merchantUrl: 'https://www.amazon.com',
      affiliateUrl: 'https://www.amazon.com/?tag=getmepromos-20',
      ratingScore: 4.9,
      ratingCount: 1250,
      isFeatured: true,
      isPopular: true,
      categorySlugs: ['electronics', 'home-garden', 'fashion'],
      countryCodes: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL'],
    },
    {
      name: 'ASOS',
      slug: 'asos',
      logoUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80',
      shortDescription: 'Destination for fashion-loving 20-somethings offering 850+ top clothing brands.',
      longDescription: 'ASOS offers trendy apparel, shoes, and beauty products with constant discount codes, seasonal clearances, and premier delivery options.',
      merchantUrl: 'https://www.asos.com',
      affiliateUrl: 'https://www.asos.com/?ref=getmepromos',
      ratingScore: 4.6,
      ratingCount: 189,
      isFeatured: true,
      isPopular: true,
      categorySlugs: ['fashion', 'beauty'],
      countryCodes: ['US', 'UK', 'AU', 'DE', 'FR', 'IT', 'NL'],
    },
    {
      name: 'Walmart',
      slug: 'walmart',
      logoUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
      shortDescription: 'Save money and live better with everyday low prices and Rollback savings.',
      longDescription: 'Walmart offers grocery, tech, toys, apparel, and home essentials with curbside pickup, Rollback discounts, and free shipping coupons.',
      merchantUrl: 'https://www.walmart.com',
      affiliateUrl: 'https://www.walmart.com/?ref=getmepromos',
      ratingScore: 4.4,
      ratingCount: 420,
      isFeatured: true,
      isPopular: true,
      categorySlugs: ['electronics', 'home-garden', 'food-dining'],
      countryCodes: ['US', 'CA'],
    },
    {
      name: 'Best Buy',
      slug: 'best-buy',
      logoUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
      shortDescription: 'Top retailer for computers, smartphones, appliances, and gaming setups.',
      longDescription: 'Find tech deals of the day, student discount codes, and clearance sales on Apple, Samsung, Sony, and Dell products at Best Buy.',
      merchantUrl: 'https://www.bestbuy.com',
      affiliateUrl: 'https://www.bestbuy.com/?ref=getmepromos',
      ratingScore: 4.7,
      ratingCount: 290,
      isFeatured: true,
      isPopular: true,
      categorySlugs: ['electronics', 'software'],
      countryCodes: ['US', 'CA'],
    },
    {
      name: 'Sephora',
      slug: 'sephora',
      logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&auto=format&fit=crop&q=80',
      shortDescription: 'Premier beauty shopping destination for makeup, fragrance, and skincare.',
      longDescription: 'Get Beauty Insider points, free deluxe samples, and promo codes for top beauty brands like Fenty, Rare Beauty, Dior, and Olaplex.',
      merchantUrl: 'https://www.sephora.com',
      affiliateUrl: 'https://www.sephora.com/?ref=getmepromos',
      ratingScore: 4.8,
      ratingCount: 512,
      isFeatured: true,
      isPopular: true,
      categorySlugs: ['beauty'],
      countryCodes: ['US', 'CA', 'FR'],
    },
    {
      name: 'Booking.com',
      slug: 'booking-com',
      logoUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80',
      shortDescription: 'Book hotels, flights, and holiday home rentals with Genius loyalty discounts.',
      longDescription: 'Save 15% or more on thousands of hotels worldwide with Booking.com Genius discounts, promotional coupons, and seasonal getaways.',
      merchantUrl: 'https://www.booking.com',
      affiliateUrl: 'https://www.booking.com/?ref=getmepromos',
      ratingScore: 4.6,
      ratingCount: 680,
      isFeatured: true,
      isPopular: true,
      categorySlugs: ['travel'],
      countryCodes: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL'],
    },
    {
      name: 'NordVPN',
      slug: 'nordvpn',
      logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
      shortDescription: 'Top-rated cybersecurity & VPN service protecting your online privacy.',
      longDescription: 'Secure your internet connection and unlock global streaming with up to 70% off 2-year NordVPN subscriptions + 3 extra free months.',
      merchantUrl: 'https://www.nordvpn.com',
      affiliateUrl: 'https://www.nordvpn.com/?ref=getmepromos',
      ratingScore: 4.9,
      ratingCount: 310,
      isFeatured: true,
      isPopular: false,
      categorySlugs: ['software'],
      countryCodes: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL'],
    },
  ];

  const stores: Record<string, any> = {};
  for (const s of storesData) {
    const { categorySlugs, countryCodes, ...storeData } = s;
    const store = await prisma.store.create({ data: storeData });
    stores[s.slug] = store;

    // Link Categories
    for (const catSlug of categorySlugs) {
      if (categories[catSlug]) {
        await prisma.storeCategory.create({
          data: { storeId: store.id, categoryId: categories[catSlug].id },
        });
      }
    }

    // Link Countries
    for (const cCode of countryCodes) {
      if (countries[cCode]) {
        await prisma.storeCountry.create({
          data: { storeId: store.id, countryId: countries[cCode].id },
        });
      }
    }
  }
  console.log('✅ 8 Stores seeded with categories and country links.');

  // 7. Seed Coupons & Deals
  const couponsData = [
    // Nike
    {
      storeSlug: 'nike',
      title: '25% OFF on Orders Over $100 Sitewide',
      description: 'Get an instant 25% discount on running shoes, apparel, and accessories when you spend $100 or more.',
      couponCode: 'SAVE25',
      discountValue: '25% OFF',
      discountType: 'percentage',
      couponType: 'coupon_code',
      ctaText: 'Get Code',
      isVerified: true,
      isFeatured: true,
      successRate: 100,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'UK', 'AU', 'CA'],
    },
    {
      storeSlug: 'nike',
      title: 'Free Shipping on All Orders for Nike Members',
      description: 'Sign up for a free Nike Member account and enjoy standard free delivery on any purchase without minimum spend.',
      couponCode: null,
      discountValue: 'Free Shipping',
      discountType: 'free_shipping',
      couponType: 'deal',
      ctaText: 'Get Deal',
      isVerified: true,
      isFeatured: true,
      successRate: 98,
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL'],
    },
    {
      storeSlug: 'nike',
      title: 'Extra 20% OFF Clearance & Sale Items',
      description: 'Save an additional 20% on already reduced footwear and sportswear clearance lines.',
      couponCode: 'JUSTDOIT20',
      discountValue: '20% OFF',
      discountType: 'percentage',
      couponType: 'coupon_code',
      ctaText: 'Get Code',
      isVerified: true,
      isFeatured: false,
      successRate: 95,
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'UK'],
    },

    // Amazon
    {
      storeSlug: 'amazon',
      title: 'Up to 50% OFF Daily Lightning Deals',
      description: 'Save big on tech gadgets, kitchen appliances, and fashion with limited-time Amazon Lightning Deals.',
      couponCode: null,
      discountValue: 'Up to 50% OFF',
      discountType: 'percentage',
      couponType: 'deal',
      ctaText: 'Get Deal',
      isVerified: true,
      isFeatured: true,
      successRate: 100,
      expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL'],
    },
    {
      storeSlug: 'amazon',
      title: '$15 OFF First Amazon App Order of $30+',
      description: 'Download the Amazon Shopping App and use this promotional code to save $15 on your first eligible order.',
      couponCode: 'APP15OFF',
      discountValue: '$15 OFF',
      discountType: 'fixed_amount',
      couponType: 'coupon_code',
      ctaText: 'Get Code',
      isVerified: true,
      isFeatured: true,
      successRate: 92,
      expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'UK', 'CA'],
    },

    // ASOS
    {
      storeSlug: 'asos',
      title: '20% OFF First Order with ASOS App',
      description: 'Exclusive newcomer promo: enjoy 20% off all trending outfits on your first mobile order.',
      couponCode: 'ASOSNEW20',
      discountValue: '20% OFF',
      discountType: 'percentage',
      couponType: 'coupon_code',
      ctaText: 'Get Code',
      isVerified: true,
      isFeatured: true,
      successRate: 99,
      expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'UK', 'AU', 'DE', 'FR'],
    },
    {
      storeSlug: 'asos',
      title: 'Up to 70% OFF Mid-Season Fashion Clearance',
      description: 'Massive price cuts across thousands of dresses, jackets, sneakers, and accessories.',
      couponCode: null,
      discountValue: 'Up to 70% OFF',
      discountType: 'percentage',
      couponType: 'sale',
      ctaText: 'Shop Sale',
      isVerified: true,
      isFeatured: false,
      successRate: 100,
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'UK', 'AU', 'DE', 'FR', 'IT', 'NL'],
    },

    // Best Buy
    {
      storeSlug: 'best-buy',
      title: '$100 OFF Select Laptops & MacBooks',
      description: 'Upgrade your workstation with instant $100 price cuts on popular Windows laptops and Apple MacBooks.',
      couponCode: 'TECH100',
      discountValue: '$100 OFF',
      discountType: 'fixed_amount',
      couponType: 'promo_code',
      ctaText: 'Get Code',
      isVerified: true,
      isFeatured: true,
      successRate: 96,
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'CA'],
    },

    // Sephora
    {
      storeSlug: 'sephora',
      title: 'Free 8-Piece Luxury Skincare Sample Bag with $45+ Order',
      description: 'Receive a curated deluxe sample set from high-end skincare brands when you spend $45 or more.',
      couponCode: 'GLOWBAG',
      discountValue: 'Free Gift',
      discountType: 'other',
      couponType: 'coupon_code',
      ctaText: 'Get Code',
      isVerified: true,
      isFeatured: true,
      successRate: 100,
      expiryDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'CA'],
    },

    // NordVPN
    {
      storeSlug: 'nordvpn',
      title: '71% OFF 2-Year Plan + 3 Extra Months Free',
      description: 'Protect all your devices and stream safely worldwide with NordVPN at just $3.39/month.',
      couponCode: 'NORDDEAL',
      discountValue: '71% OFF',
      discountType: 'percentage',
      couponType: 'deal',
      ctaText: 'Claim Offer',
      isVerified: true,
      isFeatured: true,
      successRate: 100,
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      countryCodes: ['US', 'UK', 'AU', 'CA', 'DE', 'FR', 'IT', 'NL'],
    },
  ];

  const seededCoupons: any[] = [];
  for (const c of couponsData) {
    const { storeSlug, countryCodes, ...cData } = c;
    const store = stores[storeSlug];
    if (!store) continue;

    const coupon = await prisma.coupon.create({
      data: {
        ...cData,
        storeId: store.id,
      },
    });
    seededCoupons.push(coupon);

    for (const code of countryCodes) {
      if (countries[code]) {
        await prisma.couponCountry.create({
          data: {
            couponId: coupon.id,
            countryId: countries[code].id,
          },
        });
      }
    }
  }
  console.log(`✅ ${seededCoupons.length} Coupons seeded.`);

  // 8. Seed Store FAQs
  const faqs = [
    { storeSlug: 'nike', question: 'How do I use a Nike promo code on GetMePromos?', answer: 'Click "Get Code", copy the revealed voucher string, and paste it into the "Do you have a promo code?" box on the Nike checkout payment page.' },
    { storeSlug: 'nike', question: 'Does Nike offer a student discount?', answer: 'Yes! Eligible college and university students can unlock a 10% discount verified through SheerID.' },
    { storeSlug: 'nike', question: 'Can I get free shipping on Nike orders?', answer: 'Yes, Nike Members always receive free standard shipping with zero minimum spend threshold.' },
    { storeSlug: 'amazon', question: 'Where can I enter my Amazon promo code?', answer: 'During checkout on Amazon, navigate to the "Payment Method" step and enter your promo code in the "Gift Cards & Promotional Codes" box.' },
    { storeSlug: 'asos', question: 'Does ASOS offer student discount codes?', answer: 'Yes, ASOS offers a verified 10% student discount that remains active until you graduate.' },
  ];

  for (const f of faqs) {
    const store = stores[f.storeSlug];
    if (store) {
      await prisma.fAQ.create({
        data: {
          storeId: store.id,
          question: f.question,
          answer: f.answer,
        },
      });
    }
  }
  console.log('✅ Store FAQs seeded.');

  // 9. Seed Store Reviews
  await prisma.review.create({
    data: {
      storeId: stores['nike'].id,
      title: 'Nike Store Review 2026: Is It Worth Shopping Directly?',
      slug: 'nike-store-review',
      rating: 4.8,
      summary: 'Nike is unmatched for build quality, cutting-edge running tech, and generous member perks.',
      prosJson: JSON.stringify(['Free shipping & returns for Nike Members', 'Exclusive early product drops on the SNKRS app', 'Generous 10% verified student discount', 'Industry-leading sneaker innovations']),
      consJson: JSON.stringify(['High-demand releases sell out within seconds', 'Premium pricing compared to generic alternatives']),
      verdict: 'If you want 100% authentic gear, official manufacturer warranty, and free returns, shopping directly with Nike promo codes is your best bet.',
      detailedContent: 'Shopping directly from Nike offers distinct advantages over third-party retailers. By stacking official Nike coupon codes with member-exclusive sales, you can routinely save 20% to 40% on sneakers and activewear.',
      authorName: 'Muhammad Ali Abrar',
    },
  });

  await prisma.review.create({
    data: {
      storeId: stores['amazon'].id,
      title: 'Amazon Online Shopping Review: Maximizing Daily Deals',
      slug: 'amazon-review',
      rating: 4.9,
      summary: 'Unbeatable logistics, gigantic catalog, and massive daily Lightning Deal discounts.',
      prosJson: JSON.stringify(['Prime 1-day free delivery', 'Huge catalog covering all categories', 'Daily Lightning Deals with up to 70% discounts', 'Frictionless return process']),
      consJson: JSON.stringify(['Prices fluctuate dynamically multiple times per day', 'Third-party sellers require checking verified reviews']),
      verdict: 'Amazon remains the go-to online shopping platform. Combining digital coupons with Lightning Deals unlocks the highest value.',
      detailedContent: 'Amazon is a shopping titan. With digital clip-coupons and seasonal events like Prime Day, shoppers can achieve significant savings.',
      authorName: 'Muhammad Ali Abrar',
    },
  });
  console.log('✅ In-depth Store Reviews seeded.');

  // 10. Seed Blogs & Buying Guides
  const blog1 = await prisma.blog.create({
    data: {
      categoryId: blogCategories['shopping-guides'].id,
      title: '10 Ways to Save More Online Shopping in 2026',
      slug: '10-ways-to-save-more-online-shopping-2026',
      excerpt: 'Discover insider strategies to stack promo codes, avoid hidden checkout fees, and unlock exclusive discounts.',
      featuredImage: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1000&auto=format&fit=crop&q=80',
      authorName: 'GetMePromos Editorial',
      readingTime: '6 min read',
      status: 'published',
      content: `
# 10 Smart Ways to Save Money Online in 2026

Online shopping doesn't have to break your wallet. With a few smart shopping habits, you can routinely save 20% to 50% on every order.

## 1. Always Check for Verified Promo Codes First
Before clicking the checkout button, take 30 seconds to check GetMePromos for active coupons. A simple code like \`SAVE25\` or \`FREESHIP\` can instantly drop your order total.

## 2. Leverage First-Order Mobile App Promos
Many major retailers like ASOS, Amazon, and Nike offer higher discount rates (15% to 20% off) exclusively on their mobile apps.

## 3. Stack Promo Codes with Clearance Sales
The greatest savings occur when you apply a promo code on top of an existing clearance or seasonal sale item.

## 4. Join Free Brand Loyalty Programs
Most stores offer free loyalty programs (e.g., Nike Membership or Sephora Beauty Insider) that provide free standard shipping with zero minimum spend requirements.
      `,
    },
  });

  // Link blog1 to Nike and Amazon
  await prisma.blogStore.create({ data: { blogId: blog1.id, storeId: stores['nike'].id } });
  await prisma.blogStore.create({ data: { blogId: blog1.id, storeId: stores['amazon'].id } });

  const blog2 = await prisma.blog.create({
    data: {
      categoryId: blogCategories['deals-roundups'].id,
      title: 'Best Summer Sales & Coupon Stacking Strategies You Shouldn’t Miss',
      slug: 'best-summer-sales-coupon-stacking-guide',
      excerpt: 'A comprehensive roundup of this season’s biggest price drops across fashion, electronics, and travel.',
      featuredImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1000&auto=format&fit=crop&q=80',
      authorName: 'Deal Experts Team',
      readingTime: '5 min read',
      status: 'published',
      content: `
# Best Summer Sales & Coupon Stacking Strategies

Summer is one of the premier shopping periods of the year. From mid-season fashion markdowns to 4th of July tech doorbusters, here is how you can maximize every dollar.

## Top Retailers with Massive Summer Markdowns:
- **Nike**: Up to 40% off summer running apparel and lifestyle sneakers.
- **ASOS**: Clearance discounts up to 70% off seasonal swimwear and dresses.
- **Best Buy**: Laptops and gaming monitor doorbusters.
      `,
    },
  });

  await prisma.blogStore.create({ data: { blogId: blog2.id, storeId: stores['asos'].id } });
  await prisma.blogStore.create({ data: { blogId: blog2.id, storeId: stores['best-buy'].id } });
  console.log('✅ Blogs & Buying Guides seeded.');

  // 11. Seed Site Settings
  const settingsData = [
    { key: 'site_name', value: 'GetMePromos', groupName: 'branding' },
    { key: 'site_tagline', value: 'Verified Coupons, Promo Codes & Deals for Savvy Shoppers', groupName: 'branding' },
    { key: 'contact_email', value: 'support@getmepromos.com', groupName: 'contact' },
    { key: 'social_instagram', value: 'https://instagram.com/getmepromos', groupName: 'social' },
    { key: 'social_facebook', value: 'https://facebook.com/getmepromos', groupName: 'social' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/getmepromos', groupName: 'social' },
    { key: 'ga4_id', value: 'G-GETMEPROMOS2026', groupName: 'analytics' },
    { key: 'gtm_id', value: 'GTM-GETMEPROMOS', groupName: 'analytics' },
    { key: 'default_country', value: 'US', groupName: 'general' },
  ];

  for (const s of settingsData) {
    await prisma.siteSetting.create({ data: s });
  }
  console.log('✅ Site Settings seeded.');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
