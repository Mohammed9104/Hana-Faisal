import React from 'react';
import { BookOpen, Star, Clock, GraduationCap, ChevronRight } from 'lucide-react';
import { CourseIcon } from './IconTranslator';

export default function CourseCard({ course, onEnroll, isEnrolled, onSelect }) {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Programming': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Artificial Intelligence': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Data Science': return 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20';
      case 'Business': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Marketing': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      default: return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
  };

  return (
    <div className="group p-6 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between h-full">
      <div>
        {/* Upper Header */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(course.category)}`}>
            {course.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{course.rating}</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex gap-3 mb-2">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/15 flex items-center justify-center">
            <CourseIcon name={course.image} className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <h3 
              onClick={onSelect}
              className="text-base font-bold text-slate-800 dark:text-white hover:text-purple-500 dark:hover:text-purple-400 cursor-pointer transition-colors line-clamp-2 leading-snug"
            >
              {course.title}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">By {course.instructor}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Modules Counter & Duration */}
        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium mb-4">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> {course.curriculum?.length || 0} Modules
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.duration}
          </span>
        </div>
      </div>

      {/* Enroll Action */}
      <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/30 flex items-center justify-between mt-auto">
        <button 
          onClick={onSelect}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
        >
          View Curriculum
        </button>

        {isEnrolled ? (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
            <GraduationCap className="h-3.5 w-3.5" /> Active
          </span>
        ) : (
          <button 
            onClick={onEnroll}
            className="flex items-center gap-0.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md"
          >
            <span>Enroll</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
