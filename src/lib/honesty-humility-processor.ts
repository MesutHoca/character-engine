import { HEXACOProfile } from '@/types/personality';

export class HonestyHumilityProcessor {
  /**
   * Detect villain potential based on low Honesty-Humility
   */
  static detectVillainPotential(hexaco: HEXACOProfile): boolean {
    return hexaco.honestyHumility < 30;
  }

  /**
   * Suggest antagonist archetype based on HEXACO profile
   */
  static suggestAntagonistArchetype(hexaco: HEXACOProfile): string {
    if (hexaco.honestyHumility < 20 && hexaco.emotionality < 30) {
      return 'Calculating Mastermind';
    } else if (hexaco.honestyHumility < 30 && hexaco.extraversion > 70) {
      return 'Charismatic Manipulator';
    } else if (hexaco.honestyHumility < 30 && hexaco.agreeableness < 30) {
      return 'Ruthless Opportunist';
    } else if (hexaco.honestyHumility < 30 && hexaco.emotionality > 70) {
      return 'Vengeful Schemer';
    }
    return 'Morally Ambiguous Character';
  }

  /**
   * Predict manipulation/exploitation behavior based on HEXACO profile
   */
  static predictManipulationBehavior(hexaco: HEXACOProfile): string[] {
    const behaviors: string[] = [];
    if (hexaco.honestyHumility < 30) {
      behaviors.push('Deceptive tactics');
      behaviors.push('Exploits trust for personal gain');
    }
    if (hexaco.agreeableness < 30) {
      behaviors.push('Lack of empathy in social interactions');
    }
    if (hexaco.extraversion > 70) {
      behaviors.push('Uses charm to influence others');
    }
    if (hexaco.emotionality < 30) {
      behaviors.push('Cold, calculated decision-making');
    }
    return behaviors;
  }
} 