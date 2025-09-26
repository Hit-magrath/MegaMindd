import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Crown,
  Medal,
  Award,
  Zap,
  Filter,
  Lock
} from 'lucide-react';

interface AchievementsPageProps {
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
  userProgress: {
    level: number;
    totalPoints: number;
    badges: string[];
    coding: { completed: number; total: number; points: number };
    logic: { completed: number; total: number; points: number };
    math: { completed: number; total: number; points: number };
  };
}

export function AchievementsPage({ selectedCharacter, userProgress }: AchievementsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Complete your first challenge',
      category: 'general',
      rarity: 'common',
      points: 10,
      progress: 100,
      maxProgress: 100,
      earned: true,
      icon: Star,
      requirements: 'Complete 1 challenge'
    },
    {
      id: 'coding-novice',
      name: 'Coding Novice',
      description: 'Complete 5 coding challenges',
      category: 'coding',
      rarity: 'common',
      points: 25,
      progress: userProgress.coding.completed,
      maxProgress: 5,
      earned: userProgress.coding.completed >= 5,
      icon: Target,
      requirements: 'Complete 5 coding challenges'
    },
    {
      id: 'logic-master',
      name: 'Logic Master',
      description: 'Complete 10 logic puzzles',
      category: 'logic',
      rarity: 'rare',
      points: 50,
      progress: userProgress.logic.completed,
      maxProgress: 10,
      earned: userProgress.logic.completed >= 10,
      icon: Medal,
      requirements: 'Complete 10 logic puzzles'
    },
    {
      id: 'math-wizard',
      name: 'Math Wizard',
      description: 'Complete 15 math games',
      category: 'math',
      rarity: 'epic',
      points: 75,
      progress: userProgress.math.completed,
      maxProgress: 15,
      earned: userProgress.math.completed >= 15,
      icon: Crown,
      requirements: 'Complete 15 math games'
    },
    {
      id: 'point-collector',
      name: 'Point Collector',
      description: 'Earn 500 total points',
      category: 'general',
      rarity: 'rare',
      points: 100,
      progress: userProgress.totalPoints,
      maxProgress: 500,
      earned: userProgress.totalPoints >= 500,
      icon: Star,
      requirements: 'Earn 500 total points'
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Get perfect scores on 5 challenges',
      category: 'general',
      rarity: 'epic',
      points: 150,
      progress: 3,
      maxProgress: 5,
      earned: false,
      icon: Award,
      requirements: 'Get 100% on 5 challenges'
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete 3 challenges in under 1 minute each',
      category: 'general',
      rarity: 'legendary',
      points: 200,
      progress: 1,
      maxProgress: 3,
      earned: false,
      icon: Zap,
      requirements: 'Complete 3 challenges under 1 minute'
    },
    {
      id: 'grand-master',
      name: 'Grand Master',
      description: 'Reach level 10',
      category: 'general',
      rarity: 'legendary',
      points: 500,
      progress: userProgress.level,
      maxProgress: 10,
      earned: userProgress.level >= 10,
      icon: Crown,
      requirements: 'Reach level 10'
    }
  ];

  const categories = [
    { id: 'all', label: 'All', count: achievements.length },
    { id: 'general', label: 'General', count: achievements.filter(a => a.category === 'general').length },
    { id: 'coding', label: 'Coding', count: achievements.filter(a => a.category === 'coding').length },
    { id: 'logic', label: 'Logic', count: achievements.filter(a => a.category === 'logic').length },
    { id: 'math', label: 'Math', count: achievements.filter(a => a.category === 'math').length }
  ];

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const earnedCount = achievements.filter(a => a.earned).length;
  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="p-4 md:pl-72">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">
              {selectedCharacter ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl">{selectedCharacter.emoji}</span>
                  <span>{selectedCharacter.name}'s Achievements</span>
                </div>
              ) : (
                "Achievements & Trophies"
              )}
            </h1>
            <p className="text-gray-600">Track your progress and unlock special rewards</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-700">{earnedCount}</div>
                <div className="text-sm text-yellow-600">Achievements Earned</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">{totalPoints}</div>
                <div className="text-sm text-purple-600">Achievement Points</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">
                  {Math.round((earnedCount / achievements.length) * 100)}%
                </div>
                <div className="text-sm text-blue-600">Completion Rate</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
              <CardContent className="p-4 text-center">
                <Crown className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">
                  {achievements.filter(a => a.earned && a.rarity === 'legendary').length}
                </div>
                <div className="text-sm text-green-600">Legendary Unlocked</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-white/80 hover:bg-white border-purple-200 hover:border-purple-300'
                  }`}
                >
                  {category.label}
                  <Badge className="ml-2 bg-purple-100 text-purple-700">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => {
              const Icon = achievement.icon;
              const progressPercent = Math.min((achievement.progress / achievement.maxProgress) * 100, 100);
              
              return (
                <Card 
                  key={achievement.id}
                  className={`relative border-2 transition-all duration-300 ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg'
                      : 'bg-white/80 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${
                        achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {achievement.earned ? (
                          <Icon className="h-6 w-6 text-yellow-600" />
                        ) : (
                          <Lock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <Badge className={`${getRarityColor(achievement.rarity)} border`}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    
                    <CardTitle className={`${
                      achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                    }`}>
                      {achievement.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className={`text-sm mb-4 ${
                      achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      
                      <Progress 
                        value={progressPercent} 
                        className={`h-2 ${
                          achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}
                      />
                      
                      <div className="flex justify-between items-center">
                        <Badge className="bg-purple-100 text-purple-700">
                          <Star className="h-3 w-3 mr-1" />
                          {achievement.points} pts
                        </Badge>
                        {achievement.earned && (
                          <Badge className="bg-green-100 text-green-800">
                            ✓ Earned
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        <strong>Requirement:</strong> {achievement.requirements}
                      </div>
                    </div>
                  </CardContent>
                  
                  {achievement.earned && (
                    <div className="absolute top-2 right-2">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-yellow-800" />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Special Character Achievement */}
          {selectedCharacter && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">
                {selectedCharacter.name} Special Achievements
              </h2>
              <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{selectedCharacter.emoji}</span>
                    <div>
                      <h3 className="font-bold text-purple-700">Master of {selectedCharacter.specialPower}</h3>
                      <p className="text-purple-600">Use your special power 10 times to unlock this exclusive achievement!</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Legendary
                    </Badge>
                  </div>
                  <Progress value={30} className="h-3 mb-4" />
                  <div className="text-sm text-purple-600">Progress: 3/10 special power uses</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}