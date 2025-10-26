import { PrismaClient } from '../app/generated/prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function testUpdateStatus() {
  try {
    // Test update status permohonan ID 2 menjadi APPROVED
    const updatedPermohonan = await prisma.permohonan.update({
      where: {
        id: 2
      },
      data: {
        status: 'APPROVED',
        approvedBy: 'asisten@biomedis.com',
        approvedAt: new Date(),
        keterangan: 'Test approval dari script'
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

    console.log('✅ Status berhasil diupdate:');
    console.log('📝 Updated permohonan:', updatedPermohonan);

    // Check all permohonan
    const allPermohonan = await prisma.permohonan.findMany({
      include: {
        user: {
          select: {
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('\n📊 Semua permohonan:');
    allPermohonan.forEach(p => {
      console.log(`ID ${p.id}: ${p.nama} - ${p.status} - ${p.approvedBy || 'Belum diproses'}`);
    });
    
  } catch (error) {
    console.error('❌ Error updating status:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testUpdateStatus();
