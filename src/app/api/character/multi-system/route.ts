/**
 * Multi-System Character Creation API Route
 * ----------------------------------------
 * POST /api/character/multi-system
 * Creates a character profile with all supported personality systems (Big Five, MBTI, HEXACO, etc.).
 *
 * Request body: {
 *   traits: object, // Big Five trait values (base input)
 *   options?: object // Additional options (e.g., includeInsights, characterType)
 * }
 *
 * Response: {
 *   success: boolean,
 *   profile?: object, // Unified personality profile
 *   error?: string
 * }
 */
import { NextRequest, NextResponse } from 'next/server';
import { PersonalityEngine } from '../../../../lib/personality-engine';
import { BigFiveTraits } from '../../../../types/personality';

/**
 * POST handler for multi-system character creation.
 * Generates a unified profile with all supported systems from Big Five traits.
 * @param request - The Next.js request object.
 * @returns JSON response with unified profile or error.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { traits, options } = body;

    if (!traits) {
      return NextResponse.json({
        success: false,
        error: 'Missing required field: traits.'
      }, { status: 400 });
    }

    // Validate Big Five trait structure
    if (!PersonalityEngine.validateBigFive(traits as BigFiveTraits)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid Big Five trait values.'
      }, { status: 400 });
    }

    // Generate all system profiles
    const profile = PersonalityEngine.generateAllSystems(traits as BigFiveTraits);

    // Optionally, add more metadata or insights here using options

    return NextResponse.json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Multi-system character API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate multi-system character profile.'
    }, { status: 500 });
  }
} 