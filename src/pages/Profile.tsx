import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Brain, Trophy, BarChart2, Settings, LogOut, Edit2, Camera, Sun, Moon, Award, Target, Zap, Star, Calendar, CheckCircle2 } from 'lucide-react';
import logo from '../lib/logo.png';
import applogo from '../lib/applogo.png'
const achievements = [
  {
    id: 1,
    title: 'Early Bird',
    description: 'Complete 5 challenges before 9 AM',
    progress: 80,
    icon: <Star className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 2,
    title: 'Code Warrior',
    description: 'Complete 100 challenges',
    progress: 45,
    icon: <Award className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 3,
    title: 'Perfect Streak',
    description: 'Maintain a 7-day streak',
    progress: 65,
    icon: <Target className="w-6 h-6 text-green-400" />,
  },
];

const badges = [
  { id: 1, name: 'JavaScript Pro', icon: '🏆', date: '2024-03-15' },
  { id: 2, name: 'React Master', icon: '⚛️', date: '2024-02-28' },
  { id: 3, name: 'Bug Hunter', icon: '🐛', date: '2024-03-10' },
  { id: 4, name: 'Clean Coder', icon: '✨', date: '2024-03-01' },
];

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [profileData, setProfileData] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    bio: 'Full-stack developer passionate about creating beautiful and functional web applications.',
    level: 15,
    xp: 7500,
    totalXp: 10000,
    completedChallenges: 85,
    rank: 42,
    streak: 7,
  });

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-secondary border-r border-muted p-4 animate-slide-in">
        <div className="flex items-center space-x-2 mb-8">
          <img src={logo} alt="Logo" className="w-[60%] animate-float" />
        </div>
        
        <nav className="space-y-2 stagger-animate">
          <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-smooth">
            <BarChart2 className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/challenges" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-smooth">
            <Code2 className="w-5 h-5" />
            <span>Challenges</span>
          </Link>
          <Link to="/ai-assistant" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-smooth">
            <Brain className="w-5 h-5" />
            <span>AI Assistant</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-smooth">
            <Trophy className="w-5 h-5" />
            <span>Leaderboard</span>
          </Link>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="absolute w-full bottom-4 left-1 right-4 text-center mb-20 space-x-2">
          <Link to="/profile" className="flex items-center flex-row space-x-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-primary transition-smooth">
            <img src={applogo} alt="Profile" className="w-10 h-10 rounded-full" />
            <div >
              <p className="text-sm font-semibold">Alex Chen</p>
              <p className="text-xs text-orange-500">alex.chen@example.com</p>
            </div>
          </Link>
        </div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-smooth">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-smooth">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-end mb-8 animate-fade-in">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-smooth"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-secondary rounded-xl p-8 mb-8 animate-scale-in">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold animate-float">
                  {profileData.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-smooth">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  <button
                    onClick={handleEditProfile}
                    className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-smooth"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-muted-foreground mt-2">{profileData.email}</p>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="mt-4 w-full p-2 rounded-lg bg-background border border-muted focus:outline-none focus:border-primary transition-smooth"
                    rows={3}
                  />
                ) : (
                  <p className="mt-4 text-muted-foreground">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 stagger-animate">
          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Level</h3>
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{profileData.level}</p>
            <div className="mt-2">
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full animate-pulse-slow"
                  style={{ width: `${(profileData.xp / profileData.totalXp) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {profileData.xp} / {profileData.totalXp} XP
              </p>
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Challenges</h3>
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{profileData.completedChallenges}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>

          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Rank</h3>
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">#{profileData.rank}</p>
            <p className="text-sm text-muted-foreground">Global</p>
          </div>

          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Streak</h3>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{profileData.streak} days 🔥</p>
            <p className="text-sm text-muted-foreground">Current streak</p>
          </div>
        </div>

        {/* Achievements */}
        <h2 className="text-2xl font-bold mb-4 animate-fade-in">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 stagger-animate">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-secondary rounded-xl p-6 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-background rounded-lg">{achievement.icon}</div>
                <span className="text-primary font-semibold">{achievement.progress}%</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <h2 className="text-2xl font-bold mb-4 animate-fade-in">Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-animate">
          {badges.map((badge) => (
            <div key={badge.id} className="bg-secondary rounded-xl p-6 card-hover">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl">{badge.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">{badge.name}</h3>
              <p className="text-sm text-muted-foreground text-center">
                Earned on {new Date(badge.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Gamification Message */}
        <div className="mt-8 bg-primary/10 rounded-xl p-6 animate-scale-in">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Almost there!</h3>
              <p className="text-muted-foreground">
                You're 80% close to reaching Level {profileData.level + 1}. Complete 3 more challenges to level up!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;