import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function createUsersWithRoles() {
  try {
    // Create praktikan user
    const praktikanPassword = await bcrypt.hash('praktikan123', 10);
    const praktikan = await prisma.user.create({
      data: {
        email: 'praktikan@biomedis.com',
        password: praktikanPassword,
        role: 'PRAKTIKAN'
      }
    });

    // Create asisten user
    const asistenPassword = await bcrypt.hash('asisten123', 10);
    const asisten = await prisma.user.create({
      data: {
        email: 'asisten@biomedis.com',
        password: asistenPassword,
        role: 'ASISTEN'
      }
    });

    console.log('✅ Users dengan role berhasil dibuat:');
    console.log('📚 Praktikan:', praktikan);
    console.log('🎓 Asisten:', asisten);
    
  } catch (error) {
    console.error('❌ Error creating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsersWithRoles();
