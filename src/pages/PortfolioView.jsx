import React from 'react';
import { User, GraduationCap, Code2, Award, Briefcase, ExternalLink, Mail, MapPin } from 'lucide-react';
import { InitialsAvatar } from '../components/IconTranslator';

export default function PortfolioView({ studentProfile }) {
  const profile = studentProfile || {
    name: "Alex Rivera",
    avatar: "👨‍💻",
    university: "Apex Science University",
    degree: "B.S. in Software Engineering (Senior)",
    gpa: "3.85 / 4.00",
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Python", "Git"],
    completedProjects: [],
    certificates: []
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-300">
      
      {/* Cover Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-12 text-white shadow-xl">
        
        {/* Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <InitialsAvatar name={profile.name} className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-3xl font-bold font-sans" />
          
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-extrabold">{profile.name}</h1>
            <p className="text-sm text-purple-200 font-medium flex items-center justify-center md:justify-start gap-1">
              <GraduationCap className="h-4.5 w-4.5 text-purple-300" /> {profile.degree}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/80 pt-1">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> San Francisco, CA</span>
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> alex.rivera@apex.edu</span>
              <span className="bg-white/25 px-2 py-0.5 rounded-lg font-bold">GPA: {profile.gpa}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
        
        {/* Left Skill Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Code2 className="h-4 w-4 text-purple-500" /> Core Skillsets
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map(skill => (
                <span key={skill} className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-xl text-slate-700 dark:text-slate-300 font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education Info */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-500" /> Education
            </h3>
            <div className="space-y-3 font-sans">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white">{profile.university}</h4>
                <p className="text-[10px] text-slate-400">Class of 2026</p>
                <p className="text-slate-500 mt-1">B.S. Software Engineering (GPA: {profile.gpa})</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Project Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sponsoring / Completed Projects */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-emerald-500" /> Corporate Sponsor Solutions
            </h3>
            
            {profile.completedProjects.length > 0 ? (
              <div className="space-y-6">
                {profile.completedProjects.map((p, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-850 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">{p.title}</h4>
                      {p.grade && <span className="bg-emerald-500/10 text-emerald-500 font-extrabold px-2.5 py-0.5 rounded-lg">Grade: {p.grade}</span>}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-sans leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.skillsUsed.map(s => (
                        <span key={s} className="bg-purple-500/5 text-purple-600 dark:text-purple-400 border border-purple-500/10 px-2 py-0.5 rounded-lg text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 font-sans italic text-center py-6">No completed sponsored collaborations published yet.</p>
            )}
          </div>

          {/* Certificates */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-pink-500" /> Industry Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.certificates.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-850 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-850 dark:text-slate-200">{cert.title}</h4>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">Issued by {cert.issuedBy}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{cert.issueDate.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
