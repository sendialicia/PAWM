// Script to check existing users in database
import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: true,
        createdAt: true
      }
    });

    console.log('📊 Users in database:');
    console.log('Total users:', users.length);
    console.log('');

    users.forEach((user, index) => {
      console.log(`👤 User ${index + 1}:`);
      console.log('   ID:', user.id);
      console.log('   Email:', user.email);
      console.log('   Password Hash:', user.password);
      console.log('   Created:', user.createdAt);
      console.log('   Is hashed?:', user.password.startsWith('$2') ? 'Yes (bcrypt)' : 'No (plain text)');
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
