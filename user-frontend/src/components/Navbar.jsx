import React, { useState } from 'react';
import { Landmark, Users, Search, Award, Info, Sparkles, ChevronDown, CheckCircle2, Globe } from 'lucide-react';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activePage, setActivePage, familyProfile, loadDemoProfile }) {
  const [showDemoDropdown, setShowDemoDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { lang, changeLanguage, t } = useLanguage();
  
  const memberCount = familyProfile?.members?.length || 0;

  const handleSelectDemo = (preset) => {
    loadDemoProfile(preset);
    setShowDemoDropdown(false);
  };

  const languagesList = [
    { code: 'en', name: 'English', flag: '🇬🇧', label: 'English' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳', label: 'Hindi (हिंदी)' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', label: 'Kannada (ಕನ್ನಡ)' }
  ];

  const currentLangObj = languagesList.find(l => l.code === lang) || languagesList[0];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Govt Style Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">{t('appName')} Civic-Tech Platform</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 hidden sm:inline">{t('tagline')}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 text-xs">
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded font-mono text-[11px]">Demo Mode</span>
          <span>100% Free & Private</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 group text-left focus:outline-hidden cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-slate-900 font-display">{t('appName')}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  India
                </span>
              </div>
              <p className="text-[11px] text-slate-500 -mt-0.5">{t('tagline')}</p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActivePage('home')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'home'
                  ? 'bg-slate-100 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('home')}
            </button>

            <button
              onClick={() => setActivePage('profile')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'profile'
                  ? 'bg-slate-100 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              {t('familyProfile')}
              {memberCount > 0 && (
                <span className="ml-1 bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  {memberCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActivePage('explore')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'explore'
                  ? 'bg-slate-100 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4" />
              {t('exploreSchemes')}
            </button>

            <button
              onClick={() => setActivePage('matched')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'matched'
                  ? 'bg-slate-100 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-600" />
              {t('matchedSchemes')}
            </button>

            <button
              onClick={() => setActivePage('about')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'about'
                  ? 'bg-slate-100 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Info className="w-4 h-4" />
              {t('about')}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                  setShowDemoDropdown(false);
                }}
                className="bg-emerald-50 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer hover:bg-emerald-100"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>{currentLangObj.flag} {currentLangObj.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Select Language</p>
                  </div>
                  {languagesList.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        changeLanguage(item.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        lang === item.code ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {lang === item.code && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Demo Preset Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowDemoDropdown(!showDemoDropdown);
                  setShowLangDropdown(false);
                }}
                className="bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300/80 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="Load sample family profiles for quick hackathon demonstration"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>Demo Presets</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {showDemoDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Load Sample Family Profile</p>
                    <p className="text-[11px] text-slate-500">1-Click instant setup for testing</p>
                  </div>
                  <div className="py-1 space-y-1">
                    {DEMO_PROFILES.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectDemo(preset)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 transition-colors flex flex-col gap-0.5 group cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                          <span>{preset.title}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600" />
                        </div>
                        <span className="text-[11px] text-slate-500">{preset.subtitle}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden border-t border-slate-200 bg-slate-50 px-2 py-1.5 flex justify-around text-xs">
        <button
          onClick={() => setActivePage('home')}
          className={`px-2 py-1 rounded ${activePage === 'home' ? 'font-bold text-emerald-700' : 'text-slate-600'}`}
        >
          {t('home')}
        </button>
        <button
          onClick={() => setActivePage('profile')}
          className={`px-2 py-1 rounded flex items-center gap-1 ${activePage === 'profile' ? 'font-bold text-emerald-700' : 'text-slate-600'}`}
        >
          {t('familyProfile')} ({memberCount})
        </button>
        <button
          onClick={() => setActivePage('explore')}
          className={`px-2 py-1 rounded ${activePage === 'explore' ? 'font-bold text-emerald-700' : 'text-slate-600'}`}
        >
          {t('exploreSchemes')}
        </button>
        <button
          onClick={() => setActivePage('matched')}
          className={`px-2 py-1 rounded ${activePage === 'matched' ? 'font-bold text-emerald-700' : 'text-slate-600'}`}
        >
          {t('matchedSchemes')}
        </button>
      </div>
    </header>
  );
}
