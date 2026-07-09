import React, { useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { GraduationCap, Briefcase, Building2, TrendingUp, Sparkles, Award } from 'lucide-react';
import { CompanyIcon } from '../components/IconTranslator';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function UniversityDashboard({ 
  universityData, 
  projects, 
  studentProfile,
  companies,
  laborMarketInsights = {}
}) {
  const analytics = universityData;

  // Active projects supervised
  const activeSupervised = projects.filter(p => p.status === 'In Progress' || p.status === 'Completed');

  // Chart data for employment rates over years
  const employmentLineData = {
    labels: analytics.employmentTrend.labels,
    datasets: [
      {
        label: 'Graduate Employability Rate (%)',
        data: analytics.employmentTrend.rates,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#8b5cf6'
      }
    ]
  };

  // Chart data for skills demand
  const skillsBarData = {
    labels: analytics.skillsDemand.map(s => s.skill),
    datasets: [
      {
        label: 'Corporate Demand Intensity (%)',
        data: analytics.skillsDemand.map(s => s.demand),
        backgroundColor: [
          'rgba(59, 130, 246, 0.75)',
          'rgba(139, 92, 246, 0.75)',
          'rgba(236, 72, 153, 0.75)',
          'rgba(245, 158, 11, 0.75)',
          'rgba(16, 185, 129, 0.75)',
          'rgba(100, 116, 139, 0.75)'
        ],
        borderRadius: 8
      }
    ]
  };

  // Chart data for projects status distribution
  const openCount = projects.filter(p => p.status === 'Open').length;
  const inProgressCount = projects.filter(p => p.status === 'In Progress').length;
  const completedCount = projects.filter(p => p.status === 'Completed').length;
  const purchasedCount = projects.filter(p => p.status === 'Purchased').length;

  const projectStatusData = {
    labels: ['Open Challenges', 'In Development', 'Awaiting Purchase', 'Acquired (Hired)'],
    datasets: [
      {
        data: [openCount, inProgressCount, completedCount, purchasedCount],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(16, 185, 129, 0.7)'
        ],
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        padding: 10,
        cornerRadius: 12
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.05)'
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 10 }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 10 }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Upper Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/40 dark:border-slate-800/40 pb-6">
        <div className="flex items-center gap-3 text-xs">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg">
            <CompanyIcon name="Cairo Technological University" className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-850 dark:text-white">{analytics.name}</h1>
            <p className="text-pink-500 font-semibold mt-0.5">Sponsor Dean Panel</p>
            <p className="text-slate-400 font-sans mt-0.5">Academic Credit Sponsors and Recruitment Monitor</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-sm">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span>Employability Target: 90% (Current: {analytics.employmentRate}%)</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
        <div className="p-5 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
          <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
            <GraduationCap className="h-4.5 w-4.5 text-pink-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{analytics.totalStudents}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Supervised Students</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
          <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
            <Briefcase className="h-4.5 w-4.5 text-blue-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{activeSupervised.length}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Active Solutions</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
          <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
            <Building2 className="h-4.5 w-4.5 text-purple-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{companies.length}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Partner Sponsors</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 text-center">
          <div className="mx-auto h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
            <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{analytics.employmentRate}%</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Employability index</p>
        </div>
      </div>

      {/* Labor Market Insights Section */}
      <section className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-purple-500 animate-pulse" /> Labor Market Insights (AI Intelligence Hub)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {laborMarketInsights.demandGrowth?.map(item => (
            <div key={item.field} className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-850 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{item.field}</span>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-lg font-black text-slate-800 dark:text-white">{item.growth}% Growth</span>
                <span className="text-[9px] text-emerald-500 font-bold">Hot Field</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Top demand: <span className="font-semibold">{item.topJob}</span></p>
              <p className="text-[10px] text-slate-550 dark:text-slate-400 font-sans">Avg Entry Offer: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.avgSalary}</span></p>
            </div>
          ))}
        </div>

        {/* Shortage Skills */}
        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-bold text-rose-500 block text-[10px] uppercase tracking-wider">Critical Skills Deficit Warning</span>
            <p className="text-slate-500 dark:text-slate-400 font-sans text-[10.5px] mt-0.5">
              These skillsets have high corporate demand in Smart Village but low student enrollment rates:
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {laborMarketInsights.criticalSkillsShortage?.map(skill => (
              <span key={skill} className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 px-2.5 py-0.5 rounded-lg font-semibold text-[10px]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Line Chart: Employability Rate */}
        <div className="lg:col-span-8 p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-sm font-bold text-slate-850 dark:text-white">Graduate Employability Rate Trend</h3>
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">Target: +12% Growth</span>
          </div>
          <div className="h-64 relative">
            <Line data={employmentLineData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Doughnut Chart: Project Status Distribution */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
          <h3 className="text-sm font-bold text-slate-850 dark:text-white">Active Pipeline Distribution</h3>
          <div className="h-56 relative flex items-center justify-center">
            <Doughnut data={projectStatusData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 10, font: { size: 9 }, color: '#94a3b8' } } } }} />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
        
        {/* Bar Chart: Skill Demand */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
          <h3 className="text-sm font-bold text-slate-850 dark:text-white">Most Demanded Market Skillsets</h3>
          <div className="h-64 relative">
            <Bar data={skillsBarData} options={{ ...chartOptions, indexAxis: 'y' }} />
          </div>
        </div>

        {/* Student Tracker list */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-card border border-slate-200/40 dark:border-slate-800/40 space-y-4">
          <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
            <Award className="h-4.5 w-4.5 text-pink-500" /> Active Student Monitor
          </h3>

          <div className="space-y-3">
            {/* Dynamic Alex Rivera representation */}
            <div className="p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex justify-between items-center gap-4">
              <div>
                <h4 className="font-bold text-slate-850 dark:text-white">{studentProfile.name}</h4>
                <p className="text-[10px] text-slate-400 font-sans">Current: <span className="font-semibold text-purple-400">
                  {projects.find(p => p.status === 'In Progress' && p.studentTeam?.includes(studentProfile.name))?.title || "No current project"}
                </span></p>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">Readiness: <span className="font-semibold text-emerald-500">{studentProfile.careerReadinessScore}%</span></p>
              </div>
              <span className="text-[9px] bg-purple-500/10 text-purple-600 font-bold px-2 py-0.5 rounded-lg">Top Active</span>
            </div>

            {/* Static remaining students */}
            {analytics.activeStudents.filter(s => s.name !== studentProfile.name).map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/30 flex justify-between items-center gap-4">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{s.name}</h4>
                  <p className="text-[10px] text-slate-400 font-sans">Current: <span className="font-semibold text-slate-600 dark:text-slate-350">{s.currentProject}</span></p>
                  <p className="text-[10px] text-slate-400 font-sans mt-0.5">Rating: <span className="font-semibold text-amber-500">{s.rating}</span></p>
                </div>
                <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold px-2 py-0.5 rounded-lg">Monitored</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
