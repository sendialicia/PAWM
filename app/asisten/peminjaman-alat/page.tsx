'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import AsistenPeminjamanAlat from '@/app/components/AsistenPeminjamanAlat';

export default function AsistenPeminjamanAlatPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('biomedis_user');
      if (!userData) {
        router.push('/');
        return;
      }

      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'ASISTEN') {
        alert('Akses ditolak. Halaman ini hanya untuk asisten.');
        router.push('/');
        return;
      }

      setUser(parsedUser);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Memuat...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLoginClick={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel Asisten - Peminjaman Alat</h1>
          <p className="text-gray-600">Kelola permohonan peminjaman alat laboratorium</p>
        </div>

        <AsistenPeminjamanAlat />
      </div>

      <Footer />
    </div>
  );
}
