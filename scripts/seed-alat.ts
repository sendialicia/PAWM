import { config } from 'dotenv';
config();
import { PrismaClient } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

const alats = [
  {
    nama: "Jangka Sorong",
    deskripsi: "Alat ukur presisi untuk mengukur diameter, kedalaman, dan ketebalan dengan akurasi tinggi",
    gambar: "/JangkaSorong.jpg",
    jumlahTotal: 10,
    jumlahTersedia: 10,
    spesifikasi: "Ketelitian: 0.02mm, Range: 0-150mm, Material: Stainless Steel"
  },
  {
    nama: "Osiloskop",
    deskripsi: "Instrumen elektronik untuk mengamati sinyal listrik yang berubah terhadap waktu",
    gambar: "/Osiloskop.jpg", 
    jumlahTotal: 5,
    jumlahTersedia: 5,
    spesifikasi: "Bandwidth: 100MHz, Channels: 2, Sample Rate: 1GSa/s, Memory: 24Mpts"
  },
  {
    nama: "Generator Sinyal",
    deskripsi: "Perangkat elektronik yang menghasilkan sinyal listrik berulang atau tidak berulang",
    gambar: "/GeneratorSinyal.webp",
    jumlahTotal: 4,
    jumlahTersedia: 4,
    spesifikasi: "Frequency Range: 1Hz-100MHz, Output: Sine, Square, Triangle, Amplitude: 50mVpp-10Vpp"
  },
  {
    nama: "Power Supply",
    deskripsi: "Sumber daya listrik yang menyediakan tegangan dan arus listrik yang stabil",
    gambar: "/PowerSupply.jpg",
    jumlahTotal: 8,
    jumlahTersedia: 8,
    spesifikasi: "Output: 0-30V DC, Current: 0-5A, Dual Channel, Digital Display, Over-current Protection"
  },
  {
    nama: "Biopac",
    deskripsi: "Sistem akuisisi data untuk penelitian fisiologi dan pembelajaran biomedis",
    gambar: "/Biopac.jpg",
    jumlahTotal: 3,
    jumlahTersedia: 3,
    spesifikasi: "16-bit resolution, 16 analog channels, Sample Rate: up to 200kHz, USB connectivity"
  }
];

async function seedAlat() {
  console.log('🌱 Seeding alat data...');
  
  try {
    // Clear existing data
    await prisma.alat.deleteMany();
    console.log('🗑️  Cleared existing alat data');
    
    // Insert new data
    for (const alat of alats) {
      const created = await prisma.alat.create({
        data: alat
      });
      console.log(`✅ Created alat: ${created.nama}`);
    }
    
    console.log('🎉 Alat data seeded successfully!');
    
    // Show summary
    const count = await prisma.alat.count();
    console.log(`📊 Total alat in database: ${count}`);
    
  } catch (error) {
    console.error('❌ Error seeding alat data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAlat();
