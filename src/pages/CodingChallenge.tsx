import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Code2, Brain, Trophy, BarChart2, Settings, LogOut, Play, Send, MessageSquare, AlertCircle, FolderTree, FileCode, CheckCircle2, XCircle, ChevronRight, Lightbulb, Zap, Bug, Sparkles, ArrowLeft } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { getChallengeById, evaluateSubmission, type Challenge } from '../lib/challenges';
import logo from '../lib/logo.png'; // Adjust path if needed


interface FileStructure {
  name: string;
  content: string;
  language: string;
}

function CodingChallenge() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [activeFile, setActiveFile] = useState<FileStructure | null>(null);
  const [files, setFiles] = useState<FileStructure[]>([]);
  const [results, setResults] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [aiMessage, setAiMessage] = useState('');
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hi! I\'m your AI coding assistant. I can help you with hints, debugging, and code optimization. What would you like to know?' }
  ]);

  useEffect(() => {
    if (id) {
      const challengeData = getChallengeById(id);
      if (challengeData) {
        setChallenge(challengeData);
        // Initialize template files
        const templateFiles = [
          {
            name: 'index.js',
            content: challengeData.template,
            language: 'javascript'
          },
          {
            name: 'utils.js',
            content: '// Utility functions for the challenge\n\nexport const validateEmail = (email) => {\n  // Email validation logic\n};\n\nexport const checkPasswordStrength = (password) => {\n  // Password strength checking logic\n};',
            language: 'javascript'
          },
          {
            name: 'types.d.ts',
            content: 'interface LoginResult {\n  success: boolean;\n  message: string;\n}\n',
            language: 'typescript'
          },
          {
            name: 'test.js',
            content: 'import { login } from \'./index.js\';\n\ndescribe(\'Login Function\', () => {\n  test(\'validates email format\', () => {\n    // Test implementation\n  });\n});',
            language: 'javascript'
          }
        ];
        setFiles(templateFiles);
        setActiveFile(templateFiles[0]);
      }
    }
  }, [id]);

  const handleRunCode = () => {
    if (!challenge) return;
    const evaluation = evaluateSubmission(challenge, activeFile?.content || '');
    setResults(evaluation);
  };

  const handleShowHint = () => {
    if (!challenge) return;
    setShowHint(true);
    if (currentHint >= challenge.hints.length - 1) {
      setCurrentHint(0);
    } else {
      setCurrentHint(prev => prev + 1);
    }
  };

  const handleAIMessage = () => {
    if (!aiMessage.trim()) return;
    
    setAiChat(prev => [...prev, 
      { role: 'user', content: aiMessage },
      { role: 'assistant', content: 'Let me analyze your code and provide suggestions...' }
    ]);
    setAiMessage('');
  };

  const handleFileSelect = (file: FileStructure) => {
    setActiveFile(file);
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-secondary border-r border-muted p-4">
        <div className="flex items-center space-x-2 mb-8">
          <img src={logo} alt="Logo" className='w-[60%]' />
        </div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/challenges')}
          className="w-full flex items-center space-x-2 px-4 py-2 mb-6 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Challenges</span>
        </button>
        
        {/* File Explorer */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-4">FILES</h3>
          <div className="space-y-2">
            {files.map((file) => (
              <button
                key={file.name}
                onClick={() => handleFileSelect(file)}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeFile?.name === file.name
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 px-4">
          <button
            onClick={() => setShowAIPanel(true)}
            className="w-full flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
          >
            <Brain className="w-4 h-4" />
            <span>AI Assistant</span>
          </button>
          <button
            onClick={handleShowHint}
            className="w-full flex items-center space-x-2 px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500/20"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Get Hint</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 grid grid-cols-2 h-screen">
        {/* Left Panel - Problem Statement */}
        <div className="p-8 border-r border-muted overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm ${
                challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {challenge.difficulty}
              </span>
            </div>
            {challenge.dailyChallenge && (
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full mb-4">
                Daily Challenge
              </span>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <div className="text-muted-foreground mb-6 whitespace-pre-line">
              {challenge.description}
            </div>

            <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
            <div className="space-y-4 mb-6">
              {challenge.tests.map((test, index) => (
                <div key={index} className="bg-secondary/50 p-4 rounded-lg">
                  <p className="font-medium mb-2">Test {index + 1}: {test.description}</p>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Input: {JSON.stringify(test.input)}</p>
                    <p className="text-muted-foreground">Expected: {JSON.stringify(test.expected)}</p>
                  </div>
                </div>
              ))}
            </div>

            {showHint && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-yellow-400">Hint {currentHint + 1}</h4>
                </div>
                <p className="text-yellow-400">{challenge.hints[currentHint]}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor and Output */}
        <div className="flex flex-col h-full relative">
          {/* Code Editor */}
          <div className="flex-1 p-8">
            <Editor
              height="100%"
              defaultLanguage={activeFile?.language || 'typescript'}
              theme="vs-dark"
              value={activeFile?.content}
              onChange={(value) => {
                if (activeFile) {
                  setFiles(prev => prev.map(f => 
                    f.name === activeFile.name ? { ...f, content: value || '' } : f
                  ));
                  setActiveFile({ ...activeFile, content: value || '' });
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>

          {/* Output and Controls */}
          <div className="border-t border-muted p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleRunCode}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  <Play className="w-4 h-4" />
                  <span>Run Tests</span>
                </button>
                <button
                  onClick={() => setShowAIPanel(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
                >
                  <Brain className="w-4 h-4" />
                  <span>AI Help</span>
                </button>
              </div>
              <span className="text-primary font-semibold">{challenge.xp} XP</span>
            </div>

            {/* Test Results */}
            {results && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Test Results</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="text-xl font-bold text-primary">{results.score}%</span>
                  </div>
                </div>

                {results.results.map((result: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      result.passed ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {result.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                        Test {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
                  </div>
                ))}

                {/* AI Suggestions */}
                {results.suggestions.length > 0 && (
                  <div className="bg-secondary rounded-lg p-4 mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">AI Suggestions:</h3>
                    </div>
                    <ul className="space-y-2">
                      {results.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AI Assistant Panel */}
          {showAIPanel && (
            <div className="absolute right-0 top-0 h-full w-80 bg-secondary border-l border-muted flex flex-col">
              <div className="p-4 border-b border-muted flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">AI Assistant</h3>
                </div>
                <button
                  onClick={() => setShowAIPanel(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {aiChat.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-muted">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    placeholder="Ask AI for help..."
                    className="flex-1 px-3 py-2 bg-muted rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    onKeyPress={(e) => e.key === 'Enter' && handleAIMessage()}
                  />
                  <button
                    onClick={handleAIMessage}
                    className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 p-2 bg-muted/50 rounded-lg text-sm hover:bg-muted">
                    <Bug className="w-4 h-4" />
                    <span>Debug</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 p-2 bg-muted/50 rounded-lg text-sm hover:bg-muted">
                    <Sparkles className="w-4 h-4" />
                    <span>Optimize</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodingChallenge;