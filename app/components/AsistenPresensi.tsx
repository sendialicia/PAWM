import React, { useState, useEffect, useCallback } from 'react';

interface Presensi {
  id: string;
  userId: string;
  modulId: string;
  kelompok: string;
  status: 'HADIR' | 'TIDAK_HADIR' | 'TERLAMBAT';
  waktuPresensi: Date;
  keterangan?: string;
  createdAt: Date;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface StatistikKelompok {
  total: number;
  hadir: number;
  terlambat: number;
  tidakHadir: number;
}

interface AsistenPresensiProps {
  modulId: string;
  userRole: string;
}

const AsistenPresensi: React.FC<AsistenPresensiProps> = ({ modulId, userRole }) => {
  const [presensiList, setPresensiList] = useState<Presensi[]>([]);
  const [statistik, setStatistik] = useState<Record<string, StatistikKelompok>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPresensi, setEditingPresensi] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<'HADIR' | 'TIDAK_HADIR' | 'TERLAMBAT'>('HADIR');
  const [keterangan, setKeterangan] = useState('');

  // Fetch data presensi
  const fetchPresensiList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/asisten/presensi?modulId=${modulId}&userRole=${userRole}`);
      const data = await response.json();

      if (data.success) {
        setPresensiList(data.data);
        setStatistik(data.statistik || {});
      } else {
        setError(data.error || 'Failed to fetch presensi list');
      }
    } catch (err) {
      setError('Network error');
      console.error('Fetch presensi error:', err);
    } finally {
      setLoading(false);
    }
  }, [modulId, userRole]);

  // Update status presensi
  const handleUpdateStatus = async (presensiId: string) => {
    try {
      const response = await fetch('/api/asisten/presensi', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          presensiId,
          status: newStatus,
          keterangan,
          userRole
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setPresensiList(prev => prev.map(presensi => 
          presensi.id === presensiId 
            ? { ...presensi, status: newStatus, keterangan }
            : presensi
        ));
        setEditingPresensi(null);
        setKeterangan('');
        alert('Status presensi berhasil diupdate!');
        // Refresh untuk update statistik
        fetchPresensiList();
      } else {
        alert(data.error || 'Gagal mengupdate status presensi');
      }
    } catch (err) {
      alert('Network error');
      console.error('Update presensi error:', err);
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HADIR':
        return 'bg-green-100 text-green-800';
      case 'TERLAMBAT':
        return 'bg-yellow-100 text-yellow-800';
      case 'TIDAK_HADIR':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HADIR':
        return '✅';
      case 'TERLAMBAT':
        return '⚠️';
      case 'TIDAK_HADIR':
        return '❌';
      default:
        return '❓';
    }
  };

  useEffect(() => {
    if (userRole === 'ASISTEN') {
      fetchPresensiList();
    }
  }, [userRole, fetchPresensiList]);

  // Hanya tampilkan untuk asisten
  if (userRole !== 'ASISTEN') {
    return null;
  }

  if (loading) {
    return (
      <div className="mt-8 p-6 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-4">📋 Manajemen Presensi</h3>
        <p className="text-green-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4">📋 Manajemen Presensi</h3>
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={fetchPresensiList}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-4">📋 Manajemen Presensi</h3>
      
      {presensiList.length === 0 ? (
        <p className="text-green-600">Belum ada presensi untuk modul ini.</p>
      ) : (
        <div className="space-y-6">
          {/* Statistik */}
          {Object.keys(statistik).length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-3">📊 Statistik per Kelompok</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(statistik).map(([kelompok, stats]) => (
                  <div key={kelompok} className="bg-gray-50 p-3 rounded">
                    <p className="font-medium text-gray-800">👥 Kelompok {kelompok}</p>
                    <div className="text-sm mt-2 space-y-1">
                      <p>✅ Hadir: {stats.hadir}</p>
                      <p>⚠️ Terlambat: {stats.terlambat}</p>
                      <p>❌ Tidak Hadir: {stats.tidakHadir}</p>
                      <p className="font-medium">Total: {stats.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daftar Presensi */}
          <div className="text-sm text-green-600 mb-4">
            Total Presensi: {presensiList.length} record
          </div>
          
          <div className="space-y-4">
            {presensiList.map((presensi) => (
              <div key={presensi.id} className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-800">
                      📧 {presensi.user.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      👥 Kelompok: {presensi.kelompok}
                    </p>
                    <p className="text-xs text-gray-500">
                      📅 Waktu Presensi: {new Date(presensi.waktuPresensi).toLocaleString('id-ID')}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(presensi.status)}`}>
                      {getStatusIcon(presensi.status)} {presensi.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                {presensi.keterangan && (
                  <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
                    <strong>Keterangan:</strong> {presensi.keterangan}
                  </div>
                )}
                
                {editingPresensi === presensi.id ? (
                  <div className="mt-3 p-3 bg-gray-50 rounded space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Status:</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as 'HADIR' | 'TIDAK_HADIR' | 'TERLAMBAT')}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="HADIR">✅ Hadir</option>
                        <option value="TERLAMBAT">⚠️ Terlambat</option>
                        <option value="TIDAK_HADIR">❌ Tidak Hadir</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Keterangan (opsional):</label>
                      <input
                        type="text"
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                        placeholder="Masukkan keterangan..."
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(presensi.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        ✅ Update
                      </button>
                      <button
                        onClick={() => {
                          setEditingPresensi(null);
                          setKeterangan(presensi.keterangan || '');
                          setNewStatus(presensi.status);
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                      >
                        ❌ Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        setEditingPresensi(presensi.id);
                        setNewStatus(presensi.status);
                        setKeterangan(presensi.keterangan || '');
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      ✏️ Edit Status
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AsistenPresensi;
