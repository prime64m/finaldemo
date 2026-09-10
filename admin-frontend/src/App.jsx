import React, { useState } from 'react';
import AdminNavbar from './components/AdminNavbar';
import Dashboard from './pages/Dashboard';
import ManageSchemes from './pages/ManageSchemes';
import ManageUsers from './pages/ManageUsers';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl w-full auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'schemes' && <ManageSchemes />}
        {activeTab === 'users' && <ManageUsers />}
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        SchemeSaathi Admin Portal &copy; {new Date().getFullYear()} - Government Welfare Management Dashboard
      </footer>
    </div>
  );
}
