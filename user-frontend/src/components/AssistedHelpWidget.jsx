import React, { useState } from 'react';
import { HelpCircle, MessageSquare, X, Sparkles, PhoneCall, Volume2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import VoiceGuideButton from './VoiceGuideButton';

export default function AssistedHelpWidget({ setActivePage, loadDemoProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Help Popup Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Need Help Finding Schemes?</h4>
                <p className="text-[11px] text-slate-500">Citizen Assistance Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-emerald-950 font-medium leading-relaxed">
              👋 <strong>Hi! Are you new here?</strong> We make government schemes simple. Just create a family profile or click a 1-click sample demo profile!
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setActivePage('profile');
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <span>👤 How to Create Family Profile</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
              </button>

              <button
                onClick={() => {
                  setActivePage('matched');
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <span>🎯 View My Eligible Schemes</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Listen in your language:</span>
              <VoiceGuideButton />
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-2 border-2 border-emerald-400 cursor-pointer group"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        <span>Need Help? (सहायता)</span>
      </button>
    </div>
  );
}
