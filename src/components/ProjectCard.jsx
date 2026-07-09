import React, { useState } from 'react';
import { ArrowRight, DollarSign, Calendar, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CompanyIcon } from './IconTranslator';

export default function ProjectCard({ project, onSelect, activeRole, studentProfile }) {
  const [showExplanation, setShowExplanation] = useState(false);

  // Retrieve AI match score for Alex Rivera
  const mockStudentName = studentProfile?.name || "Alex Rivera";
  const matchInfo = project.matches?.[mockStudentName] || { score: 50, reason: "Incomplete profile details to compute AI match score." };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'from-emerald-500 to-teal-500 text-emerald-500';
    if (score >= 75) return 'from-blue-500 to-indigo-500 text-blue-500';
    return 'from-amber-500 to-orange-500 text-amber-500';
  };

  return (
    <div className="relative group p-6 rounded-3xl glass-card flex flex-col justify-between h-full border border-slate-200/50 dark:border-slate-800/40">
      
      {/* Upper Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center shadow-inner">
              <CompanyIcon name={project.logo} className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{project.companyName}</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
                <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5">
                  <Calendar className="h-3 w-3" /> {project.timeline}
                </span>
              </div>
            </div>
          </div>

          {/* AI Match Score Badge */}
          {activeRole === 'student' && (
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowExplanation(!showExplanation);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-gradient-to-tr from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs hover:bg-purple-500/20 transition-all cursor-pointer ai-pulse`}
              >
                <Sparkles className="h-3 w-3 animate-spin text-purple-500" />
                <span>{matchInfo.score}% Match</span>
              </button>
            </div>
          )}
        </div>

        {/* AI Popover Rationale */}
        {showExplanation && activeRole === 'student' && (
          <div className="absolute inset-x-4 top-16 bg-white dark:bg-slate-900 border border-purple-500/30 rounded-2xl p-4 shadow-xl z-10 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-purple-500" /> AI Score Analysis
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowExplanation(false); }}
                className="text-slate-400 hover:text-slate-600 text-[10px] font-bold"
              >
                Dismiss
              </button>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-2">
              {matchInfo.reason}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-purple-500 font-bold bg-purple-500/5 p-1.5 rounded-lg border border-purple-500/10">
              <AlertCircle className="h-3 w-3" /> Core Match Factor: Dynamic Skillset Integration
            </div>
          </div>
        )}

        {/* Project Title */}
        <h3 
          onClick={onSelect}
          className="text-base font-bold text-slate-800 dark:text-white leading-snug hover:text-purple-500 dark:hover:text-purple-400 cursor-pointer transition-colors mt-2 mb-2 line-clamp-1"
        >
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans">
          {project.description}
        </p>

        {/* Skills Required */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.requiredSkills.map(skill => {
            const hasSkill = studentProfile?.skills?.includes(skill);
            return (
              <span 
                key={skill} 
                className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium transition-colors ${
                  activeRole === 'student' && hasSkill
                    ? 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 flex items-center gap-0.5'
                    : 'bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/50'
                }`}
              >
                {activeRole === 'student' && hasSkill && <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />}
                {skill}
              </span>
            );
          })}
        </div>
      </div>

      {/* Footer / Budget & Action */}
      <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/30 flex items-center justify-between mt-auto">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Acquisition Budget</span>
          <span className="text-base font-extrabold text-slate-805 dark:text-slate-200">
            {project.budget.toLocaleString()} EGP
          </span>
        </div>

        <button 
          onClick={onSelect}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white dark:hover:text-white transition-all shadow-md group-hover:scale-[1.02]"
        >
          <span>View Specs</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

    </div>
  );
}
