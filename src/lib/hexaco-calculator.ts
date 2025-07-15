import { BigFiveTraits, HEXACOProfile } from '@/types/personality';

export class HEXACOCalculator {
  /**
   * Calculate HEXACO profile from Big Five traits
   */
  static calculateFromBigFive(bigFive: BigFiveTraits): HEXACOProfile {
    return {
      honestyHumility: this.calculateHonestyHumility(bigFive),
      emotionality: this.mapEmotionality(bigFive),
      extraversion: bigFive.extraversion,
      agreeableness: this.adjustAgreeableness(bigFive),
      conscientiousness: bigFive.conscientiousness,
      openness: bigFive.openness,
      confidence: this.getConfidence(bigFive)
    };
  }

  /**
   * Special algorithm for Honesty-Humility (not in Big Five)
   * Based on research: inverse neuroticism + agreeableness + conscientiousness
   */
  static calculateHonestyHumility(bigFive: BigFiveTraits): number {
    const stability = 100 - bigFive.neuroticism;
    const honestyBase = (stability + bigFive.agreeableness + bigFive.conscientiousness) / 3;
    // Adjust for extreme low agreeableness (potential manipulation)
    if (bigFive.agreeableness < 20) {
      return Math.max(0, honestyBase - 30);
    }
    return Math.min(100, honestyBase);
  }

  /**
   * HEXACO Emotionality (broader than Big Five Neuroticism)
   */
  static mapEmotionality(bigFive: BigFiveTraits): number {
    const baseEmotionality = bigFive.neuroticism;
    const agreeablenessBoost = bigFive.agreeableness * 0.2; // Empathy component
    return Math.min(100, baseEmotionality + agreeablenessBoost);
  }

  /**
   * HEXACO Agreeableness (different from Big Five)
   */
  static adjustAgreeableness(bigFive: BigFiveTraits): number {
    // HEXACO Agreeableness is more about forgiveness and tolerance
    // Less influenced by empathy (which goes to Emotionality)
    return Math.max(0, bigFive.agreeableness - 10);
  }

  /**
   * Confidence scoring for HEXACO calculation
   */
  static getConfidence(bigFive: BigFiveTraits): number {
    // Higher confidence for more extreme scores
    const extremeScores = Object.values(bigFive).filter(score => typeof score === 'number' && (score < 20 || score > 80));
    return Math.min(100, 70 + (extremeScores.length * 5));
  }
} 