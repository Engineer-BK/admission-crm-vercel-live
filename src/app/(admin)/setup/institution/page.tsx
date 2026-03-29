'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function InstitutionPage() {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', code: '', campusName: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch('/api/institutions');
    setData(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/institutions', {
      method: 'POST', body: JSON.stringify(form)
    });
    setLoading(false);
    if (res.ok) {
      toast.success('Institution saved!');
      setForm({ name: '', code: '', campusName: '' });
      loadData();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to save');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Institution Setup</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 border">
        <div><label className="block text-sm font-medium mb-1">Institution Name</label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Technical University"/></div>
        <div><label className="block text-sm font-medium mb-1">Institution Code</label><Input required value={form.code} onChange={e=>setForm({...form,code:e.target.value})} placeholder="e.g. TECH"/></div>
        <div><label className="block text-sm font-medium mb-1">Default Campus</label><Input required value={form.campusName} onChange={e=>setForm({...form,campusName:e.target.value})} placeholder="e.g. South Campus"/></div>
        <div className="md:col-span-3 flex justify-end"><Button disabled={loading} type="submit">{loading ? "Saving..." : "Save Institution"}</Button></div>
      </form>

      <div className="bg-white rounded shadow-sm border overflow-hidden">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-4">Name</th><th className="p-4">Code</th><th className="p-4">Campuses</th></tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4">{item.name}</td><td className="p-4">{item.code}</td><td className="p-4">{item.campuses?.map((c:any)=>c.name).join(', ')}</td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-gray-500">No data found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
