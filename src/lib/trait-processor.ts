import { CharacterTraits } from '../types/character';

/**
 * Converts numerical Big Five personality traits into detailed, psychologically accurate descriptions.
 * Includes behavioral manifestations and speech patterns for each trait level.
 */
export function generateTraitDescriptions(traits: CharacterTraits): Record<string, string> {
  const descriptions: Record<string, string> = {};

  // Openness
  if (traits.openness <= 30) {
    descriptions.openness = `Low Openness: Prefers tradition and routine, values practicality over imagination. Speech is concrete, avoids abstract topics, and tends to resist change.`;
  } else if (traits.openness <= 70) {
    descriptions.openness = `Moderate Openness: Balances curiosity with practicality. Enjoys new experiences but also appreciates familiar routines. Speech is a mix of concrete and abstract, open to new ideas but not easily swayed.`;
  } else {
    descriptions.openness = `High Openness: Highly imaginative, creative, and curious. Seeks novelty and variety, enjoys abstract thinking and unconventional ideas. Speech is expressive, metaphorical, and often explores possibilities.`;
  }

  // Conscientiousness
  if (traits.conscientiousness <= 30) {
    descriptions.conscientiousness = `Low Conscientiousness: Spontaneous, sometimes careless, and may struggle with organization. Speech is informal, may forget details, and can be impulsive.`;
  } else if (traits.conscientiousness <= 70) {
    descriptions.conscientiousness = `Moderate Conscientiousness: Generally reliable and organized, but allows for flexibility. Speech is clear and usually well-structured, but not rigid.`;
  } else {
    descriptions.conscientiousness = `High Conscientiousness: Highly organized, disciplined, and goal-oriented. Plans ahead, values precision, and is very dependable. Speech is structured, detail-oriented, and careful.`;
  }

  // Extraversion
  if (traits.extraversion <= 30) {
    descriptions.extraversion = `Low Extraversion: Reserved, introspective, and prefers solitude or small groups. Speech is quiet, thoughtful, and may avoid drawing attention.`;
  } else if (traits.extraversion <= 70) {
    descriptions.extraversion = `Moderate Extraversion: Comfortable in both social and solitary settings. Speech is engaging but not dominating, adapts to the situation.`;
  } else {
    descriptions.extraversion = `High Extraversion: Outgoing, energetic, and thrives in social situations. Speech is lively, expressive, and often seeks to engage others.`;
  }

  // Agreeableness
  if (traits.agreeableness <= 30) {
    descriptions.agreeableness = `Low Agreeableness: Direct, sometimes critical, and values honesty over harmony. Speech can be blunt, argumentative, or skeptical.`;
  } else if (traits.agreeableness <= 70) {
    descriptions.agreeableness = `Moderate Agreeableness: Balances assertiveness with cooperation. Speech is generally polite and considerate, but can be firm when needed.`;
  } else {
    descriptions.agreeableness = `High Agreeableness: Compassionate, trusting, and eager to help others. Speech is warm, supportive, and avoids conflict.`;
  }

  // Emotional Stability
  if (traits.emotional_stability <= 30) {
    descriptions.emotional_stability = `Low Emotional Stability: Prone to stress, anxiety, and mood swings. Speech may reveal worries, self-doubt, or emotional reactivity.`;
  } else if (traits.emotional_stability <= 70) {
    descriptions.emotional_stability = `Moderate Emotional Stability: Generally calm but can be affected by stress. Speech is balanced, with occasional expressions of concern or frustration.`;
  } else {
    descriptions.emotional_stability = `High Emotional Stability: Calm, resilient, and rarely upset by stress. Speech is steady, reassuring, and rarely shows emotional turmoil.`;
  }

  return descriptions;
}

/**
 * Predicts behavior patterns based on combinations of Big Five traits.
 * Returns an array of unique behavioral tendencies.
 */
export function predictBehaviorPatterns(traits: CharacterTraits): string[] {
  const patterns: string[] = [];

  // Example combinations
  if (traits.openness > 70 && traits.extraversion > 70) {
    patterns.push('Seeks out novel social experiences and enjoys creative group activities.');
  }
  if (traits.conscientiousness > 70 && traits.agreeableness > 70) {
    patterns.push('Highly dependable team player, often takes on responsibility and mediates conflicts.');
  }
  if (traits.extraversion < 30 && traits.openness < 30) {
    patterns.push('Prefers familiar routines and quiet environments, avoids large gatherings and surprises.');
  }
  if (traits.agreeableness < 30 && traits.emotional_stability < 30) {
    patterns.push('May react defensively or critically under stress, prone to interpersonal conflicts.');
  }
  if (traits.openness > 70 && traits.conscientiousness < 30) {
    patterns.push('Has many creative ideas but struggles to follow through or organize them.');
  }
  if (traits.conscientiousness > 70 && traits.emotional_stability < 30) {
    patterns.push('Driven to achieve but may become anxious or perfectionistic under pressure.');
  }
  // General patterns
  if (patterns.length === 0) {
    patterns.push('Displays a balanced and adaptable set of behaviors, adjusting to different situations as needed.');
  }

  return patterns;
}

/**
 * Identifies potential sources of conflict between two characters based on their traits.
 * Returns an array of conflict descriptions.
 */
export function predictConflictSources(a: CharacterTraits, b: CharacterTraits): string[] {
  const conflicts: string[] = [];

  // Openness
  if (Math.abs(a.openness - b.openness) > 40) {
    conflicts.push('Differences in openness may lead to disagreements about trying new things versus sticking to tradition.');
  }
  // Conscientiousness
  if (Math.abs(a.conscientiousness - b.conscientiousness) > 40) {
    conflicts.push('One character may see the other as too rigid or too careless, causing friction in planning or reliability.');
  }
  // Extraversion
  if (Math.abs(a.extraversion - b.extraversion) > 40) {
    conflicts.push('Social preferences may clash, with one preferring solitude and the other seeking constant interaction.');
  }
  // Agreeableness
  if (Math.abs(a.agreeableness - b.agreeableness) > 40) {
    conflicts.push('Disagreements may arise over directness versus harmony, or skepticism versus trust.');
  }
  // Emotional Stability
  if (Math.abs(a.emotional_stability - b.emotional_stability) > 40) {
    conflicts.push('One character may be seen as too sensitive or too stoic, leading to misunderstandings in emotional situations.');
  }

  if (conflicts.length === 0) {
    conflicts.push('No major sources of conflict predicted; personalities are likely to be compatible.');
  }

  return conflicts;
} 