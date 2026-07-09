import React, { useState } from 'react';
import { User, Building2, GraduationCap, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('student');

  const content = {
    student: {
      title: "Elevate Your Career Before Graduation",
      subtitle: "Stop submitting throwaway assignments. Solve actual engineering problems for global companies.",
      steps: [
        { title: "Register & Connect Portfolio", desc: "Build your student profile, upload past coding files, and list current engineering skills." },
        { title: "Select a Sponsored Challenge", desc: "Browse open corporate challenges. AI matching suggests projects that fit your classes." },
        { title: "Professor Supervised Development", desc: "Form a team, nominate a university supervisor, and build the solution as your credit project." },
        { title: "Submit & Claim Hiring Opportunities", desc: "Upload code files. Companies review, purchase, or issue direct job/internship letters." }
      ],
      color: "from-blue-600 to-indigo-600",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    company: {
      title: "Ingest Validated Prototypes from Top Universities",
      subtitle: "Connect directly with supervised talent and acquire production-ready codebase options.",
      steps: [
        { title: "Publish Real Project Demands", desc: "Post actual backend, frontend, or data challenges. Set project budgets, constraints, and skills." },
        { title: "Review Screened Applicants", desc: "Evaluate student applications. Each application includes university supervisor details." },
        { title: "Monitor Progress Live", desc: "Review academic milestone check-ins, offering direct engineering feedback." },
        { title: "Approve, Buy, or Recruited", desc: "Acquire the IP, sign internship contracts, or offer direct employment packages." }
      ],
      color: "from-purple-600 to-violet-600",
      textColor: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    university: {
      title: "Bridge Academics with Modern Enterprises",
      subtitle: "Boost academic value, track student employment success, and curate corporate partners.",
      steps: [
        { title: "Approve Sponsoring Partnerships", desc: "Verify company compliance, validating project scope for academic credit." },
        { title: "Supervise Submissions", desc: "Oversee milestones, review codebase architectures, and coordinate grading reports." },
        { title: "Analyze Employability Indexes", desc: "Access dashboards to track which technologies are highly sought by partner companies." },
        { title: "Promote Research Alliances", desc: "Scale research initiatives, securing sponsored lab funds and hardware grants." }
      ],
      color: "from-pink-600 to-rose-600",
      textColor: "text-pink-500",
      bgColor: "bg-pink-500/10"
    }
  };

  const current = content[activeTab];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">How It Works</h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans">
          CareerBridge AI coordinates students, corporate managers, and professors to ensure educational efforts align directly with market requirements.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center p-1 rounded-2xl bg-slate-200/50 dark:bg-slate-900/60 max-w-lg mx-auto border border-slate-200/20">
        <button
          onClick={() => setActiveTab('student')}
          className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'student' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Students</span>
        </button>
        
        <button
          onClick={() => setActiveTab('company')}
          className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'company' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Companies</span>
        </button>

        <button
          onClick={() => setActiveTab('university')}
          className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'university' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Universities</span>
        </button>
      </div>

      {/* Step Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Intro Text */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`inline-flex p-3 rounded-2xl ${current.bgColor} ${current.textColor} font-extrabold text-sm mb-2`}>
            {activeTab === 'student' ? <User className="h-6 w-6" /> : activeTab === 'company' ? <Building2 className="h-6 w-6" /> : <GraduationCap className="h-6 w-6" />}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white leading-tight">
            {current.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {current.subtitle}
          </p>
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              All transactions, deliverables, and evaluations are managed securely, protecting intellectual copyrights while certifying student achievements.
            </p>
          </div>
        </div>

        {/* Right Stepper Timeline */}
        <div className="lg:col-span-7 space-y-6 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

          {current.steps.map((step, idx) => (
            <div key={idx} className="flex gap-6 relative z-10">
              <div className={`h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center font-extrabold text-xs text-slate-700 dark:text-slate-300 shrink-0 group-hover:border-purple-500`}>
                {idx + 1}
              </div>
              <div className="p-5 rounded-2xl glass-card border border-slate-200/40 dark:border-slate-800/40 flex-1 hover:scale-[1.01] transition-transform duration-200">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1">{step.title}</h4>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
