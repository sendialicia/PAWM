// Script to create a test user for testing login functionality
// Run with: npx tsx scripts/create-test-user.ts

import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const testEmail = 'admin@biomedis.com';
    const testPassword = 'admin123';

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });

    if (existingUser) {
      console.log('✅ Test user already exists!');
      console.log('📧 Email:', testEmail);
      console.log('🔑 Password:', testPassword);
      console.log('🆔 User ID:', existingUser.id);
      console.log('\nYou can test login with these credentials.');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(testPassword, 10);

    // Create the test user
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        password: hashedPassword
      }
    });

    console.log('✅ Test user created successfully!');
    console.log('📧 Email:', testEmail);
    console.log('🔑 Password:', testPassword);
    console.log('🆔 User ID:', user.id);
    console.log('\nYou can now test login with these credentials.');

  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
