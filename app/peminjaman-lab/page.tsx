"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Calendar, FileText, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle } from "lucide-react";
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

export default function PeminjamanLabPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("calendar");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // States untuk permohonan
  const [permohonan, setPermohonan] = useState<Permohonan[]>([]);
  const [permohonanLoading, setPermohonanLoading] = useState(false);
  const [selectedPermohonan, setSelectedPermohonan] = useState<Permohonan | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'APPROVED' | 'REJECTED'>('APPROVED');
  const [keterangan, setKeterangan] = useState('');

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

  // Fetch permohonan when user is loaded
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          setPermohonanLoading(true);
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
          setPermohonanLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const fetchPermohonan = async () => {
    if (!user) return;
    
    try {
      setPermohonanLoading(true);
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
      setPermohonanLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedPermohonan || !user) return;

    console.log('Sending update request:', {
      id: selectedPermohonan.id,
      status: updateStatus,
      approvedBy: user.email,
      keterangan,
      userRole: user.role
    });

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
        fetchPermohonan();
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
  
  // Array gambar lab yang akan berputar
  const labImages = ["/Labdas1.jpg", "/Labdas2.jpg", "/Labdas3.jpg"];

  // Auto-rotate images setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % labImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [labImages.length]);

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

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    email: "",
    tanggal: "",
    waktuMulai: "",
    waktuSelesai: "",
    keperluan: "",
    jumlahOrang: ""
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("User tidak ditemukan. Silakan login kembali.");
      return;
    }

    try {
      const response = await fetch('/api/permohonan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Form peminjaman lab berhasil dikirim!");
        // Reset form
        setFormData({
          nama: "",
          nim: "",
          email: "",
          tanggal: "",
          waktuMulai: "",
          waktuSelesai: "",
          keperluan: "",
          jumlahOrang: ""
        });
        // Scroll ke section permohonan untuk melihat hasil
        scrollToSection('permohonan');
        // Refresh data permohonan
        if (user) {
          fetchPermohonan();
        }
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Error mengirim permohonan. Silakan coba lagi.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isDateAvailable = (day: number) => {
    // Mock data - bisa diganti dengan data real dari API
    const unavailableDates = [5, 12, 18, 25]; // Contoh tanggal yang tidak tersedia
    return !unavailableDates.includes(day);
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
          {labImages.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`Lab ${index + 1}`}
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
            Peminjaman Lab
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-white/90 mt-4 max-w-2xl"
          >
            Reservasi laboratorium untuk kegiatan akademik dan penelitian
          </motion.p>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {labImages.map((_, index) => (
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
              onClick={() => scrollToSection('calendar')}
              className={`hover:text-[#E64A19] transition-colors duration-200 text-left text-lg py-2 flex items-center gap-3 ${
                activeSection === 'calendar' ? 'text-[#E64A19] font-bold' : ''
              }`}
            >
              <Calendar size={20} />
              Cek Ketersediaan
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
              onClick={() => scrollToSection('permohonan')}
              className={`hover:text-[#E64A19] transition-colors duration-200 text-left text-lg py-2 flex items-center gap-3 ${
                activeSection === 'permohonan' ? 'text-[#E64A19] font-bold' : ''
              }`}
            >
              <Clock size={20} />
              {user?.role === 'ASISTEN' ? 'Kelola Permohonan' : 'Status Permohonan'}
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
            
            {/* ====== CALENDAR SECTION ====== */}
            <motion.section
              id="calendar"
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
                Cek Ketersediaan Lab
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                    <div key={`empty-${i}`} className="h-10"></div>
                  ))}
                  
                  {/* Calendar days */}
                  {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                    const day = i + 1;
                    const isAvailable = isDateAvailable(day);
                    const isSelected = selectedDate?.getDate() === day && 
                                     selectedDate?.getMonth() === currentDate.getMonth();
                    
                    return (
                      <button
                        key={day}
                        onClick={() => isAvailable && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                        className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#E64A19] text-white'
                            : isAvailable
                            ? 'hover:bg-[#E64A19] hover:text-white bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-500 cursor-not-allowed'
                        }`}
                        disabled={!isAvailable}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded"></div>
                    <span>Tersedia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 rounded"></div>
                    <span>Tidak Tersedia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#E64A19] rounded"></div>
                    <span>Dipilih</span>
                  </div>
                </div>
              </motion.div>
            </motion.section>

            {/* ====== FORM SECTION ====== */}
            <motion.section
              id="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mb-16"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-8 text-center"
              >
                Form Peminjaman Lab
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.0 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIM *
                      </label>
                      <input
                        type="text"
                        name="nim"
                        value={formData.nim}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                        placeholder="Masukkan NIM"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      placeholder="Masukkan email"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal *
                      </label>
                      <input
                        type="date"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu Mulai *
                      </label>
                      <input
                        type="time"
                        name="waktuMulai"
                        value={formData.waktuMulai}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu Selesai *
                      </label>
                      <input
                        type="time"
                        name="waktuSelesai"
                        value={formData.waktuSelesai}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah Orang *
                    </label>
                    <select
                      name="jumlahOrang"
                      value={formData.jumlahOrang}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                    >
                      <option value="">Pilih jumlah orang</option>
                      <option value="1-5">1-5 orang</option>
                      <option value="6-10">6-10 orang</option>
                      <option value="11-15">11-15 orang</option>
                      <option value="16-20">16-20 orang</option>
                      <option value="20+">Lebih dari 20 orang</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keperluan *
                    </label>
                    <textarea
                      name="keperluan"
                      value={formData.keperluan}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E64A19] focus:border-transparent"
                      placeholder="Jelaskan keperluan penggunaan lab"
                    />
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#E64A19] hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Kirim Permohonan
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.section>

            {/* ====== PERMOHONAN SECTION ====== */}
            {user && (
              <motion.section
                id="permohonan"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="mb-16"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-8 text-center"
                >
                  {user.role === 'ASISTEN' ? 'Kelola Permohonan Lab' : 'Status Permohonan Anda'}
                </motion.h2>
                
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
                    <h3 className="text-xl font-bold text-gray-800">
                      {user.role === 'ASISTEN' ? 'Semua Permohonan' : 'Permohonan Anda'}
                    </h3>
                  </div>

                  {permohonanLoading ? (
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
              </motion.section>
            )}

          </div>
        </motion.main>
      </section>

      {/* Update Status Modal */}
      {showUpdateModal && selectedPermohonan && user && (
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
