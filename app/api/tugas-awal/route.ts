import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Ambil status tugas awal untuk user tertentu di modul tertentu
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const modulId = searchParams.get('modulId');

    if (!userId || !modulId) {
      return NextResponse.json(
        { error: 'userId dan modulId required' },
        { status: 400 }
      );
    }

    const tugasAwal = await prisma.tugasAwal.findUnique({
      where: {
        userId_modulId: {
          userId: parseInt(userId),
          modulId: modulId
        }
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

    return NextResponse.json({ 
      success: true,
      data: tugasAwal 
    });
  } catch (error) {
    console.error('Get tugas awal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Submit tugas awal
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { userId, modulId, nama, nim, linkTugas, userRole } = data;

    console.log('Submit tugas awal:', { userId, modulId, nama, nim, userRole });

    // Validasi required fields
    if (!userId || !modulId || !nama || !nim || !linkTugas) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi URL
    try {
      new URL(linkTugas);
    } catch {
      return NextResponse.json(
        { error: 'Format link tidak valid' },
        { status: 400 }
      );
    }

    // Check apakah sudah pernah submit
    const existing = await prisma.tugasAwal.findUnique({
      where: {
        userId_modulId: {
          userId: parseInt(userId),
          modulId: modulId
        }
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Tugas awal sudah pernah disubmit untuk modul ini' },
        { status: 400 }
      );
    }

    // Submit tugas awal
    const tugasAwal = await prisma.tugasAwal.create({
      data: {
        userId: parseInt(userId),
        modulId,
        nama,
        nim,
        linkTugas,
        status: 'SUDAH_SUBMIT',
        submitAt: new Date()
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

    console.log('Tugas awal submitted:', tugasAwal);

    return NextResponse.json({ 
      message: 'Tugas awal berhasil disubmit',
      tugasAwal 
    });

  } catch (error) {
    console.error('Submit tugas awal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update tugas awal (jika diperlukan)
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { userId, modulId, linkTugas, userRole } = data;

    if (!userId || !modulId || !linkTugas) {
      return NextResponse.json(
        { error: 'userId, modulId, dan linkTugas required' },
        { status: 400 }
      );
    }

    // Validasi URL
    try {
      new URL(linkTugas);
    } catch {
      return NextResponse.json(
        { error: 'Format link tidak valid' },
        { status: 400 }
      );
    }

    const tugasAwal = await prisma.tugasAwal.update({
      where: {
        userId_modulId: {
          userId: parseInt(userId),
          modulId: modulId
        }
      },
      data: {
        linkTugas,
        updatedAt: new Date()
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

    return NextResponse.json({ 
      message: 'Tugas awal berhasil diupdate',
      tugasAwal 
    });

  } catch (error) {
    console.error('Update tugas awal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
