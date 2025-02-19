import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Brain, Trophy, BarChart2, Settings, LogOut, Search, Filter, Calendar, Star, Clock, BookOpen, FileCode, FolderTree, CheckCircle2, XCircle, AlertCircle, Zap } from 'lucide-react';
import { getAllChallenges, getDailyChallenge, type Challenge } from '../lib/challenges';
import logo from '../lib/logo.png'; // Adjust path if needed
import applogo from '../lib/applogo.png'

function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    const allChallenges = getAllChallenges();
    const daily = getDailyChallenge();
    setChallenges(allChallenges);
    setDailyChallenge(daily);
  }, []);

  const categories = ['All', ...new Set(challenges.map(c => c.category))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'All' || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

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
          <Link to="/challenges" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground">
            <Code2 className="w-5 h-5" />
            <span>Challenges</span>
          </Link>
          <Link to="/ai-assistant" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Brain className="w-5 h-5" />
            <span>AI Assistant</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Trophy className="w-5 h-5" />
            <span>Leaderboard</span>
          </Link>
        </nav>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-4">CHALLENGE STATS</h3>
          <div className="space-y-4 px-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Completed</span>
              <span className="text-foreground font-medium">24/50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Success Rate</span>
              <span className="text-green-400 font-medium">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="text-yellow-400 font-medium">5 days 🔥</span>
            </div>
          </div>
        </div>

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
          <div>
            <h1 className="text-3xl font-bold mb-2">Coding Challenges</h1>
            <p className="text-muted-foreground">Master web & app development with AI-powered challenges</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="pl-10 pr-4 py-2 bg-secondary rounded-lg border border-muted focus:outline-none focus:border-primary w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex bg-secondary rounded-lg p-1">
              <button
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                onClick={() => setViewMode('grid')}
              >
                <FolderTree className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                onClick={() => setViewMode('list')}
              >
                <FileCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Challenge */}
        {dailyChallenge && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Daily Challenge</span>
            </h2>
            <div className="bg-secondary rounded-xl p-6 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold">{dailyChallenge.title}</h3>
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                        Daily Challenge
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-muted-foreground">{dailyChallenge.category}</span>
                      <span className="text-sm text-muted-foreground flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>30 mins</span>
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>4.8/5</span>
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    dailyChallenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    dailyChallenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {dailyChallenge.difficulty}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{dailyChallenge.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">+45 solved today</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-primary font-semibold flex items-center space-x-1">
                      <Zap className="w-5 h-5" />
                      <span>{dailyChallenge.xp} XP</span>
                    </span>
                    <Link
                      to={`/challenge/${dailyChallenge.id}`}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center space-x-2"
                    >
                      <span>Start Challenge</span>
                      <Code2 className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex space-x-4 mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              className="bg-secondary border border-muted rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <select
            className="bg-secondary border border-muted rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        {/* Challenge Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-secondary rounded-xl p-6 card-hover relative overflow-hidden"
                onClick={() => handleChallengeSelect(challenge)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{challenge.category}</span>
                        <span className="text-sm text-muted-foreground flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>30 mins</span>
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{challenge.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">4 template files</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-primary font-semibold flex items-center space-x-1">
                        <Zap className="w-5 h-5" />
                        <span>{challenge.xp} XP</span>
                      </span>
                      <Link
                        to={`/challenge/${challenge.id}`}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center space-x-2"
                      >
                        <span>Start</span>
                        <Code2 className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-secondary rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-muted">
                  <th className="px-6 py-4 text-left">Challenge</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Difficulty</th>
                  <th className="px-6 py-4 text-left">Success Rate</th>
                  <th className="px-6 py-4 text-left">XP</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredChallenges.map((challenge) => (
                  <tr key={challenge.id} className="border-b border-muted last:border-0 hover:bg-muted/10">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">{challenge.description.slice(0, 60)}...</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{challenge.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                        </div>
                        <span className="text-muted-foreground">75%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-primary font-semibold">{challenge.xp} XP</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/challenge/${challenge.id}`}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 inline-flex items-center space-x-2"
                      >
                        <span>Start</span>
                        <Code2 className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Challenge Details Modal */}
        {selectedChallenge && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-secondary rounded-xl p-8 max-w-2xl w-full mx-4 relative">
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedChallenge(null)}
              >
                <XCircle className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold mb-4">{selectedChallenge.title}</h2>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedChallenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  selectedChallenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {selectedChallenge.difficulty}
                </span>
                <span className="text-muted-foreground">{selectedChallenge.category}</span>
                <span className="text-primary font-semibold">{selectedChallenge.xp} XP</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedChallenge.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Template Files</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 rounded bg-muted/10">
                      <FileCode className="w-4 h-4 text-primary" />
                      <span>index.js</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded bg-muted/10">
                      <FileCode className="w-4 h-4 text-primary" />
                      <span>utils.js</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded bg-muted/10">
                      <FileCode className="w-4 h-4 text-primary" />
                      <span>styles.css</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Implement the login function with email validation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Add password strength requirements</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Handle error cases and provide feedback</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Hints Available</h3>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">3 progressive hints will be revealed as needed</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 rounded-lg border border-muted text-muted-foreground hover:text-foreground"
                    onClick={() => setSelectedChallenge(null)}
                  >
                    Cancel
                  </button>
                  <Link
                    to={`/challenge/${selectedChallenge.id}`}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center space-x-2"
                  >
                    <span>Start Challenge</span>
                    <Code2 className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Challenges;