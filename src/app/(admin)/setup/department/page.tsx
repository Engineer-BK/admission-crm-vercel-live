'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function DepartmentPage() {
  const [data, setData] = useState<any[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', campusId: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [deptRes, instRes] = await Promise.all([
      fetch('/api/departments'),
      fetch('/api/institutions')
    ]);
    setData(await deptRes.json());
    
    // Extract campuses from institutions
    const insts = await instRes.json();
    const allCampuses = insts.flatMap((i:any) => i.campuses.map((c:any) => ({ ...c, instName: i.name })));
    setCampuses(allCampuses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/departments', {
      method: 'POST', body: JSON.stringify(form)
    });
    setLoading(false);
    if (res.ok) {
      toast.success('Department saved!');
      setForm({ name: '', campusId: '' });
      loadData();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to save');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Department Setup</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 border">
        <div><label className="block text-sm font-medium mb-1">Department Name</label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Computer Science" /></div>
        <div><label className="block text-sm font-medium mb-1">Campus</label><Select required value={form.campusId} onChange={e=>setForm({...form,campusId:e.target.value})}><option value="">Select Campus</option>{campuses.map(c=><option key={c.id} value={c.id}>{c.name} ({c.instName})</option>)}</Select></div>
        <div className="md:col-span-2 flex justify-end"><Button disabled={loading} type="submit">{loading ? 'Saving...' : 'Save Department'}</Button></div>
      </form>

      <div className="bg-white rounded shadow-sm border overflow-hidden">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-4">Name</th><th className="p-4">Campus</th><th className="p-4">Institution</th></tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4">{item.name}</td><td className="p-4">{item.campus?.name}</td><td className="p-4">{item.campus?.institution?.name}</td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-gray-500">No data found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
