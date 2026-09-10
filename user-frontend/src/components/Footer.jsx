import React from 'react';
import { Landmark, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      {/* Disclaimer Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-200 text-xs px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-amber-300">Disclaimer:</span> Eligibility shown on SchemeSaathi is an initial indication based on the information provided in your family profile. Final eligibility, approval, and disbursement are determined solely by the respective Government Department or official portal. All scheme data presented is for demonstration purposes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">SchemeSaathi</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              SchemeSaathi bridges Indian families with government welfare benefits. By creating a single consolidated family profile, we evaluate individual member attributes to match you with central and state government schemes.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Civic-Tech Hackathon Prototype • Open Data Engine</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-emerald-400 transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('profile')} className="hover:text-emerald-400 transition-colors">
                  Family Profile Manager
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('explore')} className="hover:text-emerald-400 transition-colors">
                  Explore Schemes Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('matched')} className="hover:text-emerald-400 transition-colors">
                  Eligible Schemes Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-emerald-400 transition-colors">
                  About SchemeSaathi
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Official Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.myscheme.gov.in/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                  <span>myScheme Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in/RegistrationFormupdated.aspx" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pmjay.gov.in/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                  <span>Ayushman Bharat PM-JAY</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SchemeSaathi. Developed for Civic Innovation.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with simple, rule-based transparent matching</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
