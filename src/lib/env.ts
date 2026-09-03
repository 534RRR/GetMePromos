/**
 * Environment Variable Validation Utility for GrabYourDealz
 */

export function validateEnvironment(): void {
  const requiredEnvVars = ['DATABASE_URL'];

  if (process.env.NODE_ENV === 'production') {
    requiredEnvVars.push('JWT_SECRET', 'IP_SALT');
  }

  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`[SECURITY FATAL] Missing required environment variables: ${missing.join(', ')}`);
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    throw new Error('[SECURITY FATAL] JWT_SECRET must be at least 32 characters long.');
  }
}