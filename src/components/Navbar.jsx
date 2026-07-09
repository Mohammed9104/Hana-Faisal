import React, { useState } from 'react';
import { Sun, Moon, ChevronDown, GraduationCap, Building2, User, BookOpen, Briefcase, HelpCircle, Layers, Mail } from 'lucide-react';
import { InitialsAvatar } from './IconTranslator';

export default function Navbar({ activePage, setActivePage, activeRole, setActiveRole, darkMode, setDarkMode, userProfile, universityData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles = [
    { id: 'guest', name: 'Guest User', icon: HelpCircle, color: 'text-slate-500' },
    { id: 'student', name: 'Student (Alex)', icon: User, color: 'text-blue-500' },
    { id: 'company', name: 'Company (NexaTech)', icon: Building2, color: 'text-purple-500' },
    { id: 'university', name: 'University (Apex)', icon: GraduationCap, color: 'text-pink-500' },
  ];

  const currentRoleInfo = roles.find(r => r.id === activeRole);

  const mainNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'marketplace', label: 'Projects' },
    { id: 'learning-center', label: 'Learning Center' },
    { id: 'internships', label: 'Internships' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleRoleChange = (roleId) => {
    setActiveRole(roleId);
    setRoleDropdownOpen(false);
    // Redirect to dashboard if logged in, otherwise go home
    if (roleId === 'student') setActivePage('student-dashboard');
    else if (roleId === 'company') setActivePage('company-dashboard');
    else if (roleId === 'university') setActivePage('university-dashboard');
    else setActivePage('home');
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel px-4 py-3 md:px-8 border-b transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap md:flex-nowrap gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white font-sans">
            CareerBridge<span className="text-purple-500">AI</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {mainNavLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activePage === link.id
                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          
          {/* Simulator Panel / Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 transition-colors text-xs font-semibold"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Simulate: {currentRoleInfo?.name.split(' ')[0]}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card p-2 shadow-xl border border-slate-200/50 dark:border-slate-800/50 z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-200/20 mb-1">
                  Simulation Role Switcher
                </div>
                {roles.map(role => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleChange(role.id)}
                      className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                        activeRole === role.id
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${role.color}`} />
                      <span>{role.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Profile Quick Button */}
          {activeRole !== 'guest' && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40 hover:bg-slate-200/40 dark:hover:bg-slate-800/30 transition-all"
              >
                <InitialsAvatar name={activeRole === 'student' ? userProfile?.name : activeRole === 'company' ? 'NexaTech Solutions' : 'Cairo Technological University'} />
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
 
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-card p-1 shadow-xl border border-slate-200/50 dark:border-slate-800/50 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-200/10">
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {activeRole === 'student' ? (userProfile?.name || 'Alex Rivera') : activeRole === 'company' ? 'NexaTech Admin' : 'Dr. Evelyn Foster'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {activeRole === 'student' ? (userProfile?.degree?.split(' (')[0] || 'B.S. in Software Engineering') : activeRole === 'company' ? 'Company Manager' : 'Dean of Engineering'}
                    </p>
                  </div>
                  
                  {activeRole === 'student' && (
                    <>
                      <button 
                        onClick={() => { setActivePage('student-dashboard'); setDropdownOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        <Layers className="h-4 w-4" />
                        <span>My Dashboard</span>
                      </button>
                      <button 
                        onClick={() => { setActivePage('portfolio'); setDropdownOpen(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Public Portfolio</span>
                      </button>
                    </>
                  )}
                  {activeRole === 'company' && (
                    <button 
                      onClick={() => { setActivePage('company-dashboard'); setDropdownOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <Layers className="h-4 w-4" />
                      <span>Company Panel</span>
                    </button>
                  )}
                  {activeRole === 'university' && (
                    <button 
                      onClick={() => { setActivePage('university-dashboard'); setDropdownOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <Layers className="h-4 w-4" />
                      <span>University Panel</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={() => { handleRoleChange('guest'); setDropdownOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-left hover:bg-red-500/10 text-red-500 transition-colors border-t border-slate-200/10 mt-1"
                  >
                    <span>Log Out (to Guest)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile nav indicator bar */}
      <div className="flex lg:hidden items-center justify-around w-full mt-3 pt-2 border-t border-slate-200/20 text-xs">
        {mainNavLinks.slice(0, 5).map(link => (
          <button
            key={link.id}
            onClick={() => setActivePage(link.id)}
            className={`py-1 text-[11px] font-medium transition-colors ${
              activePage === link.id ? 'text-purple-500 font-bold border-b-2 border-purple-500' : 'text-slate-500'
            }`}
          >
            {link.label.split(' ')[0]}
          </button>
        ))}
      </div>
    </nav>
  );
}
