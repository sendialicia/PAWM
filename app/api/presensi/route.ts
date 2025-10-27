import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Ambil presensi untuk user tertentu di modul tertentu
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

    const presensi = await prisma.presensi.findUnique({
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

    return NextResponse.json({ presensi });
  } catch (error) {
    console.error('Get presensi error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Submit presensi
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { userId, modulId, nama, nim, kelompok, userRole } = data;

    console.log('Submit presensi:', { userId, modulId, nama, nim, kelompok, userRole });

    // Validasi required fields
    if (!userId || !modulId || !nama || !nim || !kelompok) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // Check apakah sudah pernah presensi
    const existing = await prisma.presensi.findUnique({
      where: {
        userId_modulId: {
          userId: parseInt(userId),
          modulId: modulId
        }
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Presensi sudah pernah dilakukan untuk modul ini' },
        { status: 400 }
      );
    }

    // Submit presensi
    const presensi = await prisma.presensi.create({
      data: {
        userId: parseInt(userId),
        modulId,
        nama,
        nim,
        kelompok,
        status: 'HADIR',
        waktuPresensi: new Date()
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

    console.log('Presensi submitted:', presensi);

    return NextResponse.json({ 
      message: 'Presensi berhasil disubmit',
      presensi 
    });

  } catch (error) {
    console.error('Submit presensi error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update presensi (untuk asisten)
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { userId, modulId, status, keterangan, userRole } = data;

    if (!userId || !modulId || !status) {
      return NextResponse.json(
        { error: 'userId, modulId, dan status required' },
        { status: 400 }
      );
    }

    // Hanya asisten yang bisa update presensi
    if (userRole !== 'ASISTEN') {
      return NextResponse.json(
        { error: 'Hanya asisten yang dapat mengubah status presensi' },
        { status: 403 }
      );
    }

    const presensi = await prisma.presensi.update({
      where: {
        userId_modulId: {
          userId: parseInt(userId),
          modulId: modulId
        }
      },
      data: {
        status,
        keterangan,
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
      message: 'Status presensi berhasil diupdate',
      presensi 
    });

  } catch (error) {
    console.error('Update presensi error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
