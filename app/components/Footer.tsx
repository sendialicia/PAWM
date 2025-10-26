import Image from 'next/image';
export default function Footer() {
  return (
    <main className="min-h-screen flex flex-col">
        
      {/* ====== FOOTER ====== */}
      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 text-sm">
          {/* Logo kiri */}
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <span>bio<br />med<br />lab</span>
          </div>

          <p>© 2025 clients. All Rights Reserved.</p>

          {/* Logo kanan */}
          <Image
            src="/images/logo-itb.png"
            alt="Logo ITB"
            width={50}
            height={50}
          />
        </div>
      </footer>
    </main>
  );
}
