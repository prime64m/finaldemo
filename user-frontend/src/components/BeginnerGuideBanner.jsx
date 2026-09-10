import React from 'react';
import { Users, CheckCircle2, FileText, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import VoiceGuideButton from './VoiceGuideButton';

export default function BeginnerGuideBanner({ setActivePage }) {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>Beginner Friendly Guide • 3 Easy Steps</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            How SchemeSaathi Works for Your Family
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            No complicated forms! Simply follow 3 easy steps to find money & benefits from government schemes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <VoiceGuideButton 
            textToRead={
              lang === 'hi'
                ? "योजना साथी में आपका स्वागत है। तीन आसान चरणों का पालन करें। पहला, अपनी पारिवारिक प्रोफ़ाइल बनाएं। दूसरा, अपनी पात्र योजनाएं देखें। तीसरा, आवेदन करने के लिए आधिकारिक पोर्टल पर जाएं।"
                : lang === 'kn'
                ? "ಸ್ಕೀಮ್‌ಸಾಥಿಗೆ ಸ್ವಾಗತ. ಮೂರು ಸರಳ ಹಂತಗಳನ್ನು ಅನುಸರಿಸಿ. ಮೊದಲನೆಯದಾಗಿ ನಿಮ್ಮ ಕುಟುಂಬ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ, ಎರಡನೆಯದಾಗಿ ನಿಮ್ಮ ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ, ಮೂರನೆಯದಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ."
                : "Welcome to Scheme Saathi. Follow three simple steps. First, create your family profile. Second, view your eligible schemes. Third, click visit official portal to apply."
            } 
          />
        </div>
      </div>

      {/* 3 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Step 1 */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3 relative group hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md">
              1
            </div>
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-bold text-white text-base">Add Family Details</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Enter basic age, gender, state, and occupation for each household member.
          </p>
          <button
            onClick={() => setActivePage('profile')}
            className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Start Step 1: Create Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3 relative group hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md">
              2
            </div>
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-bold text-white text-base">See Eligible Schemes</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Our AI engine instantly matches rules and shows green "YOU ARE ELIGIBLE" badges.
          </p>
          <button
            onClick={() => setActivePage('matched')}
            className="w-full py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Step 2: View Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3 relative group hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md">
              3
            </div>
            <FileText className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-bold text-white text-base">Apply Online</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Check required documents checklist and click direct link to official government portal.
          </p>
          <button
            onClick={() => setActivePage('explore')}
            className="w-full py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Step 3: Browse All Schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
