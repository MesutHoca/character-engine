'use client';

import React, { useState, useEffect } from 'react';
import { CharacterTraits } from '../types/character';
import { TraitSliders } from '../components/character/TraitSliders';
import { CharacterTester } from '../components/character/CharacterTester';

const INITIAL_TRAITS: CharacterTraits = {
  openness: 50,
  conscientiousness: 50,
  extraversion: 50,
  agreeableness: 50,
  emotional_stability: 50,
};

function getTraitLevel(value: number): string {
  if (value <= 30) return 'Low';
  if (value <= 70) return 'Moderate';
  return 'High';
}

interface CharacterAnalysis {
  archetype: string;
  suggestedNames: string[];
  keyTraits: string[];
  exampleBehavior: string;
  speechStyle: string;
}

function analyzeCharacter(traits: CharacterTraits): CharacterAnalysis {
  // Determine archetype based on trait combinations
  let archetype = '';
  let suggestedNames: string[] = [];
  let keyTraits: string[] = [];
  let exampleBehavior = '';
  let speechStyle = '';

  // Complex archetype detection based on trait combinations
  if (traits.openness > 70 && traits.agreeableness < 40 && traits.extraversion > 50) {
    archetype = 'Charming Manipulator';
  } else if (traits.openness > 70 && traits.conscientiousness > 60 && traits.agreeableness < 50) {
    archetype = 'Cunning Advisor';
  } else if (traits.conscientiousness > 70 && traits.agreeableness < 40 && traits.emotional_stability > 60) {
    archetype = 'Strategic Manipulator';
  } else if (traits.extraversion > 60 && traits.agreeableness < 50 && traits.openness > 50) {
    archetype = 'Political Schemer';
  } else if (traits.conscientiousness > 70 && traits.openness > 60 && traits.agreeableness > 60) {
    archetype = 'Strategic Innovator';
  } else if (traits.agreeableness > 70 && traits.extraversion > 60 && traits.emotional_stability > 50) {
    archetype = 'Supportive Leader';
  } else if (traits.openness < 30 && traits.conscientiousness > 70 && traits.agreeableness > 60) {
    archetype = 'Traditional Guardian';
  } else if (traits.extraversion < 30 && traits.openness > 70 && traits.agreeableness > 50) {
    archetype = 'Creative Introvert';
  } else if (traits.emotional_stability < 30 && traits.agreeableness < 40 && traits.extraversion > 50) {
    archetype = 'Volatile Challenger';
  } else if (traits.extraversion > 70 && traits.agreeableness > 70 && traits.openness > 50) {
    archetype = 'Charismatic Diplomat';
  } else if (traits.conscientiousness < 30 && traits.openness > 70 && traits.extraversion > 50) {
    archetype = 'Free-Spirited Dreamer';
  } else if (traits.openness > 60 && traits.agreeableness < 50) {
    archetype = 'Cunning Advisor'; // Fallback for manipulative types
  } else if (traits.conscientiousness > 60 && traits.agreeableness < 50) {
    archetype = 'Strategic Manipulator'; // Fallback for strategic types
  } else {
    archetype = 'Balanced Individual';
  }

  // Generate suggested names based on archetype and traits
  if (archetype === 'Charming Manipulator') {
    suggestedNames = ['Sebastian', 'Victoria', 'Damien', 'Serena'];
  } else if (archetype === 'Cunning Advisor') {
    suggestedNames = ['Varys', 'Petyr', 'Cersei', 'Tyrion'];
  } else if (archetype === 'Strategic Manipulator') {
    suggestedNames = ['Alexander', 'Livia', 'Richelieu', 'Machiavelli'];
  } else if (archetype === 'Political Schemer') {
    suggestedNames = ['Francis', 'Claire', 'Viktor', 'Olivia'];
  } else if (archetype === 'Strategic Innovator') {
    suggestedNames = ['Atlas', 'Sage', 'Nova', 'Kai'];
  } else if (archetype === 'Supportive Leader') {
    suggestedNames = ['Marcus', 'Elena', 'Adrian', 'Isabella'];
  } else if (archetype === 'Traditional Guardian') {
    suggestedNames = ['William', 'Eleanor', 'Thomas', 'Margaret'];
  } else if (archetype === 'Creative Introvert') {
    suggestedNames = ['Luna', 'Orion', 'Aria', 'Phoenix'];
  } else if (archetype === 'Volatile Challenger') {
    suggestedNames = ['Raven', 'Blaze', 'Storm', 'Vex'];
  } else if (archetype === 'Charismatic Diplomat') {
    suggestedNames = ['Alexander', 'Sophia', 'Gabriel', 'Olivia'];
  } else if (archetype === 'Free-Spirited Dreamer') {
    suggestedNames = ['Zephyr', 'Aurora', 'River', 'Sky'];
  } else {
    suggestedNames = ['Jordan', 'Taylor', 'Casey', 'Morgan'];
  }

  // Key traits analysis with more nuanced combinations
  if (traits.openness > 70 && traits.agreeableness < 40) {
    keyTraits.push('Highly creative but manipulative, uses imagination for personal gain');
  } else if (traits.openness > 70) {
    keyTraits.push('Highly creative and open to new experiences');
  } else if (traits.openness < 30) {
    keyTraits.push('Prefers tradition and established methods');
  }
  
  if (traits.conscientiousness > 70 && traits.agreeableness < 40) {
    keyTraits.push('Highly organized and strategic, willing to sacrifice others for goals');
  } else if (traits.conscientiousness > 70) {
    keyTraits.push('Organized and goal-oriented');
  } else if (traits.conscientiousness < 30) {
    keyTraits.push('Spontaneous and sometimes unreliable');
  }
  
  if (traits.extraversion > 70 && traits.agreeableness < 40) {
    keyTraits.push('Charismatic and socially skilled, but self-serving');
  } else if (traits.extraversion > 70) {
    keyTraits.push('Outgoing and socially energetic');
  } else if (traits.extraversion < 30) {
    keyTraits.push('Reserved and prefers solitude');
  }
  
  if (traits.agreeableness < 30) {
    keyTraits.push('Direct and confrontational, prioritizes personal interests');
  } else if (traits.agreeableness > 70) {
    keyTraits.push('Compassionate and cooperative');
  }
  
  if (traits.emotional_stability > 70) {
    keyTraits.push('Calm and resilient under pressure');
  } else if (traits.emotional_stability < 30) {
    keyTraits.push('Sensitive and prone to stress');
  }

  // Example behavior with more nuanced scenarios
  if (archetype === 'Cunning Advisor') {
    exampleBehavior = 'In political situations, they offer seemingly helpful advice while secretly advancing their own agenda, using their knowledge to manipulate outcomes.';
  } else if (archetype === 'Strategic Manipulator') {
    exampleBehavior = 'They carefully orchestrate events from behind the scenes, using their organizational skills and lack of empathy to achieve long-term strategic goals.';
  } else if (archetype === 'Political Schemer') {
    exampleBehavior = 'They navigate social networks masterfully, building alliances and exploiting relationships to gain power and influence.';
  } else if (traits.extraversion > 70 && traits.agreeableness < 40) {
    exampleBehavior = 'In a meeting, this character would be charismatic and persuasive, but might secretly pursue their own agenda rather than team goals.';
  } else if (traits.conscientiousness > 70 && traits.openness > 60) {
    exampleBehavior = 'When faced with a problem, they would systematically analyze all options and propose innovative solutions while maintaining high standards.';
  } else if (traits.agreeableness > 70 && traits.extraversion > 60) {
    exampleBehavior = 'In group settings, they naturally take on a supportive role, encouraging others and mediating conflicts to maintain harmony.';
  } else if (traits.openness < 30 && traits.conscientiousness > 70) {
    exampleBehavior = 'They prefer proven methods and established procedures, ensuring everything is done correctly and efficiently.';
  } else if (traits.extraversion < 30 && traits.openness > 70) {
    exampleBehavior = 'They work best alone or in small groups, where they can explore creative ideas without social pressure.';
  } else {
    exampleBehavior = 'They adapt their approach based on the situation, balancing different personality aspects as needed.';
  }

  // Speech style with more nuanced patterns
  if (archetype === 'Cunning Advisor' || archetype === 'Strategic Manipulator') {
    speechStyle = 'Carefully measured and persuasive, often using strategic silence and calculated revelations to influence others.';
  } else if (archetype === 'Political Schemer') {
    speechStyle = 'Diplomatic and charming, skilled at reading others and adapting communication to achieve desired outcomes.';
  } else if (traits.extraversion > 70 && traits.openness > 60) {
    speechStyle = 'Expressive and engaging, often using metaphors and creative language to convey ideas.';
  } else if (traits.conscientiousness > 70 && traits.extraversion < 40) {
    speechStyle = 'Precise and measured, choosing words carefully and providing detailed explanations.';
  } else if (traits.agreeableness > 70) {
    speechStyle = 'Warm and supportive, often using encouraging language and avoiding conflict.';
  } else if (traits.agreeableness < 30 && traits.extraversion > 60) {
    speechStyle = 'Direct and persuasive, may use charm or assertiveness to get their point across.';
  } else if (traits.emotional_stability < 30) {
    speechStyle = 'May reveal anxiety or frustration in their tone, especially under pressure.';
  } else {
    speechStyle = 'Balanced communication style that adapts to the audience and situation.';
  }

  return { archetype, suggestedNames, keyTraits, exampleBehavior, speechStyle };
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [traits, setTraits] = useState<CharacterTraits>(INITIAL_TRAITS);
  const [characterName, setCharacterName] = useState('Varys');
  const [showChat, setShowChat] = useState(false);
  const characterAnalysis = analyzeCharacter(traits);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Character Engine...</h2>
          <p className="text-gray-500">Preparing your character creation experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2 text-center">
            Character Engine - Personality Trait Creator
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Adjust the sliders below to create a unique character personality
          </p>
          
          {/* Character Name Input */}
          <div className="max-w-md mx-auto mb-8">
            <label htmlFor="characterName" className="block text-sm font-medium text-gray-700 mb-2">
              Character Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="characterName"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter character name..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowChat(!showChat)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                {showChat ? 'Hide Chat' : 'Start Chat'}
              </button>
            </div>
          </div>

          <TraitSliders traits={traits} onChange={setTraits} />
        </div>

        {/* Character Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Character Preview</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Character Archetype</h3>
              <p className="text-blue-700 font-medium">{characterAnalysis.archetype}</p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">Suggested Names</h3>
              <div className="flex flex-wrap gap-2">
                {characterAnalysis.suggestedNames.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => setCharacterName(name)}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-300 hover:bg-orange-200 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Personality Traits</h3>
              <ul className="space-y-2">
                {characterAnalysis.keyTraits.map((trait, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Example Behavior</h3>
              <p className="text-green-700">{characterAnalysis.exampleBehavior}</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Communication Style</h3>
              <p className="text-purple-700">{characterAnalysis.speechStyle}</p>
            </div>
          </div>
        </div>

        {/* Character Chat Interface */}
        {showChat && (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
              Chat with {characterName}
            </h2>
            <CharacterTester
              traits={traits}
              name={characterName}
              archetype={characterAnalysis.archetype}
            />
          </div>
        )}
      </div>
    </div>
  );
}
