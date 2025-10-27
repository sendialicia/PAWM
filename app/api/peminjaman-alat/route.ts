import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface WhereClause {
  userId?: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DIKEMBALIKAN';
}

// GET - Ambil daftar peminjaman alat dengan filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    const whereClause: WhereClause = {};
    
    if (userId) {
      whereClause.userId = parseInt(userId);
    }
    
    if (status) {
      whereClause.status = status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'DIKEMBALIKAN';
    }

    const peminjamanAlats = await prisma.peminjamanAlat.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        },
        alat: true
      },
      orderBy: [
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(peminjamanAlats);

  } catch (error) {
    console.error('Get peminjaman alats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Buat peminjaman alat baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received body:', body);
    
    const { userId, alatId, jumlah, tanggalPinjam, tanggalKembali, tujuanPenggunaan } = body;

    // Validasi required fields
    if (!userId || !alatId || !tanggalPinjam || !tanggalKembali || !tujuanPenggunaan) {
      return NextResponse.json(
        { error: 'UserId, alat, tanggal pinjam, tanggal kembali, dan tujuan penggunaan harus diisi' },
        { status: 400 }
      );
    }

    // Cari user berdasarkan userId
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      console.log('User not found with ID:', userId);
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek ketersediaan alat
    const alat = await prisma.alat.findUnique({
      where: { id: parseInt(alatId) }
    });

    if (!alat) {
      return NextResponse.json(
        { error: 'Alat tidak ditemukan' },
        { status: 404 }
      );
    }

    const jumlahPinjamInt = parseInt(jumlah) || 1;
    if (alat.jumlahTersedia < jumlahPinjamInt) {
      return NextResponse.json(
        { error: `Alat tidak mencukupi. Tersedia: ${alat.jumlahTersedia}` },
        { status: 400 }
      );
    }

    // Buat peminjaman
    const peminjamanAlat = await prisma.peminjamanAlat.create({
      data: {
        userId: parseInt(userId),
        alatId: parseInt(alatId),
        nama: body.nama || 'Unknown',
        nim: body.nim || '',
        email: user.email,
        tanggalPinjam: new Date(tanggalPinjam),
        tanggalKembali: new Date(tanggalKembali),
        keperluan: tujuanPenggunaan,
        jumlahPinjam: jumlahPinjamInt,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        },
        alat: true
      }
    });

    // Update jumlah tersedia alat
    await prisma.alat.update({
      where: { id: parseInt(alatId) },
      data: {
        jumlahTersedia: alat.jumlahTersedia - jumlahPinjamInt
      }
    });

    return NextResponse.json(peminjamanAlat);

  } catch (error) {
    console.error('Create peminjaman alat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
