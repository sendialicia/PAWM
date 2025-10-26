-- CreateEnum
CREATE TYPE "StatusTugasAwal" AS ENUM ('BELUM_SUBMIT', 'SUDAH_SUBMIT', 'TERLAMBAT');

-- CreateEnum
CREATE TYPE "StatusPresensi" AS ENUM ('HADIR', 'TIDAK_HADIR', 'TERLAMBAT');

-- CreateTable
CREATE TABLE "TugasAwal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "modulId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "linkTugas" TEXT NOT NULL,
    "status" "StatusTugasAwal" NOT NULL DEFAULT 'BELUM_SUBMIT',
    "submitAt" TIMESTAMP(3),
    "nilai" DOUBLE PRECISION,
    "nilaiAt" TIMESTAMP(3),
    "nilaiBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "TugasAwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presensi" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "modulId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "kelompok" TEXT NOT NULL,
    "status" "StatusPresensi" NOT NULL DEFAULT 'TIDAK_HADIR',
    "waktuPresensi" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "Presensi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TugasAwal_userId_modulId_key" ON "TugasAwal"("userId", "modulId");

-- CreateIndex
CREATE UNIQUE INDEX "Presensi_userId_modulId_key" ON "Presensi"("userId", "modulId");

-- AddForeignKey
ALTER TABLE "TugasAwal" ADD CONSTRAINT "TugasAwal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
