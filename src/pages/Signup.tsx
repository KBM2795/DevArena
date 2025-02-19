import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import logo from '../lib/logo.png';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', { name, email, password });
  };

  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-[#121212] animate-fade-in">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Logo */}
         <div className="flex justify-center mb-8 animate-scale-in">
            <img src={logo} alt="Logo" className="w-[30%]" />
          </div>
          
          {/* Title */}
          <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold gradient-text">
              Create your account
            </h2>
            <p className="mt-2 text-gray-400">
              Start your coding journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 stagger-animate">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:border-transparent transition-smooth"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:border-transparent transition-smooth"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:border-transparent transition-smooth"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Must be at least 8 characters long
              </p>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#00D4FF] focus:ring-[#00D4FF] focus:ring-offset-0 transition-smooth"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-[#00D4FF] hover:text-[#00D4FF]/80 transition-smooth hover-lift">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-[#00D4FF] hover:text-[#00D4FF]/80 transition-smooth hover-lift">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-[#00D4FF] hover:bg-[#00D4FF]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D4FF] button-hover"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#00D4FF] hover:text-[#00D4FF]/80 transition-smooth hover-lift">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}