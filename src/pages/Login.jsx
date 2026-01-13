import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ForgotPassword from '../components/common/ForgotPassword';
import usersData from '../data/users.json';

/**
 * Login Page Component
 * Handles user authentication with email and password
 */
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Email or username validation
      // Allow either valid email format or a username
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      const hasUsername = email && email.length >= 3 && !email.includes(' ');
      
      if (!isValidEmail && !hasUsername) {
        setError('Please enter a valid email address or username');
        setLoading(false);
        return;
      }

      // Find user by email (case-insensitive)
      const user = usersData.find(
        u => u.email?.toLowerCase() === email.toLowerCase() || 
             u.username?.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        setError('Email or username not found');
        setLoading(false);
        return;
      }

      // For demo purposes, accept any password
      // In production, this would verify against hashed password
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Login successful
      login(user);
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberedEmail', email);
      }

      // Redirect based on user role and status
      const userRole = user.userRole || 'student';
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'career_counselor' && user.counsellorStatus === 'approved') {
        navigate('/counselor/dashboard');
      } else if (userRole === 'mentor' && user.mentorStatus === 'approved') {
        navigate('/mentor/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials helper
  const fillDemoCredentials = () => {
    setEmail('sarahchen');
    setPassword('demo123456');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    } py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`w-full max-w-md ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
      } rounded-xl shadow-2xl p-8 space-y-8`}>
        
        {/* Logo & Title */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-600 rounded-lg">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            SmartCareer
          </h1>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Build your future with career guidance
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Email or Username
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>

          {/* Demo Button */}
          <button
            type="button"
            onClick={fillDemoCredentials}
            className={`w-full py-2 px-4 rounded-lg border-2 font-semibold transition-colors ${
              theme === 'dark'
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Try Demo Credentials
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className={`absolute inset-0 flex items-center ${
            theme === 'dark' ? 'border-t border-slate-700' : 'border-t border-slate-200'
          }`}></div>
          <div className={`relative flex justify-center text-sm ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
          }`}>
            <span className={`px-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              or
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className={`text-center text-sm ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
          >
            Create one now
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPassword 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onBack={() => setShowForgotPassword(false)}
      />
    </div>
  );
}

export default Login;
