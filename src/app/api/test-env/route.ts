import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
    anthropicKeyLength: process.env.ANTHROPIC_API_KEY?.length,
    anthropicKeyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 15) + '...',
    allEnvVars: Object.keys(process.env).filter(key => key.includes('ANTHROPIC') || key.includes('API')),
    nodeEnv: process.env.NODE_ENV,
    nextEnv: process.env.NEXT_PUBLIC_APP_URL
  });
} 