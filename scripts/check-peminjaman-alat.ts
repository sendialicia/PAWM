import { PrismaClient } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

async function checkPeminjamanAlat() {
  try {
    console.log('Checking peminjaman alat data...');
    
    const peminjamanAlat = await prisma.peminjamanAlat.findMany({
      include: {
        user: {
          select: {
            email: true,
            role: true
          }
        },
        alat: {
          select: {
            nama: true,
            jumlahTersedia: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`Found ${peminjamanAlat.length} peminjaman alat(s) in database:`);
    peminjamanAlat.forEach((peminjaman, index) => {
      console.log(`${index + 1}. ${peminjaman.nama} (${peminjaman.nim})`);
      console.log(`   Alat: ${peminjaman.alat.nama}`);
      console.log(`   Jumlah: ${peminjaman.jumlahPinjam} unit`);
      console.log(`   Status: ${peminjaman.status}`);
      console.log(`   Tanggal: ${peminjaman.tanggalPinjam.toLocaleDateString()} - ${peminjaman.tanggalKembali.toLocaleDateString()}`);
      console.log(`   Keperluan: ${peminjaman.keperluan}`);
      console.log('---');
    });
    
    // Check total count
    const totalCount = await prisma.peminjamanAlat.count();
    console.log(`\nTotal peminjaman alat in database: ${totalCount}`);
    
  } catch (error) {
    console.error('Error checking peminjaman alat:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPeminjamanAlat();
