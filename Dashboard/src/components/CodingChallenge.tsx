import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Play, RotateCcw, Star, CheckCircle } from 'lucide-react';

interface Block {
  id: string;
  type: 'move' | 'turn' | 'repeat';
  label: string;
  color: string;
  value?: number;
}

interface CodingChallengeProps {
  onBack: () => void;
  onComplete: (points: number) => void;
  selectedCharacter?: {
    id: string;
    name: string;
    emoji: string;
    color: string;
    bgGradient: string;
    description: string;
    specialPower: string;
    icon: React.ReactNode;
  };
}

export function CodingChallenge({ onBack, onComplete, selectedCharacter }: CodingChallengeProps) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [sequence, setSequence] = useState<Block[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0, direction: 0 });
  const [completed, setCompleted] = useState(false);

  const availableBlocks: Block[] = [
    { id: '1', type: 'move', label: 'Move Forward', color: 'bg-blue-500', value: 1 },
    { id: '2', type: 'turn', label: 'Turn Right', color: 'bg-green-500', value: 90 },
    { id: '3', type: 'turn', label: 'Turn Left', color: 'bg-purple-500', value: -90 },
    { id: '4', type: 'repeat', label: 'Repeat 3x', color: 'bg-orange-500', value: 3 }
  ];

  const challenges = [
    {
      title: "Robot's First Steps",
      description: "Help the robot move forward 3 steps to reach the star!",
      target: { x: 3, y: 0 },
      points: 10
    },
    {
      title: "Turn and Move",
      description: "Make the robot turn right and move 2 steps forward.",
      target: { x: 2, y: 0 },
      points: 15
    },
    {
      title: "Square Path",
      description: "Program the robot to move in a square pattern.",
      target: { x: 0, y: 0 },
      points: 25
    }
  ];

  const addBlock = (block: Block) => {
    if (sequence.length < 8) {
      setSequence([...sequence, { ...block, id: `${block.id}-${Date.now()}` }]);
    }
  };

  const removeBlock = (index: number) => {
    setSequence(sequence.filter((_, i) => i !== index));
  };

  const runSequence = async () => {
    setIsRunning(true);
    let pos = { x: 0, y: 0, direction: 0 };
    
    for (const block of sequence) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (block.type === 'move') {
        const radians = (pos.direction * Math.PI) / 180;
        pos = {
          ...pos,
          x: pos.x + Math.round(Math.cos(radians)) * (block.value || 1),
          y: pos.y + Math.round(Math.sin(radians)) * (block.value || 1)
        };
      } else if (block.type === 'turn') {
        pos = { ...pos, direction: (pos.direction + (block.value || 0)) % 360 };
      }
      
      setRobotPosition(pos);
    }
    
    // Check if challenge is completed
    const target = challenges[currentChallenge].target;
    if (pos.x === target.x && pos.y === target.y) {
      setCompleted(true);
      setTimeout(() => {
        onComplete(challenges[currentChallenge].points);
      }, 1000);
    }
    
    setIsRunning(false);
  };

  const resetChallenge = () => {
    setSequence([]);
    setRobotPosition({ x: 0, y: 0, direction: 0 });
    setCompleted(false);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      resetChallenge();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-blue-700">
            {selectedCharacter ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCharacter.emoji}</span>
                <span>{selectedCharacter.name}'s Coding Adventures</span>
              </div>
            ) : (
              "Coding Adventures"
            )}
          </h1>
          <Badge className="bg-blue-100 text-blue-800">
            Challenge {currentChallenge + 1} of {challenges.length}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenge Description */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg text-purple-700">
                {challenges[currentChallenge].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {challenges[currentChallenge].description}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{challenges[currentChallenge].points} points</span>
              </div>
              
              {/* Available Blocks */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Drag these blocks:</h3>
                {availableBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={`${block.color} text-white p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity`}
                    onClick={() => addBlock(block)}
                  >
                    <div className="text-sm font-medium">{block.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Coding Area */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Code</span>
                <Button onClick={resetChallenge} variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4 min-h-[200px] bg-gray-50 p-4 rounded-lg">
                {sequence.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">
                    Click blocks to add them to your sequence
                  </div>
                ) : (
                  sequence.map((block, index) => (
                    <div
                      key={block.id}
                      className={`${block.color} text-white p-2 rounded flex items-center justify-between cursor-pointer hover:opacity-80`}
                      onClick={() => removeBlock(index)}
                    >
                      <span className="text-sm">{block.label}</span>
                      <span className="text-xs">×</span>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={runSequence} 
                  disabled={sequence.length === 0 || isRunning}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
              </div>

              {completed && (
                <div className="mt-4 p-4 bg-green-100 border-2 border-green-300 rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-green-700">Challenge Complete!</div>
                  <div className="text-sm text-green-600 mb-3">
                    +{challenges[currentChallenge].points} points earned!
                  </div>
                  {currentChallenge < challenges.length - 1 ? (
                    <Button onClick={nextChallenge} className="bg-green-500 hover:bg-green-600">
                      Next Challenge
                    </Button>
                  ) : (
                    <Button onClick={onBack} className="bg-blue-500 hover:bg-blue-600">
                      Return to Dashboard
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Visual Grid */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Robot Simulator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full max-w-xs mx-auto">
                {Array.from({ length: 25 }, (_, i) => {
                  const x = i % 5 - 2;
                  const y = Math.floor(i / 5) - 2;
                  const target = challenges[currentChallenge].target;
                  const isTarget = x === target.x && y === target.y;
                  const isRobot = x === robotPosition.x && y === robotPosition.y;
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square border-2 border-gray-300 rounded flex items-center justify-center text-2xl ${
                        isTarget ? 'bg-yellow-200 border-yellow-400' : 'bg-white'
                      }`}
                    >
                      {isTarget && '⭐'}
                      {isRobot && (
                        <div 
                          className="text-blue-600 transform transition-transform duration-300"
                          style={{ transform: `rotate(${robotPosition.direction}deg)` }}
                        >
                          🤖
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-4 text-sm text-gray-600">
                Robot position: ({robotPosition.x}, {robotPosition.y})
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}