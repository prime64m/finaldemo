import React from 'react';
import { Users, Shield, Check, Search } from 'lucide-react';

export default function ManageUsers() {
  const mockUsers = [
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh.k@gmail.com', phone: '+91 9876543210', state: 'Uttar Pradesh', category: 'OBC', income: '₹1,80,000', joined: '12 Sep 2025' },
    { id: '2', name: 'Sunita Sharma', email: 'sunita.s@gmail.com', phone: '+91 9812345678', state: 'Bihar', category: 'General', income: '₹2,20,000', joined: '15 Oct 2025' },
    { id: '3', name: 'Ramesh Patel', email: 'ramesh.p@gmail.com', phone: '+91 9765432109', state: 'Gujarat', category: 'General', income: '₹1,50,000', joined: '01 Nov 2025' },
    { id: '4', name: 'Priya Verma', email: 'priya.v@gmail.com', phone: '+91 9988776655', state: 'Madhya Pradesh', category: 'SC', income: '₹95,000', joined: '20 Dec 2025' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            Registered Beneficiaries / Users
          </h2>
          <p className="text-slate-400 text-sm">View details of user profiles stored in MongoDB</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/70 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">User Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">State</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Annual Income</th>
              <th className="px-6 py-4">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-bold text-white">{user.name}</td>
                <td className="px-6 py-4 text-xs">
                  <div className="text-slate-200">{user.email}</div>
                  <div className="text-slate-400">{user.phone}</div>
                </td>
                <td className="px-6 py-4 text-slate-300">{user.state}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-700 text-indigo-300 border border-slate-600">
                    {user.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-emerald-400 font-medium">{user.income}</td>
                <td className="px-6 py-4 text-slate-400 text-xs">{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
