'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Users, Target, Book, Wrench, ClipboardList, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PTB1Modul8() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('deskripsi');
  
  // Tugas Awal states
  const [tugasAwalData, setTugasAwalData] = useState({
    nama: '',
    nim: '',
    linkTugas: ''
  });
  const [tugasAwalLoading, setTugasAwalLoading] = useState(false);
  const [tugasAwalSubmitted, setTugasAwalSubmitted] = useState(false);
  
  // Presensi states
  const [presensiData, setPresensiData] = useState({
    nama: '',
    nim: '',
    kelompok: '',
    confirm: false
  });
  const [presensiLoading, setPresensiLoading] = useState(false);
  const [presensiSubmitted, setPresensiSubmitted] = useState(false);

  const moduleInfo = {
    title: "PTB1 - Modul 8",
    subtitle: "Sistem Pencitraan Medis dan Radiologi",
    description: "Modul ini membahas tentang teknologi pencitraan medis, sistem X-ray, CT scan, MRI, ultrasound, dan prinsip kerja peralatan radiologi modern.",
    modulId: "ptb1-modul8"
  };

  // Handle tugas awal submission
  const handleTugasAwalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTugasAwalLoading(true);

    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        alert('Silakan login terlebih dahulu');
        return;
      }

      const user = JSON.parse(userData);

      const response = await fetch('/api/tugas-awal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          modulId: moduleInfo.modulId,
          nama: tugasAwalData.nama,
          nim: tugasAwalData.nim,
          linkTugas: tugasAwalData.linkTugas,
          userRole: user.role
        })
      });

      const result = await response.json();

      if (response.ok) {
        setTugasAwalSubmitted(true);
        alert('Tugas awal berhasil disubmit!');
      } else {
        alert(result.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Submit tugas awal error:', error);
      alert('Terjadi kesalahan saat submit tugas awal');
    } finally {
      setTugasAwalLoading(false);
    }
  };

  // Handle presensi submission
  const handlePresensiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!presensiData.confirm) {
      alert('Silakan centang konfirmasi terlebih dahulu');
      return;
    }

    setPresensiLoading(true);

    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        alert('Silakan login terlebih dahulu');
        return;
      }

      const user = JSON.parse(userData);

      const response = await fetch('/api/presensi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          modulId: moduleInfo.modulId,
          nama: presensiData.nama,
          nim: presensiData.nim,
          kelompok: presensiData.kelompok,
          userRole: user.role
        })
      });

      const result = await response.json();

      if (response.ok) {
        setPresensiSubmitted(true);
        alert('Presensi berhasil disubmit!');
      } else {
        alert(result.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Submit presensi error:', error);
      alert('Terjadi kesalahan saat submit presensi');
    } finally {
      setPresensiLoading(false);
    }
  };

  const menuItems = [
    { id: 'deskripsi', label: 'Deskripsi', icon: FileText },
    { id: 'tujuan', label: 'Tujuan Praktikum', icon: Target },
    { id: 'dasar-teori', label: 'Dasar Teori', icon: Book },
    { id: 'alat-bahan', label: 'Alat & Bahan', icon: Wrench },
    { id: 'prosedur', label: 'Prosedur', icon: ClipboardList },
    { id: 'tugas-awal', label: 'Tugas Awal', icon: Download },
    { id: 'presensi', label: 'Presensi', icon: Users }
  ];

  const ComingSoonSection = ({ title }: { title: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">Akan segera tersedia. Stay tuned untuk update selanjutnya!</p>
        <div className="text-sm text-orange-600 bg-orange-100 px-4 py-2 rounded-full inline-block">
          Coming Soon ⏳
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'deskripsi':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose max-w-none"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-8">Deskripsi Modul</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#E64A19]">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {moduleInfo.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <div className="text-blue-600 font-bold text-lg">Durasi</div>
                  <div className="text-gray-700 text-xl">3 jam</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <div className="text-green-600 font-bold text-lg">Tingkat</div>
                  <div className="text-gray-700 text-xl">Lanjutan</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <div className="text-purple-600 font-bold text-lg">Praktikan</div>
                  <div className="text-gray-700 text-xl">Max 20 orang</div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'tujuan':
        return <ComingSoonSection title="Tujuan Praktikum" />;
      
      case 'dasar-teori':
        return <ComingSoonSection title="Dasar Teori" />;
      
      case 'alat-bahan':
        return <ComingSoonSection title="Alat & Bahan" />;
      
      case 'prosedur':
        return <ComingSoonSection title="Prosedur Percobaan" />;

      case 'tugas-awal':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-8">Tugas Awal</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#E64A19]">
              
              {/* Download Section */}
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Download & Submit Tugas Awal PTB1 - Modul 8
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Download, kerjakan tugas awal, lalu submit link hasil pekerjaan Anda di bawah ini.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h4 className="font-bold text-blue-800 mb-4 text-lg">📋 Petunjuk:</h4>
                <ul className="text-blue-700 space-y-2 text-base">
                  <li>• Download file tugas dari link yang disediakan</li>
                  <li>• Kerjakan dengan teliti dan lengkapi semua bagian</li>
                  <li>• Upload hasil pekerjaan ke Google Drive/OneDrive</li>
                  <li>• Submit link file hasil pekerjaan di form di bawah</li>
                  <li>• Deadline: Sebelum praktikum dimulai</li>
                </ul>
              </div>

              <div className="mb-8">
                <Link 
                  href="https://six.itb.ac.id/pub/kur2024/matakuliah/54040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-4 bg-linear-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Tugas Awal</span>
                </Link>
                
                <div className="mt-4 text-gray-500">
                  <p className="text-base">🔗 Link: six.itb.ac.id/pub/kur2024/matakuliah/54040</p>
                </div>
              </div>

              {/* Submission Form */}
              {!tugasAwalSubmitted ? (
                <form onSubmit={handleTugasAwalSubmit} className="space-y-6">
                  <div className="border-t pt-8">
                    <h4 className="text-xl font-bold text-gray-800 mb-6">Submit Tugas Awal</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-3">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          required
                          value={tugasAwalData.nama}
                          onChange={(e) => setTugasAwalData(prev => ({ ...prev, nama: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-3">
                          NIM *
                        </label>
                        <input
                          type="text"
                          required
                          value={tugasAwalData.nim}
                          onChange={(e) => setTugasAwalData(prev => ({ ...prev, nim: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                          placeholder="Masukkan NIM"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-base font-semibold text-gray-700 mb-3">
                        Link Tugas Awal *
                      </label>
                      <input
                        type="url"
                        required
                        value={tugasAwalData.linkTugas}
                        onChange={(e) => setTugasAwalData(prev => ({ ...prev, linkTugas: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        placeholder="https://drive.google.com/file/d/... atau https://onedrive.live.com/..."
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        Pastikan link dapat diakses oleh publik atau dengan akses ITB
                      </p>
                    </div>

                    <button 
                      type="submit" 
                      disabled={tugasAwalLoading}
                      className="w-full bg-linear-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {tugasAwalLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-6 h-6" />
                          <span>Submit Tugas Awal</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="border-t pt-8 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Tugas Awal Sudah Disubmit</h4>
                  <p className="text-green-600">Terima kasih! Tugas awal Anda sudah berhasil disubmit.</p>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'presensi':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-8">Presensi Praktikum</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#E64A19]">
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Absensi PTB1 - Modul 8
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Lakukan presensi untuk konfirmasi kehadiran praktikum.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h4 className="font-bold text-yellow-800 mb-4 text-lg">⚠️ Penting:</h4>
                <ul className="text-yellow-700 space-y-2 text-base">
                  <li>• Presensi hanya dapat dilakukan pada saat praktikum</li>
                  <li>• Pastikan Anda sudah mengerjakan tugas awal</li>
                  <li>• Terlambat lebih dari 15 menit tidak dapat mengikuti praktikum</li>
                </ul>
              </div>

              {!presensiSubmitted ? (
                <form onSubmit={handlePresensiSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <label className="block text-base font-semibold text-gray-700 mb-3">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={presensiData.nama}
                        onChange={(e) => setPresensiData(prev => ({ ...prev, nama: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <label className="block text-base font-semibold text-gray-700 mb-3">
                        NIM *
                      </label>
                      <input
                        type="text"
                        required
                        value={presensiData.nim}
                        onChange={(e) => setPresensiData(prev => ({ ...prev, nim: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        placeholder="Masukkan NIM"
                      />
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <label className="block text-base font-semibold text-gray-700 mb-3">
                      Kelompok Praktikum *
                    </label>
                    <select 
                      required
                      value={presensiData.kelompok}
                      onChange={(e) => setPresensiData(prev => ({ ...prev, kelompok: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    >
                      <option value="">Pilih kelompok</option>
                      <option value="A">Kelompok A</option>
                      <option value="B">Kelompok B</option>
                      <option value="C">Kelompok C</option>
                      <option value="D">Kelompok D</option>
                    </select>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <label className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={presensiData.confirm}
                        onChange={(e) => setPresensiData(prev => ({ ...prev, confirm: e.target.checked }))}
                        className="w-5 h-5 text-blue-600" 
                      />
                      <span className="text-base text-gray-700">
                        Saya confirm telah mengerjakan tugas awal dan siap mengikuti praktikum *
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={presensiLoading}
                    className="w-full bg-linear-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {presensiLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        <span>Submit Presensi</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Presensi Sudah Disubmit</h4>
                  <p className="text-green-600">Terima kasih! Presensi Anda sudah berhasil dicatat.</p>
                </div>
              )}
            </div>
          </motion.div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex flex-col text-[#1a1a1a] relative">
      {/* ====== HERO SECTION ====== */}
      <section className="relative h-screen w-full">
        <Image
          src="/GambarLab2.png"
          alt={moduleInfo.title}
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Link 
              href="/praktikum" 
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Praktikum</span>
            </Link>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="text-5xl lg:text-6xl font-extrabold text-white max-w-4xl leading-tight"
          >
            {moduleInfo.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-white/90 mt-4 max-w-2xl"
          >
            {moduleInfo.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ====== MAIN CONTENT + SIDEBAR WRAPPER ====== */}
      <section
        className="
          relative md:-mt-90 z-30
          flex flex-col md:flex-row 
          w-full max-w-8xl mx-auto 
        "
      >
        {/* ====== SIDEBAR ====== */}
        <motion.aside
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="
            bg-[#FAF6EF]
            px-30 py-12
            w-full md:w-1/4
            md:min-h-[700px]
            h-fit
          "
        >
          <div className="flex justify-between items-center md:block">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl md:text-2xl font-extrabold text-[#E64A19] mb-0 md:mb-4"
            >
              Menu
            </motion.h2>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden flex items-center gap-1 font-bold text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              More <ChevronDown size={18} />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col gap-6 font-semibold text-gray-700 text-left mt-8`}
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 + (index * 0.1) }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-3 text-left text-base py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'text-[#E64A19] bg-orange-50 border-l-4 border-[#E64A19]' 
                      : 'hover:text-[#E64A19] hover:bg-orange-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
            
            <div className="hidden md:block flex-1 min-h-[200px]"></div>
          </motion.div>
        </motion.aside>

        {/* ====== MAIN CONTENT ====== */}
        <motion.main 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex-1 relative mt-10 md:mt-30 bg-[#FAF6EF] px-6 md:px-12 md:py-10"
        >
          <div className="w-full mx-auto flex flex-col gap-10">
            {renderContent()}
          </div>
        </motion.main>
      </section>
    </main>
  );
}
