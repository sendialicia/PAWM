import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('API PUT permohonan/[id] called');
    
    const resolvedParams = await params;
    console.log('Raw params:', resolvedParams);
    
    const data = await request.json();
    const { status, approvedBy, keterangan, userRole } = data;
    const permohonanId = parseInt(resolvedParams.id);

    console.log('Update status permohonan:', { permohonanId, status, approvedBy, userRole });
    console.log('Received data:', data);

    // Validation - hanya asisten yang bisa update status
    if (userRole !== 'ASISTEN') {
      return NextResponse.json(
        { error: 'Hanya asisten yang dapat mengubah status permohonan' },
        { status: 403 }
      );
    }

    if (!status || !approvedBy) {
      return NextResponse.json(
        { error: 'Status dan nama asisten wajib diisi' },
        { status: 400 }
      );
    }

    // Update permohonan status
    const updatedPermohonan = await prisma.permohonan.update({
      where: {
        id: permohonanId
      },
      data: {
        status,
        approvedBy,
        approvedAt: new Date(),
        keterangan: keterangan || null
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

    console.log('Status updated:', updatedPermohonan);

    return NextResponse.json(
      { 
        message: 'Status permohonan berhasil diupdate',
        permohonan: updatedPermohonan
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update status error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
