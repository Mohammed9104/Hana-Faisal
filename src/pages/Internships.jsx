import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Calendar, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { CompanyIcon } from '../components/IconTranslator';
import confetti from 'canvas-confetti';

export default function Internships({ internships, activeRole, studentProfile }) {
  const [appliedInternships, setAppliedInternships] = useState([]);

  const handleApply = (internshipId, roleTitle, companyName) => {
    if (activeRole !== 'student') {
      alert("Please simulate the Student role in the navigation bar to submit internship applications.");
      return;
    }
    
    if (appliedInternships.includes(internshipId)) return;
    
    setAppliedInternships(prev => [...prev, internshipId]);

    // Trigger celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="border-b border-slate-200/40 dark:border-slate-800/40 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Internships Hub</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
          Direct placement channels offered by sponsoring companies. Standard academic performance and completed platforms projects qualify you instantly.
        </p>
      </div>

      {/* Info Warning for non-students */}
      {activeRole !== 'student' && (
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 font-medium max-w-2xl">
          Note: You are currently viewing as Guest/Admin. Switch your simulator role to **Student** in the navigation header to apply for these internships.
        </div>
      )}

      {/* Internships List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internships.map(intern => {
          const hasApplied = appliedInternships.includes(intern.id);
          
          return (
            <div key={intern.id} className="p-6 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between h-full space-y-4">
              
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center shadow-inner">
                      <CompanyIcon name={intern.logo} className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{intern.companyName}</h4>
                      <h3 className="text-base font-bold text-slate-800 dark:text-white mt-0.5">{intern.role}</h3>
                    </div>
                  </div>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-slate-400">
                  <span className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-lg">
                    <MapPin className="h-3 w-3" /> {intern.location}
                  </span>
                  <span className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="h-3 w-3" /> {intern.salary}
                  </span>
                  <span className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-lg">
                    <Calendar className="h-3 w-3" /> {intern.duration}
                  </span>
                </div>

                {/* Job Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                  {intern.description}
                </p>

                {/* Required Skills */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Required Foundations:</span>
                  <div className="flex flex-wrap gap-1">
                    {intern.skillsRequired.map(skill => (
                      <span key={skill} className="text-[9px] bg-purple-500/5 text-purple-600 dark:text-purple-400 border border-purple-500/10 px-2 py-0.5 rounded-lg font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Action */}
              <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/30 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5">
                  <Sparkles className="h-3 w-3 text-purple-500" /> Fast-Track Eligibility Available
                </span>

                {hasApplied ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl animate-in zoom-in-50 duration-200">
                    <CheckCircle2 className="h-4 w-4" /> Applied
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(intern.id, intern.role, intern.companyName)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <span>Quick Apply</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
