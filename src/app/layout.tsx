import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { RoleProvider } from '@/context/RoleContext';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admission CRM',
  description: 'Admission Management & CRM for Edumerge Solutions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <RoleProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Toaster position="top-right" />
        </RoleProvider>
      </body>
    </html>
  );
}
