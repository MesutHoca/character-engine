/**
 * Personality Comparison API Route
 * -------------------------------
 * POST /api/personality/compare
 * Compares two or more personality profiles across systems and returns similarity, agreement, or conflict.
 *
 * Request body: {
 *   profiles: Array<object>, // List of profiles to compare
 *   systems: Array<string>   // Systems to compare (optional)
 * }
 *
 * Response: {
 *   success: boolean,
 *   comparison?: object, // Comparison result (similarity, conflicts, etc.)
 *   error?: string
 * }
 */
import { NextRequest, NextResponse } from 'next/server';
import { BigFiveTraits } from '../../../../types/personality';

/**
 * Computes cosine similarity between two Big Five trait vectors.
 */
function cosineSimilarity(a: BigFiveTraits, b: BigFiveTraits): number {
  const keys = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  const va = keys.map(k => (a as any)[k] as number);
  const vb = keys.map(k => (b as any)[k] as number);
  const dot = va.reduce((sum, v, i) => sum + v * vb[i], 0);
  const normA = Math.sqrt(va.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(vb.reduce((sum, v) => sum + v * v, 0));
  if (normA === 0 || normB === 0) return 0;
  return dot / (normA * normB);
}

/**
 * POST handler for personality system comparison.
 * Compares two or more Big Five profiles for similarity/conflict.
 * @param request - The Next.js request object.
 * @returns JSON response with comparison result or error.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profiles, systems } = body;

    if (!profiles || !Array.isArray(profiles) || profiles.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'At least two profiles are required for comparison.'
      }, { status: 400 });
    }

    // For now, only support Big Five profile comparison
    const bigFiveProfiles = profiles as BigFiveTraits[];
    const n = bigFiveProfiles.length;
    const similarities: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    let minSim = 1, maxSim = 0, avgSim = 0;
    let count = 0;

    // Compute pairwise similarities
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const sim = cosineSimilarity(bigFiveProfiles[i], bigFiveProfiles[j]);
        similarities[i][j] = similarities[j][i] = sim;
        minSim = Math.min(minSim, sim);
        maxSim = Math.max(maxSim, sim);
        avgSim += sim;
        count++;
      }
    }
    avgSim = count > 0 ? avgSim / count : 0;

    // Detect conflicts (very low similarity)
    const conflicts: string[] = [];
    if (minSim < 0.7) {
      conflicts.push('Some profiles are highly dissimilar (cosine similarity < 0.7).');
    }

    return NextResponse.json({
      success: true,
      comparison: {
        pairwiseSimilarities: similarities,
        minSimilarity: minSim,
        maxSimilarity: maxSim,
        avgSimilarity: avgSim,
        conflicts
      }
    });
  } catch (error) {
    console.error('Comparison API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to compare personality profiles.'
    }, { status: 500 });
  }
} 