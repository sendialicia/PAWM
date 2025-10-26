"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface User {
  id: number;
  email: string;
  role: string;
}

interface Permohonan {
  id: number;
  nama: string;
  nim: string;
  email: string;
  tanggal: string;
  waktuMulai: string;
  waktuSelesai: string;
  keperluan: string;
  jumlahOrang: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  keterangan?: string;
  user: {
    email: string;
    role: string;
  };
}

interface CekPermohonanPageProps {
  user: User;
}

export default function CekPermohonanPage({ user }: CekPermohonanPageProps) {
  const [permohonan, setPermohonan] = useState<Permohonan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPermohonan, setSelectedPermohonan] = useState<Permohonan | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'APPROVED' | 'REJECTED'>('APPROVED');
  const [keterangan, setKeterangan] = useState('');

  // Load permohonan
  useEffect(() => {
    const fetchPermohonan = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/permohonan?userId=${user.id}&userRole=${user.role}`);
        const data = await response.json();
        
        if (response.ok) {
          setPermohonan(data.permohonan);
        } else {
          console.error('Error fetching permohonan:', data.error);
        }
      } catch (error) {
        console.error('Error fetching permohonan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermohonan();
  }, [user.id, user.role]);

  const refetchPermohonan = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/permohonan?userId=${user.id}&userRole=${user.role}`);
      const data = await response.json();
      
      if (response.ok) {
        setPermohonan(data.permohonan);
      } else {
        console.error('Error fetching permohonan:', data.error);
      }
    } catch (error) {
      console.error('Error fetching permohonan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedPermohonan) return;

    try {
      const response = await fetch(`/api/permohonan/${selectedPermohonan.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: updateStatus,
          approvedBy: user.email,
          keterangan,
          userRole: user.role
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh data
        refetchPermohonan();
        setShowUpdateModal(false);
        setSelectedPermohonan(null);
        setKeterangan('');
        alert('Status berhasil diupdate!');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock size={16} className="mr-1" />
            Pending
          </span>
        );
      case 'APPROVED':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle size={16} className="mr-1" />
            Approved
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle size={16} className="mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex flex-col text-[#1a1a1a] relative">
      {/* ====== HERO SECTION ====== */}
      <section className="relative h-64 w-full">
        <Image
          src="/LandingPic.png"
          alt="Cek Permohonan"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="text-4xl lg:text-5xl font-extrabold text-white max-w-4xl leading-tight"
          >
            {user.role === 'ASISTEN' ? 'Kelola Permohonan Lab' : 'Status Permohonan Anda'}
          </motion.h1>
        </div>
      </section>

      {/* ====== MAIN CONTENT ====== */}
      <section className="flex-1 relative mt-8 bg-[#FAF6EF] px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {permohonan.filter(p => p.status === 'PENDING').length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600">
                {permohonan.filter(p => p.status === 'APPROVED').length}
              </div>
              <div className="text-gray-600">Approved</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-red-600">
                {permohonan.filter(p => p.status === 'REJECTED').length}
              </div>
              <div className="text-gray-600">Rejected</div>
            </div>
          </div>

          {/* Permohonan List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {user.role === 'ASISTEN' ? 'Semua Permohonan' : 'Permohonan Anda'}
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E64A19] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            ) : permohonan.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Belum ada permohonan</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {permohonan.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-semibold text-lg text-gray-800">{item.nama}</h3>
                          {getStatusBadge(item.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">NIM:</span> {item.nim}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {item.email}
                          </div>
                          <div>
                            <span className="font-medium">Tanggal:</span> {new Date(item.tanggal).toLocaleDateString('id-ID')}
                          </div>
                          <div>
                            <span className="font-medium">Waktu:</span> {item.waktuMulai} - {item.waktuSelesai}
                          </div>
                          <div>
                            <span className="font-medium">Jumlah:</span> {item.jumlahOrang}
                          </div>
                          <div>
                            <span className="font-medium">Dibuat:</span> {new Date(item.createdAt).toLocaleDateString('id-ID')}
                          </div>
                        </div>

                        <div className="mb-3">
                          <span className="font-medium text-gray-700">Keperluan:</span>
                          <p className="text-gray-600 mt-1">{item.keperluan}</p>
                        </div>

                        {item.approvedBy && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Diproses oleh:</span> {item.approvedBy}
                            {item.approvedAt && (
                              <span className="ml-2">
                                pada {new Date(item.approvedAt).toLocaleDateString('id-ID')}
                              </span>
                            )}
                          </div>
                        )}

                        {item.keterangan && (
                          <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                            <span className="font-medium text-gray-700">Keterangan:</span>
                            <p className="text-gray-600 mt-1">{item.keterangan}</p>
                          </div>
                        )}
                      </div>

                      {user.role === 'ASISTEN' && item.status === 'PENDING' && (
                        <div className="flex flex-col gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedPermohonan(item);
                              setUpdateStatus('APPROVED');
                              setShowUpdateModal(true);
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedPermohonan(item);
                              setUpdateStatus('REJECTED');
                              setShowUpdateModal(true);
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Update Status Modal */}
      {showUpdateModal && selectedPermohonan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">
              {updateStatus === 'APPROVED' ? 'Approve' : 'Reject'} Permohonan
            </h3>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Pemohon:</span> {selectedPermohonan.nama}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Keperluan:</span> {selectedPermohonan.keperluan}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keterangan (Opsional)
              </label>
              <textarea
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                rows={3}
                placeholder="Tambahkan keterangan..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedPermohonan(null);
                  setKeterangan('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateStatus}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  updateStatus === 'APPROVED' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {updateStatus === 'APPROVED' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
