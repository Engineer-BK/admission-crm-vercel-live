import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      include: { seatMatrix: true }
    });

    const pendingDocsCount = await prisma.applicant.count({
      where: { docStatus: 'PENDING' }
    });

    const pendingFeeCount = await prisma.applicant.count({
      where: { feeStatus: 'PENDING', seatStatus: 'ALLOCATED' }
    });

    return NextResponse.json({
      programs,
      pendingDocsCount,
      pendingFeeCount
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
