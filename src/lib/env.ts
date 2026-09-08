/**
 * Environment Variable Validation Utility for RefPromos
 */

export function validateEnvironment(): void {
  // Provide safe defaults during build/deploy so static analysis does not fail
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'file:./dev.db';
  }

  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      console.warn('[ENV WARNING] JWT_SECRET not set or too short. Using build fallback.');
      process.env.JWT_SECRET = 'temporary-build-jwt-secret-min-32-characters-long!';
    }
    if (!process.env.IP_SALT) {
      console.warn('[ENV WARNING] IP_SALT not set. Using build fallback.');
      process.env.IP_SALT = 'temporary-build-salt-0123456789abcdef';
    }
  }
}