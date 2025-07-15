/**
 * CharacterTester Component
 * ------------------------
 * Provides an interactive chat interface for testing AI-driven character responses.
 * Displays character info, trait descriptions, and a chat UI for user-character conversation.
 * Used for prototyping and exploring character personalities in real time.
 */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CharacterTraits } from '../../types/character';
import { generateTraitDescriptions } from '../../lib/trait-processor';

/**
 * Represents a single chat message (user or character).
 */
interface Message {
  id: string;
  role: 'user' | 'character';
  content: string;
  timestamp: Date;
}

/**
 * Props for the CharacterTester component.
 * @property traits - The character's Big Five trait values.
 * @property name - The character's display name.
 * @property archetype - The character's archetype (e.g., Hero, Villain).
 */
interface CharacterTesterProps {
  traits: CharacterTraits;
  name: string;
  archetype: string;
}

/**
 * CharacterTester provides a chat UI for interacting with an AI-driven character.
 * @param traits - The character's Big Five trait values.
 * @param name - The character's display name.
 * @param archetype - The character's archetype.
 */
export const CharacterTester: React.FC<CharacterTesterProps> = ({
  traits,
  name,
  archetype,
}) => {
  // State for chat messages, input, loading, and error
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const traitDescriptions = generateTraitDescriptions(traits);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Sends the user's message to the API and appends the character's response.
   */
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Convert messages to the format expected by the API
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traits,
          name,
          archetype,
          userMessage: inputMessage.trim(),
          conversationHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get character response');
      }

      const data = await response.json();

      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'character',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, characterMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get character response');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles Enter key press to send message.
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Formats a Date object as a time string (HH:MM AM/PM).
   */
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Character Info Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {archetype}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Personality Traits</h3>
            <div className="space-y-2">
              {Object.entries(traitDescriptions).map(([trait, description]) => (
                <div key={trait} className="bg-white p-3 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 capitalize mb-1">
                    {trait.replace('_', ' ')}
                  </h4>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Chat Instructions</h3>
            <p className="text-sm text-blue-700">
              Start a conversation with {name}. They will respond based on their personality traits and archetype.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-25">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-medium mb-2">Start a conversation with {name}</h3>
                <p className="text-sm">Send a message to begin chatting with your character!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm mb-1">{message.content}</p>
                    <p
                      className={`text-xs ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{name} is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg max-w-md">
                    <p className="text-sm font-medium">Error: {error}</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${name}...`}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 