import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Code, 
  Brain, 
  Calculator, 
  Star, 
  Clock,
  Filter,
  Zap,
  Trophy,
  Target
} from 'lucide-react';

interface ExplorePageProps {
  onSelectActivity: (activity: string) => void;
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

export function ExplorePage({ onSelectActivity, selectedCharacter }: ExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activities = [
    {
      id: 'coding-basics',
      title: 'Coding Basics',
      description: 'Learn to code with fun drag-and-drop blocks',
      category: 'coding',
      difficulty: 'Beginner',
      duration: '15 min',
      points: 50,
      icon: Code,
      gradient: 'from-blue-50 to-indigo-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500'
    },
    {
      id: 'pattern-puzzles',
      title: 'Pattern Puzzles',
      description: 'Discover patterns and solve logic challenges',
      category: 'logic',
      difficulty: 'Intermediate',
      duration: '20 min',
      points: 75,
      icon: Brain,
      gradient: 'from-green-50 to-emerald-100',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-500'
    },
    {
      id: 'math-adventures',
      title: 'Math Adventures',
      description: 'Explore numbers through interactive games',
      category: 'math',
      difficulty: 'Beginner',
      duration: '10 min',
      points: 40,
      icon: Calculator,
      gradient: 'from-orange-50 to-red-100',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-500'
    },
    {
      id: 'advanced-coding',
      title: 'Advanced Coding',
      description: 'Master complex coding concepts and algorithms',
      category: 'coding',
      difficulty: 'Advanced',
      duration: '30 min',
      points: 100,
      icon: Code,
      gradient: 'from-purple-50 to-violet-100',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-500'
    },
    {
      id: 'sequence-solving',
      title: 'Sequence Solving',
      description: 'Find patterns in number and shape sequences',
      category: 'logic',
      difficulty: 'Advanced',
      duration: '25 min',
      points: 90,
      icon: Target,
      gradient: 'from-cyan-50 to-blue-100',
      borderColor: 'border-cyan-200',
      iconBg: 'bg-cyan-500'
    },
    {
      id: 'geometry-games',
      title: 'Geometry Games',
      description: 'Discover shapes and spatial relationships',
      category: 'math',
      difficulty: 'Intermediate',
      duration: '18 min',
      points: 65,
      icon: Calculator,
      gradient: 'from-pink-50 to-rose-100',
      borderColor: 'border-pink-200',
      iconBg: 'bg-pink-500'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || activity.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: 'all', label: 'All', count: activities.length },
    { id: 'coding', label: 'Coding', count: activities.filter(a => a.category === 'coding').length },
    { id: 'logic', label: 'Logic', count: activities.filter(a => a.category === 'logic').length },
    { id: 'math', label: 'Math', count: activities.filter(a => a.category === 'math').length }
  ];

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
                  <span>Explore with {selectedCharacter.name}</span>
                </div>
              ) : (
                "Explore Learning Adventures"
              )}
            </h1>
            <p className="text-gray-600">Discover new challenges and learning opportunities</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 border-2 border-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`${
                    selectedFilter === filter.id 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-white/80 hover:bg-white border-purple-200 hover:border-purple-300'
                  }`}
                >
                  {filter.label}
                  <Badge className="ml-2 bg-purple-100 text-purple-700">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <Card 
                  key={activity.id}
                  className={`hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br ${activity.gradient} border-2 ${activity.borderColor}`}
                  onClick={() => onSelectActivity(activity.category)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 ${activity.iconBg} rounded-full flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      {activity.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge 
                          className={`${
                            activity.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            activity.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {activity.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {activity.points} pts
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        {activity.duration}
                      </div>
                      
                      <Button className="w-full mt-4">
                        <Zap className="h-4 w-4 mr-2" />
                        Start Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No activities found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Recommended Section */}
          {selectedCharacter && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">
                Recommended for {selectedCharacter.name}
              </h2>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border-2 border-purple-200">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{selectedCharacter.emoji}</span>
                  <div>
                    <h3 className="font-bold text-purple-700">Special Challenge</h3>
                    <p className="text-purple-600">Use your {selectedCharacter.specialPower} to earn bonus points!</p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Trophy className="h-4 w-4 mr-2" />
                  Try Special Challenge
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}