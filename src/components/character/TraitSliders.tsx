/**
 * TraitSliders Component
 * ---------------------
 * Provides interactive sliders for adjusting Big Five personality traits.
 * Displays trait names, descriptions, and current levels, and calls onChange when traits are updated.
 * Used for character creation and personality exploration in the UI.
 */
import React from 'react';
import { CharacterTraits } from '../../types/character';
import { Slider } from '../ui/slider';
import { generateTraitDescriptions } from '../../lib/trait-processor';

/**
 * Props for the TraitSliders component.
 * @property traits - The current Big Five trait values.
 * @property onChange - Callback when any trait value changes.
 * @property disabled - Whether sliders are disabled (optional).
 */
interface TraitSlidersProps {
  traits: CharacterTraits;
  onChange: (traits: CharacterTraits) => void;
  disabled?: boolean;
}

// Information for each trait: key, display name, and description
const TRAIT_INFO = [
  {
    key: 'openness',
    name: 'Openness to Experience',
    description: 'Creativity, curiosity, and willingness to try new things',
  },
  {
    key: 'conscientiousness',
    name: 'Conscientiousness',
    description: 'Organization, discipline, and goal-directed behavior',
  },
  {
    key: 'extraversion',
    name: 'Extraversion',
    description: 'Sociability, assertiveness, and energy level',
  },
  {
    key: 'agreeableness',
    name: 'Agreeableness',
    description: 'Compassion, cooperation, and trust in others',
  },
  {
    key: 'emotional_stability',
    name: 'Emotional Stability',
    description: 'Resilience and emotional control under stress',
  },
] as const;

type TraitKey = keyof CharacterTraits;

/**
 * Returns a string label for the trait level (Low, Moderate, High).
 * @param value - The trait value (0-100).
 */
function getTraitLevel(value: number): string {
  if (value <= 30) return 'Low';
  if (value <= 70) return 'Moderate';
  return 'High';
}

/**
 * TraitSliders renders sliders for each Big Five trait and shows descriptions.
 * @param traits - The current trait values.
 * @param onChange - Callback when traits are updated.
 * @param disabled - Whether sliders are disabled.
 */
export const TraitSliders: React.FC<TraitSlidersProps> = ({ traits, onChange, disabled = false }) => {
  const traitDescriptions = generateTraitDescriptions(traits);

  /**
   * Handles slider value change for a specific trait.
   * @param key - The trait key (e.g., 'openness').
   * @param value - The new value for the trait.
   */
  const handleSliderChange = (key: TraitKey, value: number) => {
    onChange({ ...traits, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto space-y-8">
      {TRAIT_INFO.map(({ key, name, description }) => {
        const value = traits[key as TraitKey];
        const level = getTraitLevel(value);
        const traitDesc = traitDescriptions[key as TraitKey] || '';
        return (
          <section
            key={key}
            className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 pb-6 last:pb-0"
          >
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            {/* Slider for the trait value */}
            <Slider
              value={value}
              onValueChange={v => handleSliderChange(key as TraitKey, v)}
              min={0}
              max={100}
              step={1}
              label={`${name} (${level})`}
              className="my-2"
            />
            {/* Show the generated trait description */}
            <div className="mt-2 text-blue-700 dark:text-blue-400 text-sm font-medium">
              {traitDesc}
            </div>
          </section>
        );
      })}
    </div>
  );
}; 