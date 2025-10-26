'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Users, Target, Book, Wrench, ClipboardList, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PTB1Modul1New() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('deskripsi');

  const moduleInfo = {
    title: "PTB1 - Modul 1",
    subtitle: "Pengenalan Alat Biomedis Dasar",
    description: "Modul ini memperkenalkan mahasiswa pada alat-alat biomedis dasar yang digunakan dalam laboratorium dan rumah sakit."
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
                  <div className="text-gray-700 text-xl">Pemula</div>
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
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Download Tugas Awal PTB1 - Modul 1
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Silakan download dan kerjakan tugas awal sebelum praktikum dimulai. 
                    Tugas ini wajib dikumpulkan pada saat praktikum.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h4 className="font-bold text-blue-800 mb-4 text-lg">📋 Petunjuk:</h4>
                <ul className="text-blue-700 space-y-2 text-base">
                  <li>• Download file tugas dari link yang disediakan</li>
                  <li>• Kerjakan dengan teliti dan lengkapi semua bagian</li>
                  <li>• Bring hardcopy pada saat praktikum</li>
                  <li>• Deadline: Sebelum praktikum dimulai</li>
                </ul>
              </div>

              <Link 
                href="https://six.itb.ac.id/pub/kur2024/matakuliah/54040"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-4 bg-linear-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
              >
                <Download className="w-6 h-6" />
                <span>Download Tugas Awal</span>
              </Link>
              
              <div className="mt-6 text-gray-500">
                <p className="text-base">🔗 Link: six.itb.ac.id/pub/kur2024/matakuliah/54040</p>
              </div>
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
                    Absensi PTB1 - Modul 1
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

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <label className="block text-base font-semibold text-gray-700 mb-3">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <label className="block text-base font-semibold text-gray-700 mb-3">
                      NIM
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      placeholder="Masukkan NIM"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Kelompok Praktikum
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base">
                    <option value="">Pilih kelompok</option>
                    <option value="A">Kelompok A</option>
                    <option value="B">Kelompok B</option>
                    <option value="C">Kelompok C</option>
                    <option value="D">Kelompok D</option>
                  </select>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="w-5 h-5 text-blue-600" />
                    <span className="text-base text-gray-700">
                      Saya confirm telah mengerjakan tugas awal dan siap mengikuti praktikum
                    </span>
                  </label>
                </div>

                <button className="w-full bg-linear-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl">
                  <CheckCircle className="w-6 h-6" />
                  <span>Submit Presensi</span>
                </button>
              </div>
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
          src="/GambarLab1.png"
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
