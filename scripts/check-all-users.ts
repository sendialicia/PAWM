import { PrismaClient } from '../app/generated/prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function checkAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    console.log('📊 Semua Users dalam Database:');
    console.log('================================');
    users.forEach(user => {
      const roleEmoji = user.role === 'PRAKTIKAN' ? '📚' : '🎓';
      console.log(`${roleEmoji} ${user.role}: ${user.email} (ID: ${user.id})`);
    });
    console.log(`\n📈 Total users: ${users.length}`);
    
  } catch (error) {
    console.error('❌ Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllUsers();
