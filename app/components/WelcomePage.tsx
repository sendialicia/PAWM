"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import NavbarWithLogout from "./NavbarWithLogout";

interface WelcomePageProps {
  user: {
    id: number;
    email: string;
    role: string;
  };
  onLogout: () => void;
}

export default function WelcomePage({ user, onLogout }: WelcomePageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Extract name from email (before @)
  const userName = user.email.split('@')[0];
  const userRole = user.role;

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex flex-col text-[#1a1a1a] relative">
      {/* NAVBAR WITH LOGOUT */}
      <NavbarWithLogout onLogout={onLogout} userName={userName} />
      {/* ====== HERO SECTION ====== */}
      <section className="relative h-screen w-full">
        <Image
          src="/LandingPic.png"
          alt="Biomedical Lab"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Welcome Message with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Hi, {userName}! [{userRole}]
            </h2>
            
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="text-5xl lg:text-5xl font-extrabold text-white max-w-2xl leading-tight"
          >
            Connecting technology to human health.
          </motion.h1>
        </div>
      </section>

     {/* ====== MAIN CONTENT + SIDEBAR WRAPPER ====== */}
      <section
        className="
          relative md:-mt-90 z-30   /* desktop: naik nimpah gambar, mobile: normal */
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
            } md:flex flex-col gap-8 font-semibold text-gray-700 text-left mt-6`}
          >
            {["About us", "Research", "Activities", "Lecturers", "Assistants", "Contacts"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + (index * 0.1) }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="hover:text-[#E64A19] transition-colors duration-200"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.aside>

        {/* ====== MAIN CONTENT ====== */}
        <motion.main 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className=" flex-1 relative  mt-10 md:mt-30  bg-[#FAF6EF]"
        >
          <div className="    w-full md:full mx-auto flex flex-col gap-5">
            <div className=" flex flex-col md:flex-row items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="md:w-1/2 text-center md:text-left"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-2"
                >
                  Welcome to Laboratorium Biomedika
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-gray-700 text-base md:text-lg mb-4"
                >
                  Laboratorium Teknik Biomedika (Lab EB) adalah fasilitas inti di bawah Sekolah Teknik Elektro dan Informatika (STEI) Institut Teknologi Bandung (ITB) yang berperan penting dalam mendukung kegiatan akademik dan penelitian di Jurusan Teknik Biomedis.
                </motion.p>
                
                {/* User Info Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#E64A19]"
                >
                  <p className="text-sm text-gray-600 mb-1">Currently logged in as:</p>
                  <p className="text-lg font-semibold text-[#E64A19]">{user.email}</p>
                </motion.div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="md:w-1/2 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/GambarLab1.png"
                    alt="Laboratorium Biomedika"
                    width={1000}
                    height={1000}
                    className="object-cover "
                  />
                </motion.div>
              </motion.div>
            </div>

          </div>
        </motion.main>
      </section>

    </main>
  );
}
