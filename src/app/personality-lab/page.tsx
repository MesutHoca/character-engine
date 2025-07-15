/**
 * Personality Lab Page
 * -------------------
 * A playground for exploring all personality system features:
 * - Big Five trait input
 * - System conversion
 * - Profile validation
 * - Profile comparison
 * - Multi-system character generation
 */
'use client';

import React, { useState } from 'react';
import { TraitSliders } from '../../components/character/TraitSliders';
import { CharacterTraits } from '../../types/character';

// Initial Big Five trait values
const defaultTraits: CharacterTraits = {
  openness: 50,
  conscientiousness: 50,
  extraversion: 50,
  agreeableness: 50,
  emotional_stability: 50,
};

const SYSTEMS = [
  { value: 'MBTI', label: 'MBTI' },
  { value: 'HEXACO', label: 'HEXACO' },
  { value: 'DARK_TRIAD', label: 'Dark Triad' },
  { value: 'TCI', label: 'TCI' },
];

export default function PersonalityLabPage() {
  // State for Big Five input
  const [traits, setTraits] = useState<CharacterTraits>(defaultTraits);

  // Conversion state
  const [convertTarget, setConvertTarget] = useState('MBTI');
  const [convertResult, setConvertResult] = useState<any>(null);
  const [convertLoading, setConvertLoading] = useState(false);
  const [convertError, setConvertError] = useState<string | null>(null);

  // Validation state
  const [validateSystem, setValidateSystem] = useState('MBTI');
  const [validateInput, setValidateInput] = useState('');
  const [validateResult, setValidateResult] = useState<any>(null);
  const [validateLoading, setValidateLoading] = useState(false);
  const [validateError, setValidateError] = useState<string | null>(null);

  // Comparison state
  const [compareInputs, setCompareInputs] = useState<string[]>(['', '']);
  const [compareResult, setCompareResult] = useState<any>(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  // Multi-system profile state
  const [multiSystemResult, setMultiSystemResult] = useState<any>(null);
  const [multiSystemLoading, setMultiSystemLoading] = useState(false);
  const [multiSystemError, setMultiSystemError] = useState<string | null>(null);

  // Utility: Convert UI traits to API Big Five (with neuroticism)
  function toApiBigFiveTraits(traits: CharacterTraits) {
    const apiTraits: any = { ...traits, neuroticism: 100 - traits.emotional_stability };
    delete apiTraits.emotional_stability;
    return apiTraits;
  }

  // --- API Integration Handlers ---
  async function handleConvert() {
    setConvertLoading(true);
    setConvertError(null);
    setConvertResult(null);
    try {
      const res = await fetch('/api/personality/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceSystem: 'BIG_FIVE',
          targetSystem: convertTarget,
          data: toApiBigFiveTraits(traits),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Conversion failed');
      setConvertResult(data.result);
    } catch (err: any) {
      setConvertError(err.message || 'Conversion failed');
    } finally {
      setConvertLoading(false);
    }
  }

  async function handleValidate() {
    setValidateLoading(true);
    setValidateError(null);
    setValidateResult(null);
    try {
      let parsed;
      try {
        parsed = JSON.parse(validateInput);
      } catch {
        throw new Error('Invalid JSON in profile input');
      }
      const res = await fetch('/api/personality/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: validateSystem,
          data: parsed,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Validation failed');
      setValidateResult(data);
    } catch (err: any) {
      setValidateError(err.message || 'Validation failed');
    } finally {
      setValidateLoading(false);
    }
  }

  async function handleCompare() {
    setCompareLoading(true);
    setCompareError(null);
    setCompareResult(null);
    try {
      const parsedProfiles = [];
      for (const input of compareInputs) {
        try {
          parsedProfiles.push(JSON.parse(input));
        } catch {
          throw new Error('All profiles must be valid JSON');
        }
      }
      const res = await fetch('/api/personality/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profiles: parsedProfiles,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Comparison failed');
      setCompareResult(data.comparison);
    } catch (err: any) {
      setCompareError(err.message || 'Comparison failed');
    } finally {
      setCompareLoading(false);
    }
  }

  async function handleMultiSystem() {
    setMultiSystemLoading(true);
    setMultiSystemError(null);
    setMultiSystemResult(null);
    try {
      const res = await fetch('/api/character/multi-system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ traits: toApiBigFiveTraits(traits) }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Multi-system profile failed');
      setMultiSystemResult(data.profile);
    } catch (err: any) {
      setMultiSystemError(err.message || 'Multi-system profile failed');
    } finally {
      setMultiSystemLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      <h1 className="text-3xl font-bold mb-6">Personality Lab</h1>

      {/* Big Five Trait Input */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Big Five Trait Input</h2>
        <TraitSliders traits={traits} onChange={setTraits} />
      </section>

      {/* Conversion Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Convert to Another System</h2>
        <div className="flex items-center space-x-4 mb-2">
          <label htmlFor="convertTarget" className="font-medium">Target System:</label>
          <select
            id="convertTarget"
            value={convertTarget}
            onChange={e => setConvertTarget(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {SYSTEMS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleConvert}
            disabled={convertLoading}
          >
            {convertLoading ? 'Converting...' : 'Convert'}
          </button>
        </div>
        <div className="bg-gray-50 border rounded p-4 min-h-[60px]">
          {convertError && <div className="text-red-600 mb-2">{convertError}</div>}
          {convertResult ? <pre>{JSON.stringify(convertResult, null, 2)}</pre> : <span className="text-gray-400">No result yet.</span>}
        </div>
      </section>

      {/* Validation Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Validate a Profile</h2>
        <div className="flex items-center space-x-4 mb-2">
          <label htmlFor="validateSystem" className="font-medium">System:</label>
          <select
            id="validateSystem"
            value={validateSystem}
            onChange={e => setValidateSystem(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {SYSTEMS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <textarea
          className="w-full border rounded p-2 mb-2 font-mono"
          rows={4}
          placeholder="Paste a profile JSON here..."
          value={validateInput}
          onChange={e => setValidateInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleValidate}
          disabled={validateLoading}
        >
          {validateLoading ? 'Validating...' : 'Validate'}
        </button>
        <div className="bg-gray-50 border rounded p-4 min-h-[60px] mt-2">
          {validateError && <div className="text-red-600 mb-2">{validateError}</div>}
          {validateResult ? <pre>{JSON.stringify(validateResult, null, 2)}</pre> : <span className="text-gray-400">No result yet.</span>}
        </div>
      </section>

      {/* Comparison Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Compare Profiles</h2>
        <div className="flex flex-col space-y-2 mb-2">
          {compareInputs.map((input, idx) => (
            <textarea
              key={idx}
              className="w-full border rounded p-2 font-mono"
              rows={2}
              placeholder={`Paste profile JSON #${idx + 1}...`}
              value={input}
              onChange={e => {
                const newInputs = [...compareInputs];
                newInputs[idx] = e.target.value;
                setCompareInputs(newInputs);
              }}
            />
          ))}
          <button
            className="text-blue-600 underline text-sm self-start"
            onClick={() => setCompareInputs(inputs => [...inputs, ''])}
          >
            + Add another profile
          </button>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleCompare}
          disabled={compareLoading}
        >
          {compareLoading ? 'Comparing...' : 'Compare'}
        </button>
        <div className="bg-gray-50 border rounded p-4 min-h-[60px] mt-2">
          {compareError && <div className="text-red-600 mb-2">{compareError}</div>}
          {compareResult ? <pre>{JSON.stringify(compareResult, null, 2)}</pre> : <span className="text-gray-400">No result yet.</span>}
        </div>
      </section>

      {/* Multi-System Profile Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Generate Multi-System Profile</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleMultiSystem}
          disabled={multiSystemLoading}
        >
          {multiSystemLoading ? 'Generating...' : 'Generate'}
        </button>
        <div className="bg-gray-50 border rounded p-4 min-h-[60px] mt-2">
          {multiSystemError && <div className="text-red-600 mb-2">{multiSystemError}</div>}
          {/* Consistency Score and Warnings */}
          {multiSystemResult && (
            <div className="mb-4">
              {multiSystemResult.consistencyScore !== undefined && (
                <div className="text-lg font-semibold text-blue-700 mb-1">
                  Consistency Score: {multiSystemResult.consistencyScore}
                </div>
              )}
              {multiSystemResult.warnings && multiSystemResult.warnings.length > 0 && (
                <div className="text-yellow-700 bg-yellow-100 border border-yellow-300 rounded p-2 mb-2">
                  <div className="font-semibold mb-1">Warnings:</div>
                  <ul className="list-disc pl-5">
                    {multiSystemResult.warnings.map((w: string, i: number) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* If the profile has a metadata.consistency field (from future backend), show that too */}
              {multiSystemResult.metadata && multiSystemResult.metadata.consistency && (
                <div className="text-blue-800 mb-2">
                  <div className="font-semibold">System Consistency:</div>
                  <div>Overall Score: {multiSystemResult.metadata.consistency.overallScore}</div>
                  <div>System Agreement: {multiSystemResult.metadata.consistency.systemAgreement}</div>
                  <div>Internal Consistency: {multiSystemResult.metadata.consistency.internalConsistency}</div>
                  {multiSystemResult.metadata.consistency.warnings && multiSystemResult.metadata.consistency.warnings.length > 0 && (
                    <div className="text-yellow-700 mt-1">
                      <div className="font-semibold">Warnings:</div>
                      <ul className="list-disc pl-5">
                        {multiSystemResult.metadata.consistency.warnings.map((w: string, i: number) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {multiSystemResult ? <pre>{JSON.stringify(multiSystemResult, null, 2)}</pre> : <span className="text-gray-400">No result yet.</span>}
        </div>
      </section>
    </div>
  );
} 