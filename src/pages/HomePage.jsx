import React from 'react';
import { 
  Users, Search, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, 
  Sprout, GraduationCap, HeartPulse, Building2, Landmark, 
  Baby, Award, Wallet, HelpCircle, FileText
} from 'lucide-react';
import { CATEGORIES } from '../data/schemesData';
import { DEMO_PROFILES } from '../data/demoProfiles';

export default function HomePage({ setActivePage, loadDemoProfile }) {
  
  const categoryIcons = {
    "Agriculture": Sprout,
    "Education": GraduationCap,
    "Scholarships": Award,
    "Women & Child": Baby,
    "Senior Citizens": Users,
    "Disability": HeartPulse,
    "Employment": Building2,
    "Housing": Landmark,
    "Healthcare": HeartPulse,
    "Financial Assistance": Wallet
  };

  const handleDemoClick = (preset) => {
    loadDemoProfile(preset);
  };

  return (
    <div className="space-y-16 py-6">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
        
        {/* Background Subtle Shapes */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Empowering Indian Households Through Smart Eligibility Matching</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
            Find Government Schemes <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              You & Your Family Qualify For
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            People know government welfare schemes exist, but often struggle to know which ones they qualify for. 
            Create one simple family profile, add your household members, and let SchemeSaathi instantly match you with relevant central and state schemes.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('profile')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span>Create Family Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActivePage('explore')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5 text-slate-400" />
              <span>Explore Schemes</span>
            </button>
          </div>

          {/* Quick Demo Loader Bar */}
          <div className="pt-6 border-t border-slate-800 text-left bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                <span>Hackathon 1-Click Demo Profiles</span>
              </span>
              <span className="text-[11px] text-slate-400">Select any preset to auto-fill</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_PROFILES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleDemoClick(preset)}
                  className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-emerald-950 hover:border-emerald-500/50 border border-slate-700/80 transition-all text-left text-xs space-y-0.5 group"
                >
                  <p className="font-semibold text-slate-200 group-hover:text-emerald-300 truncate">
                    {preset.title}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {preset.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Key Statistics Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg mb-2">
              100+
            </div>
            <h3 className="font-bold text-2xl text-slate-900">100+ Schemes</h3>
            <p className="text-xs text-slate-500">Central & State Welfare Grants</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg mb-2">
              10+
            </div>
            <h3 className="font-bold text-2xl text-slate-900">Categories</h3>
            <p className="text-xs text-slate-500">Agriculture, Health, Edu & More</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg mb-2">
              100%
            </div>
            <h3 className="font-bold text-2xl text-slate-900">Family-Based</h3>
            <p className="text-xs text-slate-500">Matches Individual Members</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg mb-2">
              Rule
            </div>
            <h3 className="font-bold text-2xl text-slate-900">Transparent Engine</h3>
            <p className="text-xs text-slate-500">Shows "Why You Matched"</p>
          </div>

        </div>
      </section>

      {/* How It Works - 4 Steps */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            How SchemeSaathi Works
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            Four simple steps to turn your household profile into clear, actionable welfare scheme eligibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Enter Basic Family Info</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Provide family name, state, district, and ration card status (BPL / Antyodaya / APL).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Add Family Members</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Add father, mother, children, or elderly members with age, occupation, income, and category details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Automatic Matching</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Our rule-based engine evaluates income limits, age brackets, land holding, and special attributes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">View Benefits & Apply</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              See "Why You Matched", review required documents, and get direct links to official government portals.
            </p>
          </div>

        </div>
      </section>

      {/* Scheme Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">Explore Scheme Categories</h2>
            <p className="text-slate-500 text-xs mt-1">Discover schemes curated across major Indian welfare sectors</p>
          </div>
          <button 
            onClick={() => setActivePage('explore')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.filter(c => c !== "All Categories").map((category) => {
            const IconComp = categoryIcons[category] || Landmark;
            return (
              <button
                key={category}
                onClick={() => setActivePage('explore')}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left space-y-3 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                    {category}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Explore eligible grants</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="text-2xl font-bold text-white font-display">
              Ready to find eligible schemes for your family?
            </h3>
            <p className="text-emerald-200 text-sm">
              It takes less than 2 minutes to build your family profile and see matching central & state benefits.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActivePage('profile')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-colors text-center"
            >
              Start Family Profile Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
