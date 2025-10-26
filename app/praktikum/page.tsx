"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PraktikumPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Scroll function for navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // PTB 1 Modules
  const ptb1Modules = [
    {
      id: 1,
      title: "Sistem Monitoring Pasien dan Tanda Vital"
    },
    {
      id: 2,
      title: "Peralatan Bedah Elektrik dan Koagulasi"
    },
    {
      id: 3,
      title: "Sistem Ventilator dan Dukungan Hidup"
    },
    {
      id: 4,
      title: "Sistem Ventilator dan Peralatan Respirasi"
    },
    {
      id: 5,
      title: "Elektrokardiografi dan Monitoring Jantung"
    },
    {
      id: 6,
      title: "Sistem Infus dan Peralatan Terapi"
    },
    {
      id: 7,
      title: "Laser Terapi dan Elektroterapi"
    },
    {
      id: 8,
      title: "Sistem Pencitraan Medis dan Radiologi"
    }
  ];

  const handleModuleClick = (moduleId: number, title: string) => {
    console.log(`Clicked module ${moduleId}: ${title}`);
    
    // PTB1 Modul 2 is temporarily unavailable
    if (moduleId === 2) {
      alert(`${title}\n\nModul ini sedang dalam tahap pengembangan. Stay tuned untuk update selanjutnya! 🚧`);
      return;
    }
    
    // Navigate to available module pages
    router.push(`/praktikum/modul/ptb1-modul${moduleId}`);
  };

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex flex-col text-[#1a1a1a] relative">
      {/* ====== HERO SECTION ====== */}
      <section className="relative h-screen w-full">
        <Image
          src="/LandingPic.png"
          alt="Praktikum Biomedis"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="text-5xl lg:text-6xl font-extrabold text-white max-w-4xl leading-tight"
          >
            Praktikum Teknik Biomedis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-white/90 mt-4 max-w-2xl"
          >
            Pembelajaran praktis untuk memahami teknologi biomedis
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
              onClick={() => scrollToSection('ptb1-section')}
              className="hover:text-[#E64A19] transition-colors duration-200 text-left text-lg py-2"
            >
              Praktikum Teknik Biomedis 1
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              whileHover={{ scale: 1.05, x: 5 }}
              onClick={() => scrollToSection('ptb2-section')}
              className="hover:text-[#E64A19] transition-colors duration-200 text-left text-lg py-2"
            >
              Praktikum Teknik Biomedis 2
            </motion.button>
            
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              whileHover={{ scale: 1.05, x: 5 }}
              className="hover:text-[#E64A19] transition-colors duration-200 text-lg py-2"
            >
              Aturan Lab
            </motion.a>
            
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
            
            {/* ====== PTB 1 SECTION ====== */}
            <motion.section
              id="ptb1-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-16"
            >
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-3xl md:text-4xl font-bold text-[#E64A19] mb-10 text-center"
              >
                PTB 1 - Praktikum Teknik Biomedis 1
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {ptb1Modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + (index * 0.1) }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleModuleClick(module.id, module.title)}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-[#E64A19]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-[#E64A19] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                        {module.id}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          Klik untuk mengakses modul praktikum
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* ====== PTB 2 SECTION ====== */}
            <motion.section
              id="ptb2-section"
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
                Praktikum Teknik Biomedis 2
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.0 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600">
                  Modul untuk Praktikum Teknik Biomedis 2 akan segera tersedia.
                  Stay tuned untuk update selanjutnya!
                </p>
              </motion.div>
            </motion.section>

          </div>
        </motion.main>
      </section>

    </main>
  );
}
