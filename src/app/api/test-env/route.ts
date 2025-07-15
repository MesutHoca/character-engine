/**
 * Test Environment API Route
 * -------------------------
 * Provides a GET endpoint to check Anthropic API key and environment variable status for debugging.
 * Useful for verifying deployment and configuration in development or staging environments.
 */
import { NextResponse } from 'next/server';

/**
 * GET handler for the test environment API endpoint.
 * Returns Anthropic API key status, environment variables, and environment info as JSON.
 */
export async function GET() {
  return NextResponse.json({
    // Whether the Anthropic API key is set
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
    // Length of the API key (if set)
    anthropicKeyLength: process.env.ANTHROPIC_API_KEY?.length,
    // First 15 characters of the API key (for debugging, not full key)
    anthropicKeyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 15) + '...',
    // All environment variables related to Anthropic or API
    allEnvVars: Object.keys(process.env).filter(key => key.includes('ANTHROPIC') || key.includes('API')),
    // Node.js environment (development, production, etc.)
    nodeEnv: process.env.NODE_ENV,
    // Next.js public app URL (if set)
    nextEnv: process.env.NEXT_PUBLIC_APP_URL
  });
} 