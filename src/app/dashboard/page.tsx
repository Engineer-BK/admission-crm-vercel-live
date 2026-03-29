'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-8 flex justify-center items-center h-64 text-gray-500 font-medium animate-pulse">Loading dashboard metrics...</div>;

  const chartData = data.programs.map((p: any) => {
    const matrix = p.seatMatrix;
    if (!matrix) return { name: p.code, filled: 0, remaining: 0 };
    const filled = matrix.kcetFilled + matrix.comedkFilled + matrix.mgmtFilled;
    const remaining = matrix.totalIntake - filled;
    return { name: p.code, filled, remaining };
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b pb-4 border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Management Dashboard</h1>
        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest">Live Overview</span>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/applicants?status=APPLIED" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-300 hover:shadow-lg transition duration-200 block group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-6xl">📄</div>
          <div className="flex items-center space-x-5 relative z-10">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">📝</div>
            <div>
              <p className="text-gray-500 font-semibold tracking-wide text-sm uppercase">Pending Documents</p>
              <h3 className="text-5xl font-black text-gray-800 group-hover:text-orange-600 transition tracking-tighter mt-1">{data.pendingDocsCount}</h3>
              <p className="text-sm text-gray-400 mt-2 font-medium">Applicants waiting for verification</p>
            </div>
          </div>
        </Link>
        <Link href="/applicants?status=ALLOCATED" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-300 hover:shadow-lg transition duration-200 block group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-6xl">💸</div>
          <div className="flex items-center space-x-5 relative z-10">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">⚠️</div>
            <div>
              <p className="text-gray-500 font-semibold tracking-wide text-sm uppercase">Fees Pending (At Risk)</p>
              <h3 className="text-5xl font-black text-gray-800 group-hover:text-red-600 transition tracking-tighter mt-1">{data.pendingFeeCount}</h3>
              <p className="text-sm text-gray-400 mt-2 font-medium">Allocated but unpaid seats</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Seat Allocation Overview</h2>
        <div className="h-96 w-full font-sans">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontWeight: 600}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
              <Tooltip cursor={{fill: '#F3F4F6', opacity: 0.4}} contentStyle={{borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              <Legend wrapperStyle={{paddingTop: '20px'}} iconType="circle" />
              <Bar dataKey="filled" name="Filled Seats" stackId="a" fill="#4F46E5" radius={[0, 0, 4, 4]} />
              <Bar dataKey="remaining" name="Remaining Seats" stackId="a" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Program Matrix Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Program Seat Matrices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="p-5 font-bold text-gray-600 uppercase tracking-wider text-xs">Program</th>
                <th className="p-5 font-bold text-gray-600 uppercase tracking-wider text-xs">Total Intake</th>
                <th className="p-5 font-bold text-gray-600 uppercase tracking-wider text-xs">KCET Filled</th>
                <th className="p-5 font-bold text-gray-600 uppercase tracking-wider text-xs">COMEDK Filled</th>
                <th className="p-5 font-bold text-gray-600 uppercase tracking-wider text-xs">Mgmt Filled</th>
                <th className="p-5 font-black text-gray-900 uppercase tracking-wider text-xs">Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.programs.map((p: any) => {
                const m = p.seatMatrix;
                if (!m) return null;
                const filled = m.kcetFilled + m.comedkFilled + m.mgmtFilled;
                const remaining = m.totalIntake - filled;
                return (
                  <tr key={p.id} className="hover:bg-indigo-50/30 transition duration-150">
                    <td className="p-5 font-bold text-gray-800">{p.code} <span className="font-normal text-gray-500 ml-1">- {p.name}</span></td>
                    <td className="p-5 font-medium">{m.totalIntake}</td>
                    <td className="p-5 text-gray-600"><span className="font-semibold text-gray-900">{m.kcetFilled}</span> / {m.kcetSeats}</td>
                    <td className="p-5 text-gray-600"><span className="font-semibold text-gray-900">{m.comedkFilled}</span> / {m.comedkSeats}</td>
                    <td className="p-5 text-gray-600"><span className="font-semibold text-gray-900">{m.mgmtFilled}</span> / {m.mgmtSeats}</td>
                    <td className={`p-5 font-black text-base ${remaining <= 0 ? 'text-red-500' : 'text-emerald-500'}`}>{remaining}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
