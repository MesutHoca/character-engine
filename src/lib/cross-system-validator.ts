import { BigFiveTraits, MBTIProfile, HEXACOProfile } from '@/types/personality';
import { MBTIConverter } from './mbti-converter';
import { HEXACOCalculator } from './hexaco-calculator';

export class CrossSystemValidator {
  /**
   * Calculate MBTI/Big Five consistency (percentage of matching dimensions)
   */
  static calculateMBTIConsistency(bigFive: BigFiveTraits, mbti: MBTIProfile): number {
    const derivedMBTI = MBTIConverter.convertBigFiveToMBTI(bigFive);
    let matchCount = 0;
    const actual = mbti.type;
    const derived = derivedMBTI.type;
    for (let i = 0; i < 4; i++) {
      if (actual[i] === derived[i]) matchCount++;
    }
    return (matchCount / 4) * 100;
  }

  /**
   * Calculate HEXACO/Big Five consistency (correlation of mapped traits)
   */
  static calculateHEXACOConsistency(bigFive: BigFiveTraits, hexaco: HEXACOProfile): number {
    // Compare mapped traits: extraversion, agreeableness, conscientiousness, openness
    const traits = ['extraversion', 'agreeableness', 'conscientiousness', 'openness'] as const;
    let total = 0;
    traits.forEach((trait) => {
      const diff = Math.abs((bigFive[trait] ?? 0) - (hexaco[trait] ?? 0));
      total += 100 - diff; // 100 means perfect match
    });
    return total / traits.length;
  }

  /**
   * Calculate overall system consistency (average of all system consistencies)
   */
  static calculateOverallConsistency(bigFive: BigFiveTraits, mbti: MBTIProfile, hexaco: HEXACOProfile): number {
    const mbtiScore = this.calculateMBTIConsistency(bigFive, mbti);
    const hexacoScore = this.calculateHEXACOConsistency(bigFive, hexaco);
    // Add more systems as needed
    return (mbtiScore + hexacoScore) / 2;
  }
} 