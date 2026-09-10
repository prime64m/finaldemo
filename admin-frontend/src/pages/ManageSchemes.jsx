import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, CheckCircle, Database, ExternalLink, FileCheck, CheckSquare, Square, Globe } from 'lucide-react';

const COMMON_DOCUMENTS = [
  'Aadhaar Card',
  'Ration Card (BPL/AAY)',
  'Income Certificate',
  'Caste / Category Certificate',
  'Bank Account Passbook Details',
  'Residence / Domicile Proof',
  'PAN Card',
  'Land Ownership Record (Khata / Khasra)',
  'Passport Size Photograph',
  'Disability Certificate (PwD)',
  'Student ID / Marksheet',
  'Age Proof / Birth Certificate'
];

export default function ManageSchemes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [dbStatus, setDbStatus] = useState('');
  const [schemes, setSchemes] = useState([
    {
      id: '1',
      title: 'PM-Kisan Samman Nidhi',
      category: 'Agriculture',
      ministry: 'Ministry of Agriculture',
      maxIncome: 250000,
      benefits: 'Financial benefit of ₹6,000/- per year',
      officialUrl: 'https://pmkisan.gov.in',
      documentsRequired: ['Aadhaar Card', 'Land Ownership Record (Khata / Khasra)', 'Bank Account Passbook Details'],
      status: 'Published'
    },
    {
      id: '2',
      title: 'Ayushman Bharat PM-JAY',
      category: 'Health',
      ministry: 'Ministry of Health',
      maxIncome: 300000,
      benefits: 'Health coverage up to ₹5 Lakh per family',
      officialUrl: 'https://pmjay.gov.in',
      documentsRequired: ['Aadhaar Card', 'Ration Card (BPL/AAY)', 'Income Certificate'],
      status: 'Published'
    },
    {
      id: '3',
      title: 'Pradhan Mantri Awas Yojana',
      category: 'Housing',
      ministry: 'Ministry of Housing',
      maxIncome: 300000,
      benefits: 'Subsidy on home loan interest',
      officialUrl: 'https://pmaymis.gov.in',
      documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Residence / Domicile Proof', 'Bank Account Passbook Details'],
      status: 'Published'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Agriculture',
    ministry: '',
    maxIncome: '',
    benefits: '',
    officialUrl: '',
    documentsRequired: ['Aadhaar Card', 'Bank Account Passbook Details']
  });

  // Fetch schemes from admin-backend MongoDB if available
  useEffect(() => {
    fetch('http://localhost:5001/api/admin/schemes')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          const apiSchemes = data.data.map(item => ({
            id: item._id,
            title: item.title,
            category: item.category,
            ministry: item.ministry,
            maxIncome: item.eligibilityCriteria?.maxIncomeLimit || 250000,
            benefits: item.benefits ? item.benefits.join(', ') : item.description,
            officialUrl: item.applicationUrl || 'https://india.gov.in',
            documentsRequired: item.documentsRequired || ['Aadhaar Card'],
            status: 'Published'
          }));
          setSchemes(prev => [...apiSchemes, ...prev]);
        }
      })
      .catch(err => console.log('MongoDB server offline, using local admin memory state'));
  }, []);

  const handleDocumentToggle = (doc) => {
    setFormData(prev => {
      const exists = prev.documentsRequired.includes(doc);
      return {
        ...prev,
        documentsRequired: exists
          ? prev.documentsRequired.filter(d => d !== doc)
          : [...prev.documentsRequired, doc]
      };
    });
  };

  const handleAddScheme = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const newScheme = {
      id: String(Date.now()),
      title: formData.title,
      category: formData.category,
      ministry: formData.ministry || 'Ministry of Social Welfare',
      maxIncome: Number(formData.maxIncome) || 250000,
      benefits: formData.benefits || 'Financial & welfare assistance',
      officialUrl: formData.officialUrl || 'https://india.gov.in',
      documentsRequired: formData.documentsRequired.length > 0 ? formData.documentsRequired : ['Aadhaar Card'],
      status: 'Published'
    };

    // Try posting to admin-backend MongoDB API on port 5001
    try {
      await fetch('http://localhost:5001/api/admin/schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          ministry: formData.ministry || 'Ministry of Social Welfare',
          description: formData.benefits || 'Government welfare program',
          benefits: [formData.benefits || 'Financial assistance'],
          applicationUrl: formData.officialUrl || 'https://india.gov.in',
          documentsRequired: formData.documentsRequired,
          eligibilityCriteria: { maxIncomeLimit: Number(formData.maxIncome) || 250000 }
        })
      });
      setDbStatus('✅ Scheme pushed to MongoDB database!');
    } catch (err) {
      setDbStatus('✅ Scheme saved locally!');
    }

    setSchemes([newScheme, ...schemes]);
    setFormData({
      title: '',
      category: 'Agriculture',
      ministry: '',
      maxIncome: '',
      benefits: '',
      officialUrl: '',
      documentsRequired: ['Aadhaar Card', 'Bank Account Passbook Details']
    });
    setShowModal(false);
    setTimeout(() => setDbStatus(''), 4000);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/admin/schemes/${id}`, { method: 'DELETE' });
    } catch (err) {
      // local delete fallback
    }
    setSchemes(schemes.filter(s => s.id !== id));
  };

  const filteredSchemes = schemes.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-400" />
            Manage Government Schemes
          </h2>
          <p className="text-slate-400 text-sm">Push official scheme links, required documents, and benefits into MongoDB</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" /> Push New Scheme to DB
        </button>
      </div>

      {dbStatus && (
        <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{dbStatus}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scheme by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Schemes List Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/70 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Scheme Title & Official URL</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Required Documents</th>
              <th className="px-6 py-4">Max Income Limit</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredSchemes.map((scheme) => (
              <tr key={scheme.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 space-y-1">
                  <div className="font-bold text-white text-base">{scheme.title}</div>
                  <div className="text-xs text-slate-400">{scheme.ministry}</div>
                  {scheme.officialUrl && (
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Official Website Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {scheme.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {scheme.documentsRequired?.map((doc, idx) => (
                      <span key={idx} className="bg-slate-700 text-slate-200 text-[10px] px-2 py-0.5 rounded font-medium">
                        ✓ {doc}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-emerald-400 font-medium">
                  ₹{scheme.maxIncome.toLocaleString('en-IN')} / yr
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {scheme.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(scheme.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Scheme Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-xl p-6 space-y-5 my-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" />
              Push New Scheme to MongoDB
            </h3>
            <form onSubmit={handleAddScheme} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Scheme Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pradhan Mantri Kisan Samman Nidhi"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-indigo-400 mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  Official Website / Portal Application Link *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://pmkisan.gov.in"
                  value={formData.officialUrl}
                  onChange={(e) => setFormData({ ...formData, officialUrl: e.target.value })}
                  className="w-full bg-slate-900 border border-indigo-500/50 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Direct URL where beneficiaries can apply online</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Health">Health</option>
                    <option value="Housing">Housing</option>
                    <option value="Education">Education</option>
                    <option value="Employment">Employment</option>
                    <option value="Social Welfare">Social Welfare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Max Annual Income Limit (₹)</label>
                  <input
                    type="number"
                    placeholder="250000"
                    value={formData.maxIncome}
                    onChange={(e) => setFormData({ ...formData, maxIncome: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ministry Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ministry of Agriculture & Farmers Welfare"
                  value={formData.ministry}
                  onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Documents Required Checklist Dropdown Selection */}
              <div className="space-y-2 border-t border-slate-700 pt-3">
                <label className="block text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" />
                  Required Documents (Select from Dropdown List) *
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-700 max-h-48 overflow-y-auto text-xs">
                  {COMMON_DOCUMENTS.map((doc) => {
                    const selected = formData.documentsRequired.includes(doc);
                    return (
                      <button
                        key={doc}
                        type="button"
                        onClick={() => handleDocumentToggle(doc)}
                        className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all cursor-pointer ${
                          selected
                            ? 'bg-indigo-600/30 border border-indigo-500 text-indigo-200 font-semibold'
                            : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {selected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        )}
                        <span className="truncate">{doc}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-400">Selected: {formData.documentsRequired.join(', ') || 'None selected'}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Benefits Summary</label>
                <textarea
                  rows="2"
                  placeholder="Describe financial or material benefits..."
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm font-medium text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  Save & Push to MongoDB
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
