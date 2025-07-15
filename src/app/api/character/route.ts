import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// GET: List all character profiles
export async function GET() {
  const { data, error } = await supabase
    .from('character_profiles')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: Create a new character profile
export async function POST(req: NextRequest) {
  const body = await req.json();
  // Expecting body to contain all necessary fields, including personality system fields
  const { name, mbti_type, hexaco_profile, dark_triad_scores, tci_temperament, tci_character, system_consistency_score } = body;

  const { data, error } = await supabase
    .from('character_profiles')
    .insert([
      {
        name,
        mbti_type,
        hexaco_profile,
        dark_triad_scores,
        tci_temperament,
        tci_character,
        system_consistency_score,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
} 