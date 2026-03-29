'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ApplicantsListPage() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => { loadData(); }, [search, status]);

  const loadData = async () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    const res = await fetch(`/api/applicants?${params.toString()}`);
    setData(await res.json());
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Applicants List</h1>
        <Link href="/applicants/new" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">New Applicant</Link>
      </div>

      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="Search by name..." className="border p-2 rounded flex-1 focus:ring focus:border-indigo-300 outline-none" value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="border p-2 rounded focus:ring focus:border-indigo-300 outline-none" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="APPLIED">Applied</option>
          <option value="ALLOCATED">Allocated</option>
          <option value="CONFIRMED">Confirmed</option>
        </select>
      </div>

      <div className="bg-white rounded shadow-sm border overflow-x-auto">
        <table className="w-full text-left bg-white text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Program</th>
              <th className="p-4">Quota</th>
              <th className="p-4">Marks</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 text-gray-500">#{item.id}</td>
                <td className="p-4 font-semibold text-gray-900">{item.name}</td>
                <td className="p-4 text-gray-700">{item.program?.code}</td>
                <td className="p-4 text-gray-700">{item.quotaType}</td>
                <td className="p-4 text-gray-700">{item.marks}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    item.seatStatus === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    item.seatStatus === 'ALLOCATED' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.seatStatus}
                  </span>
                </td>
                <td className="p-4 space-x-3">
                  <Link href={`/applicants/${item.id}`} className="text-indigo-600 hover:text-indigo-900 hover:underline font-medium">View</Link>
                  {item.seatStatus === 'APPLIED' && (
                    <Link href={`/allocate/${item.id}`} className="text-orange-600 hover:text-orange-900 hover:underline font-medium">Allocate</Link>
                  )}
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-gray-500">No applicants found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
