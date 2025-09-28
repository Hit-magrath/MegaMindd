import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  Search, 
  User, 
  Trophy,
  LogIn, 
  Menu,
  X,
  Crown
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
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
  };
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Navigation({ 
  currentPage, 
  onPageChange, 
  selectedCharacter,
  userProgress,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'search', label: 'Explore', icon: Search },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'login', label: 'Login', icon: LogIn }
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white/95 backdrop-blur-sm border-b-2 border-purple-200 p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MEGAMINDD
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedCharacter && (
              <div className="text-2xl">{selectedCharacter.emoji}</div>
            )}
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
              {userProgress.totalPoints}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="h-6 w-6 text-yellow-500" />
                <h2 className="text-lg font-bold text-purple-700">MEGAMINDD</h2>
              </div>
              
              {selectedCharacter && (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedCharacter.emoji}</span>
                    <div>
                      <div className="font-medium text-purple-700">{selectedCharacter.name}</div>
                      <div className="text-xs text-purple-600">Level {userProgress.level}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      currentPage === item.id 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                    }`}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 w-64 h-full bg-white/95 backdrop-blur-sm border-r-2 border-purple-200 p-4 z-30">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-yellow-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MEGAMINDD
            </h1>
          </div>
          
          {selectedCharacter && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCharacter.emoji}</span>
                <div>
                  <div className="font-medium text-purple-700">{selectedCharacter.name}</div>
                  <div className="text-sm text-purple-600">Level {userProgress.level}</div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 mt-1">
                    {userProgress.totalPoints} points
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  currentPage === item.id 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                }`}
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </>
  );
}