# Setup Guide untuk Project BioMedis

## 📋 Prerequisites
- Node.js (versi 18 atau lebih baru)
- PostgreSQL
- Git

## 🚀 Step-by-Step Installation

### 1. Clone Repository
```bash
git clone https://github.com/veliciagabriell/Client-Tugas-UTS-PAWM.git
cd Client-Tugas-UTS-PAWM
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env` di root folder:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/biomedis"

# Prisma
PRISMA_CONFIG_PATH="./prisma.config.ts"
```

Ganti `username`, `password`, dan `biomedis` sesuai dengan setup PostgreSQL kamu.

### 4. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push

# Seed data (optional)
npx prisma db seed
```

### 5. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🔧 Troubleshooting

### Error: "Module not found: Can't resolve '@prisma/client'"

**Solusi:**
1. Install dependencies: `npm install`
2. Generate Prisma client: `npx prisma generate`
3. Restart development server: `npm run dev`

### Error: "Module not found: Can't resolve '@/app/generated/prisma/client'"

**Solusi:**
Ini adalah error lama yang sudah diperbaiki. Pastikan pull latest changes dan run:
```bash
npm install
npx prisma generate
npm run dev
```

### Error: Database connection failed

**Solusi:**
1. Pastikan PostgreSQL sudah running
2. Cek DATABASE_URL di file `.env`
3. Test koneksi: `npx prisma db push`

### Error: "alat.map is not a function"

**Solusi:**
Sudah diperbaiki di code terbaru. Pastikan pull latest changes.

## 📦 Project Structure
```
biomedis/
├── app/
│   ├── api/              # API endpoints
│   ├── components/       # React components
│   ├── peminjaman-alat/  # Equipment borrowing page
│   ├── peminjaman-lab/   # Lab booking page
│   └── praktikum/        # Practicum page
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static files
└── scripts/              # Utility scripts
```

## 🎯 Features
- ✅ User Authentication (Login/Register)
- ✅ Lab Booking System
- ✅ Equipment Borrowing System
- ✅ Task & Attendance Management
- ✅ Role-based Access (Student/Assistant)

## 👥 Default Users
Setelah seeding, ada beberapa user default:
- **Student:** `student@test.com` / `password123`
- **Assistant:** `asisten@test.com` / `password123`

## 🆘 Need Help?
Jika masih ada error:
1. Cek file `.env` sudah benar
2. Pastikan PostgreSQL running
3. Run `npx prisma generate` dan `npx prisma db push`
4. Restart development server

## 📱 How to Use
1. Register atau login dengan akun yang ada
2. Pilih menu sesuai role (Student/Assistant)
3. Untuk peminjaman alat: `/peminjaman-alat`
4. Untuk peminjaman lab: `/peminjaman-lab`
5. Untuk praktikum: `/praktikum`

Happy coding! 🎉
