"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex flex-col text-[#1a1a1a] relative">
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
          <h1 className="text-5xl lg:text-5xl font-extrabold text-white max-w-2xl leading-tight">
            Connecting technology to human health.
          </h1>
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
        <aside
          className="
            bg-[#FAF6EF]
            px-30 py-12
            w-full md:w-1/4
            h-fit
            
          "
        >
          <div className="flex justify-between items-center md:block">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#E64A19] mb-0 md:mb-4">
              Menu
            </h2>

            {/* Tombol More di mobile */}
            <button
              className="md:hidden flex items-center gap-1 font-bold text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              More <ChevronDown size={18} />
            </button>
          </div>

          {/* Menu Links */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col gap-8 font-semibold text-gray-700 text-left mt-6`}
          >
            <a href="#" className="hover:text-[#E64A19] transition">About us</a>
            <a href="#" className="hover:text-[#E64A19] transition">Research</a>
            <a href="#" className="hover:text-[#E64A19] transition">Activities</a>
            <a href="#" className="hover:text-[#E64A19] transition">Lecturers</a>
            <a href="#" className="hover:text-[#E64A19] transition">Assistants</a>
            <a href="#" className="hover:text-[#E64A19] transition">Contacts</a>
          </div>
        </aside>

        {/* ====== MAIN CONTENT ====== */}
        <main className=" flex-1 relative  mt-10 md:mt-30  bg-[#FAF6EF]">
          <div className="    w-full md:full mx-auto flex flex-col gap-5">
            <div className=" flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-[#E64A19] mb-2">
                  Welcome to Laboratorium Biomedika
                </h3>
                <p className="text-gray-700 text-base md:text-lg">
                  Laboratorium Teknik Biomedika (Lab EB) adalah fasilitas inti di bawah Sekolah Teknik Elektro dan Informatika (STEI) Institut Teknologi Bandung (ITB) yang berperan penting dalam mendukung kegiatan akademik dan penelitian di Jurusan Teknik Biomedis.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="/GambarLab1.png"
                  alt="Laboratorium Biomedika"
                  width={1000}
                  height={1000}
                  className="object-cover "
                />
              </div>
            </div>

          </div>
        </main>
      </section>

    </main>
  );
}
