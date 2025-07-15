import { HEXACOProfile, DarkTriadProfile } from '@/types/personality';

export class DarkTriadCalculator {
  /**
   * Calculate Dark Triad profile from HEXACO profile
   */
  static calculateFromHEXACO(hexaco: HEXACOProfile): DarkTriadProfile {
    return {
      machiavellianism: this.calculateMachiavellianism(hexaco),
      narcissism: this.calculateNarcissism(hexaco),
      psychopathy: this.calculatePsychopathy(hexaco),
      overallDarkness: 0, // Can be calculated as average or sum
      riskLevel: 'LOW', // Can be set based on thresholds
      confidence: 80 // Placeholder, can be improved
    };
  }

  /**
   * Machiavellianism: Inverse correlation with Honesty-Humility and Agreeableness
   */
  static calculateMachiavellianism(hexaco: HEXACOProfile): number {
    return Math.max(0, 100 - (hexaco.honestyHumility * 0.8 + hexaco.agreeableness * 0.2));
  }

  /**
   * Narcissism: Inverse correlation with Honesty-Humility, direct with Extraversion
   */
  static calculateNarcissism(hexaco: HEXACOProfile): number {
    return Math.max(0, (100 - hexaco.honestyHumility) * 0.7 + hexaco.extraversion * 0.3);
  }

  /**
   * Psychopathy: Inverse correlation with Honesty-Humility and Emotionality
   */
  static calculatePsychopathy(hexaco: HEXACOProfile): number {
    return Math.max(0, 100 - (hexaco.honestyHumility * 0.6 + hexaco.emotionality * 0.4));
  }
}

export class ContentWarningSystem {
  /**
   * Evaluate content warning level based on Dark Triad profile
   */
  static evaluateContent(darkTriad: DarkTriadProfile) {
    const totalScore = darkTriad.machiavellianism + darkTriad.narcissism + darkTriad.psychopathy;
    if (totalScore > 240) {
      return {
        warningLevel: 'high',
        message: 'This character exhibits extreme dark personality traits',
        ageRestriction: 18
      };
    } else if (totalScore > 180) {
      return {
        warningLevel: 'medium',
        message: 'This character has strong dark personality traits',
        ageRestriction: 16
      };
    } else if (totalScore > 120) {
      return {
        warningLevel: 'low',
        message: 'This character has some dark personality traits',
        ageRestriction: 13
      };
    }
    return {
      warningLevel: 'none',
      message: 'No significant dark personality traits detected',
      ageRestriction: 0
    };
  }
} 