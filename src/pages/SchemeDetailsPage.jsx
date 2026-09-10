import React from 'react';
import { 
  ArrowLeft, CheckCircle2, AlertCircle, FileText, ExternalLink, 
  Calendar, ShieldCheck, Users, Building, Landmark, HelpCircle, Award
} from 'lucide-react';
import { evaluateEligibility } from '../utils/matcherEngine';

export default function SchemeDetailsPage({ scheme, familyProfile, onBack }) {
  if (!scheme) return null;

  // Run matching on current profile for this scheme
  const evaluation = familyProfile && familyProfile.members && familyProfile.members.length > 0 
    ? evaluateEligibility(familyProfile)
    : null;

  let schemeMatchData = null;
  if (evaluation) {
    schemeMatchData = 
      evaluation.eligibleSchemes.find(item => item.scheme.id === scheme.id) ||
      evaluation.checkDetailsSchemes.find(item => item.scheme.id === scheme.id) ||
      evaluation.notEligibleSchemes.find(item => item.scheme.id === scheme.id);
  }

  const isEligible = schemeMatchData?.qualifyingMembers?.length > 0;
  const qualifyingMembers = schemeMatchData?.qualifyingMembers || [];
  const matchReasons = schemeMatchData?.bestMemberReasons || [];
  const failReasons = schemeMatchData?.bestMemberFailures || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Back Navigation Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog / Dashboard</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-md border border-emerald-200">
              {scheme.category}
            </span>
            <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
              {scheme.isCentral ? 'Central Government Scheme' : 'State Scheme'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated: {scheme.lastUpdated}</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
            {scheme.name}
          </h1>
          <p className="text-sm font-semibold text-emerald-700 mt-1">
            {scheme.department}
          </p>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          {scheme.shortDescription}
        </p>

        {/* Demo Data Tag */}
        {scheme.isDemoData && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>Demo Data Notice:</strong> Scheme criteria is formatted for hackathon demonstration. Always verify on official government portals before applying.</span>
          </div>
        )}

      </div>

      {/* "Why You Matched" Section */}
      {schemeMatchData && (
        <div className={`rounded-3xl border-2 p-6 sm:p-8 space-y-4 ${
          isEligible ? 'bg-emerald-950 text-white border-emerald-500' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                isEligible ? 'bg-emerald-600' : 'bg-amber-600'
              }`}>
                {isEligible ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Why You Matched</h3>
                <p className="text-xs text-slate-300">Rule-based evaluation breakdown against family profile</p>
              </div>
            </div>

            <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase ${
              isEligible ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
            }`}>
              {isEligible ? 'Eligible Match' : 'Check Criteria'}
            </span>
          </div>

          {/* Qualified Members attribution */}
          {qualifyingMembers.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Qualifying Family Members:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {qualifyingMembers.map(qm => (
                  <div key={qm.member.id} className="bg-slate-900/80 p-3 rounded-xl border border-emerald-800/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-emerald-300">{qm.member.name}</p>
                      <p className="text-[11px] text-slate-400">{qm.member.relationship} • {qm.member.age} yrs • {qm.member.occupation}</p>
                    </div>
                    <span className="text-emerald-400 font-bold">100% Match</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Match Reasons List */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Matching Criteria Breakdown:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {matchReasons.map((reason, idx) => (
                <li key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fail / Warning Reasons if any */}
          {failReasons.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Additional Requirements / Mismatches:</span>
              <ul className="space-y-1 text-xs text-amber-200">
                {failReasons.map((fail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">!</span>
                    <span>{fail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

      {/* About & Scheme Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Main Benefits */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>Main Benefits & Financial Assistance</span>
          </h3>
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-2xl text-slate-800 text-sm font-semibold leading-relaxed">
            {scheme.mainBenefits}
          </div>
          {scheme.benefits && scheme.benefits.length > 0 && (
            <ul className="space-y-2 text-xs text-slate-700 list-disc pl-5">
              {scheme.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Eligibility Summary */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-700" />
            <span>Official Eligibility Summary</span>
          </h3>
          <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {scheme.eligibilitySummary}
          </p>
        </div>

        {/* Required Documents */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-700" />
            <span>Required Documents</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {scheme.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Building className="w-5 h-5 text-slate-700" />
            <span>Application Process</span>
          </h3>
          <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {scheme.applicationProcess}
          </p>
        </div>

        {/* Official Portal Button */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-900 text-sm">Ready to apply?</p>
            <p className="text-xs text-slate-500">Visit the official portal to complete registration</p>
          </div>
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Visit Official Government Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
