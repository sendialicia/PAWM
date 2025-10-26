import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma/client';

const prisma = new PrismaClient();

// GET: Ambil semua tugas awal untuk modul tertentu (khusus asisten)
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

    // Ambil semua tugas awal untuk modul tertentu dengan info user
    const tugasAwalList = await prisma.tugasAwal.findMany({
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
        { submitAt: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({ 
      success: true, 
      data: tugasAwalList,
      count: tugasAwalList.length 
    });

  } catch (error) {
    console.error('Get tugas awal list error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: Update nilai tugas awal (khusus asisten)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { tugasAwalId, nilai, keterangan, userRole, nilaiBy } = body;

    // Cek authorization - hanya asisten yang bisa menilai
    if (userRole !== 'ASISTEN') {
      return NextResponse.json({ error: 'Unauthorized. Only asisten can grade assignments.' }, { status: 403 });
    }

    // Validasi input
    if (!tugasAwalId) {
      return NextResponse.json({ error: 'tugasAwalId is required' }, { status: 400 });
    }

    if (nilai !== null && (typeof nilai !== 'number' || nilai < 0 || nilai > 100)) {
      return NextResponse.json({ error: 'Nilai must be a number between 0 and 100' }, { status: 400 });
    }

    // Update tugas awal dengan nilai
    const updatedTugasAwal = await prisma.tugasAwal.update({
      where: {
        id: tugasAwalId
      },
      data: {
        nilai: nilai,
        nilaiAt: nilai !== null ? new Date() : null,
        nilaiBy: nilai !== null ? nilaiBy : null,
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
      message: 'Nilai berhasil diupdate',
      data: updatedTugasAwal 
    });

  } catch (error) {
    console.error('Update nilai tugas awal error:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'Tugas awal not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
