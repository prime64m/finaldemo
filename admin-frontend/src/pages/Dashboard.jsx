import React from 'react';
import { Layers, FolderTree, Globe2, ShieldCheck, PlusCircle, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const stats = [
    { title: 'Total Welfare Schemes', count: '24 Active', detail: 'Central & State Government', icon: Layers, color: 'from-blue-500 to-indigo-600' },
    { title: 'Sectors & Categories', count: '6 Core Sectors', detail: 'Agri, Health, Housing, Edu, Pension', icon: FolderTree, color: 'from-emerald-500 to-teal-600' },
    { title: 'Coverage Jurisdiction', count: 'Pan-India', detail: 'All 28 States & 8 Union Territories', icon: Globe2, color: 'from-purple-500 to-indigo-600' },
    { title: 'System & Database Status', count: '100% Active', detail: 'MongoDB Atlas Operational', icon: ShieldCheck, color: 'from-emerald-600 to-green-600' },
  ];

  const recentSchemes = [
    { name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', ministry: 'Ministry of Agriculture', category: 'Agriculture', status: 'Active', url: 'https://pmkisan.gov.in/RegistrationFormupdated.aspx' },
    { name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)', ministry: 'Ministry of Health & Family Welfare', category: 'Health', status: 'Active', url: 'https://pmjay.gov.in/' },
    { name: 'Pradhan Mantri Awas Yojana (PMAY-Gramin)', ministry: 'Ministry of Rural Development', category: 'Housing', status: 'Active', url: 'https://pmayg.nic.in/' },
    { name: 'PM Garib Kalyan Anna Yojana (PMGKAY)', ministry: 'Ministry of Consumer Affairs', category: 'Social Welfare', status: 'Active', url: 'https://dfpd.gov.in/' },
    { name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', ministry: 'Ministry of Agriculture', category: 'Agriculture', status: 'Active', url: 'https://pmfby.gov.in/' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome, Scheme Administrator 👋</h2>
          <p className="text-slate-400 text-sm mt-1">Manage government welfare schemes, monitor eligibility criteria, and update database entries.</p>
        </div>
        <button
          onClick={() => setActiveTab('schemes')}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Scheme
        </button>
      </div>

      {/* Real Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`} />
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-4">{stat.count}</h3>
              <p className="text-xs text-indigo-400 mt-1 font-medium">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Managed Schemes Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Managed Government Schemes</h3>
            <p className="text-xs text-slate-400">Active welfare schemes in system dataset</p>
          </div>
          <button
            onClick={() => setActiveTab('schemes')}
            className="flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Scheme Name</th>
                <th className="px-4 py-3">Ministry / Department</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg">Official Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {recentSchemes.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-4 font-semibold text-white">{s.name}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs">{s.ministry}</td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700 text-indigo-300 border border-slate-600">
                      {s.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-xs">
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                      Visit Portal ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
