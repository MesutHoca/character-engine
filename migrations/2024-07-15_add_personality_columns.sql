-- Migration: Add personality system columns to character_profiles
ALTER TABLE character_profiles ADD COLUMN mbti_type VARCHAR(4);
ALTER TABLE character_profiles ADD COLUMN hexaco_profile JSONB;
ALTER TABLE character_profiles ADD COLUMN dark_triad_scores JSONB;
ALTER TABLE character_profiles ADD COLUMN tci_temperament JSONB;
ALTER TABLE character_profiles ADD COLUMN tci_character JSONB;
ALTER TABLE character_profiles ADD COLUMN system_consistency_score FLOAT; 