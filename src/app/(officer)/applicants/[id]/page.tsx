'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ApplicantDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [docStatus, setDocStatus] = useState('PENDING');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch(`/api/applicants/${id}`);
    const data = await res.json();
    setApplicant(data);
    setDocStatus(data.docStatus);
  };

  const updateDoc = async (status: string) => {
    setDocStatus(status);
    const res = await fetch(`/api/applicants/${id}/documents`, {
      method: 'PATCH', body: JSON.stringify({ docStatus: status })
    });
    if (res.ok) toast.success('Documents status updated to ' + status);
    else toast.error('Failed to update doc status');
    loadData();
  };

  const markFeePaid = async () => {
    const res = await fetch(`/api/applicants/${id}/fee`, { method: 'PATCH' });
    if (res.ok) { toast.success('Fee marked as PAID'); loadData(); }
    else toast.error('Failed to update fee');
  };

  const confirmAdmission = async () => {
    setLoading(true);
    const res = await fetch(`/api/applicants/${id}/confirm`, { method: 'POST' });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      toast.success('Admissions Confirmed! Number: ' + data.admissionNumber);
      loadData();
    } else {
      const err = await res.json();
      toast.error(err.error);
    }
  };

  if (!applicant) return <div className="p-8 text-center text-gray-500">Loading applicant data...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{applicant.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Applicant ID: #{applicant.id} | {applicant.program?.name}</p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1.5 rounded-md text-sm font-bold uppercase tracking-wide
            ${applicant.seatStatus === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
              applicant.seatStatus === 'ALLOCATED' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}>
            {applicant.seatStatus}
          </span>
        </div>
      </div>

      {applicant.admissionNumber && (
        <div className="bg-green-50 border border-green-200 text-green-900 px-6 py-4 rounded-lg relative shadow-sm">
          <strong>Admission Confirmed &mdash; </strong> Admission Number: 
          <span className="font-mono ml-2 text-xl font-bold bg-white px-2 py-1 rounded">{applicant.admissionNumber}</span>
        </div>
      )}

      {applicant.seatStatus === 'APPLIED' && (
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg text-center shadow-sm mb-6 mt-6">
          <h2 className="text-xl font-bold mb-2 text-orange-900">Seat Allocation Pending</h2>
          <p className="text-orange-700 mb-4">You need to allocate a seat for this applicant before verifying documents or confirming admission.</p>
          <button 
            onClick={() => router.push(`/allocate/${id}`)}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition"
          >
            Go to Seat Allocation Action
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Document Verification</h2>
          <select 
            value={docStatus} 
            onChange={(e) => updateDoc(e.target.value)} 
            className="w-full border border-gray-200 p-2.5 rounded-lg mb-4 bg-gray-50 focus:ring focus:ring-indigo-100" 
            disabled={applicant.seatStatus === 'CONFIRMED'}
          >
            <option value="PENDING">Pending Update</option>
            <option value="SUBMITTED">Documents Submitted</option>
            <option value="VERIFIED">Documents Verified</option>
          </select>
          <ul className="text-sm space-y-2 text-gray-600 bg-gray-50 p-4 rounded-lg">
            <li className="flex items-center space-x-2"><span className="text-green-500">✓</span><span>10th Marksheet</span></li>
            <li className="flex items-center space-x-2"><span className="text-green-500">✓</span><span>12th Marksheet / Diploma</span></li>
            <li className="flex items-center space-x-2"><span className="text-green-500">✓</span><span>Category Certificate</span></li>
            <li className="flex items-center space-x-2"><span className="text-green-500">✓</span><span>Government ID Proof</span></li>
            <li className="flex items-center space-x-2"><span className="text-green-500">✓</span><span>Passport Photo</span></li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Fee Status</h2>
            <div className={`p-6 rounded-xl text-center font-bold text-2xl tracking-widest uppercase mb-4 shadow-inner 
              ${applicant.feeStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {applicant.feeStatus}
            </div>
          </div>
          {applicant.feeStatus !== 'PAID' && (
            <button onClick={markFeePaid} className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Mark Fee as Paid
            </button>
          )}
        </div>
      </div>

      {applicant.seatStatus === 'ALLOCATED' && !applicant.admissionNumber && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-indigo-100 mt-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-indigo-900">Final Step: Confirm Admission</h2>
          <p className="text-indigo-600 mb-6 font-medium">Generates immutable admission number. Requires fee PAID and docs VERIFIED.</p>
          <button 
            disabled={applicant.feeStatus !== 'PAID' || applicant.docStatus !== 'VERIFIED' || loading} 
            onClick={confirmAdmission} 
            className="bg-indigo-600 disabled:bg-gray-400 disabled:shadow-none hover:shadow-lg hover:-translate-y-0.5 disabled:translate-y-0 transition-all text-white px-8 py-4 rounded-xl text-lg font-bold w-full"
          >
            {loading ? 'Generating Immutable Record...' : 'Confirm Final Admission'}
          </button>
        </div>
      )}
    </div>
  );
}
