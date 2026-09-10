import React, { useState } from 'react';
import { 
  Users, UserPlus, Edit3, Trash2, CheckCircle2, Sparkles, 
  ArrowRight, ShieldCheck, X, AlertCircle, RefreshCw, Briefcase, GraduationCap, Building, Copy, Database, Filter
} from 'lucide-react';
import { STATES } from '../data/schemesData';
import { DEMO_PROFILES } from '../data/demoProfiles';
import GoogleAuthCard from '../components/GoogleAuthCard';

export default function FamilyProfilePage({ 
  familyProfile, 
  setFamilyProfile, 
  setActivePage,
  loadDemoProfile,
  userAccount,
  setUserAccount
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [syncMessage, setSyncMessage] = useState('');

  // Form state for individual member
  const initialMemberState = {
    name: '',
    age: '',
    gender: 'Male',
    relationship: 'Head of Family',
    occupation: 'Farmer',
    education: 'High School / 10th',
    annualIncome: '',
    incomeBracket: 'Below ₹2.5L',
    socialCategory: 'OBC',
    disability: 'No Disability',
    landOwnership: 'Landless',
    specialAttributes: []
  };

  const [memberForm, setMemberForm] = useState(initialMemberState);

  // Handle Family Details change
  const handleFamilyDetailsChange = (e) => {
    const { name, value } = e.target;
    setFamilyProfile(prev => ({
      ...prev,
      familyDetails: {
        ...prev.familyDetails,
        [name]: value
      }
    }));
  };

  // Google Login Auto Fill Handler
  const handleGoogleLogin = (googleUser) => {
    setFamilyProfile(prev => ({
      ...prev,
      familyDetails: {
        ...prev.familyDetails,
        familyName: `${googleUser.name.split(' ')[0]} Household`,
        email: googleUser.email
      }
    }));
  };

  // Open modal for adding new member
  const handleOpenAddModal = (presetRelation = null) => {
    setEditingMemberId(null);
    if (presetRelation) {
      setMemberForm({
        ...initialMemberState,
        name: presetRelation === 'Spouse' ? 'Sunita' : presetRelation === 'Son' ? 'Rahul' : presetRelation === 'Daughter' ? 'Priya' : presetRelation === 'Parent' ? 'Ramcharan' : '',
        relationship: presetRelation === 'Parent' ? 'Father' : presetRelation,
        age: presetRelation === 'Son' || presetRelation === 'Daughter' ? '18' : presetRelation === 'Parent' ? '70' : '45',
        occupation: presetRelation === 'Son' || presetRelation === 'Daughter' ? 'Student' : presetRelation === 'Parent' ? 'Retired / Pensioner' : 'Farmer'
      });
    } else {
      setMemberForm(initialMemberState);
    }
    setShowAddModal(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (member) => {
    setEditingMemberId(member.id);
    setMemberForm({
      name: member.name || '',
      age: member.age || '',
      gender: member.gender || 'Male',
      relationship: member.relationship || 'Head of Family',
      occupation: member.occupation || 'Farmer',
      education: member.education || 'High School / 10th',
      annualIncome: member.annualIncome !== undefined ? member.annualIncome : '',
      incomeBracket: member.incomeBracket || 'Below ₹2.5L',
      socialCategory: member.socialCategory || 'OBC',
      disability: member.disability || 'No Disability',
      landOwnership: member.landOwnership || 'Landless',
      specialAttributes: member.specialAttributes || []
    });
    setShowAddModal(true);
  };

  // Duplicate a member
  const handleDuplicateMember = (member) => {
    const clonedMember = {
      ...member,
      id: 'mem-' + Date.now(),
      name: `${member.name} (Copy)`
    };
    setFamilyProfile(prev => ({
      ...prev,
      members: [...prev.members, clonedMember]
    }));
  };

  // Save member (add or update)
  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!memberForm.name || memberForm.age === '') return;

    if (editingMemberId) {
      // Update existing
      setFamilyProfile(prev => ({
        ...prev,
        members: prev.members.map(m => m.id === editingMemberId ? {
          ...memberForm,
          id: editingMemberId,
          age: Number(memberForm.age),
          annualIncome: Number(memberForm.annualIncome) || 0
        } : m)
      }));
    } else {
      // Add new
      const newMember = {
        ...memberForm,
        id: 'mem-' + Date.now(),
        age: Number(memberForm.age),
        annualIncome: Number(memberForm.annualIncome) || 0
      };
      setFamilyProfile(prev => ({
        ...prev,
        members: [...prev.members, newMember]
      }));
    }

    setShowAddModal(false);
    setMemberForm(initialMemberState);
  };

  // Remove member
  const handleRemoveMember = (id) => {
    setFamilyProfile(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== id)
    }));
  };

  // Toggle Special Attribute checkbox
  const handleSpecialAttributeToggle = (attr) => {
    setMemberForm(prev => {
      const exists = prev.specialAttributes.includes(attr);
      return {
        ...prev,
        specialAttributes: exists
          ? prev.specialAttributes.filter(a => a !== attr)
          : [...prev.specialAttributes, attr]
      };
    });
  };

  const members = familyProfile?.members || [];
  const familyDetails = familyProfile?.familyDetails || {};

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Family Profile Manager</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
            Create Your Household Profile
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Provide basic family information and add each household member to discover matching central and state schemes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('matched')}
            disabled={members.length === 0}
            className={`px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              members.length > 0
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Find Eligible Schemes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Google Authentication Section */}
      <GoogleAuthCard 
        userAccount={userAccount} 
        setUserAccount={setUserAccount}
        onGoogleLogin={handleGoogleLogin} 
      />

      {/* Sync Status Banner */}
      {syncMessage && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold text-xs flex items-center gap-2 shadow-md animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Preset Demo Profiles Banner */}
      <div className="bg-amber-500/10 border border-amber-300 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>Hackathon Quick-Demo Presets</span>
          </div>
          <span className="text-xs text-amber-700 font-medium">Click any preset to auto-fill family data</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEMO_PROFILES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadDemoProfile(preset)}
              className="p-3 rounded-xl bg-white border border-amber-200 hover:border-emerald-500 hover:shadow-md transition-all text-left text-xs space-y-1 cursor-pointer group"
            >
              <p className="font-bold text-slate-900 group-hover:text-emerald-700 flex items-center justify-between">
                <span>{preset.title}</span>
                <RefreshCw className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
              </p>
              <p className="text-[11px] text-slate-500 leading-snug">{preset.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 1: Basic Family Information Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
              1
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-lg">Basic Family Information</h2>
              <p className="text-xs text-slate-500">General details about the household unit</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Family / Household Name *</label>
            <input
              type="text"
              name="familyName"
              value={familyDetails.familyName || ''}
              onChange={handleFamilyDetailsChange}
              placeholder="e.g. Ramesh Gowda Household"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={familyDetails.email || ''}
              onChange={handleFamilyDetailsChange}
              placeholder="e.g. ramesh@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={familyDetails.mobile || ''}
              onChange={handleFamilyDetailsChange}
              placeholder="e.g. 9876543210"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">State / Union Territory *</label>
            <select
              name="state"
              value={familyDetails.state || 'Karnataka'}
              onChange={handleFamilyDetailsChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
            >
              {STATES.filter(s => s !== "All India").map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">District</label>
            <input
              type="text"
              name="district"
              value={familyDetails.district || ''}
              onChange={handleFamilyDetailsChange}
              placeholder="e.g. Mandya / Thane / Varanasi"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Ration Card Type *</label>
            <select
              name="rationCard"
              value={familyDetails.rationCard || 'BPL'}
              onChange={handleFamilyDetailsChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
            >
              <option value="BPL">BPL (Below Poverty Line / Yellow Card)</option>
              <option value="Antyodaya AAY">Antyodaya Anna Yojana (AAY / Poorest of Poor)</option>
              <option value="APL">APL (Above Poverty Line)</option>
              <option value="None">No Ration Card</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Add Member Shortcut Bar */}
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-slate-900 text-xs sm:text-sm">Quick Add Member Shortcuts:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleOpenAddModal('Head of Family')}
            className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
          >
            + Head (Self)
          </button>
          <button
            onClick={() => handleOpenAddModal('Spouse')}
            className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
          >
            + Spouse
          </button>
          <button
            onClick={() => handleOpenAddModal('Son')}
            className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
          >
            + Son (Student)
          </button>
          <button
            onClick={() => handleOpenAddModal('Daughter')}
            className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
          >
            + Daughter (Student)
          </button>
          <button
            onClick={() => handleOpenAddModal('Parent')}
            className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
          >
            + Senior Parent
          </button>
        </div>
      </div>

      {/* Step 2: Family Members Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-100 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
              2
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Family Members ({members.length})</h2>
              <p className="text-xs text-slate-500">Add each member separately to enable individual scheme matching</p>
            </div>
          </div>

          <button
            onClick={() => handleOpenAddModal()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <UserPlus className="w-4 h-4 text-emerald-400" />
            <span>Custom Member Add</span>
          </button>
        </div>

        {/* Members Cards List */}
        {members.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center space-y-3">
            <Users className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No Family Members Added Yet</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Click the "Quick Add Member Shortcuts" above or "Custom Member Add" to populate your family profile.
            </p>
            <button
              onClick={() => handleOpenAddModal()}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add First Member</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.map((m) => (
              <div 
                key={m.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{m.name}</h4>
                      <p className="text-xs text-emerald-700 font-semibold">{m.relationship}</p>
                    </div>
                    <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-bold">
                      Age: {m.age}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Gender</span>
                      <span className="font-medium text-slate-800">{m.gender}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Occupation</span>
                      <span className="font-medium text-slate-800">{m.occupation}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Annual Income</span>
                      <span className="font-bold text-emerald-700">₹{Number(m.annualIncome).toLocaleString('en-IN')}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Category</span>
                      <span className="font-medium text-slate-800">{m.socialCategory}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Education</span>
                      <span className="font-medium text-slate-800 truncate">{m.education}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Disability</span>
                      <span className="font-medium text-slate-800">{m.disability}</span>
                    </div>
                  </div>

                  {m.specialAttributes && m.specialAttributes.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                      {m.specialAttributes.map(attr => (
                        <span key={attr} className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                          ★ {attr}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Member Card Action Buttons [Match Schemes] [Duplicate] [Edit] [Remove] */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setActivePage('matched')}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                  >
                    <Filter className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Check Schemes for {m.name.split(' ')[0]}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDuplicateMember(m)}
                      title="Duplicate Member"
                      className="py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Clone</span>
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(m)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      className="py-1.5 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Find Eligible Schemes Button */}
      {members.length > 0 && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="font-bold text-lg text-white">Profile Ready ({members.length} Members Added)</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Click below to run eligibility matching across all central and state government schemes.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActivePage('matched')}
              className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Find Eligible Schemes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal for Adding / Editing Family Member */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">
                  {editingMemberId ? 'Edit Family Member Details' : 'Add Family Member'}
                </h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveMember} className="p-6 space-y-5 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Gowda"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age (Years) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="105"
                    value={memberForm.age}
                    onChange={(e) => setMemberForm({ ...memberForm, age: e.target.value })}
                    placeholder="e.g. 52"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender *</label>
                  <select
                    value={memberForm.gender}
                    onChange={(e) => setMemberForm({ ...memberForm, gender: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Relationship with Family *</label>
                  <select
                    value={memberForm.relationship}
                    onChange={(e) => setMemberForm({ ...memberForm, relationship: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
                  >
                    <option value="Head of Family">Head of Family / Self</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Dependent">Dependent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Occupation *</label>
                  <select
                    value={memberForm.occupation}
                    onChange={(e) => setMemberForm({ ...memberForm, occupation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
                  >
                    <option value="Farmer">Farmer</option>
                    <option value="Agricultural Labourer">Agricultural Labourer</option>
                    <option value="Student">Student</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Daily Wage Worker">Daily Wage Worker</option>
                    <option value="Self-Employed / Small Business">Self-Employed / Small Business</option>
                    <option value="Salaried Private">Salaried Private</option>
                    <option value="Government Employee">Government Employee</option>
                    <option value="Retired / Pensioner">Retired / Pensioner</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Education Level *</label>
                  <select
                    value={memberForm.education}
                    onChange={(e) => setMemberForm({ ...memberForm, education: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
                  >
                    <option value="Illiterate">Illiterate / No Formal Education</option>
                    <option value="Primary School">Primary School (up to Class 8)</option>
                    <option value="High School / 10th">High School / 10th Standard</option>
                    <option value="Higher Secondary / 12th">Higher Secondary / 12th Standard</option>
                    <option value="Graduate">Graduate (BA, BSc, BCom, BTech, etc.)</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="ITI / Diploma">ITI / Vocational Diploma</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Annual Individual Income (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={memberForm.annualIncome}
                    onChange={(e) => setMemberForm({ ...memberForm, annualIncome: e.target.value })}
                    placeholder="e.g. 180000"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Social Category *</label>
                  <select
                    value={memberForm.socialCategory}
                    onChange={(e) => setMemberForm({ ...memberForm, socialCategory: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC (Other Backward Class)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Disability Details *</label>
                  <select
                    value={memberForm.disability}
                    onChange={(e) => setMemberForm({ ...memberForm, disability: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
                  >
                    <option value="No Disability">No Disability</option>
                    <option value="PwD >= 40%">PwD (40% or higher benchmark disability)</option>
                    <option value="Severe Disability">Severe Disability (80%+)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Land Ownership Details *</label>
                  <select
                    value={memberForm.landOwnership}
                    onChange={(e) => setMemberForm({ ...memberForm, landOwnership: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-900 bg-white"
                  >
                    <option value="Landless">Landless</option>
                    <option value="Small/Marginal Farmer < 2 Hectares">Small / Marginal Farmer (&lt; 2 Hectares / 5 Acres)</option>
                    <option value="Large Farmer > 2 Hectares">Large Farmer (&gt; 2 Hectares)</option>
                    <option value="Urban Property Only">Urban House / Plot Only</option>
                  </select>
                </div>

              </div>

              {/* Special Attributes Checklist */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <label className="block font-semibold text-slate-800">Special Status / Additional Attributes</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {["Widow", "Senior Citizen", "Single Mother", "Pregnant / Lactating Mother", "Orphan", "Ex-Serviceman"].map((attr) => {
                    const checked = memberForm.specialAttributes.includes(attr);
                    return (
                      <label 
                        key={attr}
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                          checked ? 'bg-emerald-50 border-emerald-500 font-semibold text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleSpecialAttributeToggle(attr)}
                          className="rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{attr}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-sm transition-colors cursor-pointer"
                >
                  {editingMemberId ? 'Update Member' : 'Save Family Member'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
