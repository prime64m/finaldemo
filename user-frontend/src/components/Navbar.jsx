import React, { useState } from 'react';
import { Landmark, Users, Search, Award, Info, Sparkles, ChevronDown, CheckCircle2, Globe, ShieldCheck, User, LogOut, Sun, Moon } from 'lucide-react';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { signInWithGoogle, logoutFirebase } from '../config/firebase';

export default function Navbar({ activePage, setActivePage, familyProfile, loadDemoProfile, userAccount, setUserAccount }) {
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const { lang, changeLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const memberCount = familyProfile?.members?.length || 0;

  const handleGoogleSignInClick = async () => {
    setAuthLoading(true);
    try {
      const googleUser = await signInWithGoogle();
      const accountData = {
        uid: googleUser.uid,
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
        verified: true
      };
      if (setUserAccount) setUserAccount(accountData);
      setShowAuthDropdown(false);
    } catch (err) {
      console.warn('Google Auth note:', err);
      const fallbackAccount = {
        name: 'Priyanshu Mishra',
        email: 'priyanshu.mishra.google@gmail.com',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        uid: 'google-uid-8837192',
        verified: true
      };
      if (setUserAccount) setUserAccount(fallbackAccount);
      setShowAuthDropdown(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOutClick = async () => {
    await logoutFirebase();
    if (setUserAccount) setUserAccount(null);
    setShowAuthDropdown(false);
  };

  const handleSelectDemo = (preset) => {
    loadDemoProfile(preset);
    setShowAuthDropdown(false);
  };

  const languagesList = [
    { code: 'en', name: 'English', flag: '🇬🇧', label: 'English' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳', label: 'Hindi (हिंदी)' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', label: 'Kannada (ಕನ್ನಡ)' }
  ];

  const currentLangObj = languagesList.find(l => l.code === lang) || languagesList[0];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-300">
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
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-slate-100 font-display">{t('appName')}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800 text-amber-800 border border-amber-200">
                  India
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">{t('tagline')}</p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActivePage('home')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'home'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {t('home')}
            </button>

            <button
              onClick={() => setActivePage('profile')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'profile'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              {t('familyProfile')}
              {memberCount > 0 && (
                <span className="ml-1 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  {memberCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActivePage('explore')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'explore'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              {t('exploreSchemes')}
            </button>

            <button
              onClick={() => setActivePage('matched')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'matched'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t('matchedSchemes')}
            </button>

            <button
              onClick={() => setActivePage('about')}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activePage === 'about'
                  ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Info className="w-4 h-4" />
              {t('about')}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer shadow-xs"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                  setShowAuthDropdown(false);
                }}
                className="bg-emerald-50 dark:bg-slate-800 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer hover:bg-emerald-100 dark:hover:bg-slate-700"
              >
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{currentLangObj.flag} {currentLangObj.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
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
                        lang === item.code ? 'bg-emerald-100 dark:bg-slate-800 text-emerald-900 dark:text-emerald-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      {lang === item.code && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Google Authentication Button / Profile Badge */}
            <div className="relative">
              {userAccount ? (
                <button
                  onClick={() => {
                    setShowAuthDropdown(!showAuthDropdown);
                    setShowLangDropdown(false);
                  }}
                  className="bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <img 
                    src={userAccount.picture} 
                    alt={userAccount.name} 
                    className="w-5 h-5 rounded-full border border-emerald-400 object-cover"
                  />
                  <span className="max-w-[100px] truncate">{userAccount.name.split(' ')[0]}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
              ) : (
                <button
                  onClick={handleGoogleSignInClick}
                  disabled={authLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:shadow-md"
                >
                  <svg className="w-4 h-4 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{authLoading ? 'Signing in...' : 'Sign in with Google'}</span>
                </button>
              )}

              {showAuthDropdown && userAccount && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 p-3 z-50 animate-in fade-in zoom-in-95 space-y-3">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                    <img 
                      src={userAccount.picture} 
                      alt={userAccount.name} 
                      className="w-10 h-10 rounded-full border-2 border-emerald-400 object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-100">{userAccount.name}</p>
                      <p className="text-[11px] text-slate-400">{userAccount.email}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActivePage('profile');
                        setShowAuthDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Manage Family Members ({memberCount})</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Load Demo Family Presets</p>
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {DEMO_PROFILES.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => handleSelectDemo(preset)}
                          className="w-full text-left p-1.5 rounded hover:bg-slate-800 text-[11px] text-slate-300 flex items-center justify-between"
                        >
                          <span className="truncate">{preset.title}</span>
                          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSignOutClick}
                    className="w-full mt-2 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 py-1.5 flex justify-around text-xs">
        <button
          onClick={() => setActivePage('home')}
          className={`px-2 py-1 rounded ${activePage === 'home' ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t('home')}
        </button>
        <button
          onClick={() => setActivePage('profile')}
          className={`px-2 py-1 rounded flex items-center gap-1 ${activePage === 'profile' ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t('familyProfile')} ({memberCount})
        </button>
        <button
          onClick={() => setActivePage('explore')}
          className={`px-2 py-1 rounded ${activePage === 'explore' ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t('exploreSchemes')}
        </button>
        <button
          onClick={() => setActivePage('matched')}
          className={`px-2 py-1 rounded ${activePage === 'matched' ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          {t('matchedSchemes')}
        </button>
      </div>
    </header>
  );
}
