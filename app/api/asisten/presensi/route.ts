import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Ambil semua presensi untuk modul tertentu (khusus asisten)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const modulId = searchParams.get('modulId');
    const userRole = searchParams.get('userRole');

    // Cek authorization - hanya asisten yang bisa mengakses
    if (userRole !== 'ASISTEN') {
      return NextResponse.json({ error: 'Unauthorized. Only asisten can access this data.' }, { status: 403 });
    }

    if (!modulId) {
      return NextResponse.json({ error: 'modulId is required' }, { status: 400 });
    }

    // Ambil semua presensi untuk modul tertentu dengan info user
    const presensiList = await prisma.presensi.findMany({
      where: {
        modulId: modulId
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: [
        { waktuPresensi: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    // Group by kelompok untuk statistik
    const statistik = presensiList.reduce((acc, presensi) => {
      const kelompok = presensi.kelompok;
      if (!acc[kelompok]) {
        acc[kelompok] = {
          total: 0,
          hadir: 0,
          terlambat: 0,
          tidakHadir: 0
        };
      }
      acc[kelompok].total++;
      if (presensi.status === 'HADIR') acc[kelompok].hadir++;
      else if (presensi.status === 'TERLAMBAT') acc[kelompok].terlambat++;
      else acc[kelompok].tidakHadir++;
      
      return acc;
    }, {} as Record<string, {
      total: number;
      hadir: number;
      terlambat: number;
      tidakHadir: number;
    }>);

    return NextResponse.json({ 
      success: true, 
      data: presensiList,
      statistik: statistik,
      count: presensiList.length 
    });

  } catch (error) {
    console.error('Get presensi list error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: Update status presensi (khusus asisten)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { presensiId, status, keterangan, userRole } = body;

    // Cek authorization - hanya asisten yang bisa update status
    if (userRole !== 'ASISTEN') {
      return NextResponse.json({ error: 'Unauthorized. Only asisten can update attendance status.' }, { status: 403 });
    }

    // Validasi input
    if (!presensiId) {
      return NextResponse.json({ error: 'presensiId is required' }, { status: 400 });
    }

    if (!['HADIR', 'TIDAK_HADIR', 'TERLAMBAT'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Update presensi
    const updatedPresensi = await prisma.presensi.update({
      where: {
        id: presensiId
      },
      data: {
        status: status,
        keterangan: keterangan || null,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Status presensi berhasil diupdate',
      data: updatedPresensi 
    });

  } catch (error) {
    console.error('Update presensi error:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'Presensi not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
