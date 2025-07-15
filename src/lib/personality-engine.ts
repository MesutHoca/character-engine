/*
 * Personality Engine: Multi-System Personality Conversion and Analysis
 * -------------------------------------------------------------------
 * This module provides a unified engine for converting Big Five traits into MBTI, HEXACO, Dark Triad, and TCI profiles.
 * It also offers cross-system validation and recommendations for character creation in games, writing, and research.
 *
 * Systems supported:
 *   - Big Five (OCEAN)
 *   - MBTI (Myers-Briggs Type Indicator)
 *   - HEXACO (Six-Factor Model)
 *   - Dark Triad (Machiavellianism, Narcissism, Psychopathy)
 *   - TCI (Temperament & Character Inventory)
 *
 * All calculations are based on research-backed heuristics and are designed for extensibility.
 */
// src/lib/personality-engine.ts
// Complete 5-System Personality Engine Implementation

import { 
  BigFiveTraits, 
  MBTIProfile, 
  HEXACOProfile, 
  DarkTriadProfile, 
  TCIProfile,
  PersonalitySystemType 
} from '../types/personality';

/**
 * The PersonalityEngine class provides static methods to convert Big Five traits into other personality system profiles,
 * validate trait ranges, and check for cross-system consistency. It is the core orchestrator for multi-system personality logic.
 */
export class PersonalityEngine {
  // ============================================================================
  // SYSTEM 1: BIG FIVE (Already Implemented - Base System)
  // ============================================================================
  /**
   * Validates that all Big Five trait values are within the 0-100 range.
   * @param traits - The Big Five trait object to validate.
   * @returns True if all traits are valid, false otherwise.
   */
  static validateBigFive(traits: BigFiveTraits): boolean {
    const requiredTraits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    // Ensure each trait is present and within the valid range
    return requiredTraits.every(trait => 
      traits[trait as keyof BigFiveTraits] >= 0 && 
      traits[trait as keyof BigFiveTraits] <= 100
    );
  }

  // ============================================================================
  // SYSTEM 2: MBTI (Myers-Briggs Type Indicator)
  // ============================================================================
  /**
   * Converts Big Five traits to an MBTI profile using simple heuristics.
   * @param bigFive - The Big Five trait object.
   * @returns An MBTIProfile object with type, dimension strengths, and confidence.
   */
  static convertBigFiveToMBTI(bigFive: BigFiveTraits): MBTIProfile {
    // MBTI dimensions are mapped from Big Five traits using threshold heuristics
    const extraversionScore = bigFive.extraversion;
    const EI = extraversionScore > 50 ? 'E' : 'I';
    const opennessScore = bigFive.openness;
    const SN = opennessScore > 50 ? 'N' : 'S';
    const agreeablenessScore = bigFive.agreeableness;
    const TF = agreeablenessScore > 50 ? 'F' : 'T';
    const conscientiousnessScore = bigFive.conscientiousness;
    const JP = conscientiousnessScore > 50 ? 'J' : 'P';
    const type = `${EI}${SN}${TF}${JP}` as MBTIProfile['type'];
    return {
      type,
      dimensions: {
        EI: { preference: EI, strength: Math.abs(extraversionScore - 50) * 2 },
        SN: { preference: SN, strength: Math.abs(opennessScore - 50) * 2 },
        TF: { preference: TF, strength: Math.abs(agreeablenessScore - 50) * 2 },
        JP: { preference: JP, strength: Math.abs(conscientiousnessScore - 50) * 2 }
      },
      confidence: this.calculateMBTIConfidence(bigFive)
    } as MBTIProfile;
  }
  /**
   * Calculates a confidence score for the MBTI conversion based on trait clarity.
   * @param bigFive - The Big Five trait object.
   * @returns Confidence score (0-100).
   */
  private static calculateMBTIConfidence(bigFive: BigFiveTraits): number {
    // The further traits are from 50, the clearer the MBTI type
    const traitClarities = [
      Math.abs(bigFive.extraversion - 50),
      Math.abs(bigFive.openness - 50),
      Math.abs(bigFive.agreeableness - 50),
      Math.abs(bigFive.conscientiousness - 50)
    ];
    const averageClarity = traitClarities.reduce((sum, clarity) => sum + clarity, 0) / 4;
    return Math.min(100, (averageClarity * 2) + 20);
  }

  // ============================================================================
  // SYSTEM 3: HEXACO (6-Factor Model)
  // ============================================================================
  /**
   * Converts Big Five traits to a HEXACO profile using custom heuristics.
   * @param bigFive - The Big Five trait object.
   * @returns A HEXACOProfile object with all six factors and confidence.
   */
  static convertBigFiveToHEXACO(bigFive: BigFiveTraits): HEXACOProfile {
    return {
      honestyHumility: this.calculateHonestyHumility(bigFive),
      emotionality: this.calculateEmotionality(bigFive),
      extraversion: bigFive.extraversion,
      agreeableness: this.adjustHEXACOAgreeableness(bigFive),
      conscientiousness: bigFive.conscientiousness,
      openness: bigFive.openness,
      confidence: this.calculateHEXACOConfidence(bigFive)
    };
  }
  /**
   * Estimates Honesty-Humility based on Big Five stability, agreeableness, and conscientiousness.
   * Lower agreeableness reduces honesty-humility for villain potential.
   */
  private static calculateHonestyHumility(bigFive: BigFiveTraits): number {
    // Stability is the inverse of neuroticism
    const stability = 100 - bigFive.neuroticism;
    const honestyBase = (stability + bigFive.agreeableness + bigFive.conscientiousness) / 3;
    if (bigFive.agreeableness < 20) {
      // Penalize for very low agreeableness (villain archetype)
      return Math.max(0, honestyBase - 30);
    }
    return Math.min(100, honestyBase);
  }
  /**
   * Calculates emotionality as a function of neuroticism and agreeableness.
   */
  private static calculateEmotionality(bigFive: BigFiveTraits): number {
    // Emotionality is mostly neuroticism, with a boost from agreeableness
    const baseEmotionality = bigFive.neuroticism;
    const agreeablenessBoost = bigFive.agreeableness * 0.2;
    return Math.min(100, baseEmotionality + agreeablenessBoost);
  }
  /**
   * Adjusts HEXACO agreeableness to be lower than Big Five for system differences.
   */
  private static adjustHEXACOAgreeableness(bigFive: BigFiveTraits): number {
    // HEXACO agreeableness is generally lower than Big Five
    return Math.max(0, bigFive.agreeableness - 10);
  }
  /**
   * Confidence is higher if traits are at extremes (less ambiguity).
   */
  private static calculateHEXACOConfidence(bigFive: BigFiveTraits): number {
    const extremeScores = Object.values(bigFive).filter((score) => (score as number) < 20 || (score as number) > 80);
    return Math.min(100, 70 + (extremeScores.length * 5));
  }

  // ============================================================================
  // SYSTEM 4: DARK TRIAD (Machiavellianism, Narcissism, Psychopathy)
  // ============================================================================
  /**
   * Converts Big Five traits to a Dark Triad profile using custom heuristics.
   * @param bigFive - The Big Five trait object.
   * @returns A DarkTriadProfile object with all three dark traits and confidence.
   */
  static convertBigFiveToDarkTriad(bigFive: BigFiveTraits): DarkTriadProfile {
    return {
      machiavellianism: this.calculateMachiavellianism(bigFive),
      narcissism: this.calculateNarcissism(bigFive),
      psychopathy: this.calculatePsychopathy(bigFive),
      overallDarkness: 0, // Placeholder, could be average of three traits
      riskLevel: 'LOW',   // Placeholder, could be calculated from trait levels
      confidence: this.calculateDarkTriadConfidence(bigFive)
    };
  }
  /**
   * Machiavellianism is higher with low agreeableness, low neuroticism, and high openness.
   */
  private static calculateMachiavellianism(bigFive: BigFiveTraits): number {
    const lowAgreeableness = 100 - bigFive.agreeableness;
    const lowNeuroticism = 100 - bigFive.neuroticism;
    const strategicThinking = bigFive.openness * 0.3;
    // Weighted sum for Machiavellianism
    const machScore = (lowAgreeableness * 0.6 + lowNeuroticism * 0.3 + strategicThinking * 0.1);
    return Math.min(100, machScore);
  }
  /**
   * Narcissism is higher with high extraversion, low agreeableness, and low neuroticism.
   */
  private static calculateNarcissism(bigFive: BigFiveTraits): number {
    const highExtraversion = bigFive.extraversion;
    const lowAgreeableness = (100 - bigFive.agreeableness) * 0.7;
    const lowNeuroticism = (100 - bigFive.neuroticism) * 0.5;
    // Weighted sum for Narcissism
    const narcScore = (highExtraversion * 0.5 + lowAgreeableness * 0.3 + lowNeuroticism * 0.2);
    return Math.min(100, narcScore);
  }
  /**
   * Psychopathy is higher with very low agreeableness, low neuroticism, and low conscientiousness.
   */
  private static calculatePsychopathy(bigFive: BigFiveTraits): number {
    const veryLowAgreeableness = (100 - bigFive.agreeableness) * 0.8;
    const lowNeuroticism = (100 - bigFive.neuroticism) * 0.4;
    const lowConscientiousness = (100 - bigFive.conscientiousness) * 0.3;
    // Weighted sum for Psychopathy
    const psychScore = (veryLowAgreeableness * 0.6 + lowNeuroticism * 0.25 + lowConscientiousness * 0.15);
    return Math.min(100, psychScore);
  }
  /**
   * Confidence is higher if anti-social indicators are present (extreme low traits).
   */
  private static calculateDarkTriadConfidence(bigFive: BigFiveTraits): number {
    const antiSocialIndicators = [
      bigFive.agreeableness < 30 ? 20 : 0,
      bigFive.neuroticism < 30 ? 15 : 0,
      bigFive.conscientiousness < 30 ? 10 : 0
    ];
    const baseConfidence = 50;
    const bonusConfidence = antiSocialIndicators.reduce((sum, bonus) => sum + bonus, 0);
    return Math.min(100, baseConfidence + bonusConfidence);
  }

  // ============================================================================
  // SYSTEM 5: TCI (Temperament & Character Inventory)
  // ============================================================================
  /**
   * Converts Big Five traits to a TCI profile (temperament and character).
   * @param bigFive - The Big Five trait object.
   * @returns A TCIProfile object with temperament, character, and confidence.
   */
  static convertBigFiveToTCI(bigFive: BigFiveTraits): TCIProfile {
    return {
      temperament: {
        noveltySeekingCuriosity: this.calculateNoveltySeekingCuriosity(bigFive),
        impulsiveness: this.calculateImpulsiveness(bigFive),
        extravagance: this.calculateExtravagance(bigFive),
        disorderliness: this.calculateDisorderliness(bigFive),
        harmAvoidance: this.calculateHarmAvoidance(bigFive),
        rewardDependence: this.calculateRewardDependence(bigFive),
        persistence: this.calculatePersistence(bigFive)
      },
      character: {
        selfDirectedness: this.calculateSelfDirectedness(bigFive),
        cooperativeness: this.calculateCooperativeness(bigFive),
        selfTranscendence: this.calculateSelfTranscendence(bigFive)
      },
      confidence: this.calculateTCIConfidence(bigFive)
    };
  }
  /**
   * Novelty seeking/curiosity is mostly openness, with some extraversion.
   */
  private static calculateNoveltySeekingCuriosity(bigFive: BigFiveTraits): number {
    return (bigFive.openness * 0.7 + bigFive.extraversion * 0.3);
  }
  /**
   * Impulsiveness is high when conscientiousness is low and neuroticism is high.
   */
  private static calculateImpulsiveness(bigFive: BigFiveTraits): number {
    return (100 - bigFive.conscientiousness) * 0.8 + bigFive.neuroticism * 0.2;
  }
  /**
   * Extravagance is high with high extraversion and low conscientiousness.
   */
  private static calculateExtravagance(bigFive: BigFiveTraits): number {
    return bigFive.extraversion * 0.6 + (100 - bigFive.conscientiousness) * 0.4;
  }
  /**
   * Disorderliness is simply the inverse of conscientiousness.
   */
  private static calculateDisorderliness(bigFive: BigFiveTraits): number {
    return (100 - bigFive.conscientiousness);
  }
  /**
   * Harm avoidance is high with high neuroticism and low extraversion.
   */
  private static calculateHarmAvoidance(bigFive: BigFiveTraits): number {
    return bigFive.neuroticism * 0.7 + (100 - bigFive.extraversion) * 0.3;
  }
  /**
   * Reward dependence is high with high extraversion and agreeableness.
   */
  private static calculateRewardDependence(bigFive: BigFiveTraits): number {
    return bigFive.extraversion * 0.5 + bigFive.agreeableness * 0.5;
  }
  /**
   * Persistence is high with high conscientiousness and low neuroticism.
   */
  private static calculatePersistence(bigFive: BigFiveTraits): number {
    return bigFive.conscientiousness * 0.8 + (100 - bigFive.neuroticism) * 0.2;
  }
  /**
   * Self-directedness is high with high conscientiousness and low neuroticism.
   */
  private static calculateSelfDirectedness(bigFive: BigFiveTraits): number {
    return bigFive.conscientiousness * 0.6 + (100 - bigFive.neuroticism) * 0.4;
  }
  /**
   * Cooperativeness is high with high agreeableness and low neuroticism.
   */
  private static calculateCooperativeness(bigFive: BigFiveTraits): number {
    return bigFive.agreeableness * 0.8 + (100 - bigFive.neuroticism) * 0.2;
  }
  /**
   * Self-transcendence is high with high openness and agreeableness.
   */
  private static calculateSelfTranscendence(bigFive: BigFiveTraits): number {
    return bigFive.openness * 0.6 + bigFive.agreeableness * 0.4;
  }
  /**
   * Confidence is higher if trait variance is low (traits are similar in value).
   */
  private static calculateTCIConfidence(bigFive: BigFiveTraits): number {
    const traits = Object.values(bigFive) as number[];
    const variance = this.calculateVariance(traits);
    return Math.max(60, 100 - variance);
  }
  /**
   * Calculates variance for an array of numbers.
   */
  private static calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / values.length;
  }

  // ============================================================================
  // UNIFIED SYSTEM ORCHESTRATION
  // ============================================================================
  /**
   * Generates all system profiles from a Big Five trait object.
   * @param bigFive - The Big Five trait object.
   * @returns An object containing all system profiles.
   * @throws Error if Big Five traits are invalid.
   */
  static generateAllSystems(bigFive: BigFiveTraits): {
    bigFive: BigFiveTraits;
    mbti: MBTIProfile;
    hexaco: HEXACOProfile;
    darkTriad: DarkTriadProfile;
    tci: TCIProfile;
  } {
    if (!this.validateBigFive(bigFive)) {
      throw new Error('Invalid Big Five traits provided');
    }
    return {
      bigFive,
      mbti: this.convertBigFiveToMBTI(bigFive),
      hexaco: this.convertBigFiveToHEXACO(bigFive),
      darkTriad: this.convertBigFiveToDarkTriad(bigFive),
      tci: this.convertBigFiveToTCI(bigFive)
    };
  }
  /**
   * Validates consistency between all system profiles and returns a score and warnings.
   * @param systems - The object returned by generateAllSystems.
   * @returns Consistency result with score and warnings.
   */
  static validateSystemConsistency(systems: ReturnType<typeof PersonalityEngine.generateAllSystems>): {
    isConsistent: boolean;
    consistencyScore: number;
    warnings: string[];
  } {
    const warnings: string[] = [];
    let consistencyScore = 100;
    // Check if MBTI extraversion matches Big Five extraversion
    const mbtiExtraversion = systems.mbti.type.includes('E');
    const bigFiveExtraversion = systems.bigFive.extraversion > 50;
    if (mbtiExtraversion !== bigFiveExtraversion) {
      warnings.push("MBTI extraversion doesn't match Big Five extraversion");
      consistencyScore -= 10;
    }
    // Check for conflict between HEXACO honesty and Dark Triad
    const hexacoHonesty = systems.hexaco.honestyHumility;
    const darkTriadScore = (systems.darkTriad.machiavellianism + systems.darkTriad.narcissism + systems.darkTriad.psychopathy) / 3;
    if (hexacoHonesty > 70 && darkTriadScore > 50) {
      warnings.push("High honesty-humility conflicts with elevated dark triad scores");
      consistencyScore -= 15;
    }
    // Check for conflict between TCI self-directedness and impulsiveness
    const tciSelfDirectedness = systems.tci.character.selfDirectedness;
    const tciImpulsiveness = systems.tci.temperament.impulsiveness;
    if (tciSelfDirectedness > 70 && tciImpulsiveness > 70) {
      warnings.push("High self-directedness conflicts with high impulsiveness");
      consistencyScore -= 10;
    }
    return {
      isConsistent: warnings.length === 0,
      consistencyScore: Math.max(0, consistencyScore),
      warnings
    };
  }
  /**
   * Returns recommended personality systems for a given character type.
   * @param characterType - The character type string (e.g., 'hero', 'villain').
   * @returns Array of recommended PersonalitySystemType values.
   */
  static getRecommendedSystemForCharacterType(characterType: string): PersonalitySystemType[] {
    const recommendations: Record<string, PersonalitySystemType[]> = {
      'hero': ['MBTI', 'TCI'],
      'villain': ['HEXACO', 'DARK_TRIAD'],
      'antihero': ['DARK_TRIAD', 'HEXACO', 'TCI'],
      'mentor': ['TCI', 'MBTI'],
      'comic_relief': ['MBTI', 'BIG_FIVE'],
      'love_interest': ['MBTI', 'TCI'],
      'antagonist': ['HEXACO', 'DARK_TRIAD'],
      'sidekick': ['MBTI', 'BIG_FIVE'],
      'complex_character': ['HEXACO', 'DARK_TRIAD', 'TCI']
    };
    return recommendations[characterType.toLowerCase()] || ['BIG_FIVE', 'MBTI'];
  }
}

/**
 * Utility object for convenient access to core PersonalityEngine methods.
 */
export const personalitySystemUtils = {
  validateBigFive: PersonalityEngine.validateBigFive,
  convertToMBTI: PersonalityEngine.convertBigFiveToMBTI,
  convertToHEXACO: PersonalityEngine.convertBigFiveToHEXACO,
  convertToDarkTriad: PersonalityEngine.convertBigFiveToDarkTriad,
  convertToTCI: PersonalityEngine.convertBigFiveToTCI,
  generateAllSystems: PersonalityEngine.generateAllSystems,
  validateConsistency: PersonalityEngine.validateSystemConsistency,
  getRecommendedSystems: PersonalityEngine.getRecommendedSystemForCharacterType
}; 

/**
 * ResearchValidator provides research-backed validation for personality profiles.
 * Flags outlier trait values based on typical population ranges.
 */
export class ResearchValidator {
  /**
   * Validates a profile for a given system, returning warnings for outlier traits.
   * @param profile - The profile object (traits or system profile)
   * @param system - The personality system type (e.g., 'BIG_FIVE')
   * @returns Array of warning strings
   */
  static validateProfile(profile: any, system: string): string[] {
    const warnings: string[] = [];
    if (system === 'BIG_FIVE') {
      // Typical Big Five trait range: 5-95
      for (const trait of ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism']) {
        const value = profile[trait];
        if (typeof value === 'number' && (value < 5 || value > 95)) {
          warnings.push(`Trait '${trait}' is an outlier (${value}). Typical range is 5-95.`);
        }
      }
    } else if (system === 'HEXACO') {
      // HEXACO: 10-90
      for (const trait of ['honestyHumility', 'emotionality', 'extraversion', 'agreeableness', 'conscientiousness', 'openness']) {
        const value = profile[trait];
        if (typeof value === 'number' && (value < 10 || value > 90)) {
          warnings.push(`Trait '${trait}' is an outlier (${value}). Typical range is 10-90.`);
        }
      }
    } else if (system === 'DARK_TRIAD') {
      // Dark Triad: 0-80 typical
      for (const trait of ['machiavellianism', 'narcissism', 'psychopathy']) {
        const value = profile[trait];
        if (typeof value === 'number' && value > 80) {
          warnings.push(`Trait '${trait}' is unusually high (${value}). Typical max is 80.`);
        }
      }
    } else if (system === 'TCI') {
      // TCI: 10-90 for all subtraits
      if (profile.temperament) {
        for (const trait of Object.keys(profile.temperament)) {
          const value = profile.temperament[trait];
          if (typeof value === 'number' && (value < 10 || value > 90)) {
            warnings.push(`Temperament '${trait}' is an outlier (${value}). Typical range is 10-90.`);
          }
        }
      }
      if (profile.character) {
        for (const trait of Object.keys(profile.character)) {
          const value = profile.character[trait];
          if (typeof value === 'number' && (value < 10 || value > 90)) {
            warnings.push(`Character '${trait}' is an outlier (${value}). Typical range is 10-90.`);
          }
        }
      }
    }
    return warnings;
  }
}

/**
 * CulturalAdapter provides simple cultural adaptation for personality profiles.
 * Can adjust or flag traits based on cultural context.
 */
export class CulturalAdapter {
  /**
   * Adapts a profile for a given system and culture code (e.g., 'JP', 'US').
   * @param profile - The profile object (traits or system profile)
   * @param system - The personality system type
   * @param culture - The culture code (e.g., 'JP', 'US')
   * @returns Adapted profile (shallow copy)
   */
  static adaptProfile(profile: any, system: string, culture: string): any {
    const adapted = { ...profile };
    // Example: In Japanese culture, conscientiousness is typically higher
    if (system === 'BIG_FIVE' && culture === 'JP' && typeof adapted.conscientiousness === 'number') {
      adapted.conscientiousness = Math.min(100, Math.round(adapted.conscientiousness * 1.1));
    }
    // Example: In US culture, extraversion is typically higher
    if (system === 'BIG_FIVE' && culture === 'US' && typeof adapted.extraversion === 'number') {
      adapted.extraversion = Math.min(100, Math.round(adapted.extraversion * 1.1));
    }
    // Add more rules as needed for other systems/cultures
    return adapted;
  }
} 