import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  User, 
  Star, 
  Trophy, 
  Target, 
  Calendar,
  Zap,
  Code,
  Brain,
  Calculator,
  Blocks,
  Building,
  Building2,
  Component,
  Edit,
  Settings
} from 'lucide-react';

interface ProfilePageProps {
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
  onCharacterSelect: () => void;
}

export function ProfilePage({ selectedCharacter, userProgress, onCharacterSelect }: ProfilePageProps) {
  const stats = [
    {
      label: 'Grade 1 Challenges',
      value: `${userProgress.coding.completed}/${userProgress.coding.total}`,
      percentage: (userProgress.coding.completed / userProgress.coding.total) * 100,
      points: userProgress.coding.points,
      icon: Blocks,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Grade 2 Challenges',
      value: `${userProgress.logic.completed}/${userProgress.logic.total}`,
      percentage: (userProgress.logic.completed / userProgress.logic.total) * 100,
      points: userProgress.logic.points,
      icon: Brain,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Grade 3 Challenges',
      value: `${userProgress.math.completed}/${userProgress.math.total}`,
      percentage: (userProgress.math.completed / userProgress.math.total) * 100,
      points: userProgress.math.points,
      icon: Calculator,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first challenge', earned: true, rarity: 'common' },
    { name: 'Code Master', description: 'Complete 10 coding challenges', earned: true, rarity: 'rare' },
    { name: 'Logic Guru', description: 'Solve 15 logic puzzles', earned: true, rarity: 'rare' },
    { name: 'Math Wizard', description: 'Complete 12 math games', earned: true, rarity: 'epic' },
    { name: 'Speed Runner', description: 'Complete 5 challenges in under 2 minutes', earned: false, rarity: 'legendary' },
    { name: 'Perfect Score', description: 'Get 100% on 3 consecutive challenges', earned: false, rarity: 'legendary' }
  ];

  const recentActivity = [
    { activity: 'Completed Pattern Puzzle #5', points: 25, time: '2 hours ago', type: 'logic' },
    { activity: 'Solved Math Adventure Level 3', points: 40, time: '1 day ago', type: 'math' },
    { activity: 'Answered multiple choice questions correctly', points: 50, time: '2 days ago', type: 'coding' },
    { activity: 'Earned "Logic Master" badge', points: 100, time: '3 days ago', type: 'achievement' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="p-4 md:pl-72">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {selectedCharacter ? (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-4">
                        <span className="text-5xl">{selectedCharacter.emoji}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-purple-700">{selectedCharacter.name}</h2>
                      <p className="text-purple-600 text-sm">{selectedCharacter.description}</p>
                      <Badge className="mt-2 bg-purple-200 text-purple-700">
                        <Zap className="h-3 w-3 mr-1" />
                        {selectedCharacter.specialPower}
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-700">Bahumi Pilane</h2>
                      <p className="text-gray-600 text-sm">Keep track of your child's learning journey</p>
                    </div>
                  )}
                  
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-purple-600">Level {userProgress.level}</div>
                      <div className="text-sm text-gray-600">Current Level</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-pink-600">{userProgress.totalPoints}</div>
                      <div className="text-sm text-gray-600">Total Points</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">{userProgress.badges.length}</div>
                      <div className="text-sm text-gray-600">Badges</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">
                        {userProgress.coding.completed + userProgress.logic.completed + userProgress.math.completed}
                      </div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Stats */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                              </div>
                              <span className="font-medium">{stat.label}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{stat.value}</div>
                              <div className="text-sm text-gray-600">{stat.points} points</div>
                            </div>
                          </div>
                          <Progress value={stat.percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{activity.activity}</div>
                          <div className="text-sm text-gray-600">{activity.time}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`
                            ${activity.type === 'coding' ? 'bg-blue-100 text-blue-800' :
                              activity.type === 'logic' ? 'bg-green-100 text-green-800' :
                              activity.type === 'math' ? 'bg-orange-100 text-orange-800' :
                              'bg-purple-100 text-purple-800'}
                          `}>
                            +{activity.points}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border-2 ${
                          achievement.earned 
                            ? 'bg-yellow-50 border-yellow-200' 
                            : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`font-medium ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                            {achievement.name}
                          </h4>
                          <Badge className={`
                            ${achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                              achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                              achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                              'bg-yellow-100 text-yellow-800'}
                          `}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && (
                          <div className="mt-2">
                            <Trophy className="h-4 w-4 text-yellow-500 inline" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Earned Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Earned Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProgress.badges.map((badge, index) => (
                      <Badge key={index} className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        <Trophy className="h-3 w-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}