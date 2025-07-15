import { NextRequest, NextResponse } from 'next/server';
import { CharacterEngine } from '../../../lib/ai-providers';
import { CharacterTraits } from '../../../types/character';

interface ChatRequest {
  traits: CharacterTraits;
  name: string;
  archetype: string;
  userMessage: string;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    // Debug: Log environment variable status
    console.log('Environment variables check:', {
      hasKey: !!process.env.ANTHROPIC_API_KEY,
      keyLength: process.env.ANTHROPIC_API_KEY?.length,
      keyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 10) + '...',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('ANTHROPIC') || key.includes('API'))
    });

    // Parse the request body
    const body: ChatRequest = await request.json();
    
    // Validate required fields
    if (!body.traits || !body.name || !body.archetype || !body.userMessage) {
      return NextResponse.json(
        { error: 'Missing required fields: traits, name, archetype, or userMessage' },
        { status: 400 }
      );
    }

    // Validate that API key is configured
    if (!CharacterEngine.validateConfiguration()) {
      console.error('API key validation failed');
      return NextResponse.json(
        { error: 'Anthropic API key not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }

    // Generate character prompt
    const characterPrompt = CharacterEngine.generateCharacterPrompt(
      body.traits,
      body.name,
      body.archetype
    );

    // Generate character response
    const characterResponse = await CharacterEngine.generateCharacterResponse(
      characterPrompt,
      body.userMessage,
      body.conversationHistory || []
    );

    // Return the character's response
    return NextResponse.json({
      message: characterResponse,
      characterName: body.name,
      archetype: body.archetype,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('api_key') || error.message.includes('ANTHROPIC_API_KEY')) {
        return NextResponse.json(
          { error: 'Anthropic API key not configured. Please check your .env file.' },
          { status: 500 }
        );
      } else if (error.message.includes('rate_limit')) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      } else if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please check your Anthropic account.' },
          { status: 402 }
        );
      } else if (error.message.includes('invalid_request')) {
        return NextResponse.json(
          { error: 'Invalid request format. Please check your input.' },
          { status: 400 }
        );
      }
    }
    
    // Generic error response
    return NextResponse.json(
      { error: 'Failed to generate character response. Please try again.' },
      { status: 500 }
    );
  }
} 