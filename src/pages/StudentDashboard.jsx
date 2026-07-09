import React, { useState } from 'react';
import { Sparkles, BookOpen, Layers, Award, Briefcase, Plus, Send, CheckCircle2, AlertCircle, FileText, Bell } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import CourseCard from '../components/CourseCard';
import confetti from 'canvas-confetti';
import { CompanyIcon, InitialsAvatar } from '../components/IconTranslator';

export default function StudentDashboard({ 
  studentProfile, 
  setStudentProfile,
  projects, 
  setProjects,
  courses, 
  internships = [],
  onEnrollCourse, 
  onSelectProject, 
  onSelectCourse 
}) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedProjToSubmit, setSelectedProjToSubmit] = useState(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [portfolioTitle, setPortfolioTitle] = useState('');

  // Sorter logic: Only show projects recommended for this student (AI Score >= 75)
  const recommendedProjects = projects.filter(p => {
    const score = p.matches?.[studentProfile.name]?.score || 0;
    return score >= 75 && p.status === 'Open';
  });

  // Recommended Courses (not enrolled yet)
  const enrolledIds = studentProfile.enrolledCourses || [];
  const recommendedCourses = courses.filter(c => !enrolledIds.includes(c.id)).slice(0, 3);

  // Active / Current Projects (simulated projects student is team member of)
  const currentProjects = projects.filter(p => p.status === 'In Progress' && p.studentTeam?.includes(studentProfile.name));

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    if (!portfolioTitle) return;
    
    const newProj = {
      title: portfolioTitle,
      description: portfolioLink || "Created through dashboard submission.",
      skillsUsed: ["React", "JavaScript"],
      grade: "A"
    };

    setStudentProfile(prev => ({
      ...prev,
      completedProjects: [newProj, ...prev.completedProjects],
      // increase readiness score
      careerReadinessScore: Math.min(100, prev.careerReadinessScore + 2)
    }));

    setPortfolioTitle('');
    setPortfolioLink('');
    
    // Confetti
    confetti({ particleCount: 30, spread: 40 });
  };

  const handleOpenSubmit = (proj) => {
    setSelectedProjToSubmit(proj);
    setShowSubmitModal(true);
  };

  const handleSubmitSolution = (e) => {
    e.preventDefault();
    if (!selectedProjToSubmit) return;

    // Update project state in local storage / parent state to Completed
    setProjects(prev => prev.map(p => {
      if (p.id === selectedProjToSubmit.id) {
        return { 
          ...p, 
          status: 'Completed',
          submissionNotes: submissionNotes
        };
      }
      return p;
    }));

    // Add completion notification
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: 'Project Solution Submitted',
      message: `Your final files for '${selectedProjToSubmit.title}' have been sent to NexaTech Solutions for final review and payout confirmation.`,
      time: 'Just now',
      read: false
    };

    setStudentProfile(prev => ({
      ...prev,
      notifications: [newNotif, ...prev.notifications],
      careerReadinessScore: Math.min(100, prev.careerReadinessScore + 10)
    }));

    setShowSubmitModal(false);
    setSubmissionNotes('');
    
    // Big Confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.7 }
    });
  };

  const markAllRead = () => {
    setStudentProfile(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true }))
    }));
  };

  // Readiness color helper
  const getReadinessColor = (score) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 70) return 'text-purple-500';
    return 'text-blue-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Upper Profile Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 gap-6">
        <div className="flex items-center gap-4 text-xs">
          <InitialsAvatar name={studentProfile.name} className="h-16 w-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold font-sans shadow-md" />
          <div>
            <h2 className="text-xl font-extrabold text-slate-850 dark:text-white">Welcome back, {studentProfile.name}!</h2>
            <p className="text-purple-500 font-semibold mt-0.5">{studentProfile.university}</p>
            <p className="text-slate-400 font-sans mt-0.5">{studentProfile.degree}</p>
          </div>
        </div>

        {/* Career Readiness Score - Gauge card */}
        <div className="flex items-center gap-4 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 p-4 rounded-2xl">
          <div className="relative h-14 w-14 flex items-center justify-center">
            {/* SVG Radial Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-purple-500 transition-all duration-1000"
                strokeDasharray={`${studentProfile.careerReadinessScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-800 dark:text-white">{studentProfile.careerReadinessScore}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Career Readiness Score</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {studentProfile.careerReadinessScore >= 80 ? "🚀 High Employability" : "📈 Building Experience"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
        
        {/* Left Side: Current Projects & Portfolio (Col-span 8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Skill Gap Analysis Card */}
          <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-purple-500 animate-pulse" /> AI Skill Gap Analysis
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
              Our labor market intelligence engine identifies missing competencies by comparing your profile with active sponsored briefs. Close these gaps to unlock high-matching projects.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {studentProfile.missingSkills?.map(skill => {
                // Find matching course
                const matchingCourse = courses.find(c => 
                  c.title.toLowerCase().includes(skill.toLowerCase()) || 
                  c.description.toLowerCase().includes(skill.toLowerCase())
                ) || courses[0];
                const isEnrolled = studentProfile.enrolledCourses?.includes(matchingCourse.id);

                return (
                  <div key={skill} className="p-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-500/5 px-2 py-0.5 rounded-lg border border-rose-500/10">Missing Skill</span>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 mt-2 text-xs">{skill}</h4>
                      <p className="text-[9.5px] text-slate-450 leading-tight font-sans mt-1">Recommended prep: {matchingCourse.title}</p>
                    </div>

                    {isEnrolled ? (
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 py-1 text-center rounded-lg block">In Training</span>
                    ) : (
                      <button
                        onClick={() => onEnrollCourse(matchingCourse.id)}
                        className="w-full py-1.5 rounded-lg bg-purple-650 hover:bg-purple-600 text-white text-[10px] font-bold transition-colors"
                      >
                        Enroll Course
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current / Active Projects */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Briefcase className="h-4.5 w-4.5 text-blue-500" /> Active Sponsored Projects
            </h3>

            {currentProjects.length > 0 ? (
              <div className="space-y-4">
                {currentProjects.map(proj => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <CompanyIcon name={proj.logo} className="h-5 w-5 text-purple-500 shrink-0" />
                        <h4 className="font-bold text-slate-800 dark:text-white">{proj.title}</h4>
                      </div>
                      <p className="text-slate-500 mt-1 font-sans">Sponsored by: <span className="font-semibold">{proj.companyName}</span></p>
                      <p className="text-[10px] text-slate-400 font-sans mt-0.5">Academic Supervisor: <span className="font-semibold text-purple-400">{proj.supervisor}</span></p>
                    </div>

                    <button
                      onClick={() => handleOpenSubmit(proj)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-650 hover:bg-purple-600 text-white font-bold transition-colors shadow-md"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Solution</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-100/30 dark:bg-slate-900/20 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl space-y-3">
                <AlertCircle className="h-6 w-6 text-slate-400 mx-auto" />
                <p className="text-slate-400 font-sans">You are not currently leading any active corporate sponsored projects.</p>
                <p className="text-[10px] text-slate-500">Apply for a project in the Marketplace to begin!</p>
              </div>
            )}
          </div>

          {/* AI Recommended Projects */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-purple-500" /> AI-Recommended Sponsor Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedProjects.slice(0, 2).map(proj => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  activeRole="student"
                  studentProfile={studentProfile}
                  onSelect={() => onSelectProject(proj)}
                />
              ))}
            </div>
          </div>

          {/* AI Recommended Courses */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-pink-500" /> AI-Suggested Prep Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCourses.slice(0, 2).map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={false}
                  onEnroll={() => onEnrollCourse(course.id)}
                  onSelect={() => onSelectCourse(course)}
                />
              ))}
            </div>
          </div>

          {/* AI Recommended Internships */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-805 dark:text-white flex items-center gap-2">
              <Briefcase className="h-4.5 w-4.5 text-blue-500" /> AI-Recommended Internships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internships.slice(0, 2).map(intern => (
                <div key={intern.id} className="p-5 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <CompanyIcon name={intern.logo} className="h-5 w-5 text-purple-500 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-white text-xs">{intern.role}</h4>
                          <p className="text-[9px] text-slate-400 font-sans">{intern.companyName}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">{intern.salary}</span>
                    </div>
                    <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-relaxed font-sans">{intern.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/20">
                    <span className="text-[9px] text-purple-400 font-bold">Match Score: 90%</span>
                    <button 
                      onClick={() => alert(`Applied for ${intern.role} at ${intern.companyName}!`)}
                      className="px-3 py-1 bg-purple-650 hover:bg-purple-600 text-white rounded-lg text-[9px] font-bold"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Notifications & Portfolio Manager (Col-span 4) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Live Notification Center */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/10 pb-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Bell className="h-4.5 w-4.5 text-amber-500" /> Live Feed
              </h3>
              <button onClick={markAllRead} className="text-[10px] text-slate-400 hover:text-purple-500 font-bold">
                Mark Read
              </button>
            </div>
            
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {studentProfile.notifications?.map(notif => (
                <div key={notif.id} className={`p-3 rounded-2xl font-sans transition-colors ${notif.read ? 'bg-slate-100/30 dark:bg-slate-900/10' : 'bg-purple-500/5 border border-purple-500/10'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{notif.title}</h4>
                    <span className="text-[9px] text-slate-400">{notif.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills Progress Card */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-pink-500" /> Soft Skills Progress
            </h3>
            <p className="text-[10px] text-slate-450 font-sans leading-relaxed">
              Employers measure core behaviors through milestone reviews. Active course completion raises score values.
            </p>
            
            <div className="space-y-3 pt-2 font-sans text-[10px]">
              {studentProfile.softSkills?.map(soft => (
                <div key={soft.name} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-650 dark:text-slate-350">
                    <span>{soft.name}</span>
                    <span>{soft.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${soft.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Portfolio uploader */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-purple-500" /> Portfolio Manager
            </h3>
            
            <form onSubmit={handleAddPortfolio} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Project Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Distributed Database API"
                  value={portfolioTitle}
                  onChange={(e) => setPortfolioTitle(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-slate-800 dark:text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Repository Link</label>
                <input 
                  type="text" 
                  placeholder="github.com/alexrivera/db-api"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-slate-800 dark:text-white outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2 rounded-xl bg-purple-650 hover:bg-purple-600 text-white font-bold flex items-center justify-center gap-1 shadow-md transition-colors"
              >
                <Plus className="h-4 w-4" /> Add to Portfolio
              </button>
            </form>

            {/* List of Portfolio Works */}
            <div className="border-t border-slate-200/10 pt-4 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Your Publications:</span>
              {studentProfile.completedProjects.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{p.title}</h4>
                    <p className="text-[9px] text-slate-450 truncate max-w-[150px] font-sans">{p.description}</p>
                  </div>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-500 font-bold px-1.5 py-0.5 rounded">Verified</span>
                </div>
              ))}
            </div>
          </div>

          {/* Earned Certs */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-pink-500" /> Certificates ({studentProfile.certificates?.length})
            </h3>
            <div className="space-y-2">
              {studentProfile.certificates?.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30">
                  <div className="h-7 w-7 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-850 dark:text-slate-200 leading-tight">{cert.title}</h4>
                    <p className="text-[9px] text-slate-400 font-sans">By {cert.issuedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Submission Modal */}
      {showSubmitModal && selectedProjToSubmit && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl glass-card border border-purple-500/35 p-6 space-y-6 text-xs relative animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Submit Project Deliverables</h3>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">Sponsor: {selectedProjToSubmit.companyName}</p>
              </div>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitSolution} className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/15">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Challenge: {selectedProjToSubmit.title}</h4>
                <p className="text-[10px] text-slate-450 leading-relaxed font-sans">{selectedProjToSubmit.businessProblem}</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider">Submission Link (GitHub/Zip URL)</label>
                <input 
                  type="text" 
                  required
                  placeholder="https://github.com/alexrivera/feedback-pipeline-solution"
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider">Engineering Summary Notes</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Detail the technical stack, database models, testing coverage, and deployment URLs..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl outline-none"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-505 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-650 hover:bg-purple-600 text-white font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="h-4.5 w-4.5" />
                  <span>Transmit Solution</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
