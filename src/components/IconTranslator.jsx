import React from 'react';
import * as Icons from 'lucide-react';

// Maps company logos (emojis or strings) to premium Lucide Icons
export function CompanyIcon({ name, className = "h-5 w-5 text-purple-500" }) {
  const n = name || '';
  if (n === '⚡' || n === 'Zap' || n.toLowerCase().includes('nexatech')) {
    return <Icons.Zap className={className} />;
  }
  if (n === '📈' || n === 'LineChart' || n === 'TrendingUp' || n.toLowerCase().includes('finflow')) {
    return <Icons.LineChart className={className} />;
  }
  if (n === '🌱' || n === 'Leaf' || n.toLowerCase().includes('ecosphere')) {
    return <Icons.Leaf className={className} />;
  }
  if (n === '🎨' || n === 'Palette' || n.toLowerCase().includes('aura')) {
    return <Icons.Palette className={className} />;
  }
  if (n === '🏛️' || n === 'School' || n.toLowerCase().includes('cairo')) {
    return <Icons.School className={className} />;
  }
  return <Icons.Building2 className={className} />;
}

// Maps course categories/emojis to premium Lucide Icons
export function CourseIcon({ name, className = "h-5 w-5 text-pink-500" }) {
  switch (name) {
    case '💻':
    case 'Laptop':
      return <Icons.Laptop className={className} />;
    case '🤖':
    case 'Cpu':
      return <Icons.Cpu className={className} />;
    case '📊':
    case 'BarChart3':
      return <Icons.BarChart3 className={className} />;
    case '🗣️':
    case 'MessageSquare':
      return <Icons.MessageSquare className={className} />;
    case '📋':
    case 'Settings':
      return <Icons.Settings className={className} />;
    case '👑':
    case 'Users':
      return <Icons.Users className={className} />;
    case '📱':
    case 'Phone':
      return <Icons.Phone className={className} />;
    case '🧬':
    case 'Sparkles':
      return <Icons.Sparkles className={className} />;
    case '📉':
    case 'Binary':
      return <Icons.Binary className={className} />;
    case '💼':
    case 'PieChart':
      return <Icons.PieChart className={className} />;
    case '🚀':
    case 'Globe':
      return <Icons.Globe className={className} />;
    case '🎨':
    case 'Palette':
      return <Icons.Palette className={className} />;
    default:
      return <Icons.BookOpen className={className} />;
  }
}

// Renders student profile initials badge
export function InitialsAvatar({ name, className = "h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold font-sans" }) {
  if (!name) return <div className={className}>AR</div>;
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  return <div className={className}>{initials}</div>;
}
