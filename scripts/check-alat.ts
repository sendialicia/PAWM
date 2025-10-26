import { PrismaClient } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

async function checkAlat() {
  try {
    console.log('Checking alat data...');
    
    const alats = await prisma.alat.findMany();
    
    console.log(`Found ${alats.length} alat(s) in database:`);
    alats.forEach((alat: any, index: number) => {
      console.log(`${index + 1}. ${alat.nama} (ALT-${alat.id.toString().padStart(3, '0')}) - ${alat.jumlahTersedia}/${alat.jumlahTotal} tersedia`);
      console.log(`   Deskripsi: ${alat.deskripsi}`);
      console.log(`   Gambar: ${alat.gambar}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error checking alat:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAlat();
