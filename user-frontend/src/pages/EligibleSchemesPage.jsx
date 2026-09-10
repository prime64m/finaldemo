import React, { useState, useMemo } from 'react';
import { 
  Award, CheckCircle2, AlertCircle, XCircle, Users, ExternalLink, 
  ChevronRight, Sparkles, Filter, Info, ShieldCheck, Cpu, FileSearch
} from 'lucide-react';
import { evaluateEligibility } from '../utils/matcherEngine';
import { DEMO_PROFILES } from '../data/demoProfiles';
import GroqDocumentVerifierModal from '../components/GroqDocumentVerifierModal';

export default function EligibleSchemesPage({ 
  familyProfile, 
  setActivePage, 
  onSelectScheme,
  loadDemoProfile 
}) {
  const [activeTab, setActiveTab] = useState('eligible'); // 'eligible' | 'check' | 'not_eligible'
  const [selectedMemberFilter, setSelectedMemberFilter] = useState('ALL');
  const [showGroqModal, setShowGroqModal] = useState(false);

  const members = familyProfile?.members || [];
  const familyDetails = familyProfile?.familyDetails || {};

  // Run eligibility matcher engine against profile details
  const evaluation = useMemo(() => {
    return evaluateEligibility(familyProfile);
  }, [familyProfile]);

  const { eligibleSchemes, checkDetailsSchemes, notEligibleSchemes } = evaluation;

  // Filter schemes by member if specific member is selected
  const filterByMember = (schemesList) => {
    if (selectedMemberFilter === 'ALL') return schemesList;
    return schemesList.filter(item => {
      return item.qualifyingMembers && item.qualifyingMembers.some(qm => qm.member.id === selectedMemberFilter);
    });
  };

  const filteredEligible = filterByMember(eligibleSchemes);
  const filteredCheck = filterByMember(checkDetailsSchemes);
  const filteredNotEligible = filterByMember(notEligibleSchemes);

  if (members.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 font-display">No Family Profile Created Yet</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To match relevant government schemes, you need to create a family profile and add household members.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('profile')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
            >
              Create Family Profile
            </button>

            <button
              onClick={() => loadDemoProfile(DEMO_PROFILES[0])}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 font-bold text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Load Sample Rural Farmer Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">
      
      {/* Dashboard Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Profile vs Scheme AI Matching Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {familyDetails.familyName || 'Family Profile'} Scheme Dashboard
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              State: <strong className="text-white">{familyDetails.state || 'Karnataka'}</strong> • Ration Card: <strong className="text-white">{familyDetails.rationCard || 'BPL'}</strong> • Family Size: <strong className="text-white">{members.length} Members</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Groq AI Document Verification Trigger Button */}
            <button
              onClick={() => setShowGroqModal(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer border border-indigo-400"
            >
              <Cpu className="w-4 h-4 text-amber-300" />
              <span>Scan Document with Groq AI</span>
            </button>

            {/* Member Filter Selector */}
            <div className="bg-slate-800 p-2.5 rounded-2xl border border-slate-700 space-y-1 min-w-[220px]">
              <label className="block text-[10px] font-semibold uppercase text-slate-400">Filter By Member</label>
              <select
                value={selectedMemberFilter}
                onChange={(e) => setSelectedMemberFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-white text-xs font-semibold focus:outline-hidden focus:border-emerald-500"
              >
                <option value="ALL">Entire Household ({members.length} Members)</option>
                {members.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.relationship})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs: Eligible / Check Details / Not Eligible */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto pb-1">
        
        <button
          onClick={() => setActiveTab('eligible')}
          className={`pb-3 px-4 font-bold text-sm sm:text-base transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'eligible'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Eligible Schemes</span>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
            {filteredEligible.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('check')}
          className={`pb-3 px-4 font-bold text-sm sm:text-base transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'check'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>Check Details</span>
          <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
            {filteredCheck.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('not_eligible')}
          className={`pb-3 px-4 font-bold text-sm sm:text-base transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'not_eligible'
              ? 'border-slate-600 text-slate-800'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <XCircle className="w-5 h-5 text-slate-400" />
          <span>Not Eligible</span>
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
            {filteredNotEligible.length}
          </span>
        </button>

      </div>

      {/* Tab 1: Fully Eligible Schemes */}
      {activeTab === 'eligible' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-4 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p>
              Based on automated rule comparison against your household profile, you satisfy all criteria for <strong>{filteredEligible.length} schemes</strong> below. Click <strong>"View Details"</strong> to apply.
            </p>
          </div>

          {filteredEligible.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-2">
              <Info className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No Fully Matched Schemes For Selected View</h3>
              <p className="text-slate-500 text-xs">Try selecting 'Entire Household' or check the 'Check Details' tab.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEligible.map(({ scheme, qualifyingMembers, bestMemberReasons }) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl border-2 border-emerald-500/50 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative"
                >
                  <div className="space-y-3">
                    
                    {/* Category & Status Badge */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md">
                        {scheme.category}
                      </span>
                      <span className="bg-emerald-600 text-white font-extrabold text-[11px] uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        ✅ YOU ARE ELIGIBLE
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg leading-snug">
                      {scheme.name}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium">
                      {scheme.department}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {scheme.shortDescription}
                    </p>

                    {/* Member Attribution Banner */}
                    <div className="bg-slate-100 p-2.5 rounded-xl text-xs space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Qualifying Household Members:</span>
                      <div className="flex flex-wrap gap-1">
                        {qualifyingMembers.map(qm => (
                          <span key={qm.member.id} className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded text-[11px] font-bold">
                            ✓ {qm.member.name} ({qm.member.relationship})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* "Why You Matched" Snippet */}
                    <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Matched Profile Criteria</span>
                      <ul className="text-[11px] text-emerald-900 space-y-1">
                        {bestMemberReasons.slice(0, 3).map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs">
                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors flex items-center justify-center gap-1"
                      title="Official Portal"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-600" />
                    </a>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Check Details */}
      {activeTab === 'check' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p>
              Your profile satisfies basic criteria for these <strong>{filteredCheck.length} schemes</strong>, but sub-conditions or specific document verifications are required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCheck.map(({ scheme, bestMemberReasons, bestMemberFailures }) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-amber-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="bg-amber-50 text-amber-900 font-bold px-2.5 py-1 rounded-md border border-amber-200">
                      {scheme.category}
                    </span>
                    <span className="bg-amber-600 text-white font-extrabold text-[11px] uppercase px-2.5 py-1 rounded-md flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Check Sub-Criteria
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg leading-snug">{scheme.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{scheme.department}</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{scheme.shortDescription}</p>

                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">Verification Required</span>
                    <ul className="text-[11px] text-amber-950 space-y-1">
                      {bestMemberFailures.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs">
                  <button
                    onClick={() => onSelectScheme(scheme)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Check Full Requirements</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Not Eligible Schemes */}
      {activeTab === 'not_eligible' && (
        <div className="space-y-6">
          <div className="bg-slate-100 border border-slate-200 text-slate-700 rounded-2xl p-4 text-xs flex items-center gap-3">
            <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
            <p>
              These <strong>{filteredNotEligible.length} schemes</strong> do not match your current profile criteria (e.g. income limit exceeded or age boundaries).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotEligible.map(({ scheme, bestMemberFailures }) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 opacity-75 hover:opacity-100 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-md">
                      {scheme.category}
                    </span>
                    <span className="bg-slate-200 text-slate-700 font-bold text-[11px] uppercase px-2.5 py-1 rounded-md flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-slate-500" />
                      ❌ NOT ELIGIBLE
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-base">{scheme.name}</h3>
                  <p className="text-xs text-slate-500">{scheme.department}</p>

                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase text-red-600">Mismatch Reason:</span>
                    <ul className="text-[11px] text-slate-700 space-y-1">
                      {bestMemberFailures.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-red-500 font-bold">✗</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  View Scheme Criteria
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Groq Document Verification Modal */}
      {showGroqModal && (
        <GroqDocumentVerifierModal
          familyProfile={familyProfile}
          onClose={() => setShowGroqModal(false)}
        />
      )}

    </div>
  );
}
