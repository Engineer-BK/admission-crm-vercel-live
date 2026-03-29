'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function SeatMatrixPage() {
  const [data, setData] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [form, setForm] = useState({ 
    programId: '', totalIntake: 0, kcetSeats: 0, comedkSeats: 0, mgmtSeats: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [smRes, progRes] = await Promise.all([
      fetch('/api/seat-matrix'),
      fetch('/api/programs')
    ]);
    setData(await smRes.json());
    setPrograms(await progRes.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(form.kcetSeats) + Number(form.comedkSeats) + Number(form.mgmtSeats) !== Number(form.totalIntake)) {
      toast.error("Quota constraints failed: Quota sum must equal total intake!");
      return;
    }

    setLoading(true);
    const res = await fetch('/api/seat-matrix', {
      method: 'POST', body: JSON.stringify(form)
    });
    setLoading(false);
    if (res.ok) {
      toast.success('Seat matrix updated!');
      setForm({ programId: '', totalIntake: 0, kcetSeats: 0, comedkSeats: 0, mgmtSeats: 0 });
      loadData();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to update');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Seat Matrix Setup</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 border">
        <div className="md:col-span-5"><label className="block text-sm font-medium mb-1">Select Program</label>
        <Select required value={form.programId} onChange={e=>setForm({...form,programId:e.target.value})}>
            <option value="">Select Program</option>{programs.map(p=><option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}
        </Select></div>
        
        <div><label className="block text-sm font-medium mb-1">Total Intake</label><Input required type="number" min="0" value={form.totalIntake} onChange={e=>setForm({...form,totalIntake:parseInt(e.target.value)||0})} /></div>
        <div><label className="block text-sm font-medium mb-1">KCET Quota</label><Input required type="number" min="0" value={form.kcetSeats} onChange={e=>setForm({...form,kcetSeats:parseInt(e.target.value)||0})} /></div>
        <div><label className="block text-sm font-medium mb-1">COMEDK Quota</label><Input required type="number" min="0" value={form.comedkSeats} onChange={e=>setForm({...form,comedkSeats:parseInt(e.target.value)||0})} /></div>
        <div><label className="block text-sm font-medium mb-1">Mgmt Quota</label><Input required type="number" min="0" value={form.mgmtSeats} onChange={e=>setForm({...form,mgmtSeats:parseInt(e.target.value)||0})} /></div>
        
        <div className="flex items-end"><Button disabled={loading} type="submit" className="w-full">{loading ? 'Saving...' : 'Update Matrix'}</Button></div>
      </form>

      <div className="bg-white rounded shadow-sm border overflow-x-auto">
        <table className="w-full text-left bg-white text-sm">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-4">Program</th><th className="p-4">Total Intake</th><th className="p-4">KCET (Filled/Total)</th><th className="p-4">COMEDK (Filled/Total)</th><th className="p-4">Mgmt (Filled/Total)</th></tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-semibold">{item.program?.code}</td>
                <td className="p-4">{item.totalIntake}</td>
                <td className="p-4">{item.kcetFilled} / {item.kcetSeats}</td>
                <td className="p-4">{item.comedkFilled} / {item.comedkSeats}</td>
                <td className="p-4">{item.mgmtFilled} / {item.mgmtSeats}</td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-500">No seat matrix exists</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
