import React, { useState, useMemo } from 'react';
import { Plus, Briefcase, Users, DollarSign, CheckCircle2, XCircle, FileText, Send, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { CompanyIcon } from '../components/IconTranslator';
import confetti from 'canvas-confetti';

export default function CompanyDashboard({ 
  projects, 
  setProjects, 
  studentProfile,
  setStudentProfile,
  teamRecommendations = []
}) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [newTimeline, setNewTimeline] = useState('8 Weeks');
  const [newDifficulty, setNewDifficulty] = useState('Intermediate');
  const [newSkills, setNewSkills] = useState('React, Node.js');

  const [selectedSubToReview, setSelectedSubToReview] = useState(null);

  // Compute platform stats
  const postedProjects = projects.filter(p => p.companyName === "NexaTech Solutions");
  
  const stats = useMemo(() => {
    let budgetSpent = 0;
    let activeDevs = 0;
    let activeProjects = 0;
    
    postedProjects.forEach(p => {
      if (p.status === 'Purchased') budgetSpent += p.budget;
      if (p.status === 'In Progress') {
        activeDevs += p.studentTeam ? p.studentTeam.split(',').length : 1;
        activeProjects++;
      }
    });

    return { budgetSpent, activeDevs, activeProjects, totalPosted: postedProjects.length };
  }, [postedProjects]);

  // Applicants simulator: NexaTech projects with pending applicants
  const pendingApplicants = [
    {
      id: "app-1",
      projId: "proj-1",
      projTitle: "AI Sentiment Pipeline",
      studentName: studentProfile.name,
      studentDegree: studentProfile.degree,
      studentSkills: studentProfile.skills.slice(0, 5),
      matchScore: 94,
      supervisor: "Dr. Evelyn Foster"
    }
  ];

  // Projects awaiting corporate review (status is Completed)
  const submissionsForReview = projects.filter(p => p.status === 'Completed' && p.companyName === "NexaTech Solutions");

  // Handle posting a new project challenge
  const handlePostProject = (e) => {
    e.preventDefault();
    if (!newTitle || !newBudget) return;

    const newProject = {
      id: 'proj-' + Date.now(),
      companyId: "co-1",
      companyName: "NexaTech Solutions",
      logo: "⚡",
      title: newTitle,
      description: newDesc,
      businessProblem: newProblem,
      requiredSkills: newSkills.split(',').map(s => s.trim()),
      budget: Number(newBudget),
      timeline: newTimeline,
      difficulty: newDifficulty,
      status: 'Open',
      applicantsCount: 0,
      matches: {
        [studentProfile.name]: {
          score: 85,
          reason: "You possess core React and Frontend capabilities that match our engineering scopes. Adding backend databases makes it ideal."
        }
      }
    };

    setProjects(prev => [newProject, ...prev]);
    setShowPostModal(false);

    // Reset fields
    setNewTitle('');
    setNewDesc('');
    setNewProblem('');
    setNewBudget('');
    
    confetti({ particleCount: 50, spread: 60 });
  };

  // Approve a student application to begin project
  const handleApproveApplicant = (app) => {
    // Change project status from Open to In Progress
    setProjects(prev => prev.map(p => {
      if (p.id === app.projId) {
        return {
          ...p,
          status: 'In Progress',
          studentTeam: app.studentName,
          supervisor: app.supervisor
        };
      }
      return p;
    }));

    // Notify student
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: 'Project Application Approved!',
      message: `NexaTech Solutions approved your application for '${app.projTitle}'. Dr. Evelyn Foster is registered as your supervisor. Begin your work modules.`,
      time: 'Just now',
      read: false
    };

    setStudentProfile(prev => ({
      ...prev,
      notifications: [newNotif, ...prev.notifications]
    }));

    confetti({ particleCount: 30, spread: 40 });
  };

  // Buy project solution
  const handlePurchaseSolution = (proj) => {
    // Mark status as Purchased
    setProjects(prev => prev.map(p => {
      if (p.id === proj.id) {
        return { ...p, status: 'Purchased' };
      }
      return p;
    }));

    // Add completion entry to student portfolio!
    const portfolioEntry = {
      title: proj.title,
      description: `Completed corporate challenge sponsored by NexaTech Solutions. Developed full sentiment processing client and pipeline structures.`,
      skillsUsed: proj.requiredSkills,
      grade: "A+"
    };

    // Notify student of purchase
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: '🎉 Project Purchased!',
      message: `NexaTech Solutions officially approved and purchased your final solution for '${proj.title}'. Sponsorship fund of EGP ${proj.budget.toLocaleString()} has been transferred.`,
      time: 'Just now',
      read: false
    };

    setStudentProfile(prev => ({
      ...prev,
      completedProjects: [portfolioEntry, ...prev.completedProjects],
      notifications: [newNotif, ...prev.notifications],
      careerReadinessScore: Math.min(100, prev.careerReadinessScore + 12)
    }));

    setSelectedSubToReview(null);

    // Huge celebration
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  // Issue Internship or Job offer
  const handleOfferJob = (proj, offerType) => {
    const offerMsg = offerType === 'Internship' 
      ? `NexaTech Solutions extended a 3-month AI Systems Internship Offer starting next month, with an EGP 12,500/mo stipend.`
      : `NexaTech Solutions extended a full-time Software Engineer Placement Offer starting upon graduation, with an EGP 400,000 base salary!`;

    const newNotif = {
      id: 'notif-' + Date.now(),
      title: `${offerType} Offer Received!`,
      message: `${offerMsg} Review placement conditions and sign the contract details inside the dashboard files.`,
      time: 'Just now',
      read: false
    };

    // Add to certificates or notifications
    setStudentProfile(prev => ({
      ...prev,
      notifications: [newNotif, ...prev.notifications],
      careerReadinessScore: Math.min(100, prev.careerReadinessScore + 8)
    }));

    alert(`${offerType} contract details dispatched to Student profile (${studentProfile.name})!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/40 dark:border-slate-800/40 pb-6">
        <div className="flex items-center gap-3 text-xs">
          <div className="h-14 w-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shadow-inner border border-purple-500/20">
            <CompanyIcon name="NexaTech" className="h-7 w-7 text-purple-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-850 dark:text-white">NexaTech Solutions</h1>
            <p className="text-purple-500 font-semibold mt-0.5">Sponsor Hub: Gold Partner Level</p>
            <p className="text-slate-400 font-sans mt-0.5">Cloud Services & Enterprise Machine Learning Models</p>
          </div>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          <span>Post Sponsor Challenge</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
        <div className="p-5 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
          <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
            <Briefcase className="h-4.5 w-4.5 text-purple-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{stats.totalPosted}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Challenges Posted</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
          <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
            <Users className="h-4.5 w-4.5 text-blue-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{stats.activeDevs}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Active Developers</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
          <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
            <TrendingUp className="h-4.5 w-4.5 text-pink-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{stats.activeProjects}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Active Collations</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
          <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
            <TrendingUp className="h-4.5 w-4.5 text-pink-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{stats.budgetSpent.toLocaleString()} EGP</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">IP Budget Purchased</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
        
        {/* Left: Project Submissions & Postings (Col-span 8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Submissions for review */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-6">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 animate-pulse" /> Submissions Awaiting IP Acquisition
            </h3>

            {submissionsForReview.length > 0 ? (
              <div className="space-y-4">
                {submissionsForReview.map(proj => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 flex flex-col justify-between space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{proj.title}</h4>
                        <p className="text-[10px] text-slate-400 font-sans mt-0.5">Submitted by: <span className="font-semibold text-purple-400">{proj.studentTeam}</span></p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-lg">Completed</span>
                    </div>

                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-sans leading-relaxed bg-slate-200/20 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/45 dark:border-slate-850">
                      <span className="font-bold block mb-1 text-slate-800 dark:text-slate-200 flex items-center gap-0.5">
                        <FileText className="h-3.5 w-3.5" /> Solution Summary:
                      </span>
                      {proj.submissionNotes || "No notes provided."}
                    </p>

                    {/* Acquisition Payout & Hiring buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <span className="text-[11px] font-extrabold text-slate-850 dark:text-slate-200 flex items-center">
                        Acquisition Cost: <span className="font-extrabold text-emerald-500 ml-1">{proj.budget.toLocaleString()} EGP</span>
                      </span>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOfferJob(proj, 'Internship')}
                          className="px-3.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-500/20 transition-all"
                        >
                          Offer Internship
                        </button>
                        <button
                          onClick={() => handleOfferJob(proj, 'Full-time Placement')}
                          className="px-3.5 py-2 rounded-xl bg-pink-500/10 border border-pink-500/25 text-pink-600 dark:text-pink-400 font-bold hover:bg-pink-500/20 transition-all"
                        >
                          Offer Job
                        </button>
                        <button
                          onClick={() => handlePurchaseSolution(proj)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md"
                        >
                          Purchase Code (IP)
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-450 font-sans italic text-center py-6">No final student submissions awaiting review.</p>
            )}
          </div>

          {/* Sponsoring / Active project checklist */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Briefcase className="h-4.5 w-4.5 text-purple-500" /> Active Sponsor Challenges ({postedProjects.length})
            </h3>
            
            <div className="space-y-3">
              {postedProjects.map(proj => (
                <div key={proj.id} className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 flex justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{proj.title}</h4>
                    <p className="text-[10px] text-slate-450 font-sans mt-0.5">Budget: <span className="font-semibold text-emerald-500">{proj.budget.toLocaleString()} EGP</span> | Timeline: {proj.timeline}</p>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                    proj.status === 'Purchased' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                    proj.status === 'Completed' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                    proj.status === 'In Progress' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse' :
                    'bg-slate-100 text-slate-650'
                  }`}>
                    {proj.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Applicants list & Recruiting Manager (Col-span 4) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Applicants */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-blue-500" /> Challenge Applicants
            </h3>

            {pendingApplicants.map((app, idx) => {
              const activeProj = projects.find(p => p.id === app.projId);
              const alreadyApproved = activeProj?.status === 'In Progress' || activeProj?.status === 'Completed' || activeProj?.status === 'Purchased';

              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-purple-400 font-bold block uppercase tracking-wider">Applied for {app.projTitle}</span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{app.studentName}</h4>
                    <p className="text-[10px] text-slate-450 font-sans leading-none">{app.studentDegree}</p>
                    <p className="text-[10px] text-slate-400 font-sans">Academic Supervisor: <span className="font-semibold text-slate-650 dark:text-white">{app.supervisor}</span></p>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-gradient-to-tr from-purple-500/10 to-blue-500/10 border border-purple-500/15">
                    <Sparkles className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">AI Score: {app.matchScore}% Match</span>
                      <p className="text-[9px] text-slate-450 leading-snug mt-0.5">High skills alignment in React & Frontend design.</p>
                    </div>
                  </div>

                  {alreadyApproved ? (
                    <span className="w-full flex items-center justify-center gap-1 py-1.5 bg-purple-500/10 text-purple-600 font-bold border border-purple-500/20 rounded-xl text-[10px]">
                      Application Approved (In Progress)
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApproveApplicant(app)}
                      className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-xl hover:bg-purple-650 dark:hover:bg-purple-500 hover:text-white dark:hover:text-white shadow-md transition-all flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve Application
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* AI Team Recommendations */}
          <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
            <h3 className="text-sm font-bold text-slate-855 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-purple-500 animate-pulse" /> AI Team Recommendations
            </h3>
            <p className="text-[10px] text-slate-450 font-sans leading-relaxed">
              Our matching engine combines individual profiles to curate the highest-performing student groups for your challenge.
            </p>

            <div className="space-y-3">
              {teamRecommendations.map(team => {
                const targetProject = projects.find(p => p.id === team.projectId);
                const isAssigned = targetProject?.status === 'In Progress' || targetProject?.status === 'Completed' || targetProject?.status === 'Purchased';
                
                return (
                  <div key={team.id} className="p-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs">{team.teamName}</h4>
                      <span className="text-[9px] font-bold text-purple-500 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">
                        {team.overallScore}% Fit
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Recommended members:</span>
                      <ul className="space-y-0.5 text-slate-500 dark:text-slate-350 list-disc list-inside">
                        {team.members.map(m => <li key={m}>{m}</li>)}
                      </ul>
                    </div>

                    <p className="text-[9.5px] text-slate-450 leading-relaxed font-sans italic bg-purple-500/5 p-2 rounded-lg border border-purple-505/5">
                      "{team.reason}"
                    </p>

                    {isAssigned ? (
                      <span className="w-full flex items-center justify-center py-1.5 bg-purple-500/10 text-purple-600 font-bold border border-purple-500/20 rounded-lg text-[9px]">
                        Team Recruited
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setProjects(prev => prev.map(p => {
                            if (p.id === team.projectId) {
                              return {
                                ...p,
                                status: 'In Progress',
                                studentTeam: team.members.map(m => m.split(' (')[0]).join(', '),
                                supervisor: "Dr. Evelyn Foster"
                              };
                            }
                            return p;
                          }));
                          
                          const newNotif = {
                            id: 'notif-' + Date.now(),
                            title: 'Recruited as Collaborative Team!',
                            message: `NexaTech recruited you and your team ('${team.teamName}') to solve '${targetProject?.title}'. Dr. Evelyn Foster will supervise.`,
                            time: 'Just now',
                            read: false
                          };
                          setStudentProfile(prev => ({
                            ...prev,
                            notifications: [newNotif, ...prev.notifications]
                          }));
                          confetti({ particleCount: 80, spread: 60 });
                        }}
                        className="w-full py-1.5 rounded-lg bg-purple-650 hover:bg-purple-600 text-white font-bold transition-all text-[9.5px]"
                      >
                        Recruit Entire Team
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl glass-card border border-purple-500/35 p-6 space-y-6 text-xs relative animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Publish Sponsoring Challenge</h3>
                <p className="text-[10px] text-slate-450 font-sans">Submit real corporate challenge for university supervision.</p>
              </div>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-650 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostProject} className="space-y-4 font-sans">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Challenge Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Distributed Database API Integration"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Acquisition Budget (EGP)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 5000"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Timeline</label>
                  <select 
                    value={newTimeline}
                    onChange={(e) => setNewTimeline(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl outline-none cursor-pointer"
                  >
                    <option value="6 Weeks">6 Weeks</option>
                    <option value="8 Weeks">8 Weeks</option>
                    <option value="12 Weeks">12 Weeks</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Difficulty</label>
                  <select 
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl outline-none cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Skills (Comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="React, AWS, Node.js"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Challenge Scope & Description</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Summarize the project goals, code requirements, and deliverables..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl outline-none"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Core Business Problem to Solve</label>
                <textarea 
                  required
                  rows="2"
                  placeholder="What actual bottleneck is NexaTech hoping this student solution will resolve?"
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl outline-none"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md"
                >
                  Publish Challenge
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
