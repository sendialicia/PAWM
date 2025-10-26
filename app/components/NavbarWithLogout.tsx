'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";

interface NavbarWithLogoutProps {
  onLogout: () => void;
  userName: string;
}

export default function NavbarWithLogout({ onLogout, userName }: NavbarWithLogoutProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white py-2 ' : 'bg-transparent py-6'
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between  transition-all duration-700 max-w-8xl ${
          scrolled ? 'text-black px-6' : 'text-white px-20 py-20'
        }`}
      >
        {/* LOGO */}
        <motion.a 
          href="/" 
          className="flex items-center space-x-3 transition-all duration-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src={scrolled ? '/LogoHitam.png' : '/Logo.png'}
            alt="Logo"
            width={scrolled ? 120 : 200}
            height={scrolled ? 80 : 150}
            className="transition-all duration-700"
          />
        </motion.a>

        {/* NAVIGATION (desktop only) */}
        <nav className="hidden lg:flex space-x-10 font-semibold text-sm items-center">
          <motion.a 
            href="/peminjaman-lab" 
            whileHover={{ scale: 1.05 }}
            className="hover:opacity-70 transition-opacity"
          >
            Peminjaman Lab
          </motion.a>
          <motion.a 
            href="/peminjaman-alat" 
            whileHover={{ scale: 1.05 }}
            className="hover:opacity-70 transition-opacity"
          >
            Peminjaman Alat
          </motion.a>
          <motion.a 
            href="/praktikum" 
            whileHover={{ scale: 1.05 }}
            className="hover:opacity-70 transition-opacity"
          >
            Praktikum
          </motion.a>
          <motion.a 
            href="/aturan-lab" 
            whileHover={{ scale: 1.05 }}
            className="hover:opacity-70 transition-opacity"
          >
            Aturan Lab
          </motion.a>
          
          {/* User greeting and logout */}
          <div className="flex items-center gap-3">
            <span className="text-sm"></span>
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E64A19] hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Logout
            </motion.button>
          </div>
        </nav>

        {/* MOBILE MENU (visible below lg breakpoint) */}
        <div className="flex items-center gap-4 lg:hidden">
        
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#E64A19] hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-xs font-medium"
          >
            Logout
          </motion.button>
          <Image
            src={scrolled ? '/DetailsBlack.png' : '/DetailsWhite.png'}
            alt="Menu Icon"
            width={26}
            height={26}
            className={`cursor-pointer transition-colors ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          />
        </div>

      </div>
    </header>
  );
}
