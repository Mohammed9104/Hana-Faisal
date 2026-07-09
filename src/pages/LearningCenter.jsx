import React, { useState } from 'react';
import { BookOpen, Sparkles, Star, CheckCircle, Search, Layers } from 'lucide-react';
import CourseCard from '../components/CourseCard';

export default function LearningCenter({ courses, enrolledCourses, onEnrollCourse, onSelectCourse }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Programming',
    'Artificial Intelligence',
    'Data Science',
    'Business',
    'Marketing',
    'Communication Skills',
    'Leadership',
    'Project Management'
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Learning Center</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
            Acquire targeted competencies that corporate projects demand. Completing these courses directly boosts your AI match scores.
          </p>
        </div>
      </div>

      {/* Categories Scroller */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-semibold border transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search and Quick Metric */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-2xl focus-within:border-purple-500/50 transition-colors w-full md:max-w-md">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search courses, modules, or instructors..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-slate-800 dark:text-white w-full"
          />
        </div>

        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider shrink-0">
          Showing {filteredCourses.length} professional curricula
        </span>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const isEnrolled = enrolledCourses.includes(course.id);
            return (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={isEnrolled}
                onEnroll={() => onEnrollCourse(course.id)}
                onSelect={() => onSelectCourse(course)}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl glass-panel border border-dashed border-slate-300 dark:border-slate-800 max-w-xl mx-auto space-y-4">
          <Layers className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="font-extrabold text-slate-800 dark:text-slate-200">No courses matching filters</h3>
          <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto">
            Try choosing a different catalog category or cleaning the search input query.
          </p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
