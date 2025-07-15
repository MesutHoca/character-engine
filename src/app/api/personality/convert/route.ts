/**
 * Personality Conversion API Route
 * -------------------------------
 * POST /api/personality/convert
 * Converts personality data between supported systems (e.g., Big Five to MBTI, HEXACO, etc.).
 *
 * Request body: {
 *   sourceSystem: string, // e.g., 'BIG_FIVE'
 *   targetSystem: string, // e.g., 'MBTI'
 *   data: object         // Source system data (traits/profile)
 * }
 *
 * Response: {
 *   success: boolean,
 *   result?: object,     // Converted profile
 *   error?: string
 * }
 */
import { NextRequest, NextResponse } from 'next/server';
import { PersonalityEngine } from '../../../../lib/personality-engine';
import { BigFiveTraits, PersonalitySystemType } from '../../../../types/personality';

/**
 * POST handler for personality system conversion.
 * Converts Big Five traits to MBTI, HEXACO, Dark Triad, or TCI profiles.
 * @param request - The Next.js request object.
 * @returns JSON response with converted profile or error.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceSystem, targetSystem, data } = body;

    // Validate input
    if (!sourceSystem || !targetSystem || !data) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: sourceSystem, targetSystem, or data.'
      }, { status: 400 });
    }

    // Only support Big Five as source for now
    if (sourceSystem !== 'BIG_FIVE') {
      return NextResponse.json({
        success: false,
        error: 'Only BIG_FIVE as sourceSystem is currently supported.'
      }, { status: 400 });
    }

    // Validate Big Five trait structure
    const traits = data as BigFiveTraits;
    if (!PersonalityEngine.validateBigFive(traits)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid Big Five trait values.'
      }, { status: 400 });
    }

    let result: object | undefined;
    switch (targetSystem as PersonalitySystemType) {
      case 'MBTI':
        result = PersonalityEngine.convertBigFiveToMBTI(traits);
        break;
      case 'HEXACO':
        result = PersonalityEngine.convertBigFiveToHEXACO(traits);
        break;
      case 'DARK_TRIAD':
        result = PersonalityEngine.convertBigFiveToDarkTriad(traits);
        break;
      case 'TCI':
        result = PersonalityEngine.convertBigFiveToTCI(traits);
        break;
      default:
        return NextResponse.json({
          success: false,
          error: `Conversion to targetSystem '${targetSystem}' is not supported.`
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Conversion API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to convert personality profile.'
    }, { status: 500 });
  }
} 