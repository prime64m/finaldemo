import React from 'react';
import { Layers, Users, CheckCircle2, Clock, PlusCircle, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const stats = [
    { title: 'Total Government Schemes', count: '48', change: '+4 this month', icon: Layers, color: 'from-blue-500 to-indigo-600' },
    { title: 'Registered Beneficiaries', count: '12,450', change: '+18% growth', icon: Users, color: 'from-emerald-500 to-teal-600' },
    { title: 'Approved Applications', count: '8,920', change: '92% approval rate', icon: CheckCircle2, color: 'from-purple-500 to-indigo-600' },
    { title: 'Pending Review', count: '340', change: 'Requires attention', icon: Clock, color: 'from-amber-500 to-orange-600' },
  ];

  const recentSchemes = [
    { name: 'PM-Kisan Samman Nidhi', ministry: 'Ministry of Agriculture', category: 'Agriculture', status: 'Active', updated: '2 hours ago' },
    { name: 'Pradhan Mantri Awas Yojana', ministry: 'Ministry of Housing', category: 'Housing', status: 'Active', updated: '1 day ago' },
    { name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana', ministry: 'Ministry of Health', category: 'Health', status: 'Active', updated: '3 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, Scheme Administrator 👋</h2>
          <p className="text-slate-400 text-sm mt-1">Manage government welfare schemes, monitor user details, and update MongoDB database entries.</p>
        </div>
        <button
          onClick={() => setActiveTab('schemes')}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/30 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Scheme
        </button>
      </div>

      {/* Stats Grid */}
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
              <h3 className="text-3xl font-extrabold text-white mt-4">{stat.count}</h3>
              <p className="text-xs text-indigo-400 mt-2 font-medium">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Action Tables */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Recently Managed Schemes</h3>
            <p className="text-xs text-slate-400">Live MongoDB collection state</p>
          </div>
          <button
            onClick={() => setActiveTab('schemes')}
            className="flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Scheme Name</th>
                <th className="px-4 py-3">Ministry</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {recentSchemes.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-4 font-semibold text-white">{s.name}</td>
                  <td className="px-4 py-4 text-slate-400">{s.ministry}</td>
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
                  <td className="px-4 py-4 text-slate-400 text-xs">{s.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
