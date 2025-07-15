import { BigFiveTraits, MBTIProfile, MBTIType } from '@/types/personality';

export class MBTIConverter {
  /**
   * Convert Big Five to MBTI type using research-based correlations
   */
  static convertBigFiveToMBTI(bigFive: BigFiveTraits): MBTIProfile {
    // E/I: Extraversion
    const EI = bigFive.extraversion > 50 ? 'E' : 'I';
    // S/N: Openness
    const SN = bigFive.openness > 50 ? 'N' : 'S';
    // T/F: Agreeableness
    const TF = bigFive.agreeableness > 50 ? 'F' : 'T';
    // J/P: Conscientiousness
    const JP = bigFive.conscientiousness > 50 ? 'J' : 'P';
    const type = `${EI}${SN}${TF}${JP}` as MBTIType;
    return {
      type,
      dimensions: {
        EI: { preference: EI, strength: Math.abs(bigFive.extraversion - 50) * 2 },
        SN: { preference: SN, strength: Math.abs(bigFive.openness - 50) * 2 },
        TF: { preference: TF, strength: Math.abs(bigFive.agreeableness - 50) * 2 },
        JP: { preference: JP, strength: Math.abs(bigFive.conscientiousness - 50) * 2 }
      },
      confidence: this.getConversionConfidence(bigFive)
    };
  }

  /**
   * Convert MBTI type to Big Five traits (approximate, based on research)
   */
  static convertMBTIToBigFive(mbtiType: MBTIType): Partial<BigFiveTraits> {
    // These are rough mappings based on typical MBTI/Big Five correlations
    return {
      extraversion: mbtiType[0] === 'E' ? 75 : 25,
      openness: mbtiType[1] === 'N' ? 75 : 25,
      agreeableness: mbtiType[2] === 'F' ? 75 : 25,
      conscientiousness: mbtiType[3] === 'J' ? 75 : 25,
      // Neuroticism is not directly mapped
    };
  }

  /**
   * Confidence scoring for conversion (higher if traits are more extreme)
   */
  static getConversionConfidence(bigFive: BigFiveTraits): number {
    const traitClarities = [
      Math.abs(bigFive.extraversion - 50),
      Math.abs(bigFive.openness - 50),
      Math.abs(bigFive.agreeableness - 50),
      Math.abs(bigFive.conscientiousness - 50)
    ];
    const averageClarity = traitClarities.reduce((sum, clarity) => sum + clarity, 0) / 4;
    return Math.min(100, (averageClarity * 2) + 20); // 20-100% confidence range
  }
} 