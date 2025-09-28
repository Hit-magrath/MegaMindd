import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ExplorePage } from './components/ExplorePage';
import { ProfilePage } from './components/ProfilePage';
import { AchievementsPage } from './components/AchievementsPage';
import LoginPage from './components/LoginPage';
import { CodingChallenge } from './components/CodingChallenge';
import { LogicPuzzle } from './components/LogicPuzzle';
import { MathGame } from './components/MathGame';
import { CharacterSelector, Character } from './components/CharacterSelectorPage';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Progress } from './components/ui/progress';
import { supabase } from './supabaseClient';
import { 
  Code, 
  Brain, 
  Calculator, 
  Star, 
  Trophy, 
  Zap,
  Crown,
  User,
  Sparkles,
  Blocks,
  Target
} from 'lucide-react';


type CurrentView = 'dashboard' | 'search' | 'profile' | 'achievements' | 'coding' | 'logic' | 'math';

export default function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('dashboard');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProgress, setUserProgress] = useState({
    level: 3,
    totalPoints: 245,
    badges: ['Memory Master', 'Logic Master', 'Math Wizard'],
    coding: { completed: 8, total: 15, points: 80 },
    logic: { completed: 12, total: 20, points: 120 },
    math: { completed: 9, total: 18, points: 90 }
  });

  const [data, setData] = useState<any[]>([]);

  React.useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data || []);
      }
      console.log('Fetched data:', data);
    }
    loadData();
  }, []);

  const updateProgress = (subject: 'coding' | 'logic' | 'math', points: number) => {
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      [subject]: {
        ...prev[subject],
        completed: prev[subject].completed + 1,
        points: prev[subject].points + points
      }
    }));
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const closeCharacterSelector = () => {
    setShowCharacterSelector(false);
  };

  const handlePageChange = (page: string) => {
    setCurrentView(page as CurrentView);
  };

  const handleActivitySelect = (activity: string) => {
    setCurrentView(activity as CurrentView);
  };

  // Game views
  if (currentView === 'coding') {
    return (
      <CodingChallenge 
        onBack={() => setCurrentView('dashboard')}
        onComplete={(points) => updateProgress('coding', points)}
        selectedCharacter={selectedCharacter}
      />
    );
  }

  if (currentView === 'logic') {
    return (
      <LogicPuzzle 
        onBack={() => setCurrentView('dashboard')}
        onComplete={(points) => updateProgress('logic', points)}
        selectedCharacter={selectedCharacter}
      />
    );
  }

  if (currentView === 'math') {
    return (
      <MathGame 
        onBack={() => setCurrentView('dashboard')}
        onComplete={(points) => updateProgress('math', points)}
        selectedCharacter={selectedCharacter}
      />
    );
  }

  // Page views with navigation
  const renderPageContent = () => {
    switch (currentView) {
      case 'search':
        return (
          <ExplorePage
            onSelectActivity={handleActivitySelect}
            selectedCharacter={selectedCharacter}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            selectedCharacter={selectedCharacter}
            userProgress={userProgress}
            onCharacterSelect={() => setShowCharacterSelector(true)}
          />
        );
      case 'achievements':
        return (
          <AchievementsPage
            selectedCharacter={selectedCharacter}
            userProgress={userProgress}
          />
        );
      case 'login':
        return (
          <LoginPage 
          onLoginSuccess={() => setCurrentView('dashboard')} />);
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
            <div className="p-4 md:pl-72">
              <div className="max-w-6xl mx-auto">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Crown className="h-8 w-8 text-yellow-500" />
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      MEGAMINDD
                    </h1>
                  </div>
                  <p className="text-base md:text-lg text-gray-600 mb-4">
                    Learn reading, logic and remembering things through fun games!
                  </p>
                </div>

                {/* User Progress Card - Mobile Optimized */}
                <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                      {selectedCharacter ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl md:text-2xl">{selectedCharacter.emoji}</span>
                          <span className="hidden sm:inline">{selectedCharacter.name}'s Progress</span>
                          <span className="sm:hidden">Progress</span>
                        </div>
                      ) : (
                        "Your Progress"
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3 md:gap-6">
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1 md:mb-2">Level {userProgress.level}</div>
                        <div className="text-xs md:text-sm text-gray-600">Current Level</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-pink-600 mb-1 md:mb-2">{userProgress.totalPoints}</div>
                        <div className="text-xs md:text-sm text-gray-600">Total Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">{userProgress.badges.length}</div>
                        <div className="text-xs md:text-sm text-gray-600">Badges Earned</div>
                      </div>
                    </div>
                    
                    {/* Badges - Mobile Scrollable */}
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                        {userProgress.badges.map((badge, index) => (
                          <Badge key={index} className="bg-yellow-100 text-yellow-800 border-yellow-300 whitespace-nowrap">
                            <Trophy className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="text-xs">{badge}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
 
                    
                  </CardContent>
                </Card>

                {/* Quick Actions - Mobile First */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Button 
                    onClick={() => setCurrentView('search')}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 h-auto"
                  >
                    <div className="text-center">
                      <Sparkles className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Explore</div>
                      <div className="text-xs opacity-90">Find new challenges</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => setCurrentView('achievements')}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white p-4 h-auto"
                  >
                    <div className="text-center">
                      <Trophy className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Achievements</div>
                      <div className="text-xs opacity-90">View your trophies</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => setCurrentView('profile')}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white p-4 h-auto"
                  >
                    <div className="text-center">
                      <User className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Profile</div>
                      <div className="text-xs opacity-90">View your stats</div>
                    </div>
                  </Button>
                </div>

                {/* Subject Cards - Mobile Optimized */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Coding Card */}
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200"
                        onClick={() => setCurrentView('coding')}>
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3 md:mb-4">
                        <Blocks className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <CardTitle className="text-blue-700 text-lg md:text-xl">Enchanted Garden </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 md:space-y-4">
                        <Progress value={(userProgress.coding.completed / userProgress.coding.total) * 100} className="h-2 md:h-3" />
                        <div className="flex justify-between text-xs md:text-sm text-gray-600">
                          <span>{userProgress.coding.completed}/{userProgress.coding.total} completed</span>
                          <span>{userProgress.coding.points} points</span>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-sm md:text-base">
                          <Zap className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          See learning journey
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Logic Card */}
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200"
                        onClick={() => setCurrentView('logic')}>
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mb-3 md:mb-4">
                        <Brain className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <CardTitle className="text-green-700 text-lg md:text-xl">Going to the Park</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 md:space-y-4">
                        <Progress value={(userProgress.logic.completed / userProgress.logic.total) * 100} className="h-2 md:h-3" />
                        <div className="flex justify-between text-xs md:text-sm text-gray-600">
                          <span>{userProgress.logic.completed}/{userProgress.logic.total} completed</span>
                          <span>{userProgress.logic.points} points</span>
                        </div>
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-sm md:text-base">
                          <Zap className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          See learning journey
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Math Card */}
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-orange-50 to-red-100 border-2 border-orange-200"
                        onClick={() => setCurrentView('math')}>
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3 md:mb-4">
                        <Calculator className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </div>
                      <CardTitle className="text-orange-700 text-lg md:text-xl">Goat Quest</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 md:space-y-4">
                        <Progress value={(userProgress.math.completed / userProgress.math.total) * 100} className="h-2 md:h-3" />
                        <div className="flex justify-between text-xs md:text-sm text-gray-600">
                          <span>{userProgress.math.completed}/{userProgress.math.total} completed</span>
                          <span>{userProgress.math.points} points</span>
                        </div>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-sm md:text-base">
                          <Zap className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          See learning journey
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Navigation */}
      <Navigation
        currentPage={currentView}
        onPageChange={handlePageChange}
        selectedCharacter={selectedCharacter}
        userProgress={userProgress}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      {renderPageContent()}

      {/* Character Selection Modal */}
      {showCharacterSelector && (
        <CharacterSelector
          onSelectCharacter={handleCharacterSelect}
          selectedCharacter={selectedCharacter}
        />
      )}

      {/* Character Welcome Modal */}
      {selectedCharacter && showCharacterSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="text-4xl md:text-6xl mb-4">{selectedCharacter.emoji}</div>
            <h3 className="text-xl md:text-2xl font-bold text-purple-700 mb-2">
              Welcome, {selectedCharacter.name}!
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              {selectedCharacter.description}
            </p>
            <Button 
              onClick={closeCharacterSelector}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full"
            >
              Let's Start Learning! 🎮
            </Button>
          </div>
        </div>
      )}
    </>
  );
}