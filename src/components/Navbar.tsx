'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/context/RoleContext';

export default function Navbar() {
  const { role, setRole } = useRole();
  const roles = ['Admin', 'Officer', 'Management'];
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_role');
      if (stored && roles.includes(stored)) {
        setRole(stored);
      } else {
        setRole('Admin');
      }
    }
  }, [setRole]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);
    localStorage.setItem('crm_role', newRole);
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href || pathname.startsWith(href + '/');
    return (
      <Link 
        href={href} 
        className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full
          ${isActive ? 'text-indigo-700 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}
        `}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-10">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white font-black text-xl group-hover:scale-105 transition-transform duration-300">E</div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">Admission<span className="text-indigo-600">APP</span></span>
            </Link>
            
            <div className="hidden md:flex space-x-2 items-center">
              {role === 'Admin' && (
                <>
                  <NavLink href="/setup/institution">Institutions</NavLink>
                  <NavLink href="/setup/department">Departments</NavLink>
                  <NavLink href="/setup/program">Programs</NavLink>
                  <NavLink href="/setup/seat-matrix">Seat Matrix</NavLink>
                </>
              )}
              {role === 'Officer' && (
                <>
                  <NavLink href="/applicants"  >Applicants List</NavLink>
                  <NavLink href="/applicants/new">New Application</NavLink>
                </>
              )}
              {role === 'Management' && (
                <NavLink href="/dashboard">Live Dashboard</NavLink>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-50/80 border border-gray-200 rounded-full py-1.5 px-4 shadow-inner">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-3">Role</span>
              <select 
                value={role || ''} 
                onChange={handleRoleChange}
                className="bg-transparent text-sm font-bold text-indigo-700 focus:outline-none cursor-pointer appearance-none pr-5 hover:text-indigo-800 transition"
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f46e5' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '1.2em' }}
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
