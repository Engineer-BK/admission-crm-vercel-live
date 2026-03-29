import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden bg-slate-50">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse transition duration-[10000ms]"></div>
      <div className="absolute top-0 -right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse transition duration-[15000ms]"></div>
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse transition duration-[8000ms]"></div>
      
      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-24 pb-24">
        
        <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-md border border-gray-200/50 text-indigo-800 px-4 py-2 rounded-full text-xs font-black tracking-widest shadow-sm mb-10">
          <span className="relative flex h-2.5 w-2.5 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
          </span>
          PLATFORM V1.0 LIVE
        </div>
        
        <h1 className="text-6xl md:text-[5.5rem] font-black text-gray-900 mb-8 tracking-tighter leading-[1.1]">
          Streamline Your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 drop-shadow-sm">Admissions Process</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
          The ultimate intelligent CRM built specifically for educational institutions. Handle setups, track applicants, and automatically enforce seat quotas with atomic precision.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24">
          <Link href="/dashboard" className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-indigo-600 font-pj rounded-2xl hover:bg-indigo-700 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1 overflow-hidden ring-1 ring-indigo-500/50">
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative">Access Dashboard</span>
            <svg className="relative ml-3 w-6 h-6 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
          <Link href="/setup/institution" className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-gray-700 transition-all duration-300 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl hover:bg-white hover:text-indigo-600 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1">
            System Setup
          </Link>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-12 mx-auto max-w-6xl text-left">
          {/* Card 1 */}
          <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:shadow-[0_8px_40px_rgb(79,70,229,0.12)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">⚙️</div>
            <h3 className="font-extrabold text-gray-900 mb-4 text-2xl tracking-tight">Master Config</h3>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">Design hierarchy trees from institutions down to programs, defining strict real-time seat matrices.</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:shadow-[0_8px_40px_rgb(59,130,246,0.12)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">👥</div>
            <h3 className="font-extrabold text-gray-900 mb-4 text-2xl tracking-tight">Officer Portal</h3>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">Process applicants safely. Verify documents, collect fees, and execute guaranteed atomic allocations.</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:shadow-[0_8px_40px_rgb(168,85,247,0.12)] transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">📊</div>
            <h3 className="font-extrabold text-gray-900 mb-4 text-2xl tracking-tight">Live Analytics</h3>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">Get a 360-degree interactive overview of filled vs remaining seats across all quotas and programs.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
