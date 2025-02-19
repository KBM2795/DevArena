import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Brain, Trophy, Calendar, ArrowRight, Github } from 'lucide-react';
import logo from '../lib/logo.png';

const features = [
  {
    icon: <Brain className="w-6 h-6 text-blue-400" />,
    title: 'AI-Powered Feedback',
    description: 'Get instant, intelligent feedback on your code submissions',
  },
  {
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    title: 'Real-World Tasks',
    description: 'Practice with industry-relevant coding challenges',
  },
  {
    icon: <Trophy className="w-6 h-6 text-blue-400" />,
    title: 'Global Leaderboard',
    description: 'Compete with developers worldwide and track your progress',
  },
  {
    icon: <Calendar className="w-6 h-6 text-blue-400" />,
    title: 'Daily Challenges',
    description: 'New coding challenges every day to keep you sharp',
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 animate-slide-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-[30%] animate-float" />
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth hover-lift">Features</a>
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-smooth hover-lift">Dashboard</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transition-smooth hover-lift">
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <Link
              to="/login"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg button-hover"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative hero-gradient">
        <div className="container mx-auto px-6 py-24 text-center animate-scale-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Master Web & App Development with{' '}
            <span className="gradient-text">AI Challenges</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Level up your coding skills with AI-powered challenges, real-time feedback,
            and a global community of developers.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg text-lg font-semibold button-hover"
          >
            <span>Start Coding</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
          Everything you need to excel
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animate">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary p-6 rounded-xl card-hover"
            >
              <div className="mb-4 animate-float">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-secondary rounded-2xl p-12 text-center animate-scale-in">
          <h2 className="text-3xl font-bold mb-6">
            Ready to become a better developer?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already improving their skills
            with AI-powered challenges.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg font-semibold button-hover"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-muted animate-fade-in">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-[30%] animate-float" />
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 DEVARENA. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;