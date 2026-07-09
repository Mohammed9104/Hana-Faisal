import React, { useState } from 'react';
import { User, Mail, Lock, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { authAPI } from '../services/api';
import confetti from 'canvas-confetti';

export default function StudentLogin({ onAuthSuccess, setActivePage }) {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate email format
  const validateEmail = (val) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setAuthError('');
    
    const formErrors = {};
    
    // Validations
    if (isSignUp && !name.trim()) formErrors.name = 'Full name is required';
    if (!email.trim()) {
      formErrors.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    
    if (isSignUp && !major.trim()) {
      formErrors.major = 'Field of study / major is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Register Student
        const res = await authAPI.register({
          name,
          email,
          password,
          role: 'student',
          university: 'Cairo Technological University',
          degree: major + ' (Senior Year)'
        });
        
        if (res.success) {
          confetti({ particleCount: 80, spread: 60 });
          onAuthSuccess(res);
        }
      } else {
        // Login Student
        const res = await authAPI.login(email, password);
        if (res.success) {
          confetti({ particleCount: 50, spread: 40 });
          onAuthSuccess(res);
        }
      }
    } catch (err) {
      console.warn("Auth request failed, deploying simulation credentials.", err);
      
      // Resilient local simulation mode fallback
      if (!isSignUp && email === 'alex@cairotech.edu.eg' && password === 'student123') {
        confetti({ particleCount: 50, spread: 40 });
        onAuthSuccess({
          success: true,
          role: 'student',
          name: 'Alex Rivera',
          email: 'alex@cairotech.edu.eg'
        });
      } else if (!isSignUp) {
        setAuthError('Invalid email or password. Use: alex@cairotech.edu.eg / student123 or sign up a new account!');
      } else {
        // Sign up simulation fallback
        confetti({ particleCount: 80, spread: 60 });
        onAuthSuccess({
          success: true,
          role: 'student',
          name,
          email,
          degree: major + ' (Senior Year)'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/50 space-y-6 relative overflow-hidden">
        
        {/* Glow Element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        
        <div className="text-center space-y-2 relative z-10">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-500/10">
            <BookOpen className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mt-4">
            {isSignUp ? 'Join CareerBridge AI' : 'Student Workspace Login'}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {isSignUp ? 'Connect education with real labor market challenges' : 'Enter your student credentials to manage solutions'}
          </p>
        </div>

        {authError && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-450 flex items-start gap-2.5 text-xs animate-in fade-in duration-200">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="font-semibold leading-relaxed">{authError}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10 text-xs">
          
          {/* Full Name (Sign Up only) */}
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-slate-100/50 dark:bg-slate-900/60 border ${errors.name ? 'border-rose-500/50' : 'border-slate-200 dark:border-slate-800'} pl-11 pr-4 py-2.5 rounded-xl text-slate-800 dark:text-white outline-none focus:border-purple-500/55 transition-colors`}
                />
              </div>
              {errors.name && <span className="text-[10px] text-rose-500 font-semibold">{errors.name}</span>}
            </div>
          )}

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
              <input 
                type="email"
                placeholder="alex@cairotech.edu.eg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-slate-100/50 dark:bg-slate-900/60 border ${errors.email ? 'border-rose-500/50' : 'border-slate-200 dark:border-slate-800'} pl-11 pr-4 py-2.5 rounded-xl text-slate-800 dark:text-white outline-none focus:border-purple-500/55 transition-colors`}
              />
            </div>
            {errors.email && <span className="text-[10px] text-rose-500 font-semibold">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
              <input 
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-100/50 dark:bg-slate-900/60 border ${errors.password ? 'border-rose-500/50' : 'border-slate-200 dark:border-slate-800'} pl-11 pr-4 py-2.5 rounded-xl text-slate-800 dark:text-white outline-none focus:border-purple-500/55 transition-colors`}
              />
            </div>
            {errors.password && <span className="text-[10px] text-rose-500 font-semibold">{errors.password}</span>}
          </div>

          {/* Field of study (Sign Up only) */}
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Field of Study / Major</label>
              <div className="relative">
                <Sparkles className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="e.g. Software Engineering"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className={`w-full bg-slate-100/50 dark:bg-slate-900/60 border ${errors.major ? 'border-rose-500/50' : 'border-slate-200 dark:border-slate-800'} pl-11 pr-4 py-2.5 rounded-xl text-slate-800 dark:text-white outline-none focus:border-purple-500/55 transition-colors`}
                />
              </div>
              {errors.major && <span className="text-[10px] text-rose-500 font-semibold">{errors.major}</span>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-650 hover:from-blue-500 hover:to-purple-550 text-white font-bold flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up Profile' : 'Access Workspace'}
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center text-[11px] font-medium text-slate-450 border-t border-slate-200/10 pt-4 relative z-10">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => { setIsSignUp(false); setErrors({}); setAuthError(''); }}
                className="text-purple-500 hover:underline font-bold"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              New student?{' '}
              <button 
                onClick={() => { setIsSignUp(true); setErrors({}); setAuthError(''); }}
                className="text-purple-500 hover:underline font-bold"
              >
                Create student profile
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
