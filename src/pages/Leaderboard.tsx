import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Brain, Trophy, BarChart2, Settings, LogOut, Users, Search } from 'lucide-react';
import logo from '../lib/logo.png'; // Adjust path if needed
import applogo from '../lib/applogo.png'

const leaderboardData = [
  { rank: 1, name: 'Alex Chen', xp: 15000, solved: 120, streak: 15, country: 'US' },
  { rank: 2, name: 'Sarah Kim', xp: 14500, solved: 115, streak: 20, country: 'KR' },
  { rank: 3, name: 'Mike Johnson', xp: 14000, solved: 110, streak: 10, country: 'UK' },
  { rank: 4, name: 'Emma Wilson', xp: 13500, solved: 105, streak: 8, country: 'CA' },
  { rank: 5, name: 'David Lee', xp: 13000, solved: 100, streak: 12, country: 'SG' },
  { rank: 6, name: 'Lisa Wang', xp: 12500, solved: 95, streak: 5, country: 'CN' },
  { rank: 7, name: 'Tom Brown', xp: 12000, solved: 90, streak: 7, country: 'AU' },
  { rank: 8, name: 'Anna Smith', xp: 11500, solved: 85, streak: 9, country: 'DE' },
  { rank: 9, name: 'James Wilson', xp: 11000, solved: 80, streak: 6, country: 'FR' },
  { rank: 10, name: 'Maria Garcia', xp: 10500, solved: 75, streak: 4, country: 'ES' },
];

function Leaderboard() {
  const [filter, setFilter] = useState('global'); // 'global' | 'friends'
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-secondary border-r border-muted p-4">
        <div className="flex items-center space-x-2 mb-8">
         <img src={logo} alt="Logo" className='w-[60%]' />
        </div>
        
        <nav className="space-y-2">
          <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
            <BarChart2 className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/challenges" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Code2 className="w-5 h-5" />
            <span>Challenges</span>
          </Link>
          <Link to="/ai-assistant" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Brain className="w-5 h-5" />
            <span>AI Assistant</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground">
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
           
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground w-full">
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 bg-secondary rounded-lg border border-muted focus:outline-none focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex bg-secondary rounded-lg p-1">
              <button
                className={`px-4 py-2 rounded-lg ${
                  filter === 'global'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setFilter('global')}
              >
                Global
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  filter === 'friends'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setFilter('friends')}
              >
                Friends
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Your Rank</h3>
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">#42</p>
            <p className="text-sm text-muted-foreground">Top 5%</p>
          </div>
          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">XP Gained</h3>
              <BarChart2 className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">7,500</p>
            <p className="text-sm text-muted-foreground">This week</p>
          </div>
          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Active Users</h3>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-secondary rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-muted">
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">XP</th>
                <th className="px-6 py-4 text-left">Solved</th>
                <th className="px-6 py-4 text-left">Streak</th>
                <th className="px-6 py-4 text-left">Country</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr key={user.rank} className="border-b border-muted last:border-0 hover:bg-muted/10">
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      user.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      #{user.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">{user.xp.toLocaleString()}</td>
                  <td className="px-6 py-4">{user.solved}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center space-x-1">
                      <span>{user.streak}</span>
                      <span className="text-yellow-400">🔥</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;