"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, FileText, Clock, CheckCircle, XCircle, Wrench } from "lucide-react";
import { motion } from "framer-motion";

interface User {
  id: number;
  email: string;
  role: string;
}

interface Alat {
  id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
  jumlahTotal: number;
  jumlahTersedia: number;
  spesifikasi: string[];
}

interface PeminjamanAlat {
  id: string;
  alatId: string;
  userId: string;
  nama: string;
  nim: string;
  email: string;
  jumlahPinjam: number;
  tanggalPinjam: string;
  tanggalKembali: string;
  keperluan: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';
  alat: Alat;
  user: {
    id: string;
    email: string;
  };
}

export default function PeminjamanAlatPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("alat");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // States untuk alat dan peminjaman
  const [alat, setAlat] = useState<Alat[]>([]);
  const [peminjamanAlat, setPeminjamanAlat] = useState<PeminjamanAlat[]>([]);
  const [alatLoading, setAlatLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    alatId: "",
    jumlah: 1,
    tanggalPinjam: "",
    tanggalKembali: "",
    keperluan: ""
  });

  // Load user data
  useEffect(() => {
    const savedUser = localStorage.getItem('biomedis_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = '/';
      }
    } else {
      window.location.href = '/';
    }
  }, []);

  // Fetch data when user is loaded
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setAlatLoading(true);
      
      // Fetch alat
      const alatResponse = await fetch('/api/alat');
      if (alatResponse.ok) {
        const alatData = await alatResponse.json();
        setAlat(alatData);
      }
      
      // Fetch peminjaman alat
      const peminjamanResponse = await fetch('/api/peminjaman-alat');
      if (peminjamanResponse.ok) {
        const peminjamanData = await peminjamanResponse.json();
        setPeminjamanAlat(peminjamanData);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setAlatLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("User tidak ditemukan. Silakan login kembali.");
      return;
    }

    try {
      const response = await fetch('/api/peminjaman-alat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          nama: formData.nama,
          nim: formData.nim,
          alatId: formData.alatId,
          jumlah: formData.jumlah,
          tanggalPinjam: formData.tanggalPinjam,
          tanggalKembali: formData.tanggalKembali,
          tujuanPenggunaan: formData.keperluan
        })
      });

      if (response.ok) {
        alert("Form peminjaman alat berhasil dikirim!");
        // Reset form
        setFormData({
          nama: "",
          nim: "",
          alatId: "",
          jumlah: 1,
          tanggalPinjam: "",
          tanggalKembali: "",
          keperluan: ""
        });
        // Scroll ke section status untuk melihat hasil
        scrollToSection('status');
        // Refresh data
        fetchData();
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Error mengirim permohonan. Silakan coba lagi.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'jumlah' ? parseInt(value) || 1 : value
    });
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
      case 'RETURNED':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <CheckCircle size={16} className="mr-1" />
            Returned
          </span>
        );
      default:
        return null;
    }
  };
  
  // Array gambar alat yang akan berputar
  const alatImages = ["/GambarLab1.png", "/GambarLab2.png", "/LandingPic.png"];

  // Auto-rotate images setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % alatImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [alatImages.length]);

  // Scroll function for navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setActiveSection(sectionId);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E64A19] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex flex-col text-[#1a1a1a] relative">
      {/* ====== HERO SECTION ====== */}
      <section className="relative h-screen w-full">
        <div className="relative w-full h-full">
          {alatImages.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`Equipment ${index + 1}`}
              fill
              className={`object-cover object-center transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              priority={index === 0}
            />
          ))}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="text-5xl lg:text-6xl font-extrabold text-white max-w-4xl leading-tight"
          >
            Peminjaman Alat
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-white/90 mt-4 max-w-2xl"
          >
            Kelola peminjaman alat laboratorium dengan mudah dan efisien
          </motion.p>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {alatImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
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

            {/* Tombol More di mobile */}
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

          {/* Menu Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col gap-12 font-semibold text-gray-700 text-left mt-8`}
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              whileHover={{ scale: 1.05, x: 5 }}
              onClick={() => scrollToSection('alat')}
              className={`hover:text-[#E64A19] transition-colors duration-200 text-left text-lg py-2 flex items-center gap-3 ${
                activeSection === 'alat' ? 'text-[#E64A19] font-bold' : ''
              }`}
            >
              <Wrench size={20} />
              Daftar Alat
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              whileHover={{ scale: 1.05, x: 5 }}
              onClick={() => scrollToSection('form')}
              className={`hover:text-[#E64A19] transition-colors duration-200 text-left text-lg py-2 flex items-center gap-3 ${
                activeSection === 'form' ? 'text-[#E64A19] font-bold' : ''
              }`}
            >
              <FileText size={20} />
              Form Peminjaman
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              whileHover={{ scale: 1.05, x: 5 }}
              onClick={() => scrollToSection('status')}
              className={`hover:text-[#E64A19] transition-colors duration-200 text-left text-lg py-2 flex items-center gap-3 ${
                activeSection === 'status' ? 'text-[#E64A19] font-bold' : ''
              }`}
            >
              <Clock size={20} />
              {user?.role === 'ASISTEN' ? 'Kelola Peminjaman' : 'Status Peminjaman'}
            </motion.button>
            
            {/* Extra spacing to fill the sidebar */}
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
            
            {/* ====== DAFTAR ALAT SECTION ====== */}
            <motion.section
              id="alat"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-16"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-8 text-center"
              >
                Daftar Alat Laboratorium
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {alatLoading ? (
                  <div className="col-span-full text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E64A19] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading alat...</p>
                  </div>
                ) : Array.isArray(alat) && alat.length > 0 ? (
                  alat.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="h-48 bg-gray-100 relative">
                        <Image
                          src={item.gambar}
                          alt={item.nama}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.jumlahTersedia > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.jumlahTersedia > 0 ? 'Tersedia' : 'Tidak Tersedia'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.nama}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.deskripsi}</p>
                        
                        <div className="mb-3">
                          <span className="text-sm text-gray-500">Ketersediaan: </span>
                          <span className="font-medium text-[#E64A19]">
                            {item.jumlahTersedia}/{item.jumlahTotal}
                          </span>
                        </div>

                        {Array.isArray(item.spesifikasi) && item.spesifikasi.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-500 block mb-1">Spesifikasi:</span>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {item.spesifikasi.map((spec, specIndex) => (
                                <li key={specIndex}>• {spec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    Tidak ada alat tersedia
                  </div>
                )}
              </motion.div>
            </motion.section>

            {/* ====== FORM PEMINJAMAN SECTION ====== */}
            <motion.section
              id="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-16"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-8 text-center"
              >
                Form Peminjaman Alat
              </motion.h2>
              
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                onSubmit={handleFormSubmit}
                className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIM
                    </label>
                    <input
                      type="text"
                      name="nim"
                      value={formData.nim}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      placeholder="Masukkan NIM"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Alat
                  </label>
                  <select
                    name="alatId"
                    value={formData.alatId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                    required
                  >
                    <option value="">Pilih alat yang akan dipinjam</option>
                    {Array.isArray(alat) && alat.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama} (Tersedia: {item.jumlahTersedia})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah
                  </label>
                  <input
                    type="number"
                    name="jumlah"
                    min="1"
                    value={formData.jumlah}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Pinjam
                    </label>
                    <input
                      type="date"
                      name="tanggalPinjam"
                      value={formData.tanggalPinjam}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Kembali
                    </label>
                    <input
                      type="date"
                      name="tanggalKembali"
                      value={formData.tanggalKembali}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keperluan
                  </label>
                  <textarea
                    name="keperluan"
                    value={formData.keperluan}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                    placeholder="Jelaskan keperluan penggunaan alat..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#E64A19] text-white py-3 px-4 rounded-lg hover:bg-[#D32F2F] transition-colors font-medium"
                >
                  Submit Permohonan
                </motion.button>
              </motion.form>
            </motion.section>

            {/* ====== STATUS PEMINJAMAN SECTION ====== */}
            <motion.section
              id="status"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-16"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-8 text-center"
              >
                {user?.role === 'ASISTEN' ? 'Kelola Peminjaman' : 'Status Peminjaman'}
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Daftar Peminjaman</h3>
                </div>
                
                <div className="divide-y">
                  {alatLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E64A19] mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading...</p>
                    </div>
                  ) : Array.isArray(peminjamanAlat) && peminjamanAlat.length > 0 ? (
                    <div className="divide-y">
                      {peminjamanAlat.map((item) => (
                        <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <h4 className="font-semibold text-lg text-gray-800">{item.nama}</h4>
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
                                  <span className="font-medium">Alat:</span> {item.alat.nama}
                                </div>
                                <div>
                                  <span className="font-medium">Jumlah:</span> {item.jumlahPinjam}
                                </div>
                                <div>
                                  <span className="font-medium">Tanggal Pinjam:</span> {new Date(item.tanggalPinjam).toLocaleDateString('id-ID')}
                                </div>
                                <div>
                                  <span className="font-medium">Tanggal Kembali:</span> {new Date(item.tanggalKembali).toLocaleDateString('id-ID')}
                                </div>
                              </div>

                              <div className="mb-3">
                                <span className="font-medium text-gray-700">Keperluan:</span>
                                <p className="text-gray-600 mt-1">{item.keperluan}</p>
                              </div>
                            </div>

                            {user.role === 'ASISTEN' && item.status === 'PENDING' && (
                              <div className="flex flex-col gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  Approve
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
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
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Belum ada peminjaman alat
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.section>

          </div>
        </motion.main>
      </section>

    </main>
  );
}
