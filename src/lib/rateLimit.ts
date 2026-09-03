import { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }, 300000);
}

/**
 * Rate Limiter for Next.js API Routes
 * @param req NextRequest
 * @param maxRequests Maximum allowed requests within window
 * @param windowSeconds Window duration in seconds (default: 60)
 * @param prefix Unique bucket namespace
 */
export function checkRateLimit(
  req: NextRequest,
  maxRequests: number = 30,
  windowSeconds: number = 60,
  prefix: string = 'api'
): { success: boolean; remaining: number; reset: number } {
  // Extract client IP: Prioritize edge-verified headers that cannot be spoofed by clients
  const cfIp = req.headers.get('cf-connecting-ip')?.trim();
  const realIp = req.headers.get('x-real-ip')?.trim();
  const forwarded = req.headers.get('x-forwarded-for');
  
  // In a proxy chain, the last entry is appended by the nearest trusted edge proxy
  const forwardedParts = forwarded ? forwarded.split(',').map((s) => s.trim()).filter(Boolean) : [];
  const trustedForwardedIp = forwardedParts.length > 0 ? forwardedParts[forwardedParts.length - 1] : null;

  const ip = cfIp || realIp || trustedForwardedIp || '127.0.0.1';

  const key = `${prefix}:${ip}`;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      remaining: maxRequests - 1,
      reset: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxRequests) {
    const resetSec = Math.ceil((record.resetAt - now) / 1000);
    return {
      success: false,
      remaining: 0,
      reset: resetSec,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: maxRequests - record.count,
    reset: Math.ceil((record.resetAt - now) / 1000),
  };
}
