import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Standardized API Error Response with Incident Correlation ID
 *
 * Guarantees that:
 * 1. The client receives only a clean, sanitized public error message and a unique correlation ID.
 * 2. Detailed stack traces, internal query parameters, and system paths are logged exclusively
 *    to server-side logs tagged with that exact correlation ID.
 * 3. Never leaks internal exceptions to users or potential attackers.
 */
export function createErrorResponse(
  publicMessage: string,
  error?: unknown,
  status: number = 500
): NextResponse {
  const correlationId = crypto.randomUUID();

  // Detailed diagnostics go to server-side logs only
  if (error) {
    console.error(`[API ERROR] [Correlation ID: ${correlationId}]`, error);
  } else {
    console.error(`[API ERROR] [Correlation ID: ${correlationId}] Public Message: ${publicMessage}`);
  }

  return NextResponse.json(
    {
      error: publicMessage,
      correlationId,
    },
    { status }
  );
}
