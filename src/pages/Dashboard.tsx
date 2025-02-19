import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Brain, Trophy, BarChart2, Settings, LogOut, Laptop } from 'lucide-react';
import logo from '../lib/logo.png';
import applogo from '../lib/applogo.png'

const challenges = [
  {
    title: 'Responsive Navbar',
    difficulty: 'Easy',
    xp: 100,
    category: 'Web & App Development',
    completionRate: '85%',
  },
  {
    title: 'React Authentication',
    difficulty: 'Medium',
    xp: 200,
    category: 'Web & App Development',
    completionRate: '50%',
  },
  {
    title: 'Flutter State Management',
    difficulty: 'Hard',
    xp: 300,
    category: 'Web & App Development',
    completionRate: '30%',
  },
];

const recentSubmissions = [
  { title: 'Login Page UI', feedback: 'Good structure, improve accessibility.', score: 85 },
  { title: 'E-commerce Cart Logic', feedback: 'Logic is efficient but lacks edge case handling.', score: 78 },
  { title: 'Portfolio Website', feedback: 'Well designed, but optimize for mobile.', score: 90 },
];

const leaderboardPreview = [
  { name: 'Alex Chen', xp: 15000, solved: 120 },
  { name: 'Sarah Kim', xp: 14500, solved: 115 },
  { name: 'Mike Johnson', xp: 14000, solved: 110 },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-secondary border-r border-muted p-4 animate-slide-in">
        <div className="flex items-center space-x-2 mb-8">
          <img src={logo} alt="Logo" className="w-[60%] animate-float" />
        </div>
        
        <nav className="space-y-2 stagger-animate">
          <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground transition-smooth">
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

        <div className="absolute bottom-4 left-4 right-4 space-y-1 ">
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
          <Link to="/">
          <button   className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
             </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Welcome Banner */}
        <div className="bg-secondary rounded-xl p-8 mb-8 animate-scale-in">
          <h1 className="text-3xl font-bold mb-4">Welcome back, Developer!</h1>
          <div className="flex items-center space-x-8">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-muted-foreground mb-2">Current Level</p>
              <p className="text-2xl font-semibold">Level 15</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-muted-foreground mb-2">XP Progress</p>
              <div className="w-64 h-3 bg-muted rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-primary rounded-full animate-pulse-slow" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">7,500 / 10,000 XP</p>
            </div>
          </div>
        </div>

        {/* Challenge Grid */}
        <h2 className="text-2xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>Available Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 stagger-animate">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-secondary rounded-xl p-6 card-hover">
              <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
              <p className="text-muted-foreground mb-2">{challenge.category}</p>
              <span className="text-primary font-semibold">{challenge.xp} XP</span>
            </div>
          ))}
        </div>

        {/* Recent Submissions */}
        <h2 className="text-2xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>Recent Submissions</h2>
        <div className="bg-secondary rounded-xl p-6 animate-scale-in" style={{ animationDelay: '1s' }}>
          {recentSubmissions.map((submission, index) => (
            <div key={index} className="py-3 border-b border-muted last:border-0 transition-smooth hover:bg-muted/10">
              <h3 className="text-lg font-semibold">{submission.title}</h3>
              <p className="text-muted-foreground">{submission.feedback}</p>
              <p className="font-semibold">Score: {submission.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;