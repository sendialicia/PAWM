import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { nama, nim, email, tanggal, waktuMulai, waktuSelesai, keperluan, jumlahOrang, userId } = data;

    console.log('Submit permohonan:', data);

    // Validation
    if (!nama || !nim || !email || !tanggal || !waktuMulai || !waktuSelesai || !keperluan || !jumlahOrang || !userId) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // Create permohonan
    const permohonan = await prisma.permohonan.create({
      data: {
        nama,
        nim,
        email,
        tanggal: new Date(tanggal),
        waktuMulai,
        waktuSelesai,
        keperluan,
        jumlahOrang,
        userId: parseInt(userId),
        status: 'PENDING'
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

    console.log('Permohonan created:', permohonan);

    return NextResponse.json(
      { 
        message: 'Permohonan berhasil dikirim',
        permohonan
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Submit permohonan error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET - Ambil permohonan berdasarkan user role
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const userRole = searchParams.get('userRole');

    if (!userId || !userRole) {
      return NextResponse.json(
        { error: 'User ID dan role diperlukan' },
        { status: 400 }
      );
    }

    let permohonan;

    if (userRole === 'ASISTEN') {
      // Asisten bisa lihat semua permohonan
      permohonan = await prisma.permohonan.findMany({
        include: {
          user: {
            select: {
              email: true,
              role: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } else {
      // Praktikan hanya bisa lihat permohonan sendiri
      permohonan = await prisma.permohonan.findMany({
        where: {
          userId: parseInt(userId)
        },
        include: {
          user: {
            select: {
              email: true,
              role: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }

    return NextResponse.json(
      { permohonan },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get permohonan error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
