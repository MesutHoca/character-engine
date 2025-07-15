/**
 * Personality Validation API Route
 * -------------------------------
 * POST /api/personality/validate
 * Validates a personality profile or trait set for a given system.
 *
 * Request body: {
 *   system: string, // e.g., 'BIG_FIVE', 'MBTI', etc.
 *   data: object    // Profile or trait data
 * }
 *
 * Response: {
 *   success: boolean,
 *   isValid?: boolean,
 *   errors?: string[],
 *   warnings?: string[],
 *   error?: string
 * }
 */
import { NextRequest, NextResponse } from 'next/server';
import { PersonalityEngine } from '../../../../lib/personality-engine';
import { BigFiveTraits, MBTIProfile, HEXACOProfile, DarkTriadProfile, TCIProfile, PersonalitySystemType } from '../../../../types/personality';

/**
 * POST handler for personality system validation.
 * Validates a profile or trait set for the specified system.
 * @param request - The Next.js request object.
 * @returns JSON response with validation result or error.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { system, data } = body;

    if (!system || !data) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: system or data.'
      }, { status: 400 });
    }

    let isValid = false;
    let errors: string[] = [];
    let warnings: string[] = [];

    switch (system as PersonalitySystemType) {
      case 'BIG_FIVE': {
        isValid = PersonalityEngine.validateBigFive(data as BigFiveTraits);
        if (!isValid) errors.push('Invalid Big Five trait values.');
        break;
      }
      case 'MBTI': {
        // Basic MBTI validation: check type string and dimension structure
        const profile = data as MBTIProfile;
        if (!profile.type || typeof profile.type !== 'string' || profile.type.length !== 4) {
          errors.push('Invalid MBTI type string.');
        }
        if (!profile.dimensions || typeof profile.dimensions !== 'object') {
          errors.push('Missing or invalid MBTI dimensions.');
        }
        isValid = errors.length === 0;
        break;
      }
      case 'HEXACO': {
        // HEXACO: check all six factors are present and 0-100
        const p = data as HEXACOProfile;
        const keys = ['honestyHumility', 'emotionality', 'extraversion', 'agreeableness', 'conscientiousness', 'openness'];
        isValid = keys.every(k => typeof (p as any)[k] === 'number' && (p as any)[k] >= 0 && (p as any)[k] <= 100);
        if (!isValid) errors.push('Invalid HEXACO profile values.');
        break;
      }
      case 'DARK_TRIAD': {
        // Dark Triad: check all three traits are present and 0-100
        const p = data as DarkTriadProfile;
        const keys = ['machiavellianism', 'narcissism', 'psychopathy'];
        isValid = keys.every(k => typeof (p as any)[k] === 'number' && (p as any)[k] >= 0 && (p as any)[k] <= 100);
        if (!isValid) errors.push('Invalid Dark Triad profile values.');
        break;
      }
      case 'TCI': {
        // TCI: check temperament and character objects exist
        const p = data as TCIProfile;
        isValid = !!(p.temperament && p.character);
        if (!isValid) errors.push('Missing temperament or character in TCI profile.');
        break;
      }
      default:
        return NextResponse.json({
          success: false,
          error: `Validation for system '${system}' is not supported.`
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      isValid,
      errors,
      warnings
    });
  } catch (error) {
    console.error('Validation API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to validate personality profile.'
    }, { status: 500 });
  }
} 