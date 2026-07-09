import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Marketplace from './pages/Marketplace';
import LearningCenter from './pages/LearningCenter';
import Internships from './pages/Internships';
import Contact from './pages/Contact';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import UniversityDashboard from './pages/UniversityDashboard';
import PortfolioView from './pages/PortfolioView';
import StudentLogin from './pages/StudentLogin';

// Mock Data
import {
  INITIAL_COMPANIES,
  INITIAL_PROJECTS,
  INITIAL_COURSES,
  INITIAL_INTERNSHIPS,
  INITIAL_STUDENT_PROFILE,
  UNIVERSITY_ANALYTICS,
  AI_TEAM_RECOMMENDATIONS,
  LABOR_MARKET_INSIGHTS
} from './data/mockData';

import { authAPI, projectsAPI, coursesAPI, internshipsAPI, aiAPI } from './services/api';

import { Sparkles, Calendar, DollarSign, Award, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation & Role State
  const [activePage, setActivePage] = useState('home');
  const [activeRole, setActiveRole] = useState('guest'); // guest, student, company, university
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  // Core Database States (persisted via localStorage)
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('cb_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    const saved = localStorage.getItem('cb_student_profile');
    if (saved) return JSON.parse(saved);
    
    // Add custom helper field for course enrollment tracking
    return {
      ...INITIAL_STUDENT_PROFILE,
      enrolledCourses: []
    };
  });

  // Static assets
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [internships, setInternships] = useState(INITIAL_INTERNSHIPS);
  const [universityData, setUniversityData] = useState(UNIVERSITY_ANALYTICS);

  // Selected Detail views (Modals)
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch initial records from REST API
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const projsRes = await projectsAPI.getAll();
        if (projsRes.success && projsRes.data.length > 0) setProjects(projsRes.data);
        
        const coursesRes = await coursesAPI.getAll();
        if (coursesRes.success && coursesRes.data.length > 0) setCourses(coursesRes.data);
        
        const internsRes = await internshipsAPI.getAll();
        if (internsRes.success && internsRes.data.length > 0) setInternships(internsRes.data);
      } catch (err) {
        console.warn("⚠️ Backend API server not running or database is offline. Falling back to frontend mock simulation mode.");
      }
    };
    fetchBackendData();
  }, []);

  // Multi-role JWT fast login simulator syncing
  useEffect(() => {
    const syncRoleAuth = async () => {
      try {
        if (activeRole === 'student') {
          const token = localStorage.getItem('token');
          if (!token) {
            setActivePage('student-login');
            return;
          }
          const prof = await authAPI.getProfile();
          let aiGaps = null;
          try {
            const aiRes = await aiAPI.getRecommendations();
            if (aiRes.success) {
              aiGaps = aiRes.data;
            }
          } catch (aiErr) {
            console.warn("AI analysis endpoint offline, skipping dynamic gap evaluations.", aiErr);
          }

          const updatedProfile = {
            ...prof.data,
            enrolledCourses: prof.data.enrolledCourses?.map(c => c._id || c) || [],
            careerReadinessScore: aiGaps ? aiGaps.careerReadinessScore : prof.data.careerReadinessScore,
            missingSkills: aiGaps ? aiGaps.missingSkills : (prof.data.missingSkills || [])
          };
          setStudentProfile(updatedProfile);
        } else if (activeRole === 'company') {
          await authAPI.login('partner@nexatech.com.eg', 'company123');
        } else if (activeRole === 'university') {
          await authAPI.login('dean@cairotech.edu.eg', 'university123');
        } else {
          authAPI.logout();
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.warn("⚠️ Fast Login Simulator failed to query REST API. Running local mock credentials.");
      }
    };
    syncRoleAuth();
  }, [activeRole, isAuthenticated]);

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem('cb_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('cb_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  // Dark Mode side effects
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Course Enrollment Handler
  const handleEnrollCourse = async (courseId) => {
    if (activeRole !== 'student') {
      alert("Please switch your simulator role to Student to enroll in courses.");
      return;
    }

    try {
      const courseObj = courses.find(c => c.id === courseId || c._id === courseId);
      const res = await coursesAPI.enroll(courseObj._id || courseId);
      if (res.success) {
        const prof = await authAPI.getProfile();
        setStudentProfile({
          ...prof.data,
          enrolledCourses: prof.data.enrolledCourses?.map(c => c._id || c) || []
        });
        confetti({ particleCount: 40, spread: 50 });
        return;
      }
    } catch (err) {
      console.warn("REST Course enrollment offline, switching to local state fallback.");
    }

    if (studentProfile.enrolledCourses.includes(courseId)) return;
    const courseObj = courses.find(c => c.id === courseId || c._id === courseId);
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: 'Course Enrolled',
      message: `You successfully enrolled in '${courseObj.title}'. Completing this syllabus prepares you for associated corporate challenges.`,
      time: 'Just now',
      read: false
    };

    setStudentProfile(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId],
      notifications: [newNotif, ...prev.notifications],
      careerReadinessScore: Math.min(100, prev.careerReadinessScore + 3)
    }));
    confetti({ particleCount: 40, spread: 50 });
  };

  // Student Apply for Project Handler
  const handleApplyForProject = async (projId, teamMode = false) => {
    if (activeRole !== 'student') {
      alert("Please simulate the Student role to apply for corporate challenges.");
      return;
    }

    try {
      const targetProj = projects.find(p => p.id === projId || p._id === projId);
      const res = await projectsAPI.apply(targetProj._id || projId);
      if (res.success) {
        const projsRes = await projectsAPI.getAll();
        if (projsRes.success) setProjects(projsRes.data);
        
        const prof = await authAPI.getProfile();
        const notifMsg = teamMode 
          ? `You and Marcus Chen applied for '${targetProj.title}' as a collaborative team. Dr. Evelyn Foster has been assigned to supervise your milestones.`
          : `You applied individually for '${targetProj.title}'. Dr. Evelyn Foster has been assigned to supervise your milestone implementations.`;
        
        const newNotif = {
          id: 'notif-' + Date.now(),
          title: 'Project In Development',
          message: notifMsg,
          time: 'Just now',
          read: false
        };

        setStudentProfile(prev => ({
          ...prev,
          notifications: [newNotif, ...(prof.data.notifications || [])],
          careerReadinessScore: Math.min(100, prev.careerReadinessScore + 5)
        }));

        setSelectedProject(null);
        setActivePage('student-dashboard');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
        return;
      }
    } catch (err) {
      console.warn("REST applyForProject offline, switching to local state fallback.");
    }

    const targetProj = projects.find(p => p.id === projId || p._id === projId);
    setProjects(prev => prev.map(p => {
      if (p.id === projId || p._id === projId) {
        return {
          ...p,
          status: 'In Progress',
          studentTeam: teamMode ? `${studentProfile.name}, Marcus Chen` : studentProfile.name,
          supervisor: "Dr. Evelyn Foster"
        };
      }
      return p;
    }));

    const notifMsg = teamMode 
      ? `You and Marcus Chen applied for '${targetProj.title}' as a collaborative team. Dr. Evelyn Foster has been assigned to supervise your milestones.`
      : `You applied individually for '${targetProj.title}'. Dr. Evelyn Foster has been assigned to supervise your milestone implementations.`;

    const newNotif = {
      id: 'notif-' + Date.now(),
      title: 'Project In Development',
      message: notifMsg,
      time: 'Just now',
      read: false
    };

    setStudentProfile(prev => ({
      ...prev,
      notifications: [newNotif, ...prev.notifications],
      careerReadinessScore: Math.min(100, prev.careerReadinessScore + 5)
    }));

    setSelectedProject(null);
    setActivePage('student-dashboard');
  };

  const handleAuthSuccess = async (res) => {
    setIsAuthenticated(true);
    setActiveRole('student');
    
    try {
      const prof = await authAPI.getProfile();
      setStudentProfile({
        ...prof.data,
        enrolledCourses: prof.data.enrolledCourses?.map(c => c._id || c) || []
      });
    } catch (err) {
      console.warn("Local authentication sync fallback.");
      setStudentProfile({
        name: res.name || 'Alex Rivera',
        email: res.email || 'alex@cairotech.edu.eg',
        degree: res.degree || 'B.S. in Software Engineering (Senior Year)',
        university: 'Cairo Technological University',
        careerReadinessScore: 78,
        skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Python", "Git", "UI/UX Principles"],
        missingSkills: ["Node.js", "TensorFlow", "WebSockets"],
        softSkills: [
          { name: "Communication", score: 85 },
          { name: "Leadership", score: 70 },
          { name: "Teamwork", score: 90 },
          { name: "Critical Thinking", score: 80 },
          { name: "Problem Solving", score: 85 },
          { name: "Time Management", score: 75 },
          { name: "Adaptability", score: 80 }
        ],
        enrolledCourses: [],
        completedProjects: [],
        notifications: [
          {
            id: 'notif-welcome',
            title: 'Welcome to CareerBridge AI',
            message: `Your student profile has been synced. Connect with Egypt's leading cloud providers.`,
            time: 'Just now',
            read: false
          }
        ]
      });
    }
    setActivePage('student-dashboard');
  };

  // Render Page Selection
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setActiveRole={setActiveRole} />;
      case 'about':
        return <About />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'marketplace':
        return (
          <Marketplace 
            projects={projects} 
            onSelectProject={setSelectedProject} 
            activeRole={activeRole} 
            studentProfile={studentProfile} 
          />
        );
      case 'learning-center':
        return (
          <LearningCenter 
            courses={courses} 
            enrolledCourses={studentProfile.enrolledCourses} 
            onEnrollCourse={handleEnrollCourse} 
            onSelectCourse={setSelectedCourse} 
          />
        );
      case 'internships':
        return (
          <Internships 
            internships={internships} 
            activeRole={activeRole} 
            studentProfile={studentProfile} 
          />
        );
      case 'contact':
        return <Contact />;
      case 'student-login':
        return (
          <StudentLogin 
            onAuthSuccess={handleAuthSuccess} 
            setActivePage={setActivePage} 
          />
        );
      case 'student-dashboard':
        const studentToken = localStorage.getItem('token');
        if (!studentToken) {
          return (
            <StudentLogin 
              onAuthSuccess={handleAuthSuccess} 
              setActivePage={setActivePage} 
            />
          );
        }
        return (
          <StudentDashboard 
            studentProfile={studentProfile} 
            setStudentProfile={setStudentProfile}
            projects={projects}
            setProjects={setProjects}
            courses={courses}
            internships={internships}
            onEnrollCourse={handleEnrollCourse}
            onSelectProject={setSelectedProject}
            onSelectCourse={setSelectedCourse}
          />
        );
      case 'company-dashboard':
        return (
          <CompanyDashboard 
            projects={projects} 
            setProjects={setProjects} 
            studentProfile={studentProfile}
            setStudentProfile={setStudentProfile}
            teamRecommendations={AI_TEAM_RECOMMENDATIONS}
          />
        );
      case 'university-dashboard':
        return (
          <UniversityDashboard 
            universityData={universityData} 
            projects={projects} 
            studentProfile={studentProfile} 
            companies={companies} 
            laborMarketInsights={LABOR_MARKET_INSIGHTS}
          />
        );
      case 'portfolio':
        const portfolioToken = localStorage.getItem('token');
        if (!portfolioToken) {
          return (
            <StudentLogin 
              onAuthSuccess={handleAuthSuccess} 
              setActivePage={setActivePage} 
            />
          );
        }
        return <PortfolioView studentProfile={studentProfile} />;
      default:
        return <Home setActivePage={setActivePage} setActiveRole={setActiveRole} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navigation Header */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        activeRole={activeRole} 
        setActiveRole={setActiveRole} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        userProfile={studentProfile}
        universityData={universityData}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footnote footer */}
      <Footer setActivePage={setActivePage} />

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 p-6 md:p-8 space-y-6 text-xs relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center text-2xl shadow-inner">
                  {selectedProject.logo}
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{selectedProject.companyName}</h4>
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">{selectedProject.title}</h2>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* General details bar */}
            <div className="grid grid-cols-3 gap-4 border-y border-slate-250/20 py-4 font-sans text-center">
              <div>
                <span className="text-[9px] text-slate-400 uppercase block tracking-wider font-semibold">Budget (IP Cost)</span>
                <span className="text-base font-extrabold text-slate-850 dark:text-white">
                  {selectedProject.budget.toLocaleString()} EGP
                </span>
              </div>
              
              <div>
                <span className="text-[9px] text-slate-400 uppercase block tracking-wider font-semibold">Target Timeline</span>
                <span className="text-base font-extrabold text-slate-850 dark:text-white flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  {selectedProject.timeline}
                </span>
              </div>

              <div>
                <span className="text-[9px] text-slate-400 uppercase block tracking-wider font-semibold">Difficulty Tag</span>
                <span className="text-base font-extrabold text-purple-500 block">
                  {selectedProject.difficulty}
                </span>
              </div>
            </div>

            {/* AI matching score details (student only) */}
            {activeRole === 'student' && (
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-purple-500/10 to-blue-500/10 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 dark:text-slate-250 flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-purple-500" /> AI Score Analysis: {selectedProject.matches?.[studentProfile.name]?.score}% Match
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-350 leading-relaxed font-sans text-[11px]">
                  {selectedProject.matches?.[studentProfile.name]?.reason}
                </p>
              </div>
            )}

            {/* Description & Business Problem */}
            <div className="space-y-4 font-sans text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-350">
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-850 dark:text-white uppercase tracking-wider text-[10px]">Project Scope:</h4>
                <p>{selectedProject.description}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-850 dark:text-white uppercase tracking-wider text-[10px]">Business Challenge:</h4>
                <p>{selectedProject.businessProblem}</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-extrabold text-slate-850 dark:text-white uppercase tracking-wider text-[10px]">Required Competencies:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.requiredSkills.map(skill => (
                    <span key={skill} className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-250/20 flex flex-col sm:flex-row gap-4">
              
              {activeRole === 'student' ? (
                <>
                  {selectedProject.status === 'Open' ? (
                    <>
                      <button
                        onClick={() => handleApplyForProject(selectedProject.id, true)}
                        className="flex-1 py-3 rounded-2xl border border-purple-500/25 bg-purple-500/5 hover:bg-purple-500/10 text-purple-500 font-bold transition-all shadow-sm"
                      >
                        Apply with Team
                      </button>
                      <button
                        onClick={() => handleApplyForProject(selectedProject.id, false)}
                        className="flex-1 py-3 rounded-2xl bg-purple-650 hover:bg-purple-600 text-white font-bold transition-all shadow-md"
                      >
                        Apply Individually
                      </button>
                    </>
                  ) : (
                    <div className="w-full p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-center font-bold text-amber-500">
                      This corporate sponsored challenge is currently in production.
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full p-4 rounded-2xl bg-purple-500/5 border border-purple-500/15 text-center font-semibold text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
                  <Info className="h-4.5 w-4.5" />
                  <span>Please simulate the **Student** role in the navigation header to apply for this project.</span>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 p-6 space-y-6 text-xs relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-500/5 border border-purple-500/15 flex items-center justify-center text-lg">
                  {selectedCourse.image || "💻"}
                </div>
                <div>
                  <span className="text-[10px] text-purple-500 font-bold tracking-wider uppercase block">{selectedCourse.category}</span>
                  <h3 className="text-base md:text-lg font-bold text-slate-850 dark:text-white mt-0.5 leading-snug">{selectedCourse.title}</h3>
                  <p className="text-[10px] text-slate-400">By {selectedCourse.instructor}</p>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-slate-650 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1 text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">Overview:</h4>
                <p>{selectedCourse.description}</p>
              </div>

              {/* Syllabus chapters */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[10px]">Course Curriculum:</h4>
                <div className="space-y-2">
                  {selectedCourse.curriculum?.map((chap, idx) => (
                    <div key={idx} className="flex gap-3 p-2.5 rounded-xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-850 font-sans">
                      <span className="h-5 w-5 rounded-lg bg-purple-500/10 text-purple-500 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{chap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enroll trigger */}
            <div className="pt-4 border-t border-slate-200/10 flex gap-4">
              <button
                onClick={() => setSelectedCourse(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-550 font-bold"
              >
                Close Curriculum
              </button>

              {studentProfile.enrolledCourses?.includes(selectedCourse.id) ? (
                <span className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold rounded-xl">
                  <CheckCircle2 className="h-4 w-4" /> Active Course
                </span>
              ) : (
                <button
                  onClick={() => {
                    handleEnrollCourse(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md transition-colors"
                >
                  Enroll Now
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
