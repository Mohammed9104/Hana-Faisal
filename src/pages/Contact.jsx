import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    setFormData({ name: '', email: '', role: 'Student', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Contact CareerBridge</h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-sans">
          Have questions about integration partnerships, sponsor regulations, or academic syllabus alignments? Drop us a note!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="p-8 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/40 space-y-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Office Locations</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
              Our core academic relations team operates hybrid workspaces across global technological hubs.
            </p>

            <div className="space-y-4 text-xs font-medium text-slate-600 dark:text-slate-350">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <span>100 Pine Street, San Francisco, CA 94111</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <span>partnerships@careerbridge.ai</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <span>+1 (800) 555-BRID</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Message Dispatched!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-sm mx-auto">
                Thank you for contacting CareerBridge AI. An institutional relations manager will respond to your inquiry within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-400 uppercase tracking-wider">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl outline-none focus:border-purple-500/50 text-slate-800 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-400 uppercase tracking-wider">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl outline-none focus:border-purple-500/50 text-slate-800 dark:text-white"
                  />
                </div>

              </div>

              {/* Role Select */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider">You are contacting us as a:</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl outline-none focus:border-purple-500/50 text-slate-800 dark:text-white cursor-pointer"
                >
                  <option value="Student">Student (seeking sponsors / guidance)</option>
                  <option value="Company">Company Manager (seeking to post projects)</option>
                  <option value="University">University Admin (seeking program onboarding)</option>
                  <option value="Other">Other / General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider">Message / Inquiry *</label>
                <textarea 
                  required
                  rows="5"
                  placeholder="How can we help your team bridge student capabilities and real projects?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl outline-none focus:border-purple-500/50 text-slate-800 dark:text-white"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-500/10"
              >
                <Send className="h-4 w-4" />
                <span>Submit Message</span>
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
}
