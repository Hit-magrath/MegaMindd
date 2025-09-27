import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Zap, Rocket, Shield, Wind } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bgGradient: string;
  description: string;
  specialPower: string;
  icon: React.ReactNode;
}

interface CharacterSelectorProps {
  onSelectCharacter: (character: Character) => void;
  selectedCharacter?: Character;
}

export function CharacterSelector({ onSelectCharacter, selectedCharacter }: CharacterSelectorProps) {
  const characters: Character[] = [
    {
      id: 'speed-runner',
      name: 'Speed Runner',
      emoji: '💨',
      color: 'text-blue-600',
      bgGradient: 'from-blue-100 to-cyan-100',
      description: 'Lightning fast learner who loves quick challenges!',
      specialPower: 'Double Speed Boost',
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: 'city-surfer',
      name: 'City Surfer',
      emoji: '🛹',
      color: 'text-orange-600',
      bgGradient: 'from-orange-100 to-red-100',
      description: 'Cool urban explorer who masters every level!',
      specialPower: 'Trick Combo Points',
      icon: <Wind className="h-5 w-5" />
    },
    {
      id: 'space-explorer',
      name: 'Space Explorer',
      emoji: '🚀',
      color: 'text-purple-600',
      bgGradient: 'from-purple-100 to-pink-100',
      description: 'Cosmic adventurer discovering new worlds of knowledge!',
      specialPower: 'Stellar Navigation',
      icon: <Rocket className="h-5 w-5" />
    },
    {
      id: 'ninja-warrior',
      name: 'Ninja Warrior',
      emoji: '🥷',
      color: 'text-green-600',
      bgGradient: 'from-green-100 to-emerald-100',
      description: 'Stealthy master of logic and strategy!',
      specialPower: 'Shadow Strike Precision',
      icon: <Shield className="h-5 w-5" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Choose Your Learning Hero!
            </h2>
            <p className="text-gray-600">Pick a character to be your learning companion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {characters.map((character) => (
              <Card 
                key={character.id}
                className={`hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${
                  selectedCharacter?.id === character.id 
                    ? 'border-yellow-400 ring-2 ring-yellow-200' 
                    : 'border-gray-200 hover:border-gray-300'
                } bg-gradient-to-br ${character.bgGradient}`}
                onClick={() => onSelectCharacter(character)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 relative">
                    <div className="text-4xl">{character.emoji}</div>
                    {selectedCharacter?.id === character.id && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-yellow-800 text-lg">✓</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className={`${character.color} flex items-center justify-center gap-2`}>
                    {character.icon}
                    {character.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-600 text-sm">
                    {character.description}
                  </p>
                  <Badge className="bg-white/80 text-gray-700 border border-gray-300">
                    <Zap className="h-3 w-3 mr-1" />
                    {character.specialPower}
                  </Badge>
                  <Button 
                    className={`w-full ${
                      selectedCharacter?.id === character.id 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCharacter(character);
                    }}
                  >
                    {selectedCharacter?.id === character.id ? 'Selected!' : 'Choose Hero'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedCharacter && (
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
                onClick={() => {
                  // This will be handled by the parent component
                }}
              >
                Start Learning with {selectedCharacter.name}! 🎮
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type { Character };