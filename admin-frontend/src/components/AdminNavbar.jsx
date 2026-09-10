import React from 'react';
import { LayoutDashboard, FilePlus, Users, ShieldAlert, LogOut } from 'lucide-react';

export default function AdminNavbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schemes', label: 'Manage Schemes', icon: FilePlus },
    { id: 'users', label: 'Registered Users', icon: Users },
  ];

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">SchemeSaathi</h1>
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Admin Portal</span>
            </div>
          </div>

          <nav className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">Admin Officer</p>
              <p className="text-xs text-slate-400">admin@schemesaathi.gov.in</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
