'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function Navbar({ onLoginClick }: { onLoginClick: () => void }) {
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
        <a href="#" className="flex items-center space-x-3 transition-all duration-700">
          <Image
            src={scrolled ? '/LogoHitam.png' : '/Logo.png'}
            alt="Logo"
            width={scrolled ? 120 : 200}
            height={scrolled ? 80 : 150}
            className="transition-all duration-700"
          />
        </a>

        {/* NAVIGATION (desktop only) */}
        <nav className="hidden lg:flex space-x-10 font-semibold text-sm items-center">
          <a href="#" className="hover:opacity-70 transition-opacity">Peminjaman Lab</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Peminjaman Alat</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Praktikum</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Aturan Lab</a>
          <motion.button
            onClick={onLoginClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 flex items-center justify-center"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={scrolled ? '/PersonBlack.png' : '/PersonWhite.png'}
                alt="User Icon"
                width={20}
                height={20}
                className="transition-opacity"
              />
            </motion.div>
          </motion.button>
        </nav>

        {/* MOBILE MENU (visible below lg breakpoint) */}
        <div className="flex items-center gap-4 lg:hidden">
          <motion.button
            onClick={onLoginClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 rounded-full"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={scrolled ? '/PersonBlack.png' : '/PersonWhite.png'}
                alt="User Icon"
                width={22}
                height={22}
                className="transition-opacity hover:opacity-70"
              />
            </motion.div>
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
