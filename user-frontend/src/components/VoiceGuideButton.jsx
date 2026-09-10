import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VoiceGuideButton({ textToRead }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { lang } = useLanguage();

  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Voice guide is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = textToRead || "Welcome to Scheme Saathi. Follow the three simple steps: First create your family profile, second check your eligible schemes, and third click visit official portal to apply.";
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language for SpeechSynthesis
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (lang === 'kn') {
      utterance.lang = 'kn-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.9; // Slightly slower for better clarity

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <button
      onClick={handleToggleVoice}
      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs border ${
        isSpeaking
          ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
          : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
      }`}
      title="Listen to page contents read out loud in your selected language"
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          <span>Stop Voice Guide</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-200" />
          <span>🔊 Listen Voice Guide</span>
        </>
      )}
    </button>
  );
}
