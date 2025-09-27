import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Lightbulb, RefreshCw, CheckCircle, Star } from 'lucide-react';

interface LogicPuzzleProps {
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

type PuzzleType = 'pattern' | 'sequence' | 'matching';

interface Puzzle {
  id: number;
  type: PuzzleType;
  title: string;
  description: string;
  points: number;
  data: any;
}

export function LogicPuzzle({ onBack, onComplete, selectedCharacter }: LogicPuzzleProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const puzzles: Puzzle[] = [
    {
      id: 1,
      type: 'pattern',
      title: 'Color Pattern',
      description: 'What comes next in this pattern?',
      points: 15,
      data: {
        pattern: ['🔴', '🟢', '🔵', '🔴', '🟢', '?'],
        options: ['🔵', '🟡', '🔴', '🟢'],
        answer: '🔵'
      }
    },
    {
      id: 2,
      type: 'sequence',
      title: 'Number Sequence',
      description: 'Find the missing number in the sequence.',
      points: 20,
      data: {
        sequence: [2, 4, 6, '?', 10, 12],
        options: [7, 8, 9, 5],
        answer: 8
      }
    },
    {
      id: 3,
      type: 'matching',
      title: 'Shape Matching',
      description: 'Match the shapes to complete the pattern.',
      points: 25,
      data: {
        grid: [
          ['🔺', '🔲', '⭕'],
          ['🔲', '⭕', '🔺'],
          ['⭕', '?', '🔲']
        ],
        options: ['🔺', '🔲', '⭕', '🔶'],
        answer: '🔺'
      }
    }
  ];

  const checkAnswer = (answer: any) => {
    setUserAnswer(answer);
    setAttempts(attempts + 1);
    
    if (answer === puzzles[currentPuzzle].data.answer) {
      setCompleted(true);
      setTimeout(() => {
        const bonusPoints = attempts <= 1 ? 5 : 0;
        onComplete(puzzles[currentPuzzle].points + bonusPoints);
      }, 1500);
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setUserAnswer(null);
      setCompleted(false);
      setAttempts(0);
    }
  };

  const resetPuzzle = () => {
    setUserAnswer(null);
    setCompleted(false);
    setAttempts(0);
  };

  const renderPatternPuzzle = (puzzle: Puzzle) => {
    const { pattern, options, answer } = puzzle.data;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-6 gap-4 justify-center">
          {pattern.map((item: string, index: number) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl ${
                item === '?' 
                  ? 'border-dashed border-gray-400 bg-gray-100' 
                  : 'border-gray-300 bg-white'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
          {options.map((option: string, index: number) => (
            <Button
              key={index}
              variant={userAnswer === option ? 'default' : 'outline'}
              className={`h-16 text-2xl ${
                completed && option === answer 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : userAnswer === option && option !== answer
                  ? 'bg-red-500 hover:bg-red-600'
                  : ''
              }`}
              onClick={() => !completed && checkAnswer(option)}
              disabled={completed}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderSequencePuzzle = (puzzle: Puzzle) => {
    const { sequence, options, answer } = puzzle.data;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-6 gap-4 justify-center">
          {sequence.map((item: any, index: number) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-xl font-bold ${
                item === '?' 
                  ? 'border-dashed border-gray-400 bg-gray-100' 
                  : 'border-gray-300 bg-white'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
          {options.map((option: number, index: number) => (
            <Button
              key={index}
              variant={userAnswer === option ? 'default' : 'outline'}
              className={`h-16 text-xl font-bold ${
                completed && option === answer 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : userAnswer === option && option !== answer
                  ? 'bg-red-500 hover:bg-red-600'
                  : ''
              }`}
              onClick={() => !completed && checkAnswer(option)}
              disabled={completed}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderMatchingPuzzle = (puzzle: Puzzle) => {
    const { grid, options, answer } = puzzle.data;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          {grid.map((row: string[], rowIndex: number) => 
            row.map((item: string, colIndex: number) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl ${
                  item === '?' 
                    ? 'border-dashed border-gray-400 bg-gray-100' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                {item}
              </div>
            ))
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
          {options.map((option: string, index: number) => (
            <Button
              key={index}
              variant={userAnswer === option ? 'default' : 'outline'}
              className={`h-16 text-2xl ${
                completed && option === answer 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : userAnswer === option && option !== answer
                  ? 'bg-red-500 hover:bg-red-600'
                  : ''
              }`}
              onClick={() => !completed && checkAnswer(option)}
              disabled={completed}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderPuzzle = (puzzle: Puzzle) => {
    switch (puzzle.type) {
      case 'pattern':
        return renderPatternPuzzle(puzzle);
      case 'sequence':
        return renderSequencePuzzle(puzzle);
      case 'matching':
        return renderMatchingPuzzle(puzzle);
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-green-700">
            {selectedCharacter ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCharacter.emoji}</span>
                <span>{selectedCharacter.name}'s Logic Puzzles</span>
              </div>
            ) : (
              "Logic Puzzles"
            )}
          </h1>
          <Badge className="bg-green-100 text-green-800">
            Puzzle {currentPuzzle + 1} of {puzzles.length}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Puzzle Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg text-purple-700 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                {puzzles[currentPuzzle].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {puzzles[currentPuzzle].description}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{puzzles[currentPuzzle].points} points</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Attempts: {attempts}
                </div>
                <Button 
                  onClick={resetPuzzle} 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {attempts > 2 && !completed && (
                <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                  <div className="text-sm text-blue-700 font-medium mb-1">💡 Hint:</div>
                  <div className="text-xs text-blue-600">
                    Look for the pattern in the sequence. What rule connects each element?
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Puzzle Area */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Solve the Puzzle</CardTitle>
            </CardHeader>
            <CardContent>
              {renderPuzzle(puzzles[currentPuzzle])}

              {completed && (
                <div className="mt-6 p-4 bg-green-100 border-2 border-green-300 rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-green-700">Excellent Work!</div>
                  <div className="text-sm text-green-600 mb-3">
                    +{puzzles[currentPuzzle].points + (attempts <= 1 ? 5 : 0)} points earned!
                    {attempts <= 1 && (
                      <div className="text-xs">Bonus for solving on first try!</div>
                    )}
                  </div>
                  {currentPuzzle < puzzles.length - 1 ? (
                    <Button onClick={nextPuzzle} className="bg-green-500 hover:bg-green-600">
                      Next Puzzle
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
        </div>
      </div>
    </div>
  );
}