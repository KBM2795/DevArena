import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Brain, Trophy, BarChart2, Settings, LogOut, Send, Sparkles, Bug, FileCode } from 'lucide-react';
import logo from '../lib/logo.png'; // Adjust path if needed
import applogo from '../lib/applogo.png'

function AIAssistant() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'assistant',
      content: "Hello! I'm your AI coding assistant. How can I help you today?",
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setChatHistory((prev) => [
      ...prev,
      { type: 'user', content: message },
      { type: 'assistant', content: 'Let me help you with that...' }, // Simulated response
    ]);
    setMessage('');
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
          <Link to="/challenges" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Code2 className="w-5 h-5" />
            <span>Challenges</span>
          </Link>
          <Link to="/ai-assistant" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground">
            <Brain className="w-5 h-5" />
            <span>AI Assistant</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
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
      <div className="ml-64 h-screen flex flex-col">
        {/* Quick Actions */}
        <div className="p-8 border-b border-muted">
          <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
          <div className="grid grid-cols-3 gap-4">
            <button className="flex items-center space-x-2 px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Explain Code</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80">
              <Bug className="w-5 h-5 text-primary" />
              <span>Debug Code</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80">
              <FileCode className="w-5 h-5 text-primary" />
              <span>Optimize Code</span>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="space-y-6">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-8 border-t border-muted">
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about coding..."
              className="flex-1 px-4 py-3 bg-secondary rounded-lg border border-muted focus:outline-none focus:border-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;