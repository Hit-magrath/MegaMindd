import React, { useState } from 'react'
import { User, Zap, LogIn, Eye, EyeOff, Mail, Lock, Star, Trophy, Target, Award } from 'lucide-react'

// Card components
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`rounded-lg shadow-md ${className}`}>
    {children}
  </div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>
    {children}
  </div>
)

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
)

// Login Page Component
const LoginPage = ({ onLogin }: { onLogin: (userData: any) => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      const userData = {
        name: 'Bahumi Pilane',
        email: email,
        level: 12,
        totalPoints: 2847,
        badges: ['Math Master', 'Logic Wizard', 'Code Explorer'],
        completedTasks: 156
      }
      onLogin(userData)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Star className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Learning Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white border-2 border-purple-100 shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </>
                )}
              </button>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-600 font-medium mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-500">Email: demo@example.com</p>
              <p className="text-xs text-gray-500">Password: password123</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Don't have an account? <span className="text-purple-600 hover:underline cursor-pointer">Sign up</span>
        </div>
      </div>
    </div>
  )
}

// Profile Dashboard Component
const ProfileDashboard = ({ userData, onLogout }: { userData: any, onLogout: () => void }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const userProgress = {
    level: userData.level,
    totalPoints: userData.totalPoints,
    badges: userData.badges,
    coding: { completed: 52 },
    logic: { completed: 48 },
    math: { completed: 56 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Learning Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Profile Header - Your Original Styling */}
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
                    <h2 className="text-2xl font-bold text-gray-700">{userData.name}</h2>
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

        {/* Additional Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Card className="bg-white border-2 border-blue-600 shadow-lg">
            <CardContent className="p-8 text-center">
              <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-700 mb-2">Achievements</h3>
              <p className="text-gray-700">View your earned badges and milestones</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-green-600 shadow-lg">
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Goals</h3>
              <p className="text-gray-700">Track your learning objectives</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-orange-500 shadow-lg">
            <CardContent className="p-8 text-center">
              <Award className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-orange-700 mb-2">Progress</h3>
              <p className="text-gray-700">Monitor your learning journey</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <Card className="bg-white border-2 border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700">Completed Math Challenge</span>
                  <Badge className="bg-green-200 text-green-700">+50 points</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">New Badge Earned: Logic Master</span>
                  <Badge className="bg-blue-200 text-blue-700">Achievement</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700">Level Up! Now Level {userProgress.level}</span>
                  <Badge className="bg-purple-200 text-purple-700">Level Up</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleLogin = (data: any) => {
    setUserData(data)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserData(null)
  }

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <ProfileDashboard userData={userData} onLogout={handleLogout} />
      )}
    </>
  )
}

export default App