import React from 'react';
import { 
  Users, Search, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, 
  Sprout, GraduationCap, HeartPulse, Building2, Landmark, 
  Baby, Award, Wallet, HelpCircle, FileText
} from 'lucide-react';
import { CATEGORIES } from '../data/schemesData';
import { DEMO_PROFILES } from '../data/demoProfiles';
import BeginnerGuideBanner from '../components/BeginnerGuideBanner';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage({ setActivePage, loadDemoProfile }) {
  const { t } = useLanguage();

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
    <div className="space-y-12 py-6">
      
      {/* Beginner Friendly Wizard Guide Banner */}
      <BeginnerGuideBanner setActivePage={setActivePage} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl relative overflow-hidden">
        
        {/* Background Subtle Shapes */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t('heroSubtitle')}</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
            {t('heroTitle')}
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
              <span>{t('createProfileBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActivePage('explore')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5 text-slate-400" />
              <span>{t('exploreSchemes')}</span>
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
                  className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-emerald-950 hover:border-emerald-500/50 border border-slate-700/80 transition-all text-left text-xs space-y-0.5 group cursor-pointer"
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

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Single Household Profile</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
            Add your parents, spouse, and children under one family account to evaluate eligibility for everyone together.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Rule-Based AI Engine</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
            Transparently explains why a family member qualifies or fails specific scheme criteria (income, age, caste, state).
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Direct Official Portal Links</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
            No middleman fees. Direct links to myscheme.gov.in, pmkisan.gov.in, and official state portals.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-display">Browse Schemes by Category</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Discover government welfare across all sectors</p>
          </div>
          <button
            onClick={() => setActivePage('explore')}
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-bold text-sm flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.filter(c => c !== "All Categories").map((cat) => {
            const IconComponent = categoryIcons[cat] || FileText;
            return (
              <button
                key={cat}
                onClick={() => setActivePage('explore')}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col items-start gap-3 group cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
      </section>

    </div>
  );
}
