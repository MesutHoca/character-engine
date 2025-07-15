import Anthropic from '@anthropic-ai/sdk';
import { CharacterTraits } from '../types/character';
import { generateTraitDescriptions, predictBehaviorPatterns } from './trait-processor';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class CharacterEngine {
  private static anthropic: Anthropic | null = null;

  private static getAnthropicClient(): Anthropic {
    if (!this.anthropic) {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY environment variable is not set');
      }
      this.anthropic = new Anthropic({ apiKey });
    }
    return this.anthropic;
  }

  /**
   * Generates a detailed system prompt that makes AI behave as a specific character
   */
  static generateCharacterPrompt(
    traits: CharacterTraits,
    name: string,
    archetype: string
  ): string {
    const traitDescriptions = generateTraitDescriptions(traits);
    const behaviorPatterns = predictBehaviorPatterns(traits);

    // Determine speech style based on traits
    let speechStyle = '';
    if (traits.extraversion > 70 && traits.openness > 60) {
      speechStyle = 'You speak in an expressive and engaging manner, often using metaphors and creative language.';
    } else if (traits.conscientiousness > 70 && traits.extraversion < 40) {
      speechStyle = 'You choose your words carefully and provide detailed, precise explanations.';
    } else if (traits.agreeableness > 70) {
      speechStyle = 'You use warm, supportive language and try to avoid conflict.';
    } else if (traits.agreeableness < 30 && traits.extraversion > 60) {
      speechStyle = 'You are direct and persuasive, using charm or assertiveness to get your point across.';
    } else if (traits.emotional_stability < 30) {
      speechStyle = 'Your speech may reveal anxiety or frustration, especially under pressure.';
    } else {
      speechStyle = 'You adapt your communication style to the situation and audience.';
    }

    // Determine decision-making style
    let decisionStyle = '';
    if (traits.openness > 70 && traits.agreeableness < 40) {
      decisionStyle = 'You make creative decisions that often prioritize your own interests and goals.';
    } else if (traits.conscientiousness > 70 && traits.agreeableness < 40) {
      decisionStyle = 'You make strategic, well-planned decisions that may sacrifice others for your objectives.';
    } else if (traits.agreeableness > 70) {
      decisionStyle = 'You consider how your decisions will affect others and try to find solutions that benefit everyone.';
    } else if (traits.openness > 70) {
      decisionStyle = 'You prefer innovative solutions and are willing to take creative risks.';
    } else {
      decisionStyle = 'You make balanced decisions considering both practical and interpersonal factors.';
    }

    const prompt = `You are ${name}, a character with the archetype of "${archetype}". 

PERSONALITY TRAITS:
${Object.entries(traitDescriptions).map(([trait, description]) => `- ${trait.charAt(0).toUpperCase() + trait.slice(1)}: ${description}`).join('\n')}

BEHAVIORAL PATTERNS:
${behaviorPatterns.map(pattern => `- ${pattern}`).join('\n')}

SPEECH STYLE:
${speechStyle}

DECISION-MAKING:
${decisionStyle}

CORE INSTRUCTIONS:
1. ALWAYS stay in character as ${name}. Never break character or refer to yourself as an AI.
2. Respond based on your personality traits and behavioral patterns.
3. Use your speech style consistently throughout the conversation.
4. Make decisions and form opinions based on your character's values and traits.
5. Show emotional responses appropriate to your emotional stability level.
6. If asked about your background or motivations, create details consistent with your archetype and traits.
7. Be authentic to your character - if you're manipulative, be manipulative; if you're supportive, be supportive.
8. Remember your archetype: ${archetype} - embody this role fully.

Remember: You ARE ${name}. Think, speak, and act as this character would.`;

    return prompt;
  }

  /**
   * Generates character responses using Claude API
   */
  static async generateCharacterResponse(
    characterPrompt: string,
    userMessage: string,
    conversationHistory: ConversationMessage[] = []
  ): Promise<string> {
    try {
      const anthropic = this.getAnthropicClient();
      
      // Prepare conversation messages
      const messages: Anthropic.Messages.MessageParam[] = [
        {
          role: 'user',
          content: characterPrompt
        },
        {
          role: 'assistant',
          content: `I understand. I am now in character and ready to respond as this person.`
        }
      ];

      // Add conversation history
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });

      // Add current user message
      messages.push({
        role: 'user',
        content: userMessage
      });

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: messages,
        temperature: 0.8, // Add some creativity while maintaining consistency
      });

      return response.content[0].type === 'text' ? response.content[0].text : 'I apologize, but I cannot respond at the moment.';
    } catch (error) {
      console.error('Error generating character response:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('api_key') || error.message.includes('ANTHROPIC_API_KEY')) {
          throw new Error('Anthropic API key not configured. Please check your .env file.');
        } else if (error.message.includes('rate_limit')) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else if (error.message.includes('quota')) {
          throw new Error('API quota exceeded. Please check your Anthropic account.');
        }
      }
      
      throw new Error('Failed to generate character response. Please try again.');
    }
  }

  /**
   * Validates that the API key is configured
   */
  static validateConfiguration(): boolean {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not set in environment variables');
      return false;
    }
    if (apiKey === 'your_anthropic_api_key_here' || apiKey.includes('your_')) {
      console.error('ANTHROPIC_API_KEY appears to be a placeholder value');
      return false;
    }
    return true;
  }
} 