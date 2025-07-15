// src/types/personality.ts
// Complete TypeScript interfaces for all 5 personality systems

// ============================================================================
// CORE TYPES
// ============================================================================

/**
 * Enum of all supported personality system types.
 * Used for system selection, conversion, and validation.
 */
export type PersonalitySystemType = 'BIG_FIVE' | 'MBTI' | 'HEXACO' | 'DARK_TRIAD' | 'TCI';

/**
 * Configuration metadata for each personality system.
 * Used for UI, documentation, and system recommendations.
 */
export interface PersonalitySystemConfig {
  name: string; // Human-readable name
  description: string; // Short description
  strengths: string[]; // Key strengths of the system
  bestFor: string[]; // Best use cases
  researchBasis: string; // Research foundation
  businessValue: string; // Business/market value
}

// ============================================================================
// SYSTEM 1: BIG FIVE (Base System)
// ============================================================================

/**
 * The Big Five (OCEAN) trait values, ranging from 0-100.
 * This is the base system for all conversions.
 */
export interface BigFiveTraits {
  openness: number;          // 0-100
  conscientiousness: number; // 0-100
  extraversion: number;      // 0-100
  agreeableness: number;     // 0-100
  neuroticism: number;       // 0-100
}

/**
 * A Big Five profile with archetype, description, and confidence.
 */
export interface BigFiveProfile extends BigFiveTraits {
  archetype: string; // e.g., "Explorer", "Guardian"
  description: string;
  strengths: string[];
  challenges: string[];
  confidence: number; // 0-100
}

// ============================================================================
// SYSTEM 2: MBTI (Myers-Briggs Type Indicator)
// ============================================================================

/**
 * MBTI type string (e.g., 'INTJ', 'ENFP').
 */
export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

/**
 * MBTI dimension letter.
 */
export type MBTIDimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

/**
 * MBTI dimension score, with preference and strength.
 */
export interface MBTIDimensionScore {
  preference: MBTIDimension;
  strength: number; // 0-100, how strong the preference is
}

/**
 * MBTI profile with type, dimension scores, and optional details.
 */
export interface MBTIProfile {
  type: MBTIType;
  dimensions: {
    EI: MBTIDimensionScore; // Extraversion/Introversion
    SN: MBTIDimensionScore; // Sensing/Intuition
    TF: MBTIDimensionScore; // Thinking/Feeling
    JP: MBTIDimensionScore; // Judging/Perceiving
  };
  description?: string;
  strengths?: string[];
  challenges?: string[];
  cognitiveStack?: string[];
  confidence: number;
}

/**
 * Full MBTI type definition for UI, docs, and advanced features.
 */
export interface MBTITypeDefinition {
  type: MBTIType;
  name: string;
  description: string;
  keyTraits: string[];
  strengths: string[];
  challenges: string[];
  cognitiveStack: string[];
  famousExamples: string[];
  characterArchetypes: string[];
}

// ============================================================================
// SYSTEM 3: HEXACO (6-Factor Model)
// ============================================================================

/**
 * HEXACO profile with all six factors and confidence.
 * Honesty-Humility is the key differentiator for villain/antagonist creation.
 */
export interface HEXACOProfile {
  honestyHumility: number;    // 0-100 (Key differentiator - villain creation)
  emotionality: number;       // 0-100 (Similar to neuroticism but broader)
  extraversion: number;       // 0-100 (Similar to Big Five)
  agreeableness: number;      // 0-100 (Different from Big Five)
  conscientiousness: number;  // 0-100 (Similar to Big Five)
  openness: number;          // 0-100 (Similar to Big Five)
  confidence: number;        // 0-100
}

/**
 * Insights and villain/hero archetype for HEXACO.
 */
export interface HEXACOInsights {
  honestyHumilityLevel: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  manipulationRisk: 'Minimal' | 'Low' | 'Moderate' | 'High' | 'Very High';
  characterType: 'Hero' | 'Antihero' | 'Complex' | 'Antagonist' | 'Villain';
  culturalConsiderations: string[];
  bestUseCase: string;
}

/**
 * Extended HEXACO profile with insights and comparison to Big Five.
 */
export interface HEXACOExtended extends HEXACOProfile {
  insights: HEXACOInsights;
  comparisonToBigFive: {
    keyDifferences: string[];
    advantagesForCharacterCreation: string[];
  };
}

// ============================================================================
// SYSTEM 4: DARK TRIAD (Machiavellianism, Narcissism, Psychopathy)
// ============================================================================

/**
 * Dark Triad profile for antagonists and antiheroes.
 */
export interface DarkTriadProfile {
  machiavellianism: number;  // 0-100 (Strategic manipulation)
  narcissism: number;        // 0-100 (Grandiose self-image)
  psychopathy: number;       // 0-100 (Lack of empathy/remorse)
  overallDarkness: number;   // 0-100 (Combined score)
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  confidence: number;        // 0-100
}

/**
 * Insights and warnings for Dark Triad characters.
 */
export interface DarkTriadInsights {
  primaryDarkTrait: 'Machiavellianism' | 'Narcissism' | 'Psychopathy' | 'Balanced';
  behaviorPatterns: string[];
  relationshipStyle: string;
  conflictApproach: string;
  manipulationTactics: string[];
  characterWarnings: string[];
}

/**
 * Extended Dark Triad profile with character applications and warnings.
 */
export interface DarkTriadExtended extends DarkTriadProfile {
  insights: DarkTriadInsights;
  characterApplications: {
    villainPotential: number;       // 0-100
    antiheroPotential: number;      // 0-100
    complexCharacterPotential: number; // 0-100
    redemptionPotential: number;    // 0-100
  };
  contentWarnings: string[];
}

// ============================================================================
// SYSTEM 5: TCI (Temperament & Character Inventory)
// ============================================================================

/**
 * TCI temperament traits (biological, stable) and character traits (learned, developmental).
 */
export interface TCITemperament {
  noveltySeekingCuriosity: number;  // 0-100 (Biological drive for new experiences)
  impulsiveness: number;            // 0-100 (Lack of behavioral control)
  extravagance: number;             // 0-100 (Tendency toward excess)
  disorderliness: number;           // 0-100 (Lack of organization)
  harmAvoidance: number;            // 0-100 (Risk aversion)
  rewardDependence: number;         // 0-100 (Need for social approval)
  persistence: number;              // 0-100 (Perseverance despite obstacles)
}

/**
 * TCI character traits (learned, developmental).
 */
export interface TCICharacter {
  selfDirectedness: number;     // 0-100 (Personal responsibility)
  cooperativeness: number;      // 0-100 (Social collaboration)
  selfTranscendence: number;    // 0-100 (Spiritual/philosophical awareness)
}

/**
 * TCI profile with temperament, character, and confidence.
 */
export interface TCIProfile {
  temperament: TCITemperament;  // Biological, stable traits
  character: TCICharacter;      // Learned, developmental traits
  confidence: number;           // 0-100
}

/**
 * Insights and development path for TCI.
 */
export interface TCIInsights {
  temperamentType: 'Exploratory' | 'Cautious' | 'Social' | 'Persistent' | 'Balanced';
  characterDevelopment: 'Immature' | 'Developing' | 'Mature' | 'Highly Developed';
  biologicalVsLearned: {
    biologicalInfluence: number;  // 0-100
    learnedInfluence: number;     // 0-100
    developmentPotential: number; // 0-100
  };
  characterArcPotential: string[];
  therapeuticConsiderations: string[];
}

/**
 * Extended TCI profile with development path and recommendations.
 */
export interface TCIExtended extends TCIProfile {
  insights: TCIInsights;
  characterDevelopmentPath: {
    currentStage: string;
    growthAreas: string[];
    potentialTrajectories: string[];
    conflictSources: string[];
  };
  biologicalVsEnvironmental: {
    temperamentStability: number;  // How stable temperament traits are
    characterMalleability: number; // How changeable character traits are
    developmentRecommendations: string[];
  };
}

// ============================================================================
// UNIFIED PERSONALITY SYSTEM
// ============================================================================

/**
 * Unified personality profile containing all systems and metadata.
 */
export interface UnifiedPersonalityProfile {
  bigFive: BigFiveProfile;
  mbti: MBTIProfile;
  hexaco: HEXACOExtended;
  darkTriad: DarkTriadExtended;
  tci: TCIExtended;
  metadata: {
    generatedAt: Date;
    consistency: PersonalityConsistency;
    recommendedSystems: PersonalitySystemType[];
    characterType: CharacterType;
  };
}

/**
 * Consistency and agreement between systems.
 */
export interface PersonalityConsistency {
  overallScore: number;        // 0-100
  systemAgreement: number;     // 0-100
  internalConsistency: number; // 0-100
  warnings: string[];
  recommendations: string[];
}

// ============================================================================
// CHARACTER APPLICATIONS
// ============================================================================

/**
 * Character type for use in recommendations and archetypes.
 */
export type CharacterType = 
  | 'HERO' 
  | 'VILLAIN' 
  | 'ANTIHERO' 
  | 'MENTOR' 
  | 'COMIC_RELIEF' 
  | 'LOVE_INTEREST' 
  | 'ANTAGONIST' 
  | 'SIDEKICK' 
  | 'COMPLEX_CHARACTER'
  | 'NEUTRAL_CHARACTER';

/**
 * Archetype definition for character creation.
 */
export interface CharacterArchetype {
  name: string;
  description: string;
  typicalTraits: Partial<BigFiveTraits>;
  mbtiTypes: MBTIType[];
  hexacoConsiderations: string[];
  darkTriadLevels: Partial<DarkTriadProfile>;
  tciPatterns: string[];
  examples: string[];
}

export interface CharacterCreationRecommendations {
  primarySystem: PersonalitySystemType;
  secondarySystems: PersonalitySystemType[];
  reasonsForRecommendation: string[];
  expectedOutcomes: string[];
  warnings: string[];
  alternatives: PersonalitySystemType[];
}

// ============================================================================
// SYSTEM CONFIGURATIONS
// ============================================================================

/**
 * System configuration metadata for all supported systems.
 */
export const PERSONALITY_SYSTEMS: Record<PersonalitySystemType, PersonalitySystemConfig> = {
  BIG_FIVE: {
    name: 'Big Five (Ocean Model)',
    description: 'The foundational five-factor model of personality psychology',
    strengths: ['Scientifically validated', 'Cross-cultural reliability', 'Comprehensive coverage'],
    bestFor: ['General character creation', 'Psychological accuracy', 'Base personality framework'],
    researchBasis: 'Decades of peer-reviewed research across cultures',
    businessValue: 'Industry standard foundation for all other systems'
  },
  
  MBTI: {
    name: 'Myers-Briggs Type Indicator',
    description: 'Cognitive function-based personality typing system',
    strengths: ['Mass market appeal', 'Detailed behavioral descriptions', 'Strong user engagement'],
    bestFor: ['Character dialogue patterns', 'Decision-making styles', 'Social interactions'],
    researchBasis: 'Based on Jungian cognitive functions with modern adaptations',
    businessValue: 'Huge market appeal - users love MBTI for relatability'
  },
  
  HEXACO: {
    name: 'HEXACO Six-Factor Model',
    description: 'Enhanced personality model with Honesty-Humility factor',
    strengths: ['Superior villain creation', 'Cross-cultural validity', 'Moral dimension'],
    bestFor: ['Antagonist development', 'Morally complex characters', 'Cultural authenticity'],
    researchBasis: 'Extensive cross-cultural research identifying universal personality factors',
    businessValue: 'The "Villain Creator" - unique positioning for antagonist development'
  },
  
  DARK_TRIAD: {
    name: 'Dark Triad Personality',
    description: 'Machiavellianism, Narcissism, and Psychopathy assessment',
    strengths: ['Compelling antagonists', 'Psychological authenticity', 'Unique market position'],
    bestFor: ['Complex villains', 'Antihero development', 'Psychological thrillers'],
    researchBasis: 'Clinical and forensic psychology research on antisocial traits',
    businessValue: 'Professional writing tool appeal for morally ambiguous characters'
  },
  
  TCI: {
    name: 'Temperament & Character Inventory',
    description: 'Separates biological temperament from learned character traits',
    strengths: ['Character development arcs', 'Biological vs learned distinction', 'Growth potential'],
    bestFor: ['Character evolution', 'Educational applications', 'Therapeutic contexts'],
    researchBasis: 'Neurobiological research on personality development and plasticity',
    businessValue: 'Educational and therapeutic market appeal, character arc development'
  }
};

// ============================================================================
// VALIDATION & UTILITY TYPES
// ============================================================================

export interface PersonalityValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface SystemComparison {
  system1: PersonalitySystemType;
  system2: PersonalitySystemType;
  correlations: number[];
  agreements: string[];
  conflicts: string[];
  recommendations: string[];
}

export interface PersonalityInsight {
  system: PersonalitySystemType;
  category: 'strength' | 'challenge' | 'neutral' | 'warning';
  title: string;
  description: string;
  confidence: number;
  implications: string[];
}

// ============================================================================
// API INTERFACES
// ============================================================================

export interface PersonalityGenerationRequest {
  traits: BigFiveTraits;
  systems?: PersonalitySystemType[];
  options?: {
    includeInsights?: boolean;
    includeRecommendations?: boolean;
    includeWarnings?: boolean;
    characterType?: CharacterType;
    culturalContext?: string;
  };
}

export interface PersonalityGenerationResponse {
  success: boolean;
  data?: UnifiedPersonalityProfile;
  error?: string;
  warnings?: string[];
  recommendations?: CharacterCreationRecommendations;
}

// ============================================================================
// CHARACTER PROMPT GENERATION
// ============================================================================

export interface CharacterPromptConfig {
  personalitySystem: PersonalitySystemType;
  includeTraits: boolean;
  includeInsights: boolean;
  includeWarnings: boolean;
  promptStyle: 'detailed' | 'concise' | 'creative' | 'professional';
  aiPlatform: 'claude' | 'gpt' | 'gemini' | 'grok' | 'perplexity';
}

export interface GeneratedCharacterPrompt {
  systemPrompt: string;
  characterDescription: string;
  behaviorGuidelines: string[];
  conversationStyle: string;
  warnings: string[];
  metadata: {
    system: PersonalitySystemType;
    confidence: number;
    consistency: number;
    generatedAt: Date;
  };
}

// ============================================================================
// BUSINESS INTELLIGENCE TYPES
// ============================================================================

export interface PersonalityUsageAnalytics {
  mostUsedSystems: PersonalitySystemType[];
  characterTypeDistribution: Record<CharacterType, number>;
  systemCombinations: Array<{
    systems: PersonalitySystemType[];
    frequency: number;
    satisfaction: number;
  }>;
  userBehaviorPatterns: {
    averageSystemsUsed: number;
    sessionDuration: number;
    returnRate: number;
  };
}

export interface MarketIntelligence {
  competitorGap: string[];
  uniqueSellingPoints: string[];
  marketOpportunities: string[];
  userDemandSignals: string[];
  pricingOptimization: {
    freeLimit: number;
    premiumTiers: Array<{
      price: number;
      features: string[];
      targetSegment: string;
    }>;
  };
}

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

export type PersonalityExportFormat = 'json' | 'csv' | 'pdf' | 'txt' | 'screenplay' | 'game_dev';

export interface PersonalityExportConfig {
  format: PersonalityExportFormat;
  includeSystems: PersonalitySystemType[];
  includeInsights: boolean;
  includePrompts: boolean;
  customization: {
    branding?: boolean;
    colorScheme?: string;
    template?: string;
  };
}

// ============================================================================
// ADVANCED FEATURES (Phase 2-3)
// ============================================================================

export interface RelationshipDynamics {
  characterId1: string;
  characterId2: string;
  relationshipType: 'family' | 'romantic' | 'friendship' | 'professional' | 'antagonistic';
  compatibilityScore: number;
  conflictPotential: number;
  dynamicDescription: string;
  interactionPatterns: string[];
}

export interface SceneGenerationConfig {
  characters: string[];
  sceneType: 'dialogue' | 'conflict' | 'collaboration' | 'tension' | 'resolution';
  setting: string;
  objectives: string[];
  constraints: string[];
}

export interface MultiCharacterScene {
  sceneId: string;
  characters: UnifiedPersonalityProfile[];
  dialogue: Array<{
    character: string;
    line: string;
    emotion: string;
    subtext: string;
  }>;
  sceneAnalysis: {
    tensionLevel: number;
    characterDevelopment: string[];
    plotAdvancement: string[];
    authenticity: number;
  };
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export class PersonalityEngineError extends Error {
  constructor(
    message: string,
    public code: string,
    public system?: PersonalitySystemType,
    public details?: any
  ) {
    super(message);
    this.name = 'PersonalityEngineError';
  }
}

export interface ErrorCodes {
  INVALID_TRAITS: 'INVALID_TRAITS';
  SYSTEM_UNAVAILABLE: 'SYSTEM_UNAVAILABLE';
  CONVERSION_FAILED: 'CONVERSION_FAILED';
  VALIDATION_ERROR: 'VALIDATION_ERROR';
  API_ERROR: 'API_ERROR';
  CONSISTENCY_WARNING: 'CONSISTENCY_WARNING';
}

// ============================================================================
// FUTURE ROADMAP TYPES (Phase 3-4)
// ============================================================================

export interface DigitalHumanProfile {
  personality: UnifiedPersonalityProfile;
  demographics: any; // Will be defined in Phase 2
  physicalTraits: any; // Will be defined in Phase 2
  lifeHistory: any; // Will be defined in Phase 2
  socialContext: any; // Will be defined in Phase 2
}

export interface SelfPlayTrainingConfig {
  iterations: number;
  scenarios: string[];
  evaluationMetrics: string[];
  improvementTargets: string[];
}

export interface EmergentBehaviorAnalysis {
  patterns: string[];
  surprises: string[];
  consistency: number;
  authenticity: number;
  recommendations: string[];
} 