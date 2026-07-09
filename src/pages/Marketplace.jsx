import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, DollarSign, Brain, Layers, Briefcase, RefreshCw } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

export default function Marketplace({ projects, onSelectProject, activeRole, studentProfile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [minBudget, setMinBudget] = useState(0);
  const [onlyHighMatch, setOnlyHighMatch] = useState(false);

  // Extract all unique skills across all projects for possible filter
  const allSkills = useMemo(() => {
    const skills = new Set();
    projects.forEach(p => p.requiredSkills.forEach(s => skills.add(s)));
    return Array.from(skills);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
      
      const matchesBudget = project.budget >= minBudget;

      const mockStudentName = studentProfile?.name || "Alex Rivera";
      const matchScore = project.matches?.[mockStudentName]?.score || 0;
      const matchesHighMatch = !onlyHighMatch || (activeRole === 'student' && matchScore >= 80);

      // Only show Open or In Progress projects in general marketplace
      const matchesStatus = project.status === 'Open' || project.status === 'In Progress';

      return matchesSearch && matchesDifficulty && matchesBudget && matchesHighMatch && matchesStatus;
    });
  }, [projects, searchQuery, selectedDifficulty, minBudget, onlyHighMatch, activeRole, studentProfile]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('All');
    setMinBudget(0);
    setOnlyHighMatch(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">Business Projects Marketplace</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
            Companies post real engineering challenges instead of generic job posts. Build solutions, earn sponsorships, and get hired.
          </p>
        </div>
        {activeRole === 'student' && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 text-xs font-bold shadow-sm">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>AI Sorting: Best matches listed first</span>
          </div>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Search Input */}
        <div className="space-y-1.5 col-span-1 md:col-span-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Challenges</label>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-2xl focus-within:border-purple-500/50 transition-colors">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search by keywords, companies, or skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-slate-800 dark:text-white w-full"
            />
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Difficulty Level</label>
          <div className="relative">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-2xl text-xs text-slate-800 dark:text-white outline-none cursor-pointer appearance-none"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Min Budget Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Min Acquisition Budget (EGP)</label>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-2xl">
            <span className="text-emerald-500 font-bold text-[10px]">EGP</span>
            <input 
              type="number" 
              placeholder="e.g. 50000" 
              value={minBudget || ''}
              onChange={(e) => setMinBudget(Number(e.target.value))}
              className="bg-transparent border-none outline-none text-xs text-slate-800 dark:text-white w-full"
            />
          </div>
        </div>

      </div>

      {/* Sub Filter Row (AI Match Toggle & Result count) */}
      <div className="flex items-center justify-between flex-wrap gap-4 text-xs font-semibold">
        <span className="text-slate-400">
          Showing <span className="text-purple-500 font-extrabold">{filteredProjects.length}</span> sponsored projects
        </span>

        <div className="flex items-center gap-4">
          {activeRole === 'student' && (
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
              <input 
                type="checkbox" 
                checked={onlyHighMatch}
                onChange={() => setOnlyHighMatch(!onlyHighMatch)}
                className="rounded text-purple-600 focus:ring-purple-500 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950"
              />
              <span>High Match Only (80%+)</span>
            </label>
          )}

          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <RefreshCw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              activeRole={activeRole}
              studentProfile={studentProfile}
              onSelect={() => onSelectProject(project)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl glass-panel border border-dashed border-slate-300 dark:border-slate-800 max-w-xl mx-auto space-y-4">
          <Layers className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="font-extrabold text-slate-800 dark:text-slate-200">No sponsored projects found</h3>
          <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto">
            Try adjusting your search filters or clearing the budget constraint to view alternative academic collaborations.
          </p>
          <button 
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}
