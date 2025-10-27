import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Force Node.js runtime for Prisma compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt:', { email, password: '***' });

    // Validation
    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    console.log('User found:', user ? { id: user.id, email: user.email } : 'null');

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Debug password comparison
    console.log('Stored password:', user.password);
    console.log('Input password:', password);
    
    // Check if password is hashed or plain text
    const isPasswordHashed = user.password.startsWith('$2');
    let isPasswordValid = false;
    
    if (isPasswordHashed) {
      // Use bcrypt for hashed passwords
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // Direct comparison for plain text passwords
      isPasswordValid = password === user.password;
    }
    
    console.log('Password hashed:', isPasswordHashed);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Password validation failed');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Login successful
    return NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
