import React, { useState, useEffect, useCallback } from 'react';

interface TugasAwal {
  id: string;
  userId: string;
  modulId: string;
  kelompok: string;
  linkTugas: string;
  nilai?: number;
  nilaiAt?: Date;
  nilaiBy?: string;
  createdAt: Date;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface AsistenTugasProps {
  modulId: string;
  userRole: string;
}

const AsistenTugas: React.FC<AsistenTugasProps> = ({ modulId, userRole }) => {
  const [tugasList, setTugasList] = useState<TugasAwal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gradingTugas, setGradingTugas] = useState<string | null>(null);
  const [nilai, setNilai] = useState<number>(0);

  // Fetch data tugas
  const fetchTugasList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/asisten/tugas-awal?modulId=${modulId}&userRole=${userRole}`);
      const data = await response.json();

      if (data.success) {
        setTugasList(data.data);
      } else {
        setError(data.error || 'Failed to fetch tugas list');
      }
    } catch (err) {
      setError('Network error');
      console.error('Fetch tugas error:', err);
    } finally {
      setLoading(false);
    }
  }, [modulId, userRole]);

  // Submit nilai
  const handleSubmitNilai = async (tugasId: string) => {
    try {
      const response = await fetch('/api/asisten/tugas-awal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tugasAwalId: tugasId,
          nilai,
          userRole,
          nilaiBy: userRole
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setTugasList(prev => prev.map(tugas => 
          tugas.id === tugasId 
            ? { ...tugas, nilai, nilaiAt: new Date(), nilaiBy: userRole }
            : tugas
        ));
        setGradingTugas(null);
        setNilai(0);
        alert('Nilai berhasil diberikan!');
      } else {
        alert(data.error || 'Gagal memberikan nilai');
      }
    } catch (err) {
      alert('Network error');
      console.error('Submit nilai error:', err);
    }
  };

  useEffect(() => {
    if (userRole === 'ASISTEN') {
      fetchTugasList();
    }
  }, [modulId, userRole, fetchTugasList]);

  // Hanya tampilkan untuk asisten
  if (userRole !== 'ASISTEN') {
    return null;
  }

  if (loading) {
    return (
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">📋 Penilaian Tugas Awal</h3>
        <p className="text-blue-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4">📋 Penilaian Tugas Awal</h3>
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={fetchTugasList}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">📋 Penilaian Tugas Awal</h3>
      
      {tugasList.length === 0 ? (
        <p className="text-blue-600">Belum ada tugas yang dikumpulkan untuk modul ini.</p>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-blue-600 mb-4">
            Total Pengumpulan: {tugasList.length} tugas
          </div>
          
          {tugasList.map((tugas) => (
            <div key={tugas.id} className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800">
                    📧 {tugas.user.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    👥 Kelompok: {tugas.kelompok}
                  </p>
                  <p className="text-xs text-gray-500">
                    📅 Dikumpulkan: {new Date(tugas.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>
                
                <div className="text-right">
                  {tugas.nilai !== null && tugas.nilai !== undefined ? (
                    <div className="text-green-600">
                      <p className="font-semibold">✅ Nilai: {tugas.nilai}</p>
                      {tugas.nilaiAt && (
                        <p className="text-xs">
                          Dinilai: {new Date(tugas.nilaiAt).toLocaleString('id-ID')}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-orange-600 font-medium">⏳ Belum dinilai</span>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <a 
                  href={tugas.linkTugas} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                >
                  🔗 {tugas.linkTugas}
                </a>
              </div>
              
              {gradingTugas === tugas.id ? (
                <div className="flex items-center gap-2 mt-3 p-3 bg-gray-50 rounded">
                  <label className="text-sm font-medium">Nilai (0-100):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={nilai}
                    onChange={(e) => setNilai(Number(e.target.value))}
                    className="w-20 px-2 py-1 border rounded text-center"
                  />
                  <button
                    onClick={() => handleSubmitNilai(tugas.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    ✅ Submit
                  </button>
                  <button
                    onClick={() => {
                      setGradingTugas(null);
                      setNilai(0);
                    }}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                  >
                    ❌ Batal
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setGradingTugas(tugas.id);
                      setNilai(tugas.nilai || 0);
                    }}
                    className={`px-3 py-1 text-sm rounded ${
                      tugas.nilai !== null && tugas.nilai !== undefined
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {tugas.nilai !== null && tugas.nilai !== undefined ? '✏️ Edit Nilai' : '📝 Beri Nilai'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AsistenTugas;
