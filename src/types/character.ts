// TypeScript interfaces for a character psychology system

/**
 * Represents the Big Five personality traits for a character.
 * Each trait is a number from 0 (low) to 100 (high).
 */
export interface CharacterTraits {
  /**
   * Openness to experience: creativity, curiosity, and willingness to try new things.
   * High scores indicate imaginative and open-minded individuals.
   */
  openness: number;
  /**
   * Conscientiousness: organization, dependability, and discipline.
   * High scores reflect reliability, carefulness, and goal-orientation.
   */
  conscientiousness: number;
  /**
   * Extraversion: sociability, assertiveness, and outgoingness.
   * High scores mean energetic, talkative, and social individuals.
   */
  extraversion: number;
  /**
   * Agreeableness: compassion, cooperativeness, and trust in others.
   * High scores indicate kindness, empathy, and a cooperative nature.
   */
  agreeableness: number;
  /**
   * Emotional Stability (opposite of neuroticism): calmness and resilience to stress.
   * High scores mean calm, secure, and emotionally stable individuals.
   */
  emotional_stability: number;
}

/**
 * Represents a character with psychological and descriptive attributes.
 */
export interface Character {
  /** Unique identifier for the character. */
  id: string;
  /** Identifier for the user who owns or created the character. */
  user_id: string;
  /** The character's display name. */
  name: string;
  /** A brief description of the character (optional). */
  description?: string;
  /** The character's archetype or role (optional, e.g., Hero, Mentor, Rebel). */
  archetype?: string;
  /** The character's Big Five personality traits. */
  traits: CharacterTraits;
  /** A prompt or background for generating character behavior/dialogue (optional). */
  character_prompt?: string;
  /** A summary of the character's typical behaviors (optional). */
  behavioral_summary?: string;
  /** Timestamp of creation (ISO 8601 format). */
  created_at: string;
  /** Timestamp of last update (ISO 8601 format). */
  updated_at: string;
}
