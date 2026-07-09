import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-xl text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                CareerBridge<span className="text-purple-500 font-extrabold">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Transforming academic study into real-world industry experience. Our platform bridges the gap between Higher Education and the Labor Market by facilitating corporate sponsored projects.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white transition-all"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white transition-all"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white transition-all"><Github className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActivePage('marketplace')} className="hover:text-white transition-colors">Business Projects</button></li>
              <li><button onClick={() => setActivePage('learning-center')} className="hover:text-white transition-colors">Learning Resources</button></li>
              <li><button onClick={() => setActivePage('internships')} className="hover:text-white transition-colors">Internship Hub</button></li>
              <li><button onClick={() => setActivePage('how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActivePage('about')} className="hover:text-white transition-colors">About Mission</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">Contact Support</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Stay Updated</h4>
            <p className="text-xs text-slate-400">Receive notifications on new business challenges and corporate projects.</p>
            <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-800 focus-within:border-purple-500 transition-colors p-1">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-transparent px-3 py-1.5 text-xs text-white outline-none w-full"
              />
              <button className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1.5 rounded-lg transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CareerBridge AI. Designed for Hackathon & Showcase presentations. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> contact@careerbridge.ai</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> SF / NYC / Austin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
