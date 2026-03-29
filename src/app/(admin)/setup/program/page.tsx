'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function ProgramPage() {
  const [data, setData] = useState<any[]>([]);
  const [depts, setDepts] = useState<any[]>([]);
  const [form, setForm] = useState({ 
    name: '', code: '', deptId: '', courseType: 'UG', entryType: 'Regular', admissionMode: 'Government', academicYear: '2025-26' 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [progRes, deptRes] = await Promise.all([
      fetch('/api/programs'),
      fetch('/api/departments')
    ]);
    setData(await progRes.json());
    setDepts(await deptRes.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/programs', {
      method: 'POST', body: JSON.stringify(form)
    });
    setLoading(false);
    if (res.ok) {
      toast.success('Program saved!');
      setForm({ ...form, name: '', code: '' });
      loadData();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to save');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Program Setup</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 border">
        <div><label className="block text-sm font-medium mb-1">Program Name</label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Computer Science and Engineering" /></div>
        <div><label className="block text-sm font-medium mb-1">Code</label><Input required value={form.code} onChange={e=>setForm({...form,code:e.target.value})} placeholder="e.g. CSE" /></div>
        <div><label className="block text-sm font-medium mb-1">Department</label><Select required value={form.deptId} onChange={e=>setForm({...form,deptId:e.target.value})}><option value="">Select Dept</option>{depts.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</Select></div>
        
        <div><label className="block text-sm font-medium mb-1">Course Type</label><Select required value={form.courseType} onChange={e=>setForm({...form,courseType:e.target.value})}><option value="UG">UG</option><option value="PG">PG</option></Select></div>
        <div><label className="block text-sm font-medium mb-1">Entry Type</label><Select required value={form.entryType} onChange={e=>setForm({...form,entryType:e.target.value})}><option value="Regular">Regular</option><option value="Lateral">Lateral</option></Select></div>
        <div><label className="block text-sm font-medium mb-1">Admission Mode</label><Select required value={form.admissionMode} onChange={e=>setForm({...form,admissionMode:e.target.value})}><option value="Government">Government</option><option value="Management">Management</option></Select></div>
        
        <div><label className="block text-sm font-medium mb-1">Academic Year</label><Input required value={form.academicYear} onChange={e=>setForm({...form,academicYear:e.target.value})} placeholder="e.g. 2025-26" /></div>
        
        <div className="md:col-span-3 flex justify-end"><Button disabled={loading} type="submit">{loading ? 'Saving...' : 'Save Program'}</Button></div>
      </form>

      <div className="bg-white rounded shadow-sm border overflow-x-auto">
        <table className="w-full text-left bg-white text-sm">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-4">Code</th><th className="p-4">Name</th><th className="p-4">Dept</th><th className="p-4">Type</th><th className="p-4">Mode</th><th className="p-4">Year</th></tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-semibold">{item.code}</td><td className="p-4">{item.name}</td><td className="p-4">{item.dept?.name}</td>
                <td className="p-4">{item.courseType} - {item.entryType}</td><td className="p-4">{item.admissionMode}</td><td className="p-4">{item.academicYear}</td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-gray-500">No data found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
