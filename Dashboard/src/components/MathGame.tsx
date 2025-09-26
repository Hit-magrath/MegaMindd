import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { ArrowLeft, Timer, Star, CheckCircle, Target, Zap } from 'lucide-react';

interface MathGameProps {
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

type GameMode = 'arithmetic' | 'counting' | 'comparison';

interface MathProblem {
  question: string;
  answer: number;
  options?: number[];
  visual?: string[];
}

export function MathGame({ onBack, onComplete, selectedCharacter }: MathGameProps) {
  const [gameMode, setGameMode] = useState<GameMode>('arithmetic');
  const [currentProblem, setCurrentProblem] = useState(0);
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  // Generate arithmetic problems
  const generateArithmeticProblems = (): MathProblem[] => {
    const problems: MathProblem[] = [];
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      if (operation === '+') {
        problems.push({
          question: `${num1} + ${num2}`,
          answer: num1 + num2
        });
      } else {
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        problems.push({
          question: `${larger} - ${smaller}`,
          answer: larger - smaller
        });
      }
    }
    return problems;
  };

  // Generate counting problems
  const generateCountingProblems = (): MathProblem[] => {
    const problems: MathProblem[] = [];
    const emojis = ['🍎', '🐸', '⭐', '🌸', '🎈', '🍪'];
    
    for (let i = 0; i < 8; i++) {
      const count = Math.floor(Math.random() * 8) + 3;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const visual = Array(count).fill(emoji);
      
      problems.push({
        question: `How many ${emoji} do you see?`,
        answer: count,
        visual: visual,
        options: [count - 1, count, count + 1, count + 2].sort(() => Math.random() - 0.5)
      });
    }
    return problems;
  };

  // Generate comparison problems
  const generateComparisonProblems = (): MathProblem[] => {
    const problems: MathProblem[] = [];
    
    for (let i = 0; i < 6; i++) {
      const num1 = Math.floor(Math.random() * 20) + 1;
      const num2 = Math.floor(Math.random() * 20) + 1;
      
      let correctAnswer;
      if (num1 > num2) correctAnswer = 1; // Greater than
      else if (num1 < num2) correctAnswer = 2; // Less than
      else correctAnswer = 3; // Equal to
      
      problems.push({
        question: `${num1} ___ ${num2}`,
        answer: correctAnswer,
        options: [1, 2, 3] // 1 = >, 2 = <, 3 = =
      });
    }
    return problems;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0 && !gameCompleted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 || gameCompleted) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameCompleted]);

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    let newProblems;
    
    switch (mode) {
      case 'arithmetic':
        newProblems = generateArithmeticProblems();
        break;
      case 'counting':
        newProblems = generateCountingProblems();
        break;
      case 'comparison':
        newProblems = generateComparisonProblems();
        break;
      default:
        newProblems = generateArithmeticProblems();
    }
    
    setProblems(newProblems);
    setCurrentProblem(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setGameStarted(true);
    setGameCompleted(false);
    setUserAnswer('');
  };

  const submitAnswer = (answer?: number) => {
    const answerValue = answer !== undefined ? answer : parseInt(userAnswer);
    const correct = answerValue === problems[currentProblem].answer;
    
    if (correct) {
      const points = 10 + (streak * 2); // Bonus for streak
      setScore(score + points);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setUserAnswer('');
    } else {
      setGameCompleted(true);
    }
  };

  const endGame = () => {
    setGameStarted(false);
    setGameCompleted(true);
    onComplete(score);
  };

  const renderComparisonOptions = () => {
    const symbols = ['>', '<', '='];
    const labels = ['Greater than', 'Less than', 'Equal to'];
    
    return (
      <div className="grid grid-cols-3 gap-4">
        {symbols.map((symbol, index) => (
          <Button
            key={index}
            onClick={() => submitAnswer(index + 1)}
            className="h-16 text-2xl font-bold"
            variant="outline"
          >
            <div className="text-center">
              <div className="text-3xl">{symbol}</div>
              <div className="text-xs">{labels[index]}</div>
            </div>
          </Button>
        ))}
      </div>
    );
  };

  if (!gameStarted && !gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={onBack} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-orange-700">
              {selectedCharacter ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedCharacter.emoji}</span>
                  <span>{selectedCharacter.name}'s Math Games</span>
                </div>
              ) : (
                "Math Games"
              )}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => startGame('arithmetic')}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl text-white">+−</span>
                </div>
                <CardTitle className="text-blue-700">Math Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 mb-4">Practice addition and subtraction</p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Start Game
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => startGame('counting')}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl text-white">🔢</span>
                </div>
                <CardTitle className="text-green-700">Counting Fun</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 mb-4">Count objects and numbers</p>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Start Game
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => startGame('comparison')}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl text-white">⚖️</span>
                </div>
                <CardTitle className="text-purple-700">Number Compare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 mb-4">Compare numbers with symbols</p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  Start Game
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 p-4 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-700">Game Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-orange-600">{score} Points</div>
            <div className="text-sm text-gray-600">
              You answered {score / 10} questions correctly!
            </div>
            <div className="space-y-2">
              <Button onClick={() => startGame(gameMode)} className="w-full">
                Play Again
              </Button>
              <Button onClick={onBack} variant="outline" className="w-full">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-orange-700">
              {gameMode === 'arithmetic' && 'Math Facts'}
              {gameMode === 'counting' && 'Counting Fun'}
              {gameMode === 'comparison' && 'Number Compare'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-orange-100 text-orange-800 flex items-center gap-1">
              <Star className="h-3 w-3" />
              {score} points
            </Badge>
            <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {timeLeft}s
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={(currentProblem / problems.length) * 100} className="h-3" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Question {currentProblem + 1} of {problems.length}</span>
            {streak > 0 && (
              <span className="flex items-center gap-1 text-orange-600">
                <Zap className="h-3 w-3" />
                {streak} streak!
              </span>
            )}
          </div>
        </div>

        {/* Problem Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {problems[currentProblem]?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Visual for counting problems */}
            {gameMode === 'counting' && problems[currentProblem]?.visual && (
              <div className="grid grid-cols-4 gap-2 mb-6 justify-center max-w-xs mx-auto">
                {problems[currentProblem].visual.map((emoji, index) => (
                  <div key={index} className="text-4xl text-center">
                    {emoji}
                  </div>
                ))}
              </div>
            )}

            {/* Answer Input */}
            <div className="space-y-4">
              {gameMode === 'comparison' ? (
                renderComparisonOptions()
              ) : problems[currentProblem]?.options ? (
                <div className="grid grid-cols-2 gap-4">
                  {problems[currentProblem].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => submitAnswer(option)}
                      className="h-16 text-xl font-bold"
                      variant="outline"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                    className="text-2xl text-center h-16"
                    placeholder="?"
                  />
                  <Button 
                    onClick={() => submitAnswer()} 
                    className="h-16 px-8"
                    disabled={!userAnswer}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}