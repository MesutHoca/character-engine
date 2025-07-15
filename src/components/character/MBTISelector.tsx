import React from 'react';

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

interface MBTISelectorProps {
  onSelect: (type: string) => void;
  selectedType?: string;
}

export const MBTISelector: React.FC<MBTISelectorProps> = ({ onSelect, selectedType }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {MBTI_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          aria-pressed={selectedType === type}
          style={{
            padding: '1em',
            borderRadius: 8,
            border: selectedType === type ? '2px solid #0070f3' : '1px solid #ccc',
            background: selectedType === type ? '#e6f0fa' : '#fff',
            fontWeight: selectedType === type ? 'bold' : 'normal',
            cursor: 'pointer',
            outline: 'none',
            transition: 'border 0.2s',
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
}; 