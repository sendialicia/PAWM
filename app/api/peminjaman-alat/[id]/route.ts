import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, StatusPeminjamanAlat } from '@/app/generated/prisma/client';

const prisma = new PrismaClient();

// PUT - Update status peminjaman alat (untuk asisten)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status, keterangan, approvedBy } = body;
    const peminjamanId = parseInt(params.id);

    if (!status) {
      return NextResponse.json(
        { error: 'Status harus diisi' },
        { status: 400 }
      );
    }

    // Ambil data peminjaman untuk update stok alat
    const existingPeminjaman = await prisma.peminjamanAlat.findUnique({
      where: { id: peminjamanId },
      include: { alat: true }
    });

    if (!existingPeminjaman) {
      return NextResponse.json(
        { error: 'Peminjaman tidak ditemukan' },
        { status: 404 }
      );
    }

    // Update status peminjaman
    const updatedData: {
      status: StatusPeminjamanAlat;
      keterangan?: string | null;
      approvedBy?: string;
      approvedAt?: Date;
      dikembalikanAt?: Date;
    } = {
      status: status as StatusPeminjamanAlat,
      keterangan: keterangan || null
    };

    if (status === 'APPROVED') {
      updatedData.approvedBy = approvedBy;
      updatedData.approvedAt = new Date();
    } else if (status === 'DIKEMBALIKAN') {
      updatedData.dikembalikanAt = new Date();
    }

    const peminjamanAlat = await prisma.peminjamanAlat.update({
      where: { id: peminjamanId },
      data: updatedData,
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

    // Update stok alat berdasarkan status
    if (status === 'APPROVED' && existingPeminjaman.status === 'PENDING') {
      // Kurangi stok saat approve
      await prisma.alat.update({
        where: { id: existingPeminjaman.alatId },
        data: {
          jumlahTersedia: {
            decrement: existingPeminjaman.jumlahPinjam
          }
        }
      });
    } else if (status === 'DIKEMBALIKAN' && existingPeminjaman.status === 'APPROVED') {
      // Tambah stok saat dikembalikan
      await prisma.alat.update({
        where: { id: existingPeminjaman.alatId },
        data: {
          jumlahTersedia: {
            increment: existingPeminjaman.jumlahPinjam
          }
        }
      });
    } else if (status === 'REJECTED' && existingPeminjaman.status === 'APPROVED') {
      // Kembalikan stok jika reject setelah approve
      await prisma.alat.update({
        where: { id: existingPeminjaman.alatId },
        data: {
          jumlahTersedia: {
            increment: existingPeminjaman.jumlahPinjam
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: peminjamanAlat
    });

  } catch (error) {
    console.error('Update peminjaman alat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
