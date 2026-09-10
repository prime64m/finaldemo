import React, { useState } from 'react';
import { 
  Landmark, ShieldAlert, Heart, Users, CheckCircle2, ChevronDown, ChevronUp, Sparkles, HelpCircle 
} from 'lucide-react';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How does SchemeSaathi match my family with government schemes?",
      a: "SchemeSaathi uses a transparent, rule-based matching engine. When you create your family profile and add household members, the system compares age brackets, annual income, occupation, land ownership, state residency, and social categories against official scheme eligibility criteria to determine matches."
    },
    {
      q: "Is my personal and family information saved on any server?",
      a: "No. SchemeSaathi runs entirely client-side in your web browser and stores your family profile in local browser storage (localStorage). We do not collect, send, or sell any family data."
    },
    {
      q: "Is SchemeSaathi an official Government of India website?",
      a: "No. SchemeSaathi is a civic-tech hackathon platform prototype designed to demonstrate how family-based eligibility matching can simplify government scheme discovery. Final eligibility and approval are determined by official government portals."
    },
    {
      q: "Why do I see 'Demo Data' notices on schemes?",
      a: "To ensure full transparency during hackathon evaluation, scheme criteria and benefits are labeled as Demo Data. Always consult official ministry portals (like pmkisan.gov.in or myscheme.gov.in) before applying."
    },
    {
      q: "How are individual family members evaluated?",
      a: "Central and state schemes target different demographics (e.g. farmers, college students, senior citizens, women, PwD). By adding each member separately (Father, Mother, Daughter, Son), SchemeSaathi evaluates eligibility per member as well as for the family unit."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Landmark className="w-3.5 h-3.5" />
          <span>About SchemeSaathi Platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
          Bridging Indian Families & Government Welfare Benefits
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
          Solving the discovery gap between citizens and 100+ central and state government welfare schemes.
        </p>
      </div>

      {/* The Problem & The Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Problem */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg">
            !
          </div>
          <h3 className="font-bold text-slate-900 text-lg">The Problem</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Millions of Indian families are eligible for government welfare schemes (subsidies, scholarships, pensions, agricultural grants), but they rarely apply because:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
            <li>They don't know which specific schemes they qualify for.</li>
            <li>Eligibility criteria are scattered across dozens of department portals.</li>
            <li>Portals evaluate individuals, whereas Indian welfare is family-centered.</li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <h3 className="font-bold text-slate-900 text-lg">The Solution</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            SchemeSaathi provides a single, unified family profile workflow:
          </p>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>1 Family Profile:</strong> Enter household location, income, and ration card details once.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Member-Wise Matching:</strong> Add father, mother, children, and grandparents individually.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Rule Engine & Clear Explanations:</strong> Instant "Why You Matched" breakdown.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Core Principles */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-lg">
        <h3 className="font-bold text-xl text-white font-display text-center">
          Our Design Principles
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2 bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-emerald-400 text-sm">Transparent Logic</h4>
            <p className="text-slate-300 leading-relaxed">
              No hidden scoring or opaque logic. We use clear, deterministic rule-based conditions that citizens can trust and understand.
            </p>
          </div>

          <div className="space-y-2 bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-emerald-400 text-sm">Family-Centric</h4>
            <p className="text-slate-300 leading-relaxed">
              Indian households share resources. Evaluating schemes per member and across the family unit reflects real social structures.
            </p>
          </div>

          <div className="space-y-2 bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-emerald-400 text-sm">Civic Safety & Privacy</h4>
            <p className="text-slate-300 leading-relaxed">
              Data stays inside your browser. No mandatory logins, passwords, or data collection.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h3 className="font-bold text-2xl text-slate-900 font-display">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-500">Everything you need to know about SchemeSaathi</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
