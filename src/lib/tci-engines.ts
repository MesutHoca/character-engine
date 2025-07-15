import { BigFiveTraits, TCITemperament, TCICharacter, TCIProfile } from '@/types/personality';

export class TemperamentEngine {
  static calculateFromBigFive(bigFive: BigFiveTraits): TCITemperament {
    return {
      noveltySeekingCuriosity: this.calculateNoveltySeekingCuriosity(bigFive),
      impulsiveness: this.calculateImpulsiveness(bigFive),
      extravagance: this.calculateExtravagance(bigFive),
      disorderliness: this.calculateDisorderliness(bigFive),
      harmAvoidance: this.calculateHarmAvoidance(bigFive),
      rewardDependence: this.calculateRewardDependence(bigFive),
      persistence: this.calculatePersistence(bigFive),
    };
  }

  static calculateNoveltySeekingCuriosity(bigFive: BigFiveTraits): number {
    return (bigFive.openness * 0.7 + bigFive.extraversion * 0.3);
  }
  static calculateImpulsiveness(bigFive: BigFiveTraits): number {
    return (100 - bigFive.conscientiousness) * 0.8 + bigFive.neuroticism * 0.2;
  }
  static calculateExtravagance(bigFive: BigFiveTraits): number {
    return bigFive.extraversion * 0.6 + (100 - bigFive.conscientiousness) * 0.4;
  }
  static calculateDisorderliness(bigFive: BigFiveTraits): number {
    return (100 - bigFive.conscientiousness);
  }
  static calculateHarmAvoidance(bigFive: BigFiveTraits): number {
    return bigFive.neuroticism * 0.7 + (100 - bigFive.extraversion) * 0.3;
  }
  static calculateRewardDependence(bigFive: BigFiveTraits): number {
    return bigFive.extraversion * 0.5 + bigFive.agreeableness * 0.5;
  }
  static calculatePersistence(bigFive: BigFiveTraits): number {
    return bigFive.conscientiousness * 0.8 + (100 - bigFive.neuroticism) * 0.2;
  }
}

export class CharacterEngine {
  static calculateFromBigFive(bigFive: BigFiveTraits): TCICharacter {
    return {
      selfDirectedness: this.calculateSelfDirectedness(bigFive),
      cooperativeness: this.calculateCooperativeness(bigFive),
      selfTranscendence: this.calculateSelfTranscendence(bigFive),
    };
  }
  static calculateSelfDirectedness(bigFive: BigFiveTraits): number {
    return bigFive.conscientiousness * 0.6 + (100 - bigFive.neuroticism) * 0.4;
  }
  static calculateCooperativeness(bigFive: BigFiveTraits): number {
    return bigFive.agreeableness * 0.8 + (100 - bigFive.neuroticism) * 0.2;
  }
  static calculateSelfTranscendence(bigFive: BigFiveTraits): number {
    return bigFive.openness * 0.6 + bigFive.agreeableness * 0.4;
  }
}

export class DevelopmentSimulator {
  // Stub for future character growth simulation
  static simulateGrowth(tciProfile: TCIProfile, timeSpan: number): { initial: TCIProfile; developed: TCIProfile } {
    // For now, just return the same profile
    return { initial: tciProfile, developed: tciProfile };
  }
} 