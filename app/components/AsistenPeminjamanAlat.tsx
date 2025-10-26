'use client';

import { useState, useEffect } from 'react';

interface PeminjamanAlat {
  id: number;
  nama: string;
  nim: string;
  email: string;
  tanggalPinjam: string;
  tanggalKembali: string;
  keperluan: string;
  jumlahPinjam: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DIKEMBALIKAN';
  approvedBy?: string;
  approvedAt?: string;
  keterangan?: string;
  dikembalikanAt?: string;
  createdAt: string;
  user: {
    id: number;
    email: string;
  };
  alat: {
    id: number;
    nama: string;
    deskripsi: string;
    gambar: string;
    jumlahTotal: number;
    jumlahTersedia: number;
  };
}

export default function AsistenPeminjamanAlat() {
  const [peminjamanAlats, setPeminjamanAlats] = useState<PeminjamanAlat[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    fetchPeminjamanAlats();
  }, []);

  const fetchPeminjamanAlats = async () => {
    try {
      const response = await fetch('/api/peminjaman-alat');
      const data = await response.json();
      
      if (data.success) {
        setPeminjamanAlats(data.data);
      }
    } catch (error) {
      console.error('Error fetching peminjaman alats:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string, keterangan?: string) => {
    const user = JSON.parse(localStorage.getItem('biomedis_user') || '{}');
    
    setUpdating(id);
    
    try {
      const response = await fetch(`/api/peminjaman-alat/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          keterangan: keterangan || '',
          approvedBy: user.email
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchPeminjamanAlats(); // Refresh data
        alert(`Status berhasil diubah menjadi ${getStatusText(status)}`);
      } else {
        alert(data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Terjadi kesalahan saat mengupdate status');
    } finally {
      setUpdating(null);
    }
  };

  const handleApprove = (id: number) => {
    const keterangan = prompt('Keterangan persetujuan (opsional):');
    updateStatus(id, 'APPROVED', keterangan || undefined);
  };

  const handleReject = (id: number) => {
    const keterangan = prompt('Alasan penolakan:');
    if (keterangan) {
      updateStatus(id, 'REJECTED', keterangan);
    }
  };

  const handleReturn = (id: number) => {
    const keterangan = prompt('Keterangan pengembalian (opsional):');
    updateStatus(id, 'DIKEMBALIKAN', keterangan || undefined);
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'Menunggu Persetujuan',
      'APPROVED': 'Disetujui',
      'REJECTED': 'Ditolak',
      'DIKEMBALIKAN': 'Dikembalikan'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'APPROVED': 'bg-green-100 text-green-800',
      'REJECTED': 'bg-red-100 text-red-800',
      'DIKEMBALIKAN': 'bg-blue-100 text-blue-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredData = peminjamanAlats.filter(item => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Kelola Peminjaman Alat</h2>
        <div className="text-center py-8">
          <div className="text-gray-600">Memuat data peminjaman alat...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Kelola Peminjaman Alat</h2>
        
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">Menunggu Persetujuan</option>
            <option value="APPROVED">Disetujui</option>
            <option value="REJECTED">Ditolak</option>
            <option value="DIKEMBALIKAN">Dikembalikan</option>
          </select>
          
          <button
            onClick={fetchPeminjamanAlats}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {filter === 'ALL' 
            ? 'Belum ada peminjaman alat' 
            : `Tidak ada peminjaman alat dengan status ${getStatusText(filter)}`
          }
        </div>
      ) : (
        <div className="space-y-4">
          {filteredData.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Info Peminjam */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Data Peminjam</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Nama:</span> {item.nama}</p>
                    <p><span className="font-medium">NIM:</span> {item.nim}</p>
                    <p><span className="font-medium">Email:</span> {item.email}</p>
                    <p><span className="font-medium">Pengajuan:</span> {new Date(item.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>

                {/* Info Alat & Peminjaman */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Detail Peminjaman</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Alat:</span> {item.alat.nama}</p>
                    <p><span className="font-medium">Jumlah:</span> {item.jumlahPinjam} unit</p>
                    <p><span className="font-medium">Tanggal Pinjam:</span> {new Date(item.tanggalPinjam).toLocaleDateString('id-ID')}</p>
                    <p><span className="font-medium">Tanggal Kembali:</span> {new Date(item.tanggalKembali).toLocaleDateString('id-ID')}</p>
                    {item.keperluan && (
                      <p><span className="font-medium">Keperluan:</span> {item.keperluan}</p>
                    )}
                  </div>
                </div>

                {/* Status & Actions */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Status & Aksi</h3>
                  
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>

                  {item.approvedBy && (
                    <p className="text-xs text-gray-600 mb-2">
                      Disetujui oleh: {item.approvedBy}
                    </p>
                  )}

                  {item.keterangan && (
                    <p className="text-xs text-gray-600 mb-3 p-2 bg-gray-50 rounded">
                      <span className="font-medium">Keterangan:</span> {item.keterangan}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {item.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          disabled={updating === item.id}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          {updating === item.id ? 'Loading...' : 'Setujui'}
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          disabled={updating === item.id}
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          {updating === item.id ? 'Loading...' : 'Tolak'}
                        </button>
                      </>
                    )}
                    
                    {item.status === 'APPROVED' && (
                      <button
                        onClick={() => handleReturn(item.id)}
                        disabled={updating === item.id}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        {updating === item.id ? 'Loading...' : 'Tandai Dikembalikan'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
