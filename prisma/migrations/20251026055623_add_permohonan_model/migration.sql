-- CreateEnum
CREATE TYPE "StatusPermohonan" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Permohonan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktuMulai" TEXT NOT NULL,
    "waktuSelesai" TEXT NOT NULL,
    "keperluan" TEXT NOT NULL,
    "jumlahOrang" TEXT NOT NULL,
    "status" "StatusPermohonan" NOT NULL DEFAULT 'PENDING',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "keterangan" TEXT,

    CONSTRAINT "Permohonan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Permohonan" ADD CONSTRAINT "Permohonan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
