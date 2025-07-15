import React from 'react';
import { CharacterTraits } from '../../types/character';
import { Slider } from '../ui/slider';
import { generateTraitDescriptions } from '../../lib/trait-processor';

interface TraitSlidersProps {
  traits: CharacterTraits;
  onChange: (traits: CharacterTraits) => void;
  disabled?: boolean;
}

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

function getTraitLevel(value: number): string {
  if (value <= 30) return 'Low';
  if (value <= 70) return 'Moderate';
  return 'High';
}

export const TraitSliders: React.FC<TraitSlidersProps> = ({ traits, onChange, disabled = false }) => {
  const traitDescriptions = generateTraitDescriptions(traits);

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
            <Slider
              value={value}
              onValueChange={v => handleSliderChange(key as TraitKey, v)}
              min={0}
              max={100}
              step={1}
              label={`${name} (${level})`}
              className="my-2"
            />
            <div className="mt-2 text-blue-700 dark:text-blue-400 text-sm font-medium">
              {traitDesc}
            </div>
          </section>
        );
      })}
    </div>
  );
}; 