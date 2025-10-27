import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force Node.js runtime for Prisma compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
