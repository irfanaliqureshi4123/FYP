import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import usersData from '../../data/users.json';

/**
 * ForgotPassword Modal Component
 * Handles password reset requests with email verification
 */
function ForgotPassword({ isOpen, onClose, onBack }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate email
      if (!email.trim()) {
        setError('Please enter your email address');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Check if email exists in system
      const user = usersData.find(
        u => u.email?.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        // For security, don't reveal if email exists
        setSuccess(true);
        setSentEmail(email);
        setEmail('');
        setLoading(false);
        return;
      }

      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess(true);
      setSentEmail(email);
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setSentEmail('');
    setEmail('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
      } rounded-xl shadow-2xl p-8 space-y-6`}>
        
        {success ? (
          <>
            {/* Success State */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Check Your Email
                </h2>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  We've sent a password reset link to:
                </p>
              </div>

              <div className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
              }`}>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
                }`}>
                  {sentEmail}
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
              } border ${
                theme === 'dark' ? 'border-blue-700' : 'border-blue-200'
              }`}>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  The reset link will expire in 24 hours. If you don't see the email, check your spam folder.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={handleReset}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Back to Login
                </button>

                <button
                  onClick={() => window.open(`mailto:${sentEmail}`)}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors border-2 ${
                    theme === 'dark'
                      ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Open Email App
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Forgot Password Form */}
            <div className="space-y-2">
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Reset Password
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Enter your email and we'll send you a link to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            <button
              onClick={onBack}
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-colors ${
                theme === 'dark'
                  ? 'text-slate-300 hover:bg-slate-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
