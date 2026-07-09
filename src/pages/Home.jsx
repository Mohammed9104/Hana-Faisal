import React from 'react';
import { ArrowRight, Sparkles, Building2, GraduationCap, Users, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Home({ setActivePage, setActiveRole }) {
  const stats = [
    { number: "65,000 EGP", label: "Avg Project Budget", icon: TrendingUp, color: "text-emerald-500" },
    { number: "92%", label: "Employment Rate", icon: ShieldCheck, color: "text-blue-500" },
    { number: "45+", label: "Partner Universities", icon: GraduationCap, color: "text-purple-500" },
    { number: "250+", label: "Real Corporate Projects", icon: Building2, color: "text-pink-500" }
  ];

  const handleGetStarted = (role) => {
    setActiveRole(role);
    setActivePage(role + '-dashboard');
  };

  return (
    <div className="space-y-24 pb-20 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Small Pill Indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/5 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-purple-500 animate-pulse" />
          <span>Bridging Academic Talents & Industries</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight max-w-4xl tracking-tight">
          Transform Your Education Into <br />
          <span className="text-gradient">Real Work Experience</span> Before Graduation
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
          CareerBridge AI connects Universities, Students, and Companies in a structured ecosystem. Students build graduation solutions to real business problems, and companies purchase successful results or hire the team.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => handleGetStarted('student')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all"
          >
            <span>Join as Student</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => handleGetStarted('company')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl glass-card text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:scale-[1.02] transition-all"
          >
            <span>Partner as Company</span>
            <Building2 className="h-4 w-4 text-purple-500" />
          </button>
        </div>

        {/* Dashboard Simulation Prompt */}
        <p className="text-[11px] text-slate-400 font-semibold bg-purple-500/5 px-4 py-1.5 rounded-full border border-purple-500/10">
          Hackathon Tip: Toggle simulator roles in the navigation bar to preview different dashboard views!
        </p>
      </section>

      {/* Platform Stats Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
                <div className="mx-auto h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mb-3">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">{stat.number}</h3>
                <p className="text-[11px] text-slate-400 font-semibold mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bridging Higher Education and Employment Section */}
      <section className="px-6 max-w-7xl mx-auto py-12 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight">
            Bridging Higher Education and Employment
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Connecting universities, students, and companies to prepare graduates for the future workforce through data-driven alignments, hands-on learning, and direct placement networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strategy 1: Labor Market Intelligence */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs">S1</span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Labor Market Intelligence</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Our AI engine continuously tracks active hiring registers, corporate challenges, and industrial sectors to identify critical engineering gaps and trending careers, helping universities modernize curriculums.
              </p>
              
              {/* Mini-analytics mock data visualization */}
              <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-850 space-y-3 font-sans text-[10px]">
                <span className="font-bold text-slate-700 dark:text-slate-350 block">Market Demand Dynamics (Cairo/Smart Village)</span>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-0.5 text-slate-405 font-semibold">
                      <span>Large Language Models (LLMs)</span>
                      <span className="text-blue-500">+48% Growth</span>
                    </div>
                    <div className="w-full bg-slate-250 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-0.5 text-slate-405 font-semibold">
                      <span>Reactive Frontend Engine</span>
                      <span className="text-purple-500">+22% Growth</span>
                    </div>
                    <div className="w-full bg-slate-250 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AI Engine Synced: Just Now</span>
            </div>
          </div>

          {/* Strategy 2: Practical Learning */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xs">S2</span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Practical Learning</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Students bypass throwaway homework assignments, building verified skills through professional prep paths, hands-on training labs, and sponsored projects that qualify for final graduation credits.
              </p>

              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 space-y-2 text-[10px] font-sans">
                <span className="font-bold text-purple-500 block">Syllabus Preparations:</span>
                <ul className="space-y-1 text-slate-450 list-disc list-inside">
                  <li>Enrolling in prep modules automatically matches skills gaps</li>
                  <li>Coding sandbox projects build real-time IoT and pipeline structures</li>
                  <li>Graduation challenges resolve active corporate bottlenecks</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setActivePage('learning-center')}
              className="w-full py-2.5 rounded-xl border border-purple-500/35 hover:bg-purple-500/10 text-purple-500 font-bold text-xs transition-colors"
            >
              Prepare at the Learning Center
            </button>
          </div>

          {/* Strategy 3: University–Industry Collaboration */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold text-xs">S3</span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">University–Industry Collaboration</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Rather than standard hiring ads, companies post active engineering briefs. Students build prototypes supervised by university deans. Successful outcomes trigger IP acquisition payouts, internship fast-tracks, or employment.
              </p>

              <div className="p-4 rounded-2xl bg-pink-500/5 border border-pink-500/10 grid grid-cols-3 gap-2 text-center text-[10px] font-sans text-slate-400">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">18+</span>
                  Active Sponsors
                </div>
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">34</span>
                  Active Solutions
                </div>
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">84.5%</span>
                  Hiring Ratio
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActivePage('marketplace')}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-purple-650 dark:hover:bg-purple-500 hover:text-white font-bold text-xs transition-colors shadow-md"
            >
              Browse Sponsoring Projects
            </button>
          </div>

          {/* Strategy 4: Soft Skills Development */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">S4</span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Soft Skills Development</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                Workplace success demands more than syntax. Sponsoring briefs integrate indicators measuring collaboration, critical troubleshooting, and agile timeline compliance.
              </p>

              {/* soft skills progress widgets */}
              <div className="grid grid-cols-2 gap-3 text-[9px] font-sans text-slate-450">
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Critical Thinking</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Problem Solving</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Teamwork</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Adaptability</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-between border-t border-slate-200/10 pt-3">
              <span>Sponsor Evaluated Syllabus</span>
              <span className="text-emerald-500 font-bold">★ Verified Standard</span>
            </div>
          </div>

        </div>
      </section>

      {/* Core Concept Section */}
      <section className="px-6 max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight">
              An Academic Collaboration <br />
              <span className="text-gradient">Ecosystem</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
              Traditional education uses abstract examples, and companies complain that graduates lack practical skills. CareerBridge AI removes this disconnect completely.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 mt-0.5"><CheckCircle2 className="h-4 w-4" /></div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Real Project-based Curriculums</h4>
                  <p className="text-[11px] text-slate-400">Class assignments are actual business problems submitted by enterprises.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 mt-0.5"><CheckCircle2 className="h-4 w-4" /></div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Academic Supervision</h4>
                  <p className="text-[11px] text-slate-400">University professors oversee implementations, guaranteeing top educational standards.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 mt-0.5"><CheckCircle2 className="h-4 w-4" /></div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Double Incentive Output</h4>
                  <p className="text-[11px] text-slate-400">Companies acquire tested web/data solutions; graduates receive verified jobs or rewards.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Relationship Diagram - Modified to show the 4 Strategies flow */}
          <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden">
            <h3 className="text-sm font-bold text-center text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider font-sans">
              CareerBridge AI Core Framework
            </h3>
            
            <div className="space-y-6 relative z-10 text-xs font-sans">
              
              {/* Step 1: Labor Market Intelligence */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="px-5 py-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold shadow-lg border border-blue-500/20 text-center min-w-[200px]">
                    <span className="block text-[9px] text-blue-200 uppercase tracking-widest font-semibold mb-0.5">Pillar 1</span>
                    <span className="text-xs">Labor Market Intelligence</span>
                  </div>
                </div>
                <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-700 mx-auto relative flex items-center justify-center">
                  <span className="absolute -bottom-1 text-slate-400 dark:text-slate-650">▼</span>
                </div>
                <div className="text-center">
                  <span className="px-4 py-2 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[11px] inline-block font-sans">
                    يعرف الطالب والجامعة احتياجات السوق
                  </span>
                </div>
              </div>

              {/* Connector line */}
              <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-800 mx-auto relative flex items-center justify-center">
                <span className="absolute -bottom-1 text-slate-300 dark:text-slate-800">▼</span>
              </div>

              {/* Step 2: Practical Learning */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="px-5 py-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-bold shadow-lg border border-purple-500/20 text-center min-w-[200px]">
                    <span className="block text-[9px] text-purple-205 uppercase tracking-widest font-semibold mb-0.5">Pillar 2</span>
                    <span className="text-xs">Practical Learning</span>
                  </div>
                </div>
                <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-700 mx-auto relative flex items-center justify-center">
                  <span className="absolute -bottom-1 text-slate-400 dark:text-slate-650">▼</span>
                </div>
                <div className="text-center">
                  <span className="px-4 py-2 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[11px] inline-block">
                    Courses + Training + Projects
                  </span>
                </div>
              </div>

              {/* Connector line */}
              <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-800 mx-auto relative flex items-center justify-center">
                <span className="absolute -bottom-1 text-slate-300 dark:text-slate-800">▼</span>
              </div>

              {/* Step 3: University Industry Collaboration */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="px-5 py-3 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white font-bold shadow-lg border border-pink-500/20 text-center min-w-[200px]">
                    <span className="block text-[9px] text-pink-200 uppercase tracking-widest font-semibold mb-0.5">Pillar 3</span>
                    <span className="text-xs">University–Industry Collaboration</span>
                  </div>
                </div>
                <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-700 mx-auto relative flex items-center justify-center">
                  <span className="absolute -bottom-1 text-slate-400 dark:text-slate-650">▼</span>
                </div>
                <div className="text-center space-y-1.5 max-w-sm mx-auto">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="px-2 py-1.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-550 dark:text-pink-400 font-semibold text-[9.5px]">
                      Companies post projects
                    </span>
                    <span className="px-2 py-1.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-555 dark:text-pink-400 font-semibold text-[9.5px]">
                      Students build solutions
                    </span>
                    <span className="px-2 py-1.5 rounded-lg bg-pink-500/5 border border-pink-500/10 text-pink-555 dark:text-pink-400 font-semibold text-[9.5px]">
                      Universities supervise
                    </span>
                  </div>
                </div>
              </div>

              {/* Connector line */}
              <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-800 mx-auto relative flex items-center justify-center">
                <span className="absolute -bottom-1 text-slate-300 dark:text-slate-800">▼</span>
              </div>

              {/* Step 4: Soft Skills */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="px-5 py-3 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold shadow-lg border border-emerald-500/20 text-center min-w-[200px]">
                    <span className="block text-[9px] text-emerald-200 uppercase tracking-widest font-semibold mb-0.5">Pillar 4</span>
                    <span className="text-xs">Soft Skills</span>
                  </div>
                </div>
                <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-700 mx-auto relative flex items-center justify-center">
                  <span className="absolute -bottom-1 text-slate-400 dark:text-slate-650">▼</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {["Communication", "Leadership", "Teamwork", "Problem Solving"].map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Background design elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"></div>
          </div>

        </div>
      </section>

      {/* Role Tabs Segment */}
      <section className="px-6 max-w-7xl mx-auto space-y-12">
        <h3 className="text-center text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
          Tailored Workspaces for Every Participant
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Students Card */}
          <div className="p-8 rounded-3xl glass-card border border-blue-500/20 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">For Students</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Tackle projects matching your university course requirements. Elevate your portfolio, learn via custom AI course paths, and unlock internship positions.
              </p>
            </div>
            <button 
              onClick={() => handleGetStarted('student')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              Enter Student Hub
            </button>
          </div>

          {/* Companies Card */}
          <div className="p-8 rounded-3xl glass-card border border-purple-500/20 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                <Building2 className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">For Companies</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Outsource prototyping and core testing to universities. Evaluate student capabilities live and acquire project copyrights or initiate employment offers.
              </p>
            </div>
            <button 
              onClick={() => handleGetStarted('company')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              Enter Company Hub
            </button>
          </div>

          {/* Universities Card */}
          <div className="p-8 rounded-3xl glass-card border border-pink-500/20 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">For Universities</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Track internship conversion levels and graduates' readiness index in real-time. Link academic modules to industrial demands to boost graduate recruitment.
              </p>
            </div>
            <button 
              onClick={() => handleGetStarted('university')}
              className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              Enter University Hub
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
