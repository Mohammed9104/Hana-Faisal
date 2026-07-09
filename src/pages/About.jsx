import React from 'react';
import { Target, Compass, Heart, Users, Award, ShieldAlert } from 'lucide-react';

export default function About() {
  const values = [
    { title: "Bridging the Gap", desc: "Removing the friction between academic theory and workplace practice.", icon: Compass, color: "text-blue-500" },
    { title: "Empowerment First", desc: "Allowing students to build portfolios and earn credits through real compensation.", icon: Award, color: "text-purple-500" },
    { title: "Quality Governance", desc: "University professor supervisor loops ensure every submission matches rigorous academic requirements.", icon: Target, color: "text-pink-500" },
  ];

  const team = [
    { name: "Dr. Evelyn Foster", role: "Dean of Computer Science & Co-founder", avatar: "👩‍🏫", bio: "Over 15 years in higher education research; passionate about scaling university project outcomes." },
    { name: "Marcus Rivera", role: "VP of Product Development", avatar: "👨‍💻", bio: "Former Tech Lead at major tech systems; focuses on API and SaaS connectivity models." },
    { name: "Sylvia Chen", role: "Chief of Academic Relations", avatar: "👩‍💼", bio: "Establishes global partnerships between corporate sponsors and state universities." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-20 animate-in fade-in duration-300">
      
      {/* Intro Mission */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Our Mission</h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
          CareerBridge AI was born at the intersection of collegiate study and professional enterprise. Our mission is to transform traditional education systems, shifting students from abstract homework assignments to sponsored real-world product creations.
        </p>
      </section>

      {/* Grid Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((val, idx) => {
          const Icon = val.icon;
          return (
            <div key={idx} className="p-8 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center mb-6">
                <Icon className={`h-5 w-5 ${val.color}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{val.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{val.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Platform Diagram Overview */}
      <section className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white border border-purple-500/20 relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold">The Bridge Lifecycle</h2>
          <p className="text-xs text-slate-400">
            A comprehensive overview showing how academic projects evolve into corporate acquisitions on our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-center relative z-10 pt-4">
          
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/50 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mx-auto">1</div>
            <h4 className="font-bold text-slate-200">Company Postings</h4>
            <p className="text-slate-400 text-[11px]">Corporations submit real business problems with specific budget limits and timelines.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/50 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mx-auto">2</div>
            <h4 className="font-bold text-slate-200">Academic Review</h4>
            <p className="text-slate-400 text-[11px]">University supervisors audit proposals, matching them to course syllabi and learning goals.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/50 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold mx-auto">3</div>
            <h4 className="font-bold text-slate-200">Student Solution</h4>
            <p className="text-slate-400 text-[11px]">Students apply in teams or individually, executing development as part of coursework.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/50 space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mx-auto">4</div>
            <h4 className="font-bold text-slate-200">Hiring & IP Transfer</h4>
            <p className="text-slate-400 text-[11px]">Companies purchase the IP rights of approved code, extending contracts or internship opportunities.</p>
          </div>

        </div>
      </section>

      {/* Team Bios */}
      <section className="space-y-12">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((t, idx) => (
            <div key={idx} className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center space-y-4">
              <div className="h-16 w-16 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-purple-500/20 rounded-full flex items-center justify-center text-3xl mx-auto">
                {t.avatar}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white">{t.name}</h4>
                <p className="text-[10px] text-purple-500 font-semibold uppercase tracking-wider">{t.role}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
