-- CreateEnum
CREATE TYPE "StatusPeminjamanAlat" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'DIKEMBALIKAN');

-- CreateTable
CREATE TABLE "Alat" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "jumlahTotal" INTEGER NOT NULL,
    "jumlahTersedia" INTEGER NOT NULL,
    "spesifikasi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeminjamanAlat" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "alatId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tanggalPinjam" TIMESTAMP(3) NOT NULL,
    "tanggalKembali" TIMESTAMP(3) NOT NULL,
    "keperluan" TEXT NOT NULL,
    "jumlahPinjam" INTEGER NOT NULL DEFAULT 1,
    "status" "StatusPeminjamanAlat" NOT NULL DEFAULT 'PENDING',
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "keterangan" TEXT,
    "dikembalikanAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeminjamanAlat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alat_nama_key" ON "Alat"("nama");

-- AddForeignKey
ALTER TABLE "PeminjamanAlat" ADD CONSTRAINT "PeminjamanAlat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeminjamanAlat" ADD CONSTRAINT "PeminjamanAlat_alatId_fkey" FOREIGN KEY ("alatId") REFERENCES "Alat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
