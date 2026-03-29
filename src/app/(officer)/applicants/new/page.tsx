'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function NewApplicantPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', dob: '', gender: 'Male', email: '', phone: '',
    category: 'GM', entryType: 'Regular', quotaType: 'KCET',
    marks: '', qualifyingExam: '', allotmentNumber: '',
    address: '', fatherName: '', aadharNumber: '', programId: ''
  });

  useEffect(() => {
    fetch('/api/programs').then(r=>r.json()).then(setPrograms);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/applicants', {
      method: 'POST', body: JSON.stringify(form)
    });
    setLoading(false);
    if (res.ok) {
      toast.success('Applicant created!');
      router.push('/applicants');
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to create');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">New Applicant</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm border space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Full Name</label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Date of Birth</label><Input type="date" required value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Gender</label><Select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}><option>Male</option><option>Female</option><option>Other</option></Select></div>
            <div><label className="block text-sm font-medium mb-1">Email</label><Input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Phone</label><Input type="tel" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Father's Name</label><Input required value={form.fatherName} onChange={e=>setForm({...form,fatherName:e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Aadhar Number</label><Input required value={form.aadharNumber} onChange={e=>setForm({...form,aadharNumber:e.target.value})} /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Address</label><textarea required className="w-full border p-2 rounded focus:ring focus:border-blue-300" rows={2} value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">Academic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Category</label><Select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>GM</option><option>SC</option><option>ST</option><option>OBC</option></Select></div>
            <div><label className="block text-sm font-medium mb-1">Entry Type</label><Select value={form.entryType} onChange={e=>setForm({...form,entryType:e.target.value})}><option>Regular</option><option>Lateral</option></Select></div>
            <div><label className="block text-sm font-medium mb-1">Quota Type</label><Select value={form.quotaType} onChange={e=>setForm({...form,quotaType:e.target.value})}><option>KCET</option><option>COMEDK</option><option>Management</option></Select></div>
            <div><label className="block text-sm font-medium mb-1">Program</label><Select required value={form.programId} onChange={e=>setForm({...form,programId:e.target.value})}><option value="">Select Program</option>{programs.map(p=><option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}</Select></div>
            <div><label className="block text-sm font-medium mb-1">Marks / Percentage</label><Input type="number" step="0.01" required value={form.marks} onChange={e=>setForm({...form,marks:e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Qualifying Exam</label><Input required value={form.qualifyingExam} onChange={e=>setForm({...form,qualifyingExam:e.target.value})} /></div>
            {form.quotaType !== 'Management' && (
              <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Allotment Number (Required for Govt)</label><Input required={form.quotaType !== 'Management'} value={form.allotmentNumber} onChange={e=>setForm({...form,allotmentNumber:e.target.value})} /></div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end pt-4"><Button disabled={loading} type="submit" className="px-8 py-3 text-lg">{loading ? 'Saving...' : 'Submit Application'}</Button></div>
      </form>
    </div>
  );
}
