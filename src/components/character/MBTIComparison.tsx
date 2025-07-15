import React from 'react';

const MBTI_TYPE_DETAILS: Record<string, { name: string; description: string; traits: string[] }> = {
  INTJ: {
    name: 'The Architect',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    traits: ['Strategic', 'Logical', 'Independent', 'Reserved'],
  },
  INTP: {
    name: 'The Logician',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    traits: ['Analytical', 'Curious', 'Objective', 'Abstract'],
  },
  ENTJ: {
    name: 'The Commander',
    description: 'Bold, imaginative and strong-willed leaders, always finding a way—or making one.',
    traits: ['Confident', 'Efficient', 'Strategic', 'Charismatic'],
  },
  ENTP: {
    name: 'The Debater',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    traits: ['Quick-witted', 'Original', 'Energetic', 'Argumentative'],
  },
  INFJ: {
    name: 'The Advocate',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    traits: ['Insightful', 'Altruistic', 'Determined', 'Reserved'],
  },
  INFP: {
    name: 'The Mediator',
    description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    traits: ['Empathetic', 'Idealistic', 'Loyal', 'Imaginative'],
  },
  ENFJ: {
    name: 'The Protagonist',
    description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    traits: ['Charismatic', 'Empathetic', 'Reliable', 'Persuasive'],
  },
  ENFP: {
    name: 'The Campaigner',
    description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
    traits: ['Enthusiastic', 'Creative', 'Sociable', 'Spontaneous'],
  },
  ISTJ: {
    name: 'The Logistician',
    description: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
    traits: ['Responsible', 'Organized', 'Loyal', 'Practical'],
  },
  ISFJ: {
    name: 'The Defender',
    description: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    traits: ['Supportive', 'Reliable', 'Patient', 'Observant'],
  },
  ESTJ: {
    name: 'The Executive',
    description: 'Excellent administrators, unsurpassed at managing things—or people.',
    traits: ['Organized', 'Direct', 'Loyal', 'Efficient'],
  },
  ESFJ: {
    name: 'The Consul',
    description: 'Extraordinarily caring, social and popular people, always eager to help.',
    traits: ['Caring', 'Sociable', 'Loyal', 'Practical'],
  },
  ISTP: {
    name: 'The Virtuoso',
    description: 'Bold and practical experimenters, masters of all kinds of tools.',
    traits: ['Practical', 'Bold', 'Analytical', 'Adaptable'],
  },
  ISFP: {
    name: 'The Adventurer',
    description: 'Flexible and charming artists, always ready to explore and experience something new.',
    traits: ['Charming', 'Sensitive', 'Imaginative', 'Curious'],
  },
  ESTP: {
    name: 'The Entrepreneur',
    description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    traits: ['Energetic', 'Perceptive', 'Bold', 'Sociable'],
  },
  ESFP: {
    name: 'The Entertainer',
    description: 'Spontaneous, energetic and enthusiastic people—life is never boring around them.',
    traits: ['Enthusiastic', 'Spontaneous', 'Sociable', 'Fun-loving'],
  },
};

interface MBTIComparisonProps {
  typeA: string;
  typeB: string;
}

export const MBTIComparison: React.FC<MBTIComparisonProps> = ({ typeA, typeB }) => {
  const detailsA = MBTI_TYPE_DETAILS[typeA];
  const detailsB = MBTI_TYPE_DETAILS[typeB];

  if (!detailsA || !detailsB) {
    return <div>Select two MBTI types to compare.</div>;
  }

  return (
    <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
      <div style={{ flex: 1, borderRight: '1px solid #eee', paddingRight: 16 }}>
        <h3>{typeA}: {detailsA.name}</h3>
        <p>{detailsA.description}</p>
        <h4>Key Traits:</h4>
        <ul>
          {detailsA.traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, paddingLeft: 16 }}>
        <h3>{typeB}: {detailsB.name}</h3>
        <p>{detailsB.description}</p>
        <h4>Key Traits:</h4>
        <ul>
          {detailsB.traits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 