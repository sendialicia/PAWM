import { PrismaClient } from '../app/generated/prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function createTestPermohonan() {
  try {
    // Create test permohonan for praktikan user (ID: 1)
    const permohonan1 = await prisma.permohonan.create({
      data: {
        nama: "John Doe",
        nim: "13519001",
        email: "praktikan@biomedis.com",
        tanggal: new Date("2025-10-30"),
        waktuMulai: "08:00",
        waktuSelesai: "10:00",
        keperluan: "Praktikum Elektrokardiogram untuk tugas akhir",
        jumlahOrang: "1-5",
        userId: 1,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            email: true,
            role: true
          }
        }
      }
    });

    const permohonan2 = await prisma.permohonan.create({
      data: {
        nama: "Jane Smith",
        nim: "13519002", 
        email: "praktikan@biomedis.com",
        tanggal: new Date("2025-11-01"),
        waktuMulai: "13:00",
        waktuSelesai: "15:00",
        keperluan: "Pengukuran sinyal EMG untuk penelitian",
        jumlahOrang: "6-10",
        userId: 1,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            email: true,
            role: true
          }
        }
      }
    });

    console.log('✅ Test permohonan berhasil dibuat:');
    console.log('📝 Permohonan 1:', permohonan1);
    console.log('📝 Permohonan 2:', permohonan2);
    
  } catch (error) {
    console.error('❌ Error creating test permohonan:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestPermohonan();
