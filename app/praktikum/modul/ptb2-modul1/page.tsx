'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Users, Target, Book, Wrench, ClipboardList, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PTB2Modul1() {
  const [activeSection, setActiveSection] = useState('deskripsi');

  const moduleInfo = {
    title: "PTB2 - Modul 1",
    subtitle: "Sistem Imaging Medis",
    image: "/GambarLab1.png",
    description: "Modul ini membahas tentang teknologi imaging medis seperti X-ray, CT scan, dan MRI serta prinsip kerja dan aplikasinya dalam dunia medis."
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Deskripsi Modul</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-gray-700 leading-relaxed">
                {moduleInfo.description}
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold">Durasi</div>
                  <div className="text-gray-700">4 jam</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 font-semibold">Tingkat</div>
                  <div className="text-gray-700">Lanjutan</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-purple-600 font-semibold">Praktikan</div>
                  <div className="text-gray-700">Max 12 orang</div>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tugas Awal</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Download Tugas Awal PTB2 - Modul 1
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Silakan download dan kerjakan tugas awal sebelum praktikum dimulai. 
                    Tugas ini wajib dikumpulkan pada saat praktikum.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Petunjuk:</h4>
                <ul className="text-blue-700 space-y-1 text-sm">
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
                className="inline-flex items-center space-x-3 bg-linear-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">Download Tugas Awal</span>
              </Link>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>🔗 Link: six.itb.ac.id/pub/kur2024/matakuliah/54040</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Presensi Praktikum</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Absensi PTB2 - Modul 1
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Lakukan presensi untuk konfirmasi kehadiran praktikum.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Penting:</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Presensi hanya dapat dilakukan pada saat praktikum</li>
                  <li>• Pastikan Anda sudah mengerjakan tugas awal</li>
                  <li>• Terlambat lebih dari 15 menit tidak dapat mengikuti praktikum</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIM
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan NIM"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelompok Praktikum
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Pilih kelompok</option>
                    <option value="A">Kelompok A</option>
                    <option value="B">Kelompok B</option>
                    <option value="C">Kelompok C</option>
                    <option value="D">Kelompok D</option>
                  </select>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      Saya confirm telah mengerjakan tugas awal dan siap mengikuti praktikum
                    </span>
                  </label>
                </div>

                <button className="w-full bg-linear-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Submit Presensi</span>
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
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/praktikum" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{moduleInfo.title}</h1>
                <p className="text-gray-600">{moduleInfo.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              {/* Module Image */}
              <div className="mb-6">
                <Image 
                  src={moduleInfo.image} 
                  alt={moduleInfo.title}
                  width={400}
                  height={160}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
