'use client';

import React, { useState } from 'react';
import { MBTISelector } from '@/components/character/MBTISelector';
import { MBTITypeExplorer } from '@/components/character/MBTITypeExplorer';
import { MBTIComparison } from '@/components/character/MBTIComparison';

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [compareType, setCompareType] = useState<string>('');

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h1>MBTI Standalone Interface Demo</h1>
      <h2>Select an MBTI Type</h2>
      <MBTISelector onSelect={setSelectedType} selectedType={selectedType} />
      <MBTITypeExplorer type={selectedType} />

      <hr style={{ margin: '32px 0' }} />

      <h2>Compare Two MBTI Types</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <label>Type A:</label>
          <MBTISelector onSelect={setSelectedType} selectedType={selectedType} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Type B:</label>
          <MBTISelector onSelect={setCompareType} selectedType={compareType} />
        </div>
      </div>
      <MBTIComparison typeA={selectedType} typeB={compareType} />
    </main>
  );
}
