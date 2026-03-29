'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AllocatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch(`/api/applicants/${id}`);
    setApplicant(await res.json());
  };

  const handleAllocate = async () => {
    setLoading(true);
    const res = await fetch(`/api/allocate`, {
      method: 'POST', body: JSON.stringify({ applicantId: parseInt(id) })
    });
    setLoading(false);
    if (res.ok) {
      toast.success('Seat Successfully Allocated');
      router.push(`/applicants/${id}`);
    } else {
      const err = await res.json();
      toast.error(err.error || 'Allocation Failed');
    }
  };

  if (!applicant) return <div className="p-8 text-center text-gray-500">Loading applicant data...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto mt-10">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">🎯</div>
        <h1 className="text-3xl font-bold mb-3 text-gray-900">Seat Allocation</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">You are about to query the database and attempt to secure a seat for this applicant.</p>

        <div className="bg-gray-50 p-6 rounded-xl text-left mb-8 border border-gray-200">
          <p className="flex justify-between py-1 border-b border-gray-200"><span className="text-gray-500">Name</span> <span className="font-semibold">{applicant.name}</span></p>
          <p className="flex justify-between py-1 border-b border-gray-200"><span className="text-gray-500">Applicant ID</span> <span className="font-semibold">#{applicant.id}</span></p>
          <p className="flex justify-between py-1 border-b border-gray-200"><span className="text-gray-500">Program Linked</span> <span className="font-semibold">{applicant.program?.name} ({applicant.program?.code})</span></p>
          <p className="flex justify-between py-1 border-b border-gray-200"><span className="text-gray-500">Quota Type</span> <span className="font-semibold text-indigo-600">{applicant.quotaType}</span></p>
          <p className="flex justify-between py-1 pt-2"><span className="text-gray-500">Current Status</span> <span className="font-bold text-gray-800">{applicant.seatStatus}</span></p>
        </div>

        {applicant.seatStatus !== 'APPLIED' ? (
          <div className="text-red-600 font-bold bg-red-50 p-4 rounded-xl border border-red-100">
            This applicant has already left the APPLIED phase. (Status: {applicant.seatStatus})
          </div>
        ) : (
          <button 
            onClick={handleAllocate} 
            disabled={loading} 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-orange-500/30 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing DB Transaction...' : 'Confirm Atomic Allocation'}
          </button>
        )}
      </div>
    </div>
  );
}
