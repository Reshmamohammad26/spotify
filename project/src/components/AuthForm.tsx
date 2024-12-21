import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { AuthHeader } from './AuthHeader';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
  onToggle: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit, onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password);
      setEmail('');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-lightest via-white-pure to-purple-light flex items-center justify-center p-4">
      <div className="max-w-md w-full backdrop-blur-sm bg-white-pure/90 p-8 rounded-xl shadow-lg border border-purple-light/20">
        <AuthHeader 
          title={isLogin ? 'Sign In' : 'Create an Account'}
          subtitle={isLogin ? 'Access your account' : 'Join us today'}
        />

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-DEFAULT" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg block w-full pl-10 px-3 py-2 bg-white-muted border border-purple-light focus:border-purple-DEFAULT text-gray-900 placeholder-purple-DEFAULT/50 focus:outline-none focus:ring-2 focus:ring-purple-light sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-DEFAULT" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg block w-full pl-10 px-3 py-2 bg-white-muted border border-purple-light focus:border-purple-DEFAULT text-gray-900 placeholder-purple-DEFAULT/50 focus:outline-none focus:ring-2 focus:ring-purple-light sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-DEFAULT hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              isLogin ? 'Sign in' : 'Create Account'
            )}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button
            onClick={onToggle}
            className="text-sm text-purple-DEFAULT hover:text-purple-dark font-medium transition-colors duration-200"
            disabled={isLoading}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};